import { useEffect, useMemo, useState } from 'react'
import {
  Phone, MapPin, Clock, Calendar, Star, Check, ChevronDown, Menu, X, ArrowRight,
  MessageCircle, Sparkles, Shield, Heart, Stethoscope, Scissors, Leaf, Eye,
  CalendarCheck, Camera, AlertCircle, CheckCircle2, Navigation, AtSign, Droplets, Home,
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

const TEAM = [
  { initials: 'SK', name: 'Dr. Suby Kakkar', role: 'Clinical Director', qual: 'MBBS, E. Dermatology, Germany', bio: 'Ex-Consultant, Max Hospital Delhi. Highly experienced in advanced dermatological therapies.' },
  { initials: 'ME', name: 'Maxon Epston', role: 'Master Technician', qual: 'Hair Transplant & PRP Procedure Specialist', bio: 'Expert in hair extraction, PRP growth therapies, and advanced surgical support procedures.' },
  { initials: 'KG', name: 'Kashish Gupta', role: 'Senior Implanter', qual: 'Experienced Implanter', bio: 'Skilled in precise graft implantation and natural hairline work with years of hands-on expertise.' },
  { initials: 'RB', name: 'Ronika Bhardwaj', role: 'Patient Care Coordinator', qual: 'Follow-ups & Leads', bio: 'Manages post-transplant recovery logs, patient check-ups, and guides incoming clinical leads.' },
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

const REVIEWS = [
  { name: 'Manmohan Singh', tag: 'Attentive Care', when: '1 week ago', quote: 'That was the best experience of my life, it gave me new life, thank you Hair Haven — the best staff and people treating.' },
  { name: 'Vishwa Nath', tag: 'Clean & Hygienic', when: '3 months ago', quote: 'Clean & hygienic, sterilized equipment. As far as the result is concerned it is very good. The staff is too good.' },
  { name: 'Shubam Sakolia', tag: 'Speedy Recovery', when: '1 month ago', quote: 'I recently visited Hair Haven in Channi Himmat, and I must say, it was a delightful experience! The ambiance is wonderful and the results are amazing.' },
  { name: 'Saleem', tag: 'Attentive Care', when: '2 months ago', quote: 'I am really satisfied with the behaviour of staff members and work… my results are very good. I am very happy.' },
]

const GALLERY = ['image.png', 'image copy.png', 'image copy 2.png', 'image copy 3.png', 'image copy 4.png', 'image copy 5.png', 'image copy 6.png', 'image copy 7.png', 'image copy 8.png', 'image copy 9.png', 'image copy 10.png', 'image copy 11.png', 'image copy 12.png', 'image copy 13.png']

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
  { q: 'What is the difference between PRP and GFC therapy?', a: 'PRP uses platelet-rich plasma from your own blood to strengthen roots and reduce hair fall (₹2,000/session at Hair Haven). GFC is a more concentrated growth-factor preparation aimed at improving thickness (₹4,500/session). The clinical team will advise which suits your stage.' },
  { q: 'How much does a hair transplant cost?', a: 'It depends mainly on the grafts you need. Indicative clinic pricing starts at ₹21,000 for early-stage FUE and ₹31,000 for BioSapphire FUE. Use the Norwood estimator on this page for a preliminary range — your final plan and price are confirmed only after an in-clinic assessment.' },
  { q: 'Do you also do beard and eyebrow transplants?', a: 'Yes. Beard and eyebrow transplants are specialised procedures offered at Hair Haven with custom pricing based on the grafts and design required.' },
  { q: 'How do I book a consultation?', a: 'Use the booking form on this page, call or WhatsApp us on +91 88997 08659. Choose a preferred date and time — the clinic confirms your exact appointment personally, so nothing is ever auto-confirmed by a computer.' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ───────────────────────── Header ───────────────────────── */
function Header() {
  const [open, setOpen] = useState(false)
  const links: [string, string][] = [['Services', 'services'], ['Process', 'process'], ['Team', 'team'], ['Calculator', 'calculator'], ['Results', 'results'], ['Journey', 'journey'], ['FAQ', 'faq'], ['Contact', 'contact']]
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
          <a className="icon-btn" href={waLink('Hello Hair Haven, I would like to book a consultation.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={19} /></a>
          <a className="icon-btn" href={CLINIC.phoneLink} aria-label="Call Hair Haven"><Phone size={19} /></a>
          <button className="btn btn-primary" style={{ minHeight: 44, padding: '10px 20px' }} onClick={() => scrollToId('book')}>Book Consultation</button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
    </header>
  )
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero({ onPickDate }: { onPickDate: (iso: string) => void }) {
  const days = useMemo(() => {
    const out: { label: string; day: string; iso: string; today: boolean }[] = []
    const now = new Date()
    for (let i = 0; i < 5; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i)
      out.push({
        label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        day: String(d.getDate()),
        iso: d.toISOString().slice(0, 10),
        today: i === 0,
      })
    }
    return out
  }, [])
  return (
    <div className="hero" id="top">
      <div className="container hero-grid">
        <div className="fade-up">
          <span className="eyebrow"><Sparkles size={13} /> Hair Restoration · Channi Himmat, Jammu</span>
          <h1>The Art &amp; Science of <em>Hair Restoration</em></h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Welcome to Hair Haven, Jammu&apos;s premium hair restoration clinic. We combine advanced FUE graft
            techniques and growth-factor therapies to craft customised, natural-looking hairlines that restore
            both density and confidence.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => scrollToId('book')}>Book a Consultation <ArrowRight size={17} /></button>
            <button className="btn btn-soft" onClick={() => scrollToId('calculator')}>Estimate My Grafts</button>
          </div>
          <div className="trust-row">
            <span className="chip"><MapPin size={13} /> Sector 3, Channi Himmat</span>
            <span className="chip"><Clock size={13} /> {CLINIC.hours}</span>
            <span className="chip"><Shield size={13} /> Sterile OT standards</span>
          </div>
        </div>
        <div className="card hero-card fade-up" aria-label="Featured specialist">
          <div className="feat">
            <div className="feat-top">
              <img src={asset('doctor-avatar.png')} alt="Dr. Suby Kakkar, Clinical Director" loading="lazy" />
              <div>
                <span className="chip" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>Clinical Director</span>
                <h3 style={{ marginTop: 8 }}>Dr. Suby Kakkar</h3>
                <p>MBBS, E. Dermatology, Germany · Ex-Consultant, Max Hospital Delhi</p>
              </div>
            </div>
            <div className="date-strip" role="group" aria-label="Pick a consultation date">
              {days.map((d) => (
                <span key={d.iso} className={d.today ? 'today' : ''} onClick={() => onPickDate(d.iso)} style={{ cursor: 'pointer' }} title="Start booking for this date">
                  {d.label}<b>{d.day}</b>
                </span>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: '.78rem', color: 'rgba(255,255,255,.75)' }}>Tap a date to start booking — the clinic confirms your exact slot personally.</p>
          </div>
          <div className="hero-mini">
            <div><b>FUE &amp; BioSapphire FUE</b><span>Advanced surgical restoration</span></div>
            <div><b>PRP · GFC</b><span>Growth-factor therapies</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Services & Process ───────────────────────── */
function Services({ onBook }: { onBook: (service: string) => void }) {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Our Services</span>
          <h2>Complete hair restoration, under one roof</h2>
          <p>Surgical and non-surgical treatments, planned around your actual hair-loss stage. Prices below are the clinic&apos;s published starting prices — your final plan is confirmed at consultation.</p>
        </div>
        <div className="grid grid-3">
          {SERVICES.map((s) => (
            <article className="card" key={s.title}>
              <span className="avatar-fallback" style={{ borderRadius: 16, marginBottom: 14 }}><ServiceIcon k={s.icon} /></span>
              <h3>{s.title}</h3>
              <p className="small" style={{ color: 'var(--ink-2)', marginTop: 7 }}>{s.desc}</p>
              <ul className="ticks">{s.features.map((f) => <li key={f}><Check size={15} />{f}</li>)}</ul>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
                <span className="price">{s.price}</span>
                <button className="btn btn-soft" style={{ minHeight: 40, padding: '8px 16px', fontSize: '.85rem' }} onClick={() => onBook(s.title)}>Book</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">The Procedure</span>
          <h2>Our treatment process</h2>
          <p>A rigorous, step-by-step scientific approach for maximum graft survival, natural aesthetics and a smooth recovery.</p>
        </div>
        <div className="grid grid-4">
          {PROCESS.map((p) => (
            <article className="card" key={p.step} style={{ textAlign: 'center' }}>
              <img className="process-img" src={asset(p.img)} alt={p.title} loading="lazy" />
              <span className="chip">{p.step}</span>
              <h3 style={{ marginTop: 10 }}>{p.title}</h3>
              <p className="small muted" style={{ marginTop: 6 }}>{p.desc}</p>
            </article>
          ))}
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
          <span className="eyebrow">Meet the Team</span>
          <h2>The people behind your restoration</h2>
          <p>Led by Dr. Suby Kakkar, our clinical team handles everything from assessment and surgery to long-term follow-up care.</p>
        </div>
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 26, alignItems: 'center', marginBottom: 18 }} id="founder-card">
          <img className="team-photo" style={{ marginBottom: 0 }} src={asset('founder.png')} alt="Mr. Harish Kalsotra, Founder of Hair Haven" loading="lazy" />
          <div>
            <span className="chip">Founder</span>
            <h3 style={{ fontSize: '1.4rem', marginTop: 9 }}>Mr. Harish Kalsotra</h3>
            <p style={{ color: 'var(--forest-700)', fontWeight: 700, fontSize: '.9rem' }}>Founder &amp; Client Relations Executive</p>
            <p style={{ color: 'var(--ink-2)', marginTop: 10, maxWidth: 560 }}>“Dedicated to helping clients regain confidence through advanced hair restoration solutions and personalized care.”</p>
          </div>
        </div>
        <div className="grid grid-4">
          {TEAM.map((t) => (
            <article className="card" key={t.name}>
              <span className="avatar-fallback" style={{ width: 58, height: 58, fontSize: '1.05rem', marginBottom: 13 }}>{t.initials}</span>
              <span className="chip">{t.role}</span>
              <h3 style={{ marginTop: 9 }}>{t.name}</h3>
              <p style={{ fontSize: '.83rem', color: 'var(--forest-700)', fontWeight: 700 }}>{t.qual}</p>
              <p className="small muted" style={{ marginTop: 7 }}>{t.bio}</p>
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
    <section id="calculator">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Hair Analysis</span>
          <h2>Norwood stage &amp; graft estimator</h2>
          <p>Select the stage that most closely matches your hair loss to see an estimated graft range, procedure time and recovery — the same estimator used on our existing website.</p>
        </div>
        <div className="card">
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
                <div className="stat"><span>Indicative price</span><b>{info.priceRange}</b></div>
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

function BookingSection({ prefill, toast }: { prefill: { service?: string; date?: string; notes?: string; nonce: number }; toast: (m: string) => void }) {
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
          <span className="eyebrow">Appointments</span>
          <h2>Book your consultation</h2>
          <p>Three quick steps. You choose a <strong>preferred</strong> date and time — the clinic confirms your exact appointment personally on call or WhatsApp. Nothing is auto-confirmed.</p>
        </div>
        <div className="book-grid">
          <div className="card">
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
                <h3 style={{ fontSize: '1.3rem' }}>Request saved, {done.name.split(' ')[0]}!</h3>
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
            <div className="card" style={{ marginBottom: 18 }}>
              <h3 style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Phone size={18} /> Prefer to talk?</h3>
              <p className="small" style={{ color: 'var(--ink-2)', margin: '8px 0 14px' }}>Call or WhatsApp the clinic directly — a real person from our team will help you.</p>
              <a className="btn btn-primary btn-block" href={CLINIC.phoneLink} style={{ marginBottom: 9 }}>Call {CLINIC.phoneDisplay}</a>
              <a className="btn btn-soft btn-block" href={waLink('Hello Hair Haven, I have a question.')} target="_blank" rel="noreferrer">WhatsApp Us</a>
              <div style={{ marginTop: 16 }}>
                <div className="kv"><span><Clock size={13} /> Hours</span><b>10 AM – 6 PM, daily</b></div>
                <div className="kv"><span><MapPin size={13} /> Clinic</span><b>Channi Himmat, Jammu</b></div>
              </div>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 11 }}>My requests on this device</h3>
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

/* ───────────────────────── Gallery & Reviews ───────────────────────── */
function Results() {
  const [showAll, setShowAll] = useState(false)
  const imgs = showAll ? GALLERY : GALLERY.slice(0, 8)
  return (
    <section id="results">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Patient Results</span>
          <h2>Real results, shared by our clinic</h2>
          <p>Before-and-after creatives published by Hair Haven on its official Instagram. Individual results vary — your expected outcome is discussed honestly at consultation, never promised in advance.</p>
        </div>
        <div className="gal-grid">
          {imgs.map((g, i) => (
            <figure key={g}>
              <img src={asset(g)} alt={`Hair Haven patient result ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', marginTop: 20 }}>
          <button className="btn btn-soft" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer results' : 'Show all results'}</button>
          <a className="btn btn-soft" href={CLINIC.instagram} target="_blank" rel="noreferrer"><AtSign size={17} /> @hairhaventransplantclinic</a>
        </div>

        <div className="grid grid-4" style={{ marginTop: 34 }}>
          {REVIEWS.map((r) => (
            <article className="card" key={r.name}>
              <span className="stars" aria-label="5 star review">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} fill="currentColor" />)}</span>
              <p style={{ fontSize: '.93rem', color: 'var(--ink-2)', margin: '11px 0 14px' }}>“{r.quote}”</p>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <span className="avatar-fallback" style={{ width: 42, height: 42, fontSize: '.85rem' }}>{r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <div><b style={{ fontSize: '.9rem', display: 'block', lineHeight: 1.25 }}>{r.name}</b><span className="small muted">{r.tag} · {r.when}</span></div>
              </div>
            </article>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>Reviews above are patient reviews previously published on our Google profile. <a href={CLINIC.googleReviews} target="_blank" rel="noreferrer">Read all reviews on Google</a>.</p>
      </div>
    </section>
  )
}

/* ───────────────────────── Journey & Aftercare ───────────────────────── */
function Journey() {
  return (
    <section id="journey">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">My Hair Journey</span>
          <h2>Your 12-month recovery journey</h2>
          <p>A transplant is a journey, not a day. Here is the clinic&apos;s standard recovery arc — in the upcoming Hair Haven app, this becomes your personal timeline with photo check-ins and team feedback.</p>
        </div>
        <div className="card">
          <div className="timeline">
            {JOURNEY.map((j) => (
              <div className="tl-item" key={j.when}>
                <span className="tl-when">{j.when}</span>
                <div><h3>{j.title}</h3><p className="small" style={{ color: 'var(--ink-2)', marginTop: 4 }}>{j.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-4" style={{ marginTop: 18 }}>
          {[
            { t: 'Hair washing', d: 'Begin gentle washing only when the clinic advises, using the technique demonstrated at discharge. Never scrub the graft area in the first days.' },
            { t: 'Sleeping position', d: 'Sleep with your head elevated for the first few nights to reduce swelling, and avoid friction against the graft area.' },
            { t: 'Sun & activity', d: 'Protect the scalp from direct sun and avoid heavy exercise, swimming and helmets until the clinic clears you at review.' },
            { t: 'Follow-ups & therapy', d: 'Keep every follow-up. PRP/GFC sessions, when prescribed, support growth through the shedding and early-growth phases.' },
          ].map((c) => (
            <article className="card" key={c.t}>
              <h3 style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Heart size={17} color="var(--emerald)" /> {c.t}</h3>
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
          <span className="eyebrow">Questions</span>
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
          <span className="eyebrow">Visit Us</span>
          <h2>Find the clinic</h2>
          <p>Located in the heart of Jammu at Channi Himmat. Tap the map or the directions button to start GPS navigation.</p>
        </div>
        <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
          <div className="map-wrap">
            <iframe title="Hair Haven location map" src={CLINIC.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="card">
            <div className="kv"><span><MapPin size={14} /> Address</span><b>{CLINIC.address}</b></div>
            <div className="kv"><span><Clock size={14} /> Hours</span><b>10:00 AM – 6:00 PM · Open 7 days</b></div>
            <div className="kv"><span><Phone size={14} /> Phone / WhatsApp</span><b>{CLINIC.phoneDisplay}</b></div>
            <div className="kv"><span><AtSign size={14} /> Instagram</span><b>@hairhaventransplantclinic</b></div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
              <a className="btn btn-primary" href={CLINIC.maps} target="_blank" rel="noreferrer"><Navigation size={16} /> Get Directions</a>
              <a className="btn btn-soft" href={waLink('Hello Hair Haven, I would like to book a consultation.')} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
            </div>
            <p className="small muted" style={{ marginTop: 16, display: 'flex', gap: 7 }}><Camera size={15} style={{ flex: 'none', marginTop: 2 }} /> Tip: bring photos of your hair loss (front, sides, crown) to your consultation — they help the team assess your stage faster.</p>
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
            {[['Services', 'services'], ['Treatment Process', 'process'], ['Our Team', 'team'], ['Graft Calculator', 'calculator'], ['Patient Results', 'results'], ['My Hair Journey', 'journey'], ['Book Consultation', 'book']].map(([l, id]) => (
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
  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><Home size={20} />Home</a>
      <a href="#services" onClick={(e) => { e.preventDefault(); scrollToId('services') }}><Stethoscope size={20} />Services</a>
      <a href="#book" className="book" onClick={(e) => { e.preventDefault(); scrollToId('book') }}><span className="fab"><Calendar size={23} /></span>Book</a>
      <a href="#journey" onClick={(e) => { e.preventDefault(); scrollToId('journey') }}><Camera size={20} />Journey</a>
      <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact') }}><MapPin size={20} />Visit</a>
    </nav>
  )
}

/* ───────────────────────── App ───────────────────────── */
export default function App() {
  const [prefill, setPrefill] = useState<{ service?: string; date?: string; notes?: string; nonce: number }>({ nonce: 0 })
  const [toastMsg, setToastMsg] = useState('')
  const toast = (m: string) => { setToastMsg(m); window.setTimeout(() => setToastMsg(''), 4200) }

  const bookService = (title: string) => {
    const mapped = BOOKABLE.find((b) => title.startsWith(b.split(' ')[0])) || 'General Hair Loss Consultation'
    const service = title.includes('BioSapphire') ? 'Advanced BioSapphire FUE' : mapped
    setPrefill({ service, nonce: Date.now() })
    scrollToId('book')
  }
  const bookEstimate = (n: Norwood) => {
    setPrefill({
      service: 'FUE Hair Transplant',
      notes: `Norwood self-assessment: Stage ${n.stage} (${n.name}). Estimated grafts: ${n.grafts}. Indicative price: ${n.priceRange}. (Preliminary — to be confirmed at assessment.)`,
      nonce: Date.now(),
    })
    scrollToId('book')
  }
  const pickDate = (iso: string) => { setPrefill({ date: iso, nonce: Date.now() }); scrollToId('book') }

  return (
    <>
      <div className="blobs" aria-hidden="true">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      </div>
      <Header />
      <main>
        <Hero onPickDate={pickDate} />
        <Services onBook={bookService} />
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
