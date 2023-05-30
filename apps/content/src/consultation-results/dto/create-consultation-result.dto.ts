import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IsResultJson } from '../validator';

export class CreateConsultationResultDto {
  @ApiProperty({
    example: 'JJJJ-V33ABB-343R-33434',
    description: 'Question id',
    required: true,
    nullable: false,
  })
  @IsUUID()
  question_id: string;
  @ApiProperty({
    description: 'Result data as json',
    example: { cartography: [] },
    required: true,
    nullable: false,
  })
  @IsResultJson()
  data: object;
}
