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
      <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
  {user?.photoURL && (
    <img src={user.photoURL} alt="profile"
      style={{width:28,height:28,borderRadius:'50%',border:'2px solid rgba(0,255,135,.3)'}}/>
  )}
  <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'#aaa'}}>
    {user?.displayName?.split(' ')[0]}
  </span>
  <button onClick={onLogout}
    style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'#888',background:'transparent',border:'1px solid rgba(255,255,255,.1)',padding:'5px 12px',borderRadius:8,cursor:'pointer'}}>
    Sign out
  </button>
</div>
    </nav>
  );
}