// import { AntdButton, AntdModal, AntdSelect, AntdTab, IAntdTabsProps } from "@/lib/antd/components";
// import { Button, Col, Divider, Input, Row, Select, Spin } from "antd";
// import { CaretDownOutlined, FullscreenOutlined, LoadingOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { Form } from "antd"
// import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
// import { useEffect, useState } from "react";
// import { YEAR } from "@/data";
// import { ICoCauToChuc } from "@/features/cocautochuc/models";
// import { coCauToChucService } from "@/features/cocautochuc/services";
// import { toast } from "react-toastify";
// import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
// import { SearchLstUsers } from "@/features/lstusers/redux/action";
// import { IKhieuNaiDanhGia } from "../../model";
// import { useKhieuNaiDanhGiaContext } from "../../contexts/useKhieuNaiKienNghiContext";
// import { KhieuNaiDanhGiaServiceApi } from "../../services";
// import { danhGiaCanBoServiceApi } from "../../../common/service/DanhGiaService";
// import DanhGiaKhieuNaiTableModal from "../DanhGiaKhieuNai/ThemKhieuNaiDanhGia/DanhGiaKhieuNaiTableModal";
// import { useButtonActionContext } from "../../../common/contexts/useButtonActionContext";
// import ThemDanhGiaKhieuNaiDetailModal from "../DanhGiaKhieuNai/ThemKhieuNaiDanhGia/ThemDanhGiaKhieuNaiDetailModal";

// const KhieuNaiKhienNghiModalVisible = () => {
//     const { parseToken } = useAppSelector((state) => state.auth);
//     const [form] = Form.useForm<IKhieuNaiDanhGia>()
//     const khieuNaiContext = useKhieuNaiDanhGiaContext()
//     const buttonActionContext = useButtonActionContext()
//     const [hasKetQua, setHasKetQua] = useState<boolean>(false)
//     const dinhKemKhieuNai = Form.useWatch('dinhKemKhieuNai', form)
//     const dinhKemKetQua = Form.useWatch('dinhKemKetQua', form)

//     useEffect(() => {
//         (async () => {
//             if (khieuNaiContext.khieuNaiId && khieuNaiContext.khieuNaiModalVisible) {
//                 khieuNaiContext.setLoading(true)
//                 const resGetKhieuNai = await KhieuNaiDanhGiaServiceApi.Get(khieuNaiContext.khieuNaiId)
//                 if (resGetKhieuNai.data.data && resGetKhieuNai.data.data.maPhieu) {
//                     form.setFieldsValue({
//                         ...resGetKhieuNai.data.data,
//                     })

//                     buttonActionContext.setDanhGiaId(resGetKhieuNai.data.data.maPhieu)

//                     if (resGetKhieuNai.data.data.ketQua) {
//                         setHasKetQua(true)
//                     }
//                 } else {
//                     toast.error("Không có thông tin khiếu nại, kiến nghị")
//                     handlerCancel()
//                 }

//                 khieuNaiContext.setLoading(false)
//             }
//         })()
//     }, [khieuNaiContext.khieuNaiId, khieuNaiContext.khieuNaiModalVisible])

//     const onFinish = async () => {
//         if (!khieuNaiContext.thongTinPhieuChamDiem?.maPhieu) {
//             toast.error("Không có thông tin đánh giá cần khiếu nại")
//             return
//         }

//         const formData = await form.validateFields()
//         if (!formData.lyDo) {
//             toast.error("Nhập nội dung khiếu nại, kiến nghị")
//             return
//         }

//         if (!formData.dinhKemKhieuNai) {
//             toast.error("Đính kèm nội dung khiếu nại, kiến nghị")
//             return
//         }

//         khieuNaiContext.handlerSaveKhieuNai(formData, handlerCancel)
//     }

//     const handlerCancel = () => {
//         khieuNaiContext.setKhieuNaiId(undefined)
//         khieuNaiContext.setKhieuNaiModalVisible(false)
//         khieuNaiContext.setReadOnlyKhieuNaiModalVisible(false)
//         khieuNaiContext.setDanhGia(undefined)
//         buttonActionContext.setDanhGiaId(undefined)
//         khieuNaiContext.setPhuLucDatas(undefined)
//         khieuNaiContext.setThongTinPhieuChamDiem(undefined)
//         khieuNaiContext.setTrangThaiKhieuNai(undefined)
//         setHasKetQua(false)
//         form.resetFields()
//     }

//     useEffect(() => {
//         if (!buttonActionContext.themKhieuNaiDanhGiaModalVisible &&
//             khieuNaiContext.thongTinPhieuChamDiem && khieuNaiContext.phuLucDatas
//         ) {
//             form.setFieldsValue({ ...khieuNaiContext.thongTinPhieuChamDiem as any })
//         }

//     }, [buttonActionContext.themKhieuNaiDanhGiaModalVisible, khieuNaiContext.thongTinPhieuChamDiem])

//     return <AntdModal className="" visible={khieuNaiContext.khieuNaiModalVisible} title={khieuNaiContext.khieuNaiId ? `Thông tin khiếu nại, kiến nghị kết quả đánh giá` : `Thêm mới khiếu nại, kiến nghị kết quả đánh giá`} width='80vw' handlerCancel={handlerCancel}
//         footer={[
//             <Button
//                 hidden={khieuNaiContext.readOnlyKhieuNaiModalVisible}
//                 type="primary"
//                 onClick={() => onFinish()}
//                 loading={khieuNaiContext.loading}
//                 style={{ backgroundColor: '#34bfa3' }}
//             >
//                 Xác nhận
//             </Button>,
//             <Button key="back" onClick={handlerCancel} loading={khieuNaiContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
//                 Đóng
//             </Button>
//         ]}
//     >
//         <Spin spinning={khieuNaiContext.loading}
//             indicator={<LoadingOutlined spin />}
//         >
//             {khieuNaiContext.readOnlyKhieuNaiModalVisible || buttonActionContext.danhGiaId ? null :
//                 <AntdButton className="DuyetChamDiemButton" icon={<MenuUnfoldOutlined />}
//                     onClick={() => khieuNaiContext.setDanhGiaModalVisible(true)}
//                     style={{ margin: '10px 10px 10px 0' }}
//                 >
//                     Chọn đánh giá khiếu nại
//                 </AntdButton>
//             }
//             {buttonActionContext.danhGiaId
//                 ?
//                 <AntdButton className="XemDanhGiaButton" icon={<FullscreenOutlined />}
//                     onClick={() => buttonActionContext.setThemKhieuNaiDanhGiaModalVisible(true)}
//                     style={{ margin: '10px 10px 10px 0' }}
//                 >
//                     Thông tin phiếu đánh giá
//                 </AntdButton>
//                 : null
//             }
//             <Form name='KhieuNaiKienNghiModal' layout="horizontal" form={form} disabled={khieuNaiContext.readOnlyKhieuNaiModalVisible}>
//                 <div style={{ padding: '0 15px' }}>
//                     {hasKetQua ?
//                         <Divider variant="dotted" style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left" >Nội dung khiếu nại, kiến nghị đánh giá</Divider>
//                         : null}
//                     <Row gutter={[0, 0]}>
//                         <Col span={24} >
//                             <Form.Item
//                                 label="Nội dung khiếu nại"
//                                 name="lyDo"
//                                 labelCol={{ span: 4 }}
//                                 wrapperCol={{ span: 20 }}
//                             >
//                                 <Input.TextArea style={{ width: '100%' }} placeholder="Nhập nội dung khiếu nại, kiến nghị..." />
//                             </Form.Item>
//                         </Col>

//                         <Col span={24} >
//                             <Form.Item
//                                 label="Tài liệu kèm theo"
//                                 name="dinhKemKhieuNai"
//                                 labelCol={{ span: 4 }}
//                                 wrapperCol={{ span: 20 }}
//                             >
//                                 <RegularUpload
//                                     form={form}
//                                     fieldName="dinhKemKhieuNai"
//                                     folderName={`KhieuNaiDanhGia`}
//                                     dinhKem={dinhKemKhieuNai}
//                                     hideUpload={khieuNaiContext.readOnlyKhieuNaiModalVisible}
//                                 />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                 </div>
//                 {!hasKetQua ? null :
//                     <div style={{ padding: '0 15px' }}>
//                         <Divider variant="dotted" style={{ borderColor: '#1677ff', color: '#1677ff' }} orientation="left">Kết quả giải quyết khiếu nại, kiến nghị đánh giá</Divider>
//                         <Row gutter={[0, 0]}>
//                             <Col span={24} >
//                                 <Form.Item
//                                     label="Kết quả khiếu nại"
//                                     name="ketQua"
//                                     labelCol={{ span: 4 }}
//                                     wrapperCol={{ span: 20 }}
//                                 >
//                                     <Input.TextArea style={{ width: '100%' }} placeholder="Nhập lý do..." />
//                                 </Form.Item>
//                             </Col>

//                             <Col span={24} >
//                                 <Form.Item
//                                     label="Kết quả đính kèm"
//                                     name="dinhKemKetQua"
//                                     labelCol={{ span: 4 }}
//                                     wrapperCol={{ span: 20 }}
//                                 >
//                                     <RegularUpload
//                                         form={form}
//                                         fieldName="dinhKemKetQua"
//                                         folderName={`KhieuNaiDanhGia`}
//                                         dinhKem={dinhKemKetQua}
//                                         hideUpload={khieuNaiContext.readOnlyKhieuNaiModalVisible}
//                                     />
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                     </div>
//                 }
//             </Form>
//             <DanhGiaKhieuNaiTableModal />
//             <ThemDanhGiaKhieuNaiDetailModal />
//         </Spin>

//     </AntdModal>
// }
// const KhieuNaiKienNghiModal = () => (
//     <KhieuNaiKhienNghiModalVisible />
// );


// export default KhieuNaiKienNghiModal