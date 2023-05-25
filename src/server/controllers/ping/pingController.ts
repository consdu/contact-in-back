import type { Request, Response } from "express";

const ping = (req: Request, res: Response) => {
  const status = 200;
  const message = "🏓 Pong";

  res.status(status).json({ message });
};

export default ping;
