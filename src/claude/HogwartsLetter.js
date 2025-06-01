import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { useLocation } from 'react-router-dom';


const ClaudeHogwartsLetter = () => {
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [userName, setUserName] = useState({ first: 'Harry', last: 'Potter' });
  const [letterContent, setLetterContent] = useState('');
  const [userData, setUserData] = useState({
      firstName: 'Harry',
      lastName: 'Potter',
      signature: 'Minerva McGonagall'
    });
  
  // New states for animations and URL parameters
  const [startFloating, setStartFloating] = useState(false);
  const [startJello, setStartJello] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoSize, setLogoSize] = useState(60);
  const [address, setAddress] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  useEffect(() => {
    // Timer to trigger the jello animation after the fly-in animation completes
    const jelloTimer = setTimeout(() => {
      setStartJello(true);
    }, 1000); // This duration should match the flyIn animation duration (1s)
    
    // Timer to trigger the floating animation after jello completes
    const floatTimer = setTimeout(() => {
      setStartFloating(true);
    }, 1800); // flyIn (1s) + jello (0.8s)
    
    return () => {
      clearTimeout(jelloTimer);
      clearTimeout(floatTimer);
    };
  }, []);

  useEffect(() => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(location.search);
    const firstNameFromUrl = urlParams.get('firstName') || urlParams.get('first');
    const lastNameFromUrl = urlParams.get('lastName') || urlParams.get('last');
    const signature = urlParams.get('signature') || 'Minerva McGonagall';
    const rawContent = urlParams.get('content');
    const rawAddress = urlParams.get('address');
    const rawLogoUrl = urlParams.get('logoUrl');
    const rawLogoSize = urlParams.get('logoSize');
    const rawTitle = urlParams.get('title');

    console.log(urlParams);
    console.log(location.search);
    
    
    
    // Set user name for envelope address
    if (firstNameFromUrl || lastNameFromUrl) {
      setUserName({
        first: firstNameFromUrl || 'Harry',
        last: lastNameFromUrl || 'Potter'
      });
    }

    // Set logo URL and size
    if (rawLogoUrl) {
      setLogoUrl(decodeURIComponent(rawLogoUrl));
    }
    if (rawLogoSize) {
      setLogoSize(parseInt(rawLogoSize) || 60);
    }

    // Set custom title
    if (rawTitle) {
      setCustomTitle(decodeURIComponent(rawTitle));
    }

    // Set address - use URL parameter if provided, otherwise use default
    if (rawAddress) {
      setAddress(decodeURIComponent(rawAddress).replace(/\\n/g, '\n'));
    } else {
      setAddress('The Cupboard under the Stairs\n4 Privet Drive\nLittle Whinging\nSurrey');
    }

    // Set letter content
    const firstName = firstNameFromUrl || 'Harry';
    const lastName = lastNameFromUrl || 'Potter';

    const defaultContent = `
# Welcome, $fname $lname!

We are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry.

Please find enclosed a list of all necessary books and equipment.

Term begins on 1 September. We await your owl by no later than 31 July.

Yours sincerely,

$signature
    `.trim();

    const contentToUse = rawContent ? decodeURIComponent(rawContent) : defaultContent;

    const replacedContent = contentToUse
      .replace(/\$fname/g, firstName)
      .replace(/\$lname/g, lastName)
      .replace(/\$signature/g, signature);

    setUserData({ firstName, lastName, signature }); 
    setLetterContent(replacedContent);
  }, []);

  const handleEnvelopeClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    } else if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => {
        setShowLetter(true);
      }, 600); 
    }
  };

  const resetLetter = () => {
    setShowLetter(false);
    setTimeout(() => {
      setIsOpened(false);
      setTimeout(() => {
        setIsFlipped(false);
      }, 400);
    }, 300);
  };

  const renderTitle = () => {
    if (customTitle) {
      return (
        <h2 style={{ fontSize: '12px', margin: '0 0 8px 0', fontWeight: '700' }}>
          {customTitle}
        </h2>
      );
    } else {
      return (
        <>
          <h2 style={{ fontSize: '12px', margin: '0 0 2px 0', fontWeight: '700' }}>
            HOGWARTS SCHOOL
          </h2>
          <p style={{ fontSize: '8px', margin: '0 0 8px 0', fontWeight: '400' }}>
            of WITCHCRAFT and WIZARDRY
          </p>
        </>
      );
    }
  };

  const renderFullLetterTitle = () => {
    if (customTitle) {
      return (
        <h1 style={{ fontSize: '28px', margin: '0 0 15px 0', fontWeight: '700' }}>
          {customTitle}
        </h1>
      );
    } else {
      return (
        <>
          <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: '700' }}>
            HOGWARTS SCHOOL
          </h1>
          <p style={{ fontSize: '18px', margin: '0 0 15px 0', fontWeight: '400' }}>
            of WITCHCRAFT and WIZARDRY
          </p>
        </>
      );
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Cinzel:wght@400;600;700&display=swap');
        
        /* --- ANIMATION KEYFRAMES --- */
        @keyframes flyIn {
          0%   {
            transform: translate(1000px, -100px) rotate(-40deg) scale(.3);
            opacity: 0;
          }
          60% { 
            transform: translate(-50px, -50px) rotate(40deg) scale(.5);
            opacity: 0.7;
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes jelloHorizontal {
          0% { 
            transform: scale3d(1, 1, 1); 
          }
          30% { 
            transform: scale3d(1.25, 0.75, 1); 
          }
          40% { 
            transform: scale3d(0.75, 1.25, 1); 
          }
          50% { 
            transform: scale3d(1.15, 0.85, 1); 
          }
          65% { 
            transform: scale3d(0.95, 1.05, 1); 
          }
          75% { 
            transform: scale3d(1.05, 0.95, 1); 
          }
          100% { 
            transform: scale3d(1, 1, 1); 
          }
        }
        
        .magical-bg {
          background: linear-gradient(135deg, #1a1c3a 0%, #2d1b69 50%, #000000 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .stars {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #ffd700;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .envelope-container {
          perspective: 1200px;
          cursor: pointer;
          position: relative;
          max-width: 100%;
          width: 400px;
        }
        
        .animate-fly-in {
          animation: flyIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; 
        }

        .animate-jello {
          animation: jelloHorizontal 0.8s ease-in-out forwards;
        }
        
        .envelope-container:hover:not(.flipped):not(.opened) {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
        
        .envelope-flipper {
          position: relative;
          width: 100%;
          height: 0; 
          padding-top: 70%; 
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
        }
        
        .envelope-face {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden; 
          background: linear-gradient(0deg, #e8d5a6 0%, #e8d5a6 100%, rgba(244, 229, 193, 0) 55%, rgba(244, 229, 193, 0) 100%);
          animation: ${startFloating && !isFlipped && !isOpened ? 'float 4s ease-in-out infinite' : 'none'};
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          border: 2px solid #8b6914; 
          overflow: hidden; 
        }
        
        .envelope-face::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(139, 105, 20, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 105, 20, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .envelope-back {
          transform: rotateY(0deg);
        }
        
        .envelope-front {
          transform: rotateY(180deg);
        }
        
        .envelope-back .address {
          position: absolute;
          top: 50%; 
          left: 50%;
          transform: translate(-50%, -50%); 
          text-align: center;
          font-family: 'Cinzel', serif;
          color: #2c1810; 
          z-index: 5; 
          display: block; 
          padding: 10px; 
          line-height: 1.5; 
        }
        
        .envelope-front .address {
          display: none;
        }
        
        .envelope-back .back-seal {
          position: absolute;
          top: 35%; 
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 45px;
          height: 45px;
          background: radial-gradient(circle, #8b0000 0%, #660000 70%, #4d0000 100%); 
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: #ffd700; 
          font-size: 18px;
          z-index: 10; 
        }
        
        .envelope-front .back-seal {
          display: none;
        }

        .envelope-top {
          filter: drop-shadow(0px 6px 3px rgba(50, 50, 0, 0.2));
          position: absolute;
          width: 100%;
          height: 50%; 
          top: 0%;
          z-index: 99; 
          transition: transform 0.4s ease-in-out; 
          transform-origin: top;
          transform: ${isOpened ? 'rotateX(-170deg)' : 'rotateX(0deg)'}; 
        }
        
        .envelope-top::before { 
          content: '';
          position: absolute;
          transform-origin: top;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #d4c294 0%, #c7b885 50%, #b8a776 100%); 
          clip-path: polygon(50% 100%, 0 0, 100% 0); 
          border: 2px solid #8b6914;
          border-bottom: none; 
          box-sizing: border-box;
        }

        .envelope-back .envelope-top {
            display: none;
        }
        .envelope-front .envelope-top {
            display: block; 
        }
        
        .wax-seal { 
          position: absolute;
          bottom: 10px; 
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 35px;
          background: radial-gradient(circle, #8b0000 0%, #660000 70%, #4d0000 100%);
          border-radius: 50%;
          box-shadow: 0 3px 10px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: #ffd700;
          font-size: 16px;
          z-index: 100; 
        }
        
        .letter-paper {
          position: absolute;
          top: 5%; 
          left: 5%;
          right: 5%;
          height: 90%; 
          background: linear-gradient(145deg, #faf5e4 0%, #f5e6d3 30%, #f0dcc4 70%, #ebceb0 100%); 
          border: 1px solid #d4c294;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transform: ${isOpened ? (showLetter ? 'translateY(-10px) scale(1.05)' : 'translateY(20%) scale(0.95)') : 'translateY(30%) scale(0.9)'};
          opacity: ${isOpened && showLetter ? '1' : '0'};
          visibility: ${isOpened ? 'visible' : 'hidden'};
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s, opacity 0.5s ease-out 0.2s, visibility 0s linear ${isOpened ? 0 : 0.7}s; 
          z-index: 50; 
          overflow: hidden;
        }
        
        .letter-paper::before { 
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(139, 105, 20, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 105, 20, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .parchment {
          padding: 15px 10px; 
          height: 100%;
          position: relative;
          font-family: 'Kalam', cursive;
          color: #2c1810;
          line-height: 1.3; 
          overflow-y: auto; 
          font-size: 9px; 
        }
        
        .hogwarts-header { 
          text-align: center;
          margin-bottom: 10px;
          font-family: 'Cinzel', serif;
        }
        
        .hogwarts-crest { 
          width: 30px; 
          height: 30px;
          margin: 0 auto 5px;
          background: radial-gradient(circle, #8b0000 0%, #660000 70%, #4d0000 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px; 
          color: #ffd700;
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        }
        
        .letter-content { 
          font-family: 'Kalam', cursive;
        }
        
        .signature { 
          margin-top: 10px;
          text-align: right;
          font-family: 'Kalam', cursive;
          font-size: 10px; 
        }
        
        .full-letter {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9); 
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000; 
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }
        
        .full-letter-content {
          background: linear-gradient(145deg, #faf5e4 0%, #f5e6d3 30%, #f0dcc4 70%, #ebceb0 100%);
          max-width: 600px;
          width: 90%;
          max-height: 85vh;
          padding: 30px 40px; 
          border: 2px solid #d4c294;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          overflow-y: auto;
          position: relative;
          animation: letterSlideIn 0.5s ease-out;
          font-family: 'Kalam', cursive; 
          color: #2c1810;
          line-height: 1.6;
        }
        
        .full-letter-content::before { 
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(139, 105, 20, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 105, 20, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .full-letter-content h1 {
          font-family: 'Cinzel', serif;
          text-align: center;
          font-size: 22px; 
          margin-bottom: 15px;
        }
        .full-letter-content p {
          margin-bottom: 1em;
          font-size: 17px; 
        }
        
        .reset-btn, .close-btn {
          background: linear-gradient(145deg, #8b0000 0%, #660000 50%, #4d0000 100%);
          color: #ffd700;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          margin: 10px;
        }
        
        .reset-btn:hover, .close-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        }
        
        .click-hint {
          position: absolute;
          bottom: -70px; 
          left: 50%;
          transform: translateX(-50%);
          color: #ffd700;
          font-family: 'Cinzel', serif;
          text-align: center;
          animation: pulse 2s ease-in-out infinite;
          font-size: 14px;
          white-space: nowrap;
          z-index: 10; 
          padding: 5px;
        }

        .custom-logo {
          max-width: ${logoSize}px;
          height: auto;
          margin: 0 auto 15px;
          display: block;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(0.5deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-0.5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes letterSlideIn {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
      `}</style>
      
      <div className="magical-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="stars"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `scale(${0.5 + Math.random() * 0.8})`
            }}
          />
        ))}
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          padding: '20px'
        }}>
          <div 
            className={`envelope-container animate-fly-in ${startJello ? 'animate-jello' : ''} ${isFlipped ? 'flipped' : ''} ${isOpened ? 'opened' : ''}`}
            onClick={handleEnvelopeClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleEnvelopeClick()}
          >
            <div className="envelope-flipper">
              {/* Back of envelope */}
              {!isFlipped && (
              <div className="envelope-face envelope-back">
                <div className="address">
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Mr. {userName.first.charAt(0).toUpperCase()}. {userName.last}
                  </div>
                  <div style={{ fontSize: '13px', whiteSpace: 'pre-line' }}>
                    {address}
                  </div>
                </div>
              </div>
              )}
              
              {/* Front of envelope */}
              {isFlipped && (
              <div className="envelope-face envelope-front">
                <div className="letter-paper">
                  <div className="parchment">
                    <div className="hogwarts-header">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="custom-logo" />
                      ) : (
                        <div className="hogwarts-crest">⚡</div>
                      )}
                      {renderTitle()}
                    </div>
                    <div className="letter-content">
                       <ReactMarkdown>{letterContent.substring(0, 200) + "..."}</ReactMarkdown> 
                    </div>
                  </div>
                </div>
                
                <div className="envelope-top">
                  <div className="wax-seal">H</div>
                </div>
              </div>
              )}
            </div>
            
            {!isOpened && (
                !isFlipped ? (
                <div className="click-hint">
                    ✨ Click to flip your Hogwarts letter ✨
                </div>
                ) : (
                <div className="click-hint">
                    ✨ Click again to open the envelope ✨
                </div>
                )
            )}
          </div>
        </div>
        
        {showLetter && (
          <div className="full-letter" onClick={(e) => { if (e.target === e.currentTarget) resetLetter(); }}>
            <div className="full-letter-content">
              <div className="hogwarts-header" style={{ fontFamily: 'Cinzel, serif', color: '#2c1810' }}>
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" style={{ 
                    maxWidth: `${logoSize}px`, 
                    height: 'auto', 
                    margin: '0 auto 15px',
                    display: 'block',
                    borderRadius: '8px',
                  }} />
                ) : (
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    margin: '0 auto 15px',
                    background: 'radial-gradient(circle, #8b0000 0%, #660000 70%, #4d0000 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    color: '#ffd700',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                  }}>⚡</div>
                )}
                {renderFullLetterTitle()}
                <div style={{ width: '120px', height: '2px', background: '#8b6914', margin: '0 auto 25px' }}></div>
              </div>
              
              <div className="letter-text-content">
                <ReactMarkdown>{letterContent}</ReactMarkdown>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button className="close-btn" onClick={resetLetter}>
                  ✉️ Close Letter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClaudeHogwartsLetter;