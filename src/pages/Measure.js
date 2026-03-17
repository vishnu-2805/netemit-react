import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Orbs, Wrap, Card, Label, PageHeader, Badge, EqBox, StatCard, Footer, Toast } from '../components/UI';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API = 'http://127.0.0.1:5000';

export default function Measure() {
  const [url, setUrl] = useState('');
  const [watchMins, setWatchMins] = useState(0);
  const [budget, setBudget] = useState(50);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sessionLog, setSessionLog] = useState([]);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionWatch, setSessionWatch] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef();

  // show toast then auto-hide
  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const measure = async () => {
    const trimmed = url.trim();
    if (!trimmed) { showToast('Please type a website first', 'err'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/calculate?url=${encodeURIComponent(trimmed)}&watch_mins=${watchMins}`);
      const d = await res.json();
      if (d.error) { showToast('Could not load: ' + d.error, 'err'); return; }
      const total = +(d.co2_grams + (d.watch_co2 || 0)).toFixed(4);
      setResult({ ...d, total });
      setSessionTotal(p => +(p + total).toFixed(4));
      setSessionWatch(p => p + watchMins);
      setSessionLog(prev => {
        const ex = prev.find(x => x.host === d.hostname);
        if (ex) return prev.map(x => x.host === d.hostname ? { ...x, total: +(x.total + total).toFixed(4), page: +(x.page + d.co2_grams).toFixed(4), watch: +(x.watch + (d.watch_co2||0)).toFixed(4), mins: x.mins + watchMins } : x).sort((a,b)=>b.total-a.total);
        return [...prev, { host: d.hostname, total, page: d.co2_grams, watch: d.watch_co2||0, mins: watchMins, badge: d.badge }].sort((a,b)=>b.total-a.total);
      });
      showToast(d.hostname + ' checked!', 'ok');
    } catch { showToast('Backend not running — open terminal: python app.py', 'err'); }
    finally { setLoading(false); }
  };

  // budget calc
  const budgetPct = Math.min((sessionTotal / budget) * 100, 100);
  const budgetColor = budgetPct >= 100 ? '#ff4444' : budgetPct >= 80 ? '#ffd60a' : '#00ff87';

  // chart data from session log
  const chartData = {
    labels: sessionLog.map(s => s.host),
    datasets: [
      { label: 'Page load CO₂', data: sessionLog.map(s => s.page), backgroundColor: 'rgba(0,255,135,0.6)', borderRadius: 6, borderSkipped: false },
      { label: 'Watch time CO₂', data: sessionLog.map(s => s.watch), backgroundColor: 'rgba(255,107,53,0.65)', borderRadius: 6, borderSkipped: false },
    ],
  };
  const chartOpts = {
    responsive: true, plugins: { legend: { display: true, labels: { color:'#888', usePointStyle:true, pointStyle:'circle', padding:14 } }, tooltip: { backgroundColor:'#111118', borderColor:'rgba(255,255,255,.1)', borderWidth:1 } },
    scales: { x: { stacked:true, grid:{display:false}, ticks:{color:'#888',maxRotation:25} }, y: { stacked:true, grid:{color:'rgba(255,255,255,.04)'}, ticks:{color:'#888',callback:v=>v+'g'} } },
  };

  const sentence = result ? {
    green: `Great news — ${result.hostname} is a relatively clean website. Loading it once emits less than 1 gram of CO₂.`,
    yellow: `Loading ${result.hostname} emits a moderate amount of CO₂. Frequent visits add up over time.`,
    red: `${result.hostname} is a heavy website. Each visit emits a significant amount of CO₂ — mostly from video and large images.`,
  }[result.badge.color] : '';

  const chips = ['youtube.com','instagram.com','netflix.com','hotstar.com','google.com','amazon.in','cricbuzz.com','spotify.com'];

  return (
    <>
      <Orbs />
      <Wrap>
        <PageHeader title="Check any website" sub="Type a website and we will tell you exactly how much CO₂ loading it produces." />

        {/* SEARCH */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:'flex', background:'#07070a', border:'1px solid rgba(255,255,255,.12)', borderRadius:12, padding:'5px 5px 5px 18px', gap:8, alignItems:'center', marginBottom:12 }}>
            <input ref={inputRef} value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&measure()}
              placeholder="Type any website — e.g. youtube.com"
              style={{ flex:1, background:'none', border:'none', outline:'none', fontFamily:"'DM Mono',monospace", fontSize:13, color:'#f0f0f0', padding:'9px 0' }}/>
            <button onClick={measure} disabled={loading}
              style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, background: loading?'#333':'#00ff87', color: loading?'#666':'#000', border:'none', borderRadius:10, padding:'11px 24px', cursor: loading?'not-allowed':'pointer', transition:'all .2s' }}>
              {loading ? 'Checking...' : 'Check CO₂'}
            </button>
          </div>

          {/* WATCH TIME */}
          <div style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 14px', background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.08)', borderRadius:10, marginBottom:12 }}>
            <div style={{ fontSize:13, color:'#aaa', whiteSpace:'nowrap' }}>How long will you use it?</div>
            <input type="range" min={0} max={240} step={5} value={watchMins} onChange={e=>setWatchMins(+e.target.value)} style={{ flex:1 }}/>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:'#00ff87', minWidth:80, textAlign:'right' }}>
              {watchMins === 0 ? 'Just loading' : watchMins < 60 ? watchMins + ' min' : Math.floor(watchMins/60)+'h '+(watchMins%60?watchMins%60+'m':'')}
            </div>
          </div>

          {/* CHIPS */}
          <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
            {chips.map(c => (
              <span key={c} onClick={()=>{setUrl(c);}} style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', border:'1px solid rgba(255,255,255,.08)', padding:'4px 12px', borderRadius:20, cursor:'pointer', transition:'all .2s' }}
                onMouseEnter={e=>{e.target.style.color='#00ff87';e.target.style.borderColor='rgba(0,255,135,.3)';}}
                onMouseLeave={e=>{e.target.style.color='#888';e.target.style.borderColor='rgba(255,255,255,.08)';}}>
                {c.replace('.com','').replace('.in','')}
              </span>
            ))}
          </div>
        </Card>

        {/* BUDGET */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8, marginBottom:10 }}>
            <div>
              <div style={{ fontWeight:500, fontSize:14 }}>Your daily CO₂ budget</div>
              <div style={{ fontSize:12, color:'#888', marginTop:2 }}>How much CO₂ you allow yourself to emit from internet use today</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <input type="number" value={budget} min={1} max={500} onChange={e=>setBudget(+e.target.value)}
                style={{ width:65, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, padding:'5px 10px', fontFamily:"'DM Mono',monospace", fontSize:13, color:'#f0f0f0', outline:'none', textAlign:'center' }}/>
              <span style={{ fontSize:13, color:'#888' }}>grams</span>
            </div>
          </div>
          <div style={{ height:10, background:'rgba(255,255,255,.07)', borderRadius:5, overflow:'hidden', margin:'8px 0' }}>
            <div style={{ height:'100%', width:`${budgetPct}%`, background:budgetColor, borderRadius:5, transition:'width .4s ease,background .3s' }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', marginTop:4 }}>
            <span>{sessionTotal}g used so far today</span>
            <span style={{ color:budgetColor }}>
              {budgetPct >= 100 ? '⚠ Budget exceeded!' : budgetPct >= 80 ? 'Getting close to your limit' : 'You are within budget'}
            </span>
          </div>
        </Card>

        {/* RESULT */}
        {result && (
          <Card style={{ marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:8 }}>
              <div>
                <Label>{result.hostname.toUpperCase()}</Label>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(56px,9vw,96px)', fontWeight:800, letterSpacing:-4, lineHeight:1, color:'#ff6b35' }}>
                  {result.total}
                </div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, color:'#aaa', marginTop:-4 }}>grams of CO₂</div>
              </div>
              <Badge co2={result.co2_grams} />
            </div>

            <div style={{ fontSize:15, color:'#aaa', lineHeight:1.7, margin:'12px 0 20px' }}>{sentence}</div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:20 }}>
              <EqBox icon="🚗" value={result.equivalents.km_driving + ' km'} text="Same as driving this far in a car" />
              <EqBox icon="💡" value={result.equivalents.led_hours + ' hrs'} text="Same as running a light bulb for this long" />
              <EqBox icon="📱" value={result.equivalents.phone_charges + '×'} text="Same as charging your phone this many times" />
            </div>

            {/* BREAKDOWN */}
            <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:16 }}>
              <div style={{ fontWeight:500, fontSize:14, marginBottom:4 }}>Where this CO₂ comes from</div>
              <div style={{ fontSize:13, color:'#aaa', marginBottom:14, lineHeight:1.6 }}>
                {watchMins > 0
                  ? `Loading the page once costs ${result.co2_grams}g. Watching for ${watchMins} minutes adds ${result.watch_co2}g more because the site keeps loading new content.`
                  : `${result.hostname} emits about ${result.co2_per_min}g of CO₂ every minute you use it. Use the slider above to see your total for any watch time.`}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <div style={{ background:'rgba(0,255,135,.04)', border:'1px solid rgba(0,255,135,.12)', borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:12, color:'#888', marginBottom:4 }}>Page load (one time)</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:'#00ff87' }}>{result.co2_grams}g</div>
                </div>
                <div style={{ background:'rgba(255,107,53,.04)', border:'1px solid rgba(255,107,53,.12)', borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:12, color:'#888', marginBottom:4 }}>{watchMins > 0 ? `Watching for ${watchMins} min` : 'Watch time CO₂'}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:'#ff6b35' }}>{result.watch_co2 > 0 ? result.watch_co2+'g' : '0g (no watch time set)'}</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* SESSION STATS */}
        {sessionLog.length > 0 && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:14 }}>
              <StatCard label="Total CO₂ today" value={sessionTotal+'g'} sub="from all sites you checked" color="#ff6b35"/>
              <StatCard label="Sites checked" value={sessionLog.length} sub="this session" color="#00ff87"/>
              <StatCard label="Total time tracked" value={sessionWatch+' min'} sub="of watching / using"/>
            </div>

            {/* VILLAIN */}
            {sessionLog.length >= 2 && (
              <div style={{ background:'rgba(255,68,68,.05)', border:'1px solid rgba(255,68,68,.18)', borderRadius:16, padding:'20px 24px', marginBottom:14 }}>
                <Label style={{ color:'#ff4444', marginBottom:10 }}>Your biggest CO₂ source today</Label>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800 }}>{sessionLog[0].host}</div>
                    <div style={{ fontSize:13, color:'#aaa', marginTop:4 }}>
                      {sessionLog[0].mins > 0
                        ? `You spent ${sessionLog[0].mins} minutes on this site — ${sessionLog[0].page}g from loading + ${sessionLog[0].watch.toFixed(4)}g from watching.`
                        : `Page load emitted ${sessionLog[0].page}g of CO₂.`}
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, color:'#ff4444' }}>{sessionLog[0].total}g</div>
                    <div style={{ fontSize:12, color:'#888' }}>total CO₂</div>
                  </div>
                </div>
              </div>
            )}

            {/* PERSONAL LB */}
            {sessionLog.length >= 2 && (
              <Card style={{ marginBottom:14 }}>
                <div style={{ fontWeight:500, fontSize:14, marginBottom:4 }}>Your sites ranked by CO₂ today</div>
                <div style={{ fontSize:12, color:'#888', marginBottom:16 }}>The site at the top is your carbon villain — the one emitting the most.</div>
                {sessionLog.map((s, i) => {
                  const colors = ['#ff2200','#ff6b35','#ffaa5c','#ffe0a0','#d4ff9b','#00ff87'];
                  return (
                    <div key={s.host} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom: i < sessionLog.length-1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', minWidth:20 }}>{i+1}</div>
                      <div style={{ flex:1, fontFamily:"'DM Mono',monospace", fontSize:13 }}>{s.host}</div>
                      <div style={{ flex:2, height:7, background:'rgba(255,255,255,.06)', borderRadius:4, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${(s.total/sessionLog[0].total*100).toFixed(1)}%`, background:colors[Math.min(i,5)], borderRadius:4 }}/>
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', minWidth:48, textAlign:'right' }}>{s.mins > 0 ? s.mins+'m' : ''}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, minWidth:52, textAlign:'right', color: s.total>=3?'#ff4444':s.total>=1?'#ffd60a':'#00ff87' }}>{s.total}g</div>
                    </div>
                  );
                })}
              </Card>
            )}

            {/* CHART */}
            <Card style={{ marginBottom:14 }}>
              <div style={{ fontWeight:500, fontSize:14, marginBottom:4 }}>CO₂ from each site</div>
              <div style={{ fontSize:12, color:'#888', marginBottom:16 }}>Green = loading the page once. Orange = time you spent on it.</div>
              <Bar data={chartData} options={chartOpts} />
            </Card>
          </>
        )}

        <Footer />
      </Wrap>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </>
  );
}