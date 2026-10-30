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

/** Format and content checks, no network. Run on every submit and on blur. */
export function checkFields(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}
  const name = form.name.trim()
  const email = form.email.trim()
  const subject = form.subject.trim()
  const message = form.message.trim()

  if (name.length < LIMITS.name[0] || name.length > LIMITS.name[1]) {
    errors.name = `Enter your name (${LIMITS.name[0]}–${LIMITS.name[1]} characters).`
  } else if (!/\p{L}/u.test(name) || /https?:|www\.|[<>]/i.test(name)) {
    errors.name = 'Enter your real name.'
  }

  const domain = email.split('@')[1]?.toLowerCase() ?? ''
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email address, like you@example.com.'
  } else if (TYPOS[domain]) {
    errors.email = `Did you mean ${email.split('@')[0]}@${TYPOS[domain]}?`
  } else if (DISPOSABLE.has(domain)) {
    errors.email = "Disposable addresses can't receive a reply. Use your real email."
  }

  if (subject.length < LIMITS.subject[0] || subject.length > LIMITS.subject[1]) {
    errors.subject = `Add a subject (${LIMITS.subject[0]}–${LIMITS.subject[1]} characters).`
  }

  if (message.length < LIMITS.message[0]) {
    errors.message = `Tell me a bit more (at least ${LIMITS.message[0]} characters).`
  } else if (message.length > LIMITS.message[1]) {
    errors.message = `Keep it under ${LIMITS.message[1]} characters.`
  } else if (countLinks(message) > 2) {
    errors.message = 'Please include at most two links.'
  } else if (/(.)\1{9,}/.test(message) || !/\p{L}{2,}/u.test(message)) {
    errors.message = 'That message doesn’t look like real text.'
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
