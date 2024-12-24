/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const cities = [
  { label: "Tokyo, Japan", timeZone: "Asia/Tokyo" },
  { label: "Seoul, South Korea", timeZone: "Asia/Seoul" },
  { label: "Moscow, Russia", timeZone: "Europe/Moscow" },
  { label: "Kyiv, Ukraine", timeZone: "Europe/Kiev" },
  { label: "Bangkok, Thailand", timeZone: "Asia/Bangkok" },
  { label: "Manila, Philippines", timeZone: "Asia/Manila" },
  { label: "Bucharest, Romania", timeZone: "Europe/Bucharest" },
  { label: "Krakow, Poland", timeZone: "Europe/Warsaw" },
  { label: "Vienna, Austria", timeZone: "Europe/Vienna" },
  { label: "Munich, Germany", timeZone: "Europe/Berlin" },
  { label: "Paris, France", timeZone: "Europe/Paris" },
  { label: "Lisbon, Portugal", timeZone: "Europe/Lisbon" },
  { label: "Madrid, Spain", timeZone: "Europe/Madrid" },
  { label: "London, United Kingdom", timeZone: "Europe/London" },
  { label: "New York, USA", timeZone: "America/New_York" },
  { label: "Sao Paulo, Brazil", timeZone: "America/Sao_Paulo" },
  { label: "Los Angeles, USA", timeZone: "America/Los_Angeles" },
];

// Helper function to get the current local hour, always :00 (e.g. "10:00")
function getCurrentHourAsTimeString() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  return `${hours}:00`;
}

function App() {
  // Default the time input to the current local hour
  const [localTimeInput, setLocalTimeInput] = useState(
    getCurrentHourAsTimeString()
  );

  // Convert HH:MM string to a Date object for *today* in local time.
  const getLocalDateFromInput = () => {
    if (!localTimeInput) return null;
    const [hours, minutes] = localTimeInput.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  };

  const localDate = getLocalDateFromInput();

  // Format a date for a given time zone in 24-hour format.
  const formatTime = (date, timeZone) => {
    if (!date) return "--:--";
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // forces 24-hour format
      timeZone,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Time Zone Converter
      </h1>

      {/* Current Location Input */}
      <div className="mb-8 w-full max-w-sm mx-auto">
        <label className="block mb-2 font-semibold">
          Current Location Time (24h)
        </label>
        <input
          type="time"
          value={localTimeInput}
          onChange={(e) => setLocalTimeInput(e.target.value)}
          className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none"
        />
      </div>

      {/* Table Wrapper for Horizontal Scrolling on Small Screens */}
      <div className="overflow-x-auto w-full max-w-lg mx-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-zinc-700">
              <th className="py-2">City</th>
              <th className="py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.label} className="border-b border-zinc-800">
                <td className="py-2">{city.label}</td>
                <td className="py-2 font-mono">
                  {formatTime(localDate, city.timeZone)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
