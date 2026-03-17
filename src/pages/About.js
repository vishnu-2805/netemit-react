import React from 'react';
import { Orbs, Wrap, Card, Label, PageHeader, Footer } from '../components/UI';

export default function About() {
  return (
    <>
      <Orbs />
      <Wrap>
        <PageHeader title="About NetEmit" sub="Built for HACKRACE 2026 · KPR Institute of Engineering and Technology · Dept. of CSBS" />

        <Card style={{ marginBottom:14 }}>
          <Label style={{ marginBottom:14 }}>Why we built this</Label>
          <div style={{ fontSize:15, color:'#aaa', lineHeight:1.85, maxWidth:680 }}>
            People feel guilty about using plastic bags. They turn off fans to save electricity. But nobody talks about the carbon cost of the internet — one of the fastest-growing sources of CO₂ on the planet.<br/><br/>
            Every Google search emits <strong style={{ color:'#f0f0f0' }}>0.2g of CO₂.</strong> One minute of YouTube emits <strong style={{ color:'#f0f0f0' }}>0.36g.</strong> One ChatGPT query emits <strong style={{ color:'#ff6b35' }}>4.32g</strong> — 21 times more than a Google search. India has 800 million internet users. Multiply that — the numbers are enormous. And yet this pollution is completely invisible to most people.<br/><br/>
            <strong style={{ color:'#00ff87' }}>NetEmit makes the invisible visible.</strong>
          </div>
        </Card>

        <Card style={{ marginBottom:14 }}>
          <Label style={{ marginBottom:14 }}>How the calculation works</Label>
          <div style={{ background:'rgba(0,255,135,.04)', border:'1px solid rgba(0,255,135,.12)', borderRadius:12, padding:'16px 20px', fontFamily:"'DM Mono',monospace", fontSize:13, color:'#00ff87', lineHeight:2, marginBottom:16 }}>
            CO₂ (grams) = page size (bytes) ÷ 1,000,000,000 × 0.81 kWh per GB × 0.82 kg CO₂ per kWh × 1000
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {[
              { label:'Data transfer energy', val:'0.81 kWh/GB', color:'#f0f0f0', desc:'How much electricity is used to transfer 1 GB of data over the internet (Sustainable Web Design model)' },
              { label:"India's electricity carbon", val:'0.82 kg/kWh', color:'#ff6b35', desc:"How much CO₂ India's electricity grid produces per unit of electricity (Central Electricity Authority of India — official government data)" },
              { label:'What makes us different', val:'Live data', color:'#00ff87', desc:'We fetch each website right now and measure the actual bytes. Not a 2019 estimate — real numbers, measured in real time.' },
            ].map(c => (
              <div key={c.label} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:16 }}>
                <Label style={{ marginBottom:6 }}>{c.label}</Label>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:c.color, marginBottom:4 }}>{c.val}</div>
                <div style={{ fontSize:12, color:'#aaa', lineHeight:1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ background:'linear-gradient(135deg,rgba(0,255,135,.05),rgba(255,107,53,.05))', border:'1px solid rgba(0,255,135,.15)', borderRadius:16, padding:'28px 32px', marginBottom:14, display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
          <div style={{ fontSize:48 }}>🌍</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, marginBottom:8 }}>SDG 13 — Climate Action</div>
            <div style={{ fontSize:14, color:'#aaa', lineHeight:1.75, maxWidth:580 }}>
              If just <strong style={{ color:'#00ff87' }}>1% of India's 800 million internet users</strong> reduced daily browsing by 10 minutes because of awareness tools like NetEmit, that saves <strong style={{ color:'#00ff87' }}>400+ tonnes of CO₂ every single day</strong> — equivalent to removing 90 cars from the road permanently.
            </div>
          </div>
        </div>

        <Card style={{ marginBottom:28 }}>
          <Label style={{ marginBottom:16 }}>Team NetEmit</Label>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { icon:'💻', title:'Python Backend', desc:'Flask API · Live carbon calculation · Real-time measurement' },
              { icon:'⚛️', title:'React Frontend', desc:'5 pages · React Router · useState & useEffect hooks · Chart.js' },
              { icon:'📊', title:'Data & Research', desc:'CEA India data · Emission rates · SDG 13 impact numbers' },
            ].map(t => (
              <div key={t.title} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:18, textAlign:'center' }}>
                <div style={{ fontSize:30, marginBottom:10 }}>{t.icon}</div>
                <div style={{ fontWeight:500, marginBottom:4 }}>{t.title}</div>
                <div style={{ fontSize:12, color:'#aaa' }}>{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,255,255,.08)', textAlign:'center', fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888' }}>
            KPR Institute of Engineering and Technology · Department of Computer Science and Business Systems · HACKRACE 2026
          </div>
        </Card>

        <Footer />
      </Wrap>
    </>
  );
}