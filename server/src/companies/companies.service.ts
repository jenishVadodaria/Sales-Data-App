import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './entities/company.entity';
import { Feedback } from './entities/feedback.entity';
import * as XLSX from 'xlsx';
import { Express } from 'express';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import {
  PublishedCompany,
  PublishedCompanyDocument,
} from './entities/publishedCompany.entity';
import { CreatePublishedCompanyDto } from './dto/create-published-company.dto';
import { UpdatePublishedCompanyDto } from './dto/update-published-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
    @InjectModel(PublishedCompany.name)
    private publishedCompanyModel: Model<PublishedCompanyDocument>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findAllPublishedCompanies(): Promise<PublishedCompany[]> {
    return this.publishedCompanyModel.find().exec();
  }

  async findOne(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  async findOnePublishedCompany(id: string): Promise<PublishedCompany> {
    return this.publishedCompanyModel.findById(id).exec();
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async createPublishedCompany(
    createPublishedCompanyDto: CreatePublishedCompanyDto,
  ): Promise<PublishedCompany> {
    const { _id, ...rest } = createPublishedCompanyDto;

    const createdPublishedCompany = new this.publishedCompanyModel({
      _id: _id,
      ...rest,
    });
    return createdPublishedCompany.save();
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();
  }

  async updatePublishedCompany(
    id: string,
    updatePublishedCompanyDto: UpdatePublishedCompanyDto,
  ): Promise<PublishedCompany> {
    return this.publishedCompanyModel
      .findByIdAndUpdate(id, updatePublishedCompanyDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Company> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }

  async deletePublishedCompany(id: string): Promise<PublishedCompany> {
    return this.publishedCompanyModel.findByIdAndDelete(id).exec();
  }

  async findAllNames(): Promise<Company[]> {
    return this.companyModel.find({}, { name: 1, _id: 1 }).exec();
  }

  async findAllPublishedCompanyNames(): Promise<PublishedCompany[]> {
    return this.publishedCompanyModel.find({}, { name: 1, _id: 1 }).exec();
  }

  async searchByName(query: string): Promise<Company[]> {
    // search by name and return name and id only
    const filter = {};
    if (query) {
      const regexQuery = new RegExp(query, 'i');
      filter['$or'] = [{ name: regexQuery }];
    }
    return this.companyModel.find(filter, { name: 1, _id: 1 }).exec();
  }

  async searchPublishedCompanyByName(
    query: string,
  ): Promise<PublishedCompany[]> {
    // search by name and return name and id only
    const filter = {};
    if (query) {
      const regexQuery = new RegExp(query, 'i');
      filter['$or'] = [{ name: regexQuery }];
    }
    return this.publishedCompanyModel.find(filter, { name: 1, _id: 1 }).exec();
  }

  async getFinancials(id: string): Promise<Company> {
    return this.companyModel.findById(id).populate({
      path: 'peerCompanies',
    });
  }

  async getPublishedFinancials(id: string): Promise<PublishedCompany> {
    return this.publishedCompanyModel.findById(id).populate({
      path: 'peerCompanies',
    });
  }

  async convertExcelToJson(file: Express.Multer.File): Promise<any[]> {
    const workbook = XLSX.read(file.buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const transformedData = jsonData.map((row: any) => {
      let peerCompanies: string[] = [];

      if (row['Peer Companies']) {
        peerCompanies = row['Peer Companies']
          .split(',')
          .map((company: string) => company.trim());
      }
      return {
        companyName: row['Company Name'],
        peerCompanies: peerCompanies,
      };
    });

    return transformedData;
  }

  async getCompanyIDs(jsonData: any[]): Promise<string[]> {
    const companyIDs: any[] = [];
    // console.log(jsonData, '+++');

    for (const item of jsonData) {
      // console.log(item, 'itemmmm');

      const company = await this.companyModel
        .findOne({ name: item.companyName })
        .select('_id');
      // .exec();

      if (company) {
        companyIDs.push({ id: company._id, name: item.companyName });
      }
    }

    return companyIDs;
  }

  async findOneByName(name: string): Promise<Company> {
    return this.companyModel.findOne({ name }).exec();
  }

  async getPeerCompanyNames(peerCompanyIds: string[]): Promise<string[]> {
    const peerCompanies = await this.companyModel
      .find(
        { _id: { $in: peerCompanyIds.map((id) => new Types.ObjectId(id)) } },
        { name: 1 },
      )
      .exec();

    return peerCompanies.map((company) => company.name);
  }

  async getPeerCompanyNamesOfPublishedCompanies(
    peerCompanyIds: string[],
  ): Promise<string[]> {
    const peerCompanies = await this.publishedCompanyModel
      .find(
        { _id: { $in: peerCompanyIds.map((id) => new Types.ObjectId(id)) } },
        { name: 1 },
      )
      .exec();
    return peerCompanies.map((company) => company.name);
  }

  async addFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = new this.feedbackModel(createFeedbackDto);
    return createdFeedback.save();
  }

  async getFeedbackData(): Promise<Feedback[]> {
    const feedbackData = await this.feedbackModel
      .find()
      .populate('companyId', '_id name')
      .exec();

    const formattedFeedbackData = feedbackData.map((feedback: any) => ({
      ...feedback._doc,
      companyId: feedback.companyId._id,
      companyName: feedback.companyId.name,
    }));

    return formattedFeedbackData;
  }

  async updateFields(): Promise<{ updatedCount: number }> {
    const companies = await this.companyModel.find().exec();
    let updatedCount = 0;

    for (const company of companies) {
      company.isNew = false;
      company.isPublished = true;
      await company.save();
      updatedCount++;
    }

    return { updatedCount };
  }
}
