export interface AddResponse {
  status: number;
  code: string;
  data: {
    id: string;
  };
  message: string;
}

export interface GetResponse {
  status: number;
  code: string;
  data: {
    count: number;
    rows: Record<string, any>;
  };
  message: string;
}

export interface UpdateResponse {
  status: number;
  code: string;
  data?: {
    id: string;
    is_active: boolean;
  };
  message: string;
}

