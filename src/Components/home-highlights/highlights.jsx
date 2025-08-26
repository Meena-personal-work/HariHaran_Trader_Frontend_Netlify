import "./highlights.css";

const features = [
  {
    title: "Dazzling Night Sky",
    description:
      "Experience premium aerial crackers that light up the night with joy.",
    icon: "🌌",
  },
  {
    title: "Premium Packaging",
    description:
      "Each item is packed carefully to ensure product safety and style.",
    icon: "🎁",
  },
  {
    title: "Bulk Order Support",
    description:
      "Planning for resale or a big event? We handle large orders efficiently.",
    icon: "📦",
  },
  {
    title: "Festival Delivery",
    description:
      "Timely delivery during Diwali and other festivals is our specialty.",
    icon: "🚚",
  },
];

const Highlights = () => {
  return (
    <div className="feature-section-wrapper">
      <div className="feature-header">
        <h2 className="feature-heading">
          Why People Choose Hariharan Trader for Their Celebrations
        </h2>
        <p className="feature-subtext">
          Our mission is to make your moments of joy brighter, safer, and more
          memorable with premium-quality crackers and customer-first service.
        </p>
      </div>

      <div className="feature-section">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
