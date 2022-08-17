import { IsNotEmpty, IsString } from 'class-validator';

export class AddTaskDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
