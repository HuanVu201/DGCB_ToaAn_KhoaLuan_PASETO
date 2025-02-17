import { AntdSelect } from "@/lib/antd/components";
import { Form, Input, Row, Col, Checkbox } from "antd"
import { FormInstance } from "antd/lib";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { comboMonths, loaiThoiGians, months, quarters } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { IDanhGia } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { useCapNhatDanhGiaDonViPhongBanContext } from "../../contexts/useCapNhatDanhGiaDonViPhongBanContext";


function HeaderCapNhatDanhGiaDonViPhongBanDetailModal({ form, diemDanhGiaTotal }: {
    form: FormInstance<IDanhGia>, diemDanhGiaTotal: number
}) {
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useCapNhatDanhGiaDonViPhongBanContext()
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()

    useEffect(() => {
        form.setFieldValue('diemTuDanhGia', diemDanhGiaTotal)
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
                {/* <Col span={24} >
                    <Form.Item
                        label="Cơ quan, tổ chức, đơn vị"
                        name="tenDonVi"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} disabled rows={1} />
                    </Form.Item>
                </Col> */}

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
                            // defaultValue={""}
                            value={danhGiaContext.thongTinPhieuChamDiem?.loaiDanhGia}
                            disabled
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
                            disabled
                            value={danhGiaContext.thongTinPhieuChamDiem?.thoiGian}
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
                        label={(<b style={{ fontWeight: 500 }}>Công chức tự xếp loại <span style={{ color: 'red' }}>(*)</span></b>)}
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
                        <Input.TextArea style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </>);
}

export default HeaderCapNhatDanhGiaDonViPhongBanDetailModal;