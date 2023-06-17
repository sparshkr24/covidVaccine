import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export default function VaccinationCenterForm() {
  const [formData, setFormData] = useState({
    centerName: "",
    city: "",
    workingHours: "",
    slotsLeft: 0,
    covaxin: 0,
    covishield: 0,
    pfizer: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "slotsLeft" || name === "covaxin" || name === "covishield" || name === "pfizer"
      ? parseInt(value, 10)
      : value;
      
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any desired actions with the form data
    console.log(formData);
  };

  return (
    <>
      <div className="mt-10">
        <p className="text-center text-xl font-bold text-blue-800">
          Add Center
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-96 mx-auto p-6 bg-white rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Center Name"
              name="centerName"
              value={formData.centerName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Working Hours"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Slots Left"
              type="number"
              name="slotsLeft"
              value={formData.slotsLeft}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Covaxin"
              type="number"
              name="covaxin"
              value={formData.covaxin}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Covishield"
              type="number"
              name="covishield"
              value={formData.covishield}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pfizer"
              type="number"
              name="pfizer"
              value={formData.pfizer}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
