import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';

import CustomerInfo from "./CustomerInfo";
import BrandSwitch from "./BrandSwitch";
import LoadingSpinner from "./LoadingSpinner";
import CrackerTable from "./CrackerTable";
import ImageModal from "./ImageModal";
import ScrollButtons from "./ScrollButtons";

const Order = (props) => {
  const {
    crackers,
    setCrackers,
    brand,
    setBrand,
    loading,
    setLoading,
    customerName,
    setCustomerName,
    customerNumber,
    setCustomerNumber,
    customerAddress,
    setCustomerAddress,
    customerState,
    setCustomerState,
    totalRate,
    setTotalRate,
    setSelectedItems,
  } = props;

  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = React.useState(null);

  // Initialize isImgLoaded as false for all items whenever brand changes or crackers change
  React.useEffect(() => {
    setCrackers((prev) =>
      prev.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          isImgLoaded: false,
        })),
      }))
    );
  }, [brand, setCrackers]);

  // Handle checkbox toggle (select/unselect cracker)
  const handleCheckboxChange = (categoryIndex, itemIndex) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            const updatedItem = { ...item, checked: !item.checked };
            if (!updatedItem.checked) {
              updatedItem.quantity = 0;
            }
            return updatedItem;
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });

    setCrackers(updatedCrackers);
    calculateTotalRate(updatedCrackers);
  };

  // Handle quantity change for a cracker
  const handleQuantityChange = (categoryIndex, itemIndex, quantity) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            return { ...item, quantity };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setCrackers(updatedCrackers);
    calculateTotalRate(updatedCrackers);
  };

  // Calculate total rate
  const calculateTotalRate = (crackersList) => {
    let total = 0;
    crackersList.forEach((category) => {
      category.items.forEach((item) => {
        const quantity = parseInt(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        total += quantity * rate;
      });
    });
    setTotalRate(total);
  };

  // Validate and submit order
  const handleSubmit = () => {
    const isNameValid = customerName.trim().length > 0;
    const isNumberValid = /^[0-9]{10}$/.test(customerNumber);
    const isAddressValid = customerAddress.trim().length > 0;
    const isStateValid = customerState === "Tamil Nadu";

    const invalidItems = [];
    const isQuantityValid = crackers.every((category) =>
      category.items.every((item) => {
        if (item.checked && (!item.quantity || item.quantity <= 0)) {
          invalidItems.push(item.name);
          return false;
        }
        return true;
      })
    );

    let quantityErrorMessage = "";
    if (invalidItems.length > 0) {
      quantityErrorMessage = `Please select quantity for the following items: ${invalidItems.join(", ")}.\n`;
    }

    const isCrackerChosen = crackers.some((category) =>
      category.items.some((item) => item.checked)
    );

    if (
      isNameValid &&
      isNumberValid &&
      isAddressValid &&
      isStateValid &&
      isQuantityValid &&
      isCrackerChosen
    ) {
      toast("Kindly Confirm Your Order");

      const selectedCrackers = crackers.flatMap((category) =>
        category.items
          .filter((item) => item.checked)
          .map((item) => ({ ...item, category: category.category }))
      );

      setSelectedItems(selectedCrackers);
      navigate("/confirmList");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      let errorMessage = "";
      if (!isNameValid) errorMessage += "Please enter the name.\n";
      if (!isNumberValid) errorMessage += "Please enter a valid 10-digit number for the contact number.\n";
      if (!isAddressValid) errorMessage += "Please enter the address.\n";
      if (!isStateValid) errorMessage += "Please select a valid state (Tamil Nadu).\n";
      errorMessage += quantityErrorMessage;
      if (!isCrackerChosen) errorMessage += "Please choose at least one item from crackers.\n";

      toast.error(
        <div style={{ textAlign: "left", lineHeight: "1.6" }}>
          {errorMessage.split("\n").map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      );
    }
  };

  

  return (
    <div className="full-container">
      <Helmet>
        <title>Place Your Order | Hariharan Trader - Premium Fireworks Delivered</title>
        <meta name="author" content="Hariharan Trader" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="description"
          content="Order premium-quality fireworks from Hariharan Trader in Sivakasi. Bulk and retail orders available with timely festival delivery across Tamil Nadu and beyond."
        />
        <meta
          name="keywords"
          content="Hariharan Trader, fireworks order, Sivakasi crackers order, buy Diwali crackers, bulk crackers purchase, online fireworks booking, festival fireworks delivery"
        />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Order Fireworks from Hariharan Trader – Premium Quality & Timely Delivery" />
        <meta property="og:description" content="Place your order for premium fireworks. Enjoy safe, eco-friendly, and dazzling crackers with quick delivery for your celebrations." />
        <meta property="og:image" content="/images/adminimage.png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:url" content="https://haraharantrader.com/order" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://haraharantrader.com/order" />
      </Helmet>
      <div className="content-container">
        <div className="sub-heading">
          <h4 className="font-style-sub-heading">
            Explore Our Product Catalogue and Place Your Order Today!
          </h4>
        </div>
        <div className="sub-container">
          <div className="gif-containers">
            <div className="crackers-gif1"></div>
            <CustomerInfo
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerNumber={customerNumber}
              setCustomerNumber={setCustomerNumber}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              customerState={customerState}
              setCustomerState={setCustomerState}
            />
          </div>
          <div className="list-container">
            {loading || crackers.length === 0 ? (
              <LoadingSpinner />
            ) : (
              <>
                <BrandSwitch brand={brand} setBrand={setBrand} setLoading={setLoading} />
                <CrackerTable
                  crackers={crackers}
                  brand={brand}
                  setCrackers={setCrackers}
                  handleCheckboxChange={handleCheckboxChange}
                  handleQuantityChange={handleQuantityChange}
                  setPreviewImage={setPreviewImage}
                  totalRate={totalRate}
                />
                <div className="button-container">
                  <button className="Place-order" onClick={handleSubmit}>
                    Place Order
                  </button>
                </div>
                <ScrollButtons />
              </>
            )}
          </div>
        </div>
      </div>

      <ImageModal previewImage={previewImage} setPreviewImage={setPreviewImage} />
    </div>
  );
};

export default Order;
