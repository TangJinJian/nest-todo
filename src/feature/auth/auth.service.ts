import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * 根据账号签发 Token
   * @param account 账号
   * @returns JWT Toekn
   */
  async signIn(account: string): Promise<string> {
    const payload: JwtPayload = { account };
    return this.jwtService.sign(payload);
  }

  /**
   * 根据载体判断包含的用户，是否存在
   * @param payload 载体
   * @returns 用户名或者 null
   */
  async validateUser(payload: JwtPayload): Promise<string> {
    if (await this.usersService.hasUser(payload.account)) {
      return payload.account;
    } else {
      return null;
    }
  }
}
