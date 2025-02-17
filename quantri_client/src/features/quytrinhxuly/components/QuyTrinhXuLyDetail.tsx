import { Checkbox, Col, Form, Input, InputNumber, Radio, RadioProps, Row, SelectProps } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ComponentProps, Dispatch, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdSelectProps, AntdSpace } from "../../../lib/antd/components"
import { AddQuyTrinhXuLy, GetQuyTrinhXuLy, UpdateQuyTrinhXuLy } from "../redux/action"
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"
import { QuyTrinhXuLy, SearchQuyTrinhXuLy } from '@/models/quytrinhxuly'
import { resetData } from "@/features/quytrinhxuly/redux/slice"
import { AddQuyTrinhXuLyRequest } from "../services/params"
import { AntdTreeSelect, AntdTreeSelectProps } from "@/lib/antd/components/select/TreeSelect"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { CoCauToChuc } from "@/models/cocautochuc"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { FormInstance } from "antd/lib"
import { CheckBox } from "docx"
import React from "react"

const CAPTHUCHIENDEFAULTVALUE = "all"
const CAPTHUCHIENDONVI = "capThucHienDonVi"
const CAPTHUCHIENLOAITRU = "capThucHienDonViLoaiTru"

export type QuyTrinhXuLyDetailRef = {
    onFinish: () => Promise<void>;
    handlerCancel: () => void;
}

export const QuyTrinhXuLyDetail = React.forwardRef<QuyTrinhXuLyDetailRef, {setSearchParams: Dispatch<React.SetStateAction<SearchQuyTrinhXuLy>>}>(({setSearchParams}, ref) => {
    const dispatch = useAppDispatch()
    const { data: QuyTrinhXuLy, loading } = useAppSelector(state => state.quytrinhxulys)
    const [groups, setGroups] = useState<CoCauToChuc[]>()
    const originDatas = useRef<{
        donVis: string[];
        donViLoaiTrus: string[]
    }>({
        donVis: [],
        donViLoaiTrus: []
    })
    const [danhMucCacCaps, setDanhMucCacCaps] = useState<IDanhMucChung[]>()
    const QuyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const [form] = Form.useForm<AddQuyTrinhXuLyRequest>()
    const capThucHienDonVi = Form.useWatch(CAPTHUCHIENDONVI, form)
    // const capThucHienDonViLoaiTru = Form.useWatch(CAPTHUCHIENLOAITRU, form)
    const capThucHienDefaultKey = useId()

    const onFinish = async () => {
        const formData = await form.validateFields()
        if (QuyTrinhXuLyContext?.QuyTrinhXuLyId) {
            const res = await dispatch(UpdateQuyTrinhXuLy({
                id: QuyTrinhXuLyContext.QuyTrinhXuLyId, data: { ...formData }
            })).unwrap()
            if(res.succeeded){
                setSearchParams((curr)=> ({...curr}))
                handleCancel()
            }
        } else {
            const res = await dispatch(AddQuyTrinhXuLy({ ...formData, laQuyTrinhDonVi: QuyTrinhXuLyContext.laDonVi })).unwrap()
            if(res.succeeded){
                setSearchParams((curr)=> ({...curr}))
                handleCancel()
            }
        }
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        QuyTrinhXuLyContext.setQuyTrinhXuLyModalVisible(false)
        QuyTrinhXuLyContext.setQuyTrinhXuLyId(undefined)
    };

    useImperativeHandle(ref, () => {
        return ({
            onFinish: onFinish,
            handlerCancel: handleCancel,
        })
    }, [QuyTrinhXuLy, loading])

    // useEffect(() => {
    //     if(QuyTrinhXuLy === undefined){
    //         (async () => {
    //             if (QuyTrinhXuLyContext.QuyTrinhXuLyId) {
    //                 dispatch(GetQuyTrinhXuLy(QuyTrinhXuLyContext.QuyTrinhXuLyId))
    //             }
    //         })()
    //     }
    // }, [QuyTrinhXuLyContext.QuyTrinhXuLyId, QuyTrinhXuLy])

    useEffect(() => {
        (async () => {
            if (groups === undefined) {
                const res = await coCauToChucService.Search({active: true, type: "don-vi"})
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
        if (QuyTrinhXuLy) {
            const donViIds : string[]= []
            const donViLoaiTrus : string[]= []
            QuyTrinhXuLy.donVis.forEach(donVi => {
                donVi.biLoaiTru ? donViLoaiTrus.push((donVi as any).groupCode) : donViIds.push((donVi as any).groupCode);
            })
            originDatas.current = {
                donVis: donViIds,
                donViLoaiTrus: donViLoaiTrus
            }
            form.setFieldsValue({ 
                ...QuyTrinhXuLy, 
                donViIds,
                donViLoaiTrus,
            })
        }
    }, [QuyTrinhXuLy])

    // const donViLoaiTrus = useMemo(() => {
    //     if(capThucHienDonViLoaiTru === undefined || capThucHienDonViLoaiTru === CAPTHUCHIENDEFAULTVALUE){
    //         return groups;
    //     }
    //     return groups?.filter(x => x.catalog?.toLowerCase() == capThucHienDonViLoaiTru?.toLowerCase()) || []
    // }, [groups, capThucHienDonViLoaiTru])
    
    
    const danhMucCacCapDropDown = useMemo(() => {
        const onChangeCapThucHien : RadioProps["onChange"] = (e) => {
            const currentSelectCapThucHien = e.target.value
            form.setFieldValue(CAPTHUCHIENDONVI as any, currentSelectCapThucHien)
            
            if(currentSelectCapThucHien === CAPTHUCHIENDEFAULTVALUE){
                form.setFieldValue("donViIds", originDatas.current.donVis)
                form.setFieldValue("donViLoaiTrus", originDatas.current.donViLoaiTrus)
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
    
    // const danhMucCacCapLoaiTruDropDown = useMemo(() => {
    //     const onChangeCapThucHien : RadioProps["onChange"] = (e) => {
    //         const currentSelectCapThucHien = e.target.value
    //         form.setFieldValue(CAPTHUCHIENLOAITRU as any, currentSelectCapThucHien)
            
    //         if(currentSelectCapThucHien == CAPTHUCHIENDEFAULTVALUE){
    //             form.setFieldValue("donViIds", originDatas.current.donVis)
    //             form.setFieldValue("donViLoaiTrus", originDatas.current.donViLoaiTrus)
    //         } 
    //     }
    //     return <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"center"}}>
    //         <Radio.Group onChange={onChangeCapThucHien} value={capThucHienDonViLoaiTru} defaultValue={CAPTHUCHIENDEFAULTVALUE}>
    //             <Radio value={CAPTHUCHIENDEFAULTVALUE} key={123123123}>Giá trị gốc</Radio>
    //             {danhMucCacCaps?.map((cataLog, index) => <Radio value={cataLog.code} key={index}>
    //                 {cataLog.tenDanhMuc}
    //             </Radio>)}
    //         </Radio.Group>
    //     </AntdSpace>
    // }, [danhMucCacCaps, capThucHienDonViLoaiTru, capThucHienDefaultKey, QuyTrinhXuLy, originDatas.current])
    
    // const onSelectDonViLoaiTru : AntdSelectProps<any>["onSelect"]= (value) => {
    //     const donViIds : string[] | undefined = form.getFieldValue("donViIds")
    //     form.setFieldValue("donViIds", donViIds?.filter(x => x.toLowerCase() != value.toLowerCase()))
    // }
    // const onDeselectDonViLoaiTru : AntdSelectProps<any>["onDeselect"]= (value) => {
    //     const donViIds : string[] | undefined = form.getFieldValue("donViIds")
    //     form.setFieldValue("donViIds", donViIds ? [...donViIds, value] : [value])
    // }
    return (
        <>
            {/* <AntdModal title={`${QuyTrinhXuLyContext.QuyTrinhXuLyId ? `${QuyTrinhXuLy?.tenQuyTrinh}` : "Thêm quy trình xử lý"}`}
            width={1280}
             visible={true} handlerCancel={handleCancel}
                cancelText="Đóng" okText="Xác nhận" onOk={onFinish} loading={loading}> */}
                <Form form={form} layout="vertical" name="QuyTrinhXuLy" spellCheck initialValues={{thuTu:1, laQuyTrinhDonVi: false}}>
                    <Row gutter={[4, 8]}>
                        <Form.Item name={CAPTHUCHIENDONVI} hidden><Input/></Form.Item>
                        <Form.Item name={CAPTHUCHIENLOAITRU} hidden><Input/></Form.Item>
                        <Col span={24} md={16}>
                            <Form.Item name="tenQuyTrinh" label="Tên quy trình" hasFeedback
                                rules={[{ required: true, message: 'Vui lòng nhập tên quy trình' }]}>
                                <Input placeholder="Nhập nội dung" showCount maxLength={255}/>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item name="thuTu" label="Thứ tự" >
                                <InputNumber min={1} />
                            </Form.Item>
                        </Col>
                        {/* <Col span={24} md={8}>
                            <Form.Item name="laQuyTrinhDonVi" label="Là quy trình đơn vị" valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                        </Col> */}
                        <Col span={24} md={24}>
                            <Form.Item name="donViIds" label="Đối tượng sử dụng quy trình" rules={[{ required: true, message: 'Vui lòng chọn đối tượng sử dụng' }]}>
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
            {/* </AntdModal> */}
        </>
    )
})

export const QuyTrinhXuLyDetailWithModal = (props: ComponentProps<typeof QuyTrinhXuLyDetail>) => {
    const quyTrinhDetailRef = useRef<QuyTrinhXuLyDetailRef>(null);
    const {loading} = useAppSelector(state => state.quytrinhxulys)
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
        <QuyTrinhXuLyDetail {...props} ref={quyTrinhDetailRef}/>
    </AntdModal>
}