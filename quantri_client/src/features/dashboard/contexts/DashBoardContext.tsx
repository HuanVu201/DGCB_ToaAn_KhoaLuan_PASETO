import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DashBoardContext = createContext<IDashBoardContext | null>(null);

export interface IDashBoardContext {
  DashBoardId: string | undefined;
  setDashBoardId: React.Dispatch<React.SetStateAction<string | undefined>>;
  DashBoardModalVisible: boolean;
  setDashBoardModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  DashBoardMaDonVi: string | undefined;
  setDashBoardMaDonVi: React.Dispatch<React.SetStateAction<string | undefined>>;

  DashBoardKyDanhGia: string | undefined;
  setDashBoardKyDanhGia: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  DashBoardLoaiThoiGian: string | undefined;
  setDashBoardLoaiThoiGian: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  DashBoardNamDanhGia: number | undefined;
  setDashBoardNamDanhGia: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  DashBoardModalListDetailVisible: boolean;
  setDashBoardModalListDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
  DashBoardStatisticNameProperty: string | undefined;
  setDashBoardStatisticNameProperty: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const useDashBoardContext = () => {
  const context = useContext(DashBoardContext);
  if (!context)
    throw new Error(
      "DashBoardContext must be used inside DashBoardContext.Provider"
    );
  return context;
};

export const DashBoardProvider = ({ children }: IWithChildren) => {
    
  const [DashBoardId, setDashBoardId] = useState<string>();
  const [DashBoardModalVisible, setDashBoardModalVisible] =
    useState<boolean>(false);
  const [DashBoardMaDonVi, setDashBoardMaDonVi] = useState<string>();
  const [DashBoardKyDanhGia, setDashBoardKyDanhGia] = useState<string>();
  const [DashBoardLoaiThoiGian, setDashBoardLoaiThoiGian] = useState<string>();
  const [DashBoardNamDanhGia, setDashBoardNamDanhGia] = useState<number>();
  const [DashBoardModalListDetailVisible, setDashBoardModalListDetailVisible] = useState<boolean>(false);
  const [DashBoardStatisticNameProperty, setDashBoardStatisticNameProperty] = useState<string>();

  // thêm các hàm search cho các tabs ở đây
  return (
    <DashBoardContext.Provider
      value={{
        DashBoardId,
        setDashBoardId,
        DashBoardModalVisible,
        setDashBoardModalVisible,
        DashBoardMaDonVi,
        setDashBoardMaDonVi,
        DashBoardKyDanhGia,
        setDashBoardKyDanhGia,
        DashBoardLoaiThoiGian,
        setDashBoardLoaiThoiGian,
        DashBoardNamDanhGia,
        setDashBoardNamDanhGia,
        DashBoardModalListDetailVisible,
        setDashBoardModalListDetailVisible,
        DashBoardStatisticNameProperty,
        setDashBoardStatisticNameProperty,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};
