import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const JWT_SECRET = crypto.randomBytes(64).toString("hex");

export class AuthService {
  static async register(data: Partial<User>) {
    const existing = await userRepository.findOneBy({ email: data.email });
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const user = userRepository.create({ ...data, password: hashedPassword });
    await userRepository.save(user);

    return user;
  }

  static async login(email: string, password: string) {
    const user = await userRepository.findOneBy({ email });
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }

}
