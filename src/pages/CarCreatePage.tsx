import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../templates/Header";
import MiniBanner from "../templates/MiniBanner";
import axios from "axios";
import config from "../config";

const CarCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    brand: "",
    year: "",
    price: "",
    travelled: "",
    mileage: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [id]: value });
    if (error) setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // If there's an image, send multipart/form-data
      if (image) {
        const fd = new FormData();
        Object.entries(formValues).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append("image", image);

        await axios.post(`${config.api}/cars/`, fd, config.formdataheader());
      } else {
        const payload = {
          ...formValues,
          year: formValues.year ? Number(formValues.year) : undefined,
          price: formValues.price ? Number(formValues.price) : undefined,
          travelled: formValues.travelled ? Number(formValues.travelled) : undefined,
          mileage: formValues.mileage ? Number(formValues.mileage) : undefined,
        };

        await axios.post(`${config.api}/cars/`, payload, config.header());
      }

      // Navigate back to car list on success
      navigate("/cars");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.response?.data?.error || "Failed to create car"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <MiniBanner page="create_car" />

      <div className="section auth-page">
        <div className="auth-box">
          <h1 className="title text-center">Create New Car</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Car model name"
              required
            />

            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              value={formValues.brand}
              onChange={handleChange}
              placeholder="Brand"
              required
            />

            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              value={formValues.year}
              onChange={handleChange}
              placeholder="e.g. 2020"
            />

            <label htmlFor="price">Price (USD)</label>
            <input
              id="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              placeholder="e.g. 15000"
            />

            <label htmlFor="travelled">Travelled (km)</label>
            <input
              id="travelled"
              type="number"
              value={formValues.travelled}
              onChange={handleChange}
              placeholder="e.g. 35000"
            />

            <label htmlFor="mileage">Mileage (km/l)</label>
            <input
              id="mileage"
              type="number"
              value={formValues.mileage}
              onChange={handleChange}
              placeholder="e.g. 15"
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Optional description"
            />

            <label htmlFor="image">Image (optional)</label>
            <input id="image" type="file" accept="image/*" onChange={handleFileChange} />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="auth-button signup" disabled={loading}>
              {loading ? "Creating..." : "Create Car"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CarCreatePage;
