// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const isValid = req.body.name && req.body.price;
    if (!isValid) {
      return res.status(405).send("bad request!Missing required fields");
    }
    const { name, price } = req.body;
    const data = await prisma.expense.create({
      data: { name, price },
    });
    return res.send(data);
  }
  if (req.method === "GET") {
    const data = await prisma.expense.findMany();
    const updatedData = data.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString().split("T")[0],
    }));
    const totalPrice = updatedData.reduce((acc, item) => acc + item.price, 0);

    return res.send({ totalPrice, updatedData });
  }
  res.status(200).json("ok");
}
