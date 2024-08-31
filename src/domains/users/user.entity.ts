import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;
  
  @Column()
  displayName: string;
  
  @Column()
  verified: boolean;

  @Column()
  created: Date;
}
