import moment from "moment";

// When deploying to production, the server time will be in UTC.
// This function will convert the UTC time to Jakarta time.
export function generateJakartaDate(): string {
  const gmtPlus7Date = moment().utcOffset("+07:00").format();
  return gmtPlus7Date;
}
