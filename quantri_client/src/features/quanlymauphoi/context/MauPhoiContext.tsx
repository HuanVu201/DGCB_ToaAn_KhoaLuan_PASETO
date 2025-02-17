import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const MauPhoiContext = createContext<IMauPhoiContext | null>(null)

export interface IMauPhoiContext {
    mauPhoiId: string | undefined;
    setMauPhoiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    loaiMauPhoiId: string | undefined;
    setLoaiMauPhoiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    mauPhoiModalVisible: boolean;
    setMauPhoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loaiMauPhoiModalVisible: boolean;
    setLoaiMauPhoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useMauPhoiContext = () => {
    const context = useContext(MauPhoiContext)
    if (!context)
        throw new Error("MauPhoiContext must be used inside MauPhoiContext.Provider")
    return context
}

export const MauPhoiProvider = ({ children }: IWithChildren) => {
    const [mauPhoiId, setMauPhoiId] = useState<string>()
    const [loaiMauPhoiId, setLoaiMauPhoiId] = useState<string>()
    const [mauPhoiModalVisible, setMauPhoiModalVisible] = useState<boolean>(false)
    const [loaiMauPhoiModalVisible, setLoaiMauPhoiModalVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    return <MauPhoiContext.Provider value={{
        mauPhoiId, setMauPhoiId,
        loaiMauPhoiId, setLoaiMauPhoiId,
        mauPhoiModalVisible, setMauPhoiModalVisible,
        loaiMauPhoiModalVisible, setLoaiMauPhoiModalVisible,
        loading, setLoading,
        reload, setReload
    }}>
        {children}
    </MauPhoiContext.Provider>
}