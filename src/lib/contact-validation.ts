/*
 * Checks a contact-form submission before anything is sent.
 *
 * No website can confirm that a mailbox exists (mail servers refuse to say),
 * so the email check goes as far as is reliable: the address is well formed,
 * isn't a throwaway inbox, and its domain publishes mail (MX) records.
 */

export type ContactForm = { name: string; email: string; subject: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactForm, string>>

const LIMITS = {
  name: [2, 80],
  subject: [3, 120],
  message: [20, 5000],
} as const

// Local part and domain per RFC 5321, minus quoted strings nobody uses in forms
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@(?=.{4,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/

/** Throwaway inboxes: messages from these can't be answered */
const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'tempmail.net', 'throwawaymail.com', 'yopmail.com', 'getnada.com',
  'trashmail.com', 'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'mintemail.com', 'mohmal.com',
  'emailondeck.com', 'tempinbox.com', 'burnermail.io', 'mailnesia.com', 'spamgourmet.com',
])

/** Common misspellings of big providers, so a typo gets a hint instead of a dead reply */
const TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'outlok.com': 'outlook.com', 'outllok.com': 'outlook.com',
}

/** Placeholder addresses people type to get past a form */
const FAKE_LOCAL = new Set([
  'test', 'testing', 'tester', 'random', 'asdf', 'asdfgh', 'qwerty', 'abc', 'abcd', 'abcde', 'xyz', 'fake',
  'example', 'sample', 'demo', 'none', 'null', 'nobody', 'noreply', 'no-reply', 'aaa', 'aaaa', 'foo', 'bar',
  'foobar', 'dummy', 'temp', 'spam', 'hello', 'hi', 'email', 'mail', 'user', 'name', 'me', 'xxx', '123', '1234',
])
const FAKE_DOMAINS = new Set(['test.com', 'domain.com', 'sample.com', 'fake.com', 'email.test', 'abc.com', 'xyz.com'])

const RESOLVERS = [
  (d: string) => `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=MX`,
  (d: string) => `https://dns.google/resolve?name=${encodeURIComponent(d)}&type=MX`,
]

type DnsAnswer = { Status: number; Answer?: { type: number; data: string }[] }

/** true: domain takes mail · false: it doesn't · null: couldn't find out */
async function domainAcceptsMail(domain: string): Promise<boolean | null> {
  for (const url of RESOLVERS) {
    try {
      const res = await fetch(url(domain), {
        headers: { accept: 'application/dns-json' },
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) continue
      const dns: DnsAnswer = await res.json()
      if (dns.Status === 3) return false // domain doesn't exist
      if (dns.Status !== 0) continue
      // "0 ." is a null MX: the domain says it never accepts mail (RFC 7505)
      const mx = (dns.Answer ?? []).filter((a) => a.type === 15 && !/^0\s+\.$/.test(a.data.trim()))
      return mx.length > 0
    } catch {
      // try the next resolver
    }
  }
  return null
}

const countLinks = (text: string) => (text.match(/https?:\/\/|www\./gi) ?? []).length

const latinWords = (text: string) =>
  text
    .replace(/https?:\/\/\S+|www\.\S+|\S+@\S+/gi, ' ') // links and addresses aren't prose
    .toLowerCase()
    .match(/[a-z]+/g) ?? []

/** A Latin word no language would write: no vowels, five consonants in a row, or absurdly long */
const isJunkWord = (w: string) => w.length > 20 || !/[aeiouy]/.test(w) || /[^aeiouy]{5,}/.test(w)

/**
 * Keyboard mashing like "asdkjasdkjh". Only Latin words are judged, so a message in
 * Nepali or Japanese passes; short words are skipped so acronyms like PCB pass.
 */
function looksLikeGibberish(text: string) {
  const words = latinWords(text).filter((w) => w.length >= 4)
  if (!words.length) return false
  return words.filter(isJunkWord).length / words.length > 0.3
}

/** Mostly capital letters, which is shouting or a test, not a message */
function isAllCaps(text: string, minLetters: number) {
  const letters = text.match(/[a-zA-Z]/g) ?? []
  return letters.length >= minLetters && letters.filter((c) => c >= 'A' && c <= 'Z').length / letters.length > 0.8
}

/** Format and content checks, no network. Run on every submit and on blur. */
export function checkFields(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}
  const name = form.name.trim()
  const email = form.email.trim()
  const subject = form.subject.trim()
  const message = form.message.trim()

  if (name.length < LIMITS.name[0] || name.length > LIMITS.name[1]) {
    errors.name = `Enter your name (${LIMITS.name[0]}–${LIMITS.name[1]} characters).`
  } else if (!/\p{L}/u.test(name) || /https?:|www\.|[<>\d]/i.test(name) || looksLikeGibberish(name)) {
    errors.name = 'Enter your real name.'
  }

  const [local = '', domain = ''] = email.toLowerCase().split('@')
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email address, like you@example.com.'
  } else if (TYPOS[domain]) {
    errors.email = `Did you mean ${email.split('@')[0]}@${TYPOS[domain]}?`
  } else if (DISPOSABLE.has(domain)) {
    errors.email = "Disposable addresses can't receive a reply. Use your real email."
  } else if (FAKE_LOCAL.has(local) || FAKE_DOMAINS.has(domain) || /^example\./.test(domain)) {
    errors.email = 'That looks like a placeholder address. Use the email you actually read.'
  }

  if (subject.length < LIMITS.subject[0] || subject.length > LIMITS.subject[1]) {
    errors.subject = `Add a subject (${LIMITS.subject[0]}–${LIMITS.subject[1]} characters).`
  } else if (looksLikeGibberish(subject) || !/\p{L}{2,}/u.test(subject)) {
    errors.subject = 'Write a real subject, like “Research collaboration”.'
  } else if (isAllCaps(subject, 5)) {
    errors.subject = 'Please don’t write the subject in all capitals.'
  }

  const words = latinWords(message)

  if (message.length < LIMITS.message[0]) {
    errors.message = `Tell me a bit more (at least ${LIMITS.message[0]} characters).`
  } else if (message.length > LIMITS.message[1]) {
    errors.message = `Keep it under ${LIMITS.message[1]} characters.`
  } else if (countLinks(message) > 2) {
    errors.message = 'Please include at most two links.'
  } else if (/(.)\1{9,}/.test(message) || !/\p{L}{2,}/u.test(message) || looksLikeGibberish(message)) {
    errors.message = 'That message doesn’t look like real text.'
  } else if (words.length > 0 && words.length < 5) {
    errors.message = 'Write at least a full sentence (5 words or more).'
  } else if (words.length >= 5 && new Set(words).size / words.length < 0.4) {
    errors.message = 'That message repeats itself. Write what you’d like to say.'
  } else if (isAllCaps(message, 15)) {
    errors.message = 'Please don’t write in all capitals.'
  }

  return errors
}

/** Full check, including the DNS lookup on the email's domain */
export async function validateContact(form: ContactForm): Promise<ContactErrors> {
  const errors = checkFields(form)
  if (errors.email) return errors

  const domain = form.email.trim().split('@')[1].toLowerCase()
  const accepts = await domainAcceptsMail(domain)
  if (accepts === false) {
    errors.email = `${domain} can't receive email. Check the address.`
  } else if (accepts === null) {
    errors.email = "Couldn't verify your email right now. Check your connection and try again."
  }
  return errors
}
