// URL-SHORT TYPES AND INTERFACES
export interface IUrlShortAttributes {
  id?: number;
  shortCode?: string;
  originalUrl?: string;
  customAlias?: string | null;
  expirationDate?: Date;
  createdAt?: Date;
}

export interface IUrlShortDao {
  createShortUrl(data: IUrlShortAttributes): Promise<IUrlShortAttributes>;
  updateShortUrlByShortCode(
    shortCode: string,
    originalUrl: string
  ): Promise<IUrlShortAttributes>;
  getAllShortUrls(): Promise<IUrlShortAttributes[]>;
  deleteShortUrlByShortCode(
    shortCode: string
  ): Promise<IUrlShortAttributes | any>;
}

export interface IUrlShortResult {
  success: boolean;
  message: string;
  data?: IUrlShortAttributes | IUrlShortAttributes[] | any;
}
