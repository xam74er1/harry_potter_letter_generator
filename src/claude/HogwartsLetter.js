import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { useLocation } from 'react-router-dom';

const ClaudeHogwartsLetter = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [userName, setUserName] = useState({ first: 'Harry', last: 'Potter' });

const [letterContent, setLetterContent] = useState('');
const [userData, setUserData] = useState({
      firstName: 'Harry',
      lastName: 'Potter',
      signature: 'Minerva McGonagall'
    });
  
    const location = useLocation();
  useEffect(() => {
    // Get parameters from URL
    
    const urlParams = new URLSearchParams(location.search);
    const firstName = urlParams.get('firstName') || urlParams.get('first');
    const lastName = urlParams.get('lastName') || urlParams.get('last');
    
    if (firstName || lastName) {
      setUserName({
        first: firstName || 'Harry',
        last: lastName || 'Potter'
      });
    }
  }, []);

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const firstName = urlParams.get('firstName') || 'Harry';
      const lastName = urlParams.get('lastName') || 'Potter';
      const signature = urlParams.get('signature') || 'Minerva McGonagall';
      const rawContent = urlParams.get('content');
  
      const defaultContent = `
  # Welcome, $fname $lname!
  
  We are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry.
  
  Please find enclosed a list of all necessary books and equipment.
  
  Yours sincerely,
  
  $signature
      `.trim();
  
      const contentToUse = rawContent || defaultContent;
  
      const replacedContent = contentToUse
        .replace(/\$fname/g, firstName)
        .replace(/\$lname/g, lastName)
        .replace(/\$signature/g, signature);
  
      setUserData({ firstName, lastName, signature });
      setLetterContent(replacedContent);
    }, []);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      // Show letter after envelope opens
      setTimeout(() => {
        setShowLetter(true);
      }, 600);
    }
  };

  const resetLetter = () => {
    setShowLetter(false);
    setIsOpened(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Cinzel:wght@400;600;700&display=swap');
        
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
        
        .envelope-container:hover:not(.opened) {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
        
        .envelope-wrapper {
          position: relative;
          overflow: hidden;
          padding-top: 70%;
          background: linear-gradient(0deg, #e8d5a6 0%, #e8d5a6 100%, rgba(244, 229, 193, 0) 55%, rgba(244, 229, 193, 0) 100%);
          width: 100%;
          animation: ${!isOpened ? 'float 4s ease-in-out infinite' : 'none'};
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          border: 2px solid #8b6914;
        }
        
        .envelope-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(139, 105, 20, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 105, 20, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        /* Top flap that opens */
        .envelope-top {
          filter: drop-shadow(0px 6px 3px rgba(50, 50, 0, 0.2));
          position: absolute;
          width: 100%;
          height: 33%;
          top: 0%;
          z-index: 99;
          transition: all 0.4s ease-in-out;
          transform-origin: top;
          transform: ${isOpened ? 'rotateX(-180deg)' : 'rotateX(0deg)'};
        }
        
        .envelope-top::before {
          content: '';
          position: absolute;
          transform-origin: top;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #d4c294 0%, #c7b885 50%, #b8a776 100%);
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          transition: all 0.4s ease-in-out;
          border: 2px solid #8b6914;
          border-bottom: none;
        }
        
        /* Wax seal */
        .wax-seal {
          position: absolute;
          bottom: -5px;
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
        
        /* Address on envelope */
        .address {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          font-family: 'Cinzel', serif;
          color: #2c1810;
          z-index: 5;
        }
        
        /* Letter that slides out */
        .letter-paper {
          position: absolute;
          top: 15%;
          left: 8%;
          right: 8%;
          bottom: 15%;
          background: linear-gradient(145deg, #faf5e4 0%, #f5e6d3 30%, #f0dcc4 70%, #ebceb0 100%);
          border: 1px solid #d4c294;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transform: ${showLetter ? 'translateY(-30px) scale(1.1)' : 'translateY(0) scale(1)'};
          opacity: ${showLetter ? '1' : '0'};
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
        
        /* Letter content */
        .parchment {
          padding: 20px 15px 15px 15px;
          height: 100%;
          position: relative;
          font-family: 'Kalam', cursive;
          color: #2c1810;
          line-height: 1.4;
          overflow-y: auto;
        }
        
        .hogwarts-header {
          text-align: center;
          margin-bottom: 15px;
          font-family: 'Cinzel', serif;
        }
        
        .hogwarts-crest {
          width: 35px;
          height: 35px;
          margin: 0 auto 8px;
          background: radial-gradient(circle, #8b0000 0%, #660000 70%, #4d0000 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #ffd700;
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        }
        
        .letter-content {
          font-size: 11px;
          font-family: 'Kalam', cursive;
        }
        
        .signature {
          margin-top: 15px;
          text-align: right;
          font-family: 'Kalam', cursive;
          font-size: 12px;
        }
        
        /* Full screen letter view */
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
          max-height: 85vh;
          padding: 40px;
          border: 2px solid #d4c294;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          overflow-y: auto;
          position: relative;
          animation: letterSlideIn 0.5s ease-out;
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
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffd700;
          font-family: 'Cinzel', serif;
          text-align: center;
          animation: pulse 2s ease-in-out infinite;
          font-size: 14px;
          white-space: nowrap;
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
        {/* Animated stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="stars"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          padding: '20px'
        }}>
          <div 
            className={`envelope-container ${isOpened ? 'opened' : ''}`}
            onClick={handleEnvelopeClick}
          >
            <div className="envelope-wrapper">
              {/* Address on envelope body */}
              <div className="address">
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Mr. {userName.first[0]}. {userName.last}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  The Cupboard under the Stairs<br/>
                  4 Privet Drive<br/>
                  Little Whinging<br/>
                  Surrey
                </div>
              </div>
              
              {/* Letter inside envelope */}
              <div className="letter-paper">
                <div className="parchment">
                  <div className="hogwarts-header">
                    <div className="hogwarts-crest">⚡</div>
                    <h1 style={{ fontSize: '14px', margin: '0 0 3px 0', fontWeight: '700' }}>
                      HOGWARTS SCHOOL
                    </h1>
                    <p style={{ fontSize: '10px', margin: '0 0 10px 0', fontWeight: '400' }}>
                      of WITCHCRAFT and WIZARDRY
                    </p>
                  </div>
                  
                  <div className="letter-content">
                    <p style={{ marginBottom: '8px', textAlign: 'right', fontSize: '9px' }}>
                      Headmaster: Albus Dumbledore
                    </p>
                    
                    <p style={{ marginBottom: '8px' }}>Dear Mr. {userName.last},</p>
                    
                    <p style={{ marginBottom: '8px' }}>
                      We are pleased to inform you that you have been accepted at 
                      Hogwarts School of Witchcraft and Wizardry.
                    </p>
                    
                    <p style={{ marginBottom: '8px' }}>
                      Term begins on 1 September.
                    </p>
                    
                    <p style={{ marginBottom: '10px' }}>Yours sincerely,</p>
                    
                    <div className="signature">
                      <p style={{ fontSize: '12px', margin: '0 0 2px 0', fontWeight: '700' }}>
                        Minerva McGonagall
                      </p>
                      <p style={{ fontSize: '9px', margin: '0', fontStyle: 'italic' }}>
                        Deputy Headmistress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Top flap that opens */}
              <div className="envelope-top">
                <div className="wax-seal">H</div>
              </div>
            </div>
            
            {!isOpened && (
              <div className="click-hint">
                ✨ Click to open your Hogwarts letter ✨
              </div>
            )}
          </div>
        </div>
        
        {/* Full screen letter when opened */}
        {showLetter && (
          <div className="full-letter" onClick={(e) => e.target.className === 'full-letter' && resetLetter()}>
            <div className="full-letter-content">
              <div className="hogwarts-header">
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  margin: '0 auto 15px',
                  background: 'radial-gradient(circle, #8b0000 0%, #660000 70%, #4d0000 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#ffd700',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                }}>⚡</div>
                <h1 style={{ fontSize: '24px', margin: '0 0 8px 0', fontWeight: '700' }}>
                  HOGWARTS SCHOOL
                </h1>
                <p style={{ fontSize: '16px', margin: '0 0 20px 0', fontWeight: '400' }}>
                  of WITCHCRAFT and WIZARDRY
                </p>
                <div style={{ width: '100px', height: '2px', background: '#8b6914', margin: '0 auto 20px' }}></div>
              </div>
              
              <div style={{ fontSize: '18px', fontFamily: 'Kalam, cursive', color: '#2c1810', lineHeight: '1.6' }}>
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