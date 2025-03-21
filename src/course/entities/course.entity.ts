import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  course_name: string;

  @Column({ type: 'datetime' })
  classroom_date: Date;

  @Column({ type: 'varchar', length: 50 })
  teacher: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.course)
  classroom: Classroom;
}
