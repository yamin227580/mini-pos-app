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
    const { name, price, customDate } = req.body;
    if (customDate) {
      const dateObject = new Date(customDate);
      const isoDateString = dateObject.toISOString();
      const data = await prisma.list.create({
        data: {
          name,
          price,
          createdAt: isoDateString ? isoDateString : undefined,
        },
      });
      return res.send(data);
    } else {
      const data = await prisma.list.create({
        data: {
          name,
          price,
        },
      });
      return res.send(data);
    }
  }
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

    // find item with quantity
    const itemWithQuantity: { [name: string]: number } = {};

    for (const entry of updatedData) {
      const { name } = entry;
      const trimmedName = name.trim();

      if (!itemWithQuantity[trimmedName]) {
        itemWithQuantity[trimmedName] = 0;
      }

      itemWithQuantity[trimmedName] += 1;
    }
    return res.send({ itemWithQuantity, startDateString, lastDateString });
  }
  res.status(200).json("ok");
}
