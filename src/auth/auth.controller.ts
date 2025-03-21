import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(createAuthDto);
    (res as any).cookie('refreshToken', refreshToken, {
      httpOnly: true, // 클라이언트 스크립트 접근 차단
      sameSite: 'lax', // CSRF 공격 방지를 위한 설정 (혹은 'lax'로 설정 가능)
      // maxAge: 10 * 60 * 1000, // (선택사항) 쿠키 만료 시간을 설정할 수 있음
    });
    return { accessToken };
  }
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = (req as any).cookies?.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException('리프레쉬 토큰이 존재하지 않습니다.');
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    // 새 리프레쉬 토큰을 httpOnly 쿠키로 재설정
    (res as any).cookie('refreshToken', newRefreshToken, {
      httpOnly: true, // 클라이언트 JS에서 접근 차단
      sameSite: 'lax', // CSRF 방어(도메인 상황에 맞춰 'strict'/'none' 조정)
    });

    return { accessToken };
  }

  // 선택 사항: 회원가입 엔드포인트
  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(createUserDto);
  // }

  // 프로필 조회 엔드포인트 (JWT Guard 적용)
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@GetUser() user: any) {
  //   return user;
  // }
}
