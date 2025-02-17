import { Checkbox, Col, ColorPicker, Form, Input, InputNumber, Row, Select, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IAction, ISearchAction } from "../models"
import React, { useEffect, useState } from "react"
import { AntdButton, AntdModal, AntdSelect } from "../../../lib/antd/components"
import { AddAction, GetAction, UpdateAction } from "../redux/action"
import { useActionContext } from "../contexts/ActionContext"
import { Rule } from "antd/es/form"
import { IBaseExt } from "@/models"
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action"
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE } from "@/data"
import { resetData } from "../redux/slice"
import { ColorFormat } from "antd/es/color-picker/interface"
import { SearchNhomNguoiDung } from "@/features/nhomnguoidung/redux/action"
import { resetDatas } from "@/features/nhomnguoidung/redux/slice"
import { SelectProps } from "antd/lib"
import { INhomNguoiDung, ISearchNhomNguoiDung } from "@/features/nhomnguoidung/models"
import { nhomNguoiDungApi } from "@/features/nhomnguoidung/services"
import { DefaultOptionType } from "antd/es/select"
const INPUT_RULES: Record<keyof Omit<IAction, keyof IBaseExt | "iconName" | "colorCode" | "showInModal" | "showInTable" | "applyForUsers" | "applyForUserGroups" | "applyForUserData">, Rule[]> = {
    ma: [{ required: true, message: "Không được để trống!" }],
    ten: [{ required: true, message: "Không được để trống!" }],
    quyen: [{ required: true, message: "Không được để trống!" }],
    thuTu: [{ required: true, message: "Không được để trống!" }],
    moTa: [{ required: true, message: "Không được để trống!" }],
}

export const ActionDetail = ({ setSearchActionParams }: { setSearchActionParams: React.Dispatch<React.SetStateAction<ISearchAction>> }) => {
    const dispatch = useAppDispatch()
    const { data: Action } = useAppSelector(state => state.action)
    const { datas: dataPermissions } = useAppSelector(state => state.vaitro)
    const [nhomNguoiDungs, setNhomNguoiDungs] = useState<INhomNguoiDung[]>([])
    const [nhomNguoiDungLoading, setNhomNguoiDungLoading] = useState(false);
    const [nhomNguoiDungPageNumber, setNhomNguoiDungPageNumber] = useState(1);
    const [form] = Form.useForm<IAction>()
    const [nguoiTiepNhanModalVisible, setNguoiTiepNhanModalVisible] = useState(false);
    useEffect(() => {
        if (dataPermissions === undefined) {
            dispatch(SearchPermissionsVaiTro({}))
        }
    }, [dataPermissions])
    const ActionContext = useActionContext()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        console.log(formData);
        
        if (ActionContext?.ActionId) {
            await dispatch(UpdateAction({ id: ActionContext.ActionId, data: 
                { 
                    ...formData, 
                    quyen: formData.quyen ? (formData.quyen as unknown as string[]).join(ID_SEPARATE) : undefined,
                    applyForUserGroups : formData.applyForUserGroups ? (formData.applyForUserGroups as any).join(ID_SEPARATE) : undefined
                }
            })).unwrap()
        } else {
            await dispatch(AddAction({ 
                ...formData, 
                quyen: formData.quyen ? (formData.quyen as unknown as string[]).join(ID_SEPARATE) : undefined ,
                applyForUserGroups : formData.applyForUserGroups ? (formData.applyForUserGroups as any).join(ID_SEPARATE) : undefined
            })
            ).unwrap()
        }
        setSearchActionParams((curr) => ({ ...curr }))
        handleCancel()
        // console.log(formData.quyen.join(ID_SEPARATE));

    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        dispatch(resetDatas())
        ActionContext.setActionModalVisible(false)
        ActionContext.setActionId(undefined)
    };
    useEffect(() => {
        if (ActionContext.ActionId) {
            dispatch(GetAction(ActionContext.ActionId))
        }
    }, [ActionContext.ActionId])

    useEffect(() => {
        if (Action) {
            form.setFieldsValue({ ...Action, 
                quyen: Action.quyen ? Action.quyen.split(ID_SEPARATE).map(x => x) as any : undefined,
                applyForUserGroups: Action.applyForUserGroups ? Action.applyForUserGroups?.split(ID_SEPARATE) as any : undefined
                })
            const donViOptions = Action.applyForUserData?.map((x) => ({
                value: x.id,
                label: x.userName,
            })) as DefaultOptionType[];
        }
    }, [Action])
    const onHandleChange = (e: any) => {
        
    };
    const handleCancelUserVisible = () => {
        setNguoiTiepNhanModalVisible(false);
    };
    const onSearchNhomNguoiDung = async (params: ISearchNhomNguoiDung) => {
        const res = await nhomNguoiDungApi.Search(params)
        return res.data.data
    }

    const onFocusUserGroup = async () => {
        if (!nhomNguoiDungs.length) {
            const res = await onSearchNhomNguoiDung({ pageNumber: 1, pageSize: 50, reFetch: true })
            setNhomNguoiDungs(res)
        }
    }

    const onScroll: SelectProps["onPopupScroll"] = async (event) => {
        const target = event.currentTarget;
        if (
            !nhomNguoiDungLoading &&
            target.scrollTop + target.offsetHeight === target.scrollHeight
        ) {
            const res = await onSearchNhomNguoiDung({ pageNumber: nhomNguoiDungPageNumber + 1, pageSize: 50, reFetch: true })
            if (!res) {
                return
            }
            target.scrollTo(0, target.scrollHeight);
            setNhomNguoiDungs((prevState) =>
                prevState.concat(res));
            setNhomNguoiDungPageNumber((curr) => curr + 1)
        }
    };

    return (
        <AntdModal title={ActionContext.ActionId ? "Sửa action" : "Thêm mới Action"} visible={ActionContext.ActionModalVisible} handlerCancel={handleCancel} footer={null} width={780}>
            <Form name='Action' layout="vertical" onFinish={onFinish} form={form} requiredMark={ActionContext.ActionId !== null}
                initialValues={{ uuTien: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên action"
                            name="ten"
                            hasFeedback
                            rules={INPUT_RULES["ten"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item
                            label="Mã action"
                            name="ma"
                            hasFeedback
                            rules={INPUT_RULES["ten"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                            hasFeedback
                            rules={INPUT_RULES["thuTu"]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị trên Modal"
                            name="showInModal"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị trên Table"
                            name="showInTable"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên Icon"
                            name="iconName"
                        >
                            <Select options={Object.keys(ICON_HOLDER_KEYS).map((key) => {
                                const icon = (ICON_HOLDER as any)[key]
                                return {
                                    value: key,
                                    label: <><span>{icon}</span> : <span>{key}</span></>,
                                }
                            })} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã Màu"
                            name="colorCode"
                        >
                            <ColorPicker showText onChange={(value) => form.setFieldValue("colorCode", value.toHexString())} />
                        </Form.Item>
                    </Col>

                    {/* <Col span={24}>
                        <Form.Item
                            label="Phân theo người dùng"
                            name="applyForUsers"
                        >
                            <AntdSelect
                                style={{ marginBottom: 3 }}
                                mode="multiple"
                                onDeselect={onHandleChange}
                                value={donViContext.selectedUsers}
                                options={donViContext.selectedUserOptions}
                            ></AntdSelect>
                            <AntdButton
                                type="primary"
                                onClick={() => setNguoiTiepNhanModalVisible(true)}
                            >
                                Chọn cán bộ
                            </AntdButton>
                            {nguoiTiepNhanModalVisible ? (
                                <NguoiTiepNhanWrapper
                                    handleCancel={handleCancelUserVisible}
                                ></NguoiTiepNhanWrapper>
                            ) : (
                                <></>
                            )}
                        </Form.Item>
                    </Col> */}
                    <Col span={24}>
                        <Form.Item
                            label="Phân theo nhóm người dùng"
                            name="applyForUserGroups"
                        >
                            <AntdSelect
                                virtual={false}
                                mode="multiple"
                                generateOptions={{
                                    model: nhomNguoiDungs,
                                    label: "ten",
                                    value: "id",
                                }}
                                onFocus={onFocusUserGroup}
                                onPopupScroll={onScroll}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Phân theo quyền"
                            name="quyen"
                        >
                            <AntdSelect
                                virtual={false}
                                mode="multiple"

                                generateOptions={{
                                    model: dataPermissions,
                                    label: "claimValue",
                                    value: "claimValue",
                                }}
                            />
                        </Form.Item>
                    </Col>


                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                            hasFeedback
                            rules={INPUT_RULES["moTa"]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish}>
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}