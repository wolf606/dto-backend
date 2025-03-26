import { Request, Response, NextFunction } from "express";

interface ErrorResponse extends Error {
  statusCode?: number;
  details?: Object;
}

export const errorMiddleware = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error en el servidor";
  const details = err.details || {};

  res.status(statusCode).json({
    success: false,
    message,
    details: details,
  });

  console.error(`[${statusCode}] ${message}`);
};