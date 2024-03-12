import { Response } from "express";

export function sendSuccess(
  res: Response,
  status_code: number,
  data: any,
  message?: string
) {
  const sendData = {
    status: true,
    statusCode: status_code,
    message: message || "Successful Response",
    result: data,
  };
  return res.status(sendData.statusCode).send(sendData);
}
export function sendError(
  res: Response,
  status_code: number,
  error_messages: string,
  data?: any
) {
  const sendData = {
    status: false,
    statusCode: status_code,
    errors: error_messages,
    result: data || undefined,
  };

  return res.status(sendData.statusCode).send(sendData);
}
