import { IBaseExt } from "@/models";
import { Select, SelectProps, TreeProps, TreeSelect, TreeSelectProps } from "antd";
import { useMemo } from "react";
import { useOption } from "./hooks/useOption";
import { DefaultOptionType } from "antd/es/select";
import { TreeNodeProps } from "antd/lib";
import { useTreeData } from "../tree/hooks/useTreeData";
import { listToTree, useTreeSelectData } from "./hooks/useTreeData";

export interface AntdTreeSelectProps<IModel> extends TreeSelectProps {
  generateOptions?: {
    model?: IModel[];
    title: keyof IModel;
    value: keyof IModel;
    parentKey: keyof IModel;
    defaultValue?: any;
    key: keyof IModel;
  };
}

export const AntdTreeSelect = <IModel,>(
  props: AntdTreeSelectProps<IModel>
) => {
  const { generateOptions, ...rest } = props;

  var treeData = useTreeSelectData(generateOptions);
  return (
    <TreeSelect
      treeData={treeData || rest.treeData}
      dropdownStyle={{
        maxHeight: 400,
        overflow: "auto",
      }}
      {...rest}
    />
  );
};
