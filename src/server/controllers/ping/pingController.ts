import type { Request, Response } from "express";

const ping = (req: Request, res: Response) => {
  const statusCode = 200;
  const expectedMessage = "🏓 Pong";

  res.status(statusCode).json({ message: expectedMessage });
};

export default ping;
