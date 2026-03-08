import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateProjectDto {
  @IsUUID()
  @IsOptional()
  clientId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000)
  rate?: number;
}
