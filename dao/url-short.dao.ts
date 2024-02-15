import {
  generateJakartaDate,
  generateJakartaDateFiveYearsLater,
} from "../utils/helpers/jakarta-time";
import { PrismaClient } from "@prisma/client";
import { IUrlShortAttributes, IUrlShortDao } from "../utils/types";
import StandardError from "../utils/constants/standard-error";

class UrlShortDao implements IUrlShortDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllShortUrls(): Promise<IUrlShortAttributes[]> {
    try {
      const result = await this.db.shortenedURL.findMany();
      return result;
    } catch (error: any) {
      console.error("UrlShortDao - getAllShortUrls:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async createShortUrl(
    originalUrl: string,
    shortenUrl: string,
    customAlias: string | null
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.create({
        data: {
          originalUrl: originalUrl ?? "",
          shortenUrl: shortenUrl ?? "",
          customAlias: customAlias ?? null,
          expirationDate: generateJakartaDateFiveYearsLater(),
          createdAt: generateJakartaDate(),
        },
      });
      return result;
    } catch (error: any) {
      console.error("UrlShortDao - createShortUrl:", error);
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
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.update({
        where: {
          ID,
        },
        data: {
          originalUrl,
          customAlias,
        },
      });
      return result;
    } catch (error: any) {
      console.error("UrlShortDao - updateShortUrl:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async getUrlShortByCustomAlias(
    customAlias: string
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.findUnique({
        where: {
          customAlias,
        },
      });
      return result ?? {};
    } catch (error: any) {
      console.error("UrlShortDao - getUrlShortByCustomAlias:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async deleteShortUrlByID(ID: string): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.delete({
        where: {
          ID,
        },
      });
      return result;
    } catch (error: any) {
      console.error("UrlShortDao - deleteShortUrlByShortCode:", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }
}

export default UrlShortDao;
