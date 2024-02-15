import UrlShortDao from "../dao/url-short.dao";
import UrlShortService from "../service/url-short.service";
import { Request, Response, NextFunction } from "express";

async function sendResponse(res: Response, result: any) {
  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
}

async function handleRequest(
  req: Request,
  res: Response,
  next: NextFunction,
  serviceFunction: any
) {
  const { db } = req;
  const urlShortDao = new UrlShortDao(db);

  try {
    const urlShortService = new UrlShortService(urlShortDao);
    const result = await serviceFunction(urlShortService);
    sendResponse(res, result);
  } catch (error: any) {
    next(error);
  }
}

async function createShortUrl(req: Request, res: Response, next: NextFunction) {
  return handleRequest(
    req,
    res,
    next,
    async (urlShortService: UrlShortService) => {
      const { originalUrl, shortenUrl, customAlias } = req.body;
      console.log(req.body);
      return await urlShortService.createShortUrl(
        originalUrl,
        shortenUrl,
        customAlias
      );
    }
  );
}

async function updateShortUrlByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return handleRequest(
    req,
    res,
    next,
    async (urlShortService: UrlShortService) => {
      const { ID } = req.params;
      const { originalUrl, customAlias } = req.body;
      return await urlShortService.updateShortUrlByID(
        ID,
        originalUrl,
        customAlias
      );
    }
  );
}

async function getAllShortUrls(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return handleRequest(
    req,
    res,
    next,
    async (urlShortService: UrlShortService) => {
      return await urlShortService.getAllShortUrls();
    }
  );
}

async function deleteShortUrlByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return handleRequest(
    req,
    res,
    next,
    async (urlShortService: UrlShortService) => {
      const { ID } = req.params;
      return await urlShortService.deleteShortUrlByID(ID);
    }
  );
}

export {
  getAllShortUrls,
  createShortUrl,
  updateShortUrlByID,
  deleteShortUrlByID,
};
