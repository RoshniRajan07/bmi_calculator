import React, { useState } from "react";
import "./App.css";

import underweight from "./assets/underweight.jpg";
import normalweight from "./assets/normalweight.jpg";
import overweight from "./assets/overweight.jpg";
import obesity from "./assets/obesity.jpg";

function BMICalculator() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");

  const [bmiData, setBmiData] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const getImage = (category) => {
    if (category === "Underweight") return underweight;
    if (category === "Normal weight") return normalweight;
    if (category === "Overweight") return overweight;
    if (category === "Obese") return obesity;
  };

  const calculateBMI = () => {
    if (!name || !height || !weight) {
      setError("Please fill all fields");
      return;
    }

    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (heightUnit === "cm") {
      h = h / 100;
    } else if (heightUnit === "inches") {
      h = h * 0.0254;
    }

    if (weightUnit === "pounds") {
      w = w * 0.453592;
    }

    const bmi = (w / (h * h)).toFixed(2);

    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    setBmiData({
      name,
      height,
      weight,
      bmi,
      category,
      image: getImage(category),
    });

    setShowResult(true);
    setError("");
  };

  const recalculateBMI = () => {
    setName("");
    setHeight("");
    setWeight("");
    setShowResult(false);
    setError("");
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Height</label>
        <div className="input-row">
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
          >
            <option value="cm">cm</option>
            <option value="inches">inches</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Weight</label>
        <div className="input-row">
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="pounds">pounds</option>
          </select>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-primary" onClick={calculateBMI}>
          Calculate BMI
        </button>

        <button className="btn-danger" onClick={recalculateBMI}>
          Recalculate
        </button>
      </div>

      <p className="error">{error}</p>

      {showResult && bmiData && (
        <div className="result">
          <h2>
            Hi {bmiData.name}, you are {bmiData.category}
          </h2>

          <p>Your BMI is: {bmiData.bmi}</p>

          <img src={bmiData.image} alt="BMI" width="200" />
        </div>
      )}
    </div>
  );
}

export default BMICalculator;