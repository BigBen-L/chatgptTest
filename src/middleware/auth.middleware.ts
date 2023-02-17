import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

interface IUserRequest extends Request {
    userId: String
}
export function authMiddleware(
  req: IUserRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
}

