import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
const AddUser = () => {
  var coCauModalContext = useCoCauModalContext();
  return (
    <Button
      type="primary"
      className="m-2"
      onClick={() => {
        coCauModalContext.setSelectedUser(undefined);
        coCauModalContext.SetModalAddUserVisible(
          !coCauModalContext.modalAddUserVisible
        );
      }}
    >
      Thêm tài khoản
    </Button>
  );
};

export { AddUser };
