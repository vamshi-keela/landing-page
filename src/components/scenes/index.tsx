import type React from 'react';

export function NoirStreet({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`ns-sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0608"/><stop offset="0.5" stopColor="#120a10"/><stop offset="1" stopColor="#2a1614"/>
        </linearGradient>
        <radialGradient id={`ns-glow-${id}`} cx="0.5" cy="1" r="0.9">
          <stop offset="0" stopColor="#ff6a3d" stopOpacity="0.35"/><stop offset="0.5" stopColor="#cc3300" stopOpacity="0.15"/><stop offset="1" stopColor="#cc3300" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={`ns-wet-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0c0a" stopOpacity="0"/><stop offset="1" stopColor="#ff9a6a" stopOpacity="0.35"/>
        </linearGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#ns-sky-${id})`}/>
      <rect x="0" y="240" width="260" height="360" fill="#0b0608"/>
      <rect x="240" y="200" width="200" height="400" fill="#0e080a"/>
      <rect x="430" y="260" width="180" height="340" fill="#0b0608"/>
      <rect x="1010" y="220" width="220" height="380" fill="#0e080a"/>
      <rect x="1220" y="250" width="200" height="350" fill="#0a0507"/>
      {Array.from({length:42}).map((_,i)=>{const x=(i*137)%1410,y=240+((i*53)%200),o=0.3+(i%5)*0.12;return <rect key={i} x={x} y={y} width="3" height="4" fill="#ffb070" opacity={o}/>;})}
      <rect x="0" y="342" width="1410" height="3" fill="#ff5a22" opacity="0.7"/>
      <rect x="0" y="342" width="1410" height="1" fill="#ffb070" opacity="0.9"/>
      <rect x="0" y="0" width="1410" height="600" fill={`url(#ns-glow-${id})`}/>
      {Array.from({length:120}).map((_,i)=>{const x=(i*79)%1410,y=(i*31)%600;return <line key={i} x1={x} y1={y} x2={x-3} y2={y+14} stroke="#d8c8b8" strokeWidth="0.6" opacity="0.22"/>;})}
      <rect x="0" y="420" width="1410" height="180" fill={`url(#ns-wet-${id})`}/>
      <rect x="0" y="423" width="1410" height="1" fill="#ff9a6a" opacity="0.4"/>
      <g transform="translate(680,350)">
        <ellipse cx="0" cy="190" rx="44" ry="8" fill="#000" opacity="0.7"/>
        <path d="M -16 -60 Q -20 -30 -30 40 L -28 190 L 28 190 L 30 40 Q 20 -30 16 -60 Q 10 -78 0 -78 Q -10 -78 -16 -60 Z" fill="#050203"/>
        <circle cx="0" cy="-80" r="12" fill="#050203"/>
        <path d="M -16 -60 Q -20 -30 -30 40" stroke="#ff7a3a" strokeWidth="1.2" fill="none" opacity="0.45"/>
      </g>
      <rect x="1120" y="180" width="3" height="300" fill="#050203"/>
      <circle cx="1121" cy="175" r="8" fill="#ffb070" opacity="0.85"/>
      <circle cx="1121" cy="175" r="24" fill="#ff9a6a" opacity="0.2"/>
    </svg>
  );
}

export function Diner({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`dn-bg-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1a0e08"/><stop offset="1" stopColor="#0a0503"/></linearGradient>
        <radialGradient id={`dn-warm-${id}`} cx="0.35" cy="0.45" r="0.55"><stop offset="0" stopColor="#ffb070" stopOpacity="0.4"/><stop offset="1" stopColor="#ffb070" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#dn-bg-${id})`}/>
      <rect x="80" y="60" width="780" height="460" fill="#1f1208"/>
      <rect x="100" y="80" width="740" height="420" fill="#2a1808"/>
      <rect x="100" y="80" width="740" height="420" fill={`url(#dn-warm-${id})`}/>
      <rect x="470" y="80" width="4" height="420" fill="#0a0503"/>
      <rect x="100" y="290" width="740" height="3" fill="#0a0503"/>
      <g opacity="0.85">
        <circle cx="280" cy="360" r="24" fill="#1a0e06"/><rect x="276" y="360" width="8" height="80" fill="#1a0e06"/>
        <circle cx="420" cy="360" r="24" fill="#1a0e06"/><rect x="416" y="360" width="8" height="80" fill="#1a0e06"/>
      </g>
      <g transform="translate(600,200)">
        <ellipse cx="0" cy="12" rx="28" ry="36" fill="#0a0503"/>
        <circle cx="0" cy="-30" r="22" fill="#0a0503"/>
        <path d="M 18 -30 Q 22 0 20 30" stroke="#ffb070" strokeWidth="1.2" fill="none" opacity="0.5"/>
      </g>
      <g transform="translate(920,160)">
        <rect x="0" y="0" width="140" height="60" fill="none" stroke="#ff5a22" strokeWidth="1.5" opacity="0.8" rx="2"/>
        <text x="70" y="40" textAnchor="middle" fill="#ff9a6a" fontFamily="Space Grotesk, sans-serif" fontSize="22" letterSpacing="6">OPEN</text>
      </g>
      <rect x="0" y="520" width="1410" height="80" fill="#1a0806" opacity="0.9"/>
    </svg>
  );
}

export function Warehouse({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`wh-bg-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b0807"/><stop offset="1" stopColor="#1c120a"/></linearGradient>
        <linearGradient id={`wh-shaft-${id}`} x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stopColor="#ffcc88" stopOpacity="0.5"/><stop offset="1" stopColor="#ffcc88" stopOpacity="0"/></linearGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#wh-bg-${id})`}/>
      <rect x="0" y="420" width="1410" height="180" fill="#0a0605"/>
      {[0,1,2,3,4,5].map(i=>(
        <g key={i}>
          <rect x={120+i*200} y="40" width="140" height="180" fill="#1a1008"/>
          <rect x={124+i*200} y="44" width="132" height="172" fill="#3a2412"/>
          <rect x={124+i*200} y="44" width="132" height="172" fill="#ffcc88" opacity="0.15"/>
          <rect x={188+i*200} y="44" width="4" height="172" fill="#0a0605"/>
        </g>
      ))}
      {[0,2,4].map(i=>(
        <polygon key={i} points={`${180+i*200},220 ${260+i*200},220 ${480+i*200},600 ${340+i*200},600`} fill={`url(#wh-shaft-${id})`} opacity="0.55"/>
      ))}
      <g transform="translate(600,420)">
        <ellipse cx="0" cy="160" rx="36" ry="6" fill="#000" opacity="0.7"/>
        <path d="M -14 -10 L -18 160 L 18 160 L 14 -10 Z" fill="#0a0605"/>
        <circle cx="0" cy="-30" r="14" fill="#0a0605"/>
        <path d="M -14 -10 L -18 160" stroke="#ffcc88" strokeWidth="1" opacity="0.5"/>
      </g>
      {Array.from({length:40}).map((_,i)=>(
        <circle key={i} cx={(i*53)%1410} cy={300+(i*19)%260} r="0.9" fill="#ffcc88" opacity={0.25+(i%4)*0.08}/>
      ))}
      <rect x="1100" y="0" width="18" height="600" fill="#050302"/>
    </svg>
  );
}

export function Harbor({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`hb-sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1608"/><stop offset="0.5" stopColor="#4a2410"/><stop offset="0.85" stopColor="#ff7a3a"/><stop offset="1" stopColor="#ff9a5a"/>
        </linearGradient>
        <linearGradient id={`hb-water-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a5a"/><stop offset="0.3" stopColor="#3a1e10"/><stop offset="1" stopColor="#0a0503"/>
        </linearGradient>
      </defs>
      <rect width="1410" height="380" fill={`url(#hb-sky-${id})`}/>
      <rect y="380" width="1410" height="220" fill={`url(#hb-water-${id})`}/>
      <circle cx="1000" cy="370" r="40" fill="#ffd48a" opacity="0.9"/>
      <circle cx="1000" cy="370" r="80" fill="#ff9a5a" opacity="0.22"/>
      {Array.from({length:18}).map((_,i)=>(
        <rect key={i} x={960} y={390+i*11} width={80-i*3} height="2" fill="#ffd48a" opacity={0.6-i*0.03}/>
      ))}
      <g fill="#0a0503">
        <path d="M 160 370 L 260 370 L 250 378 L 170 378 Z"/><rect x="200" y="356" width="4" height="16"/>
        <path d="M 620 375 L 700 375 L 692 380 L 628 380 Z"/>
      </g>
      <polygon points="0,600 1410,600 800,420 610,420" fill="#1a0e08"/>
      <g transform="translate(680,380)">
        <path d="M -6 -30 L -8 40 L 8 40 L 6 -30 Z" fill="#0a0503"/>
        <circle cx="0" cy="-40" r="8" fill="#0a0503"/>
      </g>
      <g transform="translate(720,382)">
        <path d="M -5 -26 L -7 40 L 7 40 L 5 -26 Z" fill="#0a0503"/>
        <circle cx="0" cy="-36" r="7" fill="#0a0503"/>
      </g>
    </svg>
  );
}

export function Train({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`tr-bg-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#080a0e"/><stop offset="1" stopColor="#0f1216"/></linearGradient>
        <linearGradient id={`tr-win-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6688aa" stopOpacity="0.4"/><stop offset="1" stopColor="#223244" stopOpacity="0.3"/></linearGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#tr-bg-${id})`}/>
      <path d="M 0 0 Q 705 80 1410 0 Z" fill="#050608"/>
      <rect x="100" y="60" width="400" height="3" fill="#c6d2e0" opacity="0.7"/>
      <rect x="600" y="60" width="400" height="3" fill="#c6d2e0" opacity="0.5"/>
      {[0,1,2,3,4].map(i=>{const x=120+i*250;return <g key={i}><rect x={x} y="140" width="180" height="180" fill="#050608"/><rect x={x+6} y="146" width="168" height="168" fill={`url(#tr-win-${id})`}/>{[0,1,2,3,4,5].map(j=>(<rect key={j} x={x+6} y={150+j*28} width="168" height="2" fill="#99aabb" opacity={0.2+(j%3)*0.15}/>))}</g>;})}
      <rect x="0" y="380" width="1410" height="220" fill="#05060a"/>
      <g transform="translate(420,330)">
        <path d="M -30 0 L -34 160 L 34 160 L 30 0 Q 28 -10 0 -10 Q -28 -10 -30 0 Z" fill="#05060a"/>
        <circle cx="0" cy="-30" r="22" fill="#05060a"/>
        <path d="M 30 0 L 34 160" stroke="#99aabb" strokeWidth="1.2" opacity="0.5"/>
      </g>
      <rect x="0" y="110" width="1410" height="2" fill="#3a4656" opacity="0.8"/>
    </svg>
  );
}

export function Theatre({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={`th-spot-${id}`} cx="0.5" cy="0.55" r="0.4">
          <stop offset="0" stopColor="#ffecc8" stopOpacity="0.85"/><stop offset="0.4" stopColor="#c69a6a" stopOpacity="0.35"/><stop offset="1" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1410" height="600" fill="#050305"/>
      <rect x="0" y="420" width="1410" height="180" fill="#0a0606"/>
      {Array.from({length:28}).map((_,i)=>(
        <rect key={i} x={i*52} y="0" width="52" height="400" fill="#1a0608" opacity={0.55+(i%3)*0.12}/>
      ))}
      <ellipse cx="705" cy="380" rx="460" ry="260" fill={`url(#th-spot-${id})`}/>
      <g transform="translate(705,380)">
        <ellipse cx="0" cy="60" rx="44" ry="8" fill="#000" opacity="0.9"/>
        <path d="M -18 -60 L -22 60 L 22 60 L 18 -60 Q 15 -76 0 -76 Q -15 -76 -18 -60 Z" fill="#050203"/>
        <circle cx="0" cy="-80" r="14" fill="#050203"/>
      </g>
    </svg>
  );
}

export function Field({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`fd-sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1024"/><stop offset="0.4" stopColor="#3a2040"/><stop offset="0.75" stopColor="#c67844"/><stop offset="1" stopColor="#ffb070"/>
        </linearGradient>
        <linearGradient id={`fd-g-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a4418"/><stop offset="1" stopColor="#1a0c04"/></linearGradient>
      </defs>
      <rect width="1410" height="360" fill={`url(#fd-sky-${id})`}/>
      <rect y="360" width="1410" height="240" fill={`url(#fd-g-${id})`}/>
      <circle cx="460" cy="340" r="42" fill="#ffe0a0" opacity="0.85"/>
      <circle cx="460" cy="340" r="80" fill="#ffb070" opacity="0.2"/>
      <rect y="340" width="1410" height="40" fill="#ffb070" opacity="0.25"/>
      <g fill="#0a0503">
        <ellipse cx="100" cy="348" rx="28" ry="10"/><ellipse cx="260" cy="352" rx="40" ry="12"/>
        <ellipse cx="920" cy="350" rx="32" ry="10"/><ellipse cx="1200" cy="352" rx="50" ry="14"/>
      </g>
      {Array.from({length:240}).map((_,i)=>{const x=(i*37)%1410,y=380+(i*17)%200,h=12+(i%5)*3;return <line key={i} x1={x} y1={y} x2={x+(i%3-1)*1.5} y2={y-h} stroke="#8a5a22" strokeWidth="0.8" opacity={0.5+(i%4)*0.1}/>;})}
      <g transform="translate(720,360)">
        <path d="M -4 -2 L -6 32 L 6 32 L 4 -2 Z" fill="#0a0503"/>
        <circle cx="0" cy="-8" r="6" fill="#0a0503"/>
      </g>
    </svg>
  );
}

export function Lab({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`lb-bg-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a0e10"/><stop offset="1" stopColor="#0a1416"/></linearGradient>
        <radialGradient id={`lb-mon-${id}`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#88c8d4" stopOpacity="0.9"/><stop offset="1" stopColor="#88c8d4" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#lb-bg-${id})`}/>
      <rect x="0" y="380" width="1410" height="220" fill="#050808"/>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x={160+i*280} y="240" width="220" height="140" fill="#0e1a20"/>
          <rect x={168+i*280} y="248" width="204" height="124" fill="#1a2832" opacity="0.9"/>
          <rect x={168+i*280} y="248" width="204" height="124" fill={`url(#lb-mon-${id})`}/>
          {[0,1,2,3,4].map(j=>(<rect key={j} x={168+i*280} y={258+j*20} width="204" height="1" fill="#88c8d4" opacity="0.3"/>))}
        </g>
      ))}
      <g transform="translate(860,360)">
        <path d="M -32 -20 L -38 180 L 38 180 L 32 -20 Q 28 -30 0 -30 Q -28 -30 -32 -20 Z" fill="#050808"/>
        <circle cx="0" cy="-56" r="24" fill="#050808"/>
        <path d="M -32 -20 L -38 180" stroke="#88c8d4" strokeWidth="1.4" opacity="0.7"/>
      </g>
    </svg>
  );
}

export function Bar({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={`br-w-${id}`} cx="0.7" cy="0.4" r="0.5"><stop offset="0" stopColor="#ffb070" stopOpacity="0.45"/><stop offset="1" stopColor="#ffb070" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1410" height="600" fill="#0a0604"/>
      <rect width="1410" height="600" fill={`url(#br-w-${id})`}/>
      {Array.from({length:14}).map((_,i)=>{const x=40+i*100;return <g key={i} opacity="0.85"><rect x={x} y="160" width="24" height="140" fill="#2a180a"/><rect x={x+6} y="140" width="12" height="24" fill="#2a180a"/><rect x={x+22} y="160" width="1.5" height="140" fill="#ffb070" opacity="0.5"/></g>;})}
      <rect x="0" y="300" width="1410" height="3" fill="#3a2010"/>
      <rect x="0" y="300" width="1410" height="90" fill="#1a0c06"/>
      <rect x="0" y="400" width="1410" height="200" fill="#050302"/>
      <rect x="0" y="400" width="1410" height="4" fill="#ffb070" opacity="0.4"/>
      <g transform="translate(280,320)">
        <path d="M -80 60 Q -60 20 -20 10 L 20 10 Q 60 20 80 60 L 80 300 L -80 300 Z" fill="#020100"/>
        <circle cx="0" cy="-30" r="38" fill="#020100"/>
        <path d="M 20 10 Q 60 20 80 60" stroke="#ffb070" strokeWidth="1.5" opacity="0.5" fill="none"/>
      </g>
    </svg>
  );
}

export function Doorway({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={`dw-warm-${id}`} cx="0.5" cy="0.5" r="0.4"><stop offset="0" stopColor="#ffcc88" stopOpacity="0.55"/><stop offset="1" stopColor="#ffcc88" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1410" height="600" fill="#0a0604"/>
      <rect x="540" y="60" width="340" height="540" fill="#1a0c06"/>
      <rect x="560" y="80" width="300" height="520" fill="#2a1808"/>
      <rect x="560" y="80" width="300" height="520" fill={`url(#dw-warm-${id})`}/>
      <polygon points="560,580 860,580 1000,600 420,600" fill="#ffb070" opacity="0.12"/>
      <g transform="translate(710,240)">
        <path d="M -22 0 L -26 340 L 26 340 L 22 0 Q 18 -12 0 -12 Q -18 -12 -22 0 Z" fill="#050302"/>
        <circle cx="0" cy="-40" r="20" fill="#050302"/>
        <path d="M -22 0 L -26 340" stroke="#ffcc88" strokeWidth="1.2" opacity="0.6"/>
        <path d="M 22 0 L 26 340" stroke="#ffcc88" strokeWidth="1.2" opacity="0.6"/>
      </g>
    </svg>
  );
}

export function Dawn({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`dw2-sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1822"/><stop offset="0.55" stopColor="#7a5a4a"/><stop offset="0.85" stopColor="#e0a27a"/><stop offset="1" stopColor="#f4c488"/>
        </linearGradient>
      </defs>
      <rect width="1410" height="420" fill={`url(#dw2-sky-${id})`}/>
      <rect y="420" width="1410" height="180" fill="#140a06"/>
      <rect x="0" y="200" width="180" height="280" fill="#0a0503"/>
      <rect x="180" y="160" width="200" height="320" fill="#100804"/>
      <rect x="380" y="240" width="120" height="240" fill="#0a0503"/>
      <rect x="900" y="180" width="200" height="300" fill="#0a0503"/>
      <rect x="1100" y="220" width="310" height="260" fill="#100804"/>
      {Array.from({length:32}).map((_,i)=>{const x=(i*163)%1410,y=220+((i*41)%200);return <rect key={i} x={x} y={y} width="3" height="4" fill="#ffd48a" opacity={0.5+(i%3)*0.2}/>;})}
      <rect y="460" width="1410" height="140" fill="#050302"/>
      <g transform="translate(820,460)">
        <path d="M -5 -2 L -7 36 L 7 36 L 5 -2 Z" fill="#050302"/>
        <circle cx="0" cy="-10" r="6" fill="#050302"/>
      </g>
    </svg>
  );
}

export function CameraAbstract({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={`ca-${id}`} cx="0.5" cy="0.5" r="0.55"><stop offset="0" stopColor="#ffb5a1" stopOpacity="0.25"/><stop offset="1" stopColor="#cc3300" stopOpacity="0.05"/></radialGradient>
      </defs>
      <rect width="1410" height="600" fill="#080604"/>
      <rect width="1410" height="600" fill={`url(#ca-${id})`}/>
      <g transform="translate(705,300)">
        <circle r="180" fill="none" stroke="#1a0e06" strokeWidth="32"/>
        <circle r="180" fill="none" stroke="#3a1810" strokeWidth="1.5"/>
        <circle r="140" fill="#050302"/>
        {Array.from({length:8}).map((_,i)=>{const a=(i/8)*Math.PI*2,x=Math.cos(a)*80,y=Math.sin(a)*80,x2=Math.cos(a+0.7)*80,y2=Math.sin(a+0.7)*80;return <polygon key={i} points={`0,0 ${x},${y} ${x2},${y2}`} fill="#1a0a06" stroke="#ff7a3a" strokeWidth="0.8" opacity="0.85"/>;})}
        <circle r="20" fill="#ff7a3a" opacity="0.6"/>
        <circle r="8" fill="#ffb5a1"/>
        {Array.from({length:24}).map((_,i)=>{const a=(i/24)*Math.PI*2,x1=Math.cos(a)*210,y1=Math.sin(a)*210,x2=Math.cos(a)*220,y2=Math.sin(a)*220;return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff7a3a" strokeWidth="1" opacity={i%6===0?0.9:0.4}/>;})}
      </g>
    </svg>
  );
}

export function FinalCutScene({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`fc-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a1408"/><stop offset="1" stopColor="#0a0503"/></linearGradient>
        <linearGradient id={`ns-sky-fc-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a0608"/><stop offset="1" stopColor="#2a1614"/></linearGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#fc-${id})`}/>
      <g transform="translate(0,380)">
        <rect width="1410" height="80" fill="#050302"/>
        {Array.from({length:18}).map((_,i)=>(<rect key={i} x={20+i*76} y="10" width="60" height="60" fill="#1a0c06" stroke="#3a2010" strokeWidth="0.5"/>))}
        <rect x="620" y="0" width="2" height="80" fill="#ff7a3a"/>
        <polygon points="615,0 625,0 620,8" fill="#ff7a3a"/>
      </g>
      <g transform="translate(350,60)">
        <rect width="710" height="300" fill="#000"/>
        <rect x="0" y="0" width="710" height="300" fill={`url(#ns-sky-fc-${id})`} opacity="0.8"/>
        <rect x="0" y="120" width="710" height="180" fill="#0a0503"/>
        <rect x="0" y="116" width="710" height="2" fill="#ff7a3a" opacity="0.8"/>
        <rect x="0" y="80" width="180" height="40" fill="#0a0503"/>
        <rect x="520" y="70" width="190" height="50" fill="#0a0503"/>
        <g transform="translate(350,160)">
          <path d="M -12 -40 L -14 100 L 14 100 L 12 -40 Z" fill="#050203"/>
          <circle cx="0" cy="-52" r="9" fill="#050203"/>
        </g>
      </g>
    </svg>
  );
}

export function ScriptToCut({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 1410 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id={`sc-${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0a0604"/><stop offset="0.5" stopColor="#1a0e06"/><stop offset="1" stopColor="#0a0604"/></linearGradient>
        <radialGradient id={`sc-glow-${id}`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ff7a3a" stopOpacity="0.25"/><stop offset="1" stopColor="#ff7a3a" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1410" height="600" fill={`url(#sc-${id})`}/>
      <g transform="translate(140,100)">
        <rect width="340" height="400" fill="#1a120a" opacity="0.9"/>
        <rect x="8" y="8" width="324" height="384" fill="#241808"/>
        {Array.from({length:18}).map((_,i)=>(<rect key={i} x="40" y={40+i*20} width={180+(i%4)*40} height="3" fill="#8a7050" opacity="0.55"/>))}
        <rect x="40" y="40" width="120" height="4" fill="#ff7a3a"/>
        <rect x="40" y="180" width="100" height="4" fill="#ff7a3a"/>
        <rect x="40" y="300" width="140" height="4" fill="#ff7a3a"/>
      </g>
      <g transform="translate(540,300)">
        <path d="M 0 0 L 200 0" stroke="#ff7a3a" strokeWidth="2"/>
        <polygon points="200,-8 220,0 200,8" fill="#ff7a3a"/>
      </g>
      <g transform="translate(780,120)">
        <rect width="500" height="360" fill="#0a0503"/>
        {Array.from({length:12}).map((_,i)=>(<rect key={i} x={20+i*40} y="12" width="20" height="14" fill="#050302"/>))}
        {[0,1,2].map(i=>(
          <g key={i} transform={`translate(${30+i*158},40)`}>
            <rect width="140" height="280" fill="#1a0e06"/>
            <rect x="4" y="4" width="132" height="272" fill="#2a1808"/>
            <g transform="translate(70,160)">
              <path d="M -8 -20 L -10 80 L 10 80 L 8 -20 Z" fill="#050302"/>
              <circle cx="0" cy="-30" r="6" fill="#050302"/>
            </g>
            <rect x="4" y="4" width="132" height="272" fill={`url(#sc-glow-${id})`} opacity="0.6"/>
          </g>
        ))}
      </g>
    </svg>
  );
}

const kindMap: Record<string, (props: { id: string }) => React.ReactNode> = {
  noir_street: NoirStreet,
  diner: Diner,
  warehouse: Warehouse,
  harbor: Harbor,
  train: Train,
  theatre: Theatre,
  field: Field,
  lab: Lab,
  bar: Bar,
  doorway: Doorway,
  dawn: Dawn,
  camera_abstract: CameraAbstract,
  final_cut: FinalCutScene,
  script_to_cut: ScriptToCut,
};

export function pickKind(slug: string): string {
  const s = slug.toUpperCase();
  if (/NIGHT CALL|ROOM|NIGHT|RETURNS/.test(s)) return 'noir_street';
  if (/SIGNAL|LAB|TEST/.test(s)) return 'lab';
  if (/LONG ROAD|IVY|DAWN/.test(s)) return 'dawn';
  if (/EVERY STREET|DOC|NORTH|FIELD/.test(s)) return 'field';
  if (/COPPER|HARBOR|PIER|DUSK/.test(s)) return 'harbor';
  if (/CALLBACK|THEATRE|STAGE/.test(s)) return 'theatre';
  if (/TRANSIT|TRAIN/.test(s)) return 'train';
  if (/BAR|LAST CALL/.test(s)) return 'bar';
  if (/DOORWAY/.test(s)) return 'doorway';
  if (/WAREHOUSE|DUST|SHAFT/.test(s)) return 'warehouse';
  if (/LINE|SHOT|01A|02B|03C/.test(s)) return 'diner';
  if (/SCRIPT|CUT|EFFICIENCY/.test(s)) return 'script_to_cut';
  if (/BLOCK|CAMERA|OVERRIDE|CONTROL/.test(s)) return 'camera_abstract';
  if (/CONTINUITY|PROTAGONIST/.test(s)) return 'warehouse';
  if (/FINAL|ASSEMBLY|RENDER/.test(s)) return 'final_cut';
  if (/TILE|FRAME/.test(s)) return 'diner';
  return 'noir_street';
}

let _uid = 0;

interface StillProps {
  scene?: string;
  slug?: string;
  genre?: string;
  tone?: string;
  kind?: string;
  sid?: string;
}

export function Still({ scene = '', slug = '', genre = '', tone, kind = 'noir_street', sid }: StillProps) {
  const uid = sid || `s${++_uid}`;
  const SceneComp = kindMap[kind] || NoirStreet;
  return (
    <div className="still-v2">
      <div className="still-art"><SceneComp id={uid} /></div>
      <div className="still-grain" />
      <div className="still-vignette" />
      <div className="still-slate">{slug ? `/ ${slug}` : ''}</div>
      {scene && (
        <div className="still-meta">
          <span className="dot" />
          <span>{scene}</span>
          {genre && <><span>·</span><span>{genre}</span></>}
        </div>
      )}
      {tone && <div className="still-meta tr"><span>{tone}</span></div>}
    </div>
  );
}

export function FilmStill(props: StillProps) {
  const k = props.kind || pickKind(props.slug || '');
  return <Still {...props} kind={k} />;
}
