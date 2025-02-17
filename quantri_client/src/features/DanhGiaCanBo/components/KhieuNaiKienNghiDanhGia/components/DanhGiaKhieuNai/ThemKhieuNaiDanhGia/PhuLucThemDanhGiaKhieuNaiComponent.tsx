import { FormInstance, Table } from "antd";
// import { formDemo1, formDemo2 } from "./formDemo1";
import { useState, useEffect, useMemo } from "react";
import { ExpandOutlined, MinusCircleOutlined, MinusSquareOutlined, PlusCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Item from "antd/es/list/Item";
import { IDanhGiaColumn, ITieuChiCouple } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useMauPhieuKhieuNaiDanhGiaColumn } from "../../../hooks/useMauPhieuKhieuNaiDanhGiaColumn";
import { useKhieuNaiDanhGiaContext } from "../../../contexts/useKhieuNaiKienNghiContext";



function PhuLucThemDanhGiaKhieuNaiComponent({ dataRoot, scorePoint, updateData, updateTotalKhieuNai }: {
    dataRoot: IDanhGiaColumn,
    scorePoint: string,
    updateData: (newData: IDanhGiaColumn) => void
    updateTotalKhieuNai: (totalKhieuNai: number) => void
}) {
    const danhGiaContext = useKhieuNaiDanhGiaContext()
    const [dataSource, setDataSource] = useState<IDanhGiaColumn[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    useEffect(() => {
        if (dataRoot.DanhSachTieuChiCon) {

            const updateDataSourse = (items: IDanhGiaColumn[]): IDanhGiaColumn[] => {
                return items.map(item => {
                    if (item.DiemDanhGia)
                        item.DiemDanhGiaPrev = item.DiemDanhGia

                    if (item.isCheckedDG)
                        item.isCheckedDGPrev = item.isCheckedDG

                    if (item.SoLuong)
                        item.SoLuongPrev = item.SoLuong

                    if (item.isDisabledDG)
                        item.isDisabledDGPrev = item.isDisabledDG


                    if (item.DanhSachTieuChiCon) {
                        const updatedChildren = updateDataSourse(item.DanhSachTieuChiCon);
                        const updatedItem = { ...item, DanhSachTieuChiCon: updatedChildren };
                        return updatedItem;
                    }
                    return item
                })
            }
            const newDataSource = updateDataSourse(dataRoot.DanhSachTieuChiCon)
            updateData({
                ...dataRoot,
                DanhSachTieuChiCon: newDataSource
            })

            setDataSource(newDataSource)
        }
    }, [])

    useEffect(() => {
        if (dataSource && dataSource.length) {
            dataSource.forEach(ele => {
                const trElement: any = document.querySelector(`tr[data-row-key="${ele.MaTieuChi}"]`);

                if (trElement) {
                    trElement.style.backgroundColor = 'lightblue';

                    const tdElements = trElement.querySelectorAll('td');
                    if (tdElements.length > 1) {
                        const firstTd = tdElements[0];
                        const secondTd = tdElements[1];

                        firstTd.style.fontWeight = 500;
                        secondTd.style.fontWeight = 500;

                    }
                }
            })
        }

    }, [dataSource])

    useEffect(() => {
        if (dataSource) {
            const rowsWithChildren = getAllExpandedRowKeys(dataSource);
            setExpandedRowKeys(rowsWithChildren); // Mở rộng các hàng có hàng con
        }
    }, [dataSource]);

    const getAllExpandedRowKeys = (data: IDanhGiaColumn[]): string[] => {
        let expandedKeys: string[] = [];
        data.forEach((item) => {
            if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
                expandedKeys.push(item.MaTieuChi!); // Thêm hàng hiện tại vào danh sách mở
                expandedKeys = expandedKeys.concat(getAllExpandedRowKeys(item.DanhSachTieuChiCon)); // Đệ quy cho các hàng con
            }
        });

        return expandedKeys;
    };

    const onExpand = (expanded: boolean, record: IDanhGiaColumn) => {
        setExpandedRowKeys((keys) =>
            expanded
                ? [...keys, record.MaTieuChi!] // Thêm hàng khi mở rộng
                : keys.filter((key) => key !== record.MaTieuChi) // Loại bỏ hàng khi thu gọn
        );
    };



    const filteredDataSource = useMemo(() => {
        const filterData = (items: IDanhGiaColumn[]): IDanhGiaColumn[] => {
            return items.filter(item => {
                if (!danhGiaContext.kiemNhiem && item.KiemNhiem) {
                    return false;
                }
                if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
                    item.DanhSachTieuChiCon = filterData(item.DanhSachTieuChiCon);
                }
                return true;
            });
        };
        return filterData(dataSource);
    }, [dataSource, danhGiaContext.kiemNhiem]);


    const columns = useMauPhieuKhieuNaiDanhGiaColumn({
        dataRoot,
        scorePoint,
        dataSource,
        setDataSource,
        expandedRowKeys,
        onExpand, updateData, updateTotalKhieuNai,
    });

    return (
        <div className="tieuChiComponent">
            <Table
                columns={columns}
                dataSource={filteredDataSource}
                rowKey="MaTieuChi"
                bordered
                expandable={{
                    expandedRowKeys,
                    onExpand,
                    childrenColumnName: "DanhSachTieuChiCon",
                    expandIconColumnIndex: 1,
                    expandIcon: ({ expanded, onExpand, record }) =>
                        record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 ? (
                            <span onClick={(e) => onExpand(record, e)}>
                                {expanded ? <><MinusCircleOutlined /> {' '}</> : <><PlusCircleOutlined /> {' '} </>}
                            </span>
                        ) : null,
                }}
                pagination={false}
            />
        </div>
    );
}

export default PhuLucThemDanhGiaKhieuNaiComponent;
