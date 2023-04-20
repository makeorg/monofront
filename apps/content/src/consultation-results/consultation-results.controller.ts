import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpCode,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConsultationResultsService } from '@make.org/content/src/consultation-results/consultation-results.service';
import { CreateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/create-consultation-result.dto';
import { UpdateConsultationResultDto } from '@make.org/content/src/consultation-results/dto/update-consultation-result.dto';
import { ConsultationResult } from '@make.org/content/src/consultation-results/entities/consultation-result.entity';

@ApiBearerAuth()
@Controller('consultation-results')
@ApiTags('ConsultationResults')
export class ConsultationResultsController {
  constructor(
    private readonly consultationResultsService: ConsultationResultsService,
  ) {}

  @ApiOperation({ summary: 'Create data result' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: ConsultationResult,
  })
  @Post()
  async create(
    @Body() createConsultationResultDto: CreateConsultationResultDto,
  ) {
    return this.consultationResultsService.create(createConsultationResultDto);
  }

  @ApiOperation({ summary: 'Get a all data results' })
  @ApiResponse({ status: HttpStatus.OK, type: [ConsultationResult] })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Get()
  findAll(@Query('skip') skip: string, @Query('take') take: string) {
    return this.consultationResultsService.findAll({
      skip: Number(skip),
      take: Number(take),
    });
  }

  @ApiOperation({ summary: 'Get a data result' })
  @ApiResponse({ status: HttpStatus.OK, type: ConsultationResult })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.consultationResultsService.findOne(id);
    if (!result) {
      throw new NotFoundException(
        `Consultation result with id "${id}" does not exist.`,
      );
    }

    return result;
  }

  @ApiOperation({ summary: 'Patch a data result' })
  @ApiResponse({ status: HttpStatus.OK, type: ConsultationResult })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultationResultDto: UpdateConsultationResultDto,
  ) {
    return this.consultationResultsService.update(
      id,
      updateConsultationResultDto,
    );
  }

  @ApiOperation({ summary: 'Delete a data result' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'no content' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Data result not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.consultationResultsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
