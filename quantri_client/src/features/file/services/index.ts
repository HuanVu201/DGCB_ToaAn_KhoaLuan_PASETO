import axiosInstance from "@/lib/axios";
import axiosInstanceFile from "@/lib/axios/fileInstance";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IResult } from "@/models";
import { Service } from "@/services";

export type VerifyDigitalSignatureResponse = {
    hasDigitalSinature: boolean;
    digitalSignatureFiles: string[];
    normalFiles: string[];
}

export const ConvertDocxToPdfEXTType = {
    ".doc": 0,
    ".docx": 2,
} as const

export type ConvertDocxToPdfParams = {
    data: string,
    fileUrl: string
}

export type GetSignatureDataResponse = {
    date: string;
    issuerDN: string;
    name: string;
    subjectDN: string;
}

class FileService extends Service.BaseApi {
    constructor() {
        super("files")
    }
    private GetFileName(fileUrl: string) {
        const fileName = fileUrl.toLowerCase().substring(fileUrl.lastIndexOf("/") + 1)
        return fileName
    }
    //files/uploadfilebucket
    UploadFileBucket(params: { files: FormData, folderName?: string }): AxiosResponseWrapper<any> {
        return axiosInstanceFile.post(this._urlSuffix + "/uploadfilebucket", params)
    }
    UploadFileBucketWithBlob(params: { blob: Blob, fileName: string, folderName?: string }): AxiosResponseWrapper<IResult<string>> {
        const bodyFormData = new FormData();
        bodyFormData.append('Files', params.blob, params.fileName);
        bodyFormData.append('FolderName', params?.folderName || "");
        return axiosInstanceFile.post(this._urlSuffix + "/uploadfilebucket", bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
    UploadFileAsBase64(params: { Data: string, FileName: string, folderName: string }): AxiosResponseWrapper<any> {
        return axiosInstanceFile.post(this._urlSuffix + "/UploadFileAsBase64", params)
    }

    GetFile(params: { path: string }): AxiosResponseWrapper<any> {
        return axiosInstanceFile.get(this._urlSuffix + "/getfilebucket", { params, responseType: "blob" })
    }
    GetFileByte(params: { path: string }): AxiosResponseWrapper<any> {
        return axiosInstanceFile.get(this._urlSuffix + "/GetFileStream", { params, responseType: "blob" })
    }
    AddPagePdf(params: { path: string }): AxiosResponseWrapper<any> {
        return axiosInstanceFile.get(this._urlSuffix + "/addpagepdf", { params, responseType: "blob" })
    }

    RemoveFile(params: { path: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstanceFile.post(this._urlSuffix + "/removefilebucket", params)
    }
    ConvertDocxToPdf(params: ConvertDocxToPdfParams): AxiosResponseWrapper<any> {
        return axiosInstanceFile.post(this._urlSuffix + "/convertdocxtopdf", { data: params.data, fileName: this.GetFileName(params.fileUrl) }, { responseType: "blob" })
    }
    UploadDocxAsPdf(params: { data: string, fileUrl: string, folderName: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstanceFile.post<IResult<any>>(this._urlSuffix + "/uploadpdfbucket", { ...params, fileName: this.GetFileName(params.fileUrl) })
    }
    UploadPdfBucketAsStream(params: {
        blob: Blob, fileName: string, folderName?: string,
        addGTHS?: string,
        maHoSo?: string,
        loaiGiayTo?: string,
        nguoiXuatPhieu?: string,
        ngayXuatPhieu?: string,
        maGiayTo?: string,

    }): AxiosResponseWrapper<IResult<any>> {
        const bodyFormData = new FormData();
        bodyFormData.append('Data', params.blob, params.fileName);
        bodyFormData.append('FileName', params.fileName);
        bodyFormData.append('FolderName', params?.folderName || "");
        bodyFormData.append('AddGTHS', params.addGTHS || "1");
        bodyFormData.append('MaHoSo', params?.maHoSo || "");
        bodyFormData.append('loaiGiayTo', params?.loaiGiayTo || "");
        bodyFormData.append('NguoiXuatPhieu', params?.nguoiXuatPhieu || "");
        bodyFormData.append('NgayXuatPhieu', params?.ngayXuatPhieu || "");
        bodyFormData.append('MaGiayTo', params?.maGiayTo || "");

        return axiosInstanceFile.post<IResult<any>>(this._urlSuffix + "/UploadPdfBucketAsStream", bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            responseType: "blob"
        })
    }


    VerifyDigitalSignature(filePath: string[], breakIfHasSignedFile: boolean = false): AxiosResponseWrapper<IResult<VerifyDigitalSignatureResponse>> {
        return axiosInstanceFile.post<IResult<VerifyDigitalSignatureResponse>>(this._urlSuffix + "/verifydigitalsignature", { filePaths: filePath, breakIfHasSignedFile }, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
    GetSignatureData(filePath: string): AxiosResponseWrapper<IResult<GetSignatureDataResponse[]>> {
        return axiosInstanceFile.post<IResult<GetSignatureDataResponse[]>>(this._urlSuffix + "/GetSignatureData", { filePath: filePath }, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
}

export const fileApi = new FileService()

