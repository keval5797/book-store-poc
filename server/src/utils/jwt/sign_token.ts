import jwt from "jsonwebtoken";

export default (entity: {}) => {
  return jwt.sign(entity, process.env.JWT_ACCESS_KEY!, {
    algorithm: "HS256",
  });
};
