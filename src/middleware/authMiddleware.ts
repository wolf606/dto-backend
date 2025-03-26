import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1] || "";

    if (!token) {
        res.status(401).json({ message: "Acceso denegado" });
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      if (!decoded) {
        res.status(401).json({ message: "Token inválido" });
        return;    
    }
    
    req.user = { id: decoded.id, role: decoded.role };

      if (roles.length && !roles.includes(decoded.role)) {
        console.log(decoded.role);
        console.log(roles);
        res.status(403).json({ message: "No tienes permisos" });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Token inválido" });
    }
  };
};
