import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1] || "";

    if (!token) {
        const error: ErrorResponse = new Error("Acceso denegado");
        error.statusCode = 401;
        throw error;
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      if (!decoded) {
        const error: ErrorResponse = new Error("Token inválido");
        error.statusCode = 401;
        throw error; 
    }
    
    req.user = { id: decoded.id, role: decoded.role };

      if (roles.length && !roles.includes(decoded.role)) {
        const error: ErrorResponse = new Error("No tienes permisos");
        error.statusCode = 403;
        throw error;
      }

      next();
    } catch (error) {
        next(error);
    }
  };
};
