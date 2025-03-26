import { Request, Response, NextFunction } from "express";

interface ErrorResponse extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error en el servidor";

  res.status(statusCode).json({
    success: false,
    message,
  });

  console.error(`[${statusCode}] ${message}`);
};