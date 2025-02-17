import { Checkbox, Col, Form, Input, InputNumber, Radio, RadioProps, Row, SelectProps } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ComponentProps, Dispatch, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdSelectProps, AntdSpace } from "../../../lib/antd/components"
import { AddNhomDonVi, GetNhomDonVi, UpdateNhomDonVi } from "../redux/action"
import { AddNhomDonViRequest } from "../services/params"
import { AntdTreeSelect, AntdTreeSelectProps } from "@/lib/antd/components/select/TreeSelect"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { CoCauToChuc } from "@/models/cocautochuc"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { FormInstance } from "antd/lib"
import { CheckBox } from "docx"
import React from "react"
import { SearchNhomDonVi } from "@/models/nhomDonVi"
import { useNhomDonViContext } from "../contexts/QuyTrinhXuLyContext"
import { resetData } from "@/features/nhomdonvi/redux/slice"

const CAPTHUCHIENDEFAULTVALUE = "all"
const CAPTHUCHIENDONVI = "capThucHienDonVi"
const CAPTHUCHIENLOAITRU = "capThucHienDonViLoaiTru"

export type NhomDonViDetailRef = {
    onFinish: () => Promise<void>;
    handlerCancel: () => void;
}

export const NhomDonViDetail = React.forwardRef<NhomDonViDetailRef, {setSearchParams: Dispatch<React.SetStateAction<SearchNhomDonVi>>}>(({setSearchParams}, ref) => {
    const dispatch = useAppDispatch()
    const { data: nhomDonVi, loading } = useAppSelector(state => state.nhomdonvis)
    const [groups, setGroups] = useState<CoCauToChuc[]>()
    const originDatas = useRef<{
        donVis: string[];
    }>({
        donVis: [],
    })
    const [danhMucCacCaps, setDanhMucCacCaps] = useState<IDanhMucChung[]>()
    const NhomDonViContext = useNhomDonViContext()
    const [form] = Form.useForm<AddNhomDonViRequest>()
    const capThucHienDonVi = Form.useWatch(CAPTHUCHIENDONVI, form)
    // const capThucHienDonViLoaiTru = Form.useWatch(CAPTHUCHIENLOAITRU, form)
    const capThucHienDefaultKey = useId()

    const onFinish = async () => {
        const formData = await form.validateFields()
        if (NhomDonViContext?.NhomDonViId) {
            const res = await dispatch(UpdateNhomDonVi({
                id: NhomDonViContext.NhomDonViId, data: { ...formData }
            })).unwrap()
            if(res.succeeded){
                setSearchParams((curr)=> ({...curr}))
                handleCancel()
            }
        } else {
            const res = await dispatch(AddNhomDonVi({ ...formData })).unwrap()
            if(res.succeeded){
                setSearchParams((curr)=> ({...curr}))
                handleCancel()
            }
        }
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        NhomDonViContext.setNhomDonViModalVisible(false)
        NhomDonViContext.setNhomDonViId(undefined)
    };

    useImperativeHandle(ref, () => {
        return ({
            onFinish: onFinish,
            handlerCancel: handleCancel,
        })
    }, [nhomDonVi, loading])

    useEffect(() => {
        (async () => {
            if (NhomDonViContext.NhomDonViId) {
                dispatch(GetNhomDonVi(NhomDonViContext.NhomDonViId))
            }
        })()

    }, [NhomDonViContext.NhomDonViId])

    useEffect(() => {
        (async () => {
            if (groups === undefined) {
                const res = await coCauToChucService.Search({active: true})
                setGroups(res.data.data || [])
            }
        })()

    }, [groups])

    useEffect(() => {
        (async () => {
            if (danhMucCacCaps === undefined) {
                const res = await danhMucChungApi.Search({type:"CapDanhGia"})
                setDanhMucCacCaps(res.data.data)
            }
        })()
    }, [danhMucCacCaps])

    useEffect(() => {
        if (nhomDonVi) {
            const donViIds : string[]= []
            nhomDonVi.danhSachNhomDonVis.forEach(donVi => {
                donViIds.push((donVi as any).groupCode);
            })
            originDatas.current = {
                donVis: donViIds,
            }
            form.setFieldsValue({ 
                ...nhomDonVi, 
                donViIds,
            })
        }
    }, [nhomDonVi])

    
    const danhMucCacCapDropDown = useMemo(() => {
        const onChangeCapThucHien : RadioProps["onChange"] = (e) => {
            const currentSelectCapThucHien = e.target.value
            form.setFieldValue(CAPTHUCHIENDONVI as any, currentSelectCapThucHien)
            
            if(currentSelectCapThucHien === CAPTHUCHIENDEFAULTVALUE){
                form.setFieldValue("donViIds", originDatas.current.donVis)
            } else {
                form.setFieldValue("donViIds", groups?.filter(x => x.catalog?.toLowerCase() == currentSelectCapThucHien?.toLowerCase()).flatMap(x => x.groupCode))
            }
        }
        return <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"center"}}>
            <Radio.Group onChange={onChangeCapThucHien} value={capThucHienDonVi} defaultValue={CAPTHUCHIENDEFAULTVALUE}>
                <Radio value={CAPTHUCHIENDEFAULTVALUE} key={capThucHienDefaultKey}>Giá trị gốc</Radio>
                {danhMucCacCaps?.map((cataLog, index) => <Radio value={cataLog.code} key={index}>
                    {cataLog.tenDanhMuc}
                </Radio>)}
            </Radio.Group>
        </AntdSpace>
    }, [danhMucCacCaps, capThucHienDonVi, capThucHienDefaultKey, groups, originDatas.current])
    return (
        <>
            <AntdModal title={`${NhomDonViContext.NhomDonViId ? `${nhomDonVi?.tenNhom}` : "Thêm nhóm đơn vị"}`}
            width={1280}
             visible={true} handlerCancel={handleCancel}
                cancelText="Đóng" okText="Xác nhận" onOk={onFinish} loading={loading}>
                <Form form={form} layout="vertical" name="NhomDonVi" spellCheck initialValues={{thuTu:1, laQuyTrinhDonVi: false}}>
                    <Row gutter={[4, 8]}>
                        <Form.Item name={CAPTHUCHIENDONVI} hidden><Input/></Form.Item>
                        <Form.Item name={CAPTHUCHIENLOAITRU} hidden><Input/></Form.Item>
                        <Col span={24} md={24}>
                            <Form.Item name="tenNhom" label="Tên nhóm" hasFeedback
                                rules={[{ required: true, message: 'Vui lòng nhập tên nhóm' }]}>
                                <Input placeholder="Nhập nội dung" showCount maxLength={255}/>
                            </Form.Item>
                        </Col>
                        {/* <Col span={24} md={8}>
                            <Form.Item name="laQuyTrinhDonVi" label="Là quy trình đơn vị" valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                        </Col> */}
                        <Col span={24} md={24}>
                            <Form.Item name="donViIds" label="Danh sách đơn vị/phòng ban" rules={[{ required: true, message: 'Vui lòng chọn đơn vị/phòng ban' }]}>
                                <AntdTreeSelect 
                                listHeight={380}
                                autoClearSearchValue={false}
                                dropdownRender={(menu) => {
                                    return <>
                                    {danhMucCacCapDropDown}
                                    <>{menu}</>
                                    </>
                                }}
                                generateOptions={{model: groups, key:"id", parentKey: "ofGroupCode", title: "groupName", value: "groupCode"}} 
                                allowClear showSearch treeLine multiple treeDefaultExpandAll treeNodeFilterProp={"title"}
                                maxTagCount={20}/>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={24}>
                            <Form.Item name="moTa" label="Mô tả" hasFeedback>
                                <Input.TextArea placeholder="Nhập nội dung" showCount maxLength={500}/>
                            </Form.Item>
                        </Col>
                        {/* <Col span={12} md={24}>
                            <Form.Item name="donViLoaiTrus" label="Loại trừ đơn vị" >
                                <AntdSelect 
                                    mode="multiple"
                                    listHeight={380}
                                    dropdownRender={(menu) => {
                                        return <>
                                        {danhMucCacCapLoaiTruDropDown}
                                        <>{menu}</>
                                        </>
                                    }}
                                    onSelect={onSelectDonViLoaiTru}
                                    // onDeselect={onDeselectDonViLoaiTru}
                                    generateOptions={{model: donViLoaiTrus, label: "groupName", value: "groupCode"}} 
                                    allowClear showSearch lowerCaseStringValue={false}/>
                            </Form.Item>
                        </Col> */}
                    </Row>
                </Form>
            </AntdModal>
        </>
    )
})

export const NhomDonViDetailWithModal = (props: ComponentProps<typeof NhomDonViDetail>) => {
    const quyTrinhDetailRef = useRef<NhomDonViDetailRef>(null);
    const {loading} = useAppSelector(state => state.nhomdonvis)
    const handleCancel=()=>{
        quyTrinhDetailRef.current?.handlerCancel()
    }
    const onFinish = async () => {
        quyTrinhDetailRef.current?.onFinish()
    }
    return <AntdModal 
    title={`Thêm quy trình xử lý`}
    width={1280}
    visible={true} handlerCancel={handleCancel}
    cancelText="Đóng" 
    okText="Xác nhận" 
    onOk={onFinish} 
    loading={loading}>
        <NhomDonViDetail {...props} ref={quyTrinhDetailRef}/>
    </AntdModal>
}