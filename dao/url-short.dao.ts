import {
  generateJakartaDate,
  generateJakartaDateFiveYearsLater
} from '../utils/helpers/jakarta-time';
import { PrismaClient } from '@prisma/client';
import { IUrlShortAttributes, IUrlShortDao } from '../utils/types';
import StandardError from '../utils/constants/standard-error';

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
      console.error('UrlShortDao - getAllShortUrls:', error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500
      });
    }
  }

  async createShortUrl(
    originalUrl: string,
    customAlias: string
  ): Promise<IUrlShortAttributes> {
    try {
      const generatedShortenUrl = this.generateShortUrl();
      const result = await this.db.shortenedURL.create({
        data: {
          originalUrl: originalUrl ?? '',
          customAlias: customAlias ? customAlias : generatedShortenUrl,
          shortenUrl: customAlias ? customAlias : generatedShortenUrl,
          expirationDate: generateJakartaDateFiveYearsLater(),
          createdAt: generateJakartaDate()
        }
      });
      return result;
    } catch (error: any) {
      console.error('UrlShortDao - createShortUrl:', error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500
      });
    }
  }

  generateShortUrl() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let shortUrl = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrl += characters[randomIndex];
    }

    return shortUrl;
  }

  async updateShortUrlByID(
    ID: string,
    originalUrl: string,
    customAlias: string
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.update({
        where: {
          ID
        },
        data: {
          originalUrl,
          customAlias
        }
      });
      return result;
    } catch (error: any) {
      console.error('UrlShortDao - updateShortUrl:', error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500
      });
    }
  }

  async getRedirectUrl(customAlias: string): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.findUnique({
        where: {
          customAlias
        }
      });
      return result ?? {};
    } catch (error: any) {
      console.error('UrlShortDao - getRedirectUrl:', error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500
      });
    }
  }

  async getUrlShortByCustomAlias(
    customAlias: string
  ): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.findUnique({
        where: {
          customAlias
        }
      });
      return result ?? {};
    } catch (error: any) {
      console.error('UrlShortDao - getUrlShortByCustomAlias:', error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500
      });
    }
  }

  async deleteShortUrlByID(ID: string): Promise<IUrlShortAttributes> {
    try {
      const result = await this.db.shortenedURL.delete({
        where: {
          ID
        }
      });
      return result;
    } catch (error: any) {
      console.error('UrlShortDao - deleteShortUrlByShortCode:', error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500
      });
    }
  }
}

export default UrlShortDao;
