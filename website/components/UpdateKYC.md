# UpdateKYC.vue

## Overview

A Vue component that provides a comprehensive KYC update form.  
It allows users to upload Aadhaar, PAN, address proof, and photo images, and fill in personal details.  
The component uses OCR (Tesseract.js) to extract information from uploaded images and provides real-time validation and progress feedback.

## Props

_None_

## Events

_None_

## Data

### form
- **Type:** `Object`
- **Description:** Holds all KYC form fields and uploaded file data.
  - `name`: Full Name
  - `fatherName`: Father's Name
  - `gender`: Gender
  - `maritalStatus`: Marital Status
  - `address`: Address
  - `mobile`: Mobile Number
  - `aadhaar`: Aadhaar Number
  - `pan`: PAN Card Number
  - `aadhaarFile`: Aadhaar image (Base64)
  - `panFile`: PAN image (Base64)
  - `addressProof`: Address proof image (Base64)
  - `photo`: Photo image (Base64)

### errors
- **Type:** `Object`
- **Description:** Holds validation error messages for each field.

### loading
- **Type:** `Boolean`
- **Description:** Indicates if OCR or form submission is in progress.

### progress
- **Type:** `Number`
- **Description:** OCR progress percentage.

## Methods

### validateField(field)
Validates a specific field and updates the `errors` object.

### isFormValid()
Checks if all fields are valid.

### handleSubmit()
Validates the form and submits the KYC data via an API call.

### handleFile(event, key)
Handles file input, reads the file as Base64, and triggers OCR.

### runOCR(imageDataUrl, key)
Runs OCR on the uploaded image and updates progress.

### extractDetails(text, key)
Extracts Aadhaar, PAN, name, address, mobile, gender, father's name, and marital status from OCR text.

## Usage

```vue
<UpdateKYC />
```

## Example

```vue
<template>
  <form class="kyc-form" @submit.prevent="handleSubmit">
    <h2>Update KYC</h2>
    <div class="form-container">
      <div class="upload-section">
        <div>
          <label>Aadhaar Image:</label>
          <input type="file" @change="handleFile($event, 'aadhaarFile')" accept="image/*" required />
        </div>
        <div>
          <label>PAN Image:</label>
          <input type="file" @change="handleFile($event, 'panFile')" accept="image/*" required />
        </div>
        <div>
          <label>Address Proof Image:</label>
          <input type="file" @change="handleFile($event, 'addressProof')" accept="image/*" required />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" @change="handleFile($event, 'photo')" accept="image/*" required />
        </div>
      </div>
      <div class="details-section">
        <div>
          <input v-model="form.name" @input="validateField('name')" placeholder="Full Name" required />
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div>
          <input v-model="form.fatherName" @input="validateField('fatherName')" placeholder="Father's Name" required />
          <span class="error" v-if="errors.fatherName">{{ errors.fatherName }}</span>
        </div>
        <div>
          <select v-model="form.gender" @change="validateField('gender')" required>
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
        </div>
        <div>
          <select v-model="form.maritalStatus" @change="validateField('maritalStatus')" required>
            <option disabled value="">Marital Status</option>
            <option>Married</option>
            <option>Unmarried</option>
          </select>
          <span class="error" v-if="errors.maritalStatus">{{ errors.maritalStatus }}</span>
        </div>
        <div>
          <input v-model="form.address" @input="validateField('address')" placeholder="Address" required />
          <span class="error" v-if="errors.address">{{ errors.address }}</span>
        </div>
        <div>
          <input v-model="form.mobile" @input="validateField('mobile')" placeholder="Mobile Number" required />
          <span class="error" v-if="errors.mobile">{{ errors.mobile }}</span>
        </div>
        <div>
          <input v-model="form.aadhaar" @input="validateField('aadhaar')" placeholder="Aadhaar Number" required />
          <span class="error" v-if="errors.aadhaar">{{ errors.aadhaar }}</span>
        </div>
        <div>
          <input v-model="form.pan" @input="validateField('pan')" placeholder="PAN Card Number" required />
          <span class="error" v-if="errors.pan">{{ errors.pan }}</span>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
    <button type="submit">Save KYC</button>
  </form>
</template>
```

## Style

```css
.kyc-form {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
  max-width: 900px;
  margin: 0 auto;
}
.kyc-form h2 {
  text-align: center;
  color: #35495e;
  margin-bottom: 20px;
}
.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.upload-section,
.details-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.kyc-form input,
.kyc-form select,
.kyc-form input[type="file"],
.kyc-form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
}
.kyc-form label {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}
.kyc-form button {
  margin-top: 20px;
  padding: 12px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
.kyc-form button:hover {
  background-color: #2c3e50;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #35495e;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.progress-bar {
  width: 100%;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  height: 8px;
}
.progress {
  height: 100%;
  background-color: #35495e;
  transition: width 0.3s ease;
}
.error {
  color: red;
  font-size: 0.85rem;
  margin-top: -6px;
  margin-bottom: 6px;
}
@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
}
```