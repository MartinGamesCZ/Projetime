import { IsNumber, IsString, IsUUID, Length, Max, Min } from 'class-validator';

export class CreateProjectDto {
  @IsUUID()
  clientId: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(10000)
  rate: number;
}
