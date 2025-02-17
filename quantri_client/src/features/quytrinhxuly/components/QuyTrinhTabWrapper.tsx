import { AntdModal, AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { lazy } from "@/utils/lazyLoading"
import { QuyTrinhXuLyDetail, QuyTrinhXuLyDetailRef } from "./QuyTrinhXuLyDetail";
import { SearchQuyTrinhXuLy } from "@/models/quytrinhxuly";
import { AddNodeModalProps } from "../modals/AddNodeModal";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ReactFlowInnerRef } from "../modals/ReactFlowModal";
import { Spin } from "antd";
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { GetQuyTrinhXuLy } from "../redux/action";
import { resetData } from "@/features/quytrinhxuly/redux/slice";

const ReactFlowModal = lazy(() => import("../modals/ReactFlowModal"))



const QuyTrinhTabWrapper = ({laDonVi, setSearchParams}: {setSearchParams: React.Dispatch<React.SetStateAction<SearchQuyTrinhXuLy>>; laDonVi: AddNodeModalProps["laDonVi"]}) => {
    const quyTrinhDetailRef = useRef<QuyTrinhXuLyDetailRef>(null)
    const reactFlowRef = useRef<ReactFlowInnerRef>(null)
    const quyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const {data: quyTrinhXuLy, loading} = useAppSelector(state => state.quytrinhxulys)
    const [activeTab, setActiceTab] = useState<"detail" | "react-flow">("detail")
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(quyTrinhXuLy === undefined && quyTrinhXuLyContext.QuyTrinhXuLyId){
            (async () => {
                if (quyTrinhXuLyContext.QuyTrinhXuLyId) {
                    dispatch(GetQuyTrinhXuLy(quyTrinhXuLyContext.QuyTrinhXuLyId))
                }
            })()
        }
    }, [quyTrinhXuLyContext.QuyTrinhXuLyId])
    const QuyTrinhTabs: IAntdTabsProps["items"] = [
        {
            label: "Cấu hình bước xử lý",
            key: "react-flow",
            children: <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                <ReactFlowModal laDonVi={laDonVi} ref={reactFlowRef}/>
            </Suspense>,
        },
        {
            label: "Đối tượng sử dụng quy trình",
            key: "detail",
            children: <QuyTrinhXuLyDetail ref={quyTrinhDetailRef} setSearchParams={setSearchParams}/>,
        },
    ];
    const onOkQuyTrinh = async () => {
        await quyTrinhDetailRef.current?.onFinish()
        quyTrinhXuLyContext.setQuyTrinhXuLyModalVisible(false)
        quyTrinhXuLyContext.setReactFlowModalVisible(false)

    }
    
    const afterOpenChange = (open: boolean) => {
        if(open && activeTab == "react-flow"){
            reactFlowRef.current?.updateNodeInternals()
        }
    }
    const handlerCancel = () => {
        reactFlowRef.current?.handlerCancel()
        quyTrinhDetailRef.current?.handlerCancel()
        quyTrinhXuLyContext.setReactFlowModalVisible(false)
        quyTrinhXuLyContext.setQuyTrinhXuLyModalVisible(false)
    }
    return <AntdModal 
        title={quyTrinhXuLy?.tenQuyTrinh} 
        okText={activeTab == "detail" ? "Xác nhận" : null}
        cancelText={activeTab == "detail" ? "Đóng" : null}
        visible={true} 
        footer={activeTab == "detail" ? undefined : null} 
        fullsize 
        confirmLoading={activeTab == "detail" ? loading : undefined}
        onOk={onOkQuyTrinh} afterOpenChange={afterOpenChange}
        handlerCancel={handlerCancel}>
        <AntdTab
            size="small"
            style={{ marginBottom: 32 }}
            type="card"
            items={QuyTrinhTabs}
            activeKey={activeTab}
            onChange={(activeKey) => setActiceTab(activeKey as any)}
        />
    </AntdModal>
}

export default QuyTrinhTabWrapper