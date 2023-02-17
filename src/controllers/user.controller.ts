import { Request, Response } from 'express';
import { User } from '../models';

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ error });
  }
}

