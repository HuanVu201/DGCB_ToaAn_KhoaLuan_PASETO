import React from "react";
import { AntdLayout, AntdModal } from "../../lib/antd/components";

import { Outlet } from "react-router-dom";

// import AntdBothLayout from '@/lib/antd/components/BothLayout/Layout'

export const MasterLayout = () => {
  return (
    <AntdLayout>
      <Outlet />
    </AntdLayout>
  );
};
