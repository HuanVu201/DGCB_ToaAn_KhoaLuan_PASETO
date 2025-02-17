import { AntdAutoComplete, AntdButton, AntdModal, AntdSelect, AntdSelectProps, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { Col, Form, Input, InputNumber, Row, AutoComplete, Checkbox, CheckboxProps, Radio, RadioProps  } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useId, useMemo, useState} from 'react'
import { SearchNhomNguoiDung } from "@/features/nhomnguoidung/redux/action"
import { AddQuyTrinhXuLy, GetQuyTrinhXuLy, UpdateQuyTrinhXuLy } from "@/features/quytrinhxuly/redux/action"
import {Node} from 'reactflow'
import {v4 as uuid} from 'uuid'
import { resetData } from "@/features/quytrinhxuly/redux/slice"
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"
import { SearchDanhMuc_ChucDanh } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/redux/action"
import { SearchDanhMuc_ChucVu } from "@/features/danhmuc_dgcb/danhmuc_chucvu/redux/action"
import { SearchDanhMuc_TrangThaiDanhGia } from "@/features/danhmuc_dgcb/danhmuc_trangthaidanhgia/redux/action"
import { AddBuocXuLyCommand, UpdateBuocXuLyCommand } from "@/features/buocxuly/services/params"
import { GetBuocXuLy } from "@/features/buocxuly/redux/action"
import { ChucVu } from "@/models/chucVu"
import { ChucDanh } from "@/models/chucDanh"
import { toast } from "react-toastify"
import { CoCauToChuc } from "@/models/cocautochuc"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { AntdTreeSelect } from "@/lib/antd/components/select/TreeSelect"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { NhomDonVi } from "@/models/nhomDonVi"
import { NhomDonViApi } from "@/features/nhomdonvi/services"

export const NULL_VAITRO_VALUE = "none"
const CAPTHUCHIENDEFAULTVALUE = "all"
const CAPTHUCHIEN = "capThucHien"


export interface AddNodeModalProps {
    addNode: (id: string, params: AddBuocXuLyCommand) => void,
    onChangeNode: (id: string, data: UpdateBuocXuLyCommand) => void,
    nodes: Node<any, string | undefined>[],
    laDonVi: boolean
}

type type = "cungDonVi" | "cungPhongBan" | "layNguoiQuanLy" | "layDonViCapTren"

export const AddNodeModal = ({addNode, nodes, onChangeNode, laDonVi} : AddNodeModalProps) => {
    const [form] = Form.useForm<AddBuocXuLyCommand>()
    const quyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const [nhomDonVis, setNhomDonVis] = useState<NhomDonVi[]>()
    const {nodeData: buocxuly} = useAppSelector(state => state.buocxuly)
    const {datas: nhomNguoiDungs} = useAppSelector(state => state.nhomnguoidung)
    const {datas: buocXuLyChucDanhs} = useAppSelector(state => state.danhmuc_chucdanh)
    const {datas: buocXuLyChucVus} = useAppSelector(state => state.danhmuc_chucvu)
    const {datas: trangThaiDanhGias} = useAppSelector(state => state.danhmuc_trangthaidanhgia)
    // const [danhMucCacCaps, setDanhMucCacCaps] = useState<IDanhMucChung[]>()

    // const capThucHienDefaultKey = useId()
    // const capThucHien = Form.useWatch(CAPTHUCHIEN, form)

    const dispatch = useAppDispatch()
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        quyTrinhXuLyContext.setBuocXuLyId(undefined)
        quyTrinhXuLyContext.setAddNodeModalVisible(false)
    }
    const onFinish = useCallback(async () => {
        const buocXuLyChucDanhIds : string[] | undefined= form.getFieldValue("buocXuLyChucDanhIds");
        const buocXuLyChucVuIds : string[] | undefined = form.getFieldValue("buocXuLyChucVuIds");
        const khongCoChucDanh = buocXuLyChucDanhIds?.includes(NULL_VAITRO_VALUE) || false;
        const khongCoChucVu = buocXuLyChucVuIds?.includes(NULL_VAITRO_VALUE) || false;
        if(buocXuLyChucDanhIds && buocXuLyChucDanhIds?.length > 1 && khongCoChucDanh){
            toast.warn("Vui lòng xóa giá trị 'Không có' hoặc toàn bộ chức danh khác trong Chức danh")
            return
        }
        if(buocXuLyChucVuIds && buocXuLyChucVuIds?.length > 1 && khongCoChucVu){
            toast.warn("Vui lòng xóa giá trị 'Không có' hoặc toàn bộ chức vụ khác trong Chức vụ")
            return
        }
        if(!quyTrinhXuLyContext.buocXuLyId){
            const formData: AddBuocXuLyCommand = await form.validateFields()
            if("cachLayBuocTiep" in formData){
                if(formData.cachLayBuocTiep == "cungDonVi"){
                    formData.cungDonVi = true
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = false
                } else if (formData.cachLayBuocTiep == "cungPhongBan"){
                    formData.cungDonVi = false
                    formData.cungPhongBan = true
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = false
                } else if (formData.cachLayBuocTiep == "layNguoiQuanLy"){
                    formData.cungDonVi = false
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = true
                } else if (formData.cachLayBuocTiep == "layDonViCapTren"){
                    formData.cungDonVi = false
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = true
                    formData.layNguoiQuanLy = false
                } else {
                    formData.cungDonVi = false
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = false
                }
            } else {
                formData.cungDonVi = false
                formData.cungPhongBan = false
                formData.layDonViCapTren = false
                formData.layNguoiQuanLy = false
            }
            const id = uuid()
            if(quyTrinhXuLyContext.QuyTrinhXuLyId)
            addNode(id, {
                ...formData,
                khongCoChucDanh,
                khongCoChucVu,
                buocXuLyChucDanhIds: khongCoChucDanh ? [] : formData.buocXuLyChucDanhIds, 
                buocXuLyChucVuIds: khongCoChucVu ? [] : formData.buocXuLyChucVuIds, 
                quyTrinhXuLyId:quyTrinhXuLyContext.QuyTrinhXuLyId,
                buocXuLyDonVis: formData.buocXuLyDonVis,
                id})
        } else {
            const formData: UpdateBuocXuLyCommand = await form.validateFields()
            if("cachLayBuocTiep" in formData){
                if(formData.cachLayBuocTiep == "cungDonVi"){
                    formData.cungDonVi = true
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = false
                } else if (formData.cachLayBuocTiep == "cungPhongBan"){
                    formData.cungDonVi = false
                    formData.cungPhongBan = true
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = false
                } else if (formData.cachLayBuocTiep == "layNguoiQuanLy"){
                    formData.cungDonVi = false
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = true
                } else if (formData.cachLayBuocTiep == "layDonViCapTren"){
                    formData.cungDonVi = false
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = true
                    formData.layNguoiQuanLy = false
                } else {
                    formData.cungDonVi = false
                    formData.cungPhongBan = false
                    formData.layDonViCapTren = false
                    formData.layNguoiQuanLy = false
                }
            } else {
                formData.cungDonVi = false
                formData.cungPhongBan = false
                formData.layDonViCapTren = false
                formData.layNguoiQuanLy = false
            }
            
            if(quyTrinhXuLyContext.QuyTrinhXuLyId)
            onChangeNode(quyTrinhXuLyContext.buocXuLyId,{
                ...formData, 
                khongCoChucDanh, 
                khongCoChucVu, 
                quyTrinhXuLyId:quyTrinhXuLyContext.QuyTrinhXuLyId,
                buocXuLyChucDanhIds: khongCoChucDanh ? [] : formData.buocXuLyChucDanhIds, 
                buocXuLyChucVuIds: khongCoChucVu ? [] : formData.buocXuLyChucVuIds, 
                buocXuLyDonVis: formData.buocXuLyDonVis,
            })
        }
        handlerCancel()
    }, [buocxuly])

    useEffect(() => {
        if(nhomNguoiDungs === undefined) {
            dispatch(SearchNhomNguoiDung({pageSize:500}))
        }
    }, [nhomNguoiDungs])

    // useEffect(() => {
    //     (async () => {
    //         if(donVis === undefined) {
    //             const res = await coCauToChucService.Search({
    //                 pageNumber:1,
    //                 pageSize:2000,
    //             })
    //             setDonVis(res.data.data || [])
    //         }
    //     })()
    // }, [donVis])

    useEffect(() => {
        (async () => {
            if(nhomDonVis === undefined) {
                const res = await NhomDonViApi.Search({
                    pageNumber:1,
                    pageSize:2000,
                })
                setNhomDonVis(res.data.data || [])
            }
        })()
    }, [nhomDonVis])
    

    useEffect(() => {
        if(buocXuLyChucDanhs === undefined) {
            dispatch(SearchDanhMuc_ChucDanh({pageSize:500}))
        }
    }, [buocXuLyChucDanhs])

    useEffect(() => {
        if(buocXuLyChucVus === undefined) {
            dispatch(SearchDanhMuc_ChucVu({pageSize:500}))
        }
    }, [buocXuLyChucVus])

    useEffect(() => {
        dispatch(SearchDanhMuc_TrangThaiDanhGia({pageSize:500, laTrangThaiDonVi: laDonVi}))
    }, [])

    // useEffect(() => {
    //         (async () => {
    //             if (danhMucCacCaps === undefined) {
    //                 const res = await danhMucChungApi.Search({type:"CapDanhGia"})
    //                 setDanhMucCacCaps(res.data.data)
    //             }
    //         })()
    //     }, [danhMucCacCaps])

    useEffect(() => {
        (async () => {
            if(quyTrinhXuLyContext.buocXuLyId){
                const { data: {data : nodeData}} = await dispatch(GetBuocXuLy({
                    id: quyTrinhXuLyContext.buocXuLyId,
                    inCludeChucDanh: true,
                    inCludeChucVu: true,
                    inCludeDonVi: true,
                    // inCludeNhomNguoiDung: true,
                    inCludeTrangThaiDanhGia: true,
                })).unwrap()
                if(nodeData){
                    const buocXuLyChucDanhIds = nodeData.chucDanhs?.flatMap(x => x.id)
                    const buocXuLyChucVuIds = nodeData.chucVus?.flatMap(x => x.id)
                    const buocXuLyDonVis = nodeData.donVis?.flatMap(x => x.id)
                    form.setFieldsValue({
                        ...nodeData, 
                        buocXuLyChucDanhIds: nodeData.khongCoChucDanh && !buocXuLyChucDanhIds?.length ? [NULL_VAITRO_VALUE] : buocXuLyChucDanhIds,
                        buocXuLyChucVuIds: nodeData.khongCoChucVu && !buocXuLyChucVuIds?.length ? [NULL_VAITRO_VALUE] : buocXuLyChucVuIds,
                        buocXuLyNhomNguoiDungIds: nodeData.nhomNguoiDungs?.flatMap(x => x.id),
                        trangThaiDanhGiaId: nodeData.trangThaiDanhGia.id,
                        buocXuLyDonVis: buocXuLyDonVis
                    })
                    const cachLayBuocTiep = nodeData.cungDonVi ? "cungDonVi" : nodeData.cungPhongBan ? "cungPhongBan" : nodeData.layDonViCapTren ? "layDonViCapTren" :
                    nodeData.layNguoiQuanLy ? "layNguoiQuanLy" : undefined
                    form.setFieldValue("cachLayBuocTiep" as any, cachLayBuocTiep)
                }
            }
        })()
    }, [quyTrinhXuLyContext.buocXuLyId])

    const buocXuLyChucDanhNullVaiTro = useMemo(() : ChucDanh[] => {
        return [{id: NULL_VAITRO_VALUE, ma: NULL_VAITRO_VALUE, ten: "Không có"} as ChucDanh].concat(buocXuLyChucDanhs || [])
    }, [buocXuLyChucDanhs])

    const buocXuLyChucVuNullVaiTro = useMemo(() : ChucVu[] => {
        return [{id: NULL_VAITRO_VALUE, ma: NULL_VAITRO_VALUE, ten: "Không có"} as ChucVu].concat(buocXuLyChucVus || [])
    }, [buocXuLyChucVus])

    // const danhMucCacCapDropDown = useMemo(() => {
    //     const onChangeCapThucHien : RadioProps["onChange"] = (e) => {
    //         const currentSelectCapThucHien = e.target.value
    //         form.setFieldValue(CAPTHUCHIEN as any, currentSelectCapThucHien)
    //         form.setFieldValue("buocXuLyDonVis", donVis?.filter(x => x.catalog?.toLowerCase() == currentSelectCapThucHien?.toLowerCase()).flatMap(x => x.groupCode))
    //     }
    //     return <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"center"}}>
    //         <Radio.Group onChange={onChangeCapThucHien} value={capThucHien} defaultValue={CAPTHUCHIENDEFAULTVALUE}>
    //             <Radio value={CAPTHUCHIENDEFAULTVALUE} key={capThucHienDefaultKey}>Giá trị gốc</Radio>
    //             {danhMucCacCaps?.map((cataLog, index) => <Radio value={cataLog.code} key={index}>
    //                 {cataLog.tenDanhMuc}
    //             </Radio>)}
    //         </Radio.Group>
    //     </AntdSpace>
    // }, [danhMucCacCaps, capThucHien, capThucHienDefaultKey, donVis])

    return <AntdModal title={`${quyTrinhXuLyContext.buocXuLyId ? "Sửa": "Thêm"} bước quy trình`} onOk={onFinish} okText={"Lưu"}
        cancelText={"Đóng"} visible={true} handlerCancel={handlerCancel} width={1280}>
        <Form name='QuyTrinhXuLy_Addnode'
                layout="vertical" onFinish={onFinish} 
                form={form} 
                requiredMark={quyTrinhXuLyContext.QuyTrinhXuLyId !== null} >
                <Form.Item name={CAPTHUCHIEN} hidden><Input/></Form.Item>
                <Row gutter={[8, 8]}>
                    <Col md={24} span={12}>
                        <Form.Item
                            label="Tên bước"
                            name="tenBuoc"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng nhập tên bước xử lý' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                   
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Nhóm người dùng"
                            name="buocXuLyNhomNguoiDungIds"
                            hasFeedback
                        >
                            <AntdSelect generateOptions={{model: nhomNguoiDungs, label: "ten" , value: "id"}} allowClear showSearch mode="multiple"/>
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Phương thức lấy người xử lý"
                            name="cachLayBuocTiep"
                            hasFeedback
                        >
                            <AntdSelect
                                options={
                                    [
                                        {value: "cungDonVi", label: "Lấy người cùng đơn vị"}, 
                                        {value: "cungPhongBan", label: "Lấy người cùng phòng ban"}, 
                                        {value: "layNguoiQuanLy", label:"lấy người quản lý đơn vị"},
                                        {value: "layDonViCapTren", label:"Lấy người đơn vị cấp trên"}
                                    ]
                                } allowClear showSearch lowerCaseStringValue={false} />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Trạng thái đánh giá"
                            name="trangThaiDanhGiaId"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        >
                            <AntdSelect generateOptions={{model: trangThaiDanhGias, label: "ten" , value: "id"}} allowClear showSearch/>
                        </Form.Item>
                    </Col>
                    <Col md={4} span={24}>
                        <Form.Item
                            label="Thời hạn xử lý (giờ)"
                            name="thoiHanXuLy"
                            hasFeedback
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Chức vụ"
                            name="buocXuLyChucVuIds"
                            hasFeedback
                        >
                            <AntdSelect  generateOptions={{model: buocXuLyChucVuNullVaiTro, label: "ten" , value: "id"}} allowClear showSearch mode="multiple"/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Chức danh"
                            name="buocXuLyChucDanhIds"
                            hasFeedback
                        >
                            <AntdSelect generateOptions={{model: buocXuLyChucDanhNullVaiTro, label: "ten" , value: "id"}} allowClear showSearch mode="multiple"/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Nhóm đơn vị"
                            name="buocXuLyDonVis"
                            hasFeedback
                        >
                            <AntdSelect generateOptions={{model: nhomDonVis, label: "tenNhom" , value: "id"}} allowClear showSearch mode="multiple"/>
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Nhóm đơn vị"
                            name="buocXuLyDonVis"
                            hasFeedback
                        >
                             <AntdTreeSelect 
                                listHeight={380}
                                autoClearSearchValue={false}
                                // dropdownRender={(menu) => {
                                //     return <>
                                //     {danhMucCacCapDropDown}
                                //     <>{menu}</>
                                //     </>
                                // }}
                                generateOptions={{model: donVis, key:"id", parentKey: "ofGroupCode", title: "groupName", value: "groupCode"}} 
                                allowClear showSearch treeLine multiple treeDefaultExpandAll treeNodeFilterProp={"title"}
                            maxTagCount={20}/>
                        </Form.Item>
                    </Col> */}
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Là bước đầu tiên"
                            name="laBuocDauTien"
                            valuePropName="checked"     
                            tooltip={"Đánh dấu bước đánh giá đầu tiên"}
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Là bước cuối cùng"
                            name="laBuocCuoiCung"
                            valuePropName="checked"   
                            tooltip={"Đánh dấu bước kết thúc đánh giá"}
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    {/* <Col md={8} span={24}>
                        <Form.Item
                            label="Lấy người cùng đơn vị"
                            name="cungDonVi"
                            valuePropName="checked"     
                            tooltip={"Chỉ lọc người đánh giá tiếp trong cùng đơn vị với phiếu đánh giá"}
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Lấy người cùng phòng ban"
                            name="cungPhongBan"
                            valuePropName="checked"                            
                            tooltip={"Chỉ lọc người đánh giá tiếp trong cùng phòng ban với phiếu đánh giá"}                       
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Lấy người quản lý đơn vị"
                            name="layNguoiQuanLy"
                            valuePropName="checked"                            
                            tooltip={"Lấy người quản lý phòng ban trong cơ cấu tổ chức"}                       
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Lấy người đơn vị cấp trên"
                            name="layDonViCapTren"
                            valuePropName="checked" 
                            tooltip={"Lấy đơn vị cấp trên của đơn vị của người đánh giá"}                       
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col> */}
                </Row>
            </Form>
    </AntdModal>
}