import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import * as jwt from "jsonwebtoken";

import Context from "../types/Context";
import { Service } from "typedi";

@Service()
export default class AuthMiddleware implements MiddlewareInterface<Context> {
  async use({ context: { req, res }, info }: ResolverData<Context>, next: NextFn) {
    const token = req.cookies.token;

    if (token) {
      jwt.verify(token, "secretkey", (err, authData: string | any) => {
        if (err) throw err;

        res.locals.userId = authData;
        return next();
      });
    } else {
      throw new Error("Not authorized");
    }
  }
}
