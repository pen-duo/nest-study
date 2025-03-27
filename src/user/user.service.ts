import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {} // 使用构造器注入替代属性注入

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find((item) => item.username === registerUserDto.username);
    if (foundUser) {
      throw new Error('该用户名已存在');
    }
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);
    await this.dbService.write(users);
    return users;
  }
}
