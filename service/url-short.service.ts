import StandardError from "../utils/constants/standard-error";
import {
  IUrlShortDao,
  IUrlShortAttributes,
  IUrlShortResult,
} from "../utils/types";

class UrlShortService {
  private urlShortDao: IUrlShortDao;

  constructor(urlShortDao: IUrlShortDao) {
    this.urlShortDao = urlShortDao;
  }

  async createShortUrl({
    originalUrl,
    shortCode,
    customAlias,
    expirationDate,
  }: IUrlShortAttributes): Promise<IUrlShortResult> {
    try {
      const result = await this.urlShortDao.createShortUrl({
        originalUrl,
        shortCode,
        customAlias,
        expirationDate,
      });
      return {
        success: true,
        message: "Short URL created",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - createShortUrl:", error);
      throw new StandardError({
        success: error.success,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateShortUrl(
    shortCode: string,
    originalUrl: string
  ): Promise<IUrlShortResult> {
    try {
      const result = await this.urlShortDao.updateShortUrlByShortCode(
        shortCode,
        originalUrl
      );
      return {
        success: true,
        message: "Short URL updated",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - updateShortUrl:", error);
      throw new StandardError({
        success: error.success,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAllShortUrls(): Promise<IUrlShortResult> {
    try {
      const result = await this.urlShortDao.getAllShortUrls();
      if (!result || result.length === 0) {
        throw new StandardError({
          success: false,
          message: "Short URLs not found or empty",
          status: 404,
        });
      }
      return {
        success: true,
        message: "List of All Short URLs",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - getAllShortUrls:", error);
      throw new StandardError({
        success: error.success,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteShortUrl(shortCode: string): Promise<IUrlShortResult> {
    try {
      const result = await this.urlShortDao.deleteShortUrlByShortCode(
        shortCode
      );
      return {
        success: true,
        message: "Short URL deleted",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - deleteShortUrl:", error);
      throw new StandardError({
        success: error.success,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default UrlShortService;
