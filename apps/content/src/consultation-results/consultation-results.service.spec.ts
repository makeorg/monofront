import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationResultsService } from '@make.org/content/src/consultation-results/consultation-results.service';
import { PrismaService } from '@make.org/content/src/prisma/prisma.service';


describe('ConsultationResultsService', () => {
  let service: ConsultationResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationResultsService],
    })
    .useMocker((token) => {
      if (token === PrismaService) {
        return {};
      }
    })
    .compile();

    service = module.get<ConsultationResultsService>(ConsultationResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
