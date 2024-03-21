import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreatePublishedCompanyDto } from './dto/create-published-company.dto';
import { UpdatePublishedCompanyDto } from './dto/update-published-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Post('/create-published')
  createPublished(
    @Body() createPublishedCompanyDto: CreatePublishedCompanyDto,
  ) {
    return this.companiesService.createPublishedCompany(
      createPublishedCompanyDto,
    );
  }

  @Get('all/names')
  findAllNames() {
    return this.companiesService.findAllNames();
  }

  @Get('all/names/published')
  findAllPublishedCompanyNames() {
    return this.companiesService.findAllPublishedCompanyNames();
  }

  @Get('search/:query')
  searchByName(@Param('query') query: string) {
    return this.companiesService.searchByName(query);
  }

  @Get('published/search/:query')
  searchPublishedCompanyByName(@Param('query') query: string) {
    return this.companiesService.searchPublishedCompanyByName(query);
  }

  @Get('/financials/:id')
  getFinancials(@Param('id') id: string) {
    return this.companiesService.getFinancials(id);
  }

  @Get('published/financials/:id')
  getPublishedFinancials(@Param('id') id: string) {
    return this.companiesService.getPublishedFinancials(id);
  }

  @Get('all')
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('published/all')
  findAllPublishedCompanies() {
    return this.companiesService.findAllPublishedCompanies();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Get('published/:id')
  findOnePublishedCompany(@Param('id') id: string) {
    return this.companiesService.findOnePublishedCompany(id);
  }

  @Patch('company/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Patch('published/:id')
  updatePublished(
    @Param('id') id: string,
    @Body() updatePublishedCompanyDto: UpdatePublishedCompanyDto,
  ) {
    return this.companiesService.updatePublishedCompany(
      id,
      updatePublishedCompanyDto,
    );
  }

  @Post('/peercompanies/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcelFile(@UploadedFile() file: Express.Multer.File) {
    const jsonData: any[] = await this.companiesService.convertExcelToJson(
      file,
    );
    const companyIDs: any[] = await this.companiesService.getCompanyIDs(
      jsonData,
    );

    const transformedData = jsonData.map((item: any) => {
      const peerCompanyIDs = item.peerCompanies.map((peerCompany: string) => {
        const company = companyIDs.find((c) => c.name === peerCompany);
        return company ? company.id : null;
      });
      return {
        name: item.companyName,
        peerCompanies: peerCompanyIDs,
      };
    });

    for (const data of transformedData) {
      const company = await this.companiesService.findOneByName(data.name);
      if (company) {
        company.peerCompanies = data.peerCompanies;
        await this.companiesService.update(company._id, company);
        // console.log(company);
      }
    }

    const length = jsonData.length;

    const length2 = transformedData.length;

    return {
      jsonData,
      length,
      companyIDs,
      transformedData,
      length2,
    };
  }

  @Post('/peercompanies/names')
  getPeerCompanyNames(@Body('peerCompanyIds') peerCompanyIds: string[]) {
    return this.companiesService.getPeerCompanyNames(peerCompanyIds);
  }

  @Post('/peercompanies/names/published')
  getPublishedPeerCompanyNames(
    @Body('peerCompanyIds') peerCompanyIds: string[],
  ) {
    return this.companiesService.getPeerCompanyNames(peerCompanyIds);
  }

  @Post('/feedback')
  addFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.companiesService.addFeedback(createFeedbackDto);
  }

  @Get('/feedback/all')
  getFeedbackData() {
    return this.companiesService.getFeedbackData();
  }

  @Post('update-fields')
  async updateFields() {
    const result = await this.companiesService.updateFields();
    return {
      message: 'Fields updated for all companies',
      updatedCount: result.updatedCount,
    };
  }

  @Delete(':id')
  async deletePublishedCompany(@Param('id') id: string) {
    return this.companiesService.deletePublishedCompany(id);
  }
}
