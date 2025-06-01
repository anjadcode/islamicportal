"use client";

import { useState, useEffect } from "react";
import { LocationData } from "../types/location";

export interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise?: string;
}

// Define `data` outside the function
export let data: PrayerTimesData | null = null;
let dataLoc: LocationData | null = null;

const EXPRESS_API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resLoc = await fetch(`${EXPRESS_API_URL}/api/get-ip`);
        dataLoc = await resLoc.json();

        const resPray = await fetch(`${EXPRESS_API_URL}/api/prayer-times?city=${dataLoc?.city}&country=${dataLoc?.country}`);
        data = await resPray.json();
        setPrayerTimes(data);
      } catch {
        setPrayerTimes(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-sm text-islamic-green">Loading...</p>;
  if (!prayerTimes) return <p className="text-center text-sm text-red-500">Prayer times unavailable.</p>;

  const displayOrder: (keyof PrayerTimesData)[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4 mx-auto">
      <h2 className="text-base font-semibold text-center text-islamic-green-dark">Prayer Times</h2>
      <div className="mt-2 space-y-1">
        {displayOrder.filter((name) => prayerTimes[name]).map((name) => (
          <div key={name} className="flex justify-between text-sm p-2 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700">{name}</span>
            <span className="font-bold text-islamic-green">{prayerTimes[name]}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-center text-gray-500 mt-4">{dataLoc?.city}, {dataLoc?.country}</p>
    </div>
  );
}
