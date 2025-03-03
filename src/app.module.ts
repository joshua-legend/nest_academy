import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 ConfigService를 사용할 수 있게 설정
      envFilePath: '.env', // 사용할 환경 변수 파일 지정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
