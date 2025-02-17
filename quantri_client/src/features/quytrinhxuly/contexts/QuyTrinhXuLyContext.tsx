import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const QuyTrinhXuLyContext = createContext<IQuyTrinhXuLyContext | null>(null)

export interface IQuyTrinhXuLyContext{
    laDonVi: boolean;
    QuyTrinhXuLyId: string | undefined;
    setQuyTrinhXuLyId: React.Dispatch<React.SetStateAction<string | undefined>>;
    QuyTrinhXuLyModalVisible: boolean;
    setQuyTrinhXuLyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reactFlowModalVisible: boolean;
    setReactFlowModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  
    addNodeModalVisible: boolean;
    setAddNodeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  
    editStartModalVisible: boolean;
    setEditStartModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  
    edgeId: string | undefined;
    setEdgeId: React.Dispatch<React.SetStateAction<string | undefined>>;
    edgeLabel: string | undefined;
    setEdgeLabel: React.Dispatch<React.SetStateAction<string | undefined>>;
    changeEdgeModalVisible: boolean;
    setChangeEdgeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    buocXuLyId: string | undefined;
    setBuocXuLyId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const useQuyTrinhXuLyContext = () => {
    const context = useContext(QuyTrinhXuLyContext)
    if(!context)
        throw new Error("QuyTrinhXuLyContext must be used inside QuyTrinhXuLyContext.Provider")
    return context
}

export const QuyTrinhXuLyProvider = ({children, laDonVi}: IWithChildren  & {laDonVi: boolean}) => {
    const [QuyTrinhXuLyId, setQuyTrinhXuLyId] = useState<string>()
    const [buocXuLyId, setBuocXuLyId] = useState<string>()
    const [QuyTrinhXuLyModalVisible, setQuyTrinhXuLyModalVisible] = useState<boolean>(false)
    const [reactFlowModalVisible, setReactFlowModalVisible] = useState<boolean>(false)
    const [addNodeModalVisible, setAddNodeModalVisible] =
    useState<boolean>(false);
    const [editStartModalVisible, setEditStartModalVisible] =
        useState<boolean>(false);
    const [edgeId, setEdgeId] = useState<string>();
    const [edgeLabel, setEdgeLabel] = useState<string>();
    const [changeEdgeModalVisible, setChangeEdgeModalVisible] =
    useState<boolean>(false);
    // thêm các hàm search cho các tabs ở đây
    return <QuyTrinhXuLyContext.Provider value={{
        laDonVi,
        buocXuLyId,
        setBuocXuLyId,
        editStartModalVisible,
        setEditStartModalVisible,
        addNodeModalVisible,
        setAddNodeModalVisible,
        edgeId,
        setEdgeId,
        edgeLabel,
        setEdgeLabel,
        changeEdgeModalVisible,
        setChangeEdgeModalVisible,
        reactFlowModalVisible,
        setReactFlowModalVisible,
        QuyTrinhXuLyId, 
        setQuyTrinhXuLyId, 
        QuyTrinhXuLyModalVisible, 
        setQuyTrinhXuLyModalVisible
        }}>
        {children}
    </QuyTrinhXuLyContext.Provider> 
}