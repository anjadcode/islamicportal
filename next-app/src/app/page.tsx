// app/HomePage.jsx
"use client"; // This is still a client component as it contains other client components

import PrayerTimes from "@/app/components/PrayerTimes";
import IslamicCalendar from "@/app/components/IslamicCalendar";
import HadithOfTheDay from "@/app/components/HadithOfTheDay";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay"; // Import the new component

export default function HomePage() {
  // currentTime state and useEffect are no longer needed here
  // as they are moved to CurrentTimeDisplay component

  return (
    <>
      <Header />
      <div className="h-screen bg-islamic-white flex flex-col items-center justify-center px-4">
        <h1 className="text-base font-medium text-islamic-green-dark py-2">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h1>

        <main className="w-full max-w-4xl grid grid-cols-3 auto-rows-max gap-3">
          {/* Time Display Component (First Row, Full Width) */}
          <CurrentTimeDisplay />

          {/* Existing Cards */}
          <PrayerTimes />
          <HadithOfTheDay />
          <IslamicCalendar />
        </main>
      </div>
      <Footer />
    </>

  );
}