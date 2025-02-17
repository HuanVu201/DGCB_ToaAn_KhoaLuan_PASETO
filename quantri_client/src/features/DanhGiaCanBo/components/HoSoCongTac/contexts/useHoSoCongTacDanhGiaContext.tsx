import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoCongTacDanhGiaContext = createContext<IHoSoCongTacDanhGiaContext | null>(null);

export interface IHoSoCongTacDanhGiaContext {
    hoSoId: string | undefined;
    setHoSoId: React.Dispatch<React.SetStateAction<string | undefined>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    hoSoModalVisible: boolean; // readonly
    setHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export const useHoSoCongTacDanhGiaContext = () => {
    const context = useContext(HoSoCongTacDanhGiaContext);
    if (!context)
        throw new Error(
            "HoSoCongTacDanhGiaContext must be used inside HoSoCongTacDanhGiaContext.Provider"
        );
    return context;
};
export const HoSoCongTacDanhGiaProvider = ({ children }: IWithChildren) => {
    const [hoSoId, setHoSoId] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [hoSoModalVisible, setHoSoModalVisible] = useState<boolean>(false)
    return (
        <HoSoCongTacDanhGiaContext.Provider
            value={{
                hoSoId, setHoSoId,
                loading, setLoading,
                reload, setReload,
                hoSoModalVisible, setHoSoModalVisible,

            }}
        >
            {children}
        </HoSoCongTacDanhGiaContext.Provider>
    );
};
