import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@make.org/content/src/prisma/prisma.service';
import { CreateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/create-consultation-result.dto';
import { UpdateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/update-consultation-result.dto';
import { ConsultationResult } from '@prisma/client';

@Injectable()
export class ConsultationResultsService {
  constructor(private prisma: PrismaService) {}

  create(
    createConsultationResultDto: CreateConsultationResultDto,
  ): Promise<ConsultationResult> {
    const { slug, question_id, data } = createConsultationResultDto;
    return this.prisma.consultationResult.create({
      data: {
        slug,
        question_id,
        data,
        author_id: 'TEST_AUTHOR_ID',
      },
    });
  }

  findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.consultationResult.findMany({
      skip: skip ? skip : 0,
      take,
    });
  }

  async findOne(id: string) {
    const result = await this.prisma.consultationResult.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(
        `Consultation result with id ${id} not found`,
      );
    }

    return result;
  }

  update(id: string, updateConsultationResultDto: UpdateConsultationResultDto) {
    return this.prisma.consultationResult.update({
      where: { id },
      data: updateConsultationResultDto,
    });
  }

  remove(id: string) {
    return this.prisma.consultationResult.delete({
      where: { id },
    });
  }
}
