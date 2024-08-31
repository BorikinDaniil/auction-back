import { Response } from 'express';

export const getResponse = (res: Response, code: number, data: object) => {
  const firstCodeDigit = code.toString()[0];
  const status =
    firstCodeDigit === '4' || firstCodeDigit === '5' ? 'error' : 'success';

  return res.status(code).json({
    ...data,
    status,
  });
};

export const getErrorData = (field: string, message: string) => {
  return {
    errors: { [field]: message },
  };
};
