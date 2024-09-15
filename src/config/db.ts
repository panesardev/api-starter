import { DataSource } from "typeorm";
import { User } from "../domains/users/user.entity";
import { POSTGRES_URL } from "../constants/env";

export const AppDataSource = new DataSource({
  synchronize: true,
  type: "postgres",
  url: POSTGRES_URL,
  entityPrefix: 'api_',
  entities: [
    User,
  ],
});

export const UserRepository = AppDataSource.getRepository(User);