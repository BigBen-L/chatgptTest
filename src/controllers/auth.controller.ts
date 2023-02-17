import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export async function register(
  req: Request,
  res: Response,
): Promise<void> {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error });
  }
}
