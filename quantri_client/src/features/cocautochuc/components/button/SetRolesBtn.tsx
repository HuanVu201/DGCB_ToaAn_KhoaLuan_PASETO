import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
const SetRoles = () => {
  var coCauModalContext = useCoCauModalContext();
  return (
    <Button
      type="primary"
      className="m-2"
      onClick={() =>
        coCauModalContext.SetModalSetRolesVisible(
          !coCauModalContext.modalSetRolesVisible
        )
      }
    >
      Phân quyền
    </Button>
  );
};

export { SetRoles };
