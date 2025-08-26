import CountUp from "react-countup";
import "./counter.css";

const Counter = () => {
  return (
    <div className="stats-section">
      <h2 className="counter-heading">
        Hariharan Trader is Trusted Fireworks Partner for Families & Businesses
      </h2>
      <div className="stat-box-container">
        <div className="stat-box">
          <h2>
            <span className="stat-number">
              <CountUp end={20} duration={2} />
            </span>
            <span className="stat-symbol">+</span>
          </h2>
          <p>Years of Trust & Experience</p>
        </div>

        <div className="stat-box">
          <h2>
            <span className="stat-number">
              <CountUp end={200} duration={2.5} />
            </span>
            <span className="stat-symbol">+</span>
          </h2>
          <p>Varieties of Crackers</p>
        </div>

        <div className="stat-box">
          <h2>
            <span className="stat-number">
              <CountUp end={5000} duration={3} />
            </span>
            <span className="stat-symbol">+</span>
          </h2>
          <p>Happy Customers Every Year</p>
        </div>

        <div className="stat-box">
          <h2>
            <span className="stat-number">
              <CountUp end={100} duration={2} />
            </span>
            <span className="stat-symbol">%</span>
          </h2>
          <p>Customer Satisfaction</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
