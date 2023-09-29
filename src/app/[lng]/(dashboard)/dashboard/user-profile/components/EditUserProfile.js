import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../../firebase/config";
import { updateData } from "../../../../../../firebase/firestore/updateData";

import styles from "./EditUserProfile.module.css";

function EditUserProfile() {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    country: "Polska",
    phone: "",
    emergencyPhone: "",
    club: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const userId = currentUser.uid;
      const { data, error } = await fetchData("users", userId);

      if (data) {
        setFormData(data);
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUserData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const { success, error } = await updateData(
        "users",
        currentUser.uid,
        formData
      );

      if (success) {
        alert("Profile updated successfully!");
      } else {
        throw error;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating the profile. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit User Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Imię*:</label>
          <input
            className={styles.inputField}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Nazwisko*:</label>
          <input
            className={styles.inputField}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Data urodzenia*:</label>
          <input
            className={styles.inputField}
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Płeć*:</label>
          <select
            className={styles.selectField}
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="Mężczyzna">Mężczyzna</option>
            <option value="Kobieta">Kobieta</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>E-mail*:</label>
          <input
            className={styles.inputField}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Adres*:</label>
          <input
            className={styles.inputField}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Kod pocztowy*:</label>
          <input
            className={styles.inputField}
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Miejscowość*:</label>
          <input
            className={styles.inputField}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Kraj*:</label>
          <select
            className={styles.selectField}
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="Polska">Polska</option>
            {/* Możesz dodać więcej krajów tutaj */}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Telefon*:</label>
          <input
            className={styles.inputField}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>
            Telefon alarmowy ICE w nagłym przypadku:
          </label>
          <input
            className={styles.inputField}
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Klub:</label>
          <input
            className={styles.inputField}
            type="text"
            name="club"
            value={formData.club}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.updateButton} type="submit">
            Update Profile
          </button>
        </div>
      </form>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
}

export default EditUserProfile;
