import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

export namespace UserService {
  export async function findById(id: User['id']): Promise<User> {
    const user = await UserRepository.findOneBy({ id });
    if (user) delete user.password;
    return user;
  }
  
  export async function findByEmail(email: string): Promise<User> {
    return await UserRepository.findOneBy({ email });
  }

  export async function findAll(): Promise<User[]> {
    const users = await UserRepository.find();
    return users.map(user => {
      if (user) delete user.password;
      return user;
    });
  }

  export async function create(user: User): Promise<User> {
    return await UserRepository.save(user);
  }

  export async function update(user: User): Promise<User> {
    if (!user.id) throw Error('user id required');
    return await UserRepository.save(user);
  } 
  
  export async function remove(id: User['id']): Promise<void> {
    if (!id) throw Error('user id required');
    await UserRepository.delete(id);
  }
}
