import { Form, Input, Space, Row, Col } from "antd"
import { useCallback, useEffect } from "react"
import { ISearchUser } from "@/features/user/models"
import { useAppSelector } from "@/lib/redux/Hooks"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"

export const SearchDanhSachNguoiDung = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>> }) => {
    const [form] = Form.useForm()
    const onFinish = (values: ISearchUser) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    useEffect(() => {
        if(user?.officeCode)
            form.setFieldValue("groupCode",user.officeCode)
    },[])
    const { datas: users, data: user, count, loading, } = useAppSelector((state) => state.user);
    const { datas: donVis, } = useAppSelector((state) => state.cocautochuc);
    const { datas: danhMuc_ChucDanhs, } = useAppSelector((state) => state.danhmuc_chucdanh);
    const { datas: danhMuc_ChuVus, } = useAppSelector((state) => state.danhmuc_chucvu);

    const resetSearchParams = useCallback(() => {
        form.resetFields()
        setSearchParams(() => ({ pageNumber: 1, pageSize: 100, reFetch: true}))
    }, [])

    return (
        <CollapseContent defaultVisible={true}
        >
            <Form name='SearchUserTable' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                        >
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Tài khoản"
                            name="userName"
                        >
                            <Input placeholder="Nhập tài khoản" />
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Đơn vị"
                            name="groupCode"
                        >
                            <AntdSelect  placeholder="Chọn đơn vị" allowClear generateOptions={{ model: donVis, label: 'groupName', value: 'groupCode' }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Chức vụ"
                            name="chucVuId"
                        >
                            <AntdSelect  placeholder="Chức vụ" allowClear generateOptions={{ model: danhMuc_ChuVus, label: 'ten', value: 'id' }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Chức danh"
                            name="chucDanhId"
                        >
                            <AntdSelect  placeholder="Chức danh" allowClear generateOptions={{ model: danhMuc_ChucDanhs, label: 'ten', value: 'id' }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    {/* <Col md={12}>
                        <Form.Item
                            label="Chức vụ"
                            name="positionName"
                        >
                            <Input placeholder="Nhập chức vụ" />
                        </Form.Item>
                    </Col> */}
                </Row>

                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xác nhận
                            </AntdButton>
                            <AntdButton type="default" onClick={resetSearchParams}>
                                Đặt lại
                            </AntdButton>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )
}