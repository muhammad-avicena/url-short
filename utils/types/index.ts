// URL-SHORT TYPES AND INTERFACES
export interface IUrlShortAttributes {
  ID?: string;
  originalUrl?: string;
  customAlias?: string | null;
  expirationDate?: Date;
  createdAt?: Date;
}

export interface IUrlShortDao {
  createShortUrl(
    originalUrl: string,
    shortCode: string,
    customAlias: string | null
  ): Promise<IUrlShortAttributes>;
  getUrlShortByCustomAlias(customAlias: string): Promise<IUrlShortAttributes>;
  updateShortUrlByID(
    ID: string,
    originalUrl: string,
    customAlias: string
  ): Promise<IUrlShortAttributes>;
  getAllShortUrls(): Promise<IUrlShortAttributes[]>;
  deleteShortUrlByID(ID: string): Promise<IUrlShortAttributes | any>;
}

export interface IUrlShortResult {
  success: boolean;
  message: string;
  status: number;
  data?: IUrlShortAttributes | IUrlShortAttributes[] | any;
}

export interface IUrlShortService {
  getAllShortUrls(): Promise<IUrlShortResult>;
  createShortUrl(
    originalUrl: string,
    shortCode: string,
    customAlias: string
  ): Promise<IUrlShortResult>;
  updateShortUrlByID(
    ID: string,
    originalUrl: string,
    customAlias: string
  ): Promise<IUrlShortResult>;
  deleteShortUrlByID(ID: string): Promise<IUrlShortResult>;
}
