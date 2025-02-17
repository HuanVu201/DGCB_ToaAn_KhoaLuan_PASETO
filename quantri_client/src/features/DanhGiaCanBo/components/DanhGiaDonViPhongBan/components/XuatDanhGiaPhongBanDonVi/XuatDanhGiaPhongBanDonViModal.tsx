import { AntdModal } from "@/lib/antd/components"
import { Button, Spin } from "antd";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { callApiAndDisplayFile } from "@/utils";
import { useButtonActionContext } from "../../../common/contexts/useButtonActionContext";
import { useXuLyPhieuContext, XuLyPhieuProvider } from "../../../common/contexts/useXuLyPhieuContext";
import { XuatDanhGiaPhongBanDonVi } from "./XuatDanhGiaPhongBanDonVi";


const XuatDanhGiaPhongBanDonViModalVisible = () => {
    const buttonActionContext = useButtonActionContext()
    const xuLyContext = useXuLyPhieuContext()

    const handlerCancel = () => {
        buttonActionContext.setSelectedDanhGias([])
        buttonActionContext.setInDanhGiaPhongBanDonViModalVisible(false)
        xuLyContext.setUrlDocxPhieu(undefined)
        xuLyContext.setUrlPdfPhieu(undefined)
        xuLyContext.setPdfBlob(undefined)
        xuLyContext.setIsKySo(false)
    }

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn Ctrl+P
                taiPhieu(); // Gọi hàm in PDF
            }
        };
        // Nghe sự kiện keydown trên cả trang web
        document.addEventListener('keydown', handleKeyPress);
        // Xóa bỏ sự kiện khi component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    const taiPhieu = async () => {
        const iframe: any = document.getElementById('iframePdf')
        if (iframe) {
            iframe.contentWindow.print(); // Gọi hàm in của iframe
        }
    }

    const xuatLaiPhieuAction = () => {
        xuLyContext.setXuatLaiPhieu(true)
        xuLyContext.setUrlPdfPhieu(undefined)
        xuLyContext.setUrlDocxPhieu(undefined)
        xuLyContext.setPdfBlob(undefined)
    }

    const kySo = async () => {
        xuLyContext.handlerKySo("");
    }

    const xuatWord = async () => {
        if (xuLyContext.urlDocxPhieu) {
            callApiAndDisplayFile(xuLyContext.urlDocxPhieu as any)
        }
    }

    return <AntdModal visible={buttonActionContext.inDanhGiaPhongBanDonViModalVisible} title={`Thông tin phiếu đánh giá`} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[

            <Button
                type="primary"
                onClick={xuatWord}
                hidden={!xuLyContext.urlDocxPhieu}
                disabled={xuLyContext.loading}
            >
                Xuất phiếu word
            </Button>,
            <Button
                type="primary"
                onClick={taiPhieu} //In tương tự Window + P
                disabled={xuLyContext.loading}
            >
                In phiếu
            </Button>,
            <Button
                type="primary"
                onClick={xuatLaiPhieuAction}
                disabled={xuLyContext.loading}
            >
                Xuất lại phiếu
            </Button>,
            <Button
                type="primary"
                onClick={kySo}
                disabled={xuLyContext.loading || !xuLyContext.isKySo}
                hidden={!xuLyContext.isKySo}
            >
                Ký số
            </Button>,
            <Button key="back" onClick={handlerCancel} >
                Hủy
            </Button>


        ]}
    >
        <Spin spinning={xuLyContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <XuatDanhGiaPhongBanDonVi />
        </Spin>
    </AntdModal>
}
const XuatDanhGiaPhongBanDonViModal = () => (
    <XuLyPhieuProvider>
        <XuatDanhGiaPhongBanDonViModalVisible />
    </XuLyPhieuProvider>
);


export default XuatDanhGiaPhongBanDonViModal