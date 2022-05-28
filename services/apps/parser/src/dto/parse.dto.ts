import { IsInt, IsNotEmpty } from 'class-validator';

export class ParseDto {
  @IsNotEmpty()
  @IsInt()
  page: number;

  @IsNotEmpty()
  @IsInt()
  count: number;
}
