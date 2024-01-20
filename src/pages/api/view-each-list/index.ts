// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dataList = [];
    const isValid = req.body.date;
    if (!isValid) {
      return res.status(405).send("bad request!Missing required fields");
    }
    const { date } = req.body;

    const data = await prisma.list.findMany();

    const updatedData = data.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString().split("T")[0],
    }));

    const filteredData = updatedData.filter((item) => item.createdAt === date);

    const totalPrice = filteredData.reduce((acc, item) => acc + item.price, 0);

    return res.send({ totalPrice, filteredData });
  }
  res.status(200).json("ok");
}
