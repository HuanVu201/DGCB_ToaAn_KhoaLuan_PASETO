import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ICauHinhBienLaiThanhToan } from "../models";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";

export interface ICoCauModalContext {
  showModalUserCU: { id: string; visible: boolean };
  setShowModalUserCU: React.Dispatch<
    React.SetStateAction<{ id: string; visible: boolean }>
  >; // CU: Create,Update
  modalAddUserVisible: boolean;
  SetModalAddUserVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalSetRolesVisible: boolean;
  SetModalSetRolesVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalAddCaNhanOfPhieuDanhGiaVisible: boolean;
  setModalAddCaNhanOfPhieuDanhGiaVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalAdminResetPassWordVisible: boolean;
  setModalAdminResetPasswordVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  selectedUser: UserGroupResponse | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserGroupResponse | undefined>>;
  modalChuyenNhomVisible: boolean;
  setModalChuyenNhomVisible: React.Dispatch<React.SetStateAction<boolean>>;

  jsonBienLai: string | undefined;
  setJsonBienLai: React.Dispatch<React.SetStateAction<string | undefined>>;
  configBienLaiModalVisible: boolean;
  setConfigBienLaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  role: string | undefined
  setRole: React.Dispatch<React.SetStateAction<string | undefined>>;
  showModalResetPassWorld: boolean;
  setShowModalReSetPassWorld: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoCauModalContext = createContext<ICoCauModalContext | null>(null);

export const useCoCauModalContext = () => {
  const context = useContext(CoCauModalContext);
  if (!context) throw new Error("coCauModalContext must be used in ");
  return context;
};

export const CoCauModalProvider = ({ children }: IWithChildren) => {
  const [showModalUserCU, setShowModalUserCU] = useState<{
    id: string;
    visible: boolean;
  }>({ id: "", visible: false });
  const [selectedUser, setSelectedUser] = useState<UserGroupResponse>();
  const [modalAddUserVisible, SetModalAddUserVisible] = useState(false);
  const [showModalResetPassWorld, setShowModalReSetPassWorld] = useState(false);
  const [modalSetRolesVisible, SetModalSetRolesVisible] = useState(false);
  const [modalAdminResetPassWordVisible, setModalAdminResetPasswordVisible] =
    useState(false);
  const [modalChuyenNhomVisible, setModalChuyenNhomVisible] = useState(false);
  const [modalAddCaNhanOfPhieuDanhGiaVisible, setModalAddCaNhanOfPhieuDanhGiaVisible] = useState(false);
  const [jsonBienLai, setJsonBienLai] = useState<string>();
  const [configBienLaiModalVisible, setConfigBienLaiModalVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>();
  return (
    <CoCauModalContext.Provider
      value={{
        showModalUserCU,
        setShowModalUserCU,
        modalAddUserVisible,
        SetModalAddUserVisible,
        modalSetRolesVisible,
        SetModalSetRolesVisible,
        modalAdminResetPassWordVisible,
        setModalAdminResetPasswordVisible,
        selectedUser,
        setSelectedUser,
        modalChuyenNhomVisible,
        setModalChuyenNhomVisible,
        jsonBienLai, setJsonBienLai,
        configBienLaiModalVisible, setConfigBienLaiModalVisible,
        role, setRole,
        modalAddCaNhanOfPhieuDanhGiaVisible,setModalAddCaNhanOfPhieuDanhGiaVisible,
        showModalResetPassWorld,setShowModalReSetPassWorld
      }}
    >
      {children}
    </CoCauModalContext.Provider>
  );
};
