<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="theme-color" content="#FFF9F2">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<title id="pageTitle">AbsensiTK — Guru & Admin</title>
<link rel="manifest" href="manifest-guru.json">
<link rel="apple-touch-icon" href="icon-guru-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
<style>
:root{
  --bg:        #FFF9F2;
  --bg2:       #FFF3E6;
  --surface:   #FFFFFF;
  --surface2:  #FFF1E0;
  --border:    rgba(43,33,64,0.08);
  --border2:   rgba(43,33,64,0.16);
  --text:      #2B2140;
  --text2:     #6E6480;
  --muted:     #A79FB3;
  --coral:     #FF7B54;
  --coral-rgb: 255,123,84;
  --coral-dk:  #E8623C;
  --mint:      #29B6A8;
  --sky:       #5B9BD5;
  --purple:    #9B87F5;
  --yellow:    #FFC857;
  --orange:    #FF9F43;
  --slate:     #6C7A9C;
  --red:       #F0554A;
  --ok-bg:     rgba(41,182,168,0.12);
  --ok-brd:    rgba(41,182,168,0.30);
  --warn-bg:   rgba(255,200,87,0.18);
  --warn-brd:  rgba(255,200,87,0.45);
  --bad-bg:    rgba(240,85,74,0.10);
  --bad-brd:   rgba(240,85,74,0.28);
  --r: 20px; --r-sm: 14px; --r-xs: 10px;
  --display: 'Baloo 2', sans-serif;
  --sans: 'Plus Jakarta Sans', sans-serif;
  --mono: 'JetBrains Mono', monospace;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{height:100%}
body{
  font-family:var(--sans);background:var(--bg);color:var(--text);
  min-height:100dvh;display:flex;flex-direction:column;
  max-width:600px;margin:0 auto;position:relative;overflow-x:hidden;
}
body::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(circle at 8% 4%, rgba(var(--coral-rgb),0.10), transparent 40%),
    radial-gradient(circle at 92% 14%, rgba(91,155,213,0.10), transparent 38%),
    radial-gradient(circle at 50% 100%, rgba(155,135,245,0.08), transparent 45%);
}
button{font-family:inherit;border:none;background:none;cursor:pointer;color:inherit}
input,select,textarea{font-family:inherit;color:inherit}
::-webkit-scrollbar{display:none}
.hidden{display:none !important}

/* HEADER */
.hdr{
  position:sticky;top:0;z-index:90;
  background:rgba(255,249,242,0.92);backdrop-filter:blur(14px);
  border-bottom:1px solid var(--border);
  padding:12px 16px;position:relative;
}
.hdr-top{display:flex;align-items:center;justify-content:space-between;gap:10px;}
.hdr-brand{display:flex;align-items:center;gap:10px;min-width:0;}
.hdr-logo{
  width:42px;height:42px;border-radius:14px;
  background:linear-gradient(135deg,var(--coral),var(--yellow));
  display:flex;align-items:center;justify-content:center;font-size:22px;
  box-shadow:0 4px 14px rgba(var(--coral-rgb),0.35);flex-shrink:0;overflow:hidden;
}
.hdr-title{font-family:var(--display);font-weight:700;font-size:18px;line-height:1.15;}
.hdr-sub{font-size:11px;color:var(--text2);margin-top:1px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.hdr-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.icon-btn-hdr{
  width:38px;height:38px;border-radius:50%;background:var(--surface2);border:1.5px solid var(--border2);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text);position:relative;
}
.icon-btn-hdr svg{width:19px;height:19px;}
.icon-btn-hdr:active{background:var(--border2);}
.icon-btn-hdr.active{background:var(--coral);color:#fff;border-color:var(--coral);}
.notif-dot{position:absolute;top:4px;right:5px;width:13px;height:13px;border-radius:50%;background:#FF3B30;border:2px solid var(--bg);box-shadow:0 0 0 2px rgba(255,59,48,0.25);animation:notifPulse 1.6s ease infinite;}
.hdr-guru-row{display:flex;align-items:center;gap:7px;margin-top:9px;font-size:12px;color:var(--text2);font-weight:600;}
.hdr-avatar{width:24px;height:24px;border-radius:50%;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:12px;border:1px solid var(--border2);flex-shrink:0;}
.notif-panel{
  position:absolute;top:100%;right:16px;margin-top:8px;width:min(320px,calc(100% - 32px));
  background:var(--surface);border:1px solid var(--border);border-radius:16px;
  box-shadow:0 12px 32px rgba(43,33,64,0.14);overflow:hidden;z-index:95;
}
.notif-item{display:flex;align-items:center;gap:10px;padding:13px 15px;border-bottom:1px solid var(--border);cursor:pointer;}
.notif-item:last-child{border-bottom:none;}
.notif-item:active{background:var(--surface2);}
.notif-icon{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
.notif-text{flex:1;min-width:0;}
.notif-title{font-weight:700;font-size:13px;}
.notif-sub{font-size:11px;color:var(--text2);}
.notif-count{background:var(--coral);color:#fff;font-size:10.5px;font-weight:800;border-radius:100px;padding:2px 7px;flex-shrink:0;}
.notif-empty{padding:20px;text-align:center;color:var(--text2);font-size:12.5px;}

/* MAIN */
main{flex:1;padding:16px 16px 100px;position:relative;z-index:1;}
.screen{display:none;animation:fadein .25s ease;}
.screen.active{display:block;}
@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

/* CARD */
.card{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--r);
  padding:18px;margin-bottom:14px;box-shadow:0 3px 14px rgba(43,33,64,0.06);
}
.card-title{font-family:var(--display);font-weight:800;font-size:16.5px;margin-bottom:12px;display:flex;align-items:center;gap:8px;letter-spacing:-0.1px;}

/* BUTTONS */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:13px 20px;border-radius:var(--r-sm);font-weight:700;font-size:14.5px;
  letter-spacing:0.1px;transition:transform .15s ease, box-shadow .15s ease, filter .15s ease;
}
.btn:active{transform:scale(0.97);filter:brightness(0.97);}
.btn-primary{background:linear-gradient(135deg,var(--coral),var(--coral-dk));color:#fff;box-shadow:0 6px 16px rgba(var(--coral-rgb),0.38);}
.btn-mint{background:linear-gradient(135deg,var(--mint),#1f9c90);color:#fff;box-shadow:0 6px 16px rgba(41,182,168,0.35);}
.btn-outline{background:var(--surface2);color:var(--text);border:1.5px solid var(--border2);}
.btn-block{width:100%;}
.btn-sm{padding:8px 14px;font-size:12.5px;border-radius:10px;}
.btn:disabled{opacity:0.45;pointer-events:none;}

/* FORM */
.form-group{margin-bottom:14px;}
.form-label{font-size:12.5px;font-weight:700;color:var(--text2);margin-bottom:6px;display:block;}
.form-input,.form-select,.form-textarea{
  width:100%;padding:12px 14px;border-radius:var(--r-xs);border:1.5px solid var(--border2);
  background:var(--bg2);font-size:14.5px;color:var(--text);
}
.form-input:focus,.form-select:focus,.form-textarea:focus{outline:none;border-color:var(--coral);}

/* CHIP / BADGE */
.chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:100px;font-size:11.5px;font-weight:700;}
.chip-kelas{background:var(--surface2);color:var(--text);border:1px solid var(--border2);}
.chip-ok{background:var(--ok-bg);color:var(--mint);border:1px solid var(--ok-brd);}
.chip-warn{background:var(--warn-bg);color:#946200;border:1px solid var(--warn-brd);}
.chip-bad{background:var(--bad-bg);color:var(--red);border:1px solid var(--bad-brd);}

/* CUBBY (signature element) — represents each child's daily attendance
   like a kindergarten cubby: closed=belum datang, open=hadir */
.cubby-row{display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid var(--border);}
.cubby-row:last-child{border-bottom:none;}
.cubby{
  width:46px;height:46px;border-radius:12px;flex-shrink:0;position:relative;
  display:flex;align-items:center;justify-content:center;font-size:20px;
  background:var(--surface2);border:2px solid var(--border2);
}
.cubby.open{background:linear-gradient(160deg,var(--ok-bg),var(--surface));border-color:var(--mint);}
.cubby.done{background:linear-gradient(160deg,rgba(155,135,245,0.14),var(--surface));border-color:var(--purple);}
.cubby-door{position:absolute;inset:0;border-radius:10px;background:var(--surface2);border:1.5px solid var(--border2);transition:transform .3s ease;transform-origin:left center;}
.cubby.open .cubby-door,.cubby.done .cubby-door{transform:rotateY(-100deg);opacity:0;}
.cubby-info{flex:1;min-width:0;}
.cubby-name{font-weight:700;font-size:14.5px;}
.cubby-meta{font-size:11.5px;color:var(--text2);margin-top:2px;font-family:var(--mono);}
.cubby-action{flex-shrink:0;}
.emergency-toggle-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:var(--r-sm);background:var(--surface2);border:1.5px solid var(--border2);margin-bottom:14px;cursor:pointer;transition:background .15s,border-color .15s;}
.emergency-toggle-row.active{background:var(--bad-bg);border-color:var(--bad-brd);}
.emergency-toggle-text{flex:1;min-width:0;}
.emergency-toggle-title{font-weight:700;font-size:13px;}
.emergency-toggle-row.active .emergency-toggle-title{color:var(--red);}
.emergency-toggle-sub{font-size:11px;color:var(--text2);margin-top:2px;}
.switch{width:44px;height:26px;border-radius:100px;background:var(--border2);flex-shrink:0;position:relative;transition:background .2s;}
.switch.on{background:var(--red);}
.switch-knob{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.25);transition:transform .2s;}
.switch.on .switch-knob{transform:translateX(18px);}
.btn-locked{background:var(--surface2)!important;color:var(--muted)!important;box-shadow:none!important;cursor:not-allowed;}

/* SEARCH */
.search-box{position:relative;margin-bottom:14px;}
.search-box input{padding-left:38px;}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;opacity:0.5;}

/* STUDENT PICK LIST */
.pick-item{display:flex;align-items:center;gap:12px;padding:11px 10px;border-radius:var(--r-xs);cursor:pointer;transition:background .15s;}
.pick-item:active{background:var(--surface2);}
.pick-avatar{width:38px;height:38px;border-radius:50%;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;border:1px solid var(--border2);}
.pick-name{font-weight:700;font-size:14px;}
.pick-sub{font-size:11.5px;color:var(--text2);}

/* CHAT */
.chat-wrap{display:flex;flex-direction:column;height:calc(100dvh - 230px);min-height:340px;}
.chat-scroll{flex:1;overflow-y:auto;padding:6px 2px 12px;display:flex;flex-direction:column;gap:10px;}
.bubble{max-width:78%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.4;position:relative;}
.bubble-in{align-self:flex-start;background:var(--surface);border:1px solid var(--border);border-bottom-left-radius:5px;}
.bubble-out{align-self:flex-end;background:linear-gradient(135deg,var(--coral),var(--coral-dk));color:#fff;border-bottom-right-radius:5px;}
.bubble-admin{align-self:center;background:var(--surface2);border:1px dashed var(--border2);font-size:12.5px;color:var(--text2);text-align:center;max-width:90%;}
.bubble-sender{font-size:11px;font-weight:700;opacity:0.75;margin-bottom:3px;}
.bubble-time{font-size:10px;opacity:0.6;margin-top:4px;text-align:right;}
.bubble-actions{display:flex;gap:6px;justify-content:flex-end;margin-top:4px;}
.bubble-actions button{font-size:12px;opacity:0.75;padding:2px 5px;border-radius:6px;background:rgba(255,255,255,0.15);}
.bubble-in .bubble-actions button{background:var(--surface2);}
.bubble-actions button:active{opacity:1;}
.bubble img{max-width:100%;border-radius:10px;margin-top:6px;display:block;}
.chat-input-row{display:flex;gap:8px;align-items:center;padding-top:10px;border-top:1px solid var(--border);}
.chat-input-row input[type=text]{flex:1;border-radius:100px;padding:11px 16px;}
.icon-btn{width:42px;height:42px;border-radius:50%;background:var(--surface2);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1.5px solid var(--border2);}
.send-btn{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--coral),var(--coral-dk));color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(var(--coral-rgb),0.35);}

/* BOTTOM NAV */
.bottom-nav{
  position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:600px;
  background:rgba(255,249,242,0.95);backdrop-filter:blur(16px);border-top:1px solid var(--border);
  display:flex;justify-content:space-around;align-items:flex-end;padding:10px 4px calc(8px + env(safe-area-inset-bottom));z-index:90;
}
.nav-item{display:flex;flex-direction:column;align-items:center;gap:5px;flex:1;}
.nav-badge{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--navc);opacity:0.5;transition:opacity .15s ease,transform .15s ease;}
.nav-badge svg{width:17px;height:17px;fill:none;stroke:#fff;stroke-width:2.3;}
.nav-item span{font-size:10px;font-weight:700;color:var(--navc);opacity:0.7;}
.nav-item.active .nav-badge{opacity:1;transform:scale(1.06);}
.nav-item.active span{opacity:1;font-weight:800;}
.nav-item-center{margin-top:-30px;}
.nav-badge-center{width:56px;height:56px;border-radius:50%;background:var(--mint);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(29,158,117,0.4);border:3px solid var(--bg);transition:transform .15s ease;}
.nav-badge-center svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:2.3;}
.nav-item-center.active .nav-badge-center{transform:scale(1.05);}
.nav-badge,.nav-badge-center{position:relative;}
.nav-dot{position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:#FF3B30;border:2.5px solid var(--bg);box-shadow:0 0 0 2px rgba(255,59,48,0.3);animation:notifPulse 1.6s ease infinite;}
@keyframes notifPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.18);}}
.nav-item-center span{font-weight:800;color:#1F9C90;opacity:1;}

/* LOGIN SCREEN */
.login-wrap{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;position:relative;z-index:1;}
.login-logo{width:84px;height:84px;border-radius:26px;background:linear-gradient(135deg,var(--coral),var(--yellow));display:flex;align-items:center;justify-content:center;font-size:42px;box-shadow:0 10px 26px rgba(var(--coral-rgb),0.4);margin-bottom:18px;}
.login-title{font-family:var(--display);font-weight:800;font-size:26px;text-align:center;}
.login-sub{font-size:13.5px;color:var(--text2);text-align:center;margin-top:6px;margin-bottom:28px;}
.login-card{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:22px;box-shadow:0 8px 28px rgba(43,33,64,0.06);}
.pin-dots{display:flex;gap:12px;justify-content:center;margin:18px 0;}
.pin-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--border2);}
.pin-dot.filled{background:var(--coral);border-color:var(--coral);}
.pin-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.pin-key{padding:16px 0;border-radius:14px;background:var(--surface2);font-family:var(--display);font-weight:700;font-size:19px;text-align:center;}
.pin-key:active{background:var(--border2);}

/* EMPTY STATE */
.empty{text-align:center;padding:36px 16px;color:var(--text2);}
.empty-emoji{font-size:36px;margin-bottom:10px;}
.empty-title{font-weight:700;color:var(--text);margin-bottom:4px;}
.empty-desc{font-size:12.5px;}

/* TOAST */
.toast{position:fixed;bottom:96px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--text);color:#fff;padding:11px 20px;border-radius:100px;font-size:13px;font-weight:600;opacity:0;transition:all .3s ease;z-index:200;max-width:90%;text-align:center;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,0.2);}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

/* MISC */
.row{display:flex;gap:10px;}
.row > *{flex:1;}
.text-muted{color:var(--text2);font-size:12.5px;}
.mt8{margin-top:8px;}.mt12{margin-top:12px;}.mt16{margin-top:16px;}
.section-title{font-family:var(--display);font-weight:800;font-size:22px;margin-bottom:14px;letter-spacing:-0.3px;}
.tabs{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:14px;}
.chat-mode-toggle{display:flex;gap:8px;background:var(--surface2);border-radius:100px;padding:5px;margin-bottom:16px;}
.chat-mode-btn{flex:1;padding:10px 8px;border-radius:100px;font-weight:700;font-size:13px;color:var(--text2);text-align:center;position:relative;}
.chat-mode-btn.active{background:linear-gradient(135deg,var(--coral),var(--coral-dk));color:#fff;box-shadow:0 4px 12px rgba(var(--coral-rgb),0.35);}
.chat-mode-dot{position:absolute;top:2px;right:10px;width:11px;height:11px;border-radius:50%;background:#FF3B30;border:2px solid var(--surface2);box-shadow:0 0 0 2px rgba(255,59,48,0.3);animation:notifPulse 1.6s ease infinite;}
.tab-pill{padding:8px 15px;border-radius:100px;background:var(--surface2);font-size:12.5px;font-weight:700;color:var(--text2);white-space:nowrap;border:1.5px solid transparent;position:relative;}
.tab-dot{position:absolute;top:-3px;right:-3px;width:12px;height:12px;border-radius:50%;background:#FF3B30;border:2px solid var(--bg);box-shadow:0 0 0 2px rgba(255,59,48,0.3);animation:notifPulse 1.6s ease infinite;}
.tab-pill.active{background:var(--coral);color:#fff;}
.hdr-logo img,.login-logo img{width:100%;height:100%;object-fit:cover;border-radius:inherit;}
.watermark{text-align:center;font-size:10.5px;color:var(--muted);font-weight:600;padding:14px 0 4px;letter-spacing:0.2px;}
.logo-upload-box{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.logo-preview{width:60px;height:60px;border-radius:16px;background:var(--surface2);border:1.5px dashed var(--border2);display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden;flex-shrink:0;}
.logo-preview img{width:100%;height:100%;object-fit:cover;}
.nfc-icon{width:20px;height:20px;}
.stat-mini-row{display:flex;gap:10px;margin-bottom:14px;}
.stat-mini{flex:1;background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--sc);border-radius:var(--r-sm);padding:12px 6px;text-align:center;}
.stat-mini-val{font-family:var(--display);font-weight:800;font-size:22px;color:var(--sc);line-height:1;}
.stat-mini-label{font-size:10px;color:var(--text2);font-weight:700;margin-top:4px;}
.btn-link-subtle{font-size:11.5px;color:var(--muted);font-weight:600;text-decoration:underline;text-underline-offset:2px;}
.theme-swatch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.theme-swatch-item{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;}
.theme-swatch{width:100%;aspect-ratio:1;border-radius:14px;display:flex;align-items:center;justify-content:center;border:2.5px solid transparent;position:relative;}
.theme-swatch.selected{border-color:var(--text);}
.theme-swatch.selected::after{content:'✓';color:#fff;font-weight:900;font-size:18px;text-shadow:0 1px 3px rgba(0,0,0,0.3);}
.theme-swatch-label{font-size:10.5px;font-weight:700;color:var(--text2);text-align:center;}
.copy-token{font-family:var(--mono);font-weight:700;background:var(--bg2);border:1.5px dashed var(--border2);border-radius:10px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;}
.hist-row{display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid var(--border);}
.hist-row:last-child{border-bottom:none;}
.hist-date{width:48px;flex-shrink:0;text-align:center;}
.hist-date .d{font-family:var(--display);font-weight:800;font-size:18px;}
.hist-date .m{font-size:10px;color:var(--text2);font-weight:700;text-transform:uppercase;}
.hist-info{flex:1;min-width:0;font-size:12px;color:var(--text2);font-family:var(--mono);}
.bc-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:12px;box-shadow:0 2px 10px rgba(43,33,64,0.04);}
.bc-head{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
.bc-badge{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--orange),var(--yellow));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.bc-title{font-weight:800;font-size:15px;}
.bc-meta{font-size:11px;color:var(--text2);}
.bc-body{font-size:13.5px;line-height:1.5;color:var(--text);white-space:pre-wrap;}
.bc-body img{max-width:100%;border-radius:12px;margin-top:10px;display:block;}
#nfcScanBtn{position:relative;overflow:hidden;}
#nfcScanBtn:active .nfc-icon{animation:nfcPulse 1.4s ease infinite;}
@keyframes nfcPulse{0%{opacity:0.5;transform:scale(0.9);}50%{opacity:1;transform:scale(1.15);}100%{opacity:0.5;transform:scale(0.9);}}
</style>
</head>
<body>

<!-- ============ LOGIN ============ -->
<div id="loginScreen" class="login-wrap">
  <div class="login-logo" id="loginLogo">🧸</div>
  <div class="login-title" id="loginAppName">AbsensiTK</div>
  <div class="login-sub" id="loginAppSub">Presensi &amp; Komunikasi Sekolah TK</div>

  <div class="login-card" id="loginStep1">
    <div class="form-group hidden" id="connectPromptBox">
      <label class="form-label" id="connectPromptLabel">Belum konek Supabase? Buka Pengaturan dulu</label>
      <button class="btn btn-outline btn-block" onclick="showConnectSetup()">⚙️ Pengaturan Koneksi Database</button>
    </div>
    <div class="form-group">
      <label class="form-label">Pilih Nama Guru</label>
      <select class="form-select" id="loginGuruSelect"></select>
    </div>
    <button class="btn btn-primary btn-block" onclick="startPinEntry()">Lanjutkan →</button>
  </div>

  <div class="login-card hidden" id="loginStep2">
    <div style="text-align:center;font-weight:700;margin-bottom:4px;" id="loginGuruName"></div>
    <div class="text-muted" style="text-align:center;">Masukkan PIN 4 digit</div>
    <div class="pin-dots" id="pinDots">
      <div class="pin-dot"></div><div class="pin-dot"></div><div class="pin-dot"></div><div class="pin-dot"></div>
    </div>
    <div class="pin-pad" id="pinPad"></div>
    <button class="btn btn-outline btn-block mt16" onclick="cancelPinEntry()">← Kembali</button>
  </div>

  <div class="login-card hidden" id="connectSetup">
    <div class="card-title">⚙️ Koneksi Supabase</div>
    <div class="form-group">
      <label class="form-label">Project URL</label>
      <input type="text" class="form-input" id="setupUrl" placeholder="https://xxxx.supabase.co">
    </div>
    <div class="form-group">
      <label class="form-label">Anon Public Key</label>
      <input type="text" class="form-input" id="setupKey" placeholder="eyJhbGciOi...">
    </div>
    <button class="btn btn-primary btn-block" onclick="saveConnectSetup()">Simpan &amp; Sambungkan</button>
    <button class="btn btn-outline btn-block mt12" onclick="hideConnectSetup()">Batal</button>
    <p class="text-muted mt12" style="line-height:1.6;">Jalankan skema database (schema_absensitk.sql) di Supabase → SQL Editor sebelum menyambungkan. Tambahkan minimal satu baris di tabel <strong>guru</strong> agar bisa login.</p>
  </div>
  <div class="watermark">Developed by D.D Candra © 2026</div>
</div>

<!-- ============ APP ============ -->
<div id="app" class="hidden">
  <div class="hdr">
    <div class="hdr-top">
      <div class="hdr-brand">
        <div class="hdr-logo" id="hdrLogo">🧸</div>
        <div>
          <div class="hdr-title" id="hdrAppName">AbsensiTK</div>
          <div class="hdr-sub" id="hdrAppSub">Guru &amp; Admin</div>
        </div>
      </div>
      <div class="hdr-actions">
        <button class="icon-btn-hdr" id="bellBtn" onclick="toggleNotifPanel()" title="Notifikasi">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="notif-dot hidden" id="notifDot"></span>
        </button>
        <button class="icon-btn-hdr" data-screen="Setting" onclick="switchScreen('Setting')" title="Pengaturan">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
        </button>
        <button class="icon-btn-hdr" onclick="confirmLogout()" title="Keluar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
        </button>
      </div>
    </div>
    <div class="notif-panel hidden" id="notifPanel"></div>
  </div>

  <main>
    <!-- ===== PRESENSI ===== -->
    <div class="screen active" id="screenPresensi">
      <div class="section-title">Presensi Hari Ini 👋</div>
      <div id="presensiStatsRow"></div>
      <div class="tabs" id="presensiKelasTabs"></div>

      <button class="btn btn-primary btn-block" id="nfcScanBtn" onclick="scanNfcPresensi()" style="margin-bottom:14px;">
        <svg class="nfc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a7 7 0 0 1 0 7"/><path d="M9.5 5.5a11.5 11.5 0 0 1 0 13"/><path d="M13 3a15.5 15.5 0 0 1 0 18"/><circle cx="3" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>
        Tap Kartu NFC untuk Check-In / Out
      </button>
      <div class="text-muted" id="nfcStatus" style="text-align:center;margin:-8px 0 14px;"></div>

      <div class="emergency-toggle-row" id="emergencyToggleRow" onclick="toggleEmergencyMode()">
        <div class="emergency-toggle-text">
          <div class="emergency-toggle-title">🔒 Presensi Manual Terkunci</div>
          <div class="emergency-toggle-sub">Wajib pakai kartu NFC. Aktifkan Mode Darurat kalau kartu hilang.</div>
        </div>
        <div class="switch" id="emergencySwitch"><div class="switch-knob"></div></div>
      </div>

      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="form-input" id="presensiSearch" placeholder="atau cari nama siswa secara manual..." oninput="renderPresensiList()">
      </div>

      <div class="card" style="padding:8px 14px;">
        <div id="presensiList"></div>
      </div>
    </div>

    <!-- ===== SISWA ===== -->
    <div class="screen" id="screenSiswa">
      <div class="section-title">Data Siswa 🎒</div>
      <div class="card" style="padding:14px;margin-bottom:14px;">
        <div class="card-title" style="font-size:14px;margin-bottom:8px;">📋 Import Data Siswa (banyak sekaligus)</div>
        <div class="text-muted" style="margin-bottom:10px;">Download template, isi di Excel/Spreadsheet, lalu upload lagi ke sini.</div>
        <div class="row">
          <button class="btn btn-outline" onclick="downloadSiswaTemplate()">⬇️ Download Template</button>
          <label class="btn btn-primary" for="importSiswaInput" style="cursor:pointer;text-align:center;">⬆️ Upload Template</label>
        </div>
        <input type="file" id="importSiswaInput" accept=".csv" class="hidden" onchange="handleImportSiswa(event)">
        <div id="importSiswaStatus" class="text-muted" style="margin-top:8px;"></div>
      </div>
      <button class="btn btn-primary btn-block mt8" style="margin-bottom:14px;" onclick="openSiswaForm()">+ Tambah Siswa Baru</button>
      <div class="tabs" id="siswaKelasTabs"></div>
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="form-input" id="siswaSearch" placeholder="Cari nama siswa..." oninput="renderSiswaList()">
      </div>
      <div id="siswaList"></div>
    </div>

    <!-- ===== CHAT ===== -->
    <div class="screen" id="screenChat">
      <div class="section-title">Chat 💬</div>
      <div class="chat-mode-toggle">
        <button class="chat-mode-btn active" id="chatModeKelasBtn" onclick="switchChatMode('kelas')">👨‍👩‍👧 Wali Murid</button>
        <button class="chat-mode-btn" id="chatModeInternalBtn" onclick="switchChatMode('internal')">👥 Sesama Guru</button>
      </div>

      <div id="chatKelasWrap">
        <div class="tabs" id="chatKelasTabs"></div>
        <div class="card" style="padding:14px;">
          <div class="chat-wrap">
            <div class="chat-scroll" id="chatScroll"></div>
            <div class="chat-input-row">
              <label class="icon-btn" for="chatPhotoInput">📷</label>
              <input type="file" id="chatPhotoInput" accept="image/*" class="hidden" onchange="handleChatPhoto(event)">
              <input type="text" id="chatTextInput" placeholder="Tulis pesan..." onkeydown="if(event.key==='Enter')sendChatMessage()">
              <button class="send-btn" onclick="sendChatMessage()">➤</button>
            </div>
          </div>
        </div>
      </div>

      <div id="chatInternalWrap" class="hidden">
        <div class="text-muted" style="margin-bottom:12px;">Ruang obrolan bersama untuk semua guru &amp; kepala sekolah. Semua staf bisa melihat dan membalas pesan di sini.</div>
        <div class="card" style="padding:14px;">
          <div class="chat-wrap">
            <div class="chat-scroll" id="chatInternalScroll"></div>
            <div class="chat-input-row">
              <label class="icon-btn" for="chatInternalPhotoInput">📷</label>
              <input type="file" id="chatInternalPhotoInput" accept="image/*" class="hidden" onchange="handleInternalChatPhoto(event)">
              <input type="text" id="chatInternalTextInput" placeholder="Tulis pesan ke sesama staf..." onkeydown="if(event.key==='Enter')sendInternalChatMessage()">
              <button class="send-btn" onclick="sendInternalChatMessage()">➤</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== REKAP ===== -->
    <div class="screen" id="screenRekap">
      <div class="section-title">Rekap Kehadiran 📊</div>
      <div class="card">
        <div class="form-group"><label class="form-label">Bulan</label><input type="month" class="form-input" id="rekapBulan"></div>
        <div class="row">
          <div class="form-group"><label class="form-label">Kelas</label><select class="form-select" id="rekapKelas"><option value="all">Semua Kelas</option></select></div>
          <div class="form-group"><label class="form-label">Siswa</label><select class="form-select" id="rekapSiswa"><option value="all">Semua Siswa</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Status</label>
          <select class="form-select" id="rekapStatus">
            <option value="all">Semua Status</option>
            <option value="hadir">Hadir</option>
            <option value="terlambat">Terlambat</option>
            <option value="izin">Izin</option>
            <option value="sakit">Sakit</option>
            <option value="alpa">Alpa</option>
          </select>
        </div>
        <button class="btn btn-primary btn-block" onclick="loadRekap()">Tampilkan Rekap</button>
      </div>
      <div class="card hidden" id="rekapTerlambatCard">
        <div class="card-title">🔴 Sering Terlambat Bulan Ini</div>
        <div id="rekapTerlambatList"></div>
      </div>
      <div class="card" id="rekapResult"></div>
      <button class="btn btn-outline btn-block" onclick="exportRekapPDF()" style="margin-bottom:14px;">📄 Export PDF</button>
    </div>

    <!-- ===== BROADCAST ===== -->
    <div class="screen" id="screenBroadcast">
      <div class="section-title">Pengumuman Sekolah 📢</div>
      <div class="text-muted mt8" style="margin-bottom:14px;">Pesan satu arah dari sekolah ke SEMUA orang tua, di semua kelas. Berbeda dengan Chat (percakapan 2 arah per kelas).</div>
      <div class="card" id="broadcastComposer">
        <div class="card-title">✏️ Buat Pengumuman Baru</div>
        <div class="form-group"><label class="form-label">Judul</label><input type="text" class="form-input" id="bcJudul" placeholder="Contoh: Libur Hari Raya"></div>
        <div class="form-group"><label class="form-label">Isi Pengumuman</label><textarea class="form-textarea" id="bcIsi" rows="4" placeholder="Tulis isi pengumuman di sini..."></textarea></div>
        <div class="form-group">
          <label class="btn btn-outline btn-sm" for="bcFotoInput" style="cursor:pointer;">📷 Lampirkan Foto (opsional)</label>
          <input type="file" id="bcFotoInput" accept="image/*" class="hidden" onchange="handleBroadcastPhoto(event)">
          <div class="text-muted mt8" id="bcFotoStatus"></div>
        </div>
        <button class="btn btn-primary btn-block" onclick="sendBroadcast()">📢 Kirim ke Semua Orang Tua</button>
      </div>
      <div id="broadcastList"></div>
    </div>

    <!-- ===== PENGATURAN ===== -->
    <div class="screen" id="screenSetting">
      <div class="section-title">Pengaturan ⚙️</div>

      <div class="card" style="display:flex;align-items:center;gap:12px;">
        <label for="guruPhotoInput" style="cursor:pointer;position:relative;flex-shrink:0;">
          <div class="hdr-avatar" id="setGuruAvatar" style="width:52px;height:52px;font-size:22px;overflow:hidden;">👤</div>
          <div style="position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:var(--coral);display:flex;align-items:center;justify-content:center;border:2px solid var(--surface);font-size:10px;">📷</div>
        </label>
        <input type="file" id="guruPhotoInput" accept="image/*" class="hidden" onchange="handleGuruPhotoUpload(event)">
        <div style="flex:1;">
          <div style="font-weight:800;font-size:15px;" id="setGuruName">—</div>
          <div class="text-muted" id="setGuruRole">—</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">🔑 Ganti PIN Saya</div>
        <div class="form-group"><label class="form-label">PIN Lama</label><input type="text" maxlength="4" inputmode="numeric" class="form-input" id="oldPinInput" placeholder="••••"></div>
        <div class="form-group"><label class="form-label">PIN Baru (4 digit)</label><input type="text" maxlength="4" inputmode="numeric" class="form-input" id="newPinInput" placeholder="••••"></div>
        <div class="form-group"><label class="form-label">Konfirmasi PIN Baru</label><input type="text" maxlength="4" inputmode="numeric" class="form-input" id="confirmPinInput" placeholder="••••"></div>
        <button class="btn btn-primary btn-block" onclick="changeMyPin()">Simpan PIN Baru</button>
      </div>

      <div class="card">
        <div class="card-title">🔔 Notifikasi Push</div>
        <div class="text-muted" style="margin-bottom:12px;">Aktifkan supaya Anda tetap dapat notifikasi (bunyi + pop-up) untuk chat &amp; pengumuman baru, <strong>walau HP terkunci atau aplikasi tertutup</strong>.</div>
        <button class="btn btn-outline btn-block" id="pushEnableBtn" onclick="subscribeToPushGuru()">🔔 Aktifkan Notifikasi Push</button>
      </div>

      <div class="card" id="waliKelasNotice" style="display:none;">
        <div class="empty">
          <div class="empty-emoji">🔒</div>
          <div class="empty-title">Akses Terbatas</div>
          <div class="empty-desc">Pengaturan identitas sekolah, kelas, guru, dan koneksi database hanya bisa diubah oleh Admin. Hubungi admin sekolah Anda jika perlu perubahan.</div>
        </div>
      </div>

      <div id="adminOnlySettings">
        <div class="card">
          <div class="card-title">🏫 Identitas &amp; Logo Sekolah</div>
          <div class="logo-upload-box">
            <div class="logo-preview" id="logoPreview">🧸</div>
            <div style="flex:1;">
              <label class="btn btn-outline btn-sm" for="logoFileInput" style="cursor:pointer;">📷 Ganti Logo</label>
              <input type="file" id="logoFileInput" accept="image/*" class="hidden" onchange="handleLogoUpload(event)">
              <div class="text-muted mt8">Logo tampil di header &amp; halaman login semua guru</div>
            </div>
          </div>
          <div class="form-group"><label class="form-label">Nama Aplikasi</label><input type="text" class="form-input" id="setAppName" oninput="previewBranding()"></div>
          <div class="form-group"><label class="form-label">Sub-judul</label><input type="text" class="form-input" id="setAppSub" oninput="previewBranding()"></div>
          <div class="form-group"><label class="form-label">Alamat Sekolah (untuk kop laporan)</label><input type="text" class="form-input" id="setKopAlamat" placeholder="Jl. Contoh No. 1, Kota"></div>
          <div class="form-group"><label class="form-label">No. Telp Sekolah (untuk kop laporan)</label><input type="text" class="form-input" id="setKopTelp" placeholder="0812-xxxx-xxxx"></div>
          <button class="btn btn-primary btn-block" onclick="saveBranding()">Simpan Identitas &amp; Kop</button>
        </div>

        <div class="card">
          <div class="card-title">🎨 Tema Warna</div>
          <div class="text-muted" style="margin-bottom:12px;">Pilih warna utama aplikasi. Tersinkron ke semua guru &amp; orang tua.</div>
          <div class="theme-swatch-grid" id="themeSwatchGrid"></div>
        </div>

        <div class="card">
          <div class="card-title">🐣 Kelola Kelas</div>
          <div id="kelasManageList"></div>
          <div class="row mt12">
            <input type="text" class="form-input" id="newKelasNama" placeholder="Nama kelas baru, mis: Kelas A - Kancil">
          </div>
          <button class="btn btn-outline btn-block mt8" onclick="addKelas()">+ Tambah Kelas</button>
        </div>

        <div class="card">
          <div class="card-title">👩‍🏫 Kelola Guru</div>
          <div id="guruManageList"></div>
          <div class="form-group mt12"><label class="form-label">Nama Guru</label><input type="text" class="form-input" id="newGuruNama"></div>
          <div class="form-group"><label class="form-label">Peran</label>
            <select class="form-select" id="newGuruPeran"><option value="wali_kelas">Wali Kelas</option><option value="admin">Admin (akses semua kelas)</option></select>
          </div>
          <div class="form-group" id="newGuruKelasWrap"><label class="form-label">Kelas Ampu</label><select class="form-select" id="newGuruKelas"></select></div>
          <div class="form-group"><label class="form-label">PIN 4 digit</label><input type="text" maxlength="4" class="form-input" id="newGuruPin" placeholder="1234"></div>
          <button class="btn btn-outline btn-block" onclick="addGuru()">+ Tambah Guru</button>
        </div>

        <div class="card" id="koneksiDbCard">
          <div class="card-title">🔌 Koneksi Database</div>
          <div class="form-group"><label class="form-label">Project URL</label><input type="text" class="form-input" id="cfgUrl"></div>
          <div class="form-group"><label class="form-label">Anon Key</label><input type="text" class="form-input" id="cfgKey"></div>
          <button class="btn btn-outline btn-block" onclick="saveCfgFromSettings()">Simpan Koneksi</button>
        </div>
        <div class="watermark">Developed by D.D Candra © 2026</div>
      </div>
    </div>
  </main>

  <div class="bottom-nav">
    <div class="nav-item" data-screen="Siswa" style="--navc:var(--sky);" onclick="switchScreen('Siswa')">
      <div class="nav-badge"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></div>
      <span>Siswa</span>
    </div>
    <div class="nav-item" data-screen="Chat" style="--navc:var(--coral);" onclick="switchScreen('Chat')">
      <div class="nav-badge"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5A8.5 8.5 0 1 1 21 11.5z"/></svg></div>
      <span>Chat</span>
    </div>
    <div class="nav-item nav-item-center active" data-screen="Presensi" onclick="switchScreen('Presensi')">
      <div class="nav-badge-center"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg></div>
      <span>Presensi</span>
    </div>
    <div class="nav-item" data-screen="Rekap" style="--navc:var(--purple);" onclick="switchScreen('Rekap')">
      <div class="nav-badge"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg></div>
      <span>Rekap</span>
    </div>
    <div class="nav-item" data-screen="Broadcast" style="--navc:var(--orange);" onclick="switchScreen('Broadcast')">
      <div class="nav-badge"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 8a4 4 0 0 1 0 8"/><path d="M18 5a8 8 0 0 1 0 14"/></svg></div>
      <span>Info</span>
    </div>
  </div>
</div>

<!-- ===== MODAL: FORM SISWA ===== -->
<div id="siswaModal" class="hidden" style="position:fixed;inset:0;z-index:300;background:rgba(43,33,64,0.45);display:flex;align-items:flex-end;">
  <div style="background:var(--bg);width:100%;max-width:600px;margin:0 auto;border-radius:24px 24px 0 0;padding:22px;max-height:88dvh;overflow-y:auto;">
    <div class="card-title" id="siswaModalTitle">Tambah Siswa</div>
    <input type="hidden" id="siswaEditId">
    <div class="form-group"><label class="form-label">Nama Lengkap</label><input type="text" class="form-input" id="fNama"></div>
    <div class="form-group"><label class="form-label">Kelas</label><select class="form-select" id="fKelas"></select></div>
    <div class="form-group"><label class="form-label">NISN (opsional)</label><input type="text" class="form-input" id="fNisn"></div>
    <div class="form-group">
      <label class="form-label">Kartu NFC</label>
      <div class="copy-token"><span id="fNfcVal">Belum ada kartu</span><button class="btn-sm btn-outline btn" type="button" onclick="tapToRegisterNfc()">📶 Tap Kartu</button></div>
      <input type="hidden" id="fNfcUid">
      <p class="text-muted mt8">Dekatkan kartu/gelang NFC anak ke belakang HP untuk mendaftarkan. Hanya didukung Chrome di Android.</p>
    </div>
    <div class="form-group"><label class="form-label">Nama Orang Tua</label><input type="text" class="form-input" id="fOrtu"></div>
    <div class="form-group"><label class="form-label">No. HP Orang Tua</label><input type="text" class="form-input" id="fHpOrtu"></div>
    <div class="form-group hidden" id="fTokenWrap">
      <label class="form-label">Kode Akses Orang Tua</label>
      <div class="copy-token"><span id="fTokenVal">—</span><button class="btn-sm btn-outline btn" onclick="copyToken()">Salin</button></div>
      <p class="text-muted mt8">Berikan kode ini ke orang tua untuk login di App Ortu.</p>
    </div>
    <div class="row mt16">
      <button class="btn btn-outline btn-block" onclick="closeSiswaForm()">Batal</button>
      <button class="btn btn-primary btn-block" onclick="saveSiswa()">Simpan</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* ============================================================
   STATE & KONEKSI
============================================================ */
// Koneksi default ke project Supabase "NFC Presensi". Bisa diganti
// kapan saja lewat halaman ⚙️ Pengaturan Koneksi (akan menimpa default ini).
const DEFAULT_CFG = {
  url: 'https://syncsygrcolsqygvewcu.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bmNzeWdyY29sc3F5Z3Zld2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NTc0OTcsImV4cCI6MjEwMDIzMzQ5N30.2mnAgOnNOYLvr-nwgHdQbTnRN_t9MEN-PtuM1kfBysc'
};
let savedCfg = JSON.parse(localStorage.getItem('tkCfg') || 'null');
let cfg = (savedCfg && savedCfg.url && savedCfg.key) ? savedCfg : DEFAULT_CFG;
let branding = JSON.parse(localStorage.getItem('tkBranding') || '{}');
let sbClient = null;
let currentGuru = JSON.parse(sessionStorage.getItem('tkGuruSession') || 'null');
let pinBuffer = '';
let pendingGuru = null;

let kelasAll = [], siswaAll = [], guruAll = [];
let activePresensiKelas = 'all';
let activeSiswaKelas = 'all';
let activeChatKelasId = null;
let chatChannel = null;

// ===== Notifikasi =====
let notifChatChannel = null, notifBroadcastChannel = null, notifPresensiChannel = null, siswaSyncChannel = null;
let notifCounts = { chat:0, broadcast:0, presensi:0, internal:0 };

/* ============================================================
   WEB PUSH NOTIFICATION — notifikasi walau HP terkunci / app tertutup
============================================================ */
const VAPID_PUBLIC_KEY = 'BLHOs0GshgcvvEtfv7SO8zJP9J1bKI1GffiZq6vhiESdqzDhhkvxJqAXtxdsTxWsW_ayQxtfbIkTEAAXkcc-unU';
function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g,'+').replace(/_/g,'/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
}
async function pushSupported(){
  return 'serviceWorker' in navigator && 'PushManager' in window;
}
async function saveGuruPushSubscription(sub){
  const j = sub.toJSON();
  await sb('push_subscriptions', {method:'POST', headers:{'Prefer':'resolution=merge-duplicates,return=minimal'}, body:JSON.stringify({
    owner_type:'guru', owner_id: currentGuru.id, kelas_id: currentGuru.kelas_id||null, peran: currentGuru.peran,
    endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth
  })});
}
async function subscribeToPushGuru(){
  if(!(await pushSupported())){ toast('Browser ini tidak mendukung notifikasi push'); return; }
  try{
    const perm = await Notification.requestPermission();
    if(perm!=='granted'){ toast('Izin notifikasi ditolak'); return; }
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if(!sub){
      sub = await reg.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) });
    }
    await saveGuruPushSubscription(sub);
    toast('Notifikasi push diaktifkan ✅');
    updatePushButtonState(true);
  }catch(e){ toast('Gagal aktifkan push: '+e.message); }
}
async function checkPushSubscribed(){
  if(!(await pushSupported())) return false;
  try{
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if(!sub) return false;
    // Self-healing: pastikan langganan ini BENAR-BENAR masih ada di database.
    // Kalau baris-nya sempat terhapus (mis. karena dianggap kadaluarsa), simpan ulang otomatis.
    try{
      const j = sub.toJSON();
      const rows = await sb('push_subscriptions?endpoint=eq.'+encodeURIComponent(j.endpoint)+'&select=id');
      if(!rows.length) await saveGuruPushSubscription(sub);
    }catch(e){ /* offline / gagal cek, coba lagi nanti */ }
    return true;
  }catch(e){ return false; }
}
function updatePushButtonState(active){
  const btn = document.getElementById('pushEnableBtn');
  if(!btn) return;
  btn.textContent = active ? '✅ Notifikasi Push Aktif' : '🔔 Aktifkan Notifikasi Push';
  btn.classList.toggle('btn-outline', !active);
  btn.classList.toggle('btn-primary', active);
}
async function triggerPush(payload){
  try{
    if(!cfg.url || !cfg.key) return;
    await fetch(cfg.url.replace(/\/$/,'')+'/functions/v1/send-push', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+cfg.key,'apikey':cfg.key},
      body: JSON.stringify(payload)
    });
  }catch(e){ /* push gagal terkirim, jangan ganggu alur utama kirim pesan */ }
}

let notifLastRead = {};
let notifChatUnread = {}; // { kelas_id: jumlah_belum_dibaca }

function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

function initSupabase(){
  if(!cfg.url || !cfg.key) return false;
  if(sbClient && sbClient._cfgKey === cfg.url+cfg.key) return true;
  sbClient = supabase.createClient(cfg.url, cfg.key, { auth: { persistSession: false } });
  sbClient._cfgKey = cfg.url+cfg.key;
  return true;
}

async function sb(path, opts={}){
  if (!cfg.url || !cfg.key) throw new Error('Supabase belum dikonfigurasi.');
  const url = cfg.url.replace(/\/$/,'') + '/rest/v1/' + path;
  const isPatch = opts.method === 'PATCH';
  const res = await fetch(url, {
    ...opts,
    headers:{
      'apikey': cfg.key, 'Authorization': 'Bearer ' + cfg.key,
      'Content-Type': 'application/json',
      'Prefer': isPatch ? 'return=minimal' : 'return=representation',
      ...(opts.headers||{})
    }
  });
  if(!res.ok){ const t = await res.text(); throw new Error('DB error: '+t); }
  const text = await res.text();
  if(!text) return [];
  try{ return JSON.parse(text); }catch(e){ return []; }
}

function todayKey(){ return new Date().toISOString().slice(0,10); }
function nowTime(){ return new Date().toTimeString().slice(0,5); }
function fmtTime(t){ return t ? t.slice(0,5) : '—'; }
function genToken(){
  const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s='TK-'; for(let i=0;i<6;i++) s+=c[Math.floor(Math.random()*c.length)];
  return s;
}

/* ============================================================
   AVATAR — inisial berwarna (dipakai kalau belum ada foto)
============================================================ */
const AVATAR_COLORS = ['#FF7B54','#29B6A8','#5B9BD5','#9B87F5','#EF9F27','#F0699A','#3F7FB8','#1F9C90'];
function avatarColor(name){
  let hash = 0;
  for(let i=0;i<(name||'?').length;i++) hash = (name.charCodeAt(i) + ((hash<<5)-hash)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
function avatarInitials(name){
  const parts = (name||'?').trim().split(/\s+/);
  if(parts.length===1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0]+parts[1][0]).toUpperCase();
}
function avatarHtml(name, photoUrl, fontSize){
  fontSize = fontSize || 15;
  if(photoUrl) return `<img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
  return `<div style="width:100%;height:100%;border-radius:inherit;background:${avatarColor(name)};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:${fontSize}px;letter-spacing:0.3px;">${avatarInitials(name)}</div>`;
}

/* ============================================================
   KONEKSI SETUP (dari login screen)
============================================================ */
function showConnectSetup(){
  document.getElementById('loginStep1').classList.add('hidden');
  document.getElementById('connectSetup').classList.remove('hidden');
  document.getElementById('setupUrl').value = cfg.url || '';
  document.getElementById('setupKey').value = cfg.key || '';
}
function hideConnectSetup(){
  document.getElementById('connectSetup').classList.add('hidden');
  document.getElementById('loginStep1').classList.remove('hidden');
}
async function saveConnectSetup(){
  cfg.url = document.getElementById('setupUrl').value.trim();
  cfg.key = document.getElementById('setupKey').value.trim();
  localStorage.setItem('tkCfg', JSON.stringify(cfg));
  if(!initSupabase()){ toast('URL/Key belum lengkap'); return; }
  toast('Tersambung! Memuat data guru...');
  hideConnectSetup();
  await loadGuruForLogin();
}
async function saveCfgFromSettings(){
  cfg.url = document.getElementById('cfgUrl').value.trim();
  cfg.key = document.getElementById('cfgKey').value.trim();
  localStorage.setItem('tkCfg', JSON.stringify(cfg));
  initSupabase();
  toast('Koneksi disimpan');
}

/* ============================================================
   LOGIN FLOW (pilih guru + PIN)
============================================================ */
async function loadGuruForLogin(){
  try{
    guruAll = await sb('guru?select=*,kelas(id,nama,ikon,warna)&aktif=eq.true&order=nama');
    const sel = document.getElementById('loginGuruSelect');
    sel.innerHTML = guruAll.map(g=>`<option value="${g.id}">${g.nama} ${g.peran==='admin'?'(Admin)':'— '+(g.kelas?.nama||'')}</option>`).join('');
    if(!guruAll.length){
      document.getElementById('connectPromptLabel').textContent = 'Belum ada guru terdaftar. Tambahkan lewat SQL Editor atau cek koneksi.';
      document.getElementById('connectPromptBox').classList.remove('hidden');
    } else {
      document.getElementById('connectPromptBox').classList.add('hidden');
    }
    return true;
  }catch(e){
    toast('Gagal memuat guru. Cek koneksi & skema DB.');
    document.getElementById('connectPromptLabel').textContent = 'Gagal tersambung ke database. Cek koneksi Supabase.';
    document.getElementById('connectPromptBox').classList.remove('hidden');
    return false;
  }
}
function startPinEntry(){
  const id = document.getElementById('loginGuruSelect').value;
  pendingGuru = guruAll.find(g=>String(g.id)===String(id));
  if(!pendingGuru){ toast('Pilih guru dahulu'); return; }
  document.getElementById('loginGuruName').textContent = pendingGuru.nama;
  document.getElementById('loginStep1').classList.add('hidden');
  document.getElementById('loginStep2').classList.remove('hidden');
  pinBuffer=''; renderPinDots(); renderPinPad();
}
function cancelPinEntry(){
  document.getElementById('loginStep2').classList.add('hidden');
  document.getElementById('loginStep1').classList.remove('hidden');
}
function renderPinPad(){
  const keys=['1','2','3','4','5','6','7','8','9','⌫','0','OK'];
  document.getElementById('pinPad').innerHTML = keys.map(k=>`<div class="pin-key" onclick="pinKey('${k}')">${k}</div>`).join('');
}
function renderPinDots(){
  document.querySelectorAll('.pin-dot').forEach((d,i)=> d.classList.toggle('filled', i<pinBuffer.length));
}
function pinKey(k){
  if(k==='⌫'){ pinBuffer = pinBuffer.slice(0,-1); renderPinDots(); return; }
  if(k==='OK'){ submitPin(); return; }
  if(pinBuffer.length<4){ pinBuffer+=k; renderPinDots(); }
  if(pinBuffer.length===4) setTimeout(submitPin, 150);
}
function submitPin(){
  if(pinBuffer !== pendingGuru.pin){ toast('PIN salah'); pinBuffer=''; renderPinDots(); return; }
  currentGuru = pendingGuru;
  sessionStorage.setItem('tkGuruSession', JSON.stringify(currentGuru));
  enterApp();
}
function confirmLogout(){
  if(confirm('Yakin ingin keluar?')) logout();
}
function logout(){
  sessionStorage.removeItem('tkGuruSession');
  currentGuru = null;
  if(chatChannel) sbClient.removeChannel(chatChannel);
  if(notifChatChannel) sbClient.removeChannel(notifChatChannel);
  if(notifBroadcastChannel) sbClient.removeChannel(notifBroadcastChannel);
  if(notifPresensiChannel) sbClient.removeChannel(notifPresensiChannel);
  if(siswaSyncChannel) sbClient.removeChannel(siswaSyncChannel);
  if(notifInternalChannel) sbClient.removeChannel(notifInternalChannel);
  if(internalChatChannel) sbClient.removeChannel(internalChatChannel);
  document.getElementById('app').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginStep2').classList.add('hidden');
  document.getElementById('loginStep1').classList.remove('hidden');
  document.getElementById('notifPanel').classList.add('hidden');
}

/* ============================================================
   ENTER APP
============================================================ */
async function enterApp(){
  emergencyMode = false;
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('setGuruName').textContent = currentGuru.nama;
  document.getElementById('setGuruRole').textContent = currentGuru.peran==='admin' ? 'Admin' : ('Wali Kelas' + (currentGuru.kelas?.nama ? ' · '+currentGuru.kelas.nama : ''));
  document.getElementById('setGuruAvatar').innerHTML = avatarHtml(currentGuru.nama, currentGuru.foto_url, 19);
  applyBranding();
  await loadKelas();
  await loadSiswa();
  renderKelasTabs();
  renderPresensiList();
  renderSiswaList();
  setupChatForCurrentGuru();
  populateRekapFilters();
  setupBroadcastVisibility();
  loadBroadcasts();
  setupNotifications();
  renderSettingLists();
  const isAdmin = currentGuru.peran==='admin';
  document.getElementById('adminOnlySettings').style.display = isAdmin ? '' : 'none';
  document.getElementById('waliKelasNotice').style.display = isAdmin ? 'none' : '';
  const isSuperAdmin = !!currentGuru.super_admin_pin;
  document.getElementById('koneksiDbCard').style.display = isSuperAdmin ? '' : 'none';
  checkPushSubscribed().then(updatePushButtonState);
}

function applyBranding(){
  const name = branding.app_name || 'AbsensiTK';
  const sub = branding.app_sub || 'Presensi & Komunikasi Sekolah TK';
  document.getElementById('hdrAppName').textContent = name;
  document.getElementById('hdrAppSub').textContent = sub;
  document.getElementById('loginAppName').textContent = name;
  document.getElementById('loginAppSub').textContent = sub;
  document.title = name + ' — Guru & Admin';
  document.getElementById('setAppName').value = name;
  document.getElementById('setAppSub').value = sub;
  document.getElementById('setKopAlamat').value = branding.kop_alamat || '';
  document.getElementById('setKopTelp').value = branding.kop_telp || '';
  document.getElementById('cfgUrl').value = cfg.url||'';
  document.getElementById('cfgKey').value = cfg.key||'';
  renderLogoEverywhere();
  applyThemeColor();
  renderThemeSwatches();
}
function renderLogoEverywhere(){
  const logoHtml = branding.logo_base64 ? `<img src="${branding.logo_base64}">` : '🧸';
  document.getElementById('hdrLogo').innerHTML = logoHtml;
  document.getElementById('loginLogo').innerHTML = logoHtml;
  document.getElementById('logoPreview').innerHTML = logoHtml;
}
function previewBranding(){
  document.getElementById('hdrAppName').textContent = document.getElementById('setAppName').value || 'AbsensiTK';
}
async function loadBrandingFromDb(){
  try{
    const rows = await sb('pengaturan?select=*');
    const map = {}; rows.forEach(r=> map[r.key]=r.value);
    branding = {
      app_name: map.app_name || '',
      app_sub: map.app_sub || '',
      logo_base64: map.logo_base64 || '',
      kop_alamat: map.kop_alamat || '',
      kop_telp: map.kop_telp || '',
      theme_primary: map.theme_primary || '',
      theme_primary_dk: map.theme_primary_dk || '',
      theme_yellow: map.theme_yellow || ''
    };
    localStorage.setItem('tkBranding', JSON.stringify(branding));
  }catch(e){ /* pengaturan table belum ada / offline: pakai cache lokal */ }
}
async function saveBranding(){
  branding.app_name = document.getElementById('setAppName').value.trim() || 'AbsensiTK';
  branding.app_sub = document.getElementById('setAppSub').value.trim() || 'Presensi & Komunikasi Sekolah TK';
  branding.kop_alamat = document.getElementById('setKopAlamat').value.trim();
  branding.kop_telp = document.getElementById('setKopTelp').value.trim();
  localStorage.setItem('tkBranding', JSON.stringify(branding));
  try{
    await upsertPengaturan('app_name', branding.app_name);
    await upsertPengaturan('app_sub', branding.app_sub);
    await upsertPengaturan('kop_alamat', branding.kop_alamat);
    await upsertPengaturan('kop_telp', branding.kop_telp);
    toast('Identitas & kop disimpan, tersinkron ke semua guru');
  }catch(e){ toast('Tersimpan lokal, tapi gagal sinkron: '+e.message); }
  applyBranding();
}
async function upsertPengaturan(key, value){
  await sb('pengaturan', {method:'POST', headers:{'Prefer':'resolution=merge-duplicates,return=minimal'}, body:JSON.stringify({key, value})});
}

/* ============================================================
   TEMA WARNA
============================================================ */
const THEME_PRESETS = [
  { id:'peach',    label:'Peach',    main:'#FF7B54', dk:'#E8623C', yellow:'#FFC857' },
  { id:'mint',     label:'Mint',     main:'#29B6A8', dk:'#1F9C90', yellow:'#7FE3C6' },
  { id:'sky',      label:'Sky',      main:'#5B9BD5', dk:'#3F7FB8', yellow:'#8FD3F4' },
  { id:'lavender', label:'Lavender', main:'#9B87F5', dk:'#7A63E0', yellow:'#C9BFF7' },
  { id:'sunny',    label:'Sunny',    main:'#FFB648', dk:'#E89A2C', yellow:'#FFE29A' },
  { id:'rose',     label:'Rose',     main:'#F0699A', dk:'#D94A80', yellow:'#F7B6CE' },
];
function hexToRgbString(hex){
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
  return r+','+g+','+b;
}
function applyThemeColor(){
  const main = branding.theme_primary || '#FF7B54';
  const dk = branding.theme_primary_dk || '#E8623C';
  const yellow = branding.theme_yellow || '#FFC857';
  document.documentElement.style.setProperty('--coral', main);
  document.documentElement.style.setProperty('--coral-dk', dk);
  document.documentElement.style.setProperty('--yellow', yellow);
  document.documentElement.style.setProperty('--coral-rgb', hexToRgbString(main));
}
function renderThemeSwatches(){
  const grid = document.getElementById('themeSwatchGrid');
  if(!grid) return;
  const current = branding.theme_primary || '#FF7B54';
  grid.innerHTML = THEME_PRESETS.map(p=>`
    <div class="theme-swatch-item" onclick="selectTheme('${p.id}')">
      <div class="theme-swatch ${p.main.toLowerCase()===current.toLowerCase()?'selected':''}" style="background:linear-gradient(135deg,${p.main},${p.yellow});"></div>
      <div class="theme-swatch-label">${p.label}</div>
    </div>`).join('');
}
async function selectTheme(id){
  const p = THEME_PRESETS.find(x=>x.id===id); if(!p) return;
  branding.theme_primary = p.main; branding.theme_primary_dk = p.dk; branding.theme_yellow = p.yellow;
  applyThemeColor();
  renderThemeSwatches();
  renderLogoEverywhere();
  localStorage.setItem('tkBranding', JSON.stringify(branding));
  try{
    await upsertPengaturan('theme_primary', p.main);
    await upsertPengaturan('theme_primary_dk', p.dk);
    await upsertPengaturan('theme_yellow', p.yellow);
    toast('Tema warna diubah menjadi '+p.label);
  }catch(e){ toast('Tersimpan lokal, gagal sinkron: '+e.message); }
}

function handleLogoUpload(ev){
  const file = ev.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const img = new Image();
    img.onload = async ()=>{
      const canvas = document.createElement('canvas');
      const maxW = 300; const scale = Math.min(1, maxW/img.width);
      canvas.width = img.width*scale; canvas.height = img.height*scale;
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      branding.logo_base64 = canvas.toDataURL('image/png', 0.85);
      renderLogoEverywhere();
      try{ await upsertPengaturan('logo_base64', branding.logo_base64); toast('Logo diperbarui'); }
      catch(e){ toast('Logo tersimpan lokal, gagal sinkron: '+e.message); }
      localStorage.setItem('tkBranding', JSON.stringify(branding));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ============================================================
   NAV
============================================================ */
function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.screen===name));
  document.querySelectorAll('.icon-btn-hdr[data-screen]').forEach(b=>b.classList.toggle('active', b.dataset.screen===name));
  if(name==='Chat'){ scrollChatBottom(); if(activeChatKelasId) clearChatUnread(activeChatKelasId); }
  if(name==='Broadcast') setNavDot('Broadcast', false);
  const notifMap = { Broadcast:'broadcast', Presensi:'presensi' };
  if(notifMap[name] && notifCounts[notifMap[name]]>0){
    notifCounts[notifMap[name]] = 0;
    notifLastRead[notifMap[name]] = new Date().toISOString();
    saveNotifLastRead();
    renderNotifDot();
  }
}

/* ============================================================
   KELAS
============================================================ */
async function loadKelas(){
  kelasAll = await sb('kelas?select=*&order=nama');
}
function renderKelasTabs(){
  const isAdmin = currentGuru.peran==='admin';
  const myKelas = isAdmin ? kelasAll : kelasAll.filter(k=>k.id===currentGuru.kelas_id);
  const dot = '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--coral);margin-right:5px;vertical-align:middle;"></span>';

  const presTabs = ['<div class="tab-pill active" data-v="all" onclick="setPresensiTab(this,\'all\')">Semua</div>']
    .concat(myKelas.map(k=>`<div class="tab-pill" data-v="${k.id}" onclick="setPresensiTab(this,'${k.id}')">${dot}${k.nama}</div>`));
  document.getElementById('presensiKelasTabs').innerHTML = isAdmin ? presTabs.join('') : myKelas.map((k,i)=>`<div class="tab-pill${i===0?' active':''}" data-v="${k.id}" onclick="setPresensiTab(this,'${k.id}')">${dot}${k.nama}</div>`).join('');
  if(!isAdmin && myKelas[0]) activePresensiKelas = String(myKelas[0].id);

  document.getElementById('siswaKelasTabs').innerHTML = presTabs.join('').replace(/setPresensiTab/g,'setSiswaTab');

  const chatTabs = myKelas.map((k,i)=>`<div class="tab-pill${i===0?' active':''}" data-v="${k.id}" onclick="setChatTab(this,'${k.id}')">${dot}${k.nama}</div>`);
  document.getElementById('chatKelasTabs').innerHTML = chatTabs.join('');
  if(myKelas[0]) activeChatKelasId = myKelas[0].id;

  const kelasOpts = kelasAll.map(k=>`<option value="${k.id}">${k.nama}</option>`).join('');
  document.getElementById('fKelas').innerHTML = kelasOpts;
  document.getElementById('newGuruKelas').innerHTML = kelasOpts;
  renderChatTabDots();
}
function setPresensiTab(el,v){ document.querySelectorAll('#presensiKelasTabs .tab-pill').forEach(t=>t.classList.remove('active')); el.classList.add('active'); activePresensiKelas=v; renderPresensiList(); }
function setSiswaTab(el,v){ document.querySelectorAll('#siswaKelasTabs .tab-pill').forEach(t=>t.classList.remove('active')); el.classList.add('active'); activeSiswaKelas=v; renderSiswaList(); }
function setChatTab(el,v){ document.querySelectorAll('#chatKelasTabs .tab-pill').forEach(t=>t.classList.remove('active')); el.classList.add('active'); activeChatKelasId = v; loadChatMessages(); subscribeChat(); clearChatUnread(v); }

/* ============================================================
   SISWA
============================================================ */
async function loadSiswa(){
  siswaAll = await sb('siswa?select=*,kelas(id,nama,ikon)&order=nama');
}
function renderSiswaList(){
  const q = (document.getElementById('siswaSearch').value||'').toLowerCase();
  let list = siswaAll;
  if(currentGuru.peran!=='admin') list = list.filter(s=>s.kelas_id===currentGuru.kelas_id);
  if(activeSiswaKelas!=='all') list = list.filter(s=>String(s.kelas_id)===String(activeSiswaKelas));
  if(q) list = list.filter(s=>s.nama.toLowerCase().includes(q));
  const box = document.getElementById('siswaList');
  if(!list.length){ box.innerHTML = emptyState('🎒','Belum ada siswa','Tambahkan siswa baru di sini'); return; }
  box.innerHTML = list.map(s=>`
    <div class="card" style="padding:12px 14px;display:flex;align-items:center;gap:12px;">
      <div class="pick-avatar" style="overflow:hidden;">${avatarHtml(s.nama, s.foto_url, 14)}</div>
      <div style="flex:1;min-width:0;">
        <div class="pick-name">${s.nama}</div>
        <div class="pick-sub">${s.kelas?.nama||'Belum ada kelas'} ${s.nisn?'· NISN '+s.nisn:''}</div>
        <div class="copy-token mt8"><span>${s.parent_token||'—'}</span><button class="btn-sm btn-outline btn" onclick="copyText('${s.parent_token||''}')">Salin</button></div>
      </div>
      <button class="btn-sm btn-outline btn" onclick="openSiswaForm('${s.id}')">Edit</button>
    </div>`).join('');
}
function emptyState(emoji,title,desc){
  return `<div class="empty"><div class="empty-emoji">${emoji}</div><div class="empty-title">${title}</div><div class="empty-desc">${desc}</div></div>`;
}
function openSiswaForm(id){
  document.getElementById('siswaModal').classList.remove('hidden');
  document.getElementById('fTokenWrap').classList.toggle('hidden', !id);
  if(id){
    const s = siswaAll.find(x=>String(x.id)===String(id));
    document.getElementById('siswaModalTitle').textContent='Edit Siswa';
    document.getElementById('siswaEditId').value = s.id;
    document.getElementById('fNama').value = s.nama;
    document.getElementById('fKelas').value = s.kelas_id||'';
    document.getElementById('fNisn').value = s.nisn||'';
    document.getElementById('fOrtu').value = s.nama_ortu||'';
    document.getElementById('fHpOrtu').value = s.hp_ortu||'';
    document.getElementById('fTokenVal').textContent = s.parent_token||'—';
    document.getElementById('fNfcUid').value = s.nfc_uid||'';
    document.getElementById('fNfcVal').textContent = s.nfc_uid ? 'Terdaftar: '+s.nfc_uid : 'Belum ada kartu';
  }else{
    document.getElementById('siswaModalTitle').textContent='Tambah Siswa';
    document.getElementById('siswaEditId').value='';
    ['fNama','fNisn','fOrtu','fHpOrtu','fNfcUid'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('fNfcVal').textContent = 'Belum ada kartu';
  }
}
function closeSiswaForm(){ document.getElementById('siswaModal').classList.add('hidden'); }
function copyToken(){ copyText(document.getElementById('fTokenVal').textContent); }
function copyText(t){ navigator.clipboard?.writeText(t); toast('Tersalin: '+t); }

async function saveSiswa(){
  const id = document.getElementById('siswaEditId').value;
  const payload = {
    nama: document.getElementById('fNama').value.trim(),
    kelas_id: document.getElementById('fKelas').value || null,
    nisn: document.getElementById('fNisn').value.trim() || null,
    nama_ortu: document.getElementById('fOrtu').value.trim() || null,
    hp_ortu: document.getElementById('fHpOrtu').value.trim() || null,
    nfc_uid: document.getElementById('fNfcUid').value.trim() || null,
  };
  if(!payload.nama){ toast('Nama wajib diisi'); return; }
  try{
    if(id){
      await sb('siswa?id=eq.'+id, {method:'PATCH', body:JSON.stringify(payload)});
      toast('Data siswa diperbarui');
    }else{
      payload.parent_token = genToken();
      const res = await sb('siswa', {method:'POST', body:JSON.stringify(payload)});
      toast('Siswa ditambahkan. Kode ortu: '+payload.parent_token);
    }
    closeSiswaForm();
    await loadSiswa(); renderSiswaList(); renderPresensiList();
  }catch(e){ toast('Gagal menyimpan: '+e.message); }
}

/* ============================================================
   IMPORT SISWA DARI TEMPLATE CSV
============================================================ */
function downloadSiswaTemplate(){
  const rows = [
    ['No','Nama Siswa','Kelas','Wali Kelas'],
    ['1','Contoh: Ayu Rima', kelasAll[0]?.nama || 'Kelas A - Kancil', guruAll.find(g=>String(g.kelas_id)===String(kelasAll[0]?.id))?.nama || 'Nama Wali Kelas'],
    ['2','Contoh: Safa Marwah', kelasAll[0]?.nama || 'Kelas A - Kancil', guruAll.find(g=>String(g.kelas_id)===String(kelasAll[0]?.id))?.nama || 'Nama Wali Kelas'],
  ];
  const csv = rows.map(r=> r.map(v=> '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'template-data-siswa.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Template terdownload. Kolom "Wali Kelas" hanya untuk referensi Anda, kelas ditentukan dari kolom "Kelas".');
}
function handleImportSiswa(ev){
  const file = ev.target.files[0]; if(!file) return;
  const statusBox = document.getElementById('importSiswaStatus');
  statusBox.textContent = 'Membaca file...';
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async (results)=>{
      const rows = results.data;
      if(!rows.length){ statusBox.textContent = 'File kosong atau format tidak sesuai template.'; return; }
      let sukses = 0, gagalKelas = [], gagalNama = 0;
      for(const row of rows){
        const nama = (row['Nama Siswa']||'').trim();
        const kelasText = (row['Kelas']||'').trim();
        if(!nama){ gagalNama++; continue; }
        const kelasMatch = kelasAll.find(k=> k.nama.toLowerCase().trim() === kelasText.toLowerCase());
        if(kelasText && !kelasMatch){ gagalKelas.push(nama+' (kelas "'+kelasText+'" tidak ditemukan)'); continue; }
        try{
          await sb('siswa', {method:'POST', body:JSON.stringify({
            nama, kelas_id: kelasMatch ? kelasMatch.id : null, parent_token: genToken()
          })});
          sukses++;
        }catch(e){ gagalKelas.push(nama+' (gagal simpan: '+e.message+')'); }
      }
      let msg = `✅ ${sukses} siswa berhasil ditambahkan.`;
      if(gagalNama) msg += ` ${gagalNama} baris dilewati (nama kosong).`;
      if(gagalKelas.length) msg += ` Gagal: ${gagalKelas.join('; ')}`;
      statusBox.textContent = msg;
      toast(sukses+' siswa berhasil diimport');
      ev.target.value = '';
      await loadSiswa(); renderSiswaList(); renderPresensiList();
    },
    error: (err)=>{ statusBox.textContent = 'Gagal membaca file: '+err.message; }
  });
}

/* ============================================================
   PRESENSI (cek-in / cek-out) — cubby UI
============================================================ */
let presensiHariIni = {}; // siswa_id -> row
let emergencyMode = false;

function toggleEmergencyMode(){
  if(!emergencyMode){
    const ok = confirm('Aktifkan Mode Darurat?\n\nGunakan HANYA jika kartu NFC siswa hilang/rusak. Presensi manual akan tercatat sebagai "Mode Darurat" untuk keperluan audit.\n\nLanjutkan?');
    if(!ok) return;
    emergencyMode = true;
    toast('⚠️ Mode Darurat aktif — presensi manual diizinkan sementara');
  } else {
    emergencyMode = false;
    toast('🔒 Presensi manual dikunci kembali');
  }
  document.getElementById('emergencyToggleRow').classList.toggle('active', emergencyMode);
  document.getElementById('emergencySwitch').classList.toggle('on', emergencyMode);
  document.querySelector('#emergencyToggleRow .emergency-toggle-title').textContent = emergencyMode ? '⚠️ Mode Darurat Aktif' : '🔒 Presensi Manual Terkunci';
  document.querySelector('#emergencyToggleRow .emergency-toggle-sub').textContent = emergencyMode ? 'Presensi manual diizinkan sementara. Matikan setelah selesai.' : 'Wajib pakai kartu NFC. Aktifkan Mode Darurat kalau kartu hilang.';
  renderPresensiList();
}

async function loadPresensiHariIni(){
  const rows = await sb('absensi_tk?tanggal=eq.'+todayKey()+'&select=*');
  presensiHariIni = {};
  rows.forEach(r=> presensiHariIni[r.siswa_id] = r);
}
async function renderPresensiList(){
  await loadPresensiHariIni();
  const q = (document.getElementById('presensiSearch').value||'').toLowerCase();
  let list = siswaAll;
  if(currentGuru.peran!=='admin') list = list.filter(s=>s.kelas_id===currentGuru.kelas_id);
  if(activePresensiKelas!=='all') list = list.filter(s=>String(s.kelas_id)===String(activePresensiKelas));
  if(q) list = list.filter(s=>s.nama.toLowerCase().includes(q));
  renderPresensiStatsRow(list);
  const box = document.getElementById('presensiList');
  if(!list.length){ box.innerHTML = emptyState('🐣','Belum ada siswa di kelas ini',''); return; }
  box.innerHTML = list.map(s=>{
    const r = presensiHariIni[s.id];
    const state = !r || (!r.jam_masuk) ? 'closed' : (r.jam_masuk && !r.jam_pulang) ? 'open' : 'done';
    const cubbyClass = state==='open' ? 'open' : state==='done' ? 'done' : '';
    const meta = state==='closed' ? 'Belum datang' : state==='open' ? 'Masuk '+fmtTime(r.jam_masuk) : `Masuk ${fmtTime(r.jam_masuk)} · Pulang ${fmtTime(r.jam_pulang)}`;
    let actionBtn = '';
    if(state==='closed'){
      actionBtn = emergencyMode
        ? `<button class="btn btn-sm btn-primary" onclick="checkIn('${s.id}', true)">Check-In</button>`
        : `<button class="btn btn-sm btn-locked" disabled title="Wajib pakai kartu NFC">🔒 Check-In</button>`;
    } else if(state==='open'){
      actionBtn = emergencyMode
        ? `<button class="btn btn-sm btn-primary" onclick="checkOut('${s.id}', true)">Check-Out</button>`
        : `<button class="btn btn-sm btn-locked" disabled title="Wajib pakai kartu NFC">🔒 Check-Out</button>`;
    } else actionBtn = `<span class="chip chip-ok">Selesai ✓</span>`;
    return `<div class="cubby-row">
      <div class="cubby ${cubbyClass}"><div class="cubby-door"></div><div style="width:34px;height:34px;border-radius:50%;overflow:hidden;">${avatarHtml(s.nama, s.foto_url, 13)}</div></div>
      <div class="cubby-info"><div class="cubby-name">${s.nama}</div><div class="cubby-meta">${meta}</div></div>
      <div class="cubby-action">${actionBtn}</div>
    </div>`;
  }).join('');
}
function renderPresensiStatsRow(list){
  let hadir=0, diSekolah=0, pulang=0;
  list.forEach(s=>{
    const r = presensiHariIni[s.id];
    if(r && r.jam_masuk){
      hadir++;
      if(r.jam_pulang) pulang++; else diSekolah++;
    }
  });
  document.getElementById('presensiStatsRow').innerHTML = `
    <div class="stat-mini-row">
      <div class="stat-mini" style="--sc:var(--coral);"><div class="stat-mini-val">${hadir}</div><div class="stat-mini-label">HADIR</div></div>
      <div class="stat-mini" style="--sc:var(--coral);"><div class="stat-mini-val">${diSekolah}</div><div class="stat-mini-label">DI SEKOLAH</div></div>
      <div class="stat-mini" style="--sc:var(--coral);"><div class="stat-mini-val">${pulang}</div><div class="stat-mini-label">SUDAH PULANG</div></div>
    </div>`;
}
async function checkIn(siswaId, isManual){
  const s = siswaAll.find(x=>String(x.id)===String(siswaId));
  const lateCut = '08:00';
  const status = nowTime() > lateCut ? 'terlambat' : 'hadir';
  const payload = { siswa_id: s.id, kelas_id: s.kelas_id, tanggal: todayKey(), jam_masuk: nowTime(), status };
  if(isManual) payload.catatan = 'Presensi manual (Mode Darurat — kartu hilang/rusak) oleh '+currentGuru.nama;
  try{
    await sb('absensi_tk', {method:'POST', headers:{'Prefer':'resolution=merge-duplicates,return=minimal'}, body:JSON.stringify(payload)});
    toast(s.nama+' berhasil Check-In'); renderPresensiList();
  }catch(e){ toast('Gagal: '+e.message); }
}
async function checkOut(siswaId, isManual){
  const s = siswaAll.find(x=>String(x.id)===String(siswaId));
  const payload = { jam_pulang: nowTime() };
  if(isManual) payload.catatan = 'Presensi manual (Mode Darurat — kartu hilang/rusak) oleh '+currentGuru.nama;
  try{
    await sb('absensi_tk?siswa_id=eq.'+siswaId+'&tanggal=eq.'+todayKey(), {method:'PATCH', body:JSON.stringify(payload)});
    toast(s.nama+' berhasil Check-Out'); renderPresensiList();
  }catch(e){ toast('Gagal: '+e.message); }
}

/* ============================================================
   NFC (Web NFC API — didukung Chrome di Android). Di iOS/desktop
   otomatis fallback ke pencarian & tombol manual.
============================================================ */
function nfcSupported(){ return 'NDEFReader' in window; }

async function tapToRegisterNfc(){
  if(!nfcSupported()){ toast('NFC tidak didukung di browser ini. Gunakan Chrome di Android.'); return; }
  try{
    const reader = new NDEFReader();
    await reader.scan();
    toast('Dekatkan kartu NFC sekarang...');
    reader.onreading = (event)=>{
      const uid = event.serialNumber || Date.now().toString(16);
      document.getElementById('fNfcUid').value = uid;
      document.getElementById('fNfcVal').textContent = 'Terdaftar: '+uid;
      toast('Kartu terbaca: '+uid);
    };
  }catch(e){ toast('Gagal membaca NFC: '+e.message); }
}

async function scanNfcPresensi(){
  if(!nfcSupported()){
    document.getElementById('nfcStatus').textContent = 'NFC tidak didukung di browser ini — gunakan pencarian manual di bawah.';
    toast('NFC hanya didukung Chrome di Android');
    return;
  }
  try{
    const reader = new NDEFReader();
    await reader.scan();
    document.getElementById('nfcStatus').textContent = '📶 Menunggu kartu... dekatkan ke belakang HP';
    reader.onreading = async (event)=>{
      const uid = event.serialNumber;
      const s = siswaAll.find(x=>x.nfc_uid === uid);
      if(!s){ document.getElementById('nfcStatus').textContent = 'Kartu tidak dikenali. Daftarkan dulu lewat menu Siswa.'; return; }
      await loadPresensiHariIni();
      const r = presensiHariIni[s.id];
      if(!r || !r.jam_masuk){ await checkIn(s.id); }
      else if(!r.jam_pulang){ await checkOut(s.id); }
      else { toast(s.nama+' sudah selesai presensi hari ini'); }
      document.getElementById('nfcStatus').textContent = 'Kartu terakhir: '+s.nama;
    };
  }catch(e){ toast('Gagal mengaktifkan NFC: '+e.message); }
}

/* ============================================================
   CHAT (per kelas, realtime via Supabase Realtime)
============================================================ */
function setupChatForCurrentGuru(){
  const isAdmin = currentGuru.peran==='admin';
  const myKelas = isAdmin ? kelasAll : kelasAll.filter(k=>k.id===currentGuru.kelas_id);
  activeChatKelasId = myKelas[0] ? myKelas[0].id : null;
  if(activeChatKelasId){ loadChatMessages(); subscribeChat(); }
}
async function loadChatMessages(){
  if(!activeChatKelasId){ document.getElementById('chatScroll').innerHTML = emptyState('💬','Belum ada kelas','Tambahkan kelas dulu di menu Pengaturan'); return; }
  const rows = await sb('pesan?kelas_id=eq.'+activeChatKelasId+'&select=*&order=created_at.asc&limit=200');
  renderChat(rows);
}
function renderChat(rows){
  const box = document.getElementById('chatScroll');
  if(!rows.length){ box.innerHTML = emptyState('💬','Belum ada pesan','Mulai percakapan dengan orang tua di kelas ini'); return; }
  box.innerHTML = rows.map(m=>{
    const mine = m.pengirim_tipe==='guru' || m.pengirim_tipe==='admin';
    const cls = mine ? 'bubble-out' : 'bubble-in';
    const img = m.foto_url ? `<img src="${m.foto_url}">` : '';
    const time = new Date(m.created_at).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
    const editedTag = m.edited_at ? ' <span style="opacity:0.7;font-style:italic;">(diedit)</span>' : '';
    const isOwn = mine && String(m.pengirim_id)===String(currentGuru.id);
    const canDelete = isOwn || currentGuru.peran==='admin';
    let actions = '';
    if(isOwn || canDelete){
      actions = `<div class="bubble-actions">${isOwn?`<button onclick="editChatMessage('${m.id}')">✏️</button>`:''}${canDelete?`<button onclick="deleteChatMessage('${m.id}')">🗑️</button>`:''}</div>`;
    }
    return `<div class="bubble ${cls}">
      <div class="bubble-sender">${m.pengirim_nama}${m.pengirim_tipe==='admin'?' · Admin':''}</div>
      ${m.isi_teks?`<div>${escapeHtml(m.isi_teks)}${editedTag}</div>`:''}${img}
      <div class="bubble-time">${time}</div>
      ${actions}
    </div>`;
  }).join('');
  scrollChatBottom();
}
async function editChatMessage(id){
  const box = document.getElementById('chatScroll');
  const current = prompt('Ubah pesan:');
  if(current===null) return;
  const trimmed = current.trim();
  if(!trimmed){ toast('Pesan tidak boleh kosong'); return; }
  try{
    await sb('pesan?id=eq.'+id, {method:'PATCH', body:JSON.stringify({isi_teks:trimmed, edited_at:new Date().toISOString()})});
    loadChatMessages();
  }catch(e){ toast('Gagal edit: '+e.message); }
}
async function deleteChatMessage(id){
  if(!confirm('Hapus pesan ini?')) return;
  try{
    await sb('pesan?id=eq.'+id, {method:'DELETE'});
    loadChatMessages();
  }catch(e){ toast('Gagal hapus: '+e.message); }
}
function scrollChatBottom(){ const b=document.getElementById('chatScroll'); if(b) b.scrollTop = b.scrollHeight; }
function escapeHtml(s){ return s.replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function subscribeChat(){
  if(!sbClient || !activeChatKelasId) return;
  if(chatChannel) sbClient.removeChannel(chatChannel);
  chatChannel = sbClient.channel('pesan-'+activeChatKelasId)
    .on('postgres_changes', {event:'*', schema:'public', table:'pesan'}, payload=>{
      const row = payload.new || payload.old;
      if(String(row.kelas_id)===String(activeChatKelasId)) loadChatMessages();
    }).subscribe();
}
let pendingPhoto = null;
function handleChatPhoto(ev){
  const file = ev.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const img = new Image();
    img.onload = ()=>{
      const canvas = document.createElement('canvas');
      const maxW = 640; const scale = Math.min(1, maxW/img.width);
      canvas.width = img.width*scale; canvas.height = img.height*scale;
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      pendingPhoto = canvas.toDataURL('image/jpeg', 0.7);
      sendChatMessage();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
async function sendChatMessage(){
  const text = document.getElementById('chatTextInput').value.trim();
  if(!text && !pendingPhoto) return;
  if(!activeChatKelasId){ toast('Pilih kelas dahulu'); return; }
  try{
    await sb('pesan', {method:'POST', body:JSON.stringify({
      kelas_id: activeChatKelasId,
      pengirim_tipe: currentGuru.peran==='admin' ? 'admin' : 'guru',
      pengirim_nama: currentGuru.nama,
      pengirim_id: currentGuru.id,
      isi_teks: text || null,
      foto_url: pendingPhoto || null
    })});
    document.getElementById('chatTextInput').value=''; pendingPhoto=null;
    loadChatMessages();
    triggerPush({ type:'chat_to_ortu', kelas_id: activeChatKelasId, title:'Pesan dari '+currentGuru.nama, body: text || '📷 Foto' });
  }catch(e){ toast('Gagal kirim: '+e.message); }
}

/* ============================================================
   CHAT INTERNAL — ruang obrolan bersama semua guru & kepala sekolah
============================================================ */
let internalChatChannel = null;
function switchChatMode(mode){
  document.getElementById('chatModeKelasBtn').classList.toggle('active', mode==='kelas');
  document.getElementById('chatModeInternalBtn').classList.toggle('active', mode==='internal');
  document.getElementById('chatKelasWrap').classList.toggle('hidden', mode!=='kelas');
  document.getElementById('chatInternalWrap').classList.toggle('hidden', mode!=='internal');
  if(mode==='internal'){
    loadInternalChatMessages();
    subscribeInternalChat();
    clearInternalChatUnread();
  }
}
async function loadInternalChatMessages(){
  const rows = await sb('pesan_internal?select=*&order=created_at.asc&limit=200');
  renderInternalChat(rows);
}
function renderInternalChat(rows){
  const box = document.getElementById('chatInternalScroll');
  if(!rows.length){ box.innerHTML = emptyState('👥','Belum ada obrolan','Mulai sapa sesama guru'); return; }
  box.innerHTML = rows.map(m=>{
    const isMe = String(m.pengirim_id)===String(currentGuru.id);
    const cls = isMe?'bubble-out':'bubble-in';
    const img = m.foto_url ? `<img src="${m.foto_url}">` : '';
    const time = new Date(m.created_at).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
    const editedTag = m.edited_at ? ' <span style="opacity:0.7;font-style:italic;">(diedit)</span>' : '';
    const canDelete = isMe || currentGuru.peran==='admin';
    let actions = '';
    if(isMe || canDelete){
      actions = `<div class="bubble-actions">${isMe?`<button onclick="editInternalChatMessage('${m.id}')">✏️</button>`:''}${canDelete?`<button onclick="deleteInternalChatMessage('${m.id}')">🗑️</button>`:''}</div>`;
    }
    return `<div class="bubble ${cls}">
      <div class="bubble-sender">${m.pengirim_nama}</div>
      ${m.isi_teks?`<div>${escapeHtml(m.isi_teks)}${editedTag}</div>`:''}${img}
      <div class="bubble-time">${time}</div>
      ${actions}
    </div>`;
  }).join('');
  const b = document.getElementById('chatInternalScroll'); if(b) b.scrollTop = b.scrollHeight;
}
async function editInternalChatMessage(id){
  const current = prompt('Ubah pesan:');
  if(current===null) return;
  const trimmed = current.trim();
  if(!trimmed){ toast('Pesan tidak boleh kosong'); return; }
  try{
    await sb('pesan_internal?id=eq.'+id, {method:'PATCH', body:JSON.stringify({isi_teks:trimmed, edited_at:new Date().toISOString()})});
    loadInternalChatMessages();
  }catch(e){ toast('Gagal edit: '+e.message); }
}
async function deleteInternalChatMessage(id){
  if(!confirm('Hapus pesan ini?')) return;
  try{
    await sb('pesan_internal?id=eq.'+id, {method:'DELETE'});
    loadInternalChatMessages();
  }catch(e){ toast('Gagal hapus: '+e.message); }
}
function subscribeInternalChat(){
  if(!sbClient) return;
  if(internalChatChannel) sbClient.removeChannel(internalChatChannel);
  internalChatChannel = sbClient.channel('pesan-internal-view')
    .on('postgres_changes', {event:'*', schema:'public', table:'pesan_internal'}, ()=>{
      if(document.getElementById('chatInternalWrap') && !document.getElementById('chatInternalWrap').classList.contains('hidden')) loadInternalChatMessages();
    }).subscribe();
}
let pendingInternalPhoto = null;
function handleInternalChatPhoto(ev){
  const file = ev.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const img = new Image();
    img.onload = ()=>{
      const canvas = document.createElement('canvas');
      const maxW = 640; const scale = Math.min(1, maxW/img.width);
      canvas.width = img.width*scale; canvas.height = img.height*scale;
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      pendingInternalPhoto = canvas.toDataURL('image/jpeg', 0.7);
      sendInternalChatMessage();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
async function sendInternalChatMessage(){
  const text = document.getElementById('chatInternalTextInput').value.trim();
  if(!text && !pendingInternalPhoto) return;
  try{
    await sb('pesan_internal', {method:'POST', body:JSON.stringify({
      pengirim_id: currentGuru.id,
      pengirim_nama: currentGuru.nama,
      pengirim_peran: currentGuru.peran,
      isi_teks: text || null,
      foto_url: pendingInternalPhoto || null
    })});
    document.getElementById('chatInternalTextInput').value=''; pendingInternalPhoto=null;
    loadInternalChatMessages();
    triggerPush({ type:'internal', exclude_owner_id: currentGuru.id, title:'Chat Internal: '+currentGuru.nama, body: text || '📷 Foto' });
  }catch(e){ toast('Gagal kirim: '+e.message); }
}
function clearInternalChatUnread(){
  if(notifCounts.internal>0){
    notifCounts.internal = 0;
    renderNotifDot();
  }
  document.getElementById('chatModeInternalBtn')?.querySelector('.chat-mode-dot')?.remove();
  setNavDot('Chat', Object.values(notifChatUnread).some(v=>v>0));
}

/* ============================================================
   REKAP
============================================================ */
function populateRekapFilters(){
  const isAdmin = currentGuru.peran==='admin';
  const myKelas = isAdmin ? kelasAll : kelasAll.filter(k=>k.id===currentGuru.kelas_id);
  const kelasSel = document.getElementById('rekapKelas');
  kelasSel.innerHTML = '<option value="all">Semua Kelas</option>' + myKelas.map(k=>`<option value="${k.id}">${k.nama}</option>`).join('');
  if(!isAdmin && myKelas[0]) kelasSel.value = String(myKelas[0].id);
  kelasSel.onchange = populateRekapSiswaOptions;
  populateRekapSiswaOptions();
  if(!document.getElementById('rekapBulan').value) document.getElementById('rekapBulan').value = todayKey().slice(0,7);
}
function populateRekapSiswaOptions(){
  const kelasVal = document.getElementById('rekapKelas').value;
  let list = siswaAll;
  if(currentGuru.peran!=='admin') list = list.filter(s=>s.kelas_id===currentGuru.kelas_id);
  if(kelasVal!=='all') list = list.filter(s=>String(s.kelas_id)===String(kelasVal));
  document.getElementById('rekapSiswa').innerHTML = '<option value="all">Semua Siswa</option>' + list.map(s=>`<option value="${s.id}">${s.nama}</option>`).join('');
}
// ===== Rekap PDF export state =====
let lastRekapData = null;

async function loadRekap(){
  const bulan = document.getElementById('rekapBulan').value || todayKey().slice(0,7);
  const from = bulan+'-01';
  const toD = new Date(bulan+'-01'); toD.setMonth(toD.getMonth()+1); toD.setDate(0);
  const to = toD.toISOString().slice(0,10);
  const kelasVal = document.getElementById('rekapKelas').value;
  const siswaVal = document.getElementById('rekapSiswa').value;
  const statusVal = document.getElementById('rekapStatus').value;

  const rows = await sb('absensi_tk?tanggal=gte.'+from+'&tanggal=lte.'+to+'&select=*&order=tanggal.asc');

  let list = siswaAll;
  if(currentGuru.peran!=='admin') list = list.filter(s=>s.kelas_id===currentGuru.kelas_id);
  if(kelasVal!=='all') list = list.filter(s=>String(s.kelas_id)===String(kelasVal));

  const box = document.getElementById('rekapResult');
  const terlambatCard = document.getElementById('rekapTerlambatCard');
  const terlambatList = document.getElementById('rekapTerlambatList');

  if(siswaVal!=='all'){
    // ===== Detail per siswa (drill-down harian) =====
    terlambatCard.classList.add('hidden');
    const s = siswaAll.find(x=>String(x.id)===String(siswaVal));
    let dRows = rows.filter(r=>String(r.siswa_id)===String(siswaVal));
    if(statusVal!=='all') dRows = dRows.filter(r=>r.status===statusVal);
    const bulanNama=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const sum = {hadir:0,terlambat:0,izin:0,sakit:0,alpa:0};
    rows.filter(r=>String(r.siswa_id)===String(siswaVal)).forEach(r=>{
      if(r.status==='hadir'){ sum.hadir++; }
      else if(r.status==='terlambat'){ sum.hadir++; sum.terlambat++; }
      else if(sum[r.status]!==undefined){ sum[r.status]++; }
    });
    lastRekapData = { mode:'detail', bulan, siswaNama: s?.nama||'', kelasNama: s?.kelas?.nama || (kelasAll.find(k=>String(k.id)===String(kelasVal))?.nama) || 'Semua Kelas', statusVal, sum, rows: dRows };
    if(!dRows.length){
      box.innerHTML = `<div style="font-weight:800;font-family:var(--display);margin-bottom:10px;">${s?.nama||''}</div>` + emptyState('📭','Tidak ada data presensi','Sesuai filter bulan/status yang dipilih');
      return;
    }
    box.innerHTML = `
      <div style="font-weight:800;font-family:var(--display);margin-bottom:10px;">${s?.nama||''}</div>
      <div class="row mt8" style="margin-bottom:6px;flex-wrap:wrap;gap:8px;">
        <span class="chip chip-ok">Hadir ${sum.hadir}</span>
        <span class="chip chip-warn">Telat ${sum.terlambat}</span>
        <span class="chip chip-muted">Izin ${sum.izin}</span>
        <span class="chip chip-muted">Sakit ${sum.sakit}</span>
        <span class="chip chip-bad">Alpa ${sum.alpa}</span>
      </div>
      <div class="text-muted" style="margin-bottom:14px;font-size:11px;">*Hadir sudah termasuk yang datang terlambat</div>` +
      dRows.map(r=>{
        const d = new Date(r.tanggal+'T00:00:00');
        const chip = r.status==='hadir'?'chip-ok':r.status==='terlambat'?'chip-warn':r.status==='alpa'?'chip-bad':'chip-muted';
        const label = {hadir:'Hadir',terlambat:'Terlambat',izin:'Izin',sakit:'Sakit',alpa:'Alpa'}[r.status]||r.status;
        return `<div class="hist-row">
          <div class="hist-date"><div class="d">${d.getDate()}</div><div class="m">${bulanNama[d.getMonth()]}</div></div>
          <div class="hist-info">Masuk ${fmtTime(r.jam_masuk)} · Pulang ${fmtTime(r.jam_pulang)}</div>
          <span class="chip ${chip}">${label}</span>
        </div>`;
      }).join('');
    return;
  }

  // ===== Rekap ringkasan semua siswa (sesuai filter kelas) =====
  const perSiswa = {};
  rows.forEach(r=>{
    perSiswa[r.siswa_id] = perSiswa[r.siswa_id]||{hadir:0,terlambat:0,izin:0,sakit:0,alpa:0};
    if(r.status==='hadir'){ perSiswa[r.siswa_id].hadir++; }
    else if(r.status==='terlambat'){ perSiswa[r.siswa_id].hadir++; perSiswa[r.siswa_id].terlambat++; }
    else if(perSiswa[r.siswa_id][r.status]!==undefined){ perSiswa[r.siswa_id][r.status]++; }
  });

  // Kartu "Sering Terlambat"
  const lateSorted = list.map(s=>({s, telat:(perSiswa[s.id]?.terlambat)||0})).filter(x=>x.telat>0).sort((a,b)=>b.telat-a.telat).slice(0,5);
  if(lateSorted.length){
    terlambatCard.classList.remove('hidden');
    terlambatList.innerHTML = lateSorted.map(x=>`<div class="row" style="align-items:center;margin-bottom:8px;">
      <span style="flex:1;font-weight:700;font-size:13.5px;">${x.s.nama}</span>
      <span class="chip chip-warn">${x.telat}x terlambat</span>
    </div>`).join('');
  } else { terlambatCard.classList.add('hidden'); }

  let filteredList = list;
  if(statusVal!=='all') filteredList = list.filter(s=> ((perSiswa[s.id]||{})[statusVal]||0) > 0 );

  const kelasNamaForPdf = kelasVal!=='all' ? (kelasAll.find(k=>String(k.id)===String(kelasVal))?.nama||'') : 'Semua Kelas';
  lastRekapData = { mode:'summary', bulan, kelasNama: kelasNamaForPdf, statusVal, list: filteredList.map(s=>({ nama:s.nama, ...( perSiswa[s.id] || {hadir:0,terlambat:0,izin:0,sakit:0,alpa:0} ) })) };

  if(!filteredList.length){ box.innerHTML = emptyState('📊','Tidak ada data sesuai filter',''); return; }
  box.innerHTML = '<div class="text-muted" style="margin-bottom:10px;font-size:11px;">*Hadir sudah termasuk yang datang terlambat</div>' + filteredList.map(s=>{
    const d = perSiswa[s.id] || {hadir:0,terlambat:0,izin:0,sakit:0,alpa:0};
    return `<div style="padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick="jumpToSiswaRekap('${s.id}')">
      <div style="font-weight:700;">${s.nama}</div>
      <div class="row mt8" style="flex-wrap:wrap;gap:6px;">
        <span class="chip chip-ok">Hadir ${d.hadir}</span>
        <span class="chip chip-warn">Telat ${d.terlambat}</span>
        <span class="chip chip-muted">Izin ${d.izin}</span>
        <span class="chip chip-muted">Sakit ${d.sakit}</span>
        <span class="chip chip-bad">Alpa ${d.alpa}</span>
      </div>
    </div>`;
  }).join('');
}
function jumpToSiswaRekap(siswaId){
  document.getElementById('rekapSiswa').value = siswaId;
  loadRekap();
}

/* ============================================================
   EXPORT PDF REKAP
============================================================ */
function bulanIndonesia(bulanStr){
  const nama=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const [y,m] = bulanStr.split('-');
  return nama[parseInt(m,10)-1] + ' ' + y;
}
function statusLabelPdf(v){
  return {all:'Semua Status',hadir:'Hadir',terlambat:'Terlambat',izin:'Izin',sakit:'Sakit',alpa:'Alpa'}[v] || v;
}
function drawPdfHeader(doc, title, subtitleLines){
  const pageW = doc.internal.pageSize.getWidth();
  let y = 15;
  let textX = 15;
  if(branding.logo_base64){
    try{ doc.addImage(branding.logo_base64, 'PNG', 15, 10, 16, 16); textX = 35; }catch(e){}
  }
  doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(40,30,60);
  doc.text(branding.app_name || 'AbsensiTK', textX, y+2);
  doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(110,100,128);
  let subY = y+7;
  if(branding.kop_alamat){ doc.text(branding.kop_alamat, textX, subY); subY+=4; }
  if(branding.kop_telp){ doc.text('Telp: '+branding.kop_telp, textX, subY); subY+=4; }
  doc.setDrawColor(230,220,210); doc.line(15, 30, pageW-15, 30);

  doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(40,30,60);
  doc.text(title, 15, 38);
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(110,100,128);
  let fy = 44;
  subtitleLines.forEach(line=>{ doc.text(line, 15, fy); fy+=5; });
  return fy+2;
}
function drawPdfFooter(doc){
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const pageCount = doc.internal.getNumberOfPages();
  for(let i=1;i<=pageCount;i++){
    doc.setPage(i);
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(160,150,170);
    doc.text('Dicetak: '+new Date().toLocaleString('id-ID'), 15, pageH-10);
    doc.text('Developed by D.D Candra © 2026', pageW-15, pageH-10, {align:'right'});
    doc.text('Halaman '+i+' / '+pageCount, pageW/2, pageH-10, {align:'center'});
  }
}
function exportRekapPDF(){
  if(!lastRekapData){ toast('Klik "Tampilkan Rekap" dulu sebelum export'); return; }
  if(typeof window.jspdf === 'undefined'){ toast('Modul PDF gagal dimuat. Cek koneksi internet.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'mm', format:'a4'});
  const pageW = doc.internal.pageSize.getWidth();
  const d = lastRekapData;

  if(d.mode==='detail'){
    const subtitle = [
      'Siswa: '+d.siswaNama+'  ·  Kelas: '+d.kelasNama,
      'Bulan: '+bulanIndonesia(d.bulan)+'  ·  Filter status: '+statusLabelPdf(d.statusVal)
    ];
    let y = drawPdfHeader(doc, 'Rekap Kehadiran — Detail Harian', subtitle);

    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(40,30,60);
    doc.text('Hadir: '+d.sum.hadir+'   Terlambat: '+d.sum.terlambat+'   Izin: '+d.sum.izin+'   Sakit: '+d.sum.sakit+'   Alpa: '+d.sum.alpa, 15, y);
    y += 4.5;
    doc.setFont('helvetica','italic'); doc.setFontSize(7.5); doc.setTextColor(130,120,140);
    doc.text('*Hadir sudah termasuk yang datang terlambat', 15, y);
    y += 6;

    const cols = [ {h:'Tanggal', x:15, w:30}, {h:'Masuk', x:50, w:25}, {h:'Pulang', x:80, w:25}, {h:'Status', x:110, w:40} ];
    y = drawTableHeader(doc, cols, y);
    d.rows.forEach(r=>{
      if(y>270){ doc.addPage(); y = drawPdfHeader(doc, 'Rekap Kehadiran — Detail Harian (lanjutan)', subtitle); y = drawTableHeader(doc, cols, y); }
      const tgl = new Date(r.tanggal+'T00:00:00').toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
      doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(60,50,75);
      doc.text(tgl, cols[0].x, y);
      doc.text(fmtTime(r.jam_masuk), cols[1].x, y);
      doc.text(fmtTime(r.jam_pulang), cols[2].x, y);
      doc.text(statusLabelPdf(r.status), cols[3].x, y);
      y += 6;
    });
    drawPdfFooter(doc);
    doc.save('rekap-'+d.siswaNama.replace(/\s+/g,'_')+'-'+d.bulan+'.pdf');
    return;
  }

  // mode summary
  const subtitle = [
    'Kelas: '+d.kelasNama+'  ·  Bulan: '+bulanIndonesia(d.bulan),
    'Filter status: '+statusLabelPdf(d.statusVal)+'  ·  Total siswa: '+d.list.length,
    '*Kolom Hadir sudah termasuk yang datang terlambat'
  ];
  let y = drawPdfHeader(doc, 'Rekap Kehadiran — Ringkasan Siswa', subtitle);
  const cols = [ {h:'No', x:15, w:10}, {h:'Nama Siswa', x:25, w:50}, {h:'Hadir', x:80, w:18}, {h:'Telat', x:100, w:18}, {h:'Izin', x:120, w:18}, {h:'Sakit', x:140, w:18}, {h:'Alpa', x:160, w:18} ];
  y = drawTableHeader(doc, cols, y);
  d.list.forEach((s,i)=>{
    if(y>270){ doc.addPage(); y = drawPdfHeader(doc, 'Rekap Kehadiran — Ringkasan Siswa (lanjutan)', subtitle); y = drawTableHeader(doc, cols, y); }
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(60,50,75);
    doc.text(String(i+1), cols[0].x, y);
    doc.text(s.nama, cols[1].x, y);
    doc.text(String(s.hadir), cols[2].x, y);
    doc.text(String(s.terlambat), cols[3].x, y);
    doc.text(String(s.izin), cols[4].x, y);
    doc.text(String(s.sakit), cols[5].x, y);
    doc.text(String(s.alpa), cols[6].x, y);
    y += 6.5;
  });
  drawPdfFooter(doc);
  doc.save('rekap-'+d.kelasNama.replace(/\s+/g,'_')+'-'+d.bulan+'.pdf');
}
function drawTableHeader(doc, cols, y){
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFillColor(255,243,230);
  doc.rect(15, y-4.5, pageW-30, 7, 'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(90,60,40);
  cols.forEach(c=> doc.text(c.h, c.x, y));
  doc.setDrawColor(230,220,210);
  doc.line(15, y+2.5, pageW-15, y+2.5);
  return y+9;
}

/* ============================================================
   BROADCAST — pengumuman satu arah admin → semua orang tua
============================================================ */
let pendingBcFoto = null;
function setupBroadcastVisibility(){
  const isAdmin = currentGuru.peran==='admin';
  document.getElementById('broadcastComposer').style.display = isAdmin ? '' : 'none';
}
function handleBroadcastPhoto(ev){
  const file = ev.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const img = new Image();
    img.onload = ()=>{
      const canvas = document.createElement('canvas');
      const maxW = 640; const scale = Math.min(1, maxW/img.width);
      canvas.width = img.width*scale; canvas.height = img.height*scale;
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      pendingBcFoto = canvas.toDataURL('image/jpeg', 0.7);
      document.getElementById('bcFotoStatus').textContent = '✅ Foto siap dilampirkan';
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
async function sendBroadcast(){
  const judul = document.getElementById('bcJudul').value.trim();
  const isi = document.getElementById('bcIsi').value.trim();
  if(!judul){ toast('Judul pengumuman wajib diisi'); return; }
  try{
    await sb('broadcast', {method:'POST', body:JSON.stringify({
      judul, isi: isi||null, foto_url: pendingBcFoto||null, dibuat_oleh: currentGuru.nama
    })});
    document.getElementById('bcJudul').value=''; document.getElementById('bcIsi').value='';
    document.getElementById('bcFotoStatus').textContent=''; pendingBcFoto=null;
    toast('Pengumuman terkirim ke semua orang tua 📢');
    loadBroadcasts();
    triggerPush({ type:'broadcast', title:'📢 '+judul, body: isi || 'Ada pengumuman baru dari sekolah' });
  }catch(e){ toast('Gagal kirim: '+e.message); }
}
async function loadBroadcasts(){
  try{
    const rows = await sb('broadcast?select=*&order=created_at.desc&limit=50');
    const box = document.getElementById('broadcastList');
    if(!rows.length){ box.innerHTML = emptyState('📭','Belum ada pengumuman',''); return; }
    box.innerHTML = rows.map(b=>{
      const dt = new Date(b.created_at).toLocaleString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
      const img = b.foto_url ? `<img src="${b.foto_url}">` : '';
      return `<div class="bc-card">
        <div class="bc-head">
          <div class="bc-badge">📢</div>
          <div><div class="bc-title">${escapeHtml(b.judul)}</div><div class="bc-meta">${b.dibuat_oleh||'Sekolah'} · ${dt}</div></div>
        </div>
        ${b.isi?`<div class="bc-body">${escapeHtml(b.isi)}</div>`:''}${img}
      </div>`;
    }).join('');
  }catch(e){ /* tabel broadcast mungkin belum dibuat */ }
}

/* ============================================================
   NOTIFIKASI (Lonceng) — terhubung ke Chat, Info (broadcast),
   dan Presensi. Menyimpan waktu terakhir dibaca per-guru di
   localStorage, lalu berlangganan realtime untuk hitung notifikasi baru.
============================================================ */
function notifStorageKey(){ return 'tkNotifRead_'+(currentGuru?.id||'anon'); }
function loadNotifLastRead(){
  notifLastRead = JSON.parse(localStorage.getItem(notifStorageKey()) || '{}');
  if(!notifLastRead.chat) notifLastRead.chat = new Date().toISOString();
  if(!notifLastRead.broadcast) notifLastRead.broadcast = new Date().toISOString();
  if(!notifLastRead.presensi) notifLastRead.presensi = new Date().toISOString();
}
function saveNotifLastRead(){ localStorage.setItem(notifStorageKey(), JSON.stringify(notifLastRead)); }

/* Bunyi notifikasi — dibuat langsung via Web Audio API, tanpa file audio eksternal */
let notifAudioCtx = null;
function playNotifSound(){
  try{
    if(!notifAudioCtx) notifAudioCtx = new (window.AudioContext||window.webkitAudioContext)();
    if(notifAudioCtx.state==='suspended') notifAudioCtx.resume();
    const now = notifAudioCtx.currentTime;
    [880, 1175].forEach((freq,i)=>{
      const osc = notifAudioCtx.createOscillator();
      const gain = notifAudioCtx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      const t0 = now + i*0.11;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.18, t0+0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t0+0.22);
      osc.connect(gain); gain.connect(notifAudioCtx.destination);
      osc.start(t0); osc.stop(t0+0.24);
    });
  }catch(e){ /* Audio tidak didukung / diblokir browser, abaikan diam-diam */ }
}

let notifInternalChannel = null;
function setupNotifications(){
  loadNotifLastRead();
  notifCounts = { chat:0, broadcast:0, presensi:0, internal:0 };
  notifChatUnread = {};
  const isAdmin = currentGuru.peran==='admin';
  const myKelasIds = (isAdmin ? kelasAll : kelasAll.filter(k=>k.id===currentGuru.kelas_id)).map(k=>k.id);

  if(notifChatChannel) sbClient.removeChannel(notifChatChannel);
  if(notifBroadcastChannel) sbClient.removeChannel(notifBroadcastChannel);
  if(notifPresensiChannel) sbClient.removeChannel(notifPresensiChannel);
  if(siswaSyncChannel) sbClient.removeChannel(siswaSyncChannel);
  if(notifInternalChannel) sbClient.removeChannel(notifInternalChannel);

  notifBroadcastChannel = sbClient.channel('notif-broadcast')
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'broadcast'}, payload=>{
      notifCounts.broadcast++; renderNotifDot(); playNotifSound();
      if(!document.getElementById('screenBroadcast')?.classList.contains('active')) setNavDot('Broadcast', true);
    }).subscribe();

  notifInternalChannel = sbClient.channel('notif-pesan-internal')
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'pesan_internal'}, payload=>{
      const row = payload.new;
      if(String(row.pengirim_id)===String(currentGuru.id)) return; // pesan sendiri, abaikan
      playNotifSound();
      const viewingInternal = document.getElementById('screenChat')?.classList.contains('active') && !document.getElementById('chatInternalWrap')?.classList.contains('hidden');
      if(viewingInternal){ loadInternalChatMessages(); return; }
      notifCounts.internal++;
      renderNotifDot();
      setNavDot('Chat', true);
      let dot = document.querySelector('#chatModeInternalBtn .chat-mode-dot');
      if(!dot){ dot = document.createElement('span'); dot.className='chat-mode-dot'; document.getElementById('chatModeInternalBtn').appendChild(dot); }
    }).subscribe();

  if(!myKelasIds.length){ renderNotifDot(); return; }

  notifChatChannel = sbClient.channel('notif-pesan')
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'pesan'}, payload=>{
      const row = payload.new;
      if(!myKelasIds.includes(row.kelas_id) || row.pengirim_tipe!=='ortu') return;
      playNotifSound();
      const viewingThisClass = document.getElementById('screenChat')?.classList.contains('active') && String(activeChatKelasId)===String(row.kelas_id);
      if(viewingThisClass) return; // sedang dilihat langsung, tidak perlu badge
      notifChatUnread[row.kelas_id] = (notifChatUnread[row.kelas_id]||0) + 1;
      notifCounts.chat++;
      renderNotifDot();
      renderChatTabDots();
      setNavDot('Chat', true);
    }).subscribe();

  notifPresensiChannel = sbClient.channel('notif-absensi')
    .on('postgres_changes', {event:'*', schema:'public', table:'absensi_tk'}, payload=>{
      const row = payload.new || payload.old;
      if(!row || !myKelasIds.includes(row.kelas_id)) return;
      if(payload.eventType==='INSERT'){ notifCounts.presensi++; renderNotifDot(); playNotifSound(); }
      // Refresh live kalau layar Presensi sedang dibuka, tanpa perlu refresh manual
      if(document.getElementById('screenPresensi')?.classList.contains('active')) renderPresensiList();
    }).subscribe();

  siswaSyncChannel = sbClient.channel('siswa-sync')
    .on('postgres_changes', {event:'UPDATE', schema:'public', table:'siswa'}, async payload=>{
      // Sinkron otomatis kalau ada perubahan data siswa (mis. foto profil di-upload orang tua)
      await loadSiswa();
      if(document.getElementById('screenSiswa')?.classList.contains('active')) renderSiswaList();
      if(document.getElementById('screenPresensi')?.classList.contains('active')) renderPresensiList();
    }).subscribe();

  renderNotifDot();
}
function renderNotifDot(){
  const total = notifCounts.chat + notifCounts.broadcast + notifCounts.presensi + notifCounts.internal;
  document.getElementById('notifDot').classList.toggle('hidden', total===0);
}
function setNavDot(screenName, show){
  const item = document.querySelector('.nav-item[data-screen="'+screenName+'"] .nav-badge, .nav-item[data-screen="'+screenName+'"] .nav-badge-center');
  if(!item) return;
  let dot = item.querySelector('.nav-dot');
  if(show){
    if(!dot){ dot = document.createElement('span'); dot.className='nav-dot'; item.appendChild(dot); }
  } else if(dot){ dot.remove(); }
}
function renderChatTabDots(){
  document.querySelectorAll('#chatKelasTabs .tab-pill').forEach(el=>{
    const kelasId = el.dataset.v;
    const unread = notifChatUnread[kelasId] || 0;
    let dot = el.querySelector('.tab-dot');
    if(unread>0){
      if(!dot){ dot = document.createElement('span'); dot.className='tab-dot'; el.appendChild(dot); }
    } else if(dot){ dot.remove(); }
  });
}
function clearChatUnread(kelasId){
  const n = notifChatUnread[kelasId] || 0;
  if(n>0){
    notifChatUnread[kelasId] = 0;
    notifCounts.chat = Math.max(0, notifCounts.chat - n);
    renderNotifDot();
    renderChatTabDots();
    const anyLeft = Object.values(notifChatUnread).some(v=>v>0);
    if(!anyLeft) setNavDot('Chat', false);
  }
}
function toggleNotifPanel(){
  const panel = document.getElementById('notifPanel');
  if(!panel.classList.contains('hidden')){ panel.classList.add('hidden'); return; }
  renderNotifPanel();
  panel.classList.remove('hidden');
}
function renderNotifPanel(){
  const panel = document.getElementById('notifPanel');
  const items = [
    { key:'chat', icon:'💬', color:'var(--coral)', title:'Pesan Baru', sub:'Chat dari orang tua', count:notifCounts.chat, go:'Chat' },
    { key:'internal', icon:'👥', color:'var(--purple)', title:'Chat Internal', sub:'Pesan dari sesama guru', count:notifCounts.internal, go:'Chat' },
    { key:'broadcast', icon:'📢', color:'var(--orange)', title:'Pengumuman Baru', sub:'Info dari sekolah', count:notifCounts.broadcast, go:'Broadcast' },
    { key:'presensi', icon:'✅', color:'var(--mint)', title:'Presensi Baru', sub:'Ada siswa check-in/out', count:notifCounts.presensi, go:'Presensi' },
  ];
  const activeItems = items.filter(i=>i.count>0);
  if(!activeItems.length){ panel.innerHTML = '<div class="notif-empty">🔔 Tidak ada notifikasi baru</div>'; return; }
  panel.innerHTML = activeItems.map(i=>`
    <div class="notif-item" onclick="handleNotifClick('${i.key}','${i.go}')">
      <div class="notif-icon" style="background:${i.color}22;color:${i.color};">${i.icon}</div>
      <div class="notif-text"><div class="notif-title">${i.title}</div><div class="notif-sub">${i.sub}</div></div>
      <div class="notif-count">${i.count}</div>
    </div>`).join('');
}
function handleNotifClick(key, screenName){
  document.getElementById('notifPanel').classList.add('hidden');
  if(key==='chat'){
    switchScreen('Chat');
    switchChatMode('kelas');
    const unreadKelasId = Object.keys(notifChatUnread).find(k=>notifChatUnread[k]>0);
    if(unreadKelasId){
      const tabEl = document.querySelector('#chatKelasTabs .tab-pill[data-v="'+unreadKelasId+'"]');
      if(tabEl) setChatTab(tabEl, unreadKelasId);
    }
    return;
  }
  if(key==='internal'){
    switchScreen('Chat');
    switchChatMode('internal');
    return;
  }
  notifCounts[key] = 0;
  notifLastRead[key] = new Date().toISOString();
  saveNotifLastRead();
  renderNotifDot();
  switchScreen(screenName);
}
document.addEventListener('click', function unlockAudioOnce(){
  try{
    if(!notifAudioCtx) notifAudioCtx = new (window.AudioContext||window.webkitAudioContext)();
    if(notifAudioCtx.state==='suspended') notifAudioCtx.resume();
  }catch(e){}
  document.removeEventListener('click', unlockAudioOnce);
}, {once:true});
document.addEventListener('click', (e)=>{
  const panel = document.getElementById('notifPanel');
  const bell = document.getElementById('bellBtn');
  if(panel && !panel.classList.contains('hidden') && !panel.contains(e.target) && !bell.contains(e.target)){
    panel.classList.add('hidden');
  }
});

/* ============================================================
   KELOLA KELAS & GURU (Pengaturan)
============================================================ */
function renderSettingLists(){
  document.getElementById('kelasManageList').innerHTML = kelasAll.map(k=>`
    <div class="row" style="align-items:center;margin-bottom:8px;gap:6px;">
      <span class="chip chip-kelas" style="flex:1;"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--coral);margin-right:6px;vertical-align:middle;"></span>${k.nama}</span>
      <button class="btn-sm btn-outline btn" style="flex:0 0 auto;" onclick="editKelasName('${k.id}','${k.nama.replace(/'/g,"\\'")}')">✏️</button>
      <button class="btn-sm btn-outline btn" style="flex:0 0 auto;" onclick="deleteKelas('${k.id}','${k.nama.replace(/'/g,"\\'")}')">🗑️</button>
    </div>`).join('') || '<p class="text-muted">Belum ada kelas</p>';
  document.getElementById('guruManageList').innerHTML = guruAll.map(g=>`
    <div class="row" style="align-items:center;margin-bottom:8px;gap:6px;">
      <span class="chip chip-kelas" style="flex:1;">${g.super_admin_pin?'🔒 ':''}${g.nama} · ${g.peran==='admin'?'Admin':(g.kelas?.nama||'-')}</span>
      <button class="btn-sm btn-outline btn" style="flex:0 0 auto;" onclick="viewGuruPin('${g.id}')">👁️</button>
      <button class="btn-sm btn-outline btn" style="flex:0 0 auto;" onclick="editGuruName('${g.id}','${g.nama.replace(/'/g,"\\'")}')">✏️</button>
      <button class="btn-sm btn-outline btn" style="flex:0 0 auto;" onclick="deleteGuru('${g.id}','${g.nama.replace(/'/g,"\\'")}')">🗑️</button>
    </div>`).join('') || '<p class="text-muted">Belum ada guru</p>';
  document.getElementById('newGuruPeran').onchange = e=>{
    document.getElementById('newGuruKelasWrap').classList.toggle('hidden', e.target.value==='admin');
  };
}
function viewGuruPin(id){
  if(!checkSuperAdminPin(id)) return;
  const g = guruAll.find(x=>String(x.id)===String(id));
  if(!g) return;
  alert('PIN saat ini untuk '+g.nama+':\n\n'+g.pin);
}
async function editKelasName(id, currentName){
  const newName = prompt('Ubah nama kelas:', currentName);
  if(newName===null) return;
  const trimmed = newName.trim();
  if(!trimmed){ toast('Nama tidak boleh kosong'); return; }
  try{
    await sb('kelas?id=eq.'+id, {method:'PATCH', body:JSON.stringify({nama:trimmed})});
    await loadKelas(); renderKelasTabs(); renderSettingLists(); renderPresensiList(); renderSiswaList();
    toast('Nama kelas diperbarui');
  }catch(e){ toast('Gagal: '+e.message); }
}
async function deleteKelas(id, nama){
  const ok = confirm('Hapus kelas "'+nama+'"?\n\nSiswa & guru yang terhubung ke kelas ini TIDAK akan terhapus, tapi jadi tidak punya kelas (perlu diatur ulang manual). Riwayat chat kelas ini akan ikut terhapus permanen.\n\nLanjutkan?');
  if(!ok) return;
  try{
    await sb('kelas?id=eq.'+id, {method:'DELETE'});
    await loadKelas(); await loadSiswa(); renderKelasTabs(); renderSettingLists(); renderPresensiList(); renderSiswaList();
    toast('Kelas dihapus');
  }catch(e){ toast('Gagal: '+e.message); }
}
function handleGuruPhotoUpload(ev){
  const file = ev.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const img = new Image();
    img.onload = async ()=>{
      const canvas = document.createElement('canvas');
      const size = 240;
      const scale = Math.max(size/img.width, size/img.height);
      const w = img.width*scale, h = img.height*scale;
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, (size-w)/2, (size-h)/2, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      document.getElementById('setGuruAvatar').innerHTML = `<img src="${dataUrl}" style="width:100%;height:100%;object-fit:cover;">`;
      try{
        await sb('guru?id=eq.'+currentGuru.id, {method:'PATCH', body:JSON.stringify({foto_url:dataUrl})});
        currentGuru.foto_url = dataUrl;
        sessionStorage.setItem('tkGuruSession', JSON.stringify(currentGuru));
        toast('Foto profil diperbarui');
      }catch(e){ toast('Gagal simpan foto: '+e.message); }
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
async function changeMyPin(){
  const oldPin = document.getElementById('oldPinInput').value.trim();
  const newPin = document.getElementById('newPinInput').value.trim();
  const confirmPin = document.getElementById('confirmPinInput').value.trim();
  if(oldPin !== currentGuru.pin){ toast('PIN lama salah'); return; }
  if(newPin.length!==4 || !/^\d{4}$/.test(newPin)){ toast('PIN baru harus 4 digit angka'); return; }
  if(newPin !== confirmPin){ toast('Konfirmasi PIN tidak cocok'); return; }
  if(newPin === oldPin){ toast('PIN baru tidak boleh sama dengan PIN lama'); return; }
  try{
    await sb('guru?id=eq.'+currentGuru.id, {method:'PATCH', body:JSON.stringify({pin:newPin})});
    currentGuru.pin = newPin;
    sessionStorage.setItem('tkGuruSession', JSON.stringify(currentGuru));
    document.getElementById('oldPinInput').value='';
    document.getElementById('newPinInput').value='';
    document.getElementById('confirmPinInput').value='';
    toast('PIN berhasil diubah');
  }catch(e){ toast('Gagal: '+e.message); }
}
function checkSuperAdminPin(id){
  const g = guruAll.find(x=>String(x.id)===String(id));
  if(!g || !g.super_admin_pin) return true; // tidak terkunci, lanjut bebas
  const entered = prompt('🔒 Akun ini terkunci. Masukkan kode 6 digit untuk melanjutkan:');
  if(entered===null) return false;
  if(entered.trim() !== g.super_admin_pin){ toast('Kode salah. Aksi dibatalkan.'); return false; }
  return true;
}
async function editGuruName(id, currentName){
  if(!checkSuperAdminPin(id)) return;
  const newName = prompt('Ubah nama guru:', currentName);
  if(newName===null) return;
  const trimmed = newName.trim();
  if(!trimmed){ toast('Nama tidak boleh kosong'); return; }
  try{
    await sb('guru?id=eq.'+id, {method:'PATCH', body:JSON.stringify({nama:trimmed})});
    await loadGuruForLogin(); renderSettingLists();
    toast('Nama guru diperbarui');
  }catch(e){ toast('Gagal: '+e.message); }
}
async function deleteGuru(id, nama){
  if(String(id)===String(currentGuru.id)){ toast('Tidak bisa menghapus akun sendiri yang sedang login'); return; }
  if(!checkSuperAdminPin(id)) return;
  const ok = confirm('Hapus akun guru "'+nama+'"? Guru ini tidak akan bisa login lagi. Lanjutkan?');
  if(!ok) return;
  try{
    await sb('guru?id=eq.'+id, {method:'DELETE'});
    await loadGuruForLogin(); renderSettingLists();
    toast('Guru dihapus');
  }catch(e){ toast('Gagal: '+e.message); }
}
async function addKelas(){
  const nama = document.getElementById('newKelasNama').value.trim();
  if(!nama){ toast('Nama kelas wajib diisi'); return; }
  const icons=['🐰','🦋','🐥','🐢','🐻','🐼','🐸','🦁'];
  const colors=['#FF7B54','#5B9BD5','#29B6A8','#9B87F5','#FFC857'];
  await sb('kelas', {method:'POST', body:JSON.stringify({nama, ikon:icons[kelasAll.length%icons.length], warna:colors[kelasAll.length%colors.length]})});
  document.getElementById('newKelasNama').value='';
  await loadKelas(); renderKelasTabs(); renderSettingLists();
  toast('Kelas ditambahkan');
}
async function addGuru(){
  const nama = document.getElementById('newGuruNama').value.trim();
  const peran = document.getElementById('newGuruPeran').value;
  const kelas_id = peran==='admin' ? null : (document.getElementById('newGuruKelas').value||null);
  const pin = document.getElementById('newGuruPin').value.trim();
  if(!nama || pin.length!==4){ toast('Lengkapi nama & PIN 4 digit'); return; }
  await sb('guru', {method:'POST', body:JSON.stringify({nama, peran, kelas_id, pin})});
  document.getElementById('newGuruNama').value=''; document.getElementById('newGuruPin').value='';
  await loadGuruForLogin(); renderSettingLists();
  toast('Guru ditambahkan');
}

/* ============================================================
   INIT
============================================================ */
(async function init(){
  applyBrandingSafe();
  if(initSupabase()){
    await loadBrandingFromDb();
    applyBrandingSafe();
    renderLogoEverywhere();
    applyThemeColor();
    await loadGuruForLogin();
    if(currentGuru){
      // validasi ulang guru masih ada
      await loadKelas(); await loadSiswa();
      const found = (await sb('guru?id=eq.'+currentGuru.id+'&select=*,kelas(id,nama,ikon,warna)'))[0];
      if(found){ currentGuru=found; enterApp(); }
    }
  } else {
    document.getElementById('connectPromptLabel').textContent = 'Belum konek Supabase? Buka Pengaturan dulu';
    document.getElementById('connectPromptBox').classList.remove('hidden');
  }
})();
function applyBrandingSafe(){
  const name = branding.app_name || 'AbsensiTK';
  const sub = branding.app_sub || 'Presensi & Komunikasi Sekolah TK';
  document.getElementById('loginAppName').textContent = name;
  document.getElementById('loginAppSub').textContent = sub;
  document.title = name + ' — Guru & Admin';
}
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw-guru.js').catch(()=>{ /* offline saat install pertama, abaikan */ });
  });
}
</script>
</body>
</html>
