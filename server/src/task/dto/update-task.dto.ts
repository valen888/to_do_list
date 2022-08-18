import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export default class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;
}
