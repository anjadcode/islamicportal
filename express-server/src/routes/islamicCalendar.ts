import { Router, Request, Response } from 'express';
// (Interfaces for HijriResponse from previous example)
interface HijriMonth { number: number; en: string; ar: string; }
interface HijriDesignation { abbreviated: string; expanded: string; }
interface HijriDateData { day: string; month: HijriMonth; year: string; designation: HijriDesignation; }
interface HijriResponse { code: number; status: string; data?: { hijri: HijriDateData; }; }


const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const dateString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    console.log("date:",dateString);
    const apiResponse = await fetch(`http://api.aladhan.com/v1/gToH/${dateString}`);

    if (!apiResponse.ok) throw new Error(`Aladhan API Error: ${apiResponse.status}`);
    const data: HijriResponse = await apiResponse.json();

    if (data.code === 200 && data.data?.hijri) {
      res.json({ hijri: data.data.hijri });
    } else {
      throw new Error('Hijri data not found in Aladhan response');
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch Islamic calendar', details: message });
  }
});
export default router;