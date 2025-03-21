import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomModule } from './classroom/classroom.module';
import { Classroom } from './classroom/entities/classroom.entity';
import { CourseModule } from './course/course.module';
import { Course } from './course/entities/course.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'joshua',
      password: '1234',
      database: 'academy',
      entities: [Classroom, Course, User],
      synchronize: true,
    }),
    ClassroomModule,
    CourseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 학생 : id, 이름, 나이, 전화번호, 수강목록

// 수업 : id, 수강명, 강사시치명, 수강 시간, 교실명

// 등록 : id, 학생, 수업

// 교실 : id, 교실명, 수용가능인원

// 하나의 교실은 여러 수업을 갖는다. (1:N)
// 하나의 수업은 하나의 수업을 갖는다. (1:1)

// 하나의 학생은 여러 수업을 갖는다.
// 하나의 수업은 여러 학생을 갖는다.
