import { TD } from "./kyso";
import axiosInstance from "@/lib/axios";
import { API_VERSION, HOST_PATH_FILE, ID_SEPARATE, UPLOADFILE_ENDPOINT } from "@/data";
import { IResult } from "@/models";
import '@/utils/esign2'
import { UploadFile } from "antd";
import Docxtemplate from "docxtemplater"
import PizZip, { GenerateOptions } from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver'
import { getFile, getFileName, getPdfFileUrlFromBlob, getUrlFromBlob, uploadBase64DocxAsPdfToServer } from ".";
import axios, { AxiosResponse } from "axios";
//@ts-ignore
import ImageModule from 'docxtemplater-image-module-free'
import { store } from "@/lib/redux/Store";
import { togglerAppLoading } from "@/lib/redux/GlobalState";
import { toast } from "react-toastify";
import { fileApi } from "@/features/file/services";



export const deleteObjectKeyValues = <TObj, TKey extends keyof TObj>(object: TObj, keys: TKey[]) => {
  keys.forEach(key => {
    delete object[key]
  })
}

export const findWordFiles = (filePath: string, splitBy: string = ID_SEPARATE): string[] => {
  const wordExt = [".doc", ".docx", ".DOC", ".DOCX"]
  return filePath.split(splitBy).filter(file => wordExt.findIndex(ext => getFileName(file).endsWith(ext)) != -1)
}

export const findPDFFiles = (filePath: string, splitBy: string = ID_SEPARATE): string[] => {
  const pdfExt = [".pdf", ".PDF"]
  return filePath.split(splitBy).filter(file => pdfExt.findIndex(ext => getFileName(file).endsWith(ext)) != -1)
}

export const parseJwt = (token: string) => {

  const obj = {
    email: '',
    fullName: 'root.admin',
    typeUser: 'Admin',
    uid: '',
    sub: '',
    tenPhongBan: '',
    groupCode: '',
    tenDonVi: '',
    maDonViCha: '',
    officeCode: '',
    userGroupId: '',
    forcePasswordChange: '',
  }

  return obj as any
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function normalizeVN2ENString(chuoi: string) {
  // Loại bỏ toàn bộ dấu tiếng Việt và dấu cách
  const conversionTable: Record<string, string> = {
    'Á': 'A',
    'À': 'A',
    'Ả': 'A',
    'Ã': 'A',
    'Ạ': 'A',
    'Ấ': 'A',
    'Ầ': 'A',
    'Ẩ': 'A',
    'Â': 'A',
    'Ẫ': 'A',
    'Ậ': 'A',
    'Ă': 'A',
    'Ặ': 'A',
    'Ắ': 'A',
    'Ằ': 'A',
    'Ẵ': 'A',
    'Ẳ': 'A',
    'É': 'E',
    'È': 'E',
    'Ẻ': 'E',
    'Ẽ': 'E',
    'Ẹ': 'E',
    'Ế': 'E',
    'Ề': 'E',
    'Ể': 'E',
    'Ễ': 'E',
    'Ệ': 'E',
    'Ê': 'E',
    'Í': 'I',
    'Ì': 'I',
    'Ỉ': 'I',
    'Ĩ': 'I',
    'Ị': 'I',
    'Ó': 'O',
    'Ò': 'O',
    'Ỏ': 'O',
    'Õ': 'O',
    'Ọ': 'O',
    'Ớ': 'O',
    'Ờ': 'O',
    'Ở': 'O',
    'Ỡ': 'O',
    'Ơ': 'O',
    'Ợ': 'O',
    'Ô': 'O',
    'Ố': 'O',
    'Ồ': 'O',
    'Ỗ': 'O',
    'Ổ': 'O',
    'Ộ': 'O',
    'Ú': 'U',
    'Ù': 'U',
    'Ủ': 'U',
    'Ũ': 'U',
    'Ụ': 'U',
    'Ứ': 'U',
    'Ư': 'U',
    'Ừ': 'U',
    'Ử': 'U',
    'Ữ': 'U',
    'Ự': 'U',
    'Ý': 'Y',
    'Ỳ': 'Y',
    'Ỷ': 'Y',
    'Ỹ': 'Y',
    'Ỵ': 'Y',
    'Đ': 'D',
  };

  let convertedString = chuoi.toUpperCase();

  // Chuyển đổi chữ có dấu theo bảng chuyển đổi
  convertedString = convertedString.replace(/[ÁÀẢÃẠẤẦẨẪẬÂĂẶẮẰẴẲÉÊÈẺẼẸẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌỚỜỞỠỢƠỐỒỖỔÔỘÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]/g, match => conversionTable[match] || match);

  // Loại bỏ khoảng trắng
  convertedString = convertedString.replace(/\s/g, '');

  return convertedString;
}

export function toCamel(o: any) {
  var newO: any, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}
export function toUpperCase(o: any) {
  var newO: any, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toUpperCase(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toUpperCase(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

export function getFirstAndLastDayOfMonth(year: number, month: number) {
  // Nếu không truyền vào tháng, sử dụng tháng hiện tại
  if (month === undefined) {
    const currentDate = new Date();
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
  } else {
    // Giả sử tháng bắt đầu từ 1, chuyển thành index của mảng (bắt đầu từ 0)
    month = month - 1;
  }

  // Tạo một đối tượng Date cho ngày đầu tiên của tháng
  const firstDayOfMonth = new Date(year, month, 1);

  // Tạo một đối tượng Date cho ngày cuối cùng của tháng
  const lastDayOfMonth = new Date(year, month + 1, 0);

  return {
    firstDay: firstDayOfMonth,
    lastDay: lastDayOfMonth
  };
}

export const signal = (urlFileKySo: string, fileNameKySo: string, saveToFolder: string, handler: (newFile: string, oldFile: string) => void) => {
  let urlFileSigned = ""
  let oldFileId = urlFileKySo.split('/')[urlFileKySo.split("/").length - 2]
  let nameFileSigned = ""
  // console.log(urlFileKySo);

  TD.utils.downloadFile(urlFileKySo, "application/pdf", function (success: any, data: any) {
    let signer = new TD.Signer()
    signer.dataType = TD.Signer.DataTypes.PDF
    signer.key = "32C03-96104-A17FA-249A2-C11F9"
    signer.data = data
    signer.useCaServer = false;
    signer.customSignatureOnly = false;
    signer.options = {
      name: "DVCVinhLong",
      version: "1.1",
      description: "DVCVinhLong",
      signature: {
        "fontSize": 13.0,// default : 8.0
        "fontFamily": "Times New Roman"
      }
    };
    signer.onError = function (error: any) {
      switch (error) {
        case TD.Signer.ErrorCode.unknowProtocol:
          alert("Giao thức không được hỗ trợ.");
          break;
        case TD.Signer.ErrorCode.securityBlocked:
          alert("Có lỗi xảy ra. Bị chặn bởi thiết lập an ninh!");
          break;
        case TD.Signer.ErrorCode.invalidStaUrl:
          alert("STA url không đúng");
          break;
        case TD.Signer.ErrorCode.noData:
          alert("Chưa có dữ liệu");
          break;
        case TD.Signer.ErrorCode.unknowDataType:
          alert("Kiểu dữ liệu không được hỗ trợ.");
          break;
        case TD.Signer.ErrorCode.canceled:
          alert("Người dùng hủy thao tác!");
          break;
        case TD.Signer.ErrorCode.invalidCertificate:
          alert("Chứng chỉ không đúng hoặc chưa cắm usb Token");
          break;
        case TD.Signer.ErrorCode.connectionError:
          if (confirm("Chưa cài client hoặc client chưa khởi chạy. Bạn có muốn tải về không?"))
            TD.Signer.downloadClient();
          break;
        case TD.Signer.ErrorCode.notActivated:
          alert("Chưa nhập key");
          break;
        case TD.Signer.ErrorCode.invalidKey:
          alert("Sai key hoặc key hết hạn bản quyền.");
          break;
        default:
          alert("Có lỗi xảy ra khi ký tệp: " + fileNameKySo);
          break;
      }
    }
    signer.onClose = function () { }
    signer.done = function (data: any) {
      //$('#Loading').css('display','block');
      var reader = new FileReader();
      reader.readAsDataURL(data);
      //Convert the blob from clipboard to base64
      reader.onloadend = async function () {
        console.log("trigger load end");

        var dataBase64 = reader.result;
        dataBase64 = (dataBase64 as string).split(',')[1];

        const byteCharacters = atob(dataBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'octet/stream' });

        fileNameKySo = fileNameKySo.replace(/.signed.pdf/g, '').replace(/.pdf/g, '');
        nameFileSigned = fileNameKySo + '.signed.pdf'
        const bodyFormData = new FormData();
        bodyFormData.append('Files', blob, nameFileSigned);
        bodyFormData.append('FolderName', saveToFolder);
        const res = await axiosInstance.post<IResult<any>>(API_VERSION + UPLOADFILE_ENDPOINT, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        urlFileSigned = res.data.data
        // console.log("urlFileSigned",urlFileSigned);
        // console.log("urlFileKySo",urlFileKySo);
        document.getElementById(`check_daKySo_${urlFileKySo}`)!.innerHTML = "Đã ký số"
        handler(urlFileSigned, urlFileKySo)
      }
    }
    signer.sign();
  })

}

export type SignSignature = {
  name: string;
  isDefault?: boolean;
  selection?: string;
  appearance: {
    fontFamily?: string;
    fontSize?: number;
    fields?: {
      type: string;
      value: string;
    }[];
    textColor?: number;
  };
  autoPosition: {
    positionX?: string;
    positionY?: string;
    method?: string;
    pageOrder?: string;
    page?: number;
    marginX?: number;
    marginY?: number
  };
}

export const getAutoPositionSigned = (signerName?: string, signerPos?: string) => {
  if (signerName && signerPos) {
    return {
      // ở giữa chức vụ và tên
      patterns: [
        {
          pattern: '^\\s*' + signerPos.toUpperCase() + '\\s*$',
          isRegex: true,
          caseSensitive: true,
        },
        { pattern: '^\\s*' + signerName + '\\s*$', isRegex: true },
      ],
      positionX: 'center',
      positionY: 'center',
      fallbacks: [
        {
          found: [0],
          positionY: 'after',
          marginY: 10,
        },
        {
          found: [1],
          positionY: 'before',
          marginY: 10,
        },
        {
          method: 'page',
          positionX: 'start',
          positionY: 'start',
          marginX: 10,
          marginY: 10,
        }
      ]
    }
  } else if (signerPos) {
    return {
      // ở dưới, căn giữa chức vụ
      patterns: [{
        pattern: '^\\s*' + signerPos.toUpperCase() + '\\s*$',
        isRegex: true,
        caseSensitive: true,
      }],
      positionX: 'center',
      positionY: 'after',
    }
  } else if (signerName) {
    return {
      // ở trên, căn giữa tên người ký
      patterns: [{ pattern: '^\\s*' + signerName + '\\s*$', isRegex: true }],
      positionX: 'center',
      positionY: 'before',
    }
  }
  // fallback
  return {
    patterns: [{
      pattern: '^\\s*CHỦ TỊCH\\s*$',
      isRegex: true,
      caseSensitive: true,
    }],
    positionX: 'center',
    positionY: 'after',
  }
}
export const togglerSinged = (fileName: string, signed: boolean) => {
  if (!fileName) {
    return
  }
  // console.log(fileName);

  const kySoBtnElement = document.getElementById(`check_daKySo_${fileName}`)
  if (kySoBtnElement) {
    // console.log(kySoBtnElement);
    kySoBtnElement.innerHTML = signed ? "Đã ký số" : "Ký số"
  }
}

export const btnSignClick = async (fileName: string, saveToFolder: string, handler: (newFile: string, oldFile: string) => void, getFileHanlder?: (fileName: string) => Promise<any>, signatures?: SignSignature[], overrideSignature?: boolean) => {
  // var eleFile = document.querySelector("#file")
  store.dispatch(togglerAppLoading(true));

  let oldFileKySo = fileName
  let file: any
  if (getFileHanlder) {
    file = await getFileHanlder(fileName)
  } else {
    file = await getFile(fileName)
    // file = await fileApi.GetFileByte({path:fileName})
  }
  if (!(oldFileKySo && file)) {
    return;
  }
  // const div = document.createElement("div")
  // div.style.pointerEvents = "none"
  // div.style.position = "fixed"
  // div.style.inset = "0 0 0 0"
  // div.style.background = "rgba(255, 255, 255, 0.5)";
  // div.style.opacity = "0.5";
  // document.body.appendChild(div);


  // connect to the eSign native host
  await window.td.eSign.safeConnect((connection: any) => {
    // create file Api
    var fileApi = new window.td.eSign.FileApi(connection);
    // create api instance
    var api = new window.td.eSign.SignatureApi(connection);

    var convApi = new window.td.eSign.ConversionApi(connection);
    // dont forget to return the promise chain.
    // if not, the connection will disconnect immediately.
    // first, push the file to working store using FileApi
    let signature: any = [
      // {
      //     name: 'Số / Ký hiệu',
      //     selection: 'preset',
      //     appearance: {
      //         fontSize: 12,
      //         fields: [{ type: "text", value: '15' }],
      //     },
      //     autoPosition: {
      //         patterns: [{
      //             pattern: '^\\s*Số:?(\\s+)/',
      //             isRegex: true,
      //             group: 1,
      //         }],
      //         positionX: 'center',
      //         positionY: 'start',
      //     }
      // },
      // {
      //     name: 'Ngày ban hành',
      //     selection: 'preset',
      //     appearance: {
      //         fontSize: 12,
      //         fontStyle: td.eSign.FontStyle.Italic,
      //         // fontStyle: eSign.FontStyle.Italic | eSign.FontStyle.Underline,
      //         fields: [{ type: "text", value: "09            6" }],
      //     },
      //     autoPosition: {
      //         patterns: [{
      //             pattern: ', ngày\\s+(tháng)\\s+năm\\s+[0-9]*',
      //             isRegex: true,
      //             group: 1,
      //         }],
      //         positionX: 'center',
      //         positionY: 'start',
      //     }
      // },
      {
        name: 'Chữ ký',
        isDefault: true,
        appearance: {
          // font family of the signature appearence
          fontFamily: "Times New Roman",
          // text color of the signature
          // textColor: 0x8800FF,
        },
        autoPosition: {
          positionX: 'end',
          positionY: 'start',
          method: "page",
          marginY: 10,
          marginX: 10,
          pageOrder: "descending",
          page: 1,
        }
        // autoPosition: (/** @returns {import("../.d/api").SignatureAutoPosition} */() => {
        //     if (signerName && signerPos) {
        //         return {
        //             // ở giữa chức vụ và tên
        //             patterns: [
        //                 {
        //                     pattern: '^\\s*' + signerPos.toUpperCase() + '\\s*$',
        //                     isRegex: true,
        //                     caseSensitive: true,
        //                 },
        //                 { pattern: '^\\s*' + signerName + '\\s*$', isRegex: true },
        //             ],
        //             positionX: 'center',
        //             positionY: 'center',
        //             fallbacks: [
        //                 {
        //                     found: [0],
        //                     positionY: 'after',
        //                     marginY: 10,
        //                 },
        //                 {
        //                     found: [1],
        //                     positionY: 'before',
        //                     marginY: 10,
        //                 },
        //                 {
        //                     method: 'page',
        //                     positionX: 'start',
        //                     positionY: 'start',
        //                     marginX: 10,
        //                     marginY: 10,
        //                 }
        //             ]
        //         }
        //     } else if (signerPos) {
        //         return {
        //             // ở dưới, căn giữa chức vụ
        //             patterns: [{
        //                 pattern: '^\\s*' + signerPos.toUpperCase() + '\\s*$',
        //                 isRegex: true,
        //                 caseSensitive: true,
        //             }],
        //             positionX: 'center',
        //             positionY: 'after',
        //         }
        //     } else if (signerName) {
        //         return {
        //             // ở trên, căn giữa tên người ký
        //             patterns: [{ pattern: '^\\s*' + signerName + '\\s*$', isRegex: true }],
        //             positionX: 'center',
        //             positionY: 'before',
        //         }
        //     }

        //     // fallback
        //     return {
        //         patterns: [{
        //             pattern: '^\\s*CHỦ TỊCH\\s*$',
        //             isRegex: true,
        //             caseSensitive: true,
        //         }],
        //         positionX: 'center',
        //         positionY: 'after',
        //     }
        // })(),
      },
    ]
    if (overrideSignature) {
      signature = signatures
    } else {
      if (signatures) {
        signature = signature.concat(signatures)
      }
    }
    return fileApi.push(file)
      .then((id: string) => convApi
        .canConvertToPdf(id)
        .then((res: boolean) => res ? convApi.convertToPdf(id) : id))
      // sign the file specified by fileId
      .then((fileId: any) => api.signWithNativeUI(fileId, {
        // signature options
        signatures: signature
      }))
      // get signed file content
      .then((signResult: any) => fileApi.pull(signResult.fileId))
      // save file
      .then(async (file: any) => {
        // TODO: do your work with signed file data.   Such as upload to server.
        // console.log(file);


        const newFileNameKySo = fileName.substring(fileName.lastIndexOf("/") + 1).replace(/.signed.pdf/g, '').replace(/.pdf/g, '').replace(/.docx/g, '')
        const nameFileSigned = newFileNameKySo + '.signed.pdf'
        const bodyFormData = new FormData();
        bodyFormData.append('Files', file, nameFileSigned);
        bodyFormData.append('FolderName', saveToFolder);
        const res = await axiosInstance.post<IResult<any>>(HOST_PATH_FILE + API_VERSION + UPLOADFILE_ENDPOINT, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(res);
        // save data as file
        // saveFile(file);
        togglerSinged(oldFileKySo, true)
        // const aTag = document.getElementById(`view_kySo${oldFileKySo}`) as HTMLSpanElement
        // if(aTag){
        //   aTag.dataset.href = res.data.data
        // }
        // finshed. Returning is not required
        handler(res.data.data, oldFileKySo)
        toast.success("Ký số thành công")
      })
      // catch errors
      .catch((error: any) => {
        console.log(error)
        toast.warn(JSON.stringify(error))
      }); // --> shared.js
  })
    .catch((err: any) => {
      console.log(err)
    }) // connection error
    .then(() => {
      // document.body.removeChild(div);
      // reenable ui
      // enableUI();
      store.dispatch(togglerAppLoading(false));
    });
}
export function loadFilePizzip(url: string, callback: (error: Error, content: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const fillSoChungThuc = async (fileUrl: string, data: any) => {
  // const blobUrl = await getUrlFromBlob(fileUrl)
  const blob = await axios.get(fileUrl, { responseType: "blob" });
  const blobUrl = window.URL.createObjectURL(blob.data);
  if (!blobUrl) {
    return
  }
  loadFilePizzip(blobUrl, async function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplate(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.setData(data)
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error: any) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key: any, value: any) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
            error: any,
            key: string
          ) {
            error[key] = (value as any)[key];
            return error;
          },
            {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error: any) {
            return error.properties.explanation;
          })
          .join('\n');
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }); //Output the document using Data-URI
    saveAs(out, "sochungthuc.docx");
  })
}

export function base64DataURLToArrayBuffer(dataURL: string) {
  const base64Regex = /^data:image\/(png|jpeg|jpg|svg|svg\+xml);base64,/;
  if (!base64Regex.test(dataURL)) {
    return false;
  }
  const stringBase64 = dataURL.replace(base64Regex, "");
  let binaryString;
  if (typeof window !== "undefined") {
    binaryString = window.atob(stringBase64);
  } else {
    binaryString = new Buffer(stringBase64, "base64").toString("binary");
  }
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}
export async function generateDocxWithImages(fileUrl: string, data: any, saveAsFileName: `${string}.docx`, callback?: (blobData: any) => Promise<void>, save: boolean = true, imageSize: [number, number] = [100, 100], docOutType: "blob" | "string" | "base64" = "blob") {
  const blob = await fileApi.GetFileByte({ path: fileUrl });
  const blobUrl = window.URL.createObjectURL(blob.data);
  if (!blobUrl) {
    return
  }

  loadFilePizzip(blobUrl, async function (error, content) {
    if (error) {
      throw error;
    }
    const imageOpts = {
      centered: true,
      getImage(tag: any) {
        return base64DataURLToArrayBuffer(tag);
      },
      getSize() {
        return imageSize;
      },
    };
    // opts.getImage = function (tagValue: string, tagName: string) {
    //   return new Promise(function (resolve, reject) {
    //     PizZipUtils.getBinaryContent(tagValue, function (error, content) {
    //       if (error) {
    //         return reject(error);
    //       }
    //       return resolve(content);
    //     });
    //   });
    // }
    // opts.getSize = function (img: any, tagValue: any, tagName: any) {
    //   // FOR FIXED SIZE IMAGE :
    //   return [150, 150];
    // }

    var imageModule = new ImageModule(imageOpts);

    const zip = new PizZip(content);
    const doc = new Docxtemplate(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [
        imageModule
      ],
      nullGetter: function undefinedToEmpty(value) {
        return "...."
      }
    });

    // doc.setData(data)
    doc.resolveData({
      ...data
    }).then(async function () {
      // console.log('ready');
      doc.render();
      var out = doc.getZip().generate({
        type: docOutType as any,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      if (callback) {
        await callback(out)
      }
      if (save) {
        saveAs(out, saveAsFileName);
      }
    }).catch(err => {
      console.log(err);
    })
  })
}


export async function generateDocxToBlobPdf(fileUrl: string, data: any, saveAsFileName: `${string}.docx`, callback?: (blobData: any) => Promise<void>, save: boolean = true, imageSize: [number, number] = [100, 100], docOutType: "blob" | "string" | "base64" = "blob") {
  const blob = await axios.get(fileUrl, { responseType: "blob" });
  const blobUrl = window.URL.createObjectURL(blob.data);
  if (!blobUrl) {
    return
  }
  // console.log(data);

  loadFilePizzip(blobUrl, async function (error, content) {
    if (error) {
      throw error;
    }
    const imageOpts = {
      centered: true,
      getImage(tag: any) {
        return base64DataURLToArrayBuffer(tag);
      },
      getSize() {
        return imageSize;
      },
    };
    var imageModule = new ImageModule(imageOpts);

    const zip = new PizZip(content);
    const doc = new Docxtemplate(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [
        imageModule
      ],
      nullGetter: function undefinedToEmpty(value) {
        return "...."
      }
    });

    // doc.setData(data)
    doc.resolveData({
      ...data
    }).then(async function () {
      // console.log('ready');
      doc.render();
      var out = doc.getZip().generate({
        type: docOutType as any,
        mimeType: "application/pdf",
      });
      if (callback) {
        await callback(out)
      }
      if (save) {
        saveAs(out, saveAsFileName);
      }
    }).catch(err => {
      console.log(err);
    })
  })
}

export const fillEformData = async (fileUrl: string, data: any, saveAsFileName: string, saveToFolder?: string, onDone?: (uploadedFileName: string) => void, flag: "word" | "word2pdf" | "saveToTable" = "word") => {
  const blobUrl = await getUrlFromBlob(fileUrl)
  if (!blobUrl) {
    return
  }
  loadFilePizzip(blobUrl, async function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplate(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.setData(data)
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error: any) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key: any, value: any) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
            error: any,
            key: string
          ) {
            error[key] = (value as any)[key];
            return error;
          },
            {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error: any) {
            return error.properties.explanation;
          })
          .join('\n');
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    if (flag == "word") {
      saveFileBlob(doc, saveAsFileName)
    } else if (flag == "word2pdf") {
      await openPdfOnNewTab(doc, fileUrl)
    } else if (flag == "saveToTable" && saveToFolder && onDone !== undefined) {
      await uploadBase64DocxAsPdf(doc, fileUrl, saveToFolder, onDone)
    }
  })
}

export const saveFileBlob = (doc: Docxtemplate<PizZip>, saveAsFileName: string) => {
  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }); //Output the document using Data-URI
  saveAs(out, saveAsFileName);
}

export const openPdfOnNewTab = async (doc: Docxtemplate<PizZip>, fileUrl: string) => {
  const out = doc.getZip().generate({
    type: "base64",
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }); //Output the document using Data-URI
  await getPdfFileUrlFromBlob(out, fileUrl)

}

export const uploadBase64DocxAsPdf = async (doc: Docxtemplate<PizZip>, fileUrl: string, saveToFolder: string, onDone: (uploadedFileName: string) => void) => {
  const out = doc.getZip().generate({
    type: "base64",
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }); //Output the document using Data-URI
  await uploadBase64DocxAsPdfToServer(out, fileUrl, saveToFolder, onDone)

}


export const uploadFileToBase64 = (filePath: string): Promise<string | ArrayBuffer | null> => new Promise(async (resolve, reject) => {
  if (!filePath) {
    reject
    return;
  }
  const file = await getFile(filePath)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
})

export const DownloadAndSaveFile = async (filePath: string) => {
  try {
    const blobData = await fileApi.GetFileByte({ path: filePath });

    const res = blobData.data;
    saveAs(res, getFileName(filePath));
  } catch (error) {
    console.error("Error downloading or saving the file:", error);
  }
}

export const getFileSize = async (filePath: string) => {

  try {
    const blobData = await fileApi.GetFileByte({ path: filePath });
    const res = blobData.data.size;


    return res
  } catch (error) {
    console.error("Error get file size:", error);
  }
};