import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import songCover from '../assets/song-image.jpeg'; // Update with your actual image path

const AudioPlayer = ({ audioSrc, onTimeUpdate, currentTime }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="album-art">
        <img src={songCover} alt="We Found Love Album Cover" />
        <div className="album-overlay"></div>
      </div>

      <div className="progress-bar" onClick={handleProgressClick}>
        <div 
          className="progress" 
          style={{ width: `${(currentTime / audioRef.current?.duration || 0) * 100}%` }}
        />
      </div>

      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        
        <div className="volume-control">
          <FaVolumeUp size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;