import React from "react";
import "./youtube-player.css";

const YouTubePlayer = ({ videoId }) => {
  return (
    <div className="youtube-container">
      <iframe
        className="youtube-iframe"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
