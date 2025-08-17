import React, { useEffect, useState, useMemo } from 'react'; // Import useMemo
import './IntroAnimation.css';
import Hyperspeed from './HyperSpeed';
import { HyperSpeedPresets } from './HyperSpeedPresets';

// Step 1: Create a memoized version of the Hyperspeed component.
const MemoizedHyperspeed = React.memo(Hyperspeed);

const leftMenu = [
  'LOADING YOUR PERSONAL TOUR...',
  'CURATING PROJECT HIGHLIGHTS...',
  'GATHERING CUTE CAT PHOTOS...',
  'LOADING ANIMATED COMPONENTS ...',
  'PREPARING A UNIQUE EXPERIENCE...',
  'ALMOST READY TO INSPIRE...'
];

const rightText =
  'YOUR PERSONALIZED PORTFOLIO EXPERIENCE IS LOADING. THANKS FOR STOPPING BY! I BUILT THIS PAGE FOR BOTH RECRUITERS AND FOR ANYONE WHO WANTS TO LEARN MORE ABOUT ME!';
const centerDoneText = '( DONE )';
const centerFinalText = "HELLO, I'M REAGAN! WELCOME TO MY SITE! ";

// Calculate synchronized animation speeds
const TOTAL_ANIMATION_DURATION = 3500; // ms, adjust for desired total duration
const SYNCED_HIGHLIGHT_DELAY = TOTAL_ANIMATION_DURATION / (leftMenu.length - 1);
const SYNCED_TYPING_SPEED = TOTAL_ANIMATION_DURATION / rightText.length;
const PERCENTAGE_TOTAL_DURATION = TOTAL_ANIMATION_DURATION * 1.2;
const PERCENTAGE_SPEED = PERCENTAGE_TOTAL_DURATION / 100;
const FINAL_FADE_DELAY = 1700;


const IntroAnimation = ({ onFinish }: { onFinish: () => void }) => {
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [typedRight, setTypedRight] = useState('');
  const [showCenterDone, setShowCenterDone] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [finalTextIdx, setFinalTextIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(false); // New state for fade-in
  const [lastTapTime, setLastTapTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Step 2: Memoize the options object so its reference is stable across re-renders.
  const hyperspeedOptions = useMemo(() => ({ ...HyperSpeedPresets.one }), []);

  // Detect if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isTouchDevice && isMobileAgent);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Skip animation function
  const skipAnimation = () => {
    setFadeOut(true);
    setTimeout(() => onFinish(), 0);
  };

  // Handle spacebar press for desktop
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !fadeOut) {
        e.preventDefault();
        skipAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [fadeOut]);

  // Handle double tap for mobile
  const handleTouchEnd = () => {
    const currentTime = Date.now();
    const tapGap = currentTime - lastTapTime;
    
    if (tapGap < 300 && tapGap > 0 && !fadeOut) {
      skipAnimation();
    }
    
    setLastTapTime(currentTime);
  };

  // Fade-in effect on mount
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 800); // 800ms delay 
    return () => clearTimeout(timer);
  }, []);

  // Only start the rest of the animation after fade-in
  useEffect(() => {
    if (!fadeIn) return;
    if (highlightIdx < leftMenu.length - 1) {
      const timer = setTimeout(() => setHighlightIdx(highlightIdx + 1), SYNCED_HIGHLIGHT_DELAY);
      return () => clearTimeout(timer);
    }
  }, [highlightIdx, fadeIn]);

  useEffect(() => {
    if (!fadeIn) return;
    if (percentage < 100) {
      const timer = setTimeout(() => setPercentage(percentage + 1), PERCENTAGE_SPEED);
      return () => clearTimeout(timer);
    } else if (!showCenterDone) {
      setTimeout(() => setShowCenterDone(true), 400);
    }
  }, [percentage, showCenterDone, fadeIn]);

  useEffect(() => {
    if (!fadeIn) return;
    if (typedRight.length < rightText.length) {
      const timer = setTimeout(() => setTypedRight(rightText.slice(0, typedRight.length + 1)), SYNCED_TYPING_SPEED);
      return () => clearTimeout(timer);
    }
  }, [typedRight, fadeIn]);

  useEffect(() => {
    if (!fadeIn) return;
    if (showCenterDone && highlightIdx === leftMenu.length - 1 && typedRight.length === rightText.length) {
      setTimeout(() => setShowFinalText(true), FINAL_FADE_DELAY);
    }
  }, [showCenterDone, highlightIdx, typedRight, fadeIn]);

  useEffect(() => {
    if (!fadeIn) return;
    if (showFinalText && finalTextIdx < centerFinalText.length) {
      const timer = setTimeout(() => setFinalTextIdx(finalTextIdx + 1), SYNCED_TYPING_SPEED);
      return () => clearTimeout(timer);
    }
    if (showFinalText && finalTextIdx === centerFinalText.length) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 700);
      const finishTimer = setTimeout(() => onFinish(), 1300);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [showFinalText, finalTextIdx, onFinish, fadeIn]);

  return (
    <div 
      className={`intro-overlay${fadeOut ? ' fade-out' : ''}${fadeIn ? ' fade-in' : ''}`} 
      style={{ background: 'black', position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}
      onTouchEnd={handleTouchEnd}
    >
      {/* Use the memoized component with the memoized props */}
      <MemoizedHyperspeed effectOptions={hyperspeedOptions} />
      
      <div style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', top: 0, left: 0 }}>
        {/* Skip hint */}
        {!fadeOut && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.9rem',
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textAlign: 'center',
            zIndex: 10,
          }}>
            {isMobile ? 'Double tap to skip' : 'Press SPACE to skip'}
          </div>
        )}
        {!showFinalText ? (
          <div className="intro-terminal">
            <div className="intro-left">
              {leftMenu.map((item, idx) => (
                <div
                  key={item}
                  className={`intro-left-item${idx === highlightIdx ? ' highlighted' : ''}`}
                >
                  {'// ' + item}
                </div>
              ))}
            </div>
            <div className="intro-center">
              {showCenterDone ? centerDoneText : `${percentage} %`}
            </div>
            <div className="intro-right">
              {'// ' + typedRight}
            </div>
          </div>
        ) : (
          <div className="intro-final-viewport">
            <div style={{ width: '100%', textAlign: 'center', fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.08em', fontSize: '2.2rem', marginTop: 0 }}>
              {centerFinalText.toUpperCase().split('').map((char, i) => (
                <span key={i} style={{ opacity: i < finalTextIdx ? 1 : 0 }}>{char}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;