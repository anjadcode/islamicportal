"use client";
import { useState, useEffect } from "react";

interface HijriDateData {
  day: string;
  month: { en: string };
  year: string;
  designation: { abbreviated: string };
}

const EXPRESS_API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";

const holidays: Record<string, string> = {

};


export default function IslamicCalendar() {
  const [hijriDate, setHijriDate] = useState<HijriDateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`${EXPRESS_API_URL}/api/islamic-calendar`);
        const data = await res.json();
        setHijriDate(data?.hijri || null);
      } catch {
        setHijriDate(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-sm text-islamic-green">Loading...</p>;
  if (!hijriDate) return <p className="text-center text-sm text-red-500">Hijri date unavailable.</p>;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold text-center text-islamic-green-dark">Islamic Calendar</h2>
      <p className="text-center text-xs text-gray-500">Month: {hijriDate.month.en} {hijriDate.year}</p>

      <div className="grid grid-cols-7 gap-1 mt-3">
        {[...Array(30)].map((_, i) => {
          const day = (i + 1).toString();
          const isToday = day === hijriDate.day;
          const holidayInfo = holidays[day];

          return (
            <div
              key={day}
              className={`p-2 text-center text-sm rounded-md font-semibold cursor-pointer ${
                isToday ? "bg-islamic-green text-white" : holidayInfo ? "bg-yellow-300 text-black" : "bg-gray-100 text-gray-700"
              }`}
              title={holidayInfo ? holidayInfo : `Day ${day} of ${hijriDate.month.en}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
