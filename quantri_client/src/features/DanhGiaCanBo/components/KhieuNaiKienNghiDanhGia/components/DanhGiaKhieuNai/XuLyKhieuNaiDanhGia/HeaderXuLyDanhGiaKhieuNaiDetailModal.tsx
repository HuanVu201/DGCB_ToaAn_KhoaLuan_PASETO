import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { Form, Input, Space, Row, Col, Checkbox, Divider } from "antd"
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
import { useKhieuNaiDanhGiaContext } from "../../../contexts/useKhieuNaiKienNghiContext";

function HeaderXuLyDanhGiaKhieuNaiDetailModal({ form, diemDanhGiaTotal }: {
    form: FormInstance<IDanhGia>, diemDanhGiaTotal: number
}) {
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useKhieuNaiDanhGiaContext()
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()
    const dinhKem = Form.useWatch('fileDinhKemDG', form)
    const dinhKemKhieuNai = Form.useWatch('dinhKemKhieuNai', form)
    const dinhKemKetQua = Form.useWatch('dinhKemKetQua', form)

    useEffect(() => {
        form.setFieldValue('diemLanhDaoDanhGia', diemDanhGiaTotal)
    }, [diemDanhGiaTotal])

    useEffect(() => {
        if (danhGiaContext.thongTinPhieuChamDiem) {
            danhGiaContext.setKiemNhiem(danhGiaContext.thongTinPhieuChamDiem.kiemNhiem || false)
        }
    }, [danhGiaContext.thongTinPhieuChamDiem])

    useEffect(() => {
        if (buttonActionContext.danhGiaModalVisible == false) {
            setLoaiThoiGian(undefined)
            form.setFieldValue('loaiThoiGian', undefined)
        }
    }, [buttonActionContext.danhGiaModalVisible])

    useEffect(() => {
        if (danhGiaContext.thongTinPhieuChamDiem?.loaiThoiGian)
            setLoaiThoiGian(danhGiaContext.thongTinPhieuChamDiem?.loaiThoiGian)

    }, [danhGiaContext.thongTinPhieuChamDiem])




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
                        <Input.TextArea rows={1} style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Chức vụ"
                        name="chucVu"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input.TextArea rows={1} style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Thuộc đơn vị"
                        name="tenDonVi"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input.TextArea rows={1} style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col span={24} >
                    <Form.Item
                        label="Thuộc bộ tiêu chuẩn"
                        name="tenBoTieuChuan"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Năm đánh giá"
                        name="namDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
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
                            value={danhGiaContext.thongTinPhieuChamDiem?.loaiDanhGia}
                            disabled
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
                            disabled
                            value={danhGiaContext.thongTinPhieuChamDiem?.thoiGian}
                        />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Điểm Thủ trưởng cơ quan, đơn vị chấm"
                        name="diemLanhDaoDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled value={diemDanhGiaTotal} />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label={(<b style={{ fontWeight: 500 }}>Lãnh đạo xếp loại<span style={{ color: 'red' }}>(*)</span></b>)}
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
                        label="Ý kiến Thủ trưởng cơ quan, đơn vị"
                        name="yKienLanhDao"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.fileDinhKemDG
                    ?
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
                                hideUpload
                            />
                        </Form.Item>
                    </Col> : null
                }

                <Divider variant="dashed" style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left" >Nội dung kiến nghị đánh giá</Divider>
                <Col span={24} >
                    <Form.Item
                        label="Nội dung kiến nghị"
                        name="lyDo"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} placeholder="Nội dung kiến nghị..."
                            disabled={true}
                        />
                    </Form.Item>
                </Col>

                <Col span={24} >
                    <Form.Item
                        label="Tài liệu kèm theo"
                        name="dinhKemKhieuNai"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RegularUpload
                            form={form}
                            fieldName="dinhKemKhieuNai"
                            folderName={`KhieuNaiDanhGia`}
                            dinhKem={dinhKemKhieuNai}
                            hideUpload={true}
                        />
                    </Form.Item>
                </Col>
                <Divider variant="dashed" style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left">Kết quả giải quyết kiến nghị đánh giá</Divider>

                <Col span={24} >
                    <Form.Item
                        label="Nội dung kết quả giải quyết kiến nghị"
                        name="ketQua"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} placeholder="Nhập nội dung giải quyết kiến nghị đánh giá..." />
                    </Form.Item>
                </Col>

                <Col span={24} >
                    <Form.Item
                        label="Kết quả đính kèm"
                        name="dinhKemKetQua"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RegularUpload
                            form={form}
                            fieldName="dinhKemKetQua"
                            folderName={`KhieuNaiDanhGia`}
                            dinhKem={dinhKemKetQua}
                        />
                    </Form.Item>
                </Col>

            </Row>
        </Form>
    </>);
}

export default HeaderXuLyDanhGiaKhieuNaiDetailModal;