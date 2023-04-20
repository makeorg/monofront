import { PartialType } from '@nestjs/swagger';
import { CreateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/create-consultation-result.dto';

export class UpdateConsultationResultDto extends PartialType(
  CreateConsultationResultDto,
) {}
