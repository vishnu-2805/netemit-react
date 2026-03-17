import React from 'react';

/* ── Orbs background ── */
export function Orbs() {
  return (
    <>
      <style>{`
        .orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;}
        .orb1{width:500px;height:500px;background:radial-gradient(circle,rgba(0,255,135,0.06) 0%,transparent 70%);top:-180px;left:-180px;animation:of 9s ease-in-out infinite;}
        .orb2{width:400px;height:400px;background:radial-gradient(circle,rgba(255,107,53,0.05) 0%,transparent 70%);bottom:-120px;right:-120px;animation:of 11s ease-in-out infinite reverse;}
        @keyframes of{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,12px)}}
      `}</style>
      <div className="orb orb1"/><div className="orb orb2"/>
    </>
  );
}

/* ── Page wrapper ── */
export function Wrap({ children }) {
  return <div style={{ position:'relative', zIndex:1, maxWidth:1000, margin:'0 auto', padding:'0 24px 80px' }}>{children}</div>;
}

/* ── Card ── */
export function Card({ children, style = {} }) {
  return <div style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24, ...style }}>{children}</div>;
}

/* ── Small label (uppercase mono) ── */
export function Label({ children, color }) {
  return <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, textTransform:'uppercase', letterSpacing:'.08em', color: color || '#888', marginBottom:6 }}>{children}</div>;
}

/* ── Page header ── */
export function PageHeader({ title, sub }) {
  return (
    <div style={{ padding:'40px 0 28px' }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(28px,4vw,40px)', fontWeight:800, letterSpacing:-1, marginBottom:8 }}>{title}</div>
      <div style={{ fontSize:15, color:'#aaa', lineHeight:1.65, maxWidth:500 }}>{sub}</div>
    </div>
  );
}

/* ── Badge (Eco Friendly / Moderate / Heavy) ── */
export function Badge({ co2 }) {
  const cfg = co2 < 1
    ? { label:'Eco Friendly', bg:'rgba(0,255,135,.1)', color:'#00ff87', dot:'#00ff87', border:'rgba(0,255,135,.2)' }
    : co2 < 3
    ? { label:'Moderate',     bg:'rgba(255,214,10,.1)', color:'#ffd60a', dot:'#ffd60a', border:'rgba(255,214,10,.2)' }
    : { label:'Heavy Polluter',bg:'rgba(255,68,68,.1)', color:'#ff4444', dot:'#ff4444', border:'rgba(255,68,68,.2)' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:"'DM Mono',monospace", fontSize:11, padding:'4px 10px', borderRadius:20, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}` }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:cfg.dot, display:'inline-block' }}/>
      {cfg.label}
    </span>
  );
}

/* ── Stat card ── */
export function StatCard({ label, value, sub, color = '#f0f0f0' }) {
  return (
    <Card style={{ padding:20 }}>
      <Label>{label}</Label>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, letterSpacing:-1, color, marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:12, color:'#888' }}>{sub}</div>
    </Card>
  );
}

/* ── Button ── */
export function Btn({ children, onClick, disabled, ghost }) {
  const base = { fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, border:'none', borderRadius:10, cursor:disabled?'not-allowed':'pointer', padding:'11px 26px', transition:'all .2s', textDecoration:'none', display:'inline-block' };
  const style = ghost
    ? { ...base, background:'transparent', color:'#aaa', border:'1px solid rgba(255,255,255,0.15)' }
    : disabled
    ? { ...base, background:'#333', color:'#666' }
    : { ...base, background:'#00ff87', color:'#000' };
  return <button style={style} onClick={onClick} disabled={disabled}>{children}</button>;
}

/* ── Footer ── */
export function Footer() {
  return <footer style={{ borderTop:'1px solid rgba(255,255,255,0.08)', padding:'20px 0', textAlign:'center', fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', marginTop:20 }}><b style={{ color:'#00ff87' }}>HACKRACE 2026</b> · KPR Institute · Dept. of CSBS · Team NetEmit</footer>;
}

/* ── Eq box (comparison card) ── */
export function EqBox({ icon, value, text }) {
  return (
    <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:16, textAlign:'center' }}>
      <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:'#00ff87', marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:12, color:'#888', lineHeight:1.45 }}>{text}</div>
    </div>
  );
}

/* ── Toast ── */
export function Toast({ msg, type }) {
  if (!msg) return null;
  const color = type === 'ok' ? '#00ff87' : '#ff4444';
  const border = type === 'ok' ? 'rgba(0,255,135,.3)' : 'rgba(255,68,68,.3)';
  return (
    <div style={{ position:'fixed', bottom:24, right:24, background:'#111118', border:`1px solid ${border}`, borderRadius:12, padding:'12px 18px', fontFamily:"'DM Mono',monospace", fontSize:12, color, zIndex:999, maxWidth:280 }}>
      {msg}
    </div>
  );
}