import { Router, Request, Response } from 'express';
// (Interface for HadithApiResponse from previous example)
interface HadithData { hadith_english: string; hadith_arabic?: string; book?: string; chapter_number?: string; hadith_number?: string; }
interface HadithApiResponse { data: HadithData; }

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch('https://random-hadith-generator.vercel.app/bukhari/');
    if (!apiResponse.ok) throw new Error(`Hadith API Error: ${apiResponse.status}`);
    const data: HadithApiResponse = await apiResponse.json();

    if (data && data.data) {
      res.json(data.data);
    } else {
      throw new Error('Hadith data not found in API response');
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch Hadith', details: message });
  }
});
export default router;