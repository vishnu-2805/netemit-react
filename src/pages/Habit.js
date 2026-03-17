import React, { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Orbs, Wrap, Card, Label, PageHeader, Footer } from '../components/UI';

ChartJS.register(ArcElement, Tooltip, Legend);

const RATES = { youtube:0.36, netflix:0.42, instagram:0.05, spotify:0.028, google:0.2, chatgpt:4.32, whatsapp:0.014, email:4.0 };
const TIPS = {
  YouTube: 'Try watching with your screen off when just listening to music.',
  Netflix: 'Use a lower video quality setting to reduce data usage.',
  Instagram: 'Set a daily screen time limit in your phone settings.',
  Spotify: 'This is actually the greenest streaming option — keep it up!',
  Google: 'Each search is small, but they add up. Try batching questions.',
  ChatGPT: 'Each AI query emits 21× more CO₂ than a Google search. Think before asking!',
  WhatsApp: 'Avoid sending large video files — they use the most data.',
  Email: 'Unsubscribe from newsletters you never read.',
};
const GRADES = [
  { max:5,   g:'A+', title:'Carbon Champion',  bg:'rgba(0,255,135,.06)', bc:'rgba(0,255,135,.2)',  gc:'#00ff87', tip:'You are extremely eco-conscious. Share NetEmit with friends!' },
  { max:15,  g:'A',  title:'Eco Aware',         bg:'rgba(0,255,135,.05)', bc:'rgba(0,255,135,.15)', gc:'#00ff87', tip:'Try replacing 30 min of YouTube with a podcast — saves 648g CO₂/year.' },
  { max:30,  g:'B',  title:'Average User',      bg:'rgba(255,214,10,.05)',bc:'rgba(255,214,10,.2)', gc:'#ffd60a', tip:'Cut ChatGPT queries in half — saves up to 3 kg CO₂/year.' },
  { max:50,  g:'C',  title:'Heavy Consumer',    bg:'rgba(255,107,53,.05)',bc:'rgba(255,107,53,.2)', gc:'#ff6b35', tip:'Switch music from YouTube to Spotify — 10× less CO₂ per hour.' },
  { max:80,  g:'D',  title:'Digital Polluter',  bg:'rgba(255,68,68,.05)', bc:'rgba(255,68,68,.18)', gc:'#ff4444', tip:'Cut streaming by 1 hour a day and save 131g CO₂ every single day.' },
  { max:Infinity,g:'F',title:'Carbon Offender', bg:'rgba(255,68,68,.07)', bc:'rgba(255,68,68,.22)', gc:'#ff4444', tip:'Your internet habit emits as much CO₂ as driving 667+ km per year.' },
];

function Slider({ icon, title, desc, id, max, step, val, onChange }) {
  return (
    <Card style={{ padding:18 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <span style={{ fontSize:24 }}>{icon}</span>
        <div>
          <div style={{ fontWeight:500, fontSize:14, marginBottom:2 }}>{title}</div>
          <div style={{ fontSize:11, color:'#888', lineHeight:1.5 }}>{desc}</div>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <input type="range" min={0} max={max} step={step} value={val} onChange={e=>onChange(+e.target.value)} style={{ flex:1 }}/>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:'#00ff87', minWidth:55, textAlign:'right' }}>{val}{id==='google'||id==='chatgpt'||id==='whatsapp'||id==='email'?'':' min'}</div>
      </div>
    </Card>
  );
}

export default function Habit() {
  const [vals, setVals] = useState({ youtube:120, netflix:60, instagram:45, spotify:60, google:20, chatgpt:10, whatsapp:100, email:10 });
  const set = (k, v) => setVals(p => ({ ...p, [k]: v }));

  const breakdown = useMemo(() => ({
    YouTube:   +(vals.youtube   * RATES.youtube).toFixed(2),
    Netflix:   +(vals.netflix   * RATES.netflix).toFixed(2),
    Instagram: +(vals.instagram * RATES.instagram).toFixed(2),
    Spotify:   +(vals.spotify   * RATES.spotify).toFixed(2),
    Google:    +(vals.google    * RATES.google).toFixed(2),
    ChatGPT:   +(vals.chatgpt   * RATES.chatgpt).toFixed(2),
    WhatsApp:  +(vals.whatsapp  * RATES.whatsapp).toFixed(2),
    Email:     +(vals.email     * RATES.email).toFixed(2),
  }), [vals]);

  const daily = Object.values(breakdown).reduce((a,b)=>a+b, 0);
  const yearlyG = daily * 365;
  const yearlyKg = yearlyG / 1000;
  const grade = GRADES.find(g => yearlyKg < g.max) || GRADES[GRADES.length-1];
  const villain = Object.entries(breakdown).sort((a,b)=>b[1]-a[1])[0];
  const saved20 = yearlyKg * 0.2;

  const donutData = {
    labels: Object.keys(breakdown),
    datasets: [{ data: Object.values(breakdown), backgroundColor: ['#ff6b35','#ff4500','#ffd60a','#1db954','#00ff87','#7b7bff','#25d366','#888'], borderWidth:0, hoverOffset:8 }],
  };
  const donutOpts = {
    responsive:true, cutout:'62%',
    plugins:{ legend:{position:'right', labels:{color:'#888',padding:14,usePointStyle:true,pointStyle:'circle'}}, tooltip:{backgroundColor:'#111118',borderColor:'rgba(255,255,255,.1)',borderWidth:1,callbacks:{label:c=>` ${c.label}: ${c.parsed.toFixed(2)}g/day`}} },
  };

  const sliders = [
    { icon:'▶️', title:'YouTube watching', desc:'Minutes per day', id:'youtube', max:480, step:10, val:vals.youtube },
    { icon:'🎬', title:'Netflix / OTT watching', desc:'Minutes per day', id:'netflix', max:480, step:10, val:vals.netflix },
    { icon:'📱', title:'Instagram / Reels', desc:'Minutes per day', id:'instagram', max:180, step:5, val:vals.instagram },
    { icon:'🎵', title:'Spotify / Music', desc:'Minutes per day', id:'spotify', max:480, step:10, val:vals.spotify },
    { icon:'🔍', title:'Google searches', desc:'Times per day', id:'google', max:100, step:5, val:vals.google },
    { icon:'🤖', title:'ChatGPT / AI queries', desc:'Times per day (each = 21× a Google search!)', id:'chatgpt', max:100, step:5, val:vals.chatgpt },
    { icon:'💬', title:'WhatsApp messages sent', desc:'Messages per day', id:'whatsapp', max:500, step:10, val:vals.whatsapp },
    { icon:'📧', title:'Emails sent', desc:'Emails per day', id:'email', max:100, step:5, val:vals.email },
  ];

  return (
    <>
      <Orbs />
      <Wrap>
        <PageHeader title="How much CO₂ does your internet habit produce?" sub="Move the sliders to match your daily use. Your grade updates live." />

        {/* SLIDERS */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          {sliders.map(s => <Slider key={s.id} {...s} onChange={v=>set(s.id,v)}/>)}
        </div>

        {/* GRADE */}
        <div style={{ background:grade.bg, border:`1px solid ${grade.bc}`, borderRadius:16, padding:'28px 32px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:28, flexWrap:'wrap' }}>
            <div>
              <Label style={{ marginBottom:8 }}>Your digital carbon grade</Label>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:88, fontWeight:800, letterSpacing:-4, lineHeight:1, color:grade.gc }}>{grade.g}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, marginBottom:6 }}>{grade.title}</div>
              <div style={{ fontSize:14, color:'#aaa', lineHeight:1.7, marginBottom:14 }}>💡 {grade.tip}</div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <div style={{ background:'rgba(255,255,255,.05)', borderRadius:10, padding:'10px 16px' }}>
                  <Label style={{ marginBottom:3 }}>Per day</Label>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:'#ff6b35' }}>{daily.toFixed(2)}g</div>
                </div>
                <div style={{ background:'rgba(255,255,255,.05)', borderRadius:10, padding:'10px 16px' }}>
                  <Label style={{ marginBottom:3 }}>Per year</Label>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:'#ff6b35' }}>{yearlyKg.toFixed(2)} kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VILLAIN */}
        <div style={{ background:'rgba(255,68,68,.05)', border:'1px solid rgba(255,68,68,.18)', borderRadius:16, padding:'20px 24px', marginBottom:14 }}>
          <Label style={{ color:'#ff4444', marginBottom:10 }}>Your biggest carbon villain app</Label>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800 }}>{villain[0]}</div>
              <div style={{ fontSize:13, color:'#aaa', marginTop:5, maxWidth:400 }}>{TIPS[villain[0]]}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, color:'#ff4444' }}>{villain[1]}g</div>
              <div style={{ fontSize:12, color:'#888' }}>grams of CO₂ per day</div>
            </div>
          </div>
        </div>

        {/* COMPARISONS */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ fontWeight:500, fontSize:15, marginBottom:16 }}>Your yearly internet CO₂ is the same as...</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:20 }}>
            {[
              { icon:'🚗', val:(yearlyG/120).toFixed(1)+' km', text:'km of driving a car' },
              { icon:'🛍️', val:(yearlyG/33).toFixed(1), text:'plastic bags produced', color:'#ffd60a' },
              { icon:'🌳', val:(yearlyKg/21).toFixed(2), text:'trees needed to absorb it', color:'#00ff87' },
            ].map(e => (
              <div key={e.text} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:16, textAlign:'center' }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{e.icon}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:e.color||'#ff6b35', marginBottom:4 }}>{e.val}</div>
                <div style={{ fontSize:12, color:'#888' }}>{e.text}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'rgba(0,255,135,.04)', border:'1px solid rgba(0,255,135,.15)', borderRadius:12, padding:'16px 18px' }}>
            <div style={{ fontWeight:500, fontSize:14, color:'#00ff87', marginBottom:8 }}>If you use the internet 20% less per day...</div>
            <div style={{ fontSize:14, color:'#aaa', lineHeight:1.7 }}>
              You would save <strong style={{ color:'#00ff87' }}>{saved20.toFixed(2)} kg of CO₂ per year</strong> — that is the same as not driving {(saved20*1000/120).toFixed(1)} km, or planting {(saved20/21).toFixed(2)} extra trees.
            </div>
          </div>
        </Card>

        {/* DONUT */}
        <Card style={{ marginBottom:28 }}>
          <div style={{ fontWeight:500, fontSize:15, marginBottom:4 }}>Where your CO₂ comes from</div>
          <div style={{ fontSize:13, color:'#888', marginBottom:16 }}>Each slice shows which app contributes the most to your daily carbon footprint.</div>
          <Doughnut data={donutData} options={donutOpts} />
        </Card>

        <Footer />
      </Wrap>
    </>
  );
}