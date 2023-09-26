import React, { useState } from "react";
import axios from "axios";

function FileUploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    singleFile: null,
    multipleFiles: []
  });

  const handleChange = (event) => {
    const { name, type, value, files } = event.target;

    // Check if the input type is file or not
    const inputValue = type === "file" ? files : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data
    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    formDataObject.append("age", formData.age);

    if (formData.singleFile) {
      formDataObject.append("singleFile", formData.singleFile);
    }

    if (formData.multipleFiles.length > 0) {
      // Convert formData.multipleFiles to an array
      const multipleFilesArray = Array.from(formData.multipleFiles);

      multipleFilesArray.forEach((file, index) => {
        formDataObject.append(`multipleFiles[${index}]`, file);
      });
    }

    try {
      console.log(formDataObject);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Upload Single File:</label>
        <input
          type="file"
          name="singleFile"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Upload Multiple Files:</label>
        <input
          type="file"
          name="multipleFiles"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FileUploadForm;
