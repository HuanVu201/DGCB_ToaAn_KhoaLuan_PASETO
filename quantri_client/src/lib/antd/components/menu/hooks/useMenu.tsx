import { SelectProps } from "antd";
import React, { useMemo } from "react";
import { IBaseExt } from "@/models";
import { AntdMenuProps } from "../Menu";
import { Link } from "react-router-dom";

// 1d menu // dùng list_to_tree để tạo (n)d menus
export const useMenu = <IModel,>({
  generateMenu,
}: {
  generateMenu: AntdMenuProps<IModel>["generateMenu"];
}) => {
  const menu = useMemo((): AntdMenuProps<IModel>["items"] => {
    if (generateMenu) {
      const { model, label, value, useValueAsLink } = generateMenu;
      return model?.map(
        (x) =>
          ({
            label: useValueAsLink ? (
              <Link to={x[value] as string}>{`${x[label]}`}</Link>
            ) : (
              x[label]
            ),
            key: x[value],
          } as any)
      );
    }
    return undefined;
  }, [generateMenu?.model]);
  return menu;
};
