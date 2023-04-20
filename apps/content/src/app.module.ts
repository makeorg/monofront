import { Module } from '@nestjs/common';
import { AppController } from '@make.org/content/src/app.controller';
import { AppService } from '@make.org/content/src/app.service';
import { PrismaModule } from '@make.org/content/src/prisma/prisma.module';
import { ConsultationResultsModule } from './consultation-results/consultation-results.module';

@Module({
  imports: [PrismaModule, ConsultationResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
