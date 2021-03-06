import { formatDistance } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

import LikeIcon from "@/assets/icons/like.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import CoinIcon from "@/assets/icons/coin.svg";

export const getTxnsActionIcon = (action: string) => {
  switch (action) {
    case "like":
      return <LikeIcon style={{ width: "18px" }} />;
    case "download":
      return <DownloadIcon style={{ width: "18px" }} />;
    default:
      return <CoinIcon style={{ width: "18px" }} />;
  }
};
export const toCapitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function getTimeDistance(datePast: string | number) {
  if (typeof datePast === "string") {
    const zonedPastDate = getLocalTime(datePast);
    const zonedPresentDate = getLocalTime(new Date());
    return formatDistance(new Date(zonedPastDate), zonedPresentDate, {
      addSuffix: true,
    });
  }
}

export function getTimeZone() {
  const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone;
}
export function getLocalTime(date: string | Date) {
  const timeZone = getTimeZone();
  const localTime = zonedTimeToUtc(date, timeZone);
  return localTime;
}

export function getReducedHash(txhash: string, left: number, right: number) {
  if (right > 0) {
    return `${txhash.substring(0, left)}...${txhash.substring(
      txhash.length - right
    )}`;
  } else return txhash;
}

export function FormatNumber(num: number) {
  if (num < 1e3) return num;
  if (num >= 1e3 && num < 1e6)
    return parseInt(new Intl.NumberFormat().format(num / 1e3)).toFixed(0) + "K";
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(0) + "M";
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(0) + "B";
  if (num >= 1e12 && num < 1e15)
    return (
      parseInt(new Intl.NumberFormat().format(num / 1e12)).toFixed(0) + "T"
    );
  if (num >= 1e15 && num < 1e18) return +(num / 1e15).toFixed(0) + "q";
  if (num >= 1e18 && num < 1e21)
    return (
      parseInt(new Intl.NumberFormat().format(num / 1e18)).toFixed(0) + "Q"
    );
}

export function getActionValue(
  action: string,
  value: string,
  coinName: string
) {
  if (
    action == "Transfer" ||
    action == "Burn" ||
    action == "Mint" ||
    action == "BurnFrom"
  ) {
    return {
      txValue: value,
      txCoin: coinName.toUpperCase(),
    };
  } else {
    return {
      txValue: value,
    };
  }
}

export function FormatValue(value: string) {
  const num = Number(value);
  return new Intl.NumberFormat().format(num);
}

export const uniformValue = (action: string) => {
  switch (action) {
    case "Transfer":
    case "Mint":
      return `CON`;

    default:
      return null;
  }
};
