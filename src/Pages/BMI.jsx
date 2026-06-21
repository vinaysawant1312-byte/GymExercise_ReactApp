import { useState } from "react";

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight || !age) {
      alert("Please fill all fields");
      return;
    }

    const h = height / 100;
    const result = weight / (h * h);

    setBmi(result.toFixed(2));
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("Male");
    setBmi(null);
  };

  const getIdealWeightRange = () => {
    const h = height / 100;

    const min = (18.5 * h * h).toFixed(1);
    const max = (24.9 * h * h).toFixed(1);

    return `${min} kg - ${max} kg`;
  };

  const getBMIInfo = (bmi) => {
    if (bmi < 18.5) {
      return {
        category: "Underweight",
        color: "text-blue-500",
        description:
          "Your BMI indicates that you are underweight. This may suggest that your body weight is lower than recommended for your height. Focus on consuming nutrient-rich foods, increasing protein intake, and following a structured strength-training program to build healthy muscle mass.",
      };
    }

    if (bmi < 25) {
      return {
        category: "Normal Weight",
        color: "text-green-500",
        description:
          "Your BMI falls within the healthy weight range. Continue maintaining a balanced diet, regular exercise routine, proper hydration, and adequate sleep. This range is generally associated with the lowest risk of weight-related health issues.",
      };
    }

    if (bmi < 30) {
      return {
        category: "Overweight",
        color: "text-yellow-500",
        description:
          "Your BMI suggests that you are overweight. Consider increasing physical activity, improving dietary habits, and maintaining a moderate calorie deficit if your goal is fat loss. Consistency is more important than extreme dieting.",
      };
    }

    return {
      category: "Obese",
      color: "text-red-500",
      description:
        "Your BMI falls within the obese range. This can increase the risk of several health conditions such as heart disease, high blood pressure, and diabetes. A structured fitness plan and healthy eating habits can help improve your overall health.",
    };
  };

  const bmiInfo = bmi ? getBMIInfo(Number(bmi)) : null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-50 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">BMI Calculator</h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
          >
            Calculate BMI
          </button>

          <button
            onClick={resetForm}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
          >
            Reset
          </button>
        </div>

        {bmi && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-3xl font-bold">Your BMI: {bmi}</h2>

            <h3 className={`text-2xl font-semibold mt-3 ${bmiInfo.color}`}>
              {bmiInfo.category}
            </h3>

            <p className="mt-4 text-gray-700 leading-relaxed">
              {bmiInfo.description}
            </p>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p>
                <strong>Age:</strong> {age}
              </p>

              <p>
                <strong>Gender:</strong> {gender}
              </p>

              <p>
                <strong>Height:</strong> {height} cm
              </p>

              <p>
                <strong>Weight:</strong> {weight} kg
              </p>

              <p className="mt-2">
                <strong>Ideal Weight Range:</strong> {getIdealWeightRange()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMI;
