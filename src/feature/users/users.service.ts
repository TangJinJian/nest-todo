import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../../common/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly password: PasswordService,
    ) { }

    /**
     * 创建一个用户
     * @param createUserDto 
     */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 加密密码
    const hashPassword = await this.password.hash(createUserDto.password);
    // 创建新用户
    const createdUser = new this.userModel({
      account: createUserDto.account,
      password: hashPassword,
    });
    // 保存新用户
    return await createdUser.save();
  }

  /**
   * 判断账号和密码是否匹配
   * @param account 账号
   * @param password 密码
   */
  async isPasswordCorrect(account: string, password: string): Promise<boolean> {
    // 根据账号查询用户
    const user = await this.userModel.findOne({ account });
    // 若查询不到用户，则返回假
    if (!user) {
      return false;
    }
    // 判断密码是否匹配
    return this.password.compare(password, user.password);
  }

  async hasUser(account: string): Promise<boolean> {
    // 根据账号查询用户是否存在
    return await this.userModel.findOne({ account }) !== null;
  }

  /**
   * 通过账号和密码查找一个用户
   * @param account 账号
   * @param password 密码
   */
  async findOneByAccountAndPassword(account: string, password: string) {
    return await this.userModel.findOne({ account, password: await this.password.hash(password) });
  }
}
