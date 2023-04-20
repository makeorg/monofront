import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationResultsController } from '@make.org/content/src/consultation-results/consultation-results.controller';
import { ConsultationResultsService } from '@make.org/content/src/consultation-results/consultation-results.service';
import { CreateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/create-consultation-result.dto';
import { NotFoundException } from '@nestjs/common';

describe('ConsultationResultsController', () => {
  let controller: ConsultationResultsController;

  const createBaseResult = {id: "createId", created_at: new Date(), updated_at: new Date(), author_id: 'AUTHORID'};
  const findAllResult = [
    {...createBaseResult, data: {test: 'test'}, question_id: '2', slug: 'slug2'},
    {...createBaseResult, data: {test: 'test'}, question_id: '3', slug: 'slug3'}
  ];
  const findOneResult = {...createBaseResult, data: {test: 'test'}, question_id: '4', slug: 'slug4'};

  const consultationResultsServiceMock = {
    create: jest.fn(
      async (args: CreateConsultationResultDto) => ({...createBaseResult,...args})
    ),
    findAll: jest.fn(
      async ({skip, take}) => {
        if (!Number.isInteger(skip)) {
          throw new Error('skip is not a number');
        };
        if (!Number.isInteger(take)) {
          throw new Error('take is not a number');
        };

        return findAllResult;
      }
    ),
    findOne: jest.fn(
      async (id: string) => id === '4' ? findOneResult : null
    )
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationResultsController],
    })
    .useMocker((token) => {
      if (token === ConsultationResultsService) {
        return consultationResultsServiceMock;
      }
    })
    .compile();

    controller = module.get<ConsultationResultsController>(ConsultationResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should return a result', async () => {
    const input: CreateConsultationResultDto = {
      data: {},
      question_id: '1',
      slug: 'slug',
    }
    const expected = {
      ...createBaseResult,
      ...input,
    };
    expect(await controller.create(input)).toMatchObject(expected);
  });

  it('findAll should return a result', async () => {
    expect(await controller.findAll("1", "3")).toMatchObject(findAllResult);
    expect(controller.findAll("nonumber", "3")).rejects.toThrow("skip is not a number");
    expect(controller.findAll("46", "nonumber")).rejects.toThrow("take is not a number");
  });

  it('findOne should return a result', async () => {
    expect(await controller.findOne("4")).toMatchObject(findOneResult);
    expect(() => controller.findOne("3")).rejects.toThrow('Consultation result with id "3" does not exist.');
  });

});
