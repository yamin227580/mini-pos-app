// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
  if (req.method === "DELETE") {
    const idToDelete = Number(req.query.id);
    const dateFromFront = String(req.query.date);

    if (!idToDelete) {
      return res.status(405).send("bad request!Missing required fields");
    }

    await prisma.list.delete({ where: { id: idToDelete } });

    const data = await prisma.list.findMany();

    const updatedData = data.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString().split("T")[0],
    }));

    const filteredData = updatedData.filter(
      (item) => item.createdAt === dateFromFront
    );

    const totalPrice = filteredData.reduce((acc, item) => acc + item.price, 0);

    return res.send({ totalPrice, filteredData });
  }
  if (req.method === "PUT") {
    const { idToUpdate, name, price, date } = req.body;

    if (!idToUpdate && name && price) {
      return res.status(405).send("bad request!Missing required fields");
    }

    await prisma.list.update({
      data: { name, price },
      where: { id: idToUpdate },
    });
    const data = await prisma.list.findMany();

    const dataWithDateString = data.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString().split("T")[0],
    }));

    const updatedData = dataWithDateString.filter(
      (item) => item.createdAt === date
    );

    const totalPrice = updatedData.reduce((acc, item) => acc + item.price, 0);

    return res.send({ totalPrice, updatedData });
  }
  res.status(200).json("ok");
}
