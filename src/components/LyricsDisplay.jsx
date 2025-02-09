import { useEffect, useRef } from 'react';

const LyricsDisplay = ({ lyrics, currentLineIndex }) => {
  const lyricsRef = useRef(null);
  const activeLineRef = useRef(null);

  useEffect(() => {
    if (activeLineRef.current && lyricsRef.current) {
      const container = lyricsRef.current;
      const activeLine = activeLineRef.current;
      
      const containerHeight = container.clientHeight;
      const activeLineTop = activeLine.offsetTop;
      const activeLineHeight = activeLine.clientHeight;

      // Calculate scroll position to center the active line
      const scrollPosition = activeLineTop - (containerHeight / 2) + (activeLineHeight / 2);
      
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentLineIndex]);

  return (
    <div className="lyrics-section" ref={lyricsRef}>
      <div className="lyrics-container">
        {lyrics.map((line, index) => (
          <div
            key={index}
            ref={index === currentLineIndex ? activeLineRef : null}
            className={`lyrics-line ${index === currentLineIndex ? 'active' : ''}`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LyricsDisplay;