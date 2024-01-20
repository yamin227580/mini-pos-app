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

    return res.send({ totals, totalPrice });
  }
  res.status(200).json("ok");
}
