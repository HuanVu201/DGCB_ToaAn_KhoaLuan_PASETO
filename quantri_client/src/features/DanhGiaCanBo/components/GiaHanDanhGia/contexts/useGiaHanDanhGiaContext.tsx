import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IUserDanhGia } from "../../common/models";

const GiaHanDanhGiaContext = createContext<IGiaHanDanhGiaContext | null>(null);

export interface IGiaHanDanhGiaContext {
    giaHanId: string | undefined;
    setGiaHanId: React.Dispatch<React.SetStateAction<string | undefined>>;

    selectedGiaHans: React.Key[];
    setSelectedGiaHans: React.Dispatch<React.SetStateAction<React.Key[]>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    readOnlyGiaHanModalVisible: boolean; // readonly
    setReadOnlyGiaHanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    giaHanModalVisible: boolean;
    setGiaHanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    xuLyGiaHanModalVisible: boolean;
    setXuLyGiaHanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    guiGiaHanModalVisible: boolean;
    setGuiGiaHanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    duyetGiaHanModalVisible: boolean;
    setDuyetGiaHanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;


}


export const useGiaHanDanhGiaContext = () => {
    const context = useContext(GiaHanDanhGiaContext);
    if (!context)
        throw new Error(
            "GiaHanDanhGiaContext must be used inside GiaHanDanhGiaContext.Provider"
        );
    return context;
};
export const GiaHanDanhGiaProvider = ({ children }: IWithChildren) => {
    const [giaHanId, setGiaHanId] = useState<string>()
    const [selectedGiaHans, setSelectedGiaHans] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [readOnlyGiaHanModalVisible, setReadOnlyGiaHanModalVisible] = useState<boolean>(false)
    const [giaHanModalVisible, setGiaHanModalVisible] = useState<boolean>(false)
    const [xuLyGiaHanModalVisible, setXuLyGiaHanModalVisible] = useState<boolean>(false)
    const [guiGiaHanModalVisible, setGuiGiaHanModalVisible] = useState<boolean>(false)
    const [duyetGiaHanModalVisible, setDuyetGiaHanModalVisible] = useState<boolean>(false)

    return (
        <GiaHanDanhGiaContext.Provider
            value={{
                giaHanId, setGiaHanId,
                selectedGiaHans, setSelectedGiaHans,
                loading, setLoading,
                reload, setReload,
                readOnlyGiaHanModalVisible, setReadOnlyGiaHanModalVisible,
                giaHanModalVisible, setGiaHanModalVisible,
                xuLyGiaHanModalVisible, setXuLyGiaHanModalVisible,
                guiGiaHanModalVisible, setGuiGiaHanModalVisible,
                duyetGiaHanModalVisible, setDuyetGiaHanModalVisible
            }}
        >
            {children}
        </GiaHanDanhGiaContext.Provider>
    );
};
