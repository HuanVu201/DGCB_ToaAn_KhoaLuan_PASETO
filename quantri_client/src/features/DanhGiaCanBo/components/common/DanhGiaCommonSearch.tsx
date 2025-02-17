import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models"
import { comboMonths, loaiThoiGians, months, phanLoaiChamDiems, quarters, trangThaiChamDiems } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon"
import { CloudDownloadOutlined, DownloadOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import * as XLSX from 'xlsx';
import { YEAR } from "@/data"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { exportDataServiceApi } from "@/features/ExportData/ExportDataService"
import { callApiAndDisplayFile } from "@/utils"

export const DanhGiaCommonSearch = ({ searchParams, setSearchParams, searchParamOrigins, extraButtons, setLoading, typeNgaySearch = "chấm điểm", allowExportExcel = true, isDanhGiaDonVi = false }: {
    searchParams: ISearchDanhGiaCanBo,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhGiaCanBo>>,
    searchParamOrigins: ISearchDanhGiaCanBo,
    extraButtons: React.ReactNode[] | undefined
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    typeNgaySearch?: string
    allowExportExcel?: boolean
    isDanhGiaDonVi?: boolean
}) => {
    const [form] = Form.useForm()
    const [loaiThoiGian, setLoaiThoiGian] = useState<string>()
    const [queryStringParams, setQueryStringParams] = useSearchParams();
    useEffect(() => {
        if (!form.getFieldValue('namDanhGia') && searchParams.thoiGianQuery == YEAR.toString()) {
            form.setFieldValue('namDanhGia', YEAR)
        }
    }, [searchParams.thoiGianQuery])

    const onFinish = (values: ISearchDanhGiaCanBo) => {
        let thoiGianQueryReq: string = ''
        if (values.loaiThoiGian?.toLowerCase() == 'năm' || !values.loaiThoiGian) {
            thoiGianQueryReq = `${values.namDanhGia || ''}`
        } else {
            thoiGianQueryReq = `${values.namDanhGia || ''}${values.thoiGian || ''}`
        }
        setSearchParams((curr) => ({
            ...curr,
            ...values,
            // loaiThoiGian: undefined,
            thoiGian: undefined,
            thoiGianQuery: thoiGianQueryReq || undefined,
            tuNgay: values.tuNgay ? dayjs(values.tuNgay).format('YYYY-MM-DD') : undefined,
            denNgay: values.denNgay ? dayjs(values.denNgay).format('YYYY-MM-DD') : undefined,
        }))
    }
    const resetSearchParams = useCallback(() => {
        queryStringParams.delete('TrangThai');
        setQueryStringParams(queryStringParams);
        setSearchParams(searchParamOrigins)
        form.resetFields()
    }, [queryStringParams, setQueryStringParams, searchParamOrigins])

    useEffect(() => {
        (async () => {
            if (loaiThoiGian) {
                const now = new Date()
                let valueThoiGian = ''
                const currentMonth = now.getMonth() + 1;

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
                if (valueThoiGian)
                    form.setFieldValue('thoiGian', valueThoiGian)

            }
        })()
    }, [loaiThoiGian])

    const onExportExcel = async () => {
        if (!searchParams) {
            toast.error("Không có thông tin bộ lọc")
            return
        }
        setLoading(true)
        try {
            const resGetUrl = !isDanhGiaDonVi ? await exportDataServiceApi.ExportExcelDanhGiaCaNhan(searchParams)
                : await exportDataServiceApi.ExportExcelDanhGiaDonVi(searchParams)

            if (resGetUrl.data.data) {
                toast.success(resGetUrl.data.message)
                callApiAndDisplayFile(resGetUrl.data.data)
            } else {
                toast.error(resGetUrl.data.message)
            }
        } catch {
            toast.error("Có lỗi trong quá trình xuất danh sách đánh giá")
            setLoading(false)
        }

        setLoading(false)
    }


    return (
        <CollapseContent
            extraButtons={extraButtons} nameSearch="Tìm kiếm nâng cao" classSearch="BtnSearchAdvClass"
        >
            <Form name='SearchPageDGDB' layout="horizontal" onFinish={onFinish} form={form} style={{ marginTop: 10, padding: '0px 12vw' }}>
                <Row gutter={[0, 0]}>
                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label={`Thời gian ${typeNgaySearch} từ ngày`}
                            name="tuNgay"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" format={"DD/MM/YYYY"} allowClear />
                        </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Đến ngày"
                            name="denNgay"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" format={"DD/MM/YYYY"} allowClear />
                        </Form.Item>
                    </Col>

                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Phân loại chấm điểm"
                            name="phanLoaiDanhGia"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: phanLoaiChamDiems,
                                    label: "label",
                                    value: "value",
                                }}
                                style={{ width: '100%' }}
                                placeholder="Chọn phân loại chấm điểm"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Năm chấm điểm"
                            name="namDanhGia"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Input style={{ width: '100%' }} placeholder="Nhập năm chấm điểm" />
                        </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
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
                                placeholder="Chọn loại thời gian"
                                allowClear
                                lowerCaseStringValue={false}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12} style={{ display: !loaiThoiGian || loaiThoiGian?.toLowerCase() == 'năm' ? 'none' : '' }}>
                        <Form.Item
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
                                placeholder="Chọn kỳ đánh giá"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Row justify="space-around">
                        <Col span={1} />
                        <Col span={23} style={{ display: 'flex', justifyContent: 'center' }} >

                            <Space size="small">
                                <AntdButton type="primary" htmlType="submit" >
                                    Xác nhận
                                </AntdButton>
                                <AntdButton type="default" onClick={resetSearchParams}>
                                    Tải lại
                                </AntdButton>
                                {allowExportExcel ?
                                    <AntdButton onClick={onExportExcel} className="downloadExcelButton">
                                        <CloudDownloadOutlined /> Tải danh sách
                                    </AntdButton> : null
                                }
                            </Space>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )
}