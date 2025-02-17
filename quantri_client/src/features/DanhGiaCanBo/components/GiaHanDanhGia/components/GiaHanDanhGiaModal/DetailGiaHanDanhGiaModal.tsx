import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components";
import { Button, Col, Divider, Input, InputNumber, Radio, Row, Select, Spin } from "antd";
import { LoadingOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Form } from "antd"
import { useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { danhGiaCanBoServiceApi } from "../../../common/service/DanhGiaService";
import { IGiaHanDanhGia, indexMonthOfPartYear, indexMonthOfQuater, indexMonthOfYear } from "../../models";
import { useGiaHanDanhGiaContext } from "../../contexts/useGiaHanDanhGiaContext";
import { GiaHanDanhGiaServiceApi } from "../../services";
import moment from "moment";
import { CURRENTTIME, MONTH, YEAR } from "@/data";
import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { danhMuc_BoTieuChuanApi } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/services";
import dayjs from 'dayjs'

interface DateRange {
    startDate: string;
    endDate: string;
}

const GiaHanDanhGiaModalVisible = () => {
    const { parseToken } = useAppSelector((state) => state.auth);
    const [boTieuChuans, setBoTieuChuans] = useState<IDanhMuc_BoTieuChuan[]>()
    const [form] = Form.useForm<IGiaHanDanhGia>()
    const giaHanContext = useGiaHanDanhGiaContext()
    const dinhKem = Form.useWatch('dinhKem', form)
    const [hasKetQua, setHasKetQua] = useState<boolean>(false)

    useEffect(() => {
        (async () => {

            if (!boTieuChuans && giaHanContext.giaHanModalVisible) {
                const resGetBoTieuChuan = await danhMuc_BoTieuChuanApi.Search({
                    pageNumber: 1, pageSize: 1000,
                    suDung: true
                })

                if (resGetBoTieuChuan.data.data) {
                    setBoTieuChuans(resGetBoTieuChuan.data.data)
                    if (!giaHanContext.giaHanId)
                        toast.info('Chọn bộ tiêu chuẩn thực hiện gia hạn')
                } else {
                    toast.error("Không có thông tin bộ tiêu chuẩn")
                    handlerCancel()
                    return
                }
            }
        })()
    }, [giaHanContext.giaHanModalVisible])

    const onChangeBoTieuChuanId = (boTieuChuanId: string) => {
        const curData = boTieuChuans?.filter(x => x.maBoTieuChi?.toLowerCase() == boTieuChuanId.toLowerCase())[0]

        if (!(curData?.cauHinhThoiGianGiaHan && curData.cauHinhThoiGianGiaHan > 0)) {
            toast.error("Bộ tiêu chuẩn này không được gia hạn")
            form.setFieldValue('tuNgay', undefined)
            form.setFieldValue('denNgay', undefined)
            return
        }
        const thoiGianSplit = curData.thoiGian?.split('##') || []
        let result: DateRange = { startDate: '', endDate: '' }

        if (curData?.loaiThoiGian?.toLowerCase() == 'năm') {
            result = CalcDate(`${YEAR}-${thoiGianSplit[0]}-${thoiGianSplit[1].split('-')[1]}`, curData.cauHinhThoiGianGiaHan)
        } else if (curData?.loaiThoiGian?.toLowerCase() == 'tháng') {
            result = CalcDate(`${YEAR}-${MONTH}-${thoiGianSplit[0].split('-')[1]}`, curData.cauHinhThoiGianGiaHan)
        } if (curData?.loaiThoiGian?.toLowerCase() == 'quý') {
            const nearMonth: number = Number((getCurrentQuarter() - 1) * 3) + Number(thoiGianSplit[0])
            result = CalcDate(`${YEAR}-${nearMonth}-${thoiGianSplit[1].split('-')[1]}`, curData.cauHinhThoiGianGiaHan)
        } else if (curData?.loaiThoiGian?.toLowerCase() == '6 tháng') {
            const nearMonth: number = MONTH <= 6 ? Number(thoiGianSplit[0]) : Number(6 + Number(thoiGianSplit[0]))
            result = CalcDate(`${YEAR}-${nearMonth}-${thoiGianSplit[1].split('-')[1]}`, curData.cauHinhThoiGianGiaHan)
        }

        if (result) {
            form.setFieldValue('tuNgay', result.startDate)
            form.setFieldValue('denNgay', result.endDate)
        } else toast.error("Có lỗi trong quá trình kiểm tra thời gian gia hạn")
    }

    function getCurrentQuarter(): number {
        const currentMonth = new Date().getMonth() + 1; // getMonth() trả về 0-11
        return Math.ceil(currentMonth / 3);
    }

    function CalcDate(ngayCuoi: Date | string | number, thoiGianGiaHan: number): DateRange {
        const inputDate = new Date(ngayCuoi);

        const startDate = new Date(inputDate);
        const endDate = new Date(inputDate);
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + thoiGianGiaHan);

        const response: DateRange = {
            startDate: dayjs(startDate).format('DD/MM/YYYY'),
            endDate: dayjs(endDate).format('DD/MM/YYYY'),
        }

        return response
    }

    useEffect(() => {
        (async () => {
            if (giaHanContext.giaHanId) {
                giaHanContext.setLoading(true)
                const resGetKhieuNai = await GiaHanDanhGiaServiceApi.Get(giaHanContext.giaHanId)
                if (resGetKhieuNai.data.data) {
                    const data = resGetKhieuNai.data.data
                    form.setFieldsValue({
                        ...data,
                        tuNgay: dayjs(data.tuNgay).format('DD/MM/YYYY'),
                        denNgay: dayjs(data.denNgay).format('DD/MM/YYYY'),
                    })

                    if (data.noiDung)
                        setHasKetQua(true)

                } else {
                    toast.error("Không có thông tin yêu cầu gia hạn")
                    handlerCancel()
                }

                giaHanContext.setLoading(false)
            }
        })()
    }, [giaHanContext.giaHanId, giaHanContext.giaHanModalVisible])

    const onFinish = async () => {
        const formData = await form.validateFields()

        if (!formData.maBoTieuChi || !formData.tuNgay || !formData.denNgay || !formData.yKien) {
            toast.error("Vui lòng hoàn thành biểu mẫu yêu cầu gia hạn")
            return
        }

        // giaHanContext.setLoading(true)
        console.log(formData)
        if (!giaHanContext.giaHanId) {
            const resCreate = await GiaHanDanhGiaServiceApi.Create({
                ...formData,
                trangThai: 'Chờ gửi',

                tuNgay: dayjs(formData.tuNgay, 'DD/MM/YYYY').add(7, 'hour').toISOString(),
                denNgay: dayjs(formData.denNgay, 'DD/MM/YYYY').hour(23).minute(59).second(59).add(7, 'hour').toISOString(),
                yKien: formData.yKien,
                dinhKem: formData.dinhKem,
                maDonVi: parseToken?.officeCode,
                maDonViCha: parseToken?.maDonViCha,
                tenBoTieuChi: boTieuChuans?.filter(x => x.maBoTieuChi == formData.maBoTieuChi)[0].tenBoTieuChi
            })

            if (resCreate.data.succeeded) {
                toast.success("Thêm mới yêu cầu gia hạn đánh giá thành công")
                handlerCancel()
                giaHanContext.setReload(!giaHanContext.reload)
            } else {
                toast.error("Thêm mới thất bại")
            }
        } else if (giaHanContext.giaHanId) {
            const resUpdate = await GiaHanDanhGiaServiceApi.Update({
                id: giaHanContext.giaHanId,
                data: {
                    ...formData,
                    trangThai: 'Chờ gửi',
                    tuNgay: dayjs(formData.tuNgay, 'DD/MM/YYYY').toISOString(),
                    denNgay: dayjs(formData.denNgay, 'DD/MM/YYYY').hour(23).minute(59).second(59).toISOString(),
                    yKien: formData.yKien,
                    dinhKem: formData.dinhKem,
                    maDonVi: parseToken?.officeCode,
                    maDonViCha: parseToken?.maDonViCha,
                    tenBoTieuChi: boTieuChuans?.filter(x => x.maBoTieuChi == formData.maBoTieuChi)[0].tenBoTieuChi
                }
            })
            if (resUpdate.data.succeeded) {
                toast.success("Cập nhật yêu cầu gia hạn, đánh giá thành công")
                handlerCancel()
                giaHanContext.setReload(!giaHanContext.reload)
            } else {
                toast.error("Cập nhật thất bại")
            }
        }

        giaHanContext.setLoading(false)
    }

    const handlerCancel = () => {
        giaHanContext.setGiaHanId(undefined)
        giaHanContext.setGiaHanModalVisible(false)
        giaHanContext.setReadOnlyGiaHanModalVisible(false)
        setHasKetQua(false)
        setBoTieuChuans(undefined)
        form.resetFields()
    }

    return <AntdModal className="" visible={giaHanContext.giaHanModalVisible} title={giaHanContext.giaHanId ? `Thông tin yêu cầu gia hạn đánh giá` : `Thêm mới yêu cầu gia hạn đánh giá`} width='60vw' handlerCancel={handlerCancel}
        footer={[
            <Button
                hidden={giaHanContext.readOnlyGiaHanModalVisible}
                type="primary"
                onClick={() => onFinish()}
                loading={giaHanContext.loading}
                style={{ backgroundColor: '#34bfa3' }}
            >
                Xác nhận
            </Button>,
            <Button key="back" onClick={handlerCancel} loading={giaHanContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                Đóng
            </Button>
        ]}
    >
        <Spin spinning={giaHanContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <Form name='giaHanDanhGiaModal' layout="horizontal" form={form} disabled={giaHanContext.readOnlyGiaHanModalVisible}>
                <Row gutter={[0, 0]}>
                    <Col span={24} >
                        <Form.Item
                            label="Thuộc bộ tiêu chuẩn"
                            name="maBoTieuChi"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: boTieuChuans,
                                    label: "tenBoTieuChi",
                                    value: "maBoTieuChi",
                                }}
                                style={{ width: '100%' }}
                                placeholder="Chọn bộ tiêu chuẩn cần gia hạn"
                                lowerCaseStringValue={false}
                                onChange={(e) => onChangeBoTieuChuanId(e)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Từ ngày" name="tuNgay"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Đến ngày" name="denNgay"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="Nội dung yêu cầu"
                            name="yKien"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <Input.TextArea style={{ width: '100%' }} placeholder="Nhập nội dung yêu cầu..." />
                        </Form.Item>
                    </Col>

                    <Col span={24} >
                        <Form.Item
                            label="Tài liệu kèm theo"
                            name="dinhKem"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <RegularUpload
                                form={form}
                                fieldName="dinhKem"
                                folderName={`GiaHanDanhGia`}
                                dinhKem={dinhKem}
                                hideUpload={giaHanContext.readOnlyGiaHanModalVisible}
                            />
                        </Form.Item>
                    </Col>
                    {hasKetQua ? <>
                        <Divider variant="dotted" style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left">Thông tin kết quả</Divider>
                        <Col span={24} >
                            <Form.Item
                                label="Nội dung kết quả"
                                name="noiDung"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                            >
                                <Input.TextArea style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </>

                        : null}
                </Row>
            </Form>
        </Spin>

    </AntdModal>
}
const GiaHanDanhGiaModal = () => (
    <GiaHanDanhGiaModalVisible />
);


export default GiaHanDanhGiaModal