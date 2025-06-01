"use client";
import { useState, useEffect } from "react";

interface HadithData {
  hadith_english: string;
  hadith_arabic?: string;
  book?: string;
  chapter_number?: string;
  hadith_number?: string;
}

const EXPRESS_API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";

export default function HadithOfTheDay() {
  const [hadith, setHadith] = useState<HadithData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`${EXPRESS_API_URL}/api/hadith-of-the-day`);
        const data = await res.json();
        setHadith(data || null);
      } catch {
        setHadith(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-sm text-islamic-green">Loading...</p>;
  if (!hadith?.hadith_english) return <p className="text-center text-sm text-red-500">Hadith unavailable.</p>;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-bold text-center text-islamic-green-dark">
        Hadith of the Day
      </h2>
      <blockquote className="text-text-primary text-sm italic mt-2 border-l-4 border-islamic-green pl-3">
        <p>&ldquo;{hadith.hadith_english}&rdquo;</p>
      </blockquote>
      {hadith.book && (
        <p className="text-right text-xs text-gray-500 mt-2">
          {hadith.book}
          {hadith.chapter_number && ` - Ch. ${hadith.chapter_number}`}
          {hadith.hadith_number && `, Hadith ${hadith.hadith_number}`}
        </p>
      )}
      {hadith.hadith_arabic && (
        <div dir="rtl" className="mt-3 text-right text-sm text-gray-700 border-r-4 border-islamic-green pr-3">
          <p>{hadith.hadith_arabic}</p>
        </div>
      )}
    </div>
  );
}
