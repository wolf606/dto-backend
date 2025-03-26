import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";

export function Body<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, "body");
}
export function Param<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, "params");
}
export function Query<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, "query");
}

export function validationMiddleware<T extends object>(
  dtoClass: new () => T,
  body: keyof Request
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = new dtoClass();
      const requestBody = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      Object.assign(dtoInstance, requestBody[body as keyof typeof requestBody]);

      const errors: ValidationError[] = await validate(dtoInstance, {
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const validationErrors = errors.map((error) => ({
          [error.property]: Object.values(error.constraints || {}),
        }));

        const errorMessage = "Invalid data provided";

        const error: ErrorResponse = new Error(errorMessage);
        error.statusCode = 400;
        error.details = validationErrors;
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
