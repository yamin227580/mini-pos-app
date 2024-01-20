// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const isValid = req.body.date && req.body.dateFrom;
    if (!isValid) return res.status(405).send("bad request");

    const { date, dateFrom } = req.body;

    const data = await prisma.list.findMany();
    const updatedData = data.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString().split("T")[0],
    }));
    const totals: { [createdAt: string]: number } = {};

    for (const entry of updatedData) {
      const { createdAt, price } = entry;

      if (!totals[createdAt]) {
        totals[createdAt] = 0;
      }

      totals[createdAt] += price;
    }

    const filteredFinalLists = Object.fromEntries(
      Object.entries(totals).filter(([createdAt]) => {
        return createdAt >= date.date && createdAt <= dateFrom.date;
      })
    );

    const arrayData: [string, number][] = Object.entries(filteredFinalLists);
    const totalPrice = arrayData.reduce((acc, [key, value]) => acc + value, 0);

    return res.send({ filteredFinalLists, totalPrice });
  }
  res.status(200).json("ok");
}
