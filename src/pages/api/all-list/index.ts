// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.list.findMany();

    const updatedData = data.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString().split("T")[0],
    }));

    //find minDate and maxdate
    const dateArray = updatedData.map((item) => new Date(item.createdAt));
    const dateObjects: Date[] = dateArray.map((dateStr) => new Date(dateStr));
    const startDate = new Date(
      Math.min(...dateObjects.map((date) => date.getTime()))
    );
    const lastDate = new Date(
      Math.max(...dateObjects.map((date) => date.getTime()))
    );

    const startDateString = startDate.toISOString().split("T")[0];
    const lastDateString = lastDate.toISOString().split("T")[0];

    // Initialize totals as an empty object
    const totals: { [createdAt: string]: number } = {};

    for (const entry of updatedData) {
      const { createdAt, price } = entry;

      if (!totals[createdAt]) {
        totals[createdAt] = 0;
      }

      totals[createdAt] += price;
    }

    const arrayData: [string, number][] = Object.entries(totals);
    const totalPrice = arrayData.reduce((acc, [key, value]) => acc + value, 0);

    return res.send({ totals, totalPrice, startDateString, lastDateString });
  }
  res.status(200).json("ok");
}
