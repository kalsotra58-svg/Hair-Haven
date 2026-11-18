import { useEffect, useState } from 'react'
import {
  Phone, MapPin, Clock, ChevronDown, Menu, X, ArrowRight, ArrowLeft,
  MessageCircle, Sparkles, Shield, Heart, Stethoscope, Scissors, Leaf, Eye,
  CalendarCheck, Camera, AlertCircle, CheckCircle2, Navigation, AtSign, Droplets, Home,
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

interface Service { title: string; desc: string; price: string; features: string[]; icon: 'scissors' | 'sparkles' | 'droplets' | 'leaf' | 'eye' | 'stethoscope' }
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
const TEAM = [
  { initials: 'SK', name: 'Dr. Suby Kakkar', role: 'Clinical Director' },
  { initials: 'ME', name: 'Maxon Epston', role: 'Hair Transplant & PRP' },
  { initials: 'KG', name: 'Kashish Gupta', role: 'Graft Implantation & Hairline' },
  { initials: 'RB', name: 'Ronika Bhardwaj', role: 'Follow-ups & Patient Care' },
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

/* ───────────────────────── Hero (v3 onboarding style) ───────────────────────── */
function Hero() {
  return (
    <div className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="overline">Hair Haven Transplant Clinic · Jammu</span>
          <h1>Your Hair, <span className="grn">Your Confidence</span></h1>
          <p className="lead" style={{ marginTop: 18 }}>
            FUE, BioSapphire FUE, PRP and GFC treatments in Channi Himmat, Jammu — every plan begins with an honest assessment of your hair loss.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-chip" onClick={() => scrollToId('home')}>
              <span className="chip"><Sparkles size={16} /></span> Get Started <span className="chip"><ArrowRight size={16} /></span>
            </button>
          </div>
          <div className="dots" style={{ marginTop: 26 }} aria-hidden="true"><span className="on" /><span /><span /></div>
          <div className="hero-meta">
            <span><MapPin size={16} /> Sector 3, Channi Himmat</span>
            <span><Clock size={16} /> {CLINIC.hours}</span>
            <span><Shield size={16} /> Sterile OT standards</span>
          </div>
        </div>
        <div className="hero-photo">
          <img src={asset('founder.png')} alt="Harish Kalsotra, Founder of Hair Haven Transplant Clinic" />
          <span className="hero-chip"><MapPin size={15} /> Hair Haven Transplant Clinic · Channi Himmat, Jammu</span>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Home composition (v3) ───────────────────────── */
function HomeComp({ query, setQuery, onCategory }: { query: string; setQuery: (q: string) => void; onCategory: (service: string) => void }) {
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const cats = [
    { label: 'FUE', icon: 'scissors' as const, lime: true, service: 'FUE Hair Transplant' },
    { label: 'PRP', icon: 'droplets' as const, lime: false, service: 'PRP Therapy' },
    { label: 'GFC', icon: 'leaf' as const, lime: false, service: 'GFC Therapy' },
    { label: 'More', icon: 'sparkles' as const, lime: false, service: '' },
  ]
  return (
    <section id="home" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="greet-row">
          <img className="g-av" src={asset('logo.png')} alt="Hair Haven logo" />
          <div><small>{greet}</small><b>Aman!</b></div>
          <button className="bell-btn" aria-label="Book a consultation" onClick={() => scrollToId('book')}><Bell size={20} /></button>
        </div>
        <div className="search-row">
          <label className="search-pill">
            <Search size={19} />
            <input type="search" placeholder="Search treatments…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search treatments" />
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

        <div className="feat-doc">
          <div>
            <span className="role">Featured Doctor</span>
            <h3>Dr. Suby Kakkar</h3>
            <p>Clinical Director at Hair Haven — leading assessments, transplant planning and growth-factor therapies.</p>
            <button className="btn btn-primary btn-chip" onClick={() => scrollToId('doctor')}>Book Appointment <span className="chip"><ArrowRight size={16} /></span></button>
          </div>
          <div className="portrait-ph" role="img" aria-label="Portrait of Dr. Suby Kakkar — real photo coming soon">
            <span className="ini">SK</span>
            <span className="tag">Real photo coming soon</span>
          </div>
        </div>

        <div style={{ marginTop: 34 }}>
          <div className="sec-row">
            <h2>Our Specialists</h2>
            <button onClick={() => scrollToId('team')}>See All</button>
          </div>
          <div className="spec-grid">
            {TEAM.filter((t) => ['Maxon Epston', 'Kashish Gupta'].includes(t.name)).map((t) => (
              <button key={t.name} className="spec-card" onClick={() => scrollToId('team')}>
                <span className="avatar-fallback">{t.initials}</span>
                <span><h4>{t.name}</h4><p>{t.role}</p></span>
                <span className="go"><ArrowRight size={17} /></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Doctor profile (v3) ───────────────────────── */
function DoctorProfile({ onBookVisit, toast }: { onBookVisit: (date: string, slot: string) => void; toast: (m: string) => void }) {
  const days = useMemoDays()
  const [selDate, setSelDate] = useState(days[0].iso)
  const [selSlot, setSelSlot] = useState('10:00 AM')
  const [liked, setLiked] = useState(false)
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); toast('Page link copied — share it with anyone considering treatment.') }
    catch { toast('Copy the page address from your browser to share it.') }
  }
  return (
    <section id="doctor">
      <div className="container">
        <div className="profile-top">
          <button className="circle-btn" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowLeft size={19} /></button>
          <span style={{ fontWeight: 700 }}>Doctor Profile</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <button className={`circle-btn${liked ? ' on' : ''}`} aria-label="Save doctor" aria-pressed={liked} onClick={() => setLiked(!liked)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button>
            <button className="circle-btn" aria-label="Share this page" onClick={share}><Share2 size={18} /></button>
          </span>
        </div>
        <div className="profile-grid">
          <div className="profile-photo">
            <div className="portrait-ph" role="img" aria-label="Portrait of Dr. Suby Kakkar — real photo coming soon">
              <span className="ini">SK</span>
              <span className="tag">Real photo coming soon</span>
            </div>
            <button className="book-pill-vert" onClick={() => scrollToId('book')}>BOOK</button>
          </div>
          <div>
            <span className="overline" style={{ marginBottom: 8 }}>Clinical Director</span>
            <h2 style={{ fontSize: '1.7rem' }}>Dr. Suby Kakkar</h2>
            <div className="stat-row">
              <div className="stat-cell"><span><MapPin size={13} /> Location</span><b>Sector 3, Jammu</b></div>
              <div className="stat-cell"><span><Clock size={13} /> Hours</span><b>10–6 · 7 days</b></div>
              <div className="stat-cell"><span><Sparkles size={13} /> Focus</span><b>FUE · BioSapphire</b></div>
            </div>
            <h3>About</h3>
            <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>
              Dr. Suby Kakkar leads the clinical team at Hair Haven Transplant Clinic, Jammu — overseeing scalp
              assessments, hair transplant procedures and growth-factor therapies. Every treatment plan at the
              clinic is confirmed only after an in-person assessment; nothing is prescribed from photos alone.
            </p>
            <h3 style={{ marginTop: 24 }}>Available Time</h3>
            <div className="date-chips" style={{ marginTop: 12 }} role="group" aria-label="Pick a preferred date">
              {days.map((d) => (
                <button key={d.iso} className="date-chip" aria-pressed={selDate === d.iso} onClick={() => setSelDate(d.iso)}>
                  {d.label}<b>{d.day}</b>{d.mon}
                </button>
              ))}
            </div>
            <div className="slot-grid" style={{ marginTop: 14 }} role="group" aria-label="Pick a preferred time">
              {SLOTS.map((s) => (
                <button key={s} className="slot" aria-pressed={selSlot === s} onClick={() => setSelSlot(s)}>{s}</button>
              ))}
            </div>
            <p className="small muted" style={{ marginTop: 12 }}>These are preferred times within clinic hours (10 AM – 6 PM) — the clinic confirms your exact slot personally.</p>
            <button className="btn btn-primary btn-chip" style={{ marginTop: 18 }} onClick={() => onBookVisit(selDate, selSlot)}>
              Book Appointment <span className="chip"><ArrowRight size={16} /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
function useMemoDays() {
  const out: { label: string; day: string; mon: string; iso: string }[] = []
  const now = new Date()
  for (let i = 0; i < 5; i++) {
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
              <span className="avatar-fallback">{t.initials}</span>
              <p className="role">{t.role}</p>
              <h3>{t.name}</h3>
            </article>
          ))}
        </div>
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

function BookingSection({ prefill, toast }: { prefill: { service?: string; date?: string; slot?: string; notes?: string; nonce: number }; toast: (m: string) => void }) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('FUE Hair Transplant')
  const [mode, setMode] = useState('In-clinic')
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState<Booking | null>(null)
  const [mine, setMine] = useState<Booking[]>(loadBookings)

  useEffect(() => {
    if (prefill.nonce === 0) return
    if (prefill.service) setService(prefill.service)
    if (prefill.date) setDate(prefill.date)
    if (prefill.slot) setSlot(prefill.slot)
    if (prefill.notes) setNotes(prefill.notes)
    setDone(null); setStep(1)
  }, [prefill])

  const todayIso = new Date().toISOString().slice(0, 10)

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!date) e.date = 'Please pick a preferred date.'
    else if (date < todayIso) e.date = 'Please pick a date from today onwards.'
    if (!slot) e.slot = 'Please pick a preferred time.'
    setErrors(e); return Object.keys(e).length === 0
  }
  const validateStep3 = () => {
    const e: Record<string, string> = {}
    if (name.trim().length < 3) e.name = 'Please enter your full name.'
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Please enter a valid 10-digit Indian mobile number.'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email address does not look complete.'
    setErrors(e); return Object.keys(e).length === 0
  }

  const submit = () => {
    if (!validateStep3()) return
    const booking: Booking = {
      id: 'HH-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: name.trim(), phone: phone.trim(), email: email.trim(), service, mode, date, slot,
      notes: notes.trim(), createdAt: new Date().toISOString(), status: 'Request sent — awaiting clinic confirmation',
    }
    const all = [booking, ...loadBookings()]
    localStorage.setItem('hh_bookings', JSON.stringify(all))
    setMine(all); setDone(booking); setStep(4)
    toast('Booking request saved. Send it to the clinic on WhatsApp to confirm fastest.')
  }

  const cancelMine = (id: string) => {
    const all = mine.map((b) => (b.id === id ? { ...b, status: 'Cancelled by patient' } : b))
    localStorage.setItem('hh_bookings', JSON.stringify(all)); setMine(all)
    toast('That request was marked cancelled on this device.')
  }

  const waText = done
    ? `Hello Hair Haven, I would like to book a consultation.\n\nName: ${done.name}\nPhone: ${done.phone}\nService: ${done.service}\nMode: ${done.mode}\nPreferred: ${done.date} at ${done.slot}\nReference: ${done.id}${done.notes ? `\nNotes: ${done.notes}` : ''}`
    : ''

  return (
    <section id="book">
      <div className="container">
        <div className="section-head">
          <span className="overline">Appointments</span>
          <h2>Book your consultation</h2>
          <p>Three quick steps. You choose a <strong>preferred</strong> date and time — the clinic confirms your exact appointment personally on call or WhatsApp. Nothing is auto-confirmed.</p>
        </div>
        <div className="book-grid">
          <div className="panel">
            <div className="info-banner"><Clock size={17} /><span><strong>Live schedule:</strong> the clinic is open 10:00 AM – 6:00 PM, 7 days. Times in step 2 are <strong>preferred slots</strong> — the clinic confirms live availability personally on call or WhatsApp.</span></div>
            {step < 4 && (
              <div className="steps" aria-label="Booking progress">
                {['Service', 'Date & time', 'Your details'].map((label, i) => (
                  <span key={label} className={`step-dot${step === i + 1 ? ' on' : ''}`}>{i + 1}. {label}</span>
                ))}
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="field">
                  <label htmlFor="bk-service">What would you like to consult about?</label>
                  <select id="bk-service" value={service} onChange={(e) => setService(e.target.value)}>
                    {BOOKABLE.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Consultation mode</label>
                  <div className="seg" role="group" aria-label="Consultation mode">
                    {['In-clinic', 'Online'].map((m) => (
                      <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>
                    ))}
                  </div>
                  <p className="small muted" style={{ marginTop: 7 }}>{mode === 'In-clinic' ? 'At 606/B, Sector 3, Channi Himmat, Jammu.' : 'The clinic will share the call details once your appointment is confirmed.'}</p>
                </div>
                <button className="btn btn-primary btn-block" onClick={() => setStep(2)}>Continue <ArrowRight size={16} /></button>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="field">
                  <label htmlFor="bk-date">Preferred date</label>
                  <input id="bk-date" type="date" min={todayIso} value={date} onChange={(e) => setDate(e.target.value)} />
                  {errors.date && <p className="err">{errors.date}</p>}
                </div>
                <div className="field">
                  <label>Preferred time (clinic hours 10 AM – 6 PM)</label>
                  <div className="slot-grid" role="group" aria-label="Preferred time slots">
                    {SLOTS.map((s) => (
                      <button key={s} className="slot" aria-pressed={slot === s} onClick={() => setSlot(s)}>{s}</button>
                    ))}
                  </div>
                  {errors.slot && <p className="err">{errors.slot}</p>}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-soft" onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => validateStep2() && setStep(3)}>Continue <ArrowRight size={16} /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="field">
                  <label htmlFor="bk-name">Full name *</label>
                  <input id="bk-name" type="text" autoComplete="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p className="err">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="bk-phone">Mobile number (WhatsApp) *</label>
                  <input id="bk-phone" type="tel" autoComplete="tel" placeholder="e.g. 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  {errors.phone && <p className="err">{errors.phone}</p>}
                </div>
                <div className="field">
                  <label htmlFor="bk-email">Email (optional)</label>
                  <input id="bk-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <p className="err">{errors.email}</p>}
                </div>
                <div className="field">
                  <label htmlFor="bk-notes">Anything we should know? (optional)</label>
                  <textarea id="bk-notes" rows={3} placeholder="Hair loss history, previous treatments, questions…" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-soft" onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={submit}><CalendarCheck size={17} /> Send Booking Request</button>
                </div>
                <p className="small muted" style={{ marginTop: 11 }}>Your details stay on this device and are shared with the clinic only when you tap the WhatsApp button on the next screen (or call us). No account, no password.</p>
              </div>
            )}

            {step === 4 && done && (
              <div>
                <span className="success-badge"><CheckCircle2 size={32} /></span>
                <h3 style={{ fontSize: '1.3rem' }}>Appointment requested, {done.name.split(' ')[0]}!</h3>
                <p style={{ color: 'var(--ink-2)', marginTop: 7 }}>Reference <strong>{done.id}</strong>. This is a <strong>request, not a confirmed appointment</strong> — the clinic confirms your exact slot personally. Fastest way: send the request to the clinic on WhatsApp now.</p>
                <div style={{ marginTop: 14 }}>
                  <div className="kv"><span>Service</span><b>{done.service}</b></div>
                  <div className="kv"><span>Mode</span><b>{done.mode}</b></div>
                  <div className="kv"><span>Preferred</span><b>{done.date} · {done.slot}</b></div>
                  <div className="kv"><span>Status</span><b>{done.status}</b></div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
                  <a className="btn btn-wa" href={waLink(waText)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Send to Clinic on WhatsApp</a>
                  <button className="btn btn-soft" onClick={() => { setDone(null); setStep(1) }}>Make Another Request</button>
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="side-note">
              <h3 style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Phone size={18} /> Prefer to talk?</h3>
              <p className="small" style={{ color: 'var(--ink-2)', margin: '8px 0 16px' }}>Call or WhatsApp the clinic directly — a real person from our team will help you.</p>
              <a className="btn btn-primary btn-block" href={CLINIC.phoneLink} style={{ marginBottom: 9 }}>Call {CLINIC.phoneDisplay}</a>
              <a className="btn btn-soft btn-block" href={waLink('Hello Hair Haven, I have a question.')} target="_blank" rel="noreferrer">WhatsApp Us</a>
              <div style={{ marginTop: 10 }}>
                <div className="kv"><span><Clock size={13} /> Hours</span><b>10 AM – 6 PM, daily</b></div>
                <div className="kv"><span><MapPin size={13} /> Clinic</span><b>Channi Himmat, Jammu</b></div>
              </div>
            </div>
            <hr className="divider" />
            <div className="side-note">
              <h3>My requests on this device</h3>
              {mine.length === 0 && <p className="small muted">No requests yet. When you book, your requests will appear here so you can re-check the details any time.</p>}
              {mine.slice(0, 4).map((b) => (
                <div className="req-item" key={b.id}>
                  <b>{b.service}</b>
                  <p className="small muted">{b.date} · {b.slot} · {b.mode}<br />Ref {b.id} — {b.status}</p>
                  {b.status.startsWith('Request sent') && (
                    <button className="btn btn-soft" style={{ minHeight: 36, padding: '6px 13px', fontSize: '.8rem', marginTop: 8 }} onClick={() => cancelMine(b.id)}>Cancel this request</button>
                  )}
                </div>
              ))}
            </div>
          </aside>
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

function BottomNav() {
  const tabs = [
    { id: 'top', label: 'Home', Icon: Home },
    { id: 'calculator', label: 'Assess', Icon: CalculatorIcon },
    { id: 'book', label: 'Appointments', Icon: CalendarCheck },
    { id: 'journey', label: 'Journey', Icon: TrendingUp },
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
          className={active === id ? 'active' : undefined}
          aria-current={active === id ? 'page' : undefined}
          onClick={(e) => { e.preventDefault(); setActive(id); if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' }); else scrollToId(id) }}
        >
          <span className="tab-ic"><Icon size={21} /></span>{label}
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
  const toast = (m: string) => { setToastMsg(m); window.setTimeout(() => setToastMsg(''), 4200) }
  const bookCategory = (service: string) => { setPrefill({ service, nonce: Date.now() }); scrollToId('book') }
  const bookVisit = (date: string, slot: string) => {
    setPrefill({ service: 'FUE Hair Transplant', date, slot, nonce: Date.now() })
    scrollToId('book')
    toast('Date and time carried into your booking — add your details to finish the request.')
  }

  const bookEstimate = (n: Norwood) => {
    setPrefill({
      service: 'FUE Hair Transplant',
      notes: `Norwood self-assessment: Stage ${n.stage} (${n.name}). Estimated grafts: ${n.grafts}. (Preliminary — to be confirmed at assessment.)`,
      nonce: Date.now(),
    })
    scrollToId('book')
  }

  return (
    <>
      <div className="blobs" aria-hidden="true">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      </div>
      <Header />
      <main>
        <Hero />
        <HomeComp query={query} setQuery={setQuery} onCategory={bookCategory} />
        <DoctorProfile onBookVisit={bookVisit} toast={toast} />
        <Services query={query} />
        <Process />
        <Team />
        <Calculator onBookEstimate={bookEstimate} />
        <BookingSection prefill={prefill} toast={toast} />
        <Results />
        <Journey />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </>
  )
}
