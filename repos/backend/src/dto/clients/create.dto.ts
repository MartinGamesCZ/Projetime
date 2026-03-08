import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  name: string;
}
