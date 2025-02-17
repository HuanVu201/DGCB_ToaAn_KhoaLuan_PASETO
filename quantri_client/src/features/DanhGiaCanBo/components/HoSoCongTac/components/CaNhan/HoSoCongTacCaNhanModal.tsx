import { AntdModal, AntdSelect, AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { Button, Col, Input, Row, Select, Spin } from "antd";
import { CaretDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useHoSoCongTacDanhGiaContext } from "../../contexts/useHoSoCongTacDanhGiaContext";
import { IHoSoCongTacDanhGia } from "../../models";
import { comboMonths, loaiThoiGians, months, quarters } from "../../../common/DanhGiaCommon";
import { useEffect, useState } from "react";
import { YEAR } from "@/data";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { coCauToChucService } from "@/features/cocautochuc/services";
import { toast } from "react-toastify";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { HoSoCongTacServiceApi } from "../../services/hoSoCongTacServices";
import { SearchLstUsers } from "@/features/lstusers/redux/action";
import { useButtonActionContext } from "../../../common/contexts/useButtonActionContext";

const HoSoCongTacCaNhanModalVisible = () => {
    const dispatch = useAppDispatch();
    const { parseToken } = useAppSelector(state => state.auth)
    const [form] = Form.useForm<IHoSoCongTacDanhGia>()
    const hoSoContext = useHoSoCongTacDanhGiaContext()
    const buttonActionContext = useButtonActionContext()

    const dkBanKiemDiem = Form.useWatch('dkBanKiemDiem', form)
    const dkBanNhanXetCapUy = Form.useWatch('dkBanNhanXetCapUy', form)
    const dkBienBanHoiNghiKiemDiem = Form.useWatch('dkBienBanHoiNghiKiemDiem', form)
    const dkKetQuaThamDinhCuaCoQuanThamMuu = Form.useWatch('dkKetQuaThamDinhCuaCoQuanThamMuu', form)
    const dkKetLuanDanhGiaXepLoai = Form.useWatch('dkKetLuanDanhGiaXepLoai', form)
    const dkVanBanGoiYKiemDiem = Form.useWatch('dkVanBanGoiYKiemDiem', form)
    const dkVanBanThamGiaGopY = Form.useWatch('dkVanBanThamGiaGopY', form)
    const dkHoSoGiaiQuyetKhieuNaiKienNghi = Form.useWatch('dkHoSoGiaiQuyetKhieuNaiKienNghi', form)
    const dkCacVanBanKhac = Form.useWatch('dkCacVanBanKhac', form)


    const onFinish = async () => {
        const formData = await form.validateFields()

        if (!formData.tenHoSo) {
            toast.error("Vui lòng nhập tên hồ sơ")
            return
        }

        const resUpdate = await HoSoCongTacServiceApi.Update({
            id: hoSoContext.hoSoId,
            data: {
                ...formData
            }
        })
        if (resUpdate.data.succeeded) {
            toast.success(resUpdate.data.message)
            handlerCancel()
        } else {
            toast.error("Thao tác thất bại")
        }
        console.log(resUpdate.data)
    }

    useEffect(() => {
        (async () => {
            if (hoSoContext.hoSoId && hoSoContext.hoSoModalVisible) {
                const resGet = await HoSoCongTacServiceApi.Get(hoSoContext.hoSoId)
                if (resGet.data.succeeded) {
                    form.setFieldsValue({ ...resGet.data.data })
                } else {
                    toast.error("Có lỗi trong quá trình lấy thông tin hồ sơ")
                }
            }
        })()
    }, [hoSoContext.hoSoId, hoSoContext.hoSoModalVisible])


    const handlerCancel = () => {
        hoSoContext.setHoSoId(undefined)
        hoSoContext.setHoSoModalVisible(false)
        form.resetFields()
    }




    return <AntdModal className="" visible={hoSoContext.hoSoModalVisible && hoSoContext.hoSoId ? true : false} title={`Thông tin hồ sơ công tác đánh giá cá nhân`} width={900} handlerCancel={handlerCancel}
        footer={[
            <Button
                type="primary"
                onClick={() => onFinish()}
                loading={hoSoContext.loading}
                style={{ backgroundColor: '#34bfa3' }}
            >
                Cập nhật
            </Button>,
            <Button key="back" onClick={handlerCancel} loading={hoSoContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                Đóng
            </Button>


        ]}
    >
        <Spin spinning={hoSoContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <Form name='HoSoCongTacModal' layout="vertical" form={form} >
                <Row gutter={[0, 0]}>
                    <Col span={24} >
                        <Form.Item
                            label="Tên hồ sơ:"
                            name="tenHoSo"
                        >
                            <Input.TextArea style={{ width: '100%' }} placeholder="Nhập tên hồ sơ..." />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="1. Bản kiểm điểm cá nhân, báo cáo kiểm điểm tập thể:"
                            name="dkBanKiemDiem"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkBanKiemDiem"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkBanKiemDiem}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="2. Bản nhận xét của cấp ủy nơi cư trú:"
                            name="dkBanNhanXetCapUy"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkBanNhanXetCapUy"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkBanNhanXetCapUy}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="3. Biên bản hội nghị kiểm điểm:"
                            name="dkBienBanHoiNghiKiemDiem"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkBienBanHoiNghiKiemDiem"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkBienBanHoiNghiKiemDiem}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="4. Tổng hợp kết quả thẩm định của cơ quan chủ trì tham mưu, giúp việc:"
                            name="dkKetQuaThamDinhCuaCoQuanThamMuu"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkKetQuaThamDinhCuaCoQuanThamMuu"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkKetQuaThamDinhCuaCoQuanThamMuu}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="5. Kết luận đánh giá, kết quả xếp loại của cấp có thẩm quyền:"
                            name="dkKetLuanDanhGiaXepLoai"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkKetLuanDanhGiaXepLoai"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkKetLuanDanhGiaXepLoai}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="6. Văn bản gợi ý kiểm điểm (nếu có):"
                            name="dkVanBanGoiYKiemDiem"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkVanBanGoiYKiemDiem"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkVanBanGoiYKiemDiem}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="7. Văn bản tham gia, góp ý của các tổ chức, tập thể, cá nhân có liên quan (nếu có):"
                            name="dkVanBanThamGiaGopY"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkVanBanThamGiaGopY"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkVanBanThamGiaGopY}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="8. Hồ sơ giải quyết khiếu nại, kiến nghị về việc kết quả đánh giá, xếp loại (nếu có):"
                            name="dkHoSoGiaiQuyetKhieuNaiKienNghi"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkHoSoGiaiQuyetKhieuNaiKienNghi"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkHoSoGiaiQuyetKhieuNaiKienNghi}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="9. Các văn bản khác (nếu có):"
                            name="dkCacVanBanKhac"
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dkCacVanBanKhac"
                                folderName={`HoSoCongTacDanhGia`}
                                dinhKem={dkCacVanBanKhac}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Spin>

    </AntdModal>
}
const HoSoCongTacCaNhanModal = () => (
    <HoSoCongTacCaNhanModalVisible />
);


export default HoSoCongTacCaNhanModal