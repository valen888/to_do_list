import { IsNotEmpty, IsString } from 'class-validator';

export default class AddTaskDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
