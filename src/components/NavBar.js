import React from 'react';
import { NavLink } from 'react-router-dom';

const s = {
  nav: { position:'sticky', top:0, zIndex:100, background:'rgba(7,7,10,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'0 24px' },
  inner: { maxWidth:1000, margin:'0 auto', display:'flex', alignItems:'center', height:56, gap:4 },
  logo: { fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:'#f0f0f0', textDecoration:'none', marginRight:20, flexShrink:0 },
  em: { color:'#00ff87' },
  link: { fontFamily:"'DM Mono',monospace", fontSize:12, color:'#888', textDecoration:'none', padding:'6px 14px', borderRadius:8, transition:'all .2s' },
  dot: { display:'inline-block', width:6, height:6, background:'#00ff87', borderRadius:'50%', marginRight:5, animation:'pulse 1.5s infinite' },
  badge: { marginLeft:'auto', fontFamily:"'DM Mono',monospace", fontSize:10, color:'#00ff87', border:'1px solid rgba(0,255,135,0.2)', padding:'4px 10px', borderRadius:20, background:'rgba(0,255,135,0.05)', flexShrink:0 },
};

export default function NavBar() {
  const activeStyle = { color:'#00ff87', background:'rgba(0,255,135,0.08)' };
  return (
    <nav style={s.nav}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
      <div style={s.inner}>
        <NavLink to="/" style={s.logo}>Net<em style={s.em}>Emit</em></NavLink>
        {[['/', 'Home'], ['/measure','Measure'], ['/habit','My Habit'], ['/leaderboard','Leaderboard'], ['/about','About']].map(([path, label]) => (
          <NavLink key={path} to={path} end={path==='/'} style={({ isActive }) => ({ ...s.link, ...(isActive ? activeStyle : {}) })}>
            {label}
          </NavLink>
        ))}
        <button onClick={onLogout}
  style={{ marginLeft:'auto', fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', background:'transparent', border:'1px solid rgba(255,255,255,.1)', padding:'5px 14px', borderRadius:8, cursor:'pointer', transition:'all .2s' }}
  onMouseEnter={e=>{e.target.style.color='#ff4444';e.target.style.borderColor='rgba(255,68,68,.3)';}}
  onMouseLeave={e=>{e.target.style.color='#888';e.target.style.borderColor='rgba(255,255,255,.1)';}}>
  Sign out
</button>
        <div style={s.badge}><span style={s.dot}></span>SDG 13</div>
      </div>
    </nav>
  );
}