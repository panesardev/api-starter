import { DataSource } from "typeorm";
import { User } from "./domains/users/user.entity";

export const AppDataSource = new DataSource({
  synchronize: true,
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entityPrefix: 'api_',
  entities: [
    User,
  ],
});
