import { ApiProperty } from '@nestjs/swagger';

/**
 * Data for generating a consultation result page
 */
export class ConsultationResult {
  @ApiProperty({
    example: 'JJJJ-V33ABB-343R-33434',
    description: 'Consultation result id',
  })
  id: string;

  @ApiProperty({
    example: 'JJJJ-V33ABB-343R-33434',
    description: 'Question id',
  })
  question_id: string;

  @ApiProperty({
    description: 'Created at',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Updated at',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Author id',
    example: 'VHGG-D33AKK-993J-2345V',
  })
  author_id: string;

  @ApiProperty({
    description: 'Result data as json',
    example: { cartography: [] },
  })
  data: object;
}
