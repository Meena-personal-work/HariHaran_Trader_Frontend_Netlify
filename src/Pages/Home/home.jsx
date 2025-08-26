import React from "react";
import Counter from "../../Components/home-counter/counter";
import Highlights from "../../Components/home-highlights/highlights";
import YouTubePlayer from "../../Components/youtube-player/youtube-player";
import MarqueeItems from "../../Components/marquee/marquee";
import { Helmet } from 'react-helmet-async';
import Brand from "../../Components/brand/brand";

import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Hariharan Trader | Trusted Fireworks Partner for Families & Businesses</title>
        <meta name="author" content="Hariharan Trader" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Hariharan Trader offers 200+ varieties of premium-quality, eco-friendly crackers with over 10 years of trust, serving 5,000+ happy customers annually. Timely delivery and bulk order support available." />
        <meta name="keywords" content="Hariharan Trader, fireworks, crackers, eco-friendly crackers, Sivakasi crackers, Diwali fireworks, bulk order crackers, festival crackers, premium packaging" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hariharan Trader | Trusted Fireworks Partner for Families & Businesses" />
        <meta property="og:description" content="200+ varieties of premium eco-friendly crackers, 10+ years of trust, 5,000+ happy customers, timely delivery, and bulk order support." />
        <meta property="og:image" content="/images/adminimage.png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:url" content="https://haraharantrader.com" />

        <link rel="canonical" href="https://haraharantrader.com" />
      </Helmet>
      <img alt="Hariharan Trader" className="home-banner" src="./crackers-website-banner3.webp"></img>
      <Counter />
      <Brand />
      <Highlights />
      <MarqueeItems />
      <div className="video-section">
        <YouTubePlayer videoId="RM6NebcJh0E" />
        <YouTubePlayer videoId="3ExDiZ4T4ks" />
      </div>
    </div>
  );
};

export default Home;
