// // src/components/CrackerForm/CrackerForm.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { currencyINR, percentOff } from "../../utils/formatters";
// import "./crackerForm.css"; // Make sure this path is correct

// export default function CrackerForm({ onSubmit, defaults = null, onCancel, categories = [] }) {
//   const [englishName, setEnglishName] = useState("");
//   const [tamilName, setTamilName] = useState("");
//   const [originalRate, setOriginalRate] = useState("");
//   const [discountRate, setDiscountRate] = useState("");
//   const [category, setCategory] = useState("");
//   const [status, setStatus] = useState(true); // ✅ status state
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const fileRef = useRef(null);
//   const isEdit = Boolean(defaults?._id);

//   useEffect(() => {
//     setEnglishName(defaults?.englishName || "");
//     setTamilName(defaults?.tamilName || "");
//     setOriginalRate(defaults?.originalRate ?? "");
//     setDiscountRate(defaults?.discountRate ?? "");
//     setCategory(defaults?.category || "");
//     setStatus(defaults?.status ?? true); // ✅ load existing status or default true
//     setPreview(defaults?.imageUrl || "");
//     setImageFile(null);
//     if (fileRef.current) fileRef.current.value = "";
//   }, [defaults]);

//   useEffect(() => {
//     if (!imageFile) return;
//     const reader = new FileReader();
//     reader.onload = (e) => setPreview(e.target.result);
//     reader.readAsDataURL(imageFile);
//   }, [imageFile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("englishName", englishName.trim());
//     formData.append("tamilName", tamilName.trim());
//     formData.append("originalRate", String(originalRate));
//     formData.append("discountRate", String(discountRate));
//     formData.append("category", category);
//     formData.append("status", status); // ✅ send status
//     if (imageFile) formData.append("image", imageFile);

//     try {
//       setSubmitting(true);
//       await onSubmit(formData); // This now calls the parent's function
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form className="cracker-form" onSubmit={handleSubmit}>

//   <div className="form-grid">
//     <label>
//       English Name
//       <input
//         value={englishName}
//         onChange={(e) => setEnglishName(e.target.value)}
//         required
//       />
//     </label>

//     <label>
//       Tamil Name
//       <input
//         value={tamilName}
//         onChange={(e) => setTamilName(e.target.value)}
//         required
//       />
//     </label>

//     <label>
//       Category
//       <input
//         type="text"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         placeholder="e.g. Sparklers"
//         required
//       />
//     </label>

//     <label>
//       Original Rate
//       <input
//         type="number"
//         min="0"
//         value={originalRate}
//         onChange={(e) => setOriginalRate(e.target.value)}
//         required
//       />
//     </label>

//     <label>
//       Discount Rate
//       <input
//         type="number"
//         min="0"
//         value={discountRate}
//         onChange={(e) => setDiscountRate(e.target.value)}
//         required
//       />
//     </label>

//     <label>
//       Status
//       <select
//         value={status}
//         onChange={(e) => setStatus(e.target.value === "true")}
//       >
//         <option value="true">✅ Active (Show)</option>
//         <option value="false">❌ Inactive (Hide)</option>
//       </select>
//     </label>

//     <label>
//       Upload Image
//       <input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//         {...(!isEdit ? { required: true } : {})}
//       />
//     </label>
//     <div className="preview-card">
//     <div className="image-preview">
//       {preview ? <img src={preview} alt="preview" /> : <span>No Image</span>}
//     </div>
//   </div>
//   </div>

  

//   <div className="form-actions">
//     <button className="btn primary" type="submit" disabled={submitting}>
//       {isEdit ? (submitting ? "Updating..." : "Update") : (submitting ? "Saving..." : "Save")}
//     </button>
//     <button className="btn secondary" type="button" onClick={onCancel}>
//       Cancel
//     </button>
//   </div>
// </form>

//   );
// }

// src/components/CrackerForm/CrackerForm.jsx
import { useEffect, useRef, useState } from "react";
import "./crackerForm.css"; // Make sure this path is correct

export default function CrackerForm({
  onSubmit,
  defaults = null,
  onCancel,
  categories = [],
  selectedBrand, // ✅ new prop from parent
}) {
  const [englishName, setEnglishName] = useState("");
  const [tamilName, setTamilName] = useState("");
  const [originalRate, setOriginalRate] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState(selectedBrand || ""); // ✅ auto from tab
  const [status, setStatus] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);
  const isEdit = Boolean(defaults?._id);

  // Load defaults when editing
  useEffect(() => {
    setEnglishName(defaults?.englishName || "");
    setTamilName(defaults?.tamilName || "");
    setOriginalRate(defaults?.originalRate ?? "");
    setDiscountRate(defaults?.discountRate ?? "");
    setCategory(defaults?.category || "");
    setBrand(defaults?.brand || selectedBrand); // ✅ prefer saved brand if editing, else tab brand
    setStatus(defaults?.status ?? true);
    setPreview(defaults?.imageUrl || "");
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
  }, [defaults, selectedBrand]);

  // Preview uploaded image
  useEffect(() => {
    if (!imageFile) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("englishName", englishName.trim());
    formData.append("tamilName", tamilName.trim());
    formData.append("originalRate", String(originalRate));
    formData.append("discountRate", String(discountRate));
    formData.append("category", category);
    formData.append("brand", brand); // ✅ fixed brand
    formData.append("status", status);
    if (imageFile) formData.append("image", imageFile);

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="cracker-form" onSubmit={handleSubmit}>
      <div className="form-grid">

        <label>
          English Name
          <input
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            required
          />
        </label>

        <label>
          Tamil Name
          <input
            value={tamilName}
            onChange={(e) => setTamilName(e.target.value)}
            required
          />
        </label>

        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Sparklers"
            required
          />
        </label>

        {/* ✅ Brand is fixed to current tab */}
        <label>
          Brand
          <input type="text" value={brand} readOnly />
        </label>

        <label>
          Original Rate
          <input
            type="number"
            min="0"
            value={originalRate}
            onChange={(e) => setOriginalRate(e.target.value)}
            required
          />
        </label>

        <label>
          Discount Rate
          <input
            type="number"
            min="0"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            required
          />
        </label>

        <label>
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="true">✅ Active (Show)</option>
            <option value="false">❌ Inactive (Hide)</option>
          </select>
        </label>

        <label>
          Upload Image
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            {...(!isEdit ? { required: true } : {})}
          />
        </label>

        <div className="preview-card">
          <div className="image-preview">
            {preview ? <img src={preview} alt="preview" /> : <span>No Image</span>}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn primary" type="submit" disabled={submitting}>
          {isEdit ? (submitting ? "Updating..." : "Update") : (submitting ? "Saving..." : "Save")}
        </button>
        <button className="btn secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
