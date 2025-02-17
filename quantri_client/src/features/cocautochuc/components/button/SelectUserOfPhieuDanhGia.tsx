import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
const SelesctUserOfPhieuDanhGia = () => {
  var coCauModalContext = useCoCauModalContext();
  return (
    <Button
      type="primary"
      className="m-2"
      onClick={() => {
        coCauModalContext.setSelectedUser(undefined);
        coCauModalContext.setModalAddCaNhanOfPhieuDanhGiaVisible(
            !coCauModalContext.modalAddCaNhanOfPhieuDanhGiaVisible
          )
      }}
    >
      Thêm người dùng
    </Button>
  );
};

export { SelesctUserOfPhieuDanhGia };
