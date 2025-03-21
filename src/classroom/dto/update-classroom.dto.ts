import { CreateClassroomDto } from './create-classroom.dto';
import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class UpdateClassroomDto extends CreateClassroomDto {
  @IsString()
  @IsNotEmpty({ message: 'classroom_name은 필수 항목입니다.' })
  @MaxLength(50, { message: 'classroom_name은 최대 50자까지 허용됩니다.' })
  classroom_name: string;

  @IsInt({ message: 'classroom_capacity는 정수여야 합니다.' })
  @IsNotEmpty({ message: 'classroom_capacity는 필수 항목입니다.' })
  classroom_capacity: number;
}
