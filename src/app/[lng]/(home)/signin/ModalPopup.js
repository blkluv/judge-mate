import React, { useState } from "react";
import styles from "./ModalPopup.module.css";
function EmailModal({ isOpen, onClose, onResetPassword }) {
  const [email, setEmail] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onResetPassword(email);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Podaj swój adres email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Resetuj hasło</button>
          <button onClick={onClose}>Anuluj</button>
        </form>
      </div>
    </div>
  );
}

export default EmailModal;
