import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const initialFormData = {
    GENDER: '',
    AGE: '',
    SMOKING_STATUS: '',
    YELLOW_FINGERS: '',
    ANXIETY: '',
    PEER_PRESSURE: '',
    CHRONIC_DISEASE: '',
    FATIGUE: '',
    ALLERGY: '',
    WHEEZING: '',
    ALCOHOL_CONSUMING: '',
    COUGHING: '',
    SHORTNESS_OF_BREATH: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lung-cancer-detection-3.onrender.com/predict', formData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error("There was an error making the request", error);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
  };

  return (
    <div className="App">
      <h2>Lung Cancer Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Gender (1 for Female, 2 for Male):
          <input type="number" name="GENDER" value={formData.GENDER} onChange={handleChange} required />
        </label><br />

        <label>
          Age:
          <input type="number" name="AGE" value={formData.AGE} onChange={handleChange} required />
        </label><br />

        <label>
          Smoking Status:
          <input type="number" name="SMOKING_STATUS" value={formData.SMOKING_STATUS} onChange={handleChange} required />
        </label><br />

        <label>
          Yellow Fingers (1 for No, 2 for Yes):
          <input type="number" name="YELLOW_FINGERS" value={formData.YELLOW_FINGERS} onChange={handleChange} required />
        </label><br />

        <label>
          Anxiety (1 for No, 2 for Yes):
          <input type="number" name="ANXIETY" value={formData.ANXIETY} onChange={handleChange} required />
        </label><br />

        <label>
          Peer Pressure (1 for No, 2 for Yes):
          <input type="number" name="PEER_PRESSURE" value={formData.PEER_PRESSURE} onChange={handleChange} required />
        </label><br />

        <label>
          Chronic Disease (1 for No, 2 for Yes):
          <input type="number" name="CHRONIC_DISEASE" value={formData.CHRONIC_DISEASE} onChange={handleChange} required />
        </label><br />

        <label>
          Fatigue (1 for No, 2 for Yes):
          <input type="number" name="FATIGUE" value={formData.FATIGUE} onChange={handleChange} required />
        </label><br />

        <label>
          Allergy (1 for No, 2 for Yes):
          <input type="number" name="ALLERGY" value={formData.ALLERGY} onChange={handleChange} required />
        </label><br />

        <label>
          Wheezing (1 for No, 2 for Yes):
          <input type="number" name="WHEEZING" value={formData.WHEEZING} onChange={handleChange} required />
        </label><br />

        <label>
          Alcohol Consuming (1 for No, 2 for Yes):
          <input type="number" name="ALCOHOL_CONSUMING" value={formData.ALCOHOL_CONSUMING} onChange={handleChange} required />
        </label><br />

        <label>
          Coughing (1 for No, 2 for Yes):
          <input type="number" name="COUGHING" value={formData.COUGHING} onChange={handleChange} required />
        </label><br />

        <label>
          Shortness of Breath (1 for No, 2 for Yes):
          <input type="number" name="SHORTNESS_OF_BREATH" value={formData.SHORTNESS_OF_BREATH} onChange={handleChange} required />
        </label><br />

        <button type="submit">Predict</button>
        <button type="button" onClick={handleReset} className="reset-button">Reset</button>
      </form>

      {result && (
        <div>
          <h3>Prediction: {result}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
