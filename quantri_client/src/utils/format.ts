import { FORMAT_DATE, FORMAT_DATE_ISO } from "@/data"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const getCurrency = (value: string | number, separate: string = ",") => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separate) ?? 0
}
export const getCurrencyThongKe = (value: string | number, separate: string = ".") => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separate) ?? 0
}

export const getFileNameWithFixedLength = (filePath: string, maxLength: number = 15) => {
  const fileName = filePath?.substring(filePath.lastIndexOf("/") + 1)
  const fileExt = fileName.substring(fileName.lastIndexOf(".") + 1)
  const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf(fileExt));
  if (fileName.length > maxLength) {
    return fileNameWithoutExt.substring(0, maxLength - 3) + '...' + fileExt
  }
  return fileName
}

export const getFileName = (filePath: string) => {
  const fileName = filePath?.substring(filePath.lastIndexOf("/") + 1)
  return fileName
}

export const getFileExt = (filePath: string) => {
  const fileExt = filePath?.substring(filePath.lastIndexOf(".") + 1)
  return fileExt
}

export const leading0 = (so: number) => {
  if (so < 10) {
    return "0" + so;
  } else {
    return so.toString();
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function numberToCurrencyText(number: number) {
  const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

  function convertGroupOfThree(num: number) {
    let text = '';
    const hundred = Math.floor(num / 100);
    const ten = Math.floor((num % 100) / 10);
    const one = num % 10;

    if (hundred > 0) {
      text += ones[hundred] + ' trăm ';
    }

    if (ten === 0 && one !== 0) {
      if (hundred !== 0) {
        text += 'linh ';
      }
      text += ones[one] + ' ';
    } else if (ten === 1) {
      text += 'mười ';
      if (one > 0) {
        text += ones[one] + ' ';
      }
    } else if (ten > 1) {
      text += tens[ten] + ' ';
      if (one > 0) {
        text += ones[one] + ' ';
      }
    }

    return text.trim();
  }

  if (number === 0) {
    return 'Không đồng';
  }

  let text = '';
  let groupIndex = 0;
  let hasValue = false;

  while (number > 0) {
    const group = number % 1000;
    const groupText = convertGroupOfThree(group);

    if (groupText !== '' || groupIndex === 0) {
      hasValue = true;
      text = groupText + (groupText !== '' ? ' ' : '') + units[groupIndex] + (groupText !== '' ? ' ' : '') + text;
    }

    number = Math.floor(number / 1000);
    groupIndex++;
  }

  if (!hasValue) {
    return 'Không đồng';
  }

  return capitalizeFirstLetter(text.trim()) + ' đồng';
}
export const formatISOtoDate = (date: string | undefined) => {
  if (!date) {
    return undefined
  }
  console.log(date);

  const parseDate = new Date(date)
  return `${parseDate.getFullYear()}-${(parseDate.getMonth() + 1).toString().padStart(2, '0')}-${parseDate.getDate().toString().padStart(2, '0')}T00:00:00Z`
}

export const formatDateHCM = (date : Date | string | undefined, timeZone = 'Asia/Ho_Chi_Minh', format = 'YYYY-MM-DD HH:mm:ss') => {
  if(date == undefined)
  {
    return undefined;
  }
  // Chuyển đổi ngày tháng sang múi giờ mong muốn và định dạng
  const formattedDate = dayjs(date).tz(timeZone).format(format);
  return formattedDate;
};
