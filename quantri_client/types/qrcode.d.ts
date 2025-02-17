
declare module "qrcode" {
    export interface QrCodeProps {
        create: (data: any, options: any) => void;
        toCanvas: (...params: any) => void;
        toDataURL: (...params: any) => void;
        toString: (...params: any) => void;
    } 
    const QrCode : QrCodeProps 
    export default QrCode
}