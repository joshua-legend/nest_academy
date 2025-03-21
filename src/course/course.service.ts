import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { classroomId, course_name, classroom_date, teacher } =
      createCourseDto;
    const classroom = await this.classroomRepository.findOne({
      where: { id: classroomId },
    });
    if (!classroom) {
      throw new NotFoundException(
        `Classroom with id ${classroomId} not found.`,
      );
    }
    const newCourse = this.courseRepository.create({
      course_name,
      classroom_date,
      teacher,
      classroom, // 외래키 참조
    });

    return await this.courseRepository.save(newCourse);
  }

  findAll() {
    return this.courseRepository.find({ relations: ['classroom'] });
  }

  findOne(id: number) {
    return this.courseRepository.find({
      where: { id },
      relations: ['classroom'],
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    // 1. 업데이트할 Course 엔티티 조회
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found.`);
    }

    // 2. update DTO에서 classroomId로 참조할 Classroom 엔티티 조회
    const { classroomId, course_name, classroom_date, teacher } =
      updateCourseDto;
    const classroom = await this.classroomRepository.findOne({
      where: { id: classroomId },
    });
    if (!classroom) {
      throw new NotFoundException(
        `Classroom with id ${classroomId} not found.`,
      );
    }

    // 3. 기존 Course 엔티티에 업데이트할 값 병합
    course.course_name = course_name;
    course.classroom_date = classroom_date;
    course.teacher = teacher;
    course.classroom = classroom; // 외래키 관계 업데이트

    // 4. 업데이트된 엔티티 저장 후 반환
    return await this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`course with id ${id} not found.`);
    }
    return await this.courseRepository.remove(course);
  }
}
