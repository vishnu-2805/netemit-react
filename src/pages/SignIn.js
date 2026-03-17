import React, { useState } from 'react';
import { signInWithGoogle, signInWithGithub } from '../firebase';

export default function SignIn({ onLogin }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const handleGoogle = async () => {
    setLoading('google'); setError('');
    try {
      await signInWithGoogle();
      onLogin();
    } catch (e) {
      setError('Google sign in failed. Try again.');
    } finally { setLoading(''); }
  };

  const handleGithub = async () => {
    setLoading('github'); setError('');
    try {
      await signInWithGithub();
      onLogin();
    } catch (e) {
      setError('GitHub sign in failed. Try again.');
    } finally { setLoading(''); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:#07070a; font-family:'DM Sans',sans-serif; }
        body::before {
          content:''; position:fixed; inset:0;
          background-image: linear-gradient(rgba(0,255,135,0.02) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,255,135,0.02) 1px,transparent 1px);
          background-size:48px 48px; pointer-events:none; z-index:0;
        }
        .orb1{position:fixed;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,135,0.07) 0%,transparent 70%);top:-180px;left:-180px;pointer-events:none;z-index:0;}
        .orb2{position:fixed;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,53,0.06) 0%,transparent 70%);bottom:-120px;right:-120px;pointer-events:none;z-index:0;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .signin-card{animation:fadeUp .5s ease forwards;}
        .social-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:13px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.04);color:#f0f0f0;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s;margin-bottom:12px;}
        .social-btn:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.25);transform:translateY(-1px);}
        .social-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
        .divider{display:flex;align-items:center;gap:12px;margin:4px 0 16px;}
        .divider-line{flex:1;height:1px;background:rgba(255,255,255,.08);}
        .divider-text{font-family:'DM Mono',monospace;font-size:11px;color:#555;}
      `}</style>

      <div className="orb1"/><div className="orb2"/>

      <div style={{position:'relative',zIndex:1,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
        <div style={{width:'100%',maxWidth:420}} className="signin-card">

          {/* LOGO */}
          <div style={{textAlign:'center',marginBottom:36}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:'#f0f0f0',marginBottom:6}}>
              Net<span style={{color:'#00ff87'}}>Emit</span>
            </div>
            <div style={{fontSize:14,color:'#888',marginBottom:12}}>Digital Carbon Footprint Tracker</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:'#00ff87',border:'1px solid rgba(0,255,135,.2)',padding:'4px 14px',borderRadius:20,display:'inline-block',letterSpacing:'.08em'}}>
              <span style={{display:'inline-block',width:6,height:6,background:'#00ff87',borderRadius:'50%',marginRight:5,animation:'pulse 1.5s infinite'}}/>
              SDG 13 — CLIMATE ACTION
            </div>
          </div>

          {/* CARD */}
          <div style={{background:'#111118',border:'1px solid rgba(255,255,255,.08)',borderRadius:20,padding:32}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:'#f0f0f0',marginBottom:6}}>
              Welcome back
            </div>
            <div style={{fontSize:13,color:'#888',marginBottom:28}}>
              Sign in to access your carbon dashboard
            </div>

            {/* GOOGLE */}
            <button className="social-btn" onClick={handleGoogle} disabled={!!loading}>
              {loading==='google' ? (
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:13}}>Signing in...</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {/* DIVIDER */}
            <div className="divider">
              <div className="divider-line"/>
              <div className="divider-text">OR</div>
              <div className="divider-line"/>
            </div>

            {/* GITHUB */}
            <button className="social-btn" onClick={handleGithub} disabled={!!loading}>
              {loading==='github' ? (
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:13}}>Signing in...</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0f0f0">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </>
              )}
            </button>

            {/* ERROR */}
            {error && (
              <div style={{background:'rgba(255,68,68,.1)',border:'1px solid rgba(255,68,68,.25)',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#ff6b6b',marginTop:8}}>
                {error}
              </div>
            )}

            {/* FOOTER NOTE */}
            <div style={{marginTop:24,padding:14,background:'rgba(0,255,135,.03)',border:'1px solid rgba(0,255,135,.1)',borderRadius:10}}>
              <div style={{fontSize:12,color:'#666',lineHeight:1.7}}>
                By signing in you agree to use NetEmit responsibly. Your login is secured by Firebase Authentication. We do not store any passwords.
              </div>
            </div>
          </div>

          <div style={{textAlign:'center',marginTop:20,fontFamily:"'DM Mono',monospace",fontSize:11,color:'#444'}}>
            HACKRACE 2026 · KPR Institute · Team NetEmit
          </div>
        </div>
      </div>
    </>
  );
}