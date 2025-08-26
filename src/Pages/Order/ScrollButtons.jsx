import React from "react";

const ScrollButtons = () => (
  <div className="scroll-buttons">
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>⬆ Go to Top</button>
    <button
      onClick={() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    >
      ⬇ Go to Bottom
    </button>
  </div>
);

export default ScrollButtons;
