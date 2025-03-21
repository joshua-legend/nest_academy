import { Type } from 'class-transformer';
import { CreateCourseDto } from './create-course.dto';
import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class UpdateCourseDto extends CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'course_name은 필수 항목입니다.' })
  course_name: string;

  @IsDateString(
    {},
    { message: 'classroom_date는 유효한 날짜 형식이어야 합니다.' },
  )
  classroom_date: Date;

  @IsString()
  @IsNotEmpty({ message: 'teacher는 필수 항목입니다.' })
  teacher: string;

  @IsInt({ message: 'classroomId는 정수여야 합니다.' })
  @IsNotEmpty({ message: 'classroomId는 필수 항목입니다.' })
  @Type(() => Number)
  classroomId: number;
}
