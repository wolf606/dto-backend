import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: Role;
      };
    }
  }
  interface ErrorResponse extends Error {
        statusCode?: number;
    }
}
