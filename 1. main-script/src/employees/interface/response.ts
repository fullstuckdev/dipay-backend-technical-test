export interface AddResponse {
  status: number;
  code: string;
  data?: {
    id: string;
    company_id: string;
  };
  message: string;
}

export interface GetResponse {
  status: number;
  code: string;
  data?: {
    id: string,
    company_name: string,
    is_active: boolean,
    employees: Record<string, any>;
  };
  message: string;
}

export interface getEmployee {
  status: number,
  code: string,
  data?: {
    id: string,
    name: string,
    phone_number: string,
    jobtitle: string
  };
  message: string
}
export interface deleteEmployee {
  status: number,
  code: string,
  message: string
}
export interface UpdateResponse {
  status: number;
  code: string;
  data: {
    id: string;
    is_active: boolean;
  };
  message: string;
}

export interface duplicateZeroes {
  status: number;
  code: string;
  data: {
      result: Record<number, any>;
  },
  message: string;
}

export interface Country {
  name: string;
  region: string;
  timezones: string[];
}

export interface getCountries {
  status: number;
  code: string;
  data: Country[];
  message: string;
}
export interface notFound {
  status: number;
  code: string;
  message: string;
}