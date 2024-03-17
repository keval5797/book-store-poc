import { NextFunction, Request, Response } from "express";
import { sendError } from "../handle_response";
import jwt from "jsonwebtoken";

export interface IJwtUser {
  id: string;
}
declare global {
  namespace Express {
    interface Request {
      user: IJwtUser;
    }
  }
}
export async function authenticateToken(
  req: Request,
  res: Response
): Promise<IJwtUser | undefined> {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) sendError(res, 401, "Authorization error");
  else {
    const promise = new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_ACCESS_KEY!, (err, user) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            console.log("Got error in verification of token");
          }
          sendError(res, 401, "Authorization Error");
        } else {
          if (!user) {
            sendError(res, 403, "Forbidden");
          } else {
            resolve(user);
          }
        }
      });
    });
    return (await promise) as IJwtUser;
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rq = await authenticateToken(req, res);
  if (rq) {
    req.user = rq;
    next();
  }
}
