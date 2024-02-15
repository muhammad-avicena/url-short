import StandardError from "../utils/constants/standard-error";
import {
  IUrlShortDao,
  IUrlShortResult,
  IUrlShortService,
} from "../utils/types";

class UrlShortService implements IUrlShortService {
  private urlShortDao: IUrlShortDao;

  constructor(urlShortDao: IUrlShortDao) {
    this.urlShortDao = urlShortDao;
  }

  async createShortUrl(
    originalUrl: string,
    shortCode: string,
    customAlias: string | null
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

      const result = await this.urlShortDao.createShortUrl(
        originalUrl,
        shortCode,
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
        status: 500,
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
        status: 500,
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
        status: 200,
        success: true,
        message: "List of All Short URLs",
        data: result,
      };
    } catch (error: any) {
      console.error("UrlShortService - getAllShortUrls:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
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
        status: 500,
      });
    }
  }
}

export default UrlShortService;
