import { Course } from 'src/course/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  classroom_name: string;

  @Column({ type: 'int' })
  classroom_capacity: number;

  @OneToMany(() => Course, (course) => course.classroom)
  course: Course[];
}
