import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { Form, Input, Space, Row, Col, Checkbox, Collapse } from "antd"
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
import { useReadonlyDanhGiaDonViPhongBanContext } from "../../contexts/useReadonlyDanhGiaDonViPhongBanContext";

function HeaderReadOnlyDanhGiaDonViPhongBanDetailModal({ form, diemDanhGiaTotal }: {
    form: FormInstance<IDanhGia>, diemDanhGiaTotal: number
}) {
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useReadonlyDanhGiaDonViPhongBanContext()
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()
    const dinhKemNX = Form.useWatch('fileDinhKemNX', form)
    const dinhKemTM = Form.useWatch('fileDinhKemTM', form)
    const dinhKemDG = Form.useWatch('fileDinhKemDG', form)

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
            <Row gutter={[4, 12]}>
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
                        label="Người tham mưu chấm điểm"
                        name="nguoiThamMuu"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                        hidden={danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.nguoiThamMuu ? false : true}

                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Người đánh giá, xếp loại"
                        name="nguoiDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                        hidden={danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.nguoiDanhGia ? false : true}

                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col span={8} />

                <Col sm={8} span={24} >
                    <Form.Item
                        label="Điểm đơn vị tự đánh giá"
                        name="diemTuDanhGia"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Xếp loại"
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
                <Col sm={8} span={24} >
                    <Form.Item
                        label="Trạng thái"
                        name="trangThai"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>
                <Col sm={24} span={24} >
                    <Form.Item
                        label="Ý kiến tự chấm điểm"
                        name="yKienTuDanhGia"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Input.TextArea style={{ width: '100%' }} disabled />
                    </Form.Item>
                </Col>

                {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.diemThamMuu
                    ? <Col span={24} style={{ display: 'flex' }}>
                        <Collapse size="small" style={{ width: '100%' }}
                            items={[{
                                key: 'thamMuu', label: 'Đơn vị, bộ phận tham mưu', children:
                                    <Row gutter={[0, 0]}>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Điểm chấm diểm"
                                                name="diemThamMuu"
                                                labelCol={{ span: 12 }}
                                                wrapperCol={{ span: 12 }}
                                            >
                                                <Input style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Xếp loại"
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
                                                    style={{ width: '100%' }} lowerCaseStringValue={false} disabled
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} >
                                            <Form.Item
                                                label="Ý kiến tham mưu"
                                                name="yKienThamMuu"
                                                labelCol={{ span: 4 }}
                                                wrapperCol={{ span: 20 }}
                                            >
                                                <Input.TextArea style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        {danhGiaContext.thongTinPhieuChamDiem.fileDinhKemTM
                                            ? <Col span={24} >
                                                <Form.Item
                                                    label="Tài liệu kèm theo"
                                                    name="fileDinhKemTM"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                >
                                                    <RegularUpload
                                                        form={form}
                                                        fieldName="fileDinhKemTM"
                                                        folderName={``}
                                                        dinhKem={dinhKemTM}
                                                        hideUpload
                                                    />
                                                </Form.Item>
                                            </Col> : null}
                                    </Row>
                            }]}
                        />

                    </Col> : null
                }

                {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.diemLanhDaoDanhGia
                    ? <Col span={24} style={{ display: 'flex' }}>
                        <Collapse size="small" style={{ width: '100%' }}
                            items={[{
                                key: 'LanhDaoDanhGia', label: 'Đánh giá, xếp loại', children:
                                    <Row gutter={[0, 0]}>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Điểm chấm diểm"
                                                name="diemLanhDaoDanhGia"
                                                labelCol={{ span: 12 }}
                                                wrapperCol={{ span: 12 }}
                                            >
                                                <Input style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Xếp loại"
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
                                                    style={{ width: '100%' }} lowerCaseStringValue={false} disabled
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} >
                                            <Form.Item
                                                label="Ý kiến đánh giá, xếp loại"
                                                name="yKienLanhDao"
                                                labelCol={{ span: 4 }}
                                                wrapperCol={{ span: 20 }}
                                            >
                                                <Input.TextArea style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        {danhGiaContext.thongTinPhieuChamDiem.fileDinhKemDG
                                            ? <Col span={24} >
                                                <Form.Item
                                                    label="Tài liệu kèm theo"
                                                    name="fileDinhKemDG"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                >
                                                    <RegularUpload
                                                        form={form}
                                                        fieldName="fileDinhKemDG"
                                                        folderName={``}
                                                        dinhKem={dinhKemDG}
                                                        hideUpload
                                                    />
                                                </Form.Item>
                                            </Col> : null}
                                    </Row>
                            }]}
                        />

                    </Col> : null
                }


            </Row>
        </Form>
    </>);
}

export default HeaderReadOnlyDanhGiaDonViPhongBanDetailModal;