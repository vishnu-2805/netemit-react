import React, { useState, useMemo } from 'react';
import { Orbs, Wrap, Card, Label, PageHeader, Badge, Footer } from '../components/UI';

const INDIA = [
  {n:'hotstar.com',f:'🇮🇳',co2:2.84,kb:3500},{n:'youtube.com',f:'🌐',co2:2.31,kb:2850},
  {n:'instagram.com',f:'🌐',co2:1.92,kb:2370},{n:'amazon.in',f:'🇮🇳',co2:1.65,kb:2030},
  {n:'flipkart.com',f:'🇮🇳',co2:1.43,kb:1760},{n:'cricbuzz.com',f:'🇮🇳',co2:1.18,kb:1450},
  {n:'meesho.com',f:'🇮🇳',co2:1.05,kb:1290},{n:'naukri.com',f:'🇮🇳',co2:0.92,kb:1130},
  {n:'irctc.co.in',f:'🇮🇳',co2:0.74,kb:910},{n:'wikipedia.org',f:'🌐',co2:0.48,kb:590},
  {n:'google.com',f:'🌐',co2:0.31,kb:380},{n:'gov.in',f:'🇮🇳',co2:0.18,kb:220},
];
const WORLD = [
  {n:'tiktok.com',f:'🌐',co2:3.42,kb:4200},{n:'twitch.tv',f:'🌐',co2:3.18,kb:3920},
  {n:'netflix.com',f:'🌐',co2:2.95,kb:3640},{n:'hotstar.com',f:'🇮🇳',co2:2.84,kb:3500},
  {n:'youtube.com',f:'🌐',co2:2.31,kb:2850},{n:'instagram.com',f:'🌐',co2:1.92,kb:2370},
  {n:'reddit.com',f:'🌐',co2:1.78,kb:2190},{n:'twitter.com',f:'🌐',co2:1.54,kb:1900},
  {n:'amazon.com',f:'🌐',co2:1.41,kb:1740},{n:'ebay.com',f:'🌐',co2:1.22,kb:1510},
  {n:'bbc.com',f:'🌐',co2:0.95,kb:1170},{n:'wikipedia.org',f:'🌐',co2:0.48,kb:590},
  {n:'google.com',f:'🌐',co2:0.31,kb:380},{n:'text.npr.org',f:'🌐',co2:0.08,kb:98},
];
const COLORS = ['#ff2200','#ff4500','#ff6b35','#ff8c42','#ffaa5c','#ffc87a','#ffe0a0','#d4ff9b','#a8f07a','#7de05e','#52d040','#2bb025','#00ff87','#00ddaa'];

export default function Leaderboard() {
  const [scope, setScope] = useState('india');
  const [green, setGreen] = useState(false);

  const sites = useMemo(() => {
    const f = green ? 0.1/0.82 : 1;
    return (scope === 'india' ? INDIA : WORLD).map(s => ({ ...s, co2: +(s.co2*f).toFixed(3) }));
  }, [scope, green]);

  const max = sites[0]?.co2 || 1;
  const top = sites[0], bot = sites[sites.length-1];

  const tabStyle = active => ({
    fontFamily:"'DM Mono',monospace", fontSize:12, padding:'7px 18px', borderRadius:10,
    border: active ? '1px solid rgba(0,255,135,.3)' : '1px solid rgba(255,255,255,.08)',
    color: active ? '#00ff87' : '#888',
    background: active ? 'rgba(0,255,135,.07)' : 'transparent',
    cursor:'pointer', transition:'all .2s',
  });

  return (
    <>
      <Orbs />
      <Wrap>
        <PageHeader title="Which websites pollute the most?" sub="Every website uses electricity when you visit. Here are the most and least carbon-heavy ones." />

        {/* CONTROLS */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:16 }}>
          <div style={{ display:'flex', gap:8 }}>
            <button style={tabStyle(scope==='india')} onClick={()=>setScope('india')}>🇮🇳 Indian websites</button>
            <button style={tabStyle(scope==='world')} onClick={()=>setScope('world')}>🌐 World websites</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:13, color:'#aaa' }}>Current India electricity</span>
            <div onClick={()=>setGreen(g=>!g)} style={{ position:'relative', width:44, height:24, background: green?'#00ff87':'rgba(255,255,255,.1)', borderRadius:12, cursor:'pointer', transition:'background .25s' }}>
              <div style={{ position:'absolute', top:3, left:3, width:18, height:18, background:'#000', borderRadius:'50%', transition:'transform .25s', transform: green?'translateX(20px)':'translateX(0)' }}/>
            </div>
            <span style={{ fontSize:13, color: green?'#00ff87':'#aaa' }}>100% Renewable</span>
          </div>
        </div>

        {/* INSIGHT */}
        <div style={{ background:'rgba(255,107,53,.05)', border:'1px solid rgba(255,107,53,.15)', borderRadius:14, padding:'16px 20px', marginBottom:14 }}>
          <div style={{ fontSize:14, color:'#aaa', lineHeight:1.7 }}>
            <strong style={{ color:'#f0f0f0' }}>{top?.n}</strong> emits <strong style={{ color:'#ff6b35' }}>{top && bot ? (top.co2/bot.co2).toFixed(1) : '—'}×</strong> more CO₂ per visit than <strong style={{ color:'#f0f0f0' }}>{bot?.n}</strong>. The gap comes from page size, video content, and large images. Choosing lighter websites is one of the easiest ways to reduce your digital carbon footprint.
          </div>
        </div>

        {/* RENEWABLE EXPLAINER */}
        {green && (
          <div style={{ background:'rgba(0,255,135,.04)', border:'1px solid rgba(0,255,135,.15)', borderRadius:14, padding:'16px 20px', marginBottom:14 }}>
            <div style={{ fontWeight:500, color:'#00ff87', marginBottom:6 }}>What does "100% Renewable" mean?</div>
            <div style={{ fontSize:13, color:'#aaa', lineHeight:1.7 }}>
              India's electricity currently produces <strong style={{ color:'#f0f0f0' }}>0.82 kg of CO₂ per unit.</strong> Clean energy like solar and wind would bring that down to <strong style={{ color:'#00ff87' }}>0.10 kg per unit</strong> — an 88% reduction. Every number above now shows what those websites would emit in that cleaner future.
            </div>
          </div>
        )}

        {/* TABLE */}
        <Card style={{ padding:0, overflow:'hidden', marginBottom:28 }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                {['#','','Website','How much CO₂','Per visit','Rating','Score'].map((h,i) => (
                  <th key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, textTransform:'uppercase', letterSpacing:'.08em', color:'#888', textAlign:'left', padding:'10px 14px', borderBottom:'1px solid rgba(255,255,255,.08)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sites.map((s, i) => {
                const score = Math.min(100, Math.max(0, Math.round(Math.max(0,100-s.co2*20)*.7 + Math.max(0,100-s.kb/50)*.3)));
                return (
                  <tr key={s.n} style={{ borderBottom:'1px solid rgba(255,255,255,.08)', transition:'background .15s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.03)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'13px 14px', fontFamily:"'DM Mono',monospace", fontSize:12, color:'#888' }}>{i+1}</td>
                    <td style={{ padding:'13px 14px', fontSize:16 }}>{s.f}</td>
                    <td style={{ padding:'13px 14px', fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:500 }}>{s.n}</td>
                    <td style={{ padding:'13px 14px', width:200 }}>
                      <div style={{ height:8, background:'rgba(255,255,255,.06)', borderRadius:4, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${(s.co2/max*100).toFixed(1)}%`, background:COLORS[i]||'#888', borderRadius:4, transition:'width 1s ease' }}/>
                      </div>
                    </td>
                    <td style={{ padding:'13px 14px', fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:500, color:s.co2>=3?'#ff4444':s.co2>=1?'#ffd60a':'#00ff87' }}>{s.co2}g</td>
                    <td style={{ padding:'13px 14px' }}><Badge co2={s.co2}/></td>
                    <td style={{ padding:'13px 14px', fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888' }}>{score}/100</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Footer />
      </Wrap>
    </>
  );
}