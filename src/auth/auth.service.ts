import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 패스워드 확인하세요');
    }
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1m',
      secret: 'koreait1234',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '2m',
      secret: 'koreait1234',
    });

    return { accessToken, refreshToken };
  }
  async refreshToken(oldRefreshToken: string) {
    try {
      // 리프레쉬 토큰 검증 (여기서는 간단히 jwtService.verify 사용)
      const payload = this.jwtService.verify(oldRefreshToken, {
        secret: 'koreait1234',
      });

      // 실제 환경에서는 payload와 DB의 토큰 정보(예: 저장된 토큰 또는 사용자 상태)를 추가로 확인해야 합니다.
      const user = await this.usersService.findOne(payload.id);
      if (!user) {
        throw new UnauthorizedException('사용자 정보가 유효하지 않습니다.');
      }

      const newPayload = { id: user.id, email: user.email };
      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '1m',
        secret: 'koreait1234',
      });
      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '2m',
        secret: 'koreait1234',
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('리프레쉬 토큰이 유효하지 않습니다.');
    }
  }
}
