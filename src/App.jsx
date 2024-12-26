/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

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

// Returns the current local time as "HH:00"
function getCurrentHourAsTimeString() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  return `${hours}:00`;
}

function App() {
  const [localTimeInput, setLocalTimeInput] = useState(
    getCurrentHourAsTimeString()
  );

  useEffect(() => {
    function scheduleHourlyUpdate() {
      const now = new Date();

      // Determine the next top-of-the-hour
      const nextHour = new Date(now);
      nextHour.setMinutes(0, 0, 0);
      // If we're exactly on the hour, move to the next
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        nextHour.setHours(now.getHours() + 1);
      } else {
        nextHour.setHours(now.getHours() + 1);
      }

      const msUntilNextHour = nextHour - now;

      const timeoutId = setTimeout(() => {
        setLocalTimeInput(getCurrentHourAsTimeString());
        scheduleHourlyUpdate();
      }, msUntilNextHour);

      return () => clearTimeout(timeoutId);
    }

    const cleanup = scheduleHourlyUpdate();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  function getLocalDateFromInput() {
    if (!localTimeInput) return null;
    const [hours, minutes] = localTimeInput.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  function formatTime(date, timeZone) {
    if (!date) return "--:--";
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone,
    }).format(date);
  }

  const localDate = getLocalDateFromInput();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Time Zone Converter
      </h1>

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
