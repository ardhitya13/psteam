import "express";

declare module "express-serve-static-core" {
  interface Request {
    file?: Express.Multer.File;
    files?: { [fieldname: string]: Express.Multer.File[] };
  }
}
