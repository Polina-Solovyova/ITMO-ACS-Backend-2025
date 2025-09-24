import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "1h" }
    );

    return { token, user };
  }
}
