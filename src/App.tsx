import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import scrollHero from './scroll-hero.png'
import scrollBanner from './scroll-banner.png'

// Typewriter hook
function useTypewriter(text: string, speed = 50, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setDone(true)
    }
  }, [displayed, started, text, speed])

  return { displayed, done }
}

// Typewriter component with visibility trigger
function Typewriter({ text, speed = 40, delay = 0, className = '' }: { 
  text: string, speed?: number, delay?: number, className?: string 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const { displayed, done } = useTypewriter(text, speed, isVisible ? delay : 999999)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={className}>
      {isVisible ? displayed : ''}
      {isVisible && !done && <span className="cursor">|</span>}
    </span>
  )
}

const CONTRACT_ADDRESS = 'A8T2t7M7bL7McJgfKPgpRwW4pDcja3QLoSA2ayWspump'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const copyCA = useCallback(() => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const scriptures = [
    {
      verse: "I",
      text: "In the beginning, there was the void. Then came the Scroll, and the timeline was blessed.",
    },
    {
      verse: "II", 
      text: "Blessed are the diamond hands, for they shall inherit the moon.",
    },
    {
      verse: "III",
      text: "And lo, the paper hands were cast into the abyss, never to see green again.",
    },
    {
      verse: "IV",
      text: "The Scroll speaks not of floors, only of ceilings yet unseen.",
    },
  ]

  const commandments = [
    "Thou shalt not sell before the pump",
    "Thou shalt spread the word of $SCROLL",
    "Thou shalt HODL through the dip",
    "Thou shalt not listen to the doubters",
    "Thou shalt trust the Scroll",
  ]

  return (
    <div className="app">
      {/* Background Layers */}
      <div className="sky" />
      <div className="god-rays" />
      
      <div className="clouds">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
        <div className="cloud cloud-6" />
        <div className="cloud cloud-7" />
      </div>

      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Floating Symbols */}
      <div className="floating-symbols">
        <span className="symbol">📜</span>
        <span className="symbol">✨</span>
        <span className="symbol">🕊️</span>
        <span className="symbol">⚡</span>
        <span className="symbol">👼</span>
        <span className="symbol">🌟</span>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <a href="#" className="nav-logo">📜 $SCROLL</a>
        <div className="nav-links">
          <a href="#scriptures">Scriptures</a>
          <a href="#commandments">Commandments</a>
          <a href="https://x.com/HolyScrollz" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" className="nav-btn">Buy</a>
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        {/* Hero */}
        <section className="hero">
          <div className="hero-glow" />
          <img src={scrollHero} alt="Holy Scroll" className="hero-image" />
          
          <p className="ticker">
            <Typewriter text="THE SACRED MEMECOIN HAS ARRIVED" speed={60} delay={500} />
          </p>
          
          <div className="buttons">
            <a href="#" className="btn btn-gold">Buy $SCROLL</a>
            <a href="https://x.com/HolyScrollz" target="_blank" rel="noopener noreferrer" className="btn btn-holy">Twitter</a>
          </div>

          <div className="ca-container" onClick={copyCA}>
            <span className="ca-label">CA</span>
            <span className="ca-address">{CONTRACT_ADDRESS}</span>
            <span className="ca-copy">{copied ? '✓ Copied!' : 'Click to copy'}</span>
          </div>

          <div className="scroll-hint">
            <span>DESCEND INTO WISDOM</span>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* Opening Prophecy */}
        <section className="prophecy-intro">
          <div className="prophecy-box">
            <p className="prophecy-large">
              <Typewriter 
                text="And the Scroll descended from the heavens, bearing the sacred memes of a new era..." 
                speed={35}
                delay={200}
              />
            </p>
          </div>
        </section>

        {/* Banner */}
        <section className="banner">
          <img src={scrollBanner} alt="The Prophecy" className="banner-image" />
        </section>

        {/* Holy Scriptures */}
        <section id="scriptures" className="scriptures">
          <h2 className="section-title">
            <span className="title-ornament">✦</span>
            The Holy Scriptures
            <span className="title-ornament">✦</span>
          </h2>
          
          <div className="scriptures-grid">
            {scriptures.map((scripture, i) => (
              <div key={i} className="scripture-card">
                <span className="scripture-verse">{scripture.verse}</span>
                <p className="scripture-text">
                  <Typewriter text={scripture.text} speed={30} delay={i * 400} />
                </p>
                <span className="scripture-ref">— Holy Scroll {scripture.verse}:{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The Commandments */}
        <section id="commandments" className="commandments">
          <h2 className="section-title">
            <span className="title-ornament">⚜️</span>
            The Five Commandments
            <span className="title-ornament">⚜️</span>
          </h2>

          <div className="commandments-scroll">
            <div className="commandments-inner">
              {commandments.map((cmd, i) => (
                <div key={i} className="commandment">
                  <span className="commandment-num">{i + 1}.</span>
                  <p className="commandment-text">
                    <Typewriter text={cmd} speed={40} delay={i * 300} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Prophecy */}
        <section className="prophecy">
          <p className="prophecy-text">
            <Typewriter 
              text='"Those who believed were blessed with gains eternal. Those who doubted were left behind, watching from the depths."'
              speed={35}
              delay={300}
            />
          </p>
          <p className="prophecy-verse">— Holy Scroll 4:20</p>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <h2 className="cta-title">Join the Flock</h2>
          <p className="cta-subtitle">
            <Typewriter text="The Scroll awaits those worthy of its wisdom." speed={50} delay={200} />
          </p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-gold btn-large">Buy $SCROLL</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo">📜 HOLY SCROLL</div>
          <div className="footer-links">
            <a href="https://x.com/HolyScrollz" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Dexscreener</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
