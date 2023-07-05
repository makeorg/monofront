import {
  Injectable,
  Scope,
  NotFoundException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@make.org/content/src/prisma/prisma.service';
import { CreateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/create-consultation-result.dto';
import { UpdateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/update-consultation-result.dto';
import { ConsultationResult } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ConsultationResultsService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private request: Request & { user?: { userId: string } },
  ) {}

  create(
    createConsultationResultDto: CreateConsultationResultDto,
  ): Promise<ConsultationResult> {
    const { question_id, data } = createConsultationResultDto;
    const authorId = this.request['user']?.userId;
    if (!authorId) {
      throw new InternalServerErrorException('User required but not found');
    }

    return this.prisma.consultationResult.create({
      data: {
        question_id,
        data,
        author_id: authorId,
      },
    });
  }

  findAll(params: { skip?: number; take?: number; questionId?: string }) {
    const { skip, take, questionId } = params;
    const query = {
      skip: skip && !isNaN(skip) ? skip : 0,
      take: take && !isNaN(take) ? take : 10,
      where: {},
    };
    if (questionId && questionId !== 'undefined') {
      query['where'] = {
        question_id: questionId,
      };
    }

    return this.prisma.consultationResult.findMany(query);
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

  update(
    id: string,
    updateConsultationResultDto: UpdateConsultationResultDto,
  ): Promise<ConsultationResult> {
    const authorId = this.request['user']?.userId;
    if (!authorId) {
      throw new InternalServerErrorException('User required but not found');
    }

    return this.prisma.consultationResult.update({
      where: { id },
      data: {
        ...updateConsultationResultDto,
        author_id: authorId,
      },
    });
  }

  remove(id: string) {
    return this.prisma.consultationResult.delete({
      where: { id },
    });
  }
}
