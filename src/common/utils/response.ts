import { Response } from 'express';

export const getResponse = (res: Response, code: number, data: object) => {
  return res.status(code).json(data);
};

export const getErrorData = (field: string, message: string) => {
  return {
    errors: { [field]: message },
  };
};
