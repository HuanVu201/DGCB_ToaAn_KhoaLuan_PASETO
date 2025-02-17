import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { ISearchDanhMucChung } from "../models"
import { useCallback } from "react"
import { useDanhMucChungContext } from "../context/DanhMucChungContext"
import { useSearchParams } from "react-router-dom"

export const DanhMucChungSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMucChung>> }) => {
    const danhMucChungContext = useDanhMucChungContext()
    const [form] = Form.useForm()
    let [searchRouterParams] = useSearchParams();
    const queryParams = new URLSearchParams(window.location.search);
    const typeValue = queryParams.get('type');
    const onFinish = (values: ISearchDanhMucChung) => {
        setSearchParams((curr) => ({ ...curr, ...values, type: searchRouterParams.get("type") || typeValue as any }))
    }
 
    
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true, type: searchRouterParams.get("type") || typeValue as any })
        form.resetFields()
    }, [setSearchParams,typeValue,searchRouterParams])
    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { danhMucChungContext.setDanhMucChungModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='DanhMucSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                <Col md={12} span={24}>
                        <Form.Item
                            label="Mã"
                            name="code"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên"
                            name="tenDanhMuc"
                        >
                            <Input />
                        </Form.Item>
                    </Col>    
                </Row>
                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xác nhận
                            </AntdButton>
                            <AntdButton type="default" onClick={resetSearchParams}>
                                Tải lại
                            </AntdButton>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>


    )
}