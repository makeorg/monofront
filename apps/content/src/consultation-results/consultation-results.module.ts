import { Module } from '@nestjs/common';
import { ConsultationResultsService } from '@make.org/content/src/consultation-results/consultation-results.service';
import { ConsultationResultsController } from '@make.org/content/src/consultation-results/consultation-results.controller';
import { PrismaModule } from '@make.org/content/src/prisma/prisma.module';

@Module({
  controllers: [ConsultationResultsController],
  providers: [ConsultationResultsService],
  imports: [PrismaModule],
})
export class ConsultationResultsModule {}
