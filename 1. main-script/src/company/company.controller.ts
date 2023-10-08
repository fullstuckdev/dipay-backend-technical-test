import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyAddDto } from './dto/add-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { AddResponse, UpdateResponse, GetResponse } from './interface/response';
@Controller('api')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/companies')
  @UseGuards(AuthGuard())
  async createCompanies(
    @Body()
    company: CompanyAddDto,
  ): Promise<AddResponse> {
    return this.companyService.create(company);
  }

   @Get('/companies')
    async getAllCompanies(): Promise<GetResponse> {
    return this.companyService.findAll();
  } 

    @Put('/companies/:id/set_active')
    @UseGuards(AuthGuard())
    async setActiveCompanies(
    @Param('id')
    id: string,
    ): Promise<UpdateResponse> {
    return this.companyService.updateById(id);
  } 
}
