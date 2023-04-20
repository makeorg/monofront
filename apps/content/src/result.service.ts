import { Injectable } from '@nestjs/common';
import { PrismaService } from '@make.org/content/src/prisma/prisma.service';
import { ConsultationResult, Prisma } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) {}

  async result(
    resultWhereUniqueInput: Prisma.ConsultationResultWhereUniqueInput,
  ): Promise<ConsultationResult | null> {
    return this.prisma.consultationResult.findUnique({
      where: resultWhereUniqueInput,
    });
  }

  async results(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConsultationResultWhereUniqueInput;
    where?: Prisma.ConsultationResultWhereInput;
    orderBy?: Prisma.ConsultationResultOrderByWithRelationInput;
  }): Promise<ConsultationResult[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.consultationResult.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createResult(
    data: Prisma.ConsultationResultCreateInput,
  ): Promise<ConsultationResult> {
    return this.prisma.consultationResult.create({
      data,
    });
  }

  async updateResult(params: {
    where: Prisma.ConsultationResultWhereUniqueInput;
    data: Prisma.ConsultationResultUpdateInput;
  }): Promise<ConsultationResult> {
    const { where, data } = params;
    return this.prisma.consultationResult.update({
      data,
      where,
    });
  }

  async deleteResult(
    where: Prisma.ConsultationResultWhereUniqueInput,
  ): Promise<ConsultationResult> {
    return this.prisma.consultationResult.delete({
      where,
    });
  }
}
