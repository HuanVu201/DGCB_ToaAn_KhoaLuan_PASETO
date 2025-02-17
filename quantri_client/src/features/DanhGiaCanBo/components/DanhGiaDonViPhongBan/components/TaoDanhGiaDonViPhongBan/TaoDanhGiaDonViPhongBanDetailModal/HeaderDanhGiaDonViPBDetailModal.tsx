import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { Form, Input, Space, Row, Col, Checkbox } from "antd"
import { FormInstance } from "antd/lib";
import { useEffect, useState } from "react";
import { danhMuc_BoTieuChuanApi } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/services";
import { toast } from "react-toastify";
import { FORMAT_DATE, YEAR } from "@/data";
import { comboMonths, loaiThoiGians, months, quarters } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { IBuocHienTaiRes, IDanhGia } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";

import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { useTaoDanhGiaDonViPhongBanContext } from "../../../contexts/useTaoDanhGiaDonViPhongBanContext";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppSelector } from "@/lib/redux/Hooks";

function HeaderDanhGiaDonViPhongBanDetailModal({ form, diemDanhGiaTotal, currNode }: {
    form: FormInstance<IDanhGia>, diemDanhGiaTotal: number, currNode?: IBuocHienTaiRes
}) {
    const buttonActionContext = useButtonActionContext()
    const { parseToken } = useAppSelector(state => state.auth)
    const danhGiaContext = useTaoDanhGiaDonViPhongBanContext()
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()
    const [namDanhGia, setNamDanhGia] = useState<string>()
    const [kyDanhGia, setKyDanhGia] = useState<string>()

    useEffect(() => {
        form.setFieldValue('diemTuDanhGia', diemDanhGiaTotal)
    }, [diemDanhGiaTotal])

    useEffect(() => {
        if (buttonActionContext.danhGiaDonViPhongBanModalVisible && danhGiaContext.userDanhGia) {
            form.setFieldsValue({ ...danhGiaContext.userDanhGia as any })
            danhGiaContext.setKiemNhiem(danhGiaContext.userDanhGia.kiemNhiem || false)
        }
    }, [buttonActionContext.danhGiaDonViPhongBanModalVisible, danhGiaContext.userDanhGia])

    useEffect(() => {
        if (!loaiThoiGian) {
            setLoaiThoiGian('Năm')
            form.setFieldValue('loaiThoiGian', 'Năm')
            form.setFieldValue('namDanhGia', YEAR)
            setNamDanhGia(YEAR.toString())
        }
    }, [buttonActionContext.danhGiaDonViPhongBanModalVisible])

    useEffect(() => {
        if (buttonActionContext.danhGiaDonViPhongBanModalVisible == false) {
            setLoaiThoiGian(undefined)
            setNamDanhGia(undefined)
            setKyDanhGia(undefined)
            form.setFieldValue('loaiThoiGian', undefined)
            form.resetFields()
        }
    }, [buttonActionContext.danhGiaDonViPhongBanModalVisible])

    useEffect(() => {
        (async () => {
            if (loaiThoiGian) {
                const now = new Date()
                let valueThoiGian = ''
                const currentMonth = now.getMonth() + 1;

                if (loaiThoiGian.toLowerCase() === 'năm') {
                    form.setFieldValue('thoiGian', undefined)
                }
                if (loaiThoiGian.toLowerCase() === 'tháng') {
                    valueThoiGian = currentMonth.toString().padStart(2, '0')
                }
                if (loaiThoiGian.toLowerCase() == 'quý') {
                    const currentQuarter = Math.ceil(currentMonth / 3)
                    valueThoiGian = currentQuarter.toString().padStart(3, '0')
                }
                if (loaiThoiGian.toLowerCase() === '6 tháng') {
                    const currentRange = Math.ceil(currentMonth / 6)
                    valueThoiGian = currentRange.toString().padStart(4, '0')
                }
                if (valueThoiGian) {
                    form.setFieldValue('thoiGian', valueThoiGian)
                    setKyDanhGia(valueThoiGian.toString() || '')
                }

            }
        })()
    }, [loaiThoiGian])

    useEffect(() => {
        (async () => {
            if (namDanhGia && currNode) {
                buttonActionContext.setLoading(true)
                if (loaiThoiGian?.toLowerCase() != 'năm' && !kyDanhGia) {
                    return
                }

                try {
                    const res: any = await danhMuc_BoTieuChuanApi.GetBoTieuChuans({
                        loaiThoiGian: loaiThoiGian,
                        thoiGianQuery: `${namDanhGia}${kyDanhGia || ''}`,
                        typeCheck: 'DanhGiaDonVis',
                        maDonVi: parseToken?.officeCode,
                        maPhongBan: parseToken?.groupCode,

                    })

                    if (res.data.succeeded) {
                        danhGiaContext.setBoTieuChuans(res.data.data.data as any)
                        form.setFieldValue('boTieuChuan', res.data.data.data[0].maBoTieuChi)
                        danhGiaContext.setBoTieuChuanId(res.data.data.data[0].maBoTieuChi)
                    } else if (!buttonActionContext.danhGiaId) {
                        toast.warning(res.data.message)
                        danhGiaContext.setBoTieuChuans([])
                        danhGiaContext.setPhuLucDatas(undefined)
                        form.setFieldValue('boTieuChuan', undefined)
                        danhGiaContext.setBoTieuChuanId(undefined)
                        buttonActionContext.setLoading(false)
                    }
                } catch (e) {
                    console.log(e)
                    toast.error('Không có thông tin Bộ tiêu chuẩn')
                    danhGiaContext.setPhuLucDatas(undefined)
                    danhGiaContext.setBoTieuChuans([])
                    form.setFieldValue('boTieuChuan', undefined)
                    danhGiaContext.setBoTieuChuanId(undefined)
                    buttonActionContext.setLoading(false)
                }
                buttonActionContext.setLoading(false)
            }
        })()
    }, [kyDanhGia, namDanhGia, currNode, loaiThoiGian])


    return (<>
        <Form name='MauPhoiSearch' layout="horizontal" form={form}>
            <Row gutter={[0, 12]}>
                <Col span={24} >
                    <Form.Item
                        label="Thuộc bộ tiêu chuẩn"
                        name="boTieuChuan"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <AntdSelect
                            virtual={true}
                            generateOptions={{
                                model: danhGiaContext.boTieuChuans,
                                label: "tenBoTieuChi",
                                value: "maBoTieuChi",
                            }}
                            style={{ width: '100%' }}
                            value={danhGiaContext.boTieuChuanId ? danhGiaContext.boTieuChuanId : null}
                            disabled={buttonActionContext.danhGiaId || diemDanhGiaTotal > 0 ? true : false}
                            onChange={(e) => danhGiaContext.setBoTieuChuanId(e)}
                        />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Năm đánh giá"
                        name="namDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled={buttonActionContext.danhGiaId ? true : false}
                            onBlur={(e) => setNamDanhGia(e.target.value)}
                            onKeyDown={(e: any) => {
                                if (e.key === 'Enter')
                                    setNamDanhGia(e.target.value)
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Loại thời gian đánh giá"
                        name="loaiThoiGian"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <AntdSelect
                            generateOptions={{
                                model: loaiThoiGians,
                                value: "value",
                                label: "label",
                            }}
                            value={loaiThoiGian}
                            onChange={(value) => setLoaiThoiGian(value)}
                            disabled={buttonActionContext.danhGiaId || diemDanhGiaTotal > 0 ? true : false}
                            lowerCaseStringValue={false}
                        />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        hidden={loaiThoiGian?.toLowerCase() == 'năm'}
                        label="Kỳ đánh giá"
                        name="thoiGian"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <AntdSelect
                            virtual={true}
                            generateOptions={{
                                model: loaiThoiGian?.toLowerCase() == 'tháng' ? months : loaiThoiGian?.toLowerCase() == 'quý' ? quarters : loaiThoiGian?.toLowerCase() == '6 tháng' ? comboMonths : [],
                                label: "label",
                                value: "value",
                            }}
                            style={{ width: '100%' }}
                            disabled={buttonActionContext.danhGiaId ? true : false}
                            onChange={(e) => setKyDanhGia(e)}
                        />
                    </Form.Item>
                </Col>

                <Col sm={8} span={24} >
                    <Form.Item
                        label="Điểm tự đánh giá"
                        name="diemTuDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled value={diemDanhGiaTotal} />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label={(<b style={{ fontWeight: 500 }}>Đơn vị tự xếp loại <span style={{ color: 'red' }}>(*)</span></b>)}
                        name="phanLoaiTuDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <AntdSelect
                            generateOptions={{
                                model: danhGiaContext.phanLoaiDanhGiaArr,
                                label: "Ten",
                                value: "Ten",
                            }}
                            style={{ width: '100%' }}
                            lowerCaseStringValue={false}
                            disabled={danhGiaContext.disableDanhGia}
                        />
                    </Form.Item>
                </Col>
                <Col span={24} >
                    <Form.Item
                        label="Ý kiến tự đánh giá"
                        name="yKienTuDanhGia"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }}
                            disabled={danhGiaContext.disableDanhGia}
                        />
                    </Form.Item>
                </Col>
                {/* <Col span={24} >
                    <Form.Item
                        label="Tài liệu kèm theo"
                        name="fileDinhKem"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RegularUpload
                            form={form}
                            fieldName="fileDinhKem"
                            folderName={`DinhKemDanhGiaDonVi`}
                            dinhKem={fileDinhKem}
                            maxCount={1}
                        />
                    </Form.Item>
                </Col> */}
            </Row>
        </Form>
    </>);
}

export default HeaderDanhGiaDonViPhongBanDetailModal;