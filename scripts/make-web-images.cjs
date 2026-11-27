const sharp = require(process.cwd() + '/node_modules/sharp')
const fs = require('fs'), path = require('path')
const P = (s) => path.join('public', s)
const out = (s, suf) => s.replace(/\.(jpe?g|png|webp)$/i, suf)
const read = (f) => fs.readFileSync(f, 'utf8')
;(async () => {
  // 1. card covers, 16:10
  const src = read('src/content/projects.ts') + read('src/content/project-writeups.ts')
  const covers = new Set()
  for (const m of src.matchAll(/cover: \{\s*src: '([^']+)'/g)) covers.add(m[1])
  covers.add('/images/VoyagerBot2023.jpg'); covers.add('/images/projects/flappy-bird/cover.webp')
  const contain = new Set(['/images/projects/ofdm-simulation/rx-fft.webp'])
  for (const c of covers) {
    const o = out(c, '-card.webp')
    const img = sharp(P(c))
    if (contain.has(c)) await img.resize(760, 460, { fit: 'contain', background: '#ffffff' }).extend({ top: 20, bottom: 20, left: 20, right: 20, background: '#ffffff' }).webp({ quality: 80 }).toFile(P(o))
    else await img.resize(800, 500, { fit: 'cover', position: 'attention' }).webp({ quality: 78 }).toFile(P(o))
    console.log('card', o, fs.statSync(P(o)).size >> 10, 'KB')
  }
  // 2. certificates: full webp (<=1800px), 4:3 grid thumb, square badge thumb
  const certs = ['YarsaTechCertificationOfExperience.jpg','GeneralMemberCertification.png','KaryaShalaMentorCertification.jpg','MentorShipCertification.jpg','DeltaRobothonRunnerUpCertification.jpg','MeshMerizeIITBombay.png','WokshopBylab448.jpg','BattleForSpeed2023WinnerCertification.jpg'].map((f) => '/images/' + f)
  const badgeSrcs = [...certs, '/images/certificates/robotics-club-leadership-executive-member-20th-committee.webp', '/images/certificates/robotics-club-leadership-senior-member.webp']
  for (const c of certs) {
    await sharp(P(c)).resize(1800, 1800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(P(out(c, '.webp')))
    await sharp(P(c)).resize(640, 480, { fit: 'cover', position: 'attention' }).webp({ quality: 75 }).toFile(P(out(c, '-thumb.webp')))
    console.log('cert', out(c, '.webp'), fs.statSync(P(out(c, '.webp'))).size >> 10, 'KB')
  }
  for (const c of badgeSrcs) {
    await sharp(P(c)).resize(128, 128, { fit: 'cover', position: 'attention' }).webp({ quality: 75 }).toFile(P(out(c, '-badge.webp')))
  }
  // 3. hero portrait at 2x its 27rem (432px) box (prashant-figure-1100.webp = the original, kept out of public/)
  const hero = P('/images/prashant-figure.webp')
  if (!fs.existsSync(P('/images/prashant-figure-1100.webp'))) fs.copyFileSync(hero, P('/images/prashant-figure-1100.webp'))
  await sharp(P('/images/prashant-figure-1100.webp')).resize(880, 1100).webp({ quality: 78 }).toFile(hero + '.tmp')
  fs.renameSync(hero + '.tmp', hero)
  console.log('hero', fs.statSync(hero).size >> 10, 'KB')
})()
