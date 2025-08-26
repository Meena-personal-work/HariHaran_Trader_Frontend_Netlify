import React, { useEffect } from "react";
import AOS from "aos";
import { Helmet } from 'react-helmet-async';
import "aos/dist/aos.css";
import "./about.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="about-container">
      <Helmet>
        <title>About Us | Hariharan Trader - 20+ Years of Fireworks Excellence</title>
        <meta name="author" content="Hariharan Trader" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="description"
          content="Learn about Hariharan Trader - a family-owned fireworks dealer in Sivakasi with over 20 years of experience. We offer premium-quality crackers, expert guidance, and nationwide delivery."
        />
        <meta
          name="keywords"
          content="Hariharan Trader, about fireworks, Sivakasi crackers, Diwali fireworks, eco-friendly crackers, bulk fireworks orders, Tamil Nadu crackers, family-owned business"
        />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Hariharan Trader – 20+ Years of Fireworks Excellence" />
        <meta property="og:description" content="A trusted family-owned fireworks dealer in Sivakasi, offering high-quality crackers, expert service, and festival delivery for over two decades." />
        <meta property="og:image" content="/images/adminimage.png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:url" content="https://haraharantrader.com/about" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://haraharantrader.com/about" />
      </Helmet>
      <img alt="Hariharan Trader" src="./crackers-website-banner2.webp"></img>

      <div className="about-container-without-img">
        <h2 className="about-heading" data-aos="fade-down">
          About Us
        </h2>

        <p className="about-intro" data-aos="fade-up">
          Welcome to <strong>Hariharan Trader</strong>, your trusted dealer in
          fireworks for over 20 years. We are a family-owned business with a
          passion for bringing joy and excitement to Diwali celebrations and all
          events.
        </p>

        <div className="about-tile" data-aos="fade-up">
          <h3>🎇 Our Story</h3>
          <p>
            Our journey began two decades ago, when our founder,{" "}
            <strong>Hariharasudhan Balan</strong>, started trading in fireworks
            in a small shop in <strong>Sivakasi</strong>. With a keen eye for
            quality and a commitment to customer satisfaction, Hariharan Trader
            quickly gained a reputation as a reliable and trustworthy supplier.
          </p>
          <p>
            Over the years, we have grown and expanded our operations all over{" "}
            <strong>Tamilnadu</strong>, while staying true to our core values.
            From traditional sparklers to modern pyrotechnics — we offer it all.
          </p>
        </div>

        <div className="about-tile" data-aos="fade-up">
          <h3>🎯 Our Mission</h3>
          <ul>
            <li>
              ✅ The highest quality fireworks, sourced from reputable
              manufacturers
            </li>
            <li>
              ✅ Unparalleled customer service, with expert advice and guidance
            </li>
            <li>
              ✅ Competitive pricing, without compromising on quality or safety
            </li>
          </ul>
        </div>

        <div className="about-tile" data-aos="fade-up">
          <h3>💡 Our Values</h3>
          <ul>
            <li>
              <strong>Quality:</strong> We ensure all products meet our strict
              standards.
            </li>
            <li>
              <strong>Safety:</strong> We follow all safety regulations to
              protect people and the environment.
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> We aim to exceed
              expectations every time.
            </li>
          </ul>
        </div>
      </div>

      <div className="about-contact" data-aos="zoom-in">
        <h3>📞 9444324237</h3>
        <p>
          Thank you for choosing <strong>Hariharan Trader</strong> as your
          trusted fireworks dealer. Contact us today to learn more about our
          products or to place an order.
        </p>
        <p>
          <strong>📍 Address:</strong> No.3/1341/15, Sattur Road, Opp. Old PRC
          Bus Depot, Near East Police Station, SIVAKASI - 626 189.
        </p>
      </div>
    </div>
  );
};

export default About;
