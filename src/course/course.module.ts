import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Classroom])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
