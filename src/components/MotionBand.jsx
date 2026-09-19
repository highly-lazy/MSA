import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { VIDEO } from '../data/company'
import Reveal from './Reveal'
import Icon from './Icon'

const hashLink = (id) => ({ pathname: '/', hash: `#${id}` })

const HORIZON = 0.5
const NEAR = 1
const FAR = 70

// Deterministic PRNG so the skyline / stars are identical on every render.
function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.round(w))
  c.height = Math.max(1, Math.round(h))
  return c
}

// Dusk sky: deep navy → violet → ember orange at the horizon.
function buildSky(W, H, hy) {
  const c = makeCanvas(W, hy + 2)
  const g = c.getContext('2d')
  const sky = g.createLinearGradient(0, 0, 0, hy)
  sky.addColorStop(0, '#040814')
  sky.addColorStop(0.45, '#12173a')
  sky.addColorStop(0.75, '#3a2456')
  sky.addColorStop(0.92, '#a4463f')
  sky.addColorStop(1, '#ff8a4d')
  g.fillStyle = sky
  g.fillRect(0, 0, W, hy + 2)
  const glow = g.createRadialGradient(W * 0.5, hy, 0, W * 0.5, hy, Math.max(W * 0.55, 320))
  glow.addColorStop(0, 'rgba(255,170,100,0.55)')
  glow.addColorStop(1, 'rgba(255,120,60,0)')
  g.fillStyle = glow
  g.fillRect(0, 0, W, hy + 2)
  return c
}

// One tiled skyline layer with lit windows. Slightly wider than the viewport so it can sway.
function buildSkyline(W, hy, seed, { minH, maxH, minW, maxW, color, lit }) {
  const w = W + 160
  const c = makeCanvas(w, maxH + 4)
  const g = c.getContext('2d')
  const r = rng(seed)
  let x = -10
  while (x < w) {
    const bw = minW + r() * (maxW - minW)
    const bh = minH + Math.pow(r(), 1.6) * (maxH - minH)
    const top = c.height - bh
    g.fillStyle = color
    g.fillRect(x, top, bw, bh + 2)
    if (r() > 0.72) g.fillRect(x + bw * 0.42, top - 8 - r() * 16, 2, 20) // antenna
    // windows
    for (let wy = top + 6; wy < c.height - 4; wy += 7) {
      for (let wx = x + 4; wx < x + bw - 4; wx += 6) {
        if (r() < lit) {
          g.fillStyle = r() > 0.8 ? 'rgba(255,196,120,0.9)' : 'rgba(255,224,170,0.55)'
          g.fillRect(wx, wy, 2, 3)
        }
      }
    }
    x += bw + r() * 4
  }
  return c
}

// Night highway with real perspective: screen scale ∝ 1 / distance. Runs only while on
// screen; under reduced-motion it renders a single still frame.
function HighwayCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let hy = 0
    let sky
    let layers = []
    let stars = []
    let raf = 0
    let running = false
    let t0 = performance.now()

    const build = () => {
      const narrow = canvas.clientWidth < 720
      const dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.25 : 1.5)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      hy = H * HORIZON
      sky = buildSky(W, H, hy)
      const s = Math.min(1, Math.max(0.55, hy / 320))
      layers = [
        { c: buildSkyline(W, hy, 11, { minH: 30 * s, maxH: 130 * s, minW: 22, maxW: 60, color: '#241d47', lit: 0.1 }), amp: 10, sp: 0.05, ph: 0 },
        { c: buildSkyline(W, hy, 29, { minH: 34 * s, maxH: 165 * s, minW: 26, maxW: 70, color: '#150f2e', lit: 0.16 }), amp: 20, sp: 0.07, ph: 1.3 },
        { c: buildSkyline(W, hy, 47, { minH: 26 * s, maxH: 95 * s, minW: 34, maxW: 90, color: '#0a0818', lit: 0.12 }), amp: 34, sp: 0.09, ph: 2.6 },
      ]
      const r = rng(5)
      stars = Array.from({ length: narrow ? 45 : 90 }, () => ({
        x: r() * W,
        y: r() * hy * 0.62,
        s: 0.4 + r() * 1.1,
        f: 0.6 + r() * 2.2,
        p: r() * 6.28,
      }))
    }

    const draw = (now) => {
      const t = (now - t0) / 1000
      const vx = W / 2
      const rh = H - hy
      const half = Math.max(W * 0.62, 380)
      const P = (d) => NEAR / d
      const Y = (p) => hy + rh * p
      const X = (p, lat) => vx + lat * half * p

      ctx.clearRect(0, 0, W, H)

      // ---- sky, stars, skyline ----
      ctx.drawImage(sky, 0, 0, W, hy + 2)
      for (const st of stars) {
        ctx.globalAlpha = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t * st.f + st.p))
        ctx.fillStyle = '#dfe8ff'
        ctx.fillRect(st.x, st.y, st.s, st.s)
      }
      ctx.globalAlpha = 1
      for (const L of layers) {
        const ox = -80 + Math.sin(t * L.sp + L.ph) * L.amp
        ctx.drawImage(L.c, ox, hy - L.c.height + 3)
      }
      // ember haze where the road meets the sky
      const haze = ctx.createLinearGradient(0, hy - 60, 0, hy + 30)
      haze.addColorStop(0, 'rgba(255,140,80,0)')
      haze.addColorStop(0.7, 'rgba(255,140,80,0.32)')
      haze.addColorStop(1, 'rgba(255,140,80,0)')
      ctx.fillStyle = haze
      ctx.fillRect(0, hy - 60, W, 90)

      // ---- ground + asphalt ----
      const ground = ctx.createLinearGradient(0, hy, 0, H)
      ground.addColorStop(0, '#4a2c48')
      ground.addColorStop(0.06, '#1c1330')
      ground.addColorStop(0.3, '#0a0a1a')
      ground.addColorStop(1, '#04070d')
      ctx.fillStyle = ground
      ctx.fillRect(0, hy, W, rh)
      const asphalt = ctx.createLinearGradient(0, hy, 0, H)
      asphalt.addColorStop(0, '#5a3a55')
      asphalt.addColorStop(0.25, '#1d1a36')
      asphalt.addColorStop(1, '#070c18')
      ctx.fillStyle = asphalt
      ctx.beginPath()
      ctx.moveTo(X(0.002, -1.05), Y(0.002))
      ctx.lineTo(X(0.002, 1.05), Y(0.002))
      ctx.lineTo(X(1, 1.35), H)
      ctx.lineTo(X(1, -1.35), H)
      ctx.closePath()
      ctx.fill()

      const quad = (lat, hw, d1, d2, style) => {
        const p1 = P(d1)
        const p2 = P(d2)
        ctx.fillStyle = style
        ctx.beginPath()
        ctx.moveTo(X(p1, lat - hw), Y(p1))
        ctx.lineTo(X(p1, lat + hw), Y(p1))
        ctx.lineTo(X(p2, lat + hw), Y(p2))
        ctx.lineTo(X(p2, lat - hw), Y(p2))
        ctx.closePath()
        ctx.fill()
      }

      // ---- lane markings ----
      const speed = 7
      const marks = [
        [0, 0.012, 2, 4, '255,205,110', 0.95],
        [-0.5, 0.008, 2, 5, '255,255,255', 0.55],
        [0.5, 0.008, 2, 5, '255,255,255', 0.55],
        [-0.93, 0.012, 300, 0, '255,255,255', 0.6],
        [0.93, 0.012, 300, 0, '255,255,255', 0.6],
      ]
      for (const [lat, hw, len, gap, rgb, a] of marks) {
        if (!gap) {
          quad(lat, hw, NEAR, FAR, `rgba(${rgb},${a})`)
          continue
        }
        const period = len + gap
        const off = (t * speed) % period
        for (let d = -off; d < FAR; d += period) {
          const d1 = Math.max(NEAR, d)
          const d2 = Math.min(FAR, d + len)
          if (d2 <= d1) continue
          quad(lat, hw, d1, d2, `rgba(${rgb},${a * Math.min(1, P(d1) * 6 + 0.25)})`)
        }
      }

      // ---- concrete barriers + street lamps ----
      for (const side of [-1, 1]) quad(side * 1.06, 0.035, NEAR, FAR, 'rgba(70,64,100,0.85)')
      const lampGap = 12
      const loff = (t * speed) % lampGap
      for (let d = FAR - loff; d > NEAR + 0.4; d -= lampGap) {
        const p = P(d)
        for (const side of [-1, 1]) {
          const x = X(p, side * 1.16)
          const y = Y(p)
          const top = y - rh * p * 1.0
          ctx.strokeStyle = `rgba(130,140,175,${0.55 * Math.min(1, p * 5)})`
          ctx.lineWidth = Math.max(0.6, 5 * p)
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, top)
          ctx.lineTo(x - side * 30 * p, top + 4 * p)
          ctx.stroke()
          const lx = x - side * 30 * p
          const r = Math.max(4, 130 * p)
          const lg = ctx.createRadialGradient(lx, top + 4 * p, 0, lx, top + 4 * p, r)
          lg.addColorStop(0, 'rgba(255,220,160,0.95)')
          lg.addColorStop(0.2, 'rgba(255,175,95,0.42)')
          lg.addColorStop(1, 'rgba(255,140,60,0)')
          ctx.fillStyle = lg
          ctx.fillRect(lx - r, top + 4 * p - r, r * 2, r * 2)
          // pool of light on the asphalt
          const pool = ctx.createRadialGradient(x - side * 90 * p, y, 0, x - side * 90 * p, y, 150 * p + 2)
          pool.addColorStop(0, 'rgba(255,190,110,0.16)')
          pool.addColorStop(1, 'rgba(255,190,110,0)')
          ctx.fillStyle = pool
          ctx.fillRect(x - side * 90 * p - 150 * p, y - 40 * p, 300 * p, 80 * p)
        }
      }

      // ---- truck ahead (right lanes), seen from behind ----
      {
        const cyc = 30
        const u = (t % cyc) / cyc
        const d = 2.4 + u * 34
        const fade = Math.min(1, u * 7) * Math.min(1, (1 - u) * 3.2)
        const p = P(d)
        const bw = 0.36 * half * p
        const bh = bw * 1.18
        const cx = X(p, 0.5)
        const by = Y(p)
        ctx.globalAlpha = fade
        ctx.fillStyle = '#0a0d1c'
        ctx.fillRect(cx - bw / 2, by - bh, bw, bh - bw * 0.16)
        ctx.fillStyle = 'rgba(150,165,215,0.22)'
        ctx.fillRect(cx - bw / 2, by - bh, bw, Math.max(1, bw * 0.02)) // roof highlight
        ctx.fillStyle = '#05070f' // underride guard + wheels
        ctx.fillRect(cx - bw / 2, by - bw * 0.16, bw, bw * 0.16)
        ctx.fillRect(cx - bw * 0.46, by - bw * 0.2, bw * 0.16, bw * 0.2)
        ctx.fillRect(cx + bw * 0.30, by - bw * 0.2, bw * 0.16, bw * 0.2)
        ctx.globalCompositeOperation = 'lighter'
        const lightR = Math.max(3, bw * 0.34)
        for (const sx of [-0.4, 0.4]) {
          const lx = cx + sx * bw
          const ly = by - bw * 0.3
          const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, lightR)
          g.addColorStop(0, 'rgba(255,90,70,1)')
          g.addColorStop(0.3, 'rgba(255,50,40,0.5)')
          g.addColorStop(1, 'rgba(255,40,30,0)')
          ctx.fillStyle = g
          ctx.fillRect(lx - lightR, ly - lightR, lightR * 2, lightR * 2)
        }
        const mr = Math.max(1.6, bw * 0.05)
        for (let i = 0; i < 5; i++) {
          const mx = cx + (-0.42 + i * 0.21) * bw
          const g = ctx.createRadialGradient(mx, by - bh + mr * 2, 0, mx, by - bh + mr * 2, mr * 3)
          g.addColorStop(0, 'rgba(255,190,80,0.95)')
          g.addColorStop(1, 'rgba(255,150,40,0)')
          ctx.fillStyle = g
          ctx.fillRect(mx - mr * 3, by - bh - mr, mr * 6, mr * 6)
        }
        // glow reflected on the road
        const rg = ctx.createLinearGradient(0, by, 0, by + bw * 0.9)
        rg.addColorStop(0, 'rgba(255,60,50,0.35)')
        rg.addColorStop(1, 'rgba(255,60,50,0)')
        ctx.fillStyle = rg
        ctx.fillRect(cx - bw * 0.55, by, bw * 1.1, bw * 0.9)
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }

      // ---- traffic with long-exposure light trails ----
      ctx.globalCompositeOperation = 'lighter'
      const vehicle = (lat, d, head, trail) => {
        const p = P(d)
        const fade = Math.min(1, p * 8) * Math.min(1, (FAR - d) / 12)
        if (fade <= 0.01) return
        const p2 = P(Math.min(FAR + 20, d + trail))
        for (const dx of [-0.06, 0.06]) {
          const x1 = X(p, lat + dx)
          const y1 = Y(p) - rh * p * 0.05
          const x2 = X(p2, lat + dx)
          const y2 = Y(p2) - rh * p2 * 0.05
          const tg = ctx.createLinearGradient(x1, y1, x2, y2)
          tg.addColorStop(0, head ? `rgba(255,244,214,${0.9 * fade})` : `rgba(255,80,60,${0.75 * fade})`)
          tg.addColorStop(1, head ? 'rgba(255,225,170,0)' : 'rgba(255,60,40,0)')
          ctx.strokeStyle = tg
          ctx.lineWidth = Math.max(1, 16 * p)
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
          const r = Math.max(3, 140 * p)
          const cg = ctx.createRadialGradient(x1, y1, 0, x1, y1, r)
          cg.addColorStop(0, head ? `rgba(255,252,236,${fade})` : `rgba(255,110,90,${fade})`)
          cg.addColorStop(0.28, head ? `rgba(255,236,190,${0.42 * fade})` : `rgba(255,60,45,${0.4 * fade})`)
          cg.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = cg
          ctx.fillRect(x1 - r, y1 - r, r * 2, r * 2)
          // wet-road reflection
          const rg = ctx.createLinearGradient(0, y1, 0, y1 + rh * p * 0.3)
          rg.addColorStop(0, head ? `rgba(255,236,190,${0.12 * fade})` : `rgba(255,70,50,${0.1 * fade})`)
          rg.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = rg
          ctx.fillRect(x1 - r * 0.05, y1, r * 0.1, rh * p * 0.3)
        }
      }
      for (const [lat, ph] of [[-0.72, 0], [-0.3, 10], [-0.58, 22], [-0.2, 34], [-0.86, 46]]) {
        const cyc = 56
        vehicle(lat, FAR - (((t * 16 + ph) % cyc) / cyc) * (FAR - NEAR - 0.3), true, 9)
      }
      for (const [lat, ph] of [[0.24, 6], [0.86, 26], [0.3, 52]]) {
        const cyc = 100
        vehicle(lat, FAR - (((t * 2.6 + ph) % cyc) / cyc) * (FAR - 8), false, 4)
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineCap = 'butt'
    }

    const loop = (now) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce) return
      running = true
      t0 = performance.now() - 3000
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    build()
    draw(t0 + 3000)
    let resizeTimer
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        draw(performance.now())
      }, 120)
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '100px' })
    io.observe(canvas)
    return () => {
      stop()
      clearTimeout(resizeTimer)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="mo__canvas" aria-hidden="true" />
}

// Full-bleed cinematic band. An optional background video (VIDEO.src / VIDEO.webm) fades in over the scene.
export default function MotionBand() {
  const wrap = useRef(null)
  const vid = useRef(null)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)
  const hasVideo = Boolean(VIDEO.src || VIDEO.webm)

  const skipVideo =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData)

  useEffect(() => {
    if (!hasVideo || skipVideo || !wrap.current || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => {
        const v = vid.current
        if (e.isIntersecting) {
          setLoad(true)
          v?.play().catch(() => {})
        } else {
          v?.pause()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [hasVideo, skipVideo])

  return (
    <section ref={wrap} className={`section section--ink mo${ready ? ' has-video' : ''}`} id="motion" aria-labelledby="motion-title">
      <HighwayCanvas />
      {hasVideo && !skipVideo && (
        <video
          ref={vid}
          className="mo__video"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={VIDEO.poster ?? undefined}
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
          tabIndex={-1}
        >
          {load && VIDEO.webm && <source src={VIDEO.webm} type="video/webm" />}
          {load && VIDEO.src && <source src={VIDEO.src} type="video/mp4" />}
        </video>
      )}
      <div className="mo__shade" aria-hidden="true" />

      <div className="container mo__inner">
        <Reveal>
          <p className="eyebrow">MSA Transportation Inc</p>
          <h2 id="motion-title" className="display display--xl">
            <span>Delivering</span>
            <span>Excellence.</span>
            <span className="display__accent">Driving Trust.</span>
          </h2>
          <p className="lede">
            Every load, every mile, every season — handled with the care and accountability of a carrier that answers the phone.
          </p>
          <div className="mo__actions">
            <Link to={hashLink('quote')} className="btn btn--primary btn--lg">
              Get a quote <Icon name="arrow" size={18} />
            </Link>
            <Link to={hashLink('apply')} className="btn btn--ghost btn--lg">
              Drive with us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
