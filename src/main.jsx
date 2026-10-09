import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, Heart, RotateCcw } from 'lucide-react'
import './styles.css'

const moods = [
  { id: 'nostalgia', label: 'Nostalgia', note: 'For the things you can almost touch again.', color: '#d9a16e', glow: '#f2d2a5', ink: '#633e32', quote: 'Somewhere, a moment is still happening.', small: 'A LITTLE BIT OF YESTERDAY' },
  { id: 'peace', label: 'Peace', note: 'For the quiet you have been looking for.', color: '#a8b8a3', glow: '#e2e8d8', ink: '#3d5549', quote: 'You are allowed to be where you are.', small: 'A PLACE TO EXHALE' },
  { id: 'longing', label: 'Longing', note: 'For the distance between here and there.', color: '#c18d9b', glow: '#f0d3d7', ink: '#68434f', quote: 'Not everything far away is lost.', small: 'SOMETHING STILL CALLS' },
  { id: 'hope', label: 'Hope', note: 'For the part of you that keeps beginning.', color: '#e1b967', glow: '#f7e8b8', ink: '#6a5429', quote: 'Even now, something good is taking shape.', small: 'ROOM FOR WHAT COMES NEXT' },
  { id: 'joy', label: 'Joy', note: 'For the light that finds its way in.', color: '#df9c78', glow: '#f8d9bf', ink: '#714333', quote: 'Let the good thing be a good thing.', small: 'HERE, WHILE IT LASTS' },
]

function Orb({ mood, onClick }) {
  const nextMood = moods[(moods.findIndex(item => item.id === mood.id) + 1) % moods.length]
  return <button className={`orb-scene mood-${mood.id}`} onClick={onClick} aria-label={`Current mood: ${mood.label}. Choose next mood: ${nextMood.label}`} title={`Current mood: ${mood.label}. Click for ${nextMood.label}`}>
    <div className="orb-halo" />
    <div className="orb">
      <div className="orb-shine" />
      <div className="orb-reflection" />
      <div className="orb-core" />
    </div>
    <div className="orb-shadow" />
    <span className="orb-hint">TAP THE LIGHT ↗</span>
  </button>
}

function App() {
  const [activeMood, setActiveMood] = useState(moods[0])
  const [memory, setMemory] = useState('')
  const [made, setMade] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notice, setNotice] = useState('')
  const mood = activeMood
  const personalizedLine = useMemo(() => {
    const cleaned = memory.trim().replace(/[.!?]+$/, '')
    return cleaned ? `For ${cleaned}, and the part of you that remembers.` : mood.quote
  }, [memory, mood])

  function makeAfterimage() {
    setMade(true)
    setSaved(false)
    setNotice('')
    setTimeout(() => document.getElementById('keepsake')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80)
  }

  function downloadArt() {
    if (!made) {
      setNotice('Create your afterimage first, then you can save it as an image.')
      return
    }
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 1500
    const ctx = canvas.getContext('2d')
    const bg = ctx.createLinearGradient(0, 0, 1200, 1500)
    bg.addColorStop(0, '#f8f4ed')
    bg.addColorStop(1, mood.glow)
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 1200, 1500)
    const glow = ctx.createRadialGradient(600, 570, 30, 600, 570, 460)
    glow.addColorStop(0, mood.glow + 'ee')
    glow.addColorStop(1, mood.color + '00')
    ctx.fillStyle = glow
    ctx.fillRect(100, 100, 1000, 950)
    const orb = ctx.createRadialGradient(470, 410, 10, 620, 570, 300)
    orb.addColorStop(0, '#fffaf0')
    orb.addColorStop(.25, mood.glow)
    orb.addColorStop(.68, mood.color)
    orb.addColorStop(1, mood.ink)
    ctx.beginPath(); ctx.arc(600, 570, 250, 0, Math.PI * 2); ctx.fillStyle = orb; ctx.fill()
    ctx.globalAlpha = .45
    ctx.beginPath(); ctx.ellipse(520, 490, 105, 190, -.45, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = mood.ink
    ctx.font = '500 22px monospace'
    ctx.fillText('AFTERIMAGE  /  A MOMENT TO KEEP', 90, 100)
    let quoteFontSize = 54
    ctx.font = `italic ${quoteFontSize}px Georgia`
    while (ctx.measureText(personalizedLine).width > 1010 && quoteFontSize > 38) {
      quoteFontSize -= 2
      ctx.font = `italic ${quoteFontSize}px Georgia`
    }
    const quoteLineHeight = Math.round(quoteFontSize * 1.3)
    const quoteBottom = wrapText(ctx, personalizedLine, 90, 1040, 1010, quoteLineHeight)
    if (quoteBottom > 1300) {
      ctx.font = 'italic 38px Georgia'
      wrapText(ctx, personalizedLine, 90, 1020, 1010, 48)
    }
    ctx.font = '22px monospace'
    ctx.globalAlpha = .7
    ctx.fillText(mood.small, 90, 1370)
    ctx.fillText('MADE OF A FEELING, KEPT BY YOU', 90, 1420)
    ctx.globalAlpha = 1
    const link = document.createElement('a')
    link.download = `afterimage-${mood.id}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setSaved(true)
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, y); line = word + ' '; y += lineHeight
      } else line = test
    }
    ctx.fillText(line, x, y)
    return y
  }

  return <main className={`app mood-${mood.id}`}>
    <header className="topbar">
      <a href="#top" className="wordmark" aria-label="Afterimage home"><span className="brand-dot" /> AFTERIMAGE</a>
      <span className="top-note">A SMALL SPACE TO FEEL</span>
      <span className="top-note">MADE OF A FEELING</span>
    </header>

    <section className="hero section-wrap" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> AN INTERACTIVE FEELING</p>
        <h1>Some moments<br/>never really <em>leave.</em></h1>
        <p className="hero-description">A little space for the things you felt, the things you miss, and the things you want to remember.</p>
        <a href="#experience" className="text-link">Find your afterimage <ArrowDown size={15}/></a>
      </div>
      <div className="hero-art">
        <div className="art-index">FIG. 01 <span>—</span> LIGHT, REMEMBERED</div>
        <Orb mood={mood} onClick={() => {
          const index = moods.findIndex(m => m.id === mood.id)
          setActiveMood(moods[(index + 1) % moods.length])
        }}/>
        <div className="art-caption"><span>01 / 05</span><span>AN EVER-CHANGING THING</span></div>
      </div>
      <div className="hero-foot"><span>SCROLL SLOWLY</span><span className="foot-rule" /><span>TAKE WHAT YOU NEED</span></div>
    </section>

    <section className="intro-band">
      <p>Not everything meaningful needs an explanation.</p>
      <span>Sometimes, a feeling is enough.</span>
    </section>

    <section className="experience section-wrap" id="experience">
      <div className="section-heading">
        <p className="eyebrow">01 — CHECK IN WITH YOURSELF</p>
        <h2>What does today<br/>feel <em>like?</em></h2>
        <p>There is no right answer. Choose the feeling that found you.</p>
      </div>
      <div className="mood-grid" role="group" aria-label="Choose a mood">
        {moods.map((item, i) => <button key={item.id} type="button" aria-pressed={mood.id === item.id} className={`mood-card ${mood.id === item.id ? 'selected' : ''}`} onClick={() => { if (mood.id !== item.id && made) setNotice('Your previous afterimage was cleared because the mood changed. Create a new one when you are ready.'); setActiveMood(item); setMade(false); setSaved(false) }} style={{'--mood-color': item.color, '--mood-glow': item.glow, '--mood-ink': item.ink}}>
          <span className="mood-number">0{i + 1}</span>
          <span className="mood-swatch"><span /></span>
          <span className="mood-label">{item.label}</span>
          <span className="mood-note">{item.note}</span>
          <span className="mood-check">{mood.id === item.id ? <Check size={13}/> : <ArrowUpRight size={13}/>}</span>
        </button>)}
      </div>
      <div className="selected-feeling" style={{'--mood-color': mood.color, '--mood-glow': mood.glow, '--mood-ink': mood.ink}}>
        <div className="selected-left"><span className="mini-label">YOUR FEELING, RIGHT NOW</span><h3>{mood.label}<span>.</span></h3><p>{mood.quote}</p></div>
        <div className="selected-orb"><div /></div>
        <span className="selected-index">MOOD STUDY / {String(moods.findIndex(m => m.id === mood.id) + 1).padStart(2, '0')}</span>
      </div>
    </section>

    <section className="prompt-section">
      <div className="prompt-inner">
        <div className="prompt-meta"><span className="eyebrow">02 — MAKE IT YOURS</span><span className="prompt-star">✳</span></div>
        <h2>Hold a thought<br/>for a <em>moment.</em></h2>
        <p className="prompt-copy">A person, a place, a version of yourself. Whatever comes to mind, let it have a little room.</p>
        <label className="memory-label" htmlFor="memory">WHAT'S ON YOUR MIND? <span>OPTIONAL</span></label>
        <p id="memory-help" className="memory-help">Up to 80 characters. Your words stay as you typed them.</p>
        <div className="memory-input-wrap">
          <input id="memory" value={memory} onChange={e => { if (made) setNotice('Your previous afterimage was cleared because your memory changed. Create it again to save the updated version.'); setMemory(e.target.value); setMade(false); setSaved(false) }} maxLength={80} aria-describedby="memory-help memory-count" placeholder="The summer we stayed out late..." />
          <span id="memory-count" className={memory.length >= 72 ? "near-limit" : ""}>{memory.length}/80</span>
        </div>
        <button className="primary-button" onClick={makeAfterimage}>Create my afterimage <ArrowRight size={16}/></button>
        <p className="privacy-note"><Heart size={12}/> This moment stays in your browser. Nothing is uploaded.</p>
        {notice && <p className="interaction-notice" role="status">{notice}</p>}
      </div>
    </section>

    <section className="keepsake-section section-wrap" id="keepsake">
      <div className="keepsake-heading">
        <p className="eyebrow">03 — SOMETHING TO KEEP</p>
        <h2>A feeling,<br/><em>made visible.</em></h2>
      </div>
      <div className={`keepsake-card ${made ? 'revealed' : ''}`} style={{'--mood-color': mood.color, '--mood-glow': mood.glow, '--mood-ink': mood.ink}}>
        <div className="keepsake-top"><span>AFTERIMAGE / A MOMENT TO KEEP</span><span>{mood.small}</span></div>
        <div className="keepsake-visual"><div className="keepsake-glow"/><div className="keepsake-orb"><div/></div><div className="keepsake-ring ring-one"/><div className="keepsake-ring ring-two"/></div>
        <div className="keepsake-quote">
          <span className="quote-mark">“</span>
          <p>{made ? personalizedLine : 'Your feeling is waiting to take shape.'}</p>
        </div>
        <div className="keepsake-bottom"><span>MADE OF A FEELING</span><span>KEPT BY YOU ↗</span></div>
      </div>
      <div className="keepsake-actions">
        <p>{made ? 'Your afterimage is here. Keep it close.' : 'Choose a feeling and create your own small keepsake.'}</p>
        <button className="outline-button" onClick={downloadArt} disabled={!made} title={!made ? "Create your afterimage before saving" : "Download your afterimage as a PNG"}><Download size={15}/>{saved ? 'Download again' : 'Save as image'}</button>
      </div>
    </section>

    <section className="closing">
      <div className="closing-orb"><div/></div>
      <p className="eyebrow">A NOTE TO TAKE WITH YOU</p>
      <h2>You don't have to<br/>hold on to <em>everything.</em></h2>
      <p className="closing-copy">Just the parts that make you feel a little more like yourself.</p>
      <button className="restart-button" onClick={() => { setActiveMood(moods[0]); setMemory(''); setMade(false); setSaved(false); document.getElementById('top')?.scrollIntoView({behavior:'smooth'}) }}><RotateCcw size={14}/> Begin again</button>
    </section>

    <footer className="footer">
      <a href="#top" className="wordmark"><span className="brand-dot"/> AFTERIMAGE</a>
      <span>MADE SLOWLY, FOR A MOMENT.</span>
      <span>© 2026 AFTERIMAGE</span>
    </footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
