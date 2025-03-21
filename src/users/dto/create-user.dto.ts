import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6, { message: 'password는 최소 6자 이상이어야 합니다.' })
  @MaxLength(50, { message: 'password는 최대 50자 이하이어야 합니다.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'name은 필수 입력 사항입니다.' })
  name: string;

  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  @IsNotEmpty({ message: 'email은 필수 입력 사항입니다.' })
  email: string;
}
