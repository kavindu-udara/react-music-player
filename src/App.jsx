import { useState, useEffect, useRef } from 'react';
import AudioPlayer from './components/AudioPlayer';
import LyricsDisplay from './components/LyricsDisplay';
import audio from "./assets/we-found-love.mp3"

// Temporary lyrics data - you need to replace with actual synchronized lyrics
const LYRICS = [
  // Intro (instrumental)
  { time: 0, text: "♪" },
  
  // First verse & pre-chorus
  { time: 8, text: "Yellow diamonds in the light" },
  { time: 12, text: "Now we're standing side by side" },
  { time: 16, text: "As your shadow crosses mine" },
  { time: 19, text: "What it takes to come alive" },
  { time: 26, text: "It's the way I'm feeling I just can't deny" },
  { time: 33, text: "But I've gotta let it go" },
  { time: 38, text: "We found love in a hopeless place" },
  
  // First chorus (repeated)
  { time: 41, text: "We found love in a hopeless place" },
  { time: 45, text: "We found love in a hopeless place" },
  { time: 49, text: "We found love in a hopeless place" },
  
  // Instrumental break
  { time: 52, text: "♪" },
  
  // Second verse & pre-chorus
  { time: 83, text: "Shine a light through an open door" },
  { time: 87, text: "Love and life I will divide" },
  { time: 90, text: "Turn away 'cause I need you more" },
  { time: 94, text: "Feel the heartbeat in my mind" },
  { time: 101, text: "It's the way I'm feeling I just can't deny" },
  { time: 108, text: "But I've gotta let it go" },
  { time: 113, text: "We found love in a hopeless place" },
  { time: 116, text: "We found love in a hopeless place" },
  { time: 120, text: "We found love in a hopeless place" },
  { time: 124, text: "We found love in a hopeless place" },
  
  { time: 128, text: "♪" },

  // Bridge/mini verse
  { time: 135, text: "Yellow diamonds in the light" },
  { time: 139, text: "Now we're standing side by side" },
  { time: 143, text: "As your shadow crosses mine (mine, mine, mine)" },
  { time: 150, text: "We found love in a hopeless place" },
  
  // Extended final chorus
  { time: 154,  text: "We found love in a hopeless place" },
  { time: 158, text: "We found love in a hopeless place" },
  { time: 162, text: "We found love in a hopeless place" },
  
  { time: 166, text: "♪" },

  { time: 195, text: "We found love in a hopeless place" },
  { time: 199, text: "We found love in a hopeless place" },
  { time: 203, text: "We found love in a hopeless place" },
  { time: 206, text: "We found love in a hopeless place" },
  
];


const App = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const updateCurrentLine = () => {
      const currentLine = LYRICS.findLast(line => line.time <= currentTime);
      setCurrentLineIndex(LYRICS.indexOf(currentLine));
    };
    
    updateCurrentLine();
  }, [currentTime]);

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  return (
    <div className="player-container">
      <div className="controls-section">
        <h1>We Found Love</h1>
        <h2>Rihanna</h2>
        <AudioPlayer 
          audioSrc={audio}
          onTimeUpdate={handleTimeUpdate}
          currentTime={currentTime}
        />
      </div>

      <LyricsDisplay 
        lyrics={LYRICS}
        currentLineIndex={currentLineIndex}
      />
    </div>
  );
};

export default App;