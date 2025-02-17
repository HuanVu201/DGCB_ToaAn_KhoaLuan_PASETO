import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { Form, Input, Space, Row, Col, Checkbox } from "antd"
import { FormInstance } from "antd/lib";
import { useEffect, useState } from "react";
import { comboMonths, loaiThoiGians, months, quarters } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { IDanhGia } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useThamMuuDanhGiaDonViPhongBanContext } from "../../../contexts/useThamMuuDanhGiaDonViPhongBanContext";

function HeaderThamMuuDanhGiaDonViPhongBanDetailModal({ form, diemDanhGiaTotal }: {
    form: FormInstance<IDanhGia>, diemDanhGiaTotal: number
}) {
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useThamMuuDanhGiaDonViPhongBanContext()
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()
    const dinhKem = Form.useWatch('fileDinhKemTM', form)

    useEffect(() => {
        form.setFieldValue('diemThamMuu', diemDanhGiaTotal)
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
                <Col span={24} >
                    <Form.Item
                        label="Cơ quan, tổ chức, đơn vị"
                        name="tenDonVi"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea rows={1} style={{ width: '100%' }} disabled />
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
                        label="Điểm đơn vị, bộ phận tham mưu"
                        name="diemThamMuu"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled value={diemDanhGiaTotal} />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label={(<b style={{ fontWeight: 500 }}>Xếp loại đánh giá<span style={{ color: 'red' }}>(*)</span></b>)}
                        name="phanLoaiThamMuu"
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
                        label="Ý kiến đơn vị, bộ phận tham mưu"
                        name="yKienThamMuu"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={24} >
                    <Form.Item
                        label="Tài liệu kèm theo"
                        name="fileDinhKemTM"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RegularUpload
                            form={form}
                            fieldName="fileDinhKemTM"
                            folderName={`DinhKemThamMuu`}
                            dinhKem={dinhKem}
                            maxCount={1}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </>);
}

export default HeaderThamMuuDanhGiaDonViPhongBanDetailModal;