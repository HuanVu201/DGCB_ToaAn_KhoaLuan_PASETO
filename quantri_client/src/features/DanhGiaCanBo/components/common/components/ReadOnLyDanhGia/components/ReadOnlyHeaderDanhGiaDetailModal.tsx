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
import { useReadOnlyDanhGiaContext } from "../contexts/useReadOnlyDanhGiaContext";

function HeaederReadOnlyDanhGiaDetailModal({ form, diemDanhGiaTotal }: {
    form: FormInstance<IDanhGia>, diemDanhGiaTotal: number
}) {
    const buttonActionContext = useButtonActionContext()
    const danhGiaContext = useReadOnlyDanhGiaContext()
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
                        <Input.TextArea wrap="wrap" rows={1} style={{ width: '100%' }} disabled />
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
                <Col span={24}>
                    <Row gutter={[0, 0]}>
                        {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.nguoiNhanXet
                            ?
                            <Col sm={8} span={24} >
                                <Form.Item
                                    label="Lãnh đạo trực tiếp chấm"
                                    name="nguoiNhanXet"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}

                                >
                                    <Input style={{ width: '100%' }} disabled />
                                </Form.Item>
                            </Col> : null
                        }
                        {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.nguoiThamMuu
                            ?
                            <Col sm={8} span={24} >
                                <Form.Item
                                    label="Phó thủ trưởng đơn vị"
                                    name="nguoiThamMuu"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}

                                >
                                    <Input style={{ width: '100%' }} disabled />
                                </Form.Item>
                            </Col> : null
                        }
                        {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.nguoiDanhGia
                            ?
                            <Col sm={8} span={24} >
                                <Form.Item
                                    label="Thủ trưởng đơn vị"
                                    name="nguoiDanhGia"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}

                                >
                                    <Input style={{ width: '100%' }} disabled />
                                </Form.Item>
                            </Col> : null
                        }
                    </Row>
                </Col>

                <Col sm={8} span={24} >
                    <Form.Item
                        label="Điểm tự đánh giá"
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

                {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.diemNhanXet
                    ? <Col span={24} style={{ display: 'flex' }}>
                        <Collapse size="small" style={{ width: '100%' }}
                            items={[{
                                key: 'lanhDaoNhanXet', label: 'Lãnh đạo trực tiếp chấm điểm', children:
                                    <Row gutter={[0, 0]}>

                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Điểm chấm điểm"
                                                name="diemNhanXet"
                                                labelCol={{ span: 12 }}
                                                wrapperCol={{ span: 12 }}
                                            >
                                                <Input style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Xếp loại"
                                                name="phanLoaiNhanXet"
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
                                                label="Ý kiến lãnh đạo trực tiếp chấm điểm"
                                                name="yKienTuDanhGia"
                                                labelCol={{ span: 4 }}
                                                wrapperCol={{ span: 20 }}
                                            >
                                                <Input.TextArea style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>


                                        {danhGiaContext.thongTinPhieuChamDiem.fileDinhKemNX
                                            ? <Col span={24} >
                                                <Form.Item
                                                    label="Tài liệu kèm theo"
                                                    name="fileDinhKemNX"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                >
                                                    <RegularUpload
                                                        form={form}
                                                        fieldName="fileDinhKemNX"
                                                        folderName={``}
                                                        dinhKem={dinhKemNX}
                                                        hideUpload
                                                    />
                                                </Form.Item>
                                            </Col>
                                            : null}
                                    </Row>
                            }]}
                        />
                    </Col> : null
                }

                {danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.diemThamMuu
                    ? <Col span={24} style={{ display: 'flex' }}>
                        <Collapse size="small" style={{ width: '100%' }}
                            items={[{
                                key: 'thamMuu', label: 'Phó thủ trưởng cơ quan, đơn vị', children:
                                    <Row gutter={[0, 0]}>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Điểm chấm điểm"
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
                                                label="Ý kiến Phó thủ trưởng cơ quan, đơn vị"
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
                                key: 'LanhDaoDanhGia', label: 'Thủ trưởng cơ quan, đơn vị', children:
                                    <Row gutter={[0, 0]}>
                                        <Col sm={8} span={24} >
                                            <Form.Item
                                                label="Điểm chấm điểm"
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
                                                label="Ý kiến Thủ trưởng cơ quan, đơn vị"
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

export default HeaederReadOnlyDanhGiaDetailModal;