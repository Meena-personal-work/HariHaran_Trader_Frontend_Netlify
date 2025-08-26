import { useEffect, useState } from "react";
const API_BASE = process.env.REACT_APP_API_URL ;


export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data = await res.json();
      setCustomers(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete all dispatched customers
const deleteDispatched = async () => {
  try {
    const res = await fetch(`${API_BASE}/orders/dispatched`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete dispatched customers");

    await fetchCustomers(); // refresh list
  } catch (err) {
    setError(err.message);
  }
};


  useEffect(() => {
    fetchCustomers();
  }, []);
return { customers, loading, error, fetchAll: fetchCustomers, deleteDispatched };

}
