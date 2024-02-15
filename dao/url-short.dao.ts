import { generateJakartaDate } from "../utils/helpers/jakarta-time";
import { PrismaClient } from "@prisma/client";
import { IUrlShortAttributes, IUrlShortDao } from "../utils/types";
import StandardError from "../utils/constants/standard-error";

class UrlShortDao implements IUrlShortDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createShortUrl({
    originalUrl,
    shortCode,
    customAlias,
    expirationDate,
  }: IUrlShortAttributes): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.create({
        data: {
          originalUrl: originalUrl ?? "",
          shortCode: shortCode ?? "",
          expirationDate: expirationDate ?? "",
          customAlias: customAlias ?? null,
          createdAt: generateJakartaDate(),
        },
      });
      console.log("UrlShortDao - createShortUrl:", result);
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

  async updateShortUrlByShortCode(
    shortCode: string,
    originalUrl: string
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.update({
        where: {
          shortCode,
        },
        data: {
          originalUrl,
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

  async getAllShortUrls(): Promise<IUrlShortAttributes[]> {
    try {
      const result = await this.db.shortenedURL.findMany();
      console.log("UrlShortDao - getAllShortUrls:", result);
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

  async deleteShortUrlByShortCode(
    shortCode: string
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.delete({
        where: {
          shortCode,
        },
      });
      console.log("UrlShortDao - deleteShortUrlByShortCode:", result);
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
