import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../../firebase/config";
import { updateData } from "../../../../../../firebase/firestore/updateData";
import styles from "./EditUserProfile.module.css";

const FORM_FIELDS = [
  { label: "Login", name: "username", type: "text" },
  { label: "Imię", name: "firstName", type: "text", required: true },
  { label: "Nazwisko", name: "lastName", type: "text", required: true },
  { label: "Data urodzenia", name: "birthDate", type: "date", required: true },
  {
    label: "Płeć",
    name: "gender",
    type: "select",
    required: true,
    options: ["", "Mężczyzna", "Kobieta"],
  },
  { label: "E-mail", name: "email", type: "email", required: true },
  { label: "Adres", name: "address", type: "text", required: true },
  { label: "Kod pocztowy", name: "postalCode", type: "text", required: true },
  { label: "Miejscowość", name: "city", type: "text", required: true },
  {
    label: "Kraj",
    name: "country",
    type: "select",
    options: ["", "Polska", "England"],
  },
  { label: "Telefon", name: "phone", type: "tel", required: true },
  { label: "Telefon alarmowy ICE", name: "emergencyPhone", type: "tel" },
  { label: "Klub", name: "club", type: "text" },
];

function EditUserProfile() {
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    async function fetchUserData() {
      const userId = currentUser.uid;
      const { data, error } = await fetchData("users", userId);

      if (data) {
        setFormData(data);
        setOriginalData(data); // Store the original data
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    for (let field in formData) {
      if (formData[field] !== originalData[field]) {
        updatedFields[field] = formData[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected!");
      return;
    }

    try {
      const { success, error } = await updateData(
        "users",
        currentUser.uid,
        updatedFields
      );

      if (success) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        setOriginalData(formData); // Update the original data
      } else {
        throw error;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating the profile. Please try again.");
    }
  };

  if (loading) return <div>Loading user profile...</div>;
  if (error) return <div>Error loading user profile: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isEditing ? "Edit User Profile" : "Your Profile"}
      </h1>
      {isEditing ? (
        <form className={styles.form} onSubmit={handleUpdateProfile}>
          {FORM_FIELDS.map((field) => (
            <div key={field.name} className={styles.inputContainer}>
              <label className={styles.inputLabel}>{field.label}:</label>
              {field.type === "select" ? (
                <select
                  className={styles.selectField}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={styles.inputField}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className={styles.buttonContainer}>
            <button className={styles.updateButton} type="submit">
              Update Profile
            </button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {FORM_FIELDS.map((field) => (
            <p key={field.name}>
              <strong>{field.label}:</strong>{" "}
              {formData[field.name] || "Brak danych"}
            </p>
          ))}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

export default EditUserProfile;
