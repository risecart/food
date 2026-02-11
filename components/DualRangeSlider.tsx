"use client";

import React, { useState } from "react";

export default function DualRangeSlider() {
  const min = 0;
  const max = 10000;
  const step = 100;
  const minGap = 500;

  const [minVal, setMinVal] = useState(2000);
  const [maxVal, setMaxVal] = useState(8000);

  const handleMinChange = (value: number) => {
    if (value > maxVal - minGap) {
      value = maxVal - minGap;
    }
    setMinVal(value);
  };

  const handleMaxChange = (value: number) => {
    if (value < minVal + minGap) {
      value = minVal + minGap;
    }
    setMaxVal(value);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="relative h-3 bg-gray-300 rounded mb-10">
        {/* Range Fill */}
        <div
          className="absolute h-3 bg-green-500 rounded"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute w-full h-3 bg-transparent appearance-none z-30 pointer-events-auto"
          style={{ WebkitAppearance: "none" }}
        />
        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute w-full h-3 bg-transparent appearance-none z-20 pointer-events-auto"
          style={{ WebkitAppearance: "none" }}
        />
        {/* Custom Thumbs */}
        <div
          className="absolute w-5 h-5 bg-green-500 rounded-full top-1/2 transform -translate-y-1/2"
          style={{ left: `${minPercent}%` }}
        />
        <div
          className="absolute w-5 h-5 bg-green-500 rounded-full top-1/2 transform -translate-y-1/2"
          style={{ left: `${maxPercent}%` }}
        />
      </div>

      {/* Inputs */}
      <div className="flex justify-between gap-4">
        <div className="w-1/2">
          <label className="text-sm text-gray-600">Min</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 text-center"
            value={minVal}
            onChange={(e) => handleMinChange(Number(e.target.value))}
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm text-gray-600">Max</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 text-center"
            value={maxVal}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
