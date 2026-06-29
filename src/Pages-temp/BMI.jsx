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
    setBmi((weight / (h * h)).toFixed(2));
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
    return `${(18.5 * h * h).toFixed(1)} kg – ${(24.9 * h * h).toFixed(1)} kg`;
  };

  const getBMIInfo = (bmi) => {
    if (bmi < 18.5)
      return {
        category: "Underweight",
        color: "text-blue-500",
        bg: "bg-blue-50",
        border: "border-blue-200",
        bar: "bg-blue-400",
        barWidth: "w-1/4",
        description:
          "Your BMI suggests you are underweight. Focus on nutrient-rich foods, increasing protein intake, and a structured strength-training program to build healthy muscle mass.",
      };
    if (bmi < 25)
      return {
        category: "Normal Weight",
        color: "text-green-500",
        bg: "bg-green-50",
        border: "border-green-200",
        bar: "bg-green-400",
        barWidth: "w-2/4",
        description:
          "Your BMI falls within the healthy range. Keep maintaining a balanced diet, regular exercise, proper hydration, and adequate sleep.",
      };
    if (bmi < 30)
      return {
        category: "Overweight",
        color: "text-yellow-500",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        bar: "bg-yellow-400",
        barWidth: "w-3/4",
        description:
          "Your BMI suggests you are overweight. Consider increasing physical activity and improving dietary habits with a moderate calorie deficit.",
      };
    return {
      category: "Obese",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      bar: "bg-red-400",
      barWidth: "w-full",
      description:
        "Your BMI falls in the obese range. A structured fitness plan and healthy eating habits can significantly improve your overall health.",
    };
  };

  const bmiInfo = bmi ? getBMIInfo(Number(bmi)) : null;

  const fields = [
    {
      label: "Age",
      placeholder: "Enter your age",
      value: age,
      setter: setAge,
      unit: "yrs",
    },
    {
      label: "Height",
      placeholder: "Enter your height",
      value: height,
      setter: setHeight,
      unit: "cm",
    },
    {
      label: "Weight",
      placeholder: "Enter your weight",
      value: weight,
      setter: setWeight,
      unit: "kg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Health Tool
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-1">
            BMI <span className="text-orange-500">Calculator</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Find out if your weight is in a healthy range
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
          {/* Gender Toggle */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Gender
            </label>
            <div className="flex rounded-xl overflow-hidden border border-gray-200">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200
                              ${
                                gender === g
                                  ? "bg-orange-500 text-white"
                                  : "bg-white text-gray-500 hover:bg-orange-50"
                              }`}
                >
                  {g === "Male" ? "♂ Male" : "♀ Female"}
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          {fields.map(({ label, placeholder, value, setter, unit }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {label}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-14
                             text-gray-800 placeholder:text-gray-400 text-sm
                             focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                             transition duration-200"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                  {unit}
                </span>
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                         text-white py-3 rounded-xl font-semibold text-sm
                         transition-colors duration-200 shadow-md shadow-orange-100"
            >
              Calculate BMI
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-500
                         hover:bg-gray-50 font-semibold text-sm transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result Card */}
        {bmi && bmiInfo && (
          <div
            className={`mt-6 bg-white rounded-3xl shadow-xl p-8 border ${bmiInfo.border}`}
          >
            {/* BMI Score */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Your BMI Score
                </p>
                <p className="text-5xl font-extrabold text-gray-900 mt-1">
                  {bmi}
                </p>
              </div>
              <span
                className={`text-sm font-bold px-4 py-2 rounded-full ${bmiInfo.bg} ${bmiInfo.color}`}
              >
                {bmiInfo.category}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${bmiInfo.bar} ${bmiInfo.barWidth}`}
              />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {bmiInfo.description}
            </p>

            {/* Stats Grid */}
            <div
              className={`grid grid-cols-2 gap-3 p-4 rounded-2xl ${bmiInfo.bg}`}
            >
              {[
                { label: "Age", value: `${age} yrs` },
                { label: "Gender", value: gender },
                { label: "Height", value: `${height} cm` },
                { label: "Weight", value: `${weight} kg` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">
                    {value}
                  </p>
                </div>
              ))}

              {/* Ideal weight spans full width */}
              <div className="col-span-2 bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium">
                  Ideal Weight Range
                </p>
                <p className={`text-sm font-bold mt-0.5 ${bmiInfo.color}`}>
                  {getIdealWeightRange()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMI;
