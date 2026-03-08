import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;
}
