import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";

interface IMainContext {
  userInfoModalVisible: boolean;
  setUserInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  changePasswordModalVisible: boolean;
  setChangePasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  quanLyTaiNguyenModalVisible: boolean;
  setQuanLyTaiNguyenModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  chuyenVaiTroModal: boolean;
  setChuyenVaiTroModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const MaintContext = createContext<IMainContext | null>(null);
export const useMainContext = () => {
  const context = useContext(MaintContext);
  if (!context)
    throw new Error("MaintContext must be used inside MaintContext.Provider");
  return context;
};
export const MainContextProvider = ({ children }: IWithChildren) => {
  const [userInfoModalVisible, setUserInfoModalVisible] =
    useState<boolean>(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState<boolean>(false);
  const [quanLyTaiNguyenModalVisible, setQuanLyTaiNguyenModalVisible] =
    useState<boolean>(false);
  const [chuyenVaiTroModal, setChuyenVaiTroModal] =
    useState<boolean>(false);
  return (
    <MaintContext.Provider
      value={{
        chuyenVaiTroModal,
        setChuyenVaiTroModal,
        quanLyTaiNguyenModalVisible,
        setQuanLyTaiNguyenModalVisible,
        userInfoModalVisible,
        setUserInfoModalVisible,
        changePasswordModalVisible,
        setChangePasswordModalVisible,
      }}
    >
      {children}
    </MaintContext.Provider>
  );
};
