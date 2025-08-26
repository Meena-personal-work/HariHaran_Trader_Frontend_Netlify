import "./confirmModal.css";

export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
