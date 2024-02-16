import "dotenv/config";
import StandardError from "../utils/constants/standard-error";
import {
  IUrlShortDao,
  IUrlShortResult,
  IUrlShortService,
} from "../utils/types";
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL as string);

class UrlShortService implements IUrlShortService {
  private urlShortDao: IUrlShortDao;

  constructor(urlShortDao: IUrlShortDao) {
    this.urlShortDao = urlShortDao;
  }

  async createShortUrl(
    originalUrl: string,
    customAlias: string | null
  ): Promise<IUrlShortResult> {
    if (!originalUrl || Object.keys(originalUrl).length === 0) {
      throw new StandardError({
        success: false,
        message: "Original URL is required",
        status: 400,
      });
    }

    if (customAlias && customAlias.length > 16) {
      throw new StandardError({
        success: false,
        message: "Custom alias cannot exceed 16 characters",
        status: 400,
      });
    }

    try {
      const getCustomAlias = await this.urlShortDao.getUrlShortByCustomAlias(
        customAlias ?? ""
      );

      if (getCustomAlias && getCustomAlias.customAlias === customAlias) {
        throw new StandardError({
          success: false,
          message: `Custom alias "${customAlias}" already exists. Please use another alias`,
          status: 400,
        });
      }

      const result = await this.urlShortDao.createShortUrl(
        originalUrl,
        customAlias
      );

      return {
        success: true,
        status: 200,
        message: "Short URL created",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - createShortUrl:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getRedirectUrl(customAlias: string): Promise<IUrlShortResult> {
    const CACHE_KEY = `redirectUrl:${customAlias}`;
    try {
      const cachedResult = await redisClient.get(CACHE_KEY);

      if (cachedResult) {
        return JSON.parse(cachedResult);
      } else {
        const result = await this.urlShortDao.getRedirectUrl(customAlias);

        if (!result || Object.keys(result).length === 0) {
          throw new StandardError({
            success: false,
            message: "Short URL not found",
            status: 404,
          });
        }
        await redisClient.set(
          CACHE_KEY,
          JSON.stringify({
            success: true,
            status: 302,
            message: "Redirecting...",
            data: result,
          }),
          "EX",
          300
        );
        return {
          success: true,
          status: 302,
          message: "Redirecting...",
          data: result,
        };
      }
    } catch (error: any) {
      console.error("UrlShortService - getRedirectUrl:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status ?? 500,
      });
    }
  }

  async updateShortUrlByID(
    ID: string,
    originalUrl: string,
    customAlias: string
  ): Promise<IUrlShortResult> {
    try {
      const getCustomAlias = await this.urlShortDao.getUrlShortByCustomAlias(
        customAlias ?? ""
      );

      if (getCustomAlias && getCustomAlias.customAlias === customAlias) {
        throw new StandardError({
          success: false,
          message: "Custom alias already exists. Please use another alias",
          status: 400,
        });
      }

      const result = await this.urlShortDao.updateShortUrlByID(
        ID,
        originalUrl,
        customAlias
      );
      return {
        status: 200,
        success: true,
        message: "Short URL updated",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - updateShortUrl:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAllShortUrls(): Promise<IUrlShortResult> {
    const CACHE_KEY = "allShortUrls";
    try {
      const cachedResult = await redisClient.get(CACHE_KEY);

      if (cachedResult) {
        return JSON.parse(cachedResult);
      } else {
        const result = await this.urlShortDao.getAllShortUrls();

        if (!result || result.length === 0) {
          throw new StandardError({
            success: false,
            message: "Short URLs not found or empty",
            status: 404,
          });
        }

        await redisClient.set(
          CACHE_KEY,
          JSON.stringify({
            status: 200,
            success: true,
            message: "List of All Short URLs (cached)",
            data: result,
          }),
          "EX",
          3600
        );

        return {
          status: 200,
          success: true,
          message: "List of All Short URLs",
          data: result,
        };
      }
    } catch (error: any) {
      console.error("UrlShortService - getAllShortUrls:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status ?? 500,
      });
    }
  }

  async deleteShortUrlByID(ID: string): Promise<IUrlShortResult> {
    try {
      const result = await this.urlShortDao.deleteShortUrlByID(ID);
      return {
        status: 200,
        success: true,
        message: "Short URL deleted",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - deleteShortUrl:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default UrlShortService;
