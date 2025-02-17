import { ConvertDocxToPdfEXTType, ConvertDocxToPdfParams, fileApi } from "@/features/file/services";
import axios from "axios";
import { getFileName } from "./format";

export async function getUrlFromBlob(url: string) {
  console.log(url)
  const response = await fileApi.GetFileByte({ path: url })
  const fileURL = window.URL.createObjectURL(response.data);
  return fileURL
}


export async function getUrlFromBlobPublic(url: string) {
  const response = await axios.get(url, { responseType: "blob" });

  const fileURL = window.URL.createObjectURL(response.data);

  return fileURL
}

export async function getFile(url: string) {
  const response = await fileApi.GetFileByte({ path: url })
  return response.data
}

export async function addPagePDF(url: string) {
  const response = await fileApi.AddPagePdf({ path: url })
  return response.data
}

export function blobToBase64(blob: Blob) {
  return new Promise((resolve: (value: string | ArrayBuffer | null) => void, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export async function getPdfFileUrlFromBlob(base64: string, fileUrl: string, openWhenDone: boolean = true) {


  const response = await fileApi.ConvertDocxToPdf({ data: base64, fileUrl })
  const fileURL = window.URL.createObjectURL(response.data);
  let tab = window.open();
  if (tab && openWhenDone) {
    tab.location.href = fileURL;
    tab.focus()
    tab.print()
  }
}

export async function uploadBase64DocxAsPdfToServer(base64: string, fileUrl: string, folderName: string, onDone: (fileUploadedName: string) => void) {
  const response = await fileApi.UploadDocxAsPdf({ folderName, fileUrl, data: base64 })

  if (response.data?.data) {
    onDone(response.data.data)
  }
}

export async function callApiAndDisplayFile(filePath: string) {
  // Gọi API để nhận file stream
  try {
    const fileURL = await getUrlFromBlob(filePath)
    let tab = window.open();
    if (tab) {
      // if(filePath.toLowerCase().endsWith(".pdf")){
      //   tab.location.href = fileURL;
      //   var a = document.createElement("a");
      //   document.body.appendChild(a);
      //   a.href = fileURL;
      //   a.download = getFileName(filePath);
      //   a.click();
      // } else {
      //   tab.location.href = fileURL;
      // }
      tab.location.href = fileURL;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function callApiAndDownload(filePath: string) {
  // Gọi API để nhận file stream
  try {
    const fileURL = await getUrlFromBlob(filePath)
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = fileURL;
    a.download = getFileName(filePath);
    a.click();
    URL.revokeObjectURL(fileURL)
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function callApiAndDisplayPublicFile(filePath: string) {
  // Gọi API để nhận file stream
  try {
    let tab = window.open();
    if (tab) {
      tab.location.href = filePath;

    }
  } catch (error) {
    console.error('Error:', error);
  }
}