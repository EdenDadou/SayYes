const BackgroundLueur = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      width: "100%",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      overflow: "hidden",
      willChange: "transform",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
      perspective: "1000px",
      isolation: "isolate",
      zIndex: 0,
    }}
    {...props}
  >
    <style>
      {`
        @keyframes float1 {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg); 
            filter: blur(2px) brightness(1);
          }
          50% { 
            transform: translateY(-15px) scale(1.05) rotate(1deg); 
            filter: blur(4px) brightness(1.2);
          }
        }
        
        @keyframes float2 {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg); 
            filter: blur(1.5px) brightness(1);
          }
          50% { 
            transform: translateY(20px) scale(0.95) rotate(-1deg); 
            filter: blur(3px) brightness(1.1);
          }
        }
        
        @keyframes float3 {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg); 
            filter: blur(2.5px) brightness(1);
          }
          50% { 
            transform: translateY(-10px) scale(1.02) rotate(0.5deg); 
            filter: blur(4.5px) brightness(1.15);
          }
        }
        
        .glow-band {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            #00FF88 0%,
            #00D4FF 30%,
            #8B5FBF 60%,
            #FF6B9D 100%
          );
          clip-path: path('M0,80 Q20,60 40,70 Q60,50 80,60 Q100,40 120,50 Q140,30 160,40 Q180,20 200,30 Q220,10 240,20 Q260,0 280,10 Q300,-10 320,0 Q340,10 360,20 Q380,30 400,40 Q420,50 440,60 Q460,70 480,80 Q500,90 520,100 Q540,110 560,120 Q580,130 600,140 Q620,150 640,160 Q660,170 680,180 Q700,190 720,200 Q740,210 760,220 Q780,230 800,240 Q820,250 840,260 Q860,270 880,280 Q900,290 920,300 Q940,310 960,320 Q980,330 1000,340 L1000,100 L0,100 Z');
          filter: blur(60px) brightness(1.5);
          animation: float1 12s ease-in-out infinite;
          will-change: transform, filter;
          transform-origin: center;
          opacity: 0.9;
        }
        
        .glow-band::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            #00FF88 0%,
            #00D4FF 30%,
            #8B5FBF 60%,
            #FF6B9D 100%
          );
          clip-path: path('M0,80 Q20,60 40,70 Q60,50 80,60 Q100,40 120,50 Q140,30 160,40 Q180,20 200,30 Q220,10 240,20 Q260,0 280,10 Q300,-10 320,0 Q340,10 360,20 Q380,30 400,40 Q420,50 440,60 Q460,70 480,80 Q500,90 520,100 Q540,110 560,120 Q580,130 600,140 Q620,150 640,160 Q660,170 680,180 Q700,190 720,200 Q740,210 760,220 Q780,230 800,240 Q820,250 840,260 Q860,270 880,280 Q900,290 920,300 Q940,310 960,320 Q980,330 1000,340 L1000,100 L0,100 Z');
          filter: blur(80px) brightness(1.8);
          opacity: 0.6;
          animation: float2 15s ease-in-out infinite;
        }
        
        .glow-band::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            #00FF88 0%,
            #00D4FF 30%,
            #8B5FBF 60%,
            #FF6B9D 100%
          );
          clip-path: path('M0,80 Q20,60 40,70 Q60,50 80,60 Q100,40 120,50 Q140,30 160,40 Q180,20 200,30 Q220,10 240,20 Q260,0 280,10 Q300,-10 320,0 Q340,10 360,20 Q380,30 400,40 Q420,50 440,60 Q460,70 480,80 Q500,90 520,100 Q540,110 560,120 Q580,130 600,140 Q620,150 640,160 Q660,170 680,180 Q700,190 720,200 Q740,210 760,220 Q780,230 800,240 Q820,250 840,260 Q860,270 880,280 Q900,290 920,300 Q940,310 960,320 Q980,330 1000,340 L1000,100 L0,100 Z');
          filter: blur(100px) brightness(2.0);
          opacity: 0.4;
          animation: float3 18s ease-in-out infinite;
        }
      `}
    </style>

    {/* Bande lumineuse courbe avec effet de glow */}
    <div className="glow-band" />
  </div>
);

export default BackgroundLueur;
