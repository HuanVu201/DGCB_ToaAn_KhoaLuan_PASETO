import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
const DongBoBtn = () => {
  var coCauModalContext = useCoCauModalContext();
  return (
    <Button
      type="primary"
      className="m-2"
      // onClick={() =>
      //   // coCauModalContext.SetModalSetRolesVisible(
      //   //   !coCauModalContext.modalSetRolesVisible
      //   // )
      // }
    >
      Đồng bộ cơ cấu 
    </Button>
  );
};

export { DongBoBtn };
