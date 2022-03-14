import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});
const PORT = 8000;
app.use(express.json());
app.use(cors());

async function getUserFromToken(token: string) {
  // @ts-ignore
  const decodedData = jwt.verify(token, process.env.MY_SECRET);
  // @ts-ignore
  const user = await prisma.user.findUnique({ where: { id: decodedData.id } });

  return user;
}
function createToken(id: number) {
  // @ts-ignore
  return jwt.sign({ id: id }, process.env.MY_SECRET, { expiresIn: "1days" });
}
app.post("/register", async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 8);
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        fullName,
        amountInAccount: 25.4,
        transaction: {
          create: [
            {
              amount: 40.65,
              completedAt: "14/02/2021",
              currency: "$",
              isPositive: true,
              receiverOrSender: "sender",
            },
            {
              amount: 20.15,
              completedAt: "20/01/2022",
              currency: "$",
              isPositive: false,
              receiverOrSender: "sender",
            },
          ],
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        amountInAccount: true,
        transaction: true,
      },
    });
    res.send({ user, token: createToken(user.id) });
  } catch (err) {
    //@ts-ignore
    res.status(400).send({ error: err.message });
  }
});
app.post("/log-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    // @ts-ignore
    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (user && passwordMatches) {
      res.send({ user, token: createToken(user.id) });
    } else {
      throw Error("BOOM!");
    }
  } catch (err) {
    res.status(400).send({ error: "User/password invalid." });
  }
});
app.post("/banking-info", async (req, res) => {
  const { token } = req.body;

  try {
    const user = await getUserFromToken(token);
    res.send(user);
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`);
});
