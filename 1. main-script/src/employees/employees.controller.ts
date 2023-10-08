import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeeAdd } from './dto/add-employees.dto';
import { Duplicate } from './dto/duplicate-zones.dto';
import { AuthGuard } from '@nestjs/passport';
import { AddResponse, deleteEmployee, GetResponse, getEmployee, duplicateZeroes, getCountries } from './interface/response';
@Controller('api')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('companies/:company_id/employees')
  @UseGuards(AuthGuard())
  async createEmployees(
    @Body()
    employee: EmployeeAdd,
    @Param('company_id')
    company_id: string,
  ): Promise<AddResponse> {
    return this.employeeService.create(employee, company_id);
  }

  @Get('companies/:id/employees')
  async getAllEmployee(
    @Param('id')
    id: string
  ): Promise<GetResponse> {
    return this.employeeService.findAll(id)
  }

  @Get('employees/:id')
  async getEmployee(
    @Param('id')
    id: string
  ): Promise<getEmployee> {
    return this.employeeService.findEmployee(id)
  }

  @Delete('employees/:id')
  @UseGuards(AuthGuard())
  async deleteEmployee(
    @Param('id')
    id: string
  ): Promise<deleteEmployee> {
    return this.employeeService.deleteEmployee(id)
  }
  
  @Put('companies/:company_id/employees/:employee_id')
  @UseGuards(AuthGuard())
  async updateEmployee(
    @Body()
    employee: EmployeeAdd,
    @Param('company_id')
    company_id: string,
    @Param('employee_id')
    employee_id: string
    ): Promise<AddResponse> {
      return this.employeeService.update(employee, company_id, employee_id)
  }

  @Post('/combination')
    async duplicateZones(
      @Body()
      zones: Duplicate,
  ): Promise<duplicateZeroes> {
    return this.employeeService.duplicateZeroes(zones.n)
  }

  @Get('/countries')
  async getCountries(): Promise<getCountries> {
    return this.employeeService.getCountries()
  }
}
