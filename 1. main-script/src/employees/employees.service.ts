import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Employee } from './schemas/employees.schema';
import {
  AddResponse,
  GetResponse,
  getEmployee,
  deleteEmployee,
  duplicateZeroes,
  getCountries,
  notFound,
} from './interface/response';
import axios from 'axios';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: mongoose.Model<Employee>,
  ) {}

  async create(
    employee: Employee,
    company_id: string,
  ): Promise<AddResponse> {
    try {
      const data = Object.assign(employee, { company_id: company_id });

      const res = await this.employeeModel.create(data);

      const isServerReachable = await this.isServerReachable('http://localhost:4000/');
    
    if (isServerReachable) {
      const emailRequestBody = {
        email: res.email, 
      };

      await axios.post('http://localhost:4000/email/send', emailRequestBody);
    } else {
      console.warn('Server at http://localhost:4000/ is not reachable. Skipping email send request.');
    }
  
      const response: AddResponse = {
        status: 201,
        code: '201',
        data: {
          id: res._id.toString(),
          company_id: res.company_id.toString(),
        },
        message: 'Success',
      };

      return response;
    } catch (error) {
      const errorResponse: AddResponse = {
      status: 400,
      code: '400',
      message: `Error add employee: ${error.message}`,
    };
    return errorResponse
    }
  }

async isServerReachable(url: string): Promise<boolean> {
  try {
    await axios.get(url);
    return true;
  } catch (error) {
    return false;
  }
}
  async update(
    employee: Employee,
    company_id: string,
    employee_id: string,
  ): Promise<AddResponse> {
    try {
      const updatedEmployee = await this.employeeModel.findOneAndUpdate(
        { _id: employee_id, company_id: company_id },
        { $set: { ...employee } },
        { new: true, runValidators: true },
      );

      const response: AddResponse = {
        status: 200,
        code: 'EMPLOYEE_UPDATED',
        data: {
          id: updatedEmployee._id.toString(),
          company_id: updatedEmployee.company_id.toString(),
        },
        message: 'Success.',
      };

      return response;
    } catch (error) {
       const errorResponse: AddResponse = {
      status: 400,
      code: '400',
      message: `Error update employee: ${error.message}`,
    };
    return errorResponse
    }
  }

  async findAll(id: string): Promise<GetResponse> {
    try {
      const employees = await this.employeeModel.aggregate([
        { $match: { company_id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'companies',
            localField: 'company_id',
            foreignField: '_id',
            as: 'company',
          },
        },
        {
          $project: {
            id: '$_id',
            name: 1,
            phone_number: 1,
            jobtitle: 1,
            company_id: 1,
            company_name: { $arrayElemAt: ['$company.company_name', 0] },
            is_active: { $arrayElemAt: ['$company.is_active', 0] },
          },
        },
      ]);

      const formattedEmployees = employees.map((employee, index) => ({
        id: index + 1,
        name: employee.name,
        phone_number: employee.phone_number || '',
        jobtitle: employee.jobtitle,
      }));

      const response: GetResponse = {
        status: 200,
        code: '200',
        data: {
          id: id,
          company_name: employees[0].company_name,
          is_active: employees[0].is_active,
          employees: formattedEmployees,
        },
        message: 'Success',
      };

      return response;
    } catch (error) {
       const errorResponse: GetResponse = {
      status: 400,
      code: '400',
      message: `Error get employee: ${error.message}`,
    };
    return errorResponse
    }
  }

async findEmployee(id: string): Promise<getEmployee> {
  try {
    const employee = await this.employeeModel.findOne({ _id: id });

    const response: getEmployee = {
      status: 200,
      code: '200',
      data: {
        id: employee._id.toString(),
        name: employee.name,
        phone_number: employee.phone_number,
        jobtitle: employee.jobtitle,
      },
      message: 'Success',
    };

    return response;
  } catch (error) {
    const errorResponse: getEmployee = {
      status: 400,
      code: '400',
      message: `Error get employee: ${error.message}`,
    };
    return errorResponse
  }
}


async deleteEmployee(id: string): Promise<deleteEmployee> {
  try {
    const employeeToDelete = await this.employeeModel.findOne({ _id: id });

    if (!employeeToDelete) {
      const notFoundResponse: deleteEmployee = {
        status: 404,
        code: '404',
        message: 'Employee not found',
      };
      return notFoundResponse;
    }

    await this.employeeModel.deleteOne({ _id: id });

    const response: deleteEmployee = {
      status: 204,
      code: '204',
      message: 'Success',
    };

    return response;
  } catch (error) {
     const errorResponse: deleteEmployee = {
      status: 400,
      code: '400',
      message: `Error delete employee: ${error.message}`,
    };
    return errorResponse
  }
}


  async duplicateZeroes(n: number[]): Promise<duplicateZeroes> {
    try {
      const lengthArray = n.length;
      let i = 0;

      while (i < lengthArray) {
        if (n[i] === 0) {
          for (let j = lengthArray - 1; j > i; j--) {
            n[j] = n[j - 1];
          }
          if (i + 1 < lengthArray) {
            n[i + 1] = 0;
          }
          i += 2;
        } else {
          i++;
        }
      }

      const response: duplicateZeroes = {
        status: 200,
        code: '200',
        data: {
          result: n,
        },
        message: 'Success',
      };
      return response;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while processing duplicateZeroes.',
      );
    }
  }

  async getCountries(): Promise<getCountries> {
    try {
      const response = await axios.get(
        'https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json',
      );

      const countriesData = response.data.map((country: any) => {
        return {
          name: country.name,
          region: country.region,
          timezones: country.timezones,
        };
      });

      const result: getCountries = {
        status: response.status,
        code: response.status.toString(),
        data: countriesData,
        message: 'Success',
      };

      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching countries data.',
      );
    }
  }
}
