"use client";

import { useState, useEffect, useRef } from "react";
import { PrayerTimesData } from "./PrayerTimes";
import { LocationData } from "../types/location";

const ADHAN_AUDIO = "./adhan.mp3"; // Place Adhan file in the public folder
const EXPRESS_API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";
let dataLoc: LocationData | null = null;

export default function CurrentTimeDisplay() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [nextPrayer, setNextPrayer] = useState({ name: "Unknown", time: "00:00:00" });

  // 🔧 Use `useRef` for Adhan Trigger (instant updates)
  const adhanTriggeredRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resLoc = await fetch(`${EXPRESS_API_URL}/api/get-ip`);
        dataLoc = await resLoc.json();

        const resPray = await fetch(`${EXPRESS_API_URL}/api/prayer-times?city=${dataLoc?.city}&country=${dataLoc?.country}`);
        const data: PrayerTimesData = await resPray.json();
        setPrayerTimes(data);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setPrayerTimes(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentTime(timeString);

      if (prayerTimes) {
        const upcomingPrayer = getNextPrayer(timeString, prayerTimes);

        //console.log("Adhan Trigger Status:", adhanTriggeredRef.current);
        //console.log("Current Time:", timeString, "Next Prayer:", upcomingPrayer.time);

        // ✅ Ensure Adhan triggers ONLY ONCE when transitioning to a new prayer time
        if (timeString === upcomingPrayer.time + ":00" && !adhanTriggeredRef.current) {
          console.log("Playing Adhan!");
          const adhan = new Audio(ADHAN_AUDIO);
          adhan.play(); // Plays Adhan ONLY ONCE per prayer time

          // ✅ Update Adhan Trigger Flag (without waiting for React state update)
          adhanTriggeredRef.current = true;

          // ✅ Reset flag after Adhan duration (prevent multiple triggers)
          setTimeout(() => {
            //adhan.pause();
            adhanTriggeredRef.current = false; // Allow future Adhan triggers
            console.log("Adhan Trigger Reset!");
          }, 30000);
        }

        setNextPrayer(upcomingPrayer);
      }
    };

    updateTime();
    intervalRef.current = setInterval(updateTime, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [prayerTimes]);

  const getNextPrayer = (currentTime: string, prayerTimes: PrayerTimesData) => {
    const currentParts = currentTime.split(":").map(Number);
    const currentSeconds = currentParts[0] * 3600 + currentParts[1] * 60;

    let nextPrayer = { name: "Fajr (Next Day)", time: prayerTimes.Fajr };
    let minDiff = Infinity;

    for (const [name, time] of Object.entries(prayerTimes)) {
      const prayerParts = time.split(":").map(Number);
      const prayerSeconds = prayerParts[0] * 3601 + prayerParts[1] * 60;

      if (prayerSeconds > currentSeconds) {
        const diff = prayerSeconds - currentSeconds;
        if (diff < minDiff) {
          minDiff = diff;
          nextPrayer = { name, time };
        }
      }
    }

    return nextPrayer;
  };

  return (
    <div
      className={`col-span-3 shadow-sm rounded-lg px-4 py-2 flex flex-col justify-center items-center gap-3 text-lg font-mono ${adhanTriggeredRef.current ? "animate-pulse bg-islamic-green text-white" : "bg-white text-islamic-green-dark"
        } transition-all duration-500`}
    >
      {/* Next Prayer Time */}
      <div className="text-sm font-medium text-gray-600">
        Next Prayer: <span className="font-bold text-islamic-green">{nextPrayer.name}</span> at{" "}
        <span className="font-bold">{nextPrayer.time}</span>
      </div>

      {/* Current Time */}
      <div className="text-3xl font-bold">{currentTime}</div>
      <div>
        {dataLoc ? (
          <div>
            <p>{dataLoc?.city},<strong>{dataLoc?.country}</strong> </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
