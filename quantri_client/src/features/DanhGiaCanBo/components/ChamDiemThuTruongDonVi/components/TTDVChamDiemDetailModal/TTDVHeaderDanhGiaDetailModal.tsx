import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { Form, Input, Space, Row, Col, Checkbox } from "antd"
import { FormInstance } from "antd/lib";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { danhMuc_BoTieuChuanApi } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/services";
import { toast } from "react-toastify";
import { danhMuc_PhieuDanhGiaApi } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/services";
import { FORMAT_DATE, YEAR } from "@/data";
import { comboMonths, loaiThoiGians, months, quarters } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { IDanhGia } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useTTDVChamDiemContext } from "../../contexts/useTTDVChamDiemContext";

function HeaederTTDVChamDiemDetailModal({ form, diemTuDanhGiaTotal, diemLanhDaoDanhGiaTotal }: {
    form: FormInstance<IDanhGia>, diemTuDanhGiaTotal: number, diemLanhDaoDanhGiaTotal: number
}) {
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useTTDVChamDiemContext()
    const { parseToken } = useAppSelector((state) => state.auth);
    const dinhKem = Form.useWatch('fileDinhKemDG', form)
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()
    const [namDanhGia, setNamDanhGia] = useState<string>()
    const [kyDanhGia, setKyDanhGia] = useState<string>()

    useEffect(() => {
        form.setFieldValue('diemTuDanhGia', diemTuDanhGiaTotal)
    }, [diemTuDanhGiaTotal])

    useEffect(() => {
        form.setFieldValue('diemLanhDaoDanhGia', diemLanhDaoDanhGiaTotal)
    }, [diemLanhDaoDanhGiaTotal])

    useEffect(() => {
        if (buttonActionContext.thuTruongDonViChamDiemModalVisible && danhGiaContext.userDanhGia) {
            form.setFieldsValue({
                ...danhGiaContext.userDanhGia as any,
                hoVaTen: danhGiaContext.userDanhGia.fullName,
                chucVu: danhGiaContext.userDanhGia.chucVu?.ten,
                tenDonVi: danhGiaContext.userDanhGia.officeName
            })
            danhGiaContext.setKiemNhiem(danhGiaContext.userDanhGia.kiemNhiem || false)
        }
    }, [buttonActionContext.thuTruongDonViChamDiemModalVisible, danhGiaContext.userDanhGia])

    useEffect(() => {
        if (!loaiThoiGian) {
            setLoaiThoiGian('Năm')
            form.setFieldValue('loaiThoiGian', 'Năm')
            form.setFieldValue('namDanhGia', YEAR)
            setNamDanhGia(YEAR.toString())
        }
    }, [buttonActionContext.thuTruongDonViChamDiemModalVisible])

    useEffect(() => {
        if (buttonActionContext.thuTruongDonViChamDiemModalVisible == false) {
            setLoaiThoiGian(undefined)
            setNamDanhGia(undefined)
            setKyDanhGia(undefined)
            form.setFieldValue('loaiThoiGian', undefined)
            form.resetFields()
        }
    }, [buttonActionContext.thuTruongDonViChamDiemModalVisible])

    useEffect(() => {
        (async () => {
            if (loaiThoiGian) {
                const now = new Date()
                let valueThoiGian = ''
                const currentMonth = now.getMonth() + 1;

                if (loaiThoiGian.toLocaleLowerCase() === 'năm') {
                    form.setFieldValue('thoiGian', undefined)
                }
                if (loaiThoiGian.toLocaleLowerCase() === 'tháng') {
                    valueThoiGian = currentMonth.toString().padStart(2, '0')
                }
                if (loaiThoiGian.toLocaleLowerCase() == 'quý') {
                    const currentQuarter = Math.ceil(currentMonth / 3)
                    valueThoiGian = currentQuarter.toString().padStart(3, '0')
                }
                if (loaiThoiGian.toLocaleLowerCase() === '6 tháng') {
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
            if (namDanhGia) {
                buttonActionContext.setLoading(true)
                try {
                    const res: any = await danhMuc_BoTieuChuanApi.GetBoTieuChuans({
                        loaiThoiGian: loaiThoiGian,
                        thoiGianQuery: `${namDanhGia}${kyDanhGia || ''}`,
                        truongDonVi: true
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
    }, [kyDanhGia, namDanhGia, loaiThoiGian])

    return (<>
        <Form name='MauPhoiSearch' layout="horizontal" form={form}>
            <Row gutter={[0, 12]}>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Họ tên"
                        name="hoVaTen"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Chức vụ"
                        name="chucVu"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Thuộc đơn vị"
                        name="tenDonVi"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
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
                            disabled={buttonActionContext.danhGiaId || diemTuDanhGiaTotal > 0 || diemLanhDaoDanhGiaTotal > 0 ? true : false}
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
                        <Input style={{ width: '100%' }} disabled={buttonActionContext.danhGiaId || diemTuDanhGiaTotal > 0 || diemLanhDaoDanhGiaTotal > 0 ? true : false}
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
                        label="Loại thời gian"
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
                            disabled={buttonActionContext.danhGiaId || diemTuDanhGiaTotal > 0 || diemLanhDaoDanhGiaTotal > 0 ? true : false}
                        />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Kỳ đánh giá"
                        name="thoiGian"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                        hidden={loaiThoiGian?.toLowerCase() == 'năm'}
                    >
                        <AntdSelect
                            virtual={true}
                            generateOptions={{
                                model: loaiThoiGian?.toLowerCase() == 'tháng' ? months : loaiThoiGian?.toLowerCase() == 'quý' ? quarters : loaiThoiGian?.toLowerCase() == '6 tháng' ? comboMonths : [],
                                label: "label",
                                value: "value",
                            }}
                            style={{ width: '100%' }}
                            value={danhGiaContext.thongTinPhieuChamDiem?.thoiGian}
                        />
                    </Form.Item>
                </Col>

                <Col sm={8} span={24} >
                    <Form.Item
                        label="Điểm tự chấm"
                        name="diemTuDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label={(<b style={{ fontWeight: 500 }}>Công chức tự xếp loại<span style={{ color: 'red' }}>(*)</span></b>)}
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
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={8} />

                <Col sm={8} span={24} >
                    <Form.Item
                        label="Điểm đánh giá"
                        name="diemLanhDaoDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label={(<b style={{ fontWeight: 500 }}>Lãnh đạo tự xếp loại<span style={{ color: 'red' }}>(*)</span></b>)}
                        name="phanLoaiLanhDaoDanhGia"
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
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={24} >
                    <Form.Item
                        label="Ý kiến cấp ủy, tập thể"
                        name="yKienLanhDao"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={24} >
                    <Form.Item
                        label="Tài liệu kèm theo"
                        name="fileDinhKemDG"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RegularUpload
                            form={form}
                            fieldName="fileDinhKemDG"
                            folderName={`DinhKemLanhDaoDanhGia`}
                            dinhKem={dinhKem}
                            maxCount={1}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </>);
}

export default HeaederTTDVChamDiemDetailModal;