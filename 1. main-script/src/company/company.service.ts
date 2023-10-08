import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Company } from './schemas/company.schema';
import { AddResponse, UpdateResponse, GetResponse } from './interface/response';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: mongoose.Model<Company>,
  ) {}

  async create(company: Company): Promise<AddResponse> {
    try {
      const data = Object.assign(company);

      const res = await this.companyModel.create(data);

      const response: AddResponse = {
        status: 201,
        code: '201',
        data: {
          id: res._id.toString(),
        },
        message: 'Success',
      };

      return response;
    } catch (error) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  async findAll(): Promise<GetResponse> {
    try {
      const companies = await this.companyModel.find();

      const formattedCompanies = companies.map((company, index) => ({
        id: index + 1,
        company_name: company.company_name,
        telephone_number: company.telephone_number,
        is_active: company.is_active,
        address: company.address,
      }));

      const response: GetResponse = {
        status: 200,
        code: '200',
        data: {
          count: companies.length,
          rows: formattedCompanies,
        },
        message: 'Success',
      };

      return response;
    } catch (error) {
      throw new Error(`Error fetching companies: ${error.message}`);
    }
  }

  async updateById(id: string): Promise<UpdateResponse> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }

      const company = await this.companyModel.findById(id);

      if (!company) {
        throw new NotFoundException('Company ID not found.');
      }

      const res = await this.companyModel.findByIdAndUpdate(
        id,
        { is_active: true },
        {
          new: true,
          runValidators: true,
        },
      );

      const response: UpdateResponse = {
        status: 201,
        code: '201',
        data: {
          id: res._id.toString(),
          is_active: res.is_active,
        },
        message: 'Success',
      };

      return response;
    } catch (error) {
      const errorResponse: UpdateResponse = {
      status: 400,
      code: '400',
      message: `Error updating company: ${error.message}`,
    };
    return errorResponse
    }
  }
}
