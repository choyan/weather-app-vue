import "dayjs";

declare module "dayjs" {
  interface Dayjs {
    timezone(timezone: string): Dayjs;
  }
}
