import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, LoadingOutlined, RollbackOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { TableRowSelection } from "antd/es/table/interface";
import VetXuLyDanhGiaTable from "../../../common/VetXuLyModal/VetXuLyDanhGiaTable";
import ReadOnlyDanhGiaDetailModal from "../../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { DanhGiaTableActions } from "../../../common/DanhGiaCommon";
import { ToanBoDanhGiaDonViSearch } from "../../components/ToanBoDanhGiaDonViSearch";
import { useToanBoDanhGiaDonViColumn } from "../../hooks/useToanBoDanhGiaDonViColumn";
import { useAppSelector } from "@/lib/redux/Hooks";
import XoaChamDiemModal from "../../../common/components/XoaChamDiem/XoaChamDiemModal";

function ToanBoDanhGiaDonViTable() {
    const { parseToken } = useAppSelector((state) => state.auth);
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [reload, setReload] = useState<boolean>(false)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        loaiNgay: 'TuDanhGia',
        maDonVi: parseToken?.officeCode,
        toanBoDonVi: true
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })

    const tableActions: DanhGiaTableActions[] = useMemo(() => [
        {
            icon: <EyeOutlined title="Xem chi tiết"
                onClick={() => {
                    buttonActionContext.setReadOnlyDanhGiaModalVisible(true)
                }} />,
            key: 'XemChiTietDanhGia'
        },
        {
            icon: <UnorderedListOutlined title="Xem vết xử lý"
                onClick={() => {
                    buttonActionContext.setVetXuLyDanhGiaModalVisible(true)
                }} />
            ,
            key: 'VetXuLy'
        },
        {
            icon: <Popconfirm
                title='Xoá?'
                onConfirm={async () => {
                    if (!buttonActionContext.danhGiaId) {
                        toast.error('Không có ID của phiếu cần xóa')
                        return
                    }
                    buttonActionContext.setLoading(true)

                    const resXoaDanhGia = await danhGiaCanBoServiceApi.XoaDanhGiaByListId({
                        ids: [buttonActionContext.danhGiaId],
                    })
                    if (resXoaDanhGia.data.succeeded) {
                        toast.success(resXoaDanhGia.data.message)
                        setReload(!reload)
                    } else {
                        toast.error(resXoaDanhGia.data.message)
                    }

                    buttonActionContext.setLoading(false)

                }}
                okText='Xoá'
                cancelText='Huỷ'
            >
                <DeleteOutlined style={{ color: "tomato" }} title="Xóa đánh giá chấm điểm" />
            </Popconfirm>,
            key: 'XoaDanhGia'
        },
    ], [buttonActionContext.danhGiaId])
    const columns = useToanBoDanhGiaDonViColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })


    const extraButtons = [
        <AntdButton className="XoaChamDiemButton"
            title="Xóa đánh giá chấm điểm"
            onClick={async () => {
                if (buttonActionContext.selectedDanhGias.length > 0)
                    buttonActionContext.setXoaChamDiemModalVisible(true)
                else
                    toast.info("Chưa chọn đánh giá để thực hiện xóa")
            }}
            icon={<DeleteOutlined />}
        > Xóa chấm điểm</AntdButton>,
    ];


    useEffect(() => {
        (async () => {
            buttonActionContext.setLoading(true)
            const res = await danhGiaCanBoServiceApi.Search(searchParams)
            if (res.status == 200) {
                setDanhGias(res.data.data)
                setTotalCount(res.data.totalCount)
            } else {
                toast.error("Lỗi lấy thông tin đánh giá")
            }
            buttonActionContext.setLoading(false)
        })()
    }, [searchParams, reload])

    const rowSelection: TableRowSelection<IDanhGiaCanBo> = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedDanhGias(selectedRowKeys);
        },
        selectedRowKeys: buttonActionContext.selectedDanhGias,
    };

    return (<div className="ToanBoDanhGiaDonViSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ToanBoDanhGiaDonViSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} setLoading={buttonActionContext.setLoading} />
                <AntdTable
                    columns={columns}
                    dataSource={danhGias}
                    pagination={{
                        total: totalCount
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                />
            </AntdSpace>
            <VetXuLyDanhGiaTable />
            <ReadOnlyDanhGiaDetailModal />
            <XoaChamDiemModal reload={reload} setReload={setReload} />
        </Spin>
    </div>)
}

const ToanBoDanhGiaDonViTableSwapper = () => (
    <ButtonActionProvider>
        <ToanBoDanhGiaDonViTable />
    </ButtonActionProvider>
);


export default ToanBoDanhGiaDonViTableSwapper;