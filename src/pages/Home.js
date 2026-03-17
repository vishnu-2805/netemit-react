import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Orbs, Wrap, Card, Label, Footer } from '../components/UI';

export default function Home() {
  const [ticker, setTicker] = useState(0);

  // Live CO2 ticker — India emits ~0.98 kg/sec from digital
  useEffect(() => {
    const id = setInterval(() => setTicker(v => +(v + 0.098).toFixed(2)), 100);
    return () => clearInterval(id);
  }, []);

  const facts = [
    { icon: '🔍', val: '0.2g CO₂', desc: 'Every time you do a Google search, this much CO₂ is emitted.' },
    { icon: '▶️', val: '0.36g / min', desc: 'Every minute of YouTube emits this much CO₂ from data centres.' },
    { icon: '🤖', val: '4.32g CO₂', desc: 'One ChatGPT query — 21× more than a Google search.' },
  ];

  return (
    <>
      <Orbs />
      <Wrap>
        {/* HERO */}
        <section style={{ textAlign:'center', padding:'80px 0 60px' }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#00ff87', border:'1px solid rgba(0,255,135,.2)', padding:'5px 14px', borderRadius:20, display:'inline-block', marginBottom:28, letterSpacing:'.1em' }}>
            SDG 13 — CLIMATE ACTION
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(40px,6vw,72px)', fontWeight:800, letterSpacing:-2.5, lineHeight:1.05, marginBottom:20 }}>
            Every website you visit<br />burns <span style={{ color:'#ff6b35' }}>real electricity</span>
          </h1>
          <p style={{ fontSize:17, color:'#aaa', maxWidth:480, margin:'0 auto 36px', lineHeight:1.75, fontWeight:300 }}>
            That electricity produces CO₂. NetEmit shows you exactly how much — live, for any website you choose.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/measure" style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, background:'#00ff87', color:'#000', padding:'14px 36px', borderRadius:10, textDecoration:'none' }}>
              Check a website →
            </Link>
            <Link to="/habit" style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, background:'transparent', color:'#aaa', border:'1px solid rgba(255,255,255,.15)', padding:'14px 28px', borderRadius:10, textDecoration:'none' }}>
              See my habit
            </Link>
          </div>
        </section>

        {/* FACT CARDS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:40 }}>
          {facts.map(f => (
            <Card key={f.val} style={{ textAlign:'center', padding:28 }}>
              <div style={{ fontSize:34, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:'#ff6b35', marginBottom:8 }}>{f.val}</div>
              <div style={{ fontSize:13, color:'#aaa', lineHeight:1.65 }}>{f.desc}</div>
            </Card>
          ))}
        </div>

        {/* LIVE TICKER */}
        <Card style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:40, padding:28 }}>
          <div>
            <Label>India's internet right now</Label>
            <div style={{ fontSize:14, color:'#aaa', marginTop:4 }}>Every second, India's 800 million internet users collectively emit:</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(44px,6vw,72px)', fontWeight:800, letterSpacing:-3, color:'#ff6b35', lineHeight:1 }}>
              {ticker.toFixed(2)}
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:'#888', marginTop:4 }}>kg of CO₂ per second</div>
          </div>
        </Card>

        {/* HOW IT WORKS */}
        <Card style={{ marginBottom:40 }}>
          <Label style={{ marginBottom:20 }}>How NetEmit works — 3 steps</Label>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0 }}>
            {[
              { n:'01', title:'You enter a website', desc:'Any website — youtube.com, instagram.com, google.com — anything.' },
              { n:'02', title:'We measure it live', desc:'We fetch that page right now and measure how many kilobytes your device downloads.' },
              { n:'03', title:'We show your CO₂', desc:"Using India's official electricity data, we convert bytes into grams of CO₂." },
            ].map((s, i) => (
              <div key={s.n} style={{ padding:`8px ${i===2?'0':'24px'} 8px ${i===0?'0':'24px'}`, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:'rgba(255,255,255,0.08)', marginBottom:10 }}>{s.n}</div>
                <div style={{ fontWeight:500, marginBottom:6 }}>{s.title}</div>
                <div style={{ fontSize:13, color:'#aaa', lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* SDG BANNER */}
        <div style={{ background:'linear-gradient(135deg,rgba(0,255,135,.05),rgba(255,107,53,.05))', border:'1px solid rgba(0,255,135,.15)', borderRadius:16, padding:'28px 32px', display:'flex', alignItems:'center', gap:20, flexWrap:'wrap', marginBottom:28 }}>
          <div style={{ fontSize:48 }}>🌍</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, marginBottom:8 }}>SDG 13 — Climate Action</div>
            <div style={{ fontSize:14, color:'#aaa', lineHeight:1.75, maxWidth:560 }}>
              If just 1% of India's internet users reduced browsing by 10 minutes a day, that saves{' '}
              <strong style={{ color:'#00ff87' }}>400 tonnes of CO₂ every single day.</strong>{' '}
              Awareness is the first step. NetEmit gives you the awareness.
            </div>
          </div>
        </div>

        <Footer />
      </Wrap>
    </>
  );
}