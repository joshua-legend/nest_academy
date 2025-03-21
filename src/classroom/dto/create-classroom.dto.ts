import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  @IsNotEmpty({ message: 'classroom_name 필드는 필수입니다.' })
  @MaxLength(50)
  classroom_name: string;

  @IsInt({ message: 'classroom_capacity 필드는 정수여야 합니다.' })
  @IsNotEmpty({ message: 'classroom_capacity 필드는 필수입니다.' })
  @Transform(({ value }) => value && Number(value))
  classroom_capacity: number;
}
