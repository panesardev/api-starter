import { AppDataSource } from "../../database";
import { User } from "./user.entity";

export const UserRepository = AppDataSource.getRepository(User);