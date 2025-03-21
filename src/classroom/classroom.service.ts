import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}
  async create(createClassroomDto: CreateClassroomDto) {
    const classroom = this.classroomRepository.create(createClassroomDto);
    return await this.classroomRepository.save(classroom);
  }

  findAll() {
    return this.classroomRepository.find();
  }

  async findOne(id: number) {
    return await this.classroomRepository.findOne({ where: { id } });
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    const findClassroomData = await this.classroomRepository.findOne({
      where: { id },
    });

    if (!findClassroomData) {
      throw new NotFoundException(`Classroom with id ${id} not found.`);
    }
    findClassroomData.classroom_name = updateClassroomDto.classroom_name;
    return await this.classroomRepository.save(findClassroomData);
  }

  async remove(id: number) {
    const findClassroomData = await this.classroomRepository.findOne({
      where: { id },
    });
    if (!findClassroomData) {
      throw new NotFoundException(`Classroom with id ${id} not found.`);
    }
    const removedClassroom =
      await this.classroomRepository.remove(findClassroomData);
    return removedClassroom;
  }

  async removeAll() {
    return await this.classroomRepository.delete({});
  }
}
