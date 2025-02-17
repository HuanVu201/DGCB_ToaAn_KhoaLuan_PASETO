declare global {
    interface Window {
        objDataCSDLDanCu: any;
        objDataNopHoSo: any;
        downloadPhieuPdf: () => void;
        td: {
            eSign: any,
        };
        TD: {
            bte: any,
            Bte: any,
        };
        _govaq: string[][],
        STPadServerLib: {
            STPadServerLibDefault: any;
            STPadServerLibCommons: any;
            STPadServerLibApi: any;
        },
    }
    interface String {
        PrefixWithBaseURL(version?: string): string;
    }
}
export {};