import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { Checkbox, Input, InputNumber, Popconfirm, TableColumnsType, Upload } from 'antd';
import { FormInstance } from 'antd/lib';
import { useAppSelector } from '@/lib/redux/Hooks';

import { Table } from 'antd';
import { AntdButton, AntdSelect, UploadTable } from '@/lib/antd/components';
import { toast } from 'react-toastify';
import { RegularUpload } from '@/lib/antd/components/upload/RegularUpload';
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable';
import { API_VERSION, HOST_PATH_FILE, UPLOADFILE_ENDPOINT } from '@/data';
import { getToken } from '@/lib/axios';
import { callApiAndDisplayFile, callApiAndDownload, getFileName, getFileNameWithFixedLength } from '@/utils';
import { DeleteOutlined, PlusOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { IDanhGiaColumn, ITieuChiCouple } from '@/features/DanhGiaCanBo/components/common/models/phieuDanhGia';
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext';
import { useKhieuNaiDanhGiaContext } from '../contexts/useKhieuNaiKienNghiContext';

export const useMauPhieuKhieuNaiDanhGiaColumn = ({
    dataRoot,
    scorePoint,
    dataSource,
    setDataSource,
    expandedRowKeys,
    onExpand,
    updateData,
    updateTotalKhieuNai

}: {
    dataRoot: IDanhGiaColumn,
    scorePoint: string,
    dataSource: IDanhGiaColumn[];
    setDataSource: React.Dispatch<React.SetStateAction<IDanhGiaColumn[]>>;
    expandedRowKeys: string[];
    onExpand: (expanded: boolean, record: IDanhGiaColumn) => void;
    updateData: (newData: IDanhGiaColumn) => void,
    updateTotalKhieuNai: (totalKhieuNai: number) => void
}) => {

    const [isPending, startTransition] = useTransition();
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useKhieuNaiDanhGiaContext()
    const [textValues, setTextValues] = useState<{ [key: string]: string }>({});
    const handleTextChange = useCallback((value: string, record: IDanhGiaColumn) => {
        setTextValues(prev => ({
            ...prev,
            [record.MaTieuChi]: value
        }));
    }, []);

    const onRowChangeGiaiTrinh = useCallback((value: any, record: IDanhGiaColumn, colName: keyof IDanhGiaColumn) => {
        startTransition(() => {

            setDataSource((curr) => {
                const updateDataSourse = (items: IDanhGiaColumn[]): IDanhGiaColumn[] => {
                    return items.map(item => {
                        if (item.MaTieuChi === record.MaTieuChi) {
                            let updatedItem = { ...item, [colName]: value }
                            if (colName === 'isKhieuNai')
                                updatedItem.isKhieuNai = value
                            return updatedItem
                        }
                        if (item.DanhSachTieuChiCon) {
                            const updatedChildren = updateDataSourse(item.DanhSachTieuChiCon);
                            const updatedItem = { ...item, DanhSachTieuChiCon: updatedChildren };
                            return updatedItem;
                        }
                        return item
                    })
                }
                const newDataSource = updateDataSourse([...curr])
                updateTotalKhieuNaiHandler(newDataSource)
                updateData({
                    ...dataRoot,
                    DanhSachTieuChiCon: newDataSource
                })
                return newDataSource;
            })

        })
    }, [])

    const updateTotalKhieuNaiHandler = useCallback((data: IDanhGiaColumn[]) => {
        let totalKhieuNai = 0;

        const calculatePoints = (items: IDanhGiaColumn[]) => {
            items.forEach(item => {
                if (item.isKhieuNai && item.NoiDungKhieuNai)
                    totalKhieuNai += 1

                if (item.DanhSachTieuChiCon) {
                    calculatePoints(item.DanhSachTieuChiCon);
                }
            });
        };

        calculatePoints(data);

        updateTotalKhieuNai(Number(totalKhieuNai))

    }, []);



    const onViewFile = async (fileName: string) => {
        buttonActionContext.setLoading(true)
        await callApiAndDisplayFile(fileName)
        buttonActionContext.setLoading(false)
    }

    const columns: TableColumnsType<IDanhGiaColumn> = useMemo(
        () => {
            const baseColumns: TableColumnsType<IDanhGiaColumn> = [
                {
                    title: <div className="text-center"><b>STT</b></div>,
                    dataIndex: 'STT',
                    key: 'STT',
                    align: 'center',
                    width: '5%',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
                            return null
                        return <span className={record.DiemThuong && record.DanhSachTieuChiCon?.length == 0 ? 'diemThuongRow' : record.DiemTru && record.DanhSachTieuChiCon?.length == 0 ? 'diemTruRow' : 'defaultRow'}>
                            {text}
                        </span>
                    },
                },
                {
                    title: (
                        <div className="text-center">
                            <b>Tiêu chí chấm điểm</b><br />
                            <span style={{ fontWeight: 400 }}>Cơ cấu điểm: Tổng điểm đạt yêu cầu ({scorePoint ? scorePoint.split('#')[0] : '--'}) -
                                <span className="diemThuongRow"> Tổng điểm thưởng ({scorePoint ? scorePoint.split('#')[1] : '--'}) </span> -
                                <span className="diemTruRow"> Tổng điểm trừ ({scorePoint ? scorePoint.split('#')[2] : '--'}) </span>
                            </span>
                        </div>
                    ),
                    dataIndex: 'TenTieuChi',
                    key: 'TenTieuChi',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
                            return null
                        return < >
                            {
                                record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 ? (
                                    <b className={record.DiemThuong && !record.DiemTru && record.ThangDiem != 0 ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && record.ThangDiem != 0 ? 'diemTruRow' : 'defaultRow'}>{text}</b>
                                ) : (
                                    <span className={record.DiemThuong && !record.DiemTru && record.ThangDiem != 0 ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && record.ThangDiem != 0 ? 'diemTruRow' : 'defaultRow'}>{text}</span>
                                )
                            }
                        </>
                    },
                },
                {
                    title: <div className="text-center"><b>Điểm chuẩn</b></div>,
                    dataIndex: 'ThangDiem',
                    key: 'ThangDiem',
                    align: 'center',
                    width: '3%',
                    render: (text: any, record: IDanhGiaColumn, index: any) => {
                        if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
                            return null
                        return <>
                            {
                                (record.ThangDiem != 0 && (record.DiemThuong || record.DiemTru)) || (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length <= 0)
                                    ?
                                    ((record.DiemThuong && record.DiemTru) || (!record.DiemThuong && !record.DiemTru)) && record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0
                                        ? null
                                        :
                                        <div className={record.DiemThuong && !record.DiemTru ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong ? 'diemTruRow' : 'defaultRow'}>
                                            {record.DiemTru && !record.DiemThuong ? " - " : record.DiemThuong && !record.DiemTru ? ' + ' : ''} {record.ThangDiem}
                                        </div>
                                    : null
                            }</>
                    }
                },
                {
                    title: <p style={{ textAlign: 'center' }}>Đơn vị tính</p>,
                    dataIndex: 'SoLuong',
                    key: 'SoLuong',
                    align: 'center',
                    width: '3%',
                    // style: 'maxWidth: 100px',
                    render: (text: string, record: IDanhGiaColumn) => {

                        return (
                            <span className={record.DiemThuong && !record.DiemTru && !record.DanhSachTieuChiCon?.length ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && !record.DanhSachTieuChiCon?.length ? 'diemTruRow' : 'defaultRow'}>
                                {record.DonViTinh}
                            </span>
                        )
                    },
                },
                {
                    title: <div className="text-center"><b>Điểm cá nhân tự chấm</b></div>,
                    dataIndex: 'DiemTuCham',
                    key: 'DiemTuCham',
                    align: 'center',
                    width: '3%',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.DiemLiet) {
                            if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
                            return <Checkbox
                                checked={record.isChecked}
                                disabled={record.JsonDiemLiet && record.JsonDiemLiet.toString().trim() != '[]' ? true : false}
                            />
                        }
                        if (record.DiemThuong && !record.DiemTru)
                            return <span className='diemThuongRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemTuCham ?? 0) != 0 && Math.abs(record.DiemTuCham ?? 0) != record.ThangDiem ? 0 : record.DiemTuCham ?? 0}
                            </span>
                        if (!record.DiemThuong && record.DiemTru)
                            return <span className='diemTruRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemTuCham ?? 0) != 0 && Math.abs(record.DiemTuCham ?? 0) != record.ThangDiem ? 0 : record.DiemTuCham ?? 0}
                            </span>
                        return <span className='defaultRow'> {record.DiemTuCham ?? 0} </span>
                    },
                },

            ]
            if (danhGiaContext.thongTinPhieuChamDiem?.diemNhanXet) {
                baseColumns.push({
                    title: <div className="text-center"><b>Điểm lãnh đạo trực tiếp chấm</b></div>,
                    dataIndex: 'DiemNhanXet',
                    key: 'DiemNhanXet',
                    align: 'center',
                    width: '5%',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.DiemLiet) {
                            if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
                            return <Checkbox
                                checked={record.isCheckedNX}
                                disabled={record.JsonDiemLiet && record.JsonDiemLiet.toString().trim() != '[]' ? true : false}
                            />
                        }
                        if (record.DiemThuong && !record.DiemTru)
                            return <span className='diemThuongRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemNhanXet ?? 0) != 0 && Math.abs(record.DiemNhanXet ?? 0) != record.ThangDiem ? 0 : record.DiemNhanXet ?? 0}
                            </span>
                        if (!record.DiemThuong && record.DiemTru)
                            return <span className='diemTruRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemNhanXet ?? 0) != 0 && Math.abs(record.DiemNhanXet ?? 0) != record.ThangDiem ? 0 : record.DiemNhanXet ?? 0}
                            </span>
                        return <span className='defaultRow'> {record.DiemNhanXet ?? 0} </span>
                    },
                },)
            }

            if (danhGiaContext.thongTinPhieuChamDiem?.diemThamMuu) {
                baseColumns.push({
                    title: <div className="text-center"><b>Điểm Phó thủ trưởng đơn vị chấm</b></div>,
                    dataIndex: 'DiemThamMuu',
                    key: 'DiemThamMuu',
                    align: 'center',
                    width: '5%',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.DiemLiet) {
                            if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
                            return <Checkbox
                                checked={record.isCheckedTM}
                                disabled={record.JsonDiemLiet && record.JsonDiemLiet.toString().trim() != '[]' ? true : false}
                            />
                        }
                        if (record.DiemThuong && !record.DiemTru)
                            return <span className='diemThuongRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemThamMuu ?? 0) != 0 && Math.abs(record.DiemThamMuu ?? 0) != record.ThangDiem ? 0 : record.DiemThamMuu ?? 0}
                            </span>
                        if (!record.DiemThuong && record.DiemTru)
                            return <span className='diemTruRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemThamMuu ?? 0) != 0 && Math.abs(record.DiemThamMuu ?? 0) != record.ThangDiem ? 0 : record.DiemThamMuu ?? 0}
                            </span>
                        return <span className='defaultRow'> {record.DiemThamMuu ?? 0} </span>
                    },
                },)
            }
            if (danhGiaContext.thongTinPhieuChamDiem?.diemLanhDaoDanhGia) {
                baseColumns.push({
                    title: <div className="text-center"><b>Điểm Thủ trưởng cơ quan, đơn vị chấm <i style={{ fontWeight: '400', display: danhGiaContext?.trangThaiKhieuNai == 'Đã xử lý' ? '' : 'none' }}>(Trước kiến nghị)</i></b></div>,
                    dataIndex: 'DiemDanhGiaPrev',
                    key: 'DiemDanhGiaPrev',
                    align: 'center',
                    width: '3%',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.DiemLiet) {
                            if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
                            return <Checkbox
                                checked={record.isCheckedDGPrev}
                                disabled={record.JsonDiemLiet && record.JsonDiemLiet.toString().trim() != '[]' ? true : false}
                            />
                        }
                        if (record.DiemThuong && !record.DiemTru)
                            return <span className='diemThuongRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemDanhGiaPrev ?? 0) != 0 && Math.abs(record.DiemDanhGiaPrev ?? 0) != record.ThangDiem ? 0 : record.DiemDanhGiaPrev ?? 0}
                            </span>
                        if (!record.DiemThuong && record.DiemTru)
                            return <span className='diemTruRow'>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemDanhGiaPrev ?? 0) != 0 && Math.abs(record.DiemDanhGiaPrev ?? 0) != record.ThangDiem ? 0 : record.DiemDanhGiaPrev ?? 0}
                            </span>
                        return <span className='defaultRow'> {record.DiemDanhGiaPrev ?? 0} </span>
                    },
                },)
            }
            if (danhGiaContext.thongTinPhieuChamDiem?.diemLanhDaoDanhGia && danhGiaContext?.trangThaiKhieuNai == 'Đã xử lý') {
                baseColumns.push({
                    title: <div className="text-center"><b>Điểm Thủ trưởng cơ quan, đơn vị chấm <i style={{ fontWeight: '400' }}>(Sau kiến nghị)</i></b></div>,
                    dataIndex: 'DiemDanhGia',
                    key: 'DiemDanhGia',
                    align: 'center',
                    width: '3%',
                    render: (text: string, record: IDanhGiaColumn) => {

                        if (record.DiemLiet) {
                            if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
                            return <Checkbox
                                className={record.isXuLyKhieuNai == true ? `isXuLyKhieuNai` : ''}
                                checked={record.isCheckedDG}
                                disabled={record.JsonDiemLiet && record.JsonDiemLiet.toString().trim() != '[]' ? true : false}
                            />
                        }
                        if (record.DiemThuong && !record.DiemTru)
                            return <span className={record.isXuLyKhieuNai == true ? `isXuLyKhieuNai diemThuongRow` : 'diemThuongRow'}>
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemDanhGia ?? 0) != 0 && Math.abs(record.DiemDanhGia ?? 0) != record.ThangDiem ? 0 : record.DiemDanhGia ?? 0}
                            </span>
                        if (!record.DiemThuong && record.DiemTru)
                            return <span className={record.isXuLyKhieuNai == true ? `isXuLyKhieuNai diemTruRow` : 'diemTruRow'} >
                                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemDanhGia ?? 0) != 0 && Math.abs(record.DiemDanhGia ?? 0) != record.ThangDiem ? 0 : record.DiemDanhGia ?? 0}
                            </span>
                        return <span className={record.isXuLyKhieuNai == true ? `isXuLyKhieuNai defaultRow` : 'defaultRow'}> {record.DiemDanhGia ?? 0} </span>
                    },
                },)
            }

            baseColumns.push({
                title: <p style={{ textAlign: 'center' }}>Nội dung kiến nghị đánh giá<br /><i style={{ fontWeight: 400 }}> (Nếu có)</i></p>,
                key: "dinhKemKhieuNai",
                render: (_, record, idx) => {
                    if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
                        return null
                    return <>
                        {(record.ThangDiem != 0 && (record.DiemThuong || record.DiemTru) && !((record.DiemThuong && record.DiemTru) || (!record.DiemThuong && !record.DiemTru))) || (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length <= 0)
                            ?
                            !record.isKhieuNai || (!record.NoiDungKhieuNai && buttonActionContext.readOnlyKhieuNaiModalVisible)
                                ?
                                <div style={{
                                    display: !buttonActionContext.readOnlyKhieuNaiModalVisible &&
                                        (
                                            (record.DiemTuCham != record.DiemDanhGia && !record.DiemLiet && !(record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0)) ||
                                            (((record.DiemThuong && !record.DiemTru) || (!record.DiemThuong && record.DiemTru)) && record.DiemTuCham && record.DiemDanhGia && (record.DiemDanhGia == 0 || record.DiemDanhGia == record.ThangDiem) && record.DiemDanhGia != record.DiemTuCham && record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) ||
                                            (record.DiemLiet && (record.isChecked != record.isCheckedDG))
                                        ) ? 'flex' : 'none', width: '100%', justifyContent: 'center'
                                }}>
                                    <div className="addGiaiTrinhBtn" onClick={() => onRowChangeGiaiTrinh(true, record, 'isKhieuNai')}>
                                        <PlusOutlined style={{ marginRight: "5px", fontSize: "14px", color: '#fff' }} />Thêm kiến nghị
                                    </div>
                                </div>
                                :
                                <>
                                    <Input.TextArea style={{ width: '100%', marginBottom: 3, textAlign: 'left' }} rows={2}
                                        placeholder='Nội dung kiến nghị đánh giá...'
                                        onChange={(e) => handleTextChange(e.target.value, record)}
                                        onMouseLeave={(e: React.MouseEvent<HTMLTextAreaElement>) => {
                                            onRowChangeGiaiTrinh((e.target as HTMLTextAreaElement).value, record, 'NoiDungKhieuNai')
                                          }}
                                        onBlur={(e) => {
                                            onRowChangeGiaiTrinh(e.target.value, record, 'NoiDungKhieuNai')
                                        }}
                                        onKeyDown={(e: any) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                onRowChangeGiaiTrinh(e.target.value, record, 'NoiDungKhieuNai')
                                            }
                                        }}
                                        value={textValues[record.MaTieuChi] ?? record.NoiDungKhieuNai}
                                        disabled={buttonActionContext.readOnlyKhieuNaiModalVisible}
                                    />
                                    {record.DinhKemKhieuNai
                                        ?
                                        <>
                                            <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={buttonActionContext.loading} type="link" title={getFileName(record.DinhKemKhieuNai || '')} onClick={() => onViewFile(record.DinhKemKhieuNai || '')}>
                                                <p style={{ fontSize: '0.8rem' }}> {getFileNameWithFixedLength(record.DinhKemKhieuNai || '')}</p>

                                            </AntdButton>
                                            <Popconfirm
                                                title='Xoá?'
                                                onConfirm={() => {
                                                    onRowChangeGiaiTrinh(undefined, record, 'DinhKemKhieuNai')
                                                }}
                                                okText='Xoá'
                                                cancelText='Huỷ'
                                            >
                                                <DeleteOutlined style={{ color: "tomato" }} hidden={buttonActionContext.readOnlyKhieuNaiModalVisible} />
                                            </Popconfirm>
                                            <br /></>
                                        : <p><br /></p>
                                    }
                                    {buttonActionContext.readOnlyKhieuNaiModalVisible ? null :

                                        <Upload
                                            name='Files'
                                            action={HOST_PATH_FILE + API_VERSION + UPLOADFILE_ENDPOINT} headers={{
                                                Authorization: `Bearer ${getToken()}`
                                            }}
                                            data={{ FolderName: "GiaiTrinh" }}
                                            showUploadList={false}
                                            maxCount={1}
                                            onChange={(info) => {
                                                if (info.file.status == "done") {
                                                    onRowChangeGiaiTrinh(info.file.response.data, record, 'DinhKemKhieuNai')
                                                }
                                            }}>
                                            <AntdButton icon={<UploadOutlined />}
                                                style={{ border: '1px solid #999' }}
                                            >
                                                Chọn tệp
                                            </AntdButton>
                                        </Upload>
                                    }

                                </>
                            : null
                        }
                    </>
                }
            },
            )

            if (danhGiaContext?.trangThaiKhieuNai != 'Đã xử lý' ? console.log(danhGiaContext.trangThaiKhieuNai) : baseColumns.push({
                title: <p style={{ textAlign: 'center' }}>Nội dung xử lý kiến nghị đánh giá<br /><i style={{ fontWeight: 400 }}> (Nếu có)</i></p>,
                key: "dinhKemXuLYKhieuNai",
                render: (_, record, idx) => {
                    if (record.NoiDungXuLyKhieuNai) {
                        return (<>
                            <Input.TextArea style={{ width: '100%', marginBottom: 3, textAlign: 'left' }} rows={2}
                                placeholder='Nhập nội dung xử lý kiến nghị đánh giá...'
                                value={record.NoiDungXuLyKhieuNai}
                                disabled
                            />
                            {record.DinhKemXuLyKhieuNai
                                ?
                                <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={buttonActionContext.loading} type="link" title={getFileName(record.DinhKemXuLyKhieuNai || '')} onClick={() => onViewFile(record.DinhKemXuLyKhieuNai || '')}>
                                    <p style={{ fontSize: '0.8rem' }}> {getFileNameWithFixedLength(record.DinhKemXuLyKhieuNai || '')}</p>

                                </AntdButton>
                                : <p><br /></p>
                            }
                        </>)
                    } else return null
                }
            },
            )
            )

                baseColumns.push({
                    title: <div className="text-center"><b>Lịch sử đánh giá</b></div>,
                    dataIndex: 'VetGiaiTrinh',
                    key: 'VetGiaiTrinh',
                    align: 'center',
                    width: '2%',
                    render: (text: string, record: IDanhGiaColumn) => {
                        if (record.NoiDungGiaiTrinh || record.NoiDungGiaiTrinhNX || record.NoiDungGiaiTrinhTM || record.NoiDungGiaiTrinhDG)
                            return (
                                <>
                                    <span className='VetGiaiTrinh' title='Lịch sử đánh giá' style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            buttonActionContext.setTieuChiId(record.MaTieuChi)
                                            buttonActionContext.setLichSuDanhGiaModalVisible(true)
                                        }}
                                    >
                                        <UnorderedListOutlined />
                                    </span>
                                </>
                            )
                    }
                })

            return baseColumns
        },
        [onRowChangeGiaiTrinh, expandedRowKeys, onExpand, dataSource]
    );

    return columns;
};
