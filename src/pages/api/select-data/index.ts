// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const selectData = await prisma.category.findMany();
    return res.send(selectData);
  }
  if (req.method === "POST") {
    const isValid = req.body;
    if (!isValid) {
      return res.status(405).send("bad request!Missing required fields");
    }
    const itemCategories = req.body;
    for (const item of itemCategories) {
      await prisma.category.create({
        data: {
          name: item,
        },
      });
    }
    const data = await prisma.category.findMany();
    return res.send(data);
  }
  res.status(200).json("ok");
}
