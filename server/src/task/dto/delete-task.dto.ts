import { IsNotEmpty, IsString } from 'class-validator';

export default class DeleteTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
