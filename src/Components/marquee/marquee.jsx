import React from "react";
import Marquee from "react-fast-marquee";
import "./marquee.css";

const crackerCategories = [
  "2025 KIDS SPECIAL",
  "2025 SPL ITEMS",
  "2025 UPGRADE VERSION",
  "BIJILLI AND GT",
  "BOMBS",
  "CHAKKAR",
  "COLOURFUL PEACOCK",
  "DIGITAL LAR",
  "DOUBLE JOY SHELL",
  "ELITE SERIES",
  "FAMILY PACK",
  "FANCY CANDLES",
  "FLASH SERIES",
  "FLOWER POTS",
  "GIFT BOX",
  "JOY SERIES",
  "JOY SHOTS",
  "MATCH BOX & ROLL CAP",
  "MEGA FOUNTAIN",
  "MINI SKY SHOT",
  "MULTICOLOUR SHOT",
  "NEW 2025 SPARKLERS",
  "ONE SOUND CRACKERS",
  "PAPER BOMB",
  "ROCKETS",
  "SET OUT",
  "SKY OUT",
  "SPARKLERS",
  "TWINKLING STAR & PENCIL",
  "VANITHA FIREWORKS",
  "WHISTLING SHOT",
];

const CrackersCategoryMarquee = () => {
  return (
    <div className="cracker-marquee-wrapper">
      <span className="cracker-heading">
        {" "}
        Explore Our 2025 Crackers Categories{" "}
      </span>
      <Marquee gradient={false} speed={60}>
        {crackerCategories.map((item, index) => (
          <div key={index} className="cracker-item">
            {item}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CrackersCategoryMarquee;
