import { useEffect, useState } from 'react'
import {
  Phone, MapPin, Clock, ChevronDown, ChevronLeft, ChevronRight, Menu, X, ArrowRight, ArrowLeft, ArrowUpRight,
  MessageCircle, Sparkles, Shield, Heart, Stethoscope, Scissors, Leaf, Eye,
  CalendarCheck, Camera, AlertCircle, CheckCircle2, Check, Info, Navigation, AtSign, Droplets, Home,
  Calculator as CalculatorIcon, TrendingUp, User, Bell, Search, SlidersHorizontal, Share2,
} from 'lucide-react'

/* ── Clinic data — extracted verbatim from the existing Hair Haven repository.
      Nothing here is invented: see AUDIT.md for sources and flagged inconsistencies. ── */
const RAW = 'https://raw.githubusercontent.com/manmohan01singh/HAIR-HAVEN/main/public/'
const asset = (name: string) => RAW + encodeURIComponent(name)

export const CLINIC = {
  name: 'Hair Haven Transplant Clinic',
  phoneDisplay: '+91 88997 08659',
  phoneLink: 'tel:+918899708659',
  whatsapp: 'https://wa.me/918899708659',
  address: '606/B, Sector 3, Channi Himmat, Jammu – 180015, J&K',
  hours: '10:00 AM – 6:00 PM · Open 7 days',
  instagram: 'https://instagram.com/hairhaventransplantclinic',
  maps: 'https://maps.app.goo.gl/QFGD7kxLjtaQFP739',
  googleReviews: 'https://share.google/91xZaADhSuWDBvWCC',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.5684347712395!2d74.8765251!3d32.7059000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e85b54a3a83eb%3A0x5f9d84ca705aefbb!2sHair%20Haven!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin',
}

const waLink = (text: string) => `${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`

interface Service { title: string; desc: string; price: string; features: string[]; icon: 'scissors' | 'sparkles' | 'droplets' | 'leaf' | 'eye' | 'stethoscope' | 'user' }
const SERVICES: Service[] = [
  { title: 'FUE Hair Transplant', desc: 'Healthy grafts are carefully taken from the donor area and implanted into bald areas. Minimally invasive, no major scars, natural-looking density and a faster recovery.', price: 'Starting from ₹21,000', features: ['Minimally invasive', 'No major scars', 'Natural density', 'Fast recovery'], icon: 'scissors' },
  { title: 'Advanced BioSapphire FUE', desc: 'An advanced FUE variant using precise sapphire blades instead of steel to create micro-channels — superior graft placement, higher density and accelerated healing.', price: 'Starting from ₹31,000', features: ['Sapphire micro-channels', 'Higher graft density', 'Rapid scalp healing', 'Extremely natural results'], icon: 'sparkles' },
  { title: 'PRP Therapy', desc: "A non-surgical treatment in which the patient's own plasma is injected into the scalp to strengthen hair roots, reduce hair fall and stimulate natural growth.", price: '₹2,000 / session', features: ['Non-surgical', 'Strengthens roots', 'Reduces hair fall', 'Stimulates growth'], icon: 'droplets' },
  { title: 'GFC Therapy', desc: "An advanced regenerative treatment using concentrated growth factors from the patient's own blood to nourish follicles, improve thickness and control hair fall.", price: '₹4,500 / session', features: ['Advanced regenerative', 'Nourishes follicles', 'Improves thickness', 'Healthier growth'], icon: 'leaf' },
  { title: 'Beard Transplant', desc: 'A specialised procedure for a fuller, well-shaped beard. Grafts are implanted carefully to give a dense, natural and permanent beard look.', price: 'Custom pricing', features: ['Fuller beard look', 'Careful implanting', 'Dense & natural', 'Permanent growth'], icon: 'stethoscope' },
  { title: 'Eyebrow Transplant', desc: 'Restores thin or uneven eyebrows by implanting natural hair grafts for a fuller, properly shaped and natural appearance.', price: 'Custom pricing', features: ['Restores thin brows', 'Properly shaped', 'Fuller & natural', 'Directional placement'], icon: 'eye' },
  { title: 'Hair Regrowth Treatments', desc: 'Personalised non-surgical treatment plans to support existing hair and slow further thinning, reviewed with the clinical team at each follow-up.', price: 'Custom treatment plan', features: ['Personalised plan', 'Follow-up reviews', 'Supports existing hair'], icon: 'leaf' },
  { title: 'Hairline Design & Graft Estimation', desc: 'A planned, natural hairline designed around your face and hair-loss pattern, with a graft estimate before you commit to any procedure.', price: 'Part of consultation', features: ['Natural hairline design', 'Graft estimation', 'No obligation'], icon: 'sparkles' },
  { title: 'Scalp Assessment & Hair Analysis', desc: 'A clinical scalp evaluation and Norwood stage mapping so treatment recommendations are based on your actual hair loss, not guesswork.', price: 'Part of consultation', features: ['Scalp evaluation', 'Norwood mapping', 'Treatment guidance'], icon: 'stethoscope' },
]
const ServiceIcon = ({ k }: { k: Service['icon'] }) => {
  const s = { size: 22 }
  switch (k) {
    case 'scissors': return <Scissors {...s} />
    case 'droplets': return <Droplets {...s} />
    case 'leaf': return <Leaf {...s} />
    case 'eye': return <Eye {...s} />
    case 'stethoscope': return <Stethoscope {...s} />
    case 'user': return <User {...s} />
    default: return <Sparkles {...s} />
  }
}

const PROCESS = [
  { step: '01', title: 'Local Anesthesia', desc: 'Painless administration of local anesthesia for a comfortable procedure.', img: 'process-1.png' },
  { step: '02', title: 'Harvest from Donor Area', desc: 'Precise and careful extraction of healthy hair follicles from the donor zone.', img: 'process-2.png' },
  { step: '03', title: 'Implantation of the Grafts', desc: 'Strategic placement of grafts at the correct angle to match natural hair growth.', img: 'process-3.png' },
  { step: '04', title: 'Result', desc: 'Natural-looking, dense hair growth and a complete restoration of confidence.', img: 'process-4.png' },
]

/* Roles only, per v2 spec: qualifications in the source repo are inconsistent
   (e.g. Dr Kakkar appears as both "E. Dermatology, Germany" and "MD Dermatology")
   and are held for clinic verification before publishing. */
/* img = AI-generated DUMMY portraits (owner-approved placeholders, v4) — replace
   with the clinic's real photos in the editing round. Never present as real. */
const TEAM = [
  { initials: 'SK', name: 'Dr. Suby Kakkar', role: 'Clinical Director', img: '/img/doc-suby.jpg' },
  { initials: 'ME', name: 'Maxon Epston', role: 'Hair Transplant & PRP', img: '/img/spec-maxon.jpg' },
  { initials: 'KG', name: 'Kashish Gupta', role: 'Graft Implantation & Hairline', img: '/img/spec-kashish.jpg' },
  { initials: 'RB', name: 'Ronika Bhardwaj', role: 'Follow-ups & Patient Care', img: '/img/spec-ronika.jpg' },
]

interface Norwood { stage: number; name: string; description: string; grafts: string; priceRange: string; density: string; duration: string; recovery: string }
const NORWOOD: Norwood[] = [
  { stage: 1, name: 'Minimal Hair Loss', description: 'Optimal hair density. Full, healthy hairline with no active recession. No surgical restoration needed.', grafts: '0 grafts', priceRange: '₹0', density: 'Optimal', duration: 'N/A', recovery: 'N/A' },
  { stage: 2, name: 'Minor Receding Temples', description: 'Slight recession at the temples. A good stage for preventive care or PRP sessions to slow further thinning.', grafts: '500 – 1,000', priceRange: '₹21,000 – ₹25,000', density: 'High', duration: '2 – 3 hours', recovery: '3 – 5 days' },
  { stage: 3, name: 'M-Shaped Receding Hairline', description: 'Clear M or V-shaped temple recession. This is the baseline stage for starting a successful FUE hairline restoration.', grafts: '1,200 – 1,800', priceRange: '₹30,000 (base)', density: 'Good', duration: '4 – 5 hours', recovery: '7 days' },
  { stage: 4, name: 'Receding Front & Crown Thinning', description: 'Deep frontal recession combined with a distinct thinning spot at the crown (vertex). Requires targeted FUE packing.', grafts: '2,000 – 2,800', priceRange: '₹35,000 – ₹40,000', density: 'Moderate', duration: '5 – 6 hours', recovery: '7 – 10 days' },
  { stage: 5, name: 'Advanced Hair Loss', description: 'Frontal balding and crown bald zones are separated by only a very narrow bridge of hair. Dense graft packing required.', grafts: '2,800 – 3,500', priceRange: '₹40,000 – ₹45,000', density: 'Moderate', duration: '6 – 7 hours', recovery: '10 days' },
  { stage: 6, name: 'Severe Hair Loss / Merged Zones', description: 'The dividing bridge of hair is completely gone. Front and back bald areas merge. Requires extensive full-head reconstruction.', grafts: '3,500 – 4,500', priceRange: '₹45,000 (base)', density: 'Requires evaluation', duration: '7 – 8 hours', recovery: '10 – 14 days' },
  { stage: 7, name: 'Extreme Balding / Horseshoe', description: 'Most severe hair loss. Only a narrow strip of hair remains around the sides and back. Requires precise scientific mapping.', grafts: '4,500+', priceRange: '₹45,000+ (custom)', density: 'Low donor density', duration: '8+ hours (split sessions)', recovery: '14 days' },
]

const SLOTS = ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM']
const BOOKABLE = ['FUE Hair Transplant', 'Advanced BioSapphire FUE', 'PRP Therapy', 'GFC Therapy', 'Beard Transplant', 'Eyebrow Transplant', 'General Hair Loss Consultation']

const JOURNEY = [
  { when: 'Day 0', title: 'Procedure day', desc: 'Local anesthesia, graft harvest and implantation. You go home the same day with your aftercare kit and instructions.' },
  { when: 'Days 1–3', title: 'Rest & gentle care', desc: 'Mild swelling is common. Sleep with your head elevated and follow the clinic’s scalp-care instructions exactly.' },
  { when: 'Days 7–14', title: 'Healing completes', desc: 'Scabs shed and the scalp typically heals completely within 10–14 days. Most patients are back to routine work well before this.' },
  { when: 'Month 1', title: 'Shedding phase', desc: 'Transplanted hairs commonly shed — this is expected. The follicles remain and prepare for new growth. PRP/GFC sessions may be scheduled in this phase.' },
  { when: 'Months 3–4', title: 'New growth begins', desc: 'New hair starts growing and gradually thickens. Progress photos at the same angles help you and the clinic track change honestly.' },
  { when: 'Months 6–8', title: 'Visible density', desc: 'Coverage becomes clearly visible. Follow-up reviews with the team assess density and whether any touch-up or therapy is advised.' },
  { when: 'Months 8–12', title: 'Full density', desc: 'Full density is typically achieved in 8–12 months. Your 12-month review closes the journey — and most patients simply enjoy the result.' },
]

const FAQS = [
  { q: 'Is FUE hair transplant painful?', a: 'The procedure is performed under local anesthesia, administered for a comfortable experience. Most patients report only mild discomfort during recovery, which typically lasts 3–5 days for temple work and 7–10 days for crown work.' },
  { q: 'How long does recovery take?', a: 'The scalp typically heals completely in 10–14 days. New hair starts growing in 3–4 months, with full density usually achieved in 8–12 months.' },
  { q: 'What is the difference between PRP and GFC therapy?', a: 'PRP uses platelet-rich plasma from your own blood to strengthen roots and reduce hair fall. GFC is a more concentrated growth-factor preparation aimed at improving thickness. The clinical team will advise which suits your stage.' },
  { q: 'How much does a hair transplant cost?', a: 'It depends mainly on the grafts you need and the technique chosen. Use the Norwood estimator on this page for a preliminary graft range — your final plan and exact price are confirmed only after an in-clinic assessment, never quoted sight-unseen.' },
  { q: 'Do you also do beard and eyebrow transplants?', a: 'Yes. Beard and eyebrow transplants are specialised procedures offered at Hair Haven with custom pricing based on the grafts and design required.' },
  { q: 'How do I book a consultation?', a: 'Use the booking form on this page, call or WhatsApp us on +91 88997 08659. Choose a preferred date and time — the clinic confirms your exact appointment personally, so nothing is ever auto-confirmed by a computer.' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ───────────────────────── Header ───────────────────────── */
function Header() {
  const [open, setOpen] = useState(false)
  const links: [string, string][] = [['Services', 'services'], ['Team', 'team'], ['Gallery', 'results'], ['Journey', 'journey'], ['Contact', 'contact']]
  return (
    <header className="header">
      <div className="container header-in">
        <a className="brand" href="#top" aria-label="Hair Haven home">
          <img src={asset('logo.png')} alt="Hair Haven logo" />
          <span><b>HAIR HAVEN</b><span>TRANSPLANT CLINIC · JAMMU</span></span>
        </a>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId(id) }}>{label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <a className="header-phone" href={CLINIC.phoneLink}><Phone size={16} /> {CLINIC.phoneDisplay}</a>
          <button className="btn btn-primary" onClick={() => scrollToId('book')}>Book a Consultation</button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        <button className="btn btn-primary header-mobile-cta" onClick={() => scrollToId('book')}>Book a Consultation</button>
      </div>
    </header>
  )
}

/* ───────────────────────── DUMMY sign-in (v4) ─────────────────────────
   Demo only: no real authentication, no real OTP is ever sent. Any 4 digits
   "verify". The profile is stored only in this browser (localStorage). */
interface Profile { name: string; phone: string; age?: number; gender?: string }
function loadProfile(): Profile | null {
  try { const raw = localStorage.getItem('hh_profile'); return raw ? (JSON.parse(raw) as Profile) : null } catch { return null }
}
function AuthFlow({ onDone, onClose }: { onDone: (p: Profile) => void; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [err, setErr] = useState('')
  const [secs, setSecs] = useState(30)
  useEffect(() => {
    if (step !== 2 || secs <= 0) return
    const t = window.setTimeout(() => setSecs(secs - 1), 1000)
    return () => window.clearTimeout(t)
  }, [step, secs])
  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1)
    const next = [...otp]; next[i] = d; setOtp(next)
    if (d && i < 5) document.querySelector<HTMLInputElement>(`.otp-row input[data-idx="${i + 1}"]`)?.focus()
  }
  const pasteOtp = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 6).split('')
    if (digits.length > 1) setOtp([...digits, '', '', '', '', '', ''].slice(0, 6))
  }
  const submitPhone = () => {
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10})/, '')
    if (!/^[6-9]\d{9}$/.test(digits)) { setErr('Enter a 10-digit mobile number.'); return }
    setErr(''); setPhone(digits); setSecs(30); setStep(2)
  }
  const ageNum = Number(age)
  const ageValid = age !== '' && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120
  const profileValid = name.trim().length >= 2 && ageValid && gender !== ''
  const submitProfile = () => {
    if (!profileValid) { setErr(!ageValid && age !== '' ? 'Enter a valid age.' : 'Please complete all fields.'); return }
    const p: Profile = { name: name.trim(), phone, age: ageNum, gender }
    try { localStorage.setItem('hh_profile', JSON.stringify(p)) } catch { /* storage unavailable */ }
    onDone(p)
  }
  const back = () => { setErr(''); if (step === 1) onClose(); else setStep(step - 1) }
  return (
    <div className="auth-overlay" role="dialog" aria-modal="true" aria-label="Sign in (demo)">
      <div className="auth-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="circle-btn" onClick={back} aria-label="Back"><ChevronLeft size={20} /></button>
          {step === 2 && <span className="demo-tag"><i />Demo flow</span>}
        </div>
        {step === 1 && (
          <>
            <h2 style={{ fontSize: '1.75rem', marginTop: 28 }}>Welcome to Hair Haven</h2>
            <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>Enter your mobile number to continue. We&apos;ll keep your appointments and hair journey in one place.</p>
            <div className="field" style={{ marginTop: 32 }}>
              <label htmlFor="auth-phone">Mobile Number</label>
              <div className="phone-shell">
                <span className="pfx">+91</span><span className="div" />
                <input id="auth-phone" type="tel" inputMode="numeric" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            {err && <p className="err"><AlertCircle size={15} /> {err}</p>}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 24, minHeight: 56 }} onClick={submitPhone}>Send OTP</button>
            <p className="small muted" style={{ marginTop: 16, textAlign: 'center' }}>Demo sign-in — no real OTP is sent and no account is created. Use any 10-digit number to continue.</p>
          </>
        )}
        {step === 2 && (
          <>
            <h2 style={{ fontSize: '1.75rem', marginTop: 28 }}>Enter OTP</h2>
            <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>We&apos;ve sent a 6-digit demo code to +91 ••••• ••{phone.slice(-3)}</p>
            <div className="otp-row" style={{ marginTop: 32 }}>
              {otp.map((d, i) => (
                <input key={i} data-idx={i} className={d ? 'filled' : ''} type="tel" inputMode="numeric" maxLength={1} value={d}
                  onChange={(e) => { if (e.target.value.length > 1) pasteOtp(e.target.value); else setDigit(i, e.target.value) }}
                  aria-label={`OTP digit ${i + 1}`} />
              ))}
            </div>
            <p className="small" style={{ marginTop: 20, display: 'flex', gap: 7, alignItems: 'center', color: 'var(--ink-2)' }}>
              <Clock size={14} style={{ color: '#B98F3E' }} />
              {secs > 0
                ? <>Resend code in 00:{String(secs).padStart(2, '0')}</>
                : <>Didn&apos;t get it? <button className="link-arrow" onClick={() => { setSecs(30); setOtp(['', '', '', '', '', '']) }}>Resend code</button></>}
            </p>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 32, minHeight: 56 }} disabled={otp.some((d) => !d)} onClick={() => setStep(3)}>Verify</button>
            <p className="small muted" style={{ marginTop: 14, textAlign: 'center' }}>Demo — any 6 digits work; nothing is actually sent.</p>
          </>
        )}
        {step === 3 && (
          <>
            <h2 style={{ fontSize: '1.75rem', marginTop: 28 }}>Create your profile</h2>
            <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>A few details so the clinic can personalise your consultation and follow-ups.</p>
            <div className="field" style={{ marginTop: 32 }}>
              <label htmlFor="auth-name">Full Name</label>
              <input id="auth-name" type="text" placeholder="e.g. Aman Kalsotra" value={name} onChange={(e) => setName(e.target.value)} autoCapitalize="words" />
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <label htmlFor="auth-age">Age</label>
              <div className="phone-shell">
                <input id="auth-age" type="tel" inputMode="numeric" placeholder="e.g. 32" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))} />
                <span style={{ color: 'var(--ink-2)', fontSize: '.93rem' }}>Years</span>
              </div>
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <label>Gender</label>
              <div className="gender-row">
                {['Male', 'Female', 'Other'].map((g) => (
                  <button key={g} className="gender-chip" aria-pressed={gender === g} onClick={() => setGender(g)}>{g}</button>
                ))}
              </div>
            </div>
            {err && <p className="err"><AlertCircle size={15} /> {err}</p>}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 32, minHeight: 56 }} disabled={!profileValid} onClick={submitProfile}>Continue</button>
            <p className="small muted" style={{ marginTop: 12, textAlign: 'center' }}>Demo profile — these details are not saved anywhere.</p>
          </>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── Hero (v3 onboarding style) ───────────────────────── */
function Hero({ onStart }: { onStart: () => void }) {
  const slides = [
    { src: asset('founder.png'), alt: 'Harish Kalsotra, Founder of Hair Haven Transplant Clinic', real: true },
    { src: '/img/scene-clinic.jpg', alt: 'Hair Haven clinic interior (dummy photo)', real: false },
    { src: '/img/doc-suby.jpg', alt: 'Doctor portrait (dummy photo)', real: false },
    { src: '/img/spec-maxon.jpg', alt: 'Specialist portrait (dummy photo)', real: false },
  ]
  const [slide, setSlide] = useState(0)
  const cur = slides[slide]
  return (
    <div className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <h1>Your Hair, <span className="grn">Your Confidence</span></h1>
          <p className="lead" style={{ marginTop: 14, maxWidth: 430 }}>
            Trusted hair transplant and restoration in Channi Himmat, Jammu — book a consultation in minutes.
          </p>
          <div className="dots" style={{ marginTop: 20 }} role="group" aria-label="Welcome photos">
            {slides.map((s, i) => (
              <span key={i} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} style={{ cursor: 'pointer' }} role="button" aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-welcome" onClick={onStart}>
              <span className="chip-l"><ChevronRight size={20} /></span>
              Get Started
              <span className="chev-r"><ChevronRight size={18} /><ChevronRight size={18} /></span>
            </button>
          </div>
          <p className="small muted" style={{ textAlign: 'center', marginTop: 12 }}>Demo onboarding — explore freely, nothing is saved.</p>
          <div className="hero-meta">
            <span><MapPin size={16} /> Sector 3, Channi Himmat</span>
            <span><Clock size={16} /> {CLINIC.hours}</span>
            <span><Shield size={16} /> Sterile OT standards</span>
          </div>
        </div>
        <div className="hero-photo">
          <img src={cur.src} alt={cur.alt} />
          {cur.real
            ? <span className="hero-chip"><MapPin size={15} /> Hair Haven Transplant Clinic · Channi Himmat, Jammu</span>
            : <span className="dummy-tag" style={{ left: 18, bottom: 18 }}>Dummy photo</span>}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Home composition (v3) ───────────────────────── */
function HomeComp({ query, setQuery, onCategory, profileName, onAvatar }: { query: string; setQuery: (q: string) => void; onCategory: (service: string) => void; profileName: string; onAvatar: () => void }) {
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const [liked, setLiked] = useState<{ [k: string]: boolean }>({})
  const cats = [
    { label: 'FUE', icon: 'scissors' as const, lime: true, service: 'FUE Hair Transplant' },
    { label: 'PRP', icon: 'droplets' as const, lime: false, service: 'PRP Therapy' },
    { label: 'GFC', icon: 'leaf' as const, lime: false, service: 'GFC Therapy' },
    { label: 'More', icon: 'sparkles' as const, lime: false, service: '' },
  ]
  const pops = [
    { label: 'FUE', icon: 'scissors' as const, service: 'FUE Hair Transplant', tint: '#E6FBF1' },
    { label: 'BioSapphire', icon: 'sparkles' as const, service: 'Advanced BioSapphire FUE', tint: '#EEF4EE' },
    { label: 'PRP', icon: 'droplets' as const, service: 'PRP Therapy', tint: '#FBF3D9' },
    { label: 'GFC', icon: 'leaf' as const, service: 'GFC Therapy', tint: '#F0FAF4' },
    { label: 'Beard', icon: 'user' as const, service: 'Beard Transplant', tint: '#EEF4EE' },
  ]
  const cards = [
    { img: '/img/scene-procedure.jpg', title: 'FUE Hair Transplant', price: 'from ₹21,000', service: 'FUE Hair Transplant' },
    { img: '/img/scene-clinic.jpg', title: 'PRP Therapy', price: 'from ₹2,000/session', service: 'PRP Therapy' },
  ]
  return (
    <section id="home" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="greet-row">
          <button onClick={onAvatar} aria-label={profileName === 'Aman' ? 'Sign in (demo)' : 'Your profile'} style={{ background: 'none', border: 'none', padding: 0, display: 'flex' }}>
            <img className="g-av" src={asset('logo.png')} alt="Hair Haven logo" />
          </button>
          <div><small>{greet}</small><b>{profileName}!</b></div>
          <button className="bell-btn" aria-label="Book a consultation" onClick={() => scrollToId('book')}><Bell size={20} /></button>
        </div>
        <div className="search-row">
          <label className="search-pill">
            <Search size={19} />
            <input type="search" placeholder="Search doctors, treatments..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search treatments" />
          </label>
          <button className="filter-btn" aria-label="See all services" onClick={() => scrollToId('services')}><SlidersHorizontal size={20} /></button>
        </div>
        <div className="cat-row">
          {cats.map((c) => (
            <button key={c.label} className={`cat-tile${c.lime ? ' lime' : ''}`} onClick={() => (c.service ? onCategory(c.service) : scrollToId('services'))}>
              <span className="ic"><ServiceIcon k={c.icon} /></span>{c.label}
            </button>
          ))}
        </div>
        <div className="view-all-row">
          <button onClick={() => scrollToId('services')}>View all</button>
        </div>

        <h2 style={{ fontSize: '1.25rem', marginTop: 24 }}>Featured Doctor</h2>
        <div className="feat-doc">
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 7 }}>Dr. Suby Kakkar <span className="tick"><Check size={12} strokeWidth={3.5} /></span></h3>
            <p style={{ fontWeight: 600, color: '#3E4A42' }}>Clinical Director</p>
            <p style={{ fontWeight: 650, marginTop: 10 }}><Clock size={14} style={{ verticalAlign: -2, marginRight: 6 }} />Open today · 10 AM – 6 PM</p>
            <button className="btn btn-primary btn-chip btn-44" style={{ marginTop: 14 }} onClick={() => scrollToId('doctor')}>Book Appointment <span className="chip"><ArrowRight size={15} /></span></button>
          </div>
          <div className="feat-photo">
            <img src="/img/doc-suby.jpg" alt="Portrait placeholder (dummy photo — not Dr. Suby Kakkar)" />
            <span className="dummy-tag">Dummy photo</span>
          </div>
        </div>

        <div style={{ marginTop: 34 }}>
          <div className="sec-row">
            <h2>Our Specialists</h2>
            <button onClick={() => scrollToId('team')}>See All</button>
          </div>
          <div className="spec-grid">
            {TEAM.filter((t) => ['Maxon Epston', 'Kashish Gupta'].includes(t.name)).map((t, i) => (
              <button key={t.name} className={`spec-card${i === 1 ? ' mint' : ''}`} onClick={() => scrollToId('team')}>
                <img className="spec-photo" src={t.img} alt={`Portrait placeholder (dummy photo — not ${t.name})`} />
                <h4>{t.name}</h4>
                <p>{t.name === 'Kashish Gupta' ? 'Implantation & Hairline' : t.role}</p>
                <span className="go"><ArrowUpRight size={16} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="exclusive">
          <div className="txt">
            <h3>Start with a Consultation</h3>
            <p>Meet the team at Channi Himmat, Jammu</p>
            <button className="btn" onClick={() => scrollToId('book')}>Book a Consultation <ArrowUpRight size={14} /></button>
          </div>
          <div className="ph"><img src="/img/scene-clinic.jpg" alt="Clinic interior (dummy photo)" /></div>
        </div>

        <div style={{ marginTop: 26 }}>
          <div className="sec-row">
            <h2 style={{ fontSize: '1.125rem' }}>Popular Categories</h2>
            <button onClick={() => scrollToId('services')}>See All</button>
          </div>
          <div className="pop-row">
            {pops.map((p) => (
              <button key={p.label} className="pop-tile" onClick={() => onCategory(p.service)}>
                <span className="ic" style={{ background: p.tint, ...(p.tint === '#FBF3D9' ? { color: '#B98F3E' } : {}) }}><ServiceIcon k={p.icon} /></span>{p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="img-cards">
          {cards.map((c) => (
            <article className="img-card" key={c.title}>
              <div className="ph">
                <img src={c.img} alt={`${c.title} (dummy photo)`} loading="lazy" />
                <button className={`heart${liked[c.title] ? ' on' : ''}`} aria-label={`Save ${c.title}`} aria-pressed={!!liked[c.title]} onClick={() => setLiked({ ...liked, [c.title]: !liked[c.title] })}>
                  <Heart size={16} fill={liked[c.title] ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="nm">{c.title}</p>
              <div className="ft">
                <span className="pr">{c.price}</span>
                <button className="go" aria-label={`Book ${c.title}`} onClick={() => onCategory(c.service)}><ArrowUpRight size={16} /></button>
              </div>
            </article>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 12 }}>Prices are the clinic&apos;s published starting prices — your final plan and price are confirmed at consultation.</p>
      </div>
    </section>
  )
}

/* ───────────────────────── Doctor profile (v3) ───────────────────────── */
function DoctorProfile({ onBookVisit, toast }: { onBookVisit: (date: string, slot: string) => void; toast: (m: string) => void }) {
  const days = useMemoDays(7)
  const [selDate, setSelDate] = useState(days[0].iso)
  const [selSlot, setSelSlot] = useState('10:00 AM')
  const [liked, setLiked] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); toast('Page link copied — share it with anyone considering treatment.') }
    catch { toast('Copy the page address from your browser to share it.') }
  }
  return (
    <section id="doctor">
      <div className="container">
        <div className="profile-hero">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="circle-btn" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowLeft size={19} /></button>
            <span style={{ display: 'flex', gap: 10 }}>
              <button className={`circle-btn${liked ? ' on' : ''}`} aria-label="Save doctor" aria-pressed={liked} onClick={() => setLiked(!liked)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button>
              <button className="circle-btn" aria-label="Share this page" onClick={share}><Share2 size={18} /></button>
            </span>
          </div>
          <div className="profile-hero-grid">
            <div>
              <p className="pname">Dr. Suby<br />Kakkar</p>
              <p className="prole">Clinical Director — Hair Haven Transplant Clinic</p>
            </div>
            <div style={{ position: 'relative' }}>
              <img className="pimg" src="/img/doc-suby.jpg" alt="Portrait placeholder (dummy photo — not Dr. Suby Kakkar)" />
              <span className="dummy-tag">Dummy photo — replace with real portrait</span>
            </div>
          </div>
        </div>
        <div className="stats-band">
          <div className="stat-col">
            <span className="stat-ic" style={{ background: '#EAF6EC' }}><MapPin size={20} /></span>
            <b>Sector 3 · Jammu</b><span>Clinic Location</span>
          </div>
          <div className="stat-col">
            <span className="stat-ic" style={{ background: '#EEF4EE', color: '#5F7F66' }}><Clock size={20} /></span>
            <b>10–6 · Open 7 days</b><span>Clinic Hours</span>
          </div>
          <div className="stat-col">
            <span className="stat-ic" style={{ background: '#FBF3D9', color: '#B98F3E' }}><Sparkles size={20} /></span>
            <b>FUE · BioSapphire</b><span>Hair Transplant</span>
          </div>
        </div>

        <div style={{ marginTop: 34 }}>
          <h3 style={{ fontSize: '1.125rem' }}>About Doctor</h3>
          <p style={{ color: 'var(--ink-2)', marginTop: 10, fontSize: '.94rem' }}>
            Dr. Suby Kakkar is the Clinical Director at Hair Haven Transplant Clinic, Channi Himmat, Jammu. He leads
            consultations for hair transplant and hair restoration, and plans each patient&apos;s treatment with the
            clinic team. Every recommendation is made after an in-person assessment of your hair loss.
            {expanded && (
              <> The clinic&apos;s approach is deliberately conservative: graft counts are estimated from your actual
              donor density, hairlines are designed around your face and age, and non-surgical options like PRP and
              GFC are recommended first when surgery is not yet the right step. Follow-up care — wash guidance,
              medication reviews and growth checks — is handled by the same team that treated you.</>
            )}
          </p>
          <button className="link-arrow" style={{ marginTop: 6 }} onClick={() => setExpanded(!expanded)}>{expanded ? 'Read less' : 'Read more'} <ChevronRight size={14} style={{ transform: expanded ? 'rotate(90deg)' : 'none' }} /></button>
        </div>

        <div style={{ marginTop: 30 }}>
          <h3 style={{ fontSize: '1.125rem' }}>Available Time</h3>
          <div className="date-strip2" style={{ marginTop: 14 }} role="group" aria-label="Pick a preferred date">
            {days.map((d) => (
              <button key={d.iso} className="date-chip" aria-pressed={selDate === d.iso} onClick={() => setSelDate(d.iso)}>
                <b>{d.day}</b>{d.label}
              </button>
            ))}
          </div>
          <p className="overline" style={{ marginTop: 18, marginBottom: 10 }}>Preferred Slots</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} role="group" aria-label="Pick a preferred time">
            {SLOTS.map((s) => (
              <button key={s} className="slot-pill" aria-pressed={selSlot === s} onClick={() => setSelSlot(s)}>{s}</button>
            ))}
          </div>
          <p className="small" style={{ marginTop: 12, display: 'flex', gap: 7, alignItems: 'center', color: 'var(--ink-2)' }}>
            <Info size={14} style={{ color: '#5F7F66', flex: 'none' }} /> Preferred time — the clinic confirms your exact slot personally
          </p>
          <button className="btn btn-primary btn-chip profile-cta" style={{ marginTop: 18 }} onClick={() => onBookVisit(selDate, selSlot)}>
            Book Appointment <span className="chip"><ArrowRight size={16} /></span>
          </button>
        </div>
      </div>
    </section>
  )
}
function useMemoDays(count = 5) {
  const out: { label: string; day: string; mon: string; iso: string }[] = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i)
    out.push({
      label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      day: String(d.getDate()),
      mon: d.toLocaleDateString('en-IN', { month: 'short' }),
      iso: d.toISOString().slice(0, 10),
    })
  }
  return out
}

/* ───────────────────────── Services & Process ───────────────────────── */
const SERVICE_GROUPS: { name: string; titles: string[] }[] = [
  { name: 'Hair Transplant', titles: ['FUE Hair Transplant', 'Advanced BioSapphire FUE', 'Hairline Design & Graft Estimation'] },
  { name: 'Beard & Eyebrow', titles: ['Beard Transplant', 'Eyebrow Transplant'] },
  { name: 'Treatments & Therapies', titles: ['PRP Therapy', 'GFC Therapy', 'Hair Regrowth Treatments', 'Scalp Assessment & Hair Analysis'] },
]
function Services({ query }: { query: string }) {
  const q = query.trim().toLowerCase()
  const matches = (s: Service) => !q || (s.title + ' ' + s.desc).toLowerCase().includes(q)
  const anyMatch = SERVICES.some(matches)
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <span className="overline">Our Services</span>
          <h2>Complete hair restoration, under one roof</h2>
          <p>Surgical and non-surgical treatments, planned around your actual hair-loss stage. Your treatment plan — and its cost — is confirmed only after an in-clinic assessment.</p>
        </div>
        {q && (
          <p className="small" style={{ marginBottom: 18, color: 'var(--ink-2)' }}>
            {anyMatch ? <>Showing treatments matching <strong>“{query.trim()}”</strong>.</> : <>No treatment matches <strong>“{query.trim()}”</strong> — try “FUE”, “PRP” or “beard”.</>}
          </p>
        )}
        {SERVICE_GROUPS.map((g) => {
          const rows = SERVICES.filter((s) => g.titles.includes(s.title) && matches(s))
          if (rows.length === 0) return null
          return (
          <div className="svc-group" key={g.name}>
            <h3>{g.name}</h3>
            {rows.map((s) => (
              <div className="svc-row" key={s.title}>
                <span className="ic"><ServiceIcon k={s.icon} /></span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          )
        })}
        <div className="services-cta">
          <p>Not sure which treatment fits your stage?</p>
          <button className="btn btn-primary btn-chip" onClick={() => scrollToId('book')}>Book a Consultation <span className="chip"><ArrowRight size={16} /></span></button>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="process-panel">
          <div className="section-head" style={{ marginBottom: 40 }}>
            <span className="overline">The Procedure</span>
            <h2>Our treatment process</h2>
            <p>A rigorous, step-by-step scientific approach for maximum graft survival, natural aesthetics and a smooth recovery.</p>
          </div>
          <div className="process-grid">
            {PROCESS.map((p) => (
              <article className="proc-step" key={p.step}>
                <div className="step-art"><img src={asset(p.img)} alt={p.title} loading="lazy" /></div>
                <span className="num">STEP {p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Team ───────────────────────── */
function Team() {
  return (
    <section id="team">
      <div className="container">
        <div className="section-head">
          <span className="overline">Meet the Team</span>
          <h2>The people behind your restoration</h2>
          <p>Our clinical team handles everything from assessment and surgery to long-term follow-up care.</p>
        </div>
        <div className="founder">
          <img src={asset('founder.png')} alt="Mr. Harish Kalsotra, Founder of Hair Haven" loading="lazy" />
          <div>
            <span className="overline" style={{ marginBottom: 8 }}>Founder</span>
            <h3 style={{ fontSize: '1.5rem' }}>Mr. Harish Kalsotra</h3>
            <p style={{ color: 'var(--forest)', fontWeight: 700, fontSize: '.92rem', marginTop: 4 }}>Founder &amp; Client Relations</p>
            <p style={{ color: 'var(--ink-2)', marginTop: 14, maxWidth: 520 }}>The clinic&apos;s founder leads client relations personally — from your first consultation call to your 12-month review.</p>
          </div>
        </div>
        <div className="team-grid">
          {TEAM.map((t) => (
            <article className="member" key={t.name}>
              <img src={t.img} alt={`Portrait placeholder for ${t.name} (dummy photo)`} loading="lazy" style={{ width: 86, height: 86, borderRadius: '50%', objectFit: 'cover', marginBottom: 14 }} />
              <p className="role">{t.role}</p>
              <h3>{t.name}</h3>
            </article>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>Portraits above are temporary dummy placeholders — the clinic&apos;s real team photos replace them in the editing round.</p>
      </div>
    </section>
  )
}

/* ───────────────────────── Calculator ───────────────────────── */
function Calculator({ onBookEstimate }: { onBookEstimate: (stage: Norwood) => void }) {
  const [stage, setStage] = useState(3)
  const info = NORWOOD[stage - 1]
  return (
    <section id="calculator" className="band">
      <div className="container">
        <div className="section-head">
          <span className="overline">Hair Analysis</span>
          <h2>Norwood stage &amp; graft estimator</h2>
          <p>Select the stage that most closely matches your hair loss to see an estimated graft range, procedure time and recovery — the same estimator used on our existing website.</p>
        </div>
        <div className="panel">
          <div className="stage-picker" role="group" aria-label="Select your Norwood stage">
            {NORWOOD.map((n) => (
              <button key={n.stage} className="stage-btn" aria-pressed={stage === n.stage} onClick={() => setStage(n.stage)}>
                Stage {n.stage}
              </button>
            ))}
          </div>
          <div className="calc-grid">
            <div className="calc-img">
              <img src={asset(`norwood${stage}.png`)} alt={`Norwood stage ${stage} illustration`} loading="lazy" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Stage {info.stage} — {info.name}</h3>
              <p style={{ color: 'var(--ink-2)', marginTop: 7 }}>{info.description}</p>
              <div className="stat-grid">
                <div className="stat"><span>Estimated grafts</span><b>{info.grafts}</b></div>
                <div className="stat"><span>Norwood stage</span><b>Stage {info.stage} of 7</b></div>
                <div className="stat"><span>Procedure duration</span><b>{info.duration}</b></div>
                <div className="stat"><span>Typical recovery</span><b>{info.recovery}</b></div>
                <div className="stat"><span>Donor density</span><b>{info.density}</b></div>
                <div className="stat"><span>Next step</span><b>Free assessment</b></div>
              </div>
              <div className="disclaimer">
                <AlertCircle size={17} />
                <span><strong>Preliminary estimate only.</strong> This self-assessment is not a medical diagnosis or a guaranteed treatment plan. Your graft count, suitability and final price are confirmed only after an in-clinic assessment by our team.</span>
              </div>
              {stage > 1 && (
                <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => onBookEstimate(info)}>
                  Book a consultation with this estimate <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Booking ───────────────────────── */
interface Booking {
  id: string; name: string; phone: string; email: string; service: string;
  mode: string; date: string; slot: string; notes: string; createdAt: string; status: string;
}
const loadBookings = (): Booking[] => {
  try { return JSON.parse(localStorage.getItem('hh_bookings') || '[]') } catch { return [] }
}
const saveBookings = (list: Booking[]) => {
  try { localStorage.setItem('hh_bookings', JSON.stringify(list)) } catch { /* storage unavailable */ }
}

function BookingSection({ prefill, toast, profileName }: { prefill: { service?: string; date?: string; slot?: string; nonce: number }; toast: (m: string) => void; profileName: string }) {
  const days = useMemoDays(7)
  const [treatment, setTreatment] = useState('Consultation')
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [done, setDone] = useState<Booking | null>(null)
  const [list, setList] = useState<Booking[]>(() => loadBookings())
  const stripRef = (el: HTMLDivElement | null) => { if (el) el.dataset.strip = '1' }

  useEffect(() => {
    if (!prefill.nonce) return
    if (prefill.service) setTreatment(prefill.service)
    if (prefill.date) setDate(prefill.date)
    if (prefill.slot) setSlot(prefill.slot)
    setDone(null)
  }, [prefill])

  const monthName = new Date(days[0].iso + 'T12:00:00').toLocaleDateString('en-IN', { month: 'long' })
  const fmtDay = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

  const request = () => {
    if (!date || !slot) return
    const rec: Booking = {
      id: 'HH-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: profileName, phone: '', email: '', service: treatment, mode: 'In-clinic', date, slot, notes: '', createdAt: new Date().toISOString(), status: 'Requested',
    }
    const next = [rec, ...list]
    setList(next); saveBookings(next); setDone(rec)
  }
  const cancel = (id: string) => {
    const next = list.filter((b) => b.id !== id)
    setList(next); saveBookings(next); toast('Request cancelled.')
  }
  const viewCalendar = () => {
    const el = document.querySelector<HTMLDivElement>('[data-strip="1"]')
    el?.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
  }

  return (
    <section id="book">
      <div className="container">
        <div className="section-head">
          <span className="overline">Book Consultation</span>
          <h2>Request an appointment</h2>
          <p>Pick a preferred date and time — the clinic confirms your exact slot personally on call or WhatsApp. Nothing here is a confirmed booking yet.</p>
        </div>
        <div className="sheet">
          <span className="sheet-pill" aria-hidden="true">Book Appointment</span>
          {done ? (
            <div className="confirm-c">
              <span className="ok-ring"><Check size={32} /></span>
              <h3 style={{ fontSize: '1.35rem', marginTop: 18 }}>Appointment requested</h3>
              <p style={{ fontWeight: 650, marginTop: 10 }}>Dr. Suby Kakkar · {fmtDay(done.date)} · {done.slot}</p>
              <p className="small" style={{ color: 'var(--ink-2)', maxWidth: 300, margin: '10px auto 0' }}>
                The clinic will confirm your exact slot personally on call or WhatsApp. This is a request, not a confirmed booking.
              </p>
              <p className="small muted" style={{ marginTop: 12 }}>Reference: <strong style={{ color: 'var(--ink)' }}>{done.id}</strong> · {done.service}</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 22, minHeight: 56 }} onClick={() => { setDone(null); scrollToId('home') }}>Done</button>
              <button className="link-arrow" style={{ marginTop: 16 }} onClick={() => scrollToId('my-requests')}>View My Appointments</button>
            </div>
          ) : (
            <>
              <div className="grab" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <h3 style={{ fontSize: '1.25rem' }}>Book Appointment</h3>
                <button className="circle-btn" style={{ width: 36, height: 36, background: '#F4F3EE', border: 'none' }} aria-label="Close booking" onClick={() => scrollToId('doctor')}><X size={16} /></button>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 18 }}>
                <img src="/img/doc-suby.jpg" alt="Portrait placeholder (dummy photo)" style={{ width: 56, height: 56, borderRadius: 16, objectFit: 'cover', objectPosition: 'top' }} />
                <div>
                  <b style={{ display: 'block' }}>Dr. Suby Kakkar</b>
                  <span className="small muted">Clinical Director · Hair Haven</span>
                  <span className="small" style={{ display: 'block', color: 'var(--forest)', fontWeight: 650 }}>Treatment: {treatment}</span>
                </div>
                <button className="btn" disabled style={{ marginLeft: 'auto', minHeight: 36, padding: '0 14px', fontSize: '.82rem', background: '#F4F3EE', color: 'var(--ink-3)' }}>Change</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 24 }}>
                <b>{monthName}</b>
                <button className="link-arrow" onClick={viewCalendar}>View Full Calendar</button>
              </div>
              <div className="date-strip2" style={{ marginTop: 10 }} ref={stripRef} role="group" aria-label="Pick a preferred date">
                {days.map((d) => (
                  <button key={d.iso} className="date-chip" aria-pressed={date === d.iso} onClick={() => setDate(d.iso)}>
                    <b>{d.day}</b>{d.label}
                  </button>
                ))}
              </div>
              <h4 style={{ fontSize: '1rem', marginTop: 20 }}>Select a Time</h4>
              <div className="slot-grid" style={{ marginTop: 12 }} role="group" aria-label="Preferred time slots">
                {SLOTS.map((s) => (
                  <button key={s} className="slot" aria-pressed={slot === s} onClick={() => setSlot(s)}>{s}</button>
                ))}
              </div>
              <p className="small" style={{ marginTop: 12, display: 'flex', gap: 7, alignItems: 'center', color: 'var(--ink-2)' }}>
                <Info size={14} style={{ color: '#5F7F66', flex: 'none' }} /> Preferred time — the clinic confirms your exact slot personally
              </p>
              <button className="btn btn-primary btn-chip" style={{ width: '100%', marginTop: 20, minHeight: 56 }} disabled={!date || !slot} onClick={request}>
                Request Appointment {date && slot && <span className="chip"><ArrowRight size={16} /></span>}
              </button>
            </>
          )}
        </div>

        <div id="my-requests" style={{ marginTop: 34 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>My requests on this device</h3>
          {list.length === 0
            ? <p className="small muted">No requests yet — your appointment requests will appear here.</p>
            : list.map((b) => (
              <article className="booking-item" key={b.id}>
                <div>
                  <b>{b.service}</b>
                  <span className="small muted" style={{ display: 'block' }}>{fmtDay(b.date)} · {b.slot} · Ref {b.id} · Requested — awaiting clinic confirmation</span>
                </div>
                <button className="btn btn-ghost" style={{ minHeight: 40, padding: '0 16px', fontSize: '.85rem' }} onClick={() => cancel(b.id)}>Cancel</button>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Gallery ─────────────────────────
   Per v2 spec: the repo's gallery files are marketing posters with outcome
   claims baked in ("Results 100%") — they are NOT published as photos.
   This section stays honest until the clinic supplies a clean, consented set. */
function Results() {
  return (
    <section id="results">
      <div className="container">
        <div className="section-head">
          <span className="overline">Gallery</span>
          <h2>Patient results gallery</h2>
          <p>Shared with patient consent. Results vary from person to person — your expected outcome is discussed honestly at consultation, never promised in advance.</p>
        </div>
        <div className="gallery-empty">
          <h3>Our verified photo gallery is being prepared</h3>
          <p>We only publish real patient photos with consent and without exaggerated claims — so this gallery will open once the clinic&apos;s verified set is ready. Until then, the clinic&apos;s latest posts are on Instagram.</p>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', justifyContent: 'center', marginTop: 22 }}>
            <a className="link-arrow" href={CLINIC.instagram} target="_blank" rel="noreferrer"><AtSign size={16} /> @hairhaventransplantclinic</a>
            <a className="link-arrow" href={CLINIC.googleReviews} target="_blank" rel="noreferrer">Patient reviews on Google <ArrowRight size={15} /></a>
          </div>
          <p className="small muted">Shared with patient consent · Results vary from person to person</p>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Journey & Aftercare ───────────────────────── */
function Journey() {
  return (
    <section id="journey" className="band">
      <div className="container">
        <div className="section-head">
          <span className="overline">My Hair Journey</span>
          <h2>Your 12-month recovery journey</h2>
          <p>A transplant is a journey, not a day. Here is the clinic&apos;s standard recovery arc — in the upcoming Hair Haven app, this becomes your personal timeline with photo check-ins and team feedback.</p>
        </div>
        <div className="timeline" style={{ maxWidth: 860 }}>
          {JOURNEY.map((j) => (
            <div className="tl-item" key={j.when}>
              <span className="tl-when">{j.when}</span>
              <div><h3>{j.title}</h3><p className="small" style={{ color: 'var(--ink-2)', marginTop: 4 }}>{j.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="after-grid" style={{ marginTop: 40 }}>
          {[
            { t: 'Hair washing', d: 'Begin gentle washing only when the clinic advises, using the technique demonstrated at discharge. Never scrub the graft area in the first days.' },
            { t: 'Sleeping position', d: 'Sleep with your head elevated for the first few nights to reduce swelling, and avoid friction against the graft area.' },
            { t: 'Sun & activity', d: 'Protect the scalp from direct sun and avoid heavy exercise, swimming and helmets until the clinic clears you at review.' },
            { t: 'Follow-ups & therapy', d: 'Keep every follow-up. PRP/GFC sessions, when prescribed, support growth through the shedding and early-growth phases.' },
          ].map((c) => (
            <article className="tint-card" key={c.t}>
              <h3 style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Heart size={17} color="var(--forest)" /> {c.t}</h3>
              <p className="small" style={{ color: 'var(--ink-2)', marginTop: 7 }}>{c.d}</p>
            </article>
          ))}
        </div>
        <div className="disclaimer" style={{ marginTop: 16 }}>
          <AlertCircle size={17} />
          <span><strong>General information only.</strong> This guidance does not replace the personalised aftercare instructions and any medication prescribed by your treating doctor. If something feels unusual, contact the clinic — that is exactly what our follow-up team is for.</span>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="section-head center">
          <span className="overline">Questions</span>
          <h2>Frequently asked questions</h2>
        </div>
        {FAQS.map((f, i) => (
          <div className="faq-item" key={f.q}>
            <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}
              <ChevronDown size={19} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flex: 'none' }} />
            </button>
            {open === i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── Contact & Footer ───────────────────────── */
function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-head">
          <span className="overline">Visit Us</span>
          <h2>Find the clinic</h2>
          <p>Located in the heart of Jammu at Channi Himmat. Tap the map or the directions button to start GPS navigation.</p>
        </div>
        <div className="grid grid-2" style={{ alignItems: 'stretch', gap: 40 }}>
          <div className="map-wrap">
            <iframe title="Hair Haven location map" src={CLINIC.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div>
            <div className="kv"><span><MapPin size={14} /> Address</span><b>{CLINIC.address}</b></div>
            <div className="kv"><span><Clock size={14} /> Hours</span><b>10:00 AM – 6:00 PM · Open 7 days</b></div>
            <div className="kv"><span><Phone size={14} /> Phone / WhatsApp</span><b>{CLINIC.phoneDisplay}</b></div>
            <div className="kv"><span><AtSign size={14} /> Instagram</span><b>@hairhaventransplantclinic</b></div>
            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center', marginTop: 24 }}>
              <a className="btn btn-primary" href={CLINIC.maps} target="_blank" rel="noreferrer"><Navigation size={16} /> Get Directions</a>
              <a className="link-arrow" href={waLink('Hello Hair Haven, I would like to book a consultation.')} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp the clinic</a>
            </div>
            <p className="small muted" style={{ marginTop: 20, display: 'flex', gap: 7 }}><Camera size={15} style={{ flex: 'none', marginTop: 2 }} /> Tip: bring photos of your hair loss (front, sides, crown) to your consultation — they help the team assess your stage faster.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <h4>Hair Haven Transplant Clinic</h4>
            <p style={{ fontSize: '.9rem', maxWidth: 380 }}>Premium hair restoration in Jammu — FUE &amp; BioSapphire FUE hair transplant, PRP &amp; GFC therapy, beard &amp; eyebrow transplant.</p>
            <p style={{ fontSize: '.9rem', marginTop: 12 }}>{CLINIC.address}<br />{CLINIC.phoneDisplay} · {CLINIC.hours}</p>
          </div>
          <div>
            <h4>Explore</h4>
            {[['Services', 'services'], ['Treatment Process', 'process'], ['Our Team', 'team'], ['Graft Calculator', 'calculator'], ['Gallery', 'results'], ['My Hair Journey', 'journey'], ['Book Consultation', 'book']].map(([l, id]) => (
              <p key={id} style={{ marginBottom: 7 }}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id) }}>{l}</a></p>
            ))}
          </div>
          <div>
            <h4>Connect</h4>
            <p style={{ marginBottom: 7 }}><a href={CLINIC.instagram} target="_blank" rel="noreferrer">Instagram — @hairhaventransplantclinic</a></p>
            <p style={{ marginBottom: 7 }}><a href={waLink('Hello Hair Haven')} target="_blank" rel="noreferrer">WhatsApp the clinic</a></p>
            <p style={{ marginBottom: 7 }}><a href={CLINIC.googleReviews} target="_blank" rel="noreferrer">Reviews on Google</a></p>
            <p><a href={CLINIC.maps} target="_blank" rel="noreferrer">Directions on Google Maps</a></p>
          </div>
        </div>
        <div className="foot-note">
          <p>Medical disclaimer: Content on this website, including the Norwood self-assessment and graft estimator, is general information and a preliminary estimate only. It is not a medical diagnosis, a prescription, or a guarantee of results. Treatment suitability and final pricing are confirmed after an in-person assessment at the clinic.</p>
          <p style={{ marginTop: 9 }}>© {new Date().getFullYear()} Hair Haven Transplant Clinic, Jammu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* Floating glassmorphism pill nav (v4, Reference A): active tab = filled green circle */
function BottomNav() {
  const tabs = [
    { id: 'top', label: 'Home', Icon: Home },
    { id: 'book', label: 'Appointments', Icon: CalendarCheck },
    { id: 'results', label: 'Gallery', Icon: Heart },
    { id: 'contact', label: 'Profile', Icon: User },
  ]
  const [active, setActive] = useState('top')
  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.4
      let current = 'top'
      tabs.forEach((t) => {
        const el = document.getElementById(t.id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) current = t.id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      {tabs.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${active === id ? 'active' : ''}${id === 'results' ? ' heart-tab' : ''}`.trim() || undefined}
          aria-current={active === id ? 'page' : undefined}
          onClick={(e) => { e.preventDefault(); setActive(id); if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' }); else scrollToId(id) }}
        >
          <span className="tab-ic"><Icon size={21} /></span>
        </a>
      ))}
    </nav>
  )
}

/* ───────────────────────── App ───────────────────────── */
export default function App() {
  const [prefill, setPrefill] = useState<{ service?: string; date?: string; slot?: string; notes?: string; nonce: number }>({ nonce: 0 })
  const [toastMsg, setToastMsg] = useState('')
  const [query, setQuery] = useState('')
  const [profile, setProfile] = useState<Profile | null>(() => loadProfile())
  const [authOpen, setAuthOpen] = useState(false)
  const toast = (m: string) => { setToastMsg(m); window.setTimeout(() => setToastMsg(''), 4200) }
  const startFlow = () => { if (profile) scrollToId('home'); else setAuthOpen(true) }
  const avatarTap = () => { if (!profile) setAuthOpen(true); else toast(`Signed in (demo) as ${profile.name} — profile is saved only on this device.`) }
  const bookCategory = (service: string) => { setPrefill({ service, nonce: Date.now() }); scrollToId('book') }
  const bookVisit = (date: string, slot: string) => {
    setPrefill({ service: 'FUE Hair Transplant', date, slot, nonce: Date.now() })
    scrollToId('book')
    toast('Date and time carried into your booking — add your details to finish the request.')
  }

  const bookEstimate = (_n: Norwood) => {
    setPrefill({ service: 'FUE Hair Transplant', nonce: Date.now() })
    scrollToId('book')
    toast('Your estimate is preliminary — the clinic confirms grafts and plan at your assessment.')
  }

  return (
    <>
      <div className="blobs" aria-hidden="true">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      </div>
      <Header />
      <main>
        <Hero onStart={startFlow} />
        <HomeComp query={query} setQuery={setQuery} onCategory={bookCategory} profileName={profile ? profile.name.split(' ')[0] : 'Aman'} onAvatar={avatarTap} />
        <DoctorProfile onBookVisit={bookVisit} toast={toast} />
        <Services query={query} />
        <Process />
        <Team />
        <Calculator onBookEstimate={bookEstimate} />
        <BookingSection prefill={prefill} toast={toast} profileName={profile ? profile.name : 'Guest'} />
        <Results />
        <Journey />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
      {authOpen && (
        <AuthFlow
          onClose={() => setAuthOpen(false)}
          onDone={(p) => { setProfile(p); setAuthOpen(false); toast(`Welcome, ${p.name.split(' ')[0]}! Demo profile created — saved only on this device.`); scrollToId('home') }}
        />
      )}
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </>
  )
}
