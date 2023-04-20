import { Module } from '@nestjs/common';
import { PrismaService } from '@make.org/content/src/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
