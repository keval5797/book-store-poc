import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/handle_response";
import { User } from "./model";
import { comparePassword } from "./service";
import { IUser } from "./types";
import { verify_login } from "./validation";
import sign_token from "../utils/jwt/sign_token";

export async function login(req: Request, res: Response) {
  try {
    const validation = verify_login.validate(req.body);
    if (validation.error)
      return sendError(res, 400, validation.error.details[0].message);
    const validated_req = validation.value as IUser;

    const user = (await User.find({ user_id: validated_req.user_id }))[0];
    if (!user) {
      console.log("Invalid user id");
      return sendError(res, 400, "Incorrect Credential");
    }
    const valid_password = comparePassword(
      validated_req.password,
      user.password!
    );
    if (!valid_password) {
      console.log("Invalid password");
      return sendError(res, 400, "Incorrect Credential");
    }
    const token = sign_token({ id: user.id });
    return sendSuccess(res, 201, { token });
  } catch (error) {
    console.log("ERROR WHILE LOGGING IN", error);
    return sendError(res, 500, "Internal server error");
  }
}
