// import { useState } from "react";
// import { toast } from "react-toastify";

// const API_BASE = import.meta.env.VITE_API_URL ;

// export default function useCrackers() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchAll = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch(`${API_BASE}/crackers`);
//       if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
//       const data = await res.json();

//       const list = Array.isArray(data.items) ? data.items : [];
//      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       setItems(list);
//     } catch (e) {
//       setError(e.message);
//       toast.error(`Fetch failed: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createOne = async (payload) => {
//     try {
//       const res = await fetch(`${API_BASE}/crackers`, {
//         method: "POST",
//         body: payload,
//       });
//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         throw new Error(errData.error || "Create failed");
//       }

//       const created = await res.json();
//     setItems((prev) => [...prev, created]);
//       toast.success("Cracker added successfully!");
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   const updateOne = async (id, payload) => {
//     try {
//       const res = await fetch(`${API_BASE}/crackers/${id}`, {
//         method: "PUT",
//         body: payload,
//       });
//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         throw new Error(errData.error || "Update failed");
//       }

//       const updated = await res.json();
//       setItems((prev) =>
//         prev.map((it) => (it._id === updated._id ? updated : it))
//       );
//       toast.success("Cracker updated successfully!");
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   const removeOne = async (id) => {
//     try {
//       const res = await fetch(`${API_BASE}/crackers/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       setItems((prev) => prev.filter((it) => it._id !== id));
//       toast.success("Cracker deleted successfully!");
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   // ✅ NEW toggle API
//   const toggleOne = async (item) => {
//     try {
//       const res = await fetch(`${API_BASE}/crackers/${item._id}/status`, {
//         method: "PATCH",
//       });
//       if (!res.ok) throw new Error("Toggle failed");
//       const updated = await res.json();
//       setItems((prev) =>
//         prev.map((it) => (it._id === updated._id ? updated : it))
//       );
//       toast.success(
//         `Cracker "${updated.englishName}" is now ${updated.status ? "Visible" : "Hidden"}`
//       );
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   return { items, loading, error, fetchAll, createOne, updateOne, removeOne, toggleOne };
// }


import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE = process.env.REACT_APP_API_URL;

export default function useCrackers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch all or filter by brand
  const fetchAll = async (brand = "") => {
    try {
      setLoading(true);
      setError("");
      let url = `${API_BASE}/crackers`;
      if (brand) {
        url += `?brand=${encodeURIComponent(brand)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();

      const list = Array.isArray(data.items) ? data.items : [];
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setItems(list);
    } catch (e) {
      setError(e.message);
      toast.error(`Fetch failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createOne = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/crackers`, {
        method: "POST",
        body: payload,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Create failed");
      }

      const created = await res.json();
      setItems((prev) => [...prev, created]);
      toast.success("Cracker added successfully!");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const updateOne = async (id, payload) => {
    try {
      const res = await fetch(`${API_BASE}/crackers/${id}`, {
        method: "PUT",
        body: payload,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Update failed");
      }

      const updated = await res.json();
      setItems((prev) =>
        prev.map((it) => (it._id === updated._id ? updated : it))
      );
      toast.success("Cracker updated successfully!");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const removeOne = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/crackers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((it) => it._id !== id));
      toast.success("Cracker deleted successfully!");
    } catch (e) {
      toast.error(e.message);
    }
  };

  // ✅ Toggle visibility API
  const toggleOne = async (item) => {
    try {
      const res = await fetch(`${API_BASE}/crackers/${item._id}/status`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Toggle failed");
      const updated = await res.json();
      setItems((prev) =>
        prev.map((it) => (it._id === updated._id ? updated : it))
      );
      toast.success(
        `Cracker "${updated.englishName}" is now ${
          updated.status ? "Visible" : "Hidden"
        }`
      );
    } catch (e) {
      toast.error(e.message);
    }
  };

  return {
    items,
    loading,
    error,
    fetchAll,
    createOne,
    updateOne,
    removeOne,
    toggleOne,
  };
}
