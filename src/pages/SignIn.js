import React, { useState } from 'react';

const USERS = [
  { username: 'admin', password: 'netemit123' },
  { username: 'judge', password: 'hackrace2026' },
  { username: 'team',  password: 'csbs2026' },
];

export default function SignIn({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    // form validation
    if (!username.trim()) { setError('Please enter your username.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }

    setLoading(true);
    setError('');

    // simulate a small delay so it feels real
    setTimeout(() => {
      const found = USERS.find(
        u => u.username === username && u.password === password
      );
      if (found) {
        onLogin();
      } else {
        setError('Wrong username or password. Try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono&display=swap');
        body { margin:0; background:#07070a; font-family:'DM Sans',sans-serif; }
        body::before {
          content:''; position:fixed; inset:0;
          background-image: linear-gradient(rgba(0,255,135,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(0,255,135,0.02) 1px,transparent 1px);
          background-size:48px 48px; pointer-events:none; z-index:0;
        }
        .orb1 { position:fixed;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,135,0.06) 0%,transparent 70%);top:-180px;left:-180px;pointer-events:none;z-index:0; }
        .orb2 { position:fixed;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,53,0.05) 0%,transparent 70%);bottom:-120px;right:-120px;pointer-events:none;z-index:0; }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
      `}</style>
      <div className="orb1"/><div className="orb2"/>

      <div style={{ position:'relative', zIndex:1, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:420 }}>

          {/* LOGO */}
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:'#f0f0f0', marginBottom:8 }}>
              Net<span style={{ color:'#00ff87' }}>Emit</span>
            </div>
            <div style={{ fontSize:14, color:'#888' }}>Digital Carbon Footprint Tracker</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#00ff87', border:'1px solid rgba(0,255,135,.2)', padding:'4px 12px', borderRadius:20, display:'inline-block', marginTop:10, letterSpacing:'.08em' }}>
              <span style={{ display:'inline-block', width:6, height:6, background:'#00ff87', borderRadius:'50%', marginRight:5, animation:'pulse 1.5s infinite' }}/>
              SDG 13 — CLIMATE ACTION
            </div>
          </div>

          {/* CARD */}
          <div style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:32 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, marginBottom:6, color:'#f0f0f0' }}>Sign in</div>
            <div style={{ fontSize:13, color:'#888', marginBottom:24 }}>Enter your credentials to access NetEmit</div>

            {/* USERNAME */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>Username</div>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter username"
                style={{ width:'100%', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.12)', borderRadius:10, padding:'12px 16px', fontFamily:"'DM Mono',monospace", fontSize:13, color:'#f0f0f0', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }}
                onFocus={e => e.target.style.borderColor='rgba(0,255,135,.4)'}
                onBlur={e => e.target.style.borderColor='rgba(255,255,255,.12)'}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>Password</div>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                style={{ width:'100%', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.12)', borderRadius:10, padding:'12px 16px', fontFamily:"'DM Mono',monospace", fontSize:13, color:'#f0f0f0', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }}
                onFocus={e => e.target.style.borderColor='rgba(0,255,135,.4)'}
                onBlur={e => e.target.style.borderColor='rgba(255,255,255,.12)'}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div style={{ background:'rgba(255,68,68,.1)', border:'1px solid rgba(255,68,68,.25)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#ff6b6b', marginBottom:16 }}>
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{ width:'100%', background: loading?'#333':'#00ff87', color: loading?'#666':'#000', border:'none', borderRadius:10, padding:'13px', fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, cursor: loading?'not-allowed':'pointer', transition:'all .2s' }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>

            {/* HINT */}
            <div style={{ marginTop:20, padding:14, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', borderRadius:10 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#888', marginBottom:6 }}>DEMO CREDENTIALS</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:'#aaa', lineHeight:1.9 }}>
                username: <span style={{ color:'#00ff87' }}>admin</span> &nbsp;·&nbsp; password: <span style={{ color:'#00ff87' }}>netemit123</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign:'center', marginTop:20, fontFamily:"'DM Mono',monospace", fontSize:11, color:'#555' }}>
            HACKRACE 2026 · KPR Institute · Team NetEmit
          </div>
        </div>
      </div>
    </>
  );
}