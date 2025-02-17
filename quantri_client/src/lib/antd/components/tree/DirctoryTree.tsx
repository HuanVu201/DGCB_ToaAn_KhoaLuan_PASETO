import { IBaseExt } from "@/models";
import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { useTreeData } from "./hooks/useTreeData";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext";
export interface AntdDirectoryTreeProps<IModel> extends DirectoryTreeProps {
  treeName?: string;
  generateTree?: {
    data: IModel[] | undefined;
    key?: keyof IModel;
    title: keyof IModel;
    parentId: keyof IModel;
    id?: keyof IModel;
    type?: "flat" | "tree";
    point?: keyof IModel;
  };
  searchParams: string;
  contextMenu?: (
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
    top?: number,
    left?: number,
    dataNode?: any
  ) => React.ReactNode;
}

const { DirectoryTree } = Tree;

export const AntdDirectoryTree = <IModel,>(
  props: AntdDirectoryTreeProps<IModel>
) => {
  const { generateTree, searchParams, contextMenu, ...rest } = props;
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [showContext, setShowContext] = useState(false);
  const [contextData, setContextData] = useState<{
    top: number;
    left: number;
    id: string;
    dataNode?: DataNode;
  }>();
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const treeData = useTreeData({ generateTree } as any);
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const [treeDataFiltered, expandedKeyFilters] = useMemo((): [
    DataNode[] | [],
    React.Key[]
  ] => {
    if (treeData) {
      const newExpandedKeys: React.Key[] = expandedKeys;
      const loop = (data: DataNode[]): DataNode[] =>
        data.map((item) => {
          const strTitle = item.title as string;
          const index = searchParams ? strTitle.toLowerCase().indexOf(searchParams.toLowerCase()) : -1;
          const beforeStr = strTitle?.substring(0, index);
          const afterStr = strTitle?.slice(index + searchParams.length);
          if (index > -1 && searchParams != "") {
            newExpandedKeys.push(item.key);
          }
          const title =
            index > -1 ? (
              <span>
                {beforeStr}
                <span
                  style={{ fontWeight: 500, fontStyle: "italic", color: "red" }}
                >
                  {searchParams}
                </span>
                {afterStr}
              </span>
            ) : (
              <span>{strTitle}</span>
            );
          if (item.children) {
            var tmp = item as any;
            return {
              title,
              key: item.key,
              id: tmp?.dataRef?.id,
              children: loop(item.children),
            };
          }
          return {
            title,
            key: item.key,
            id: tmp?.dataRef?.id,
          };
        });
      const filteredFolder = loop(treeData);

      return [filteredFolder, newExpandedKeys];
    }
    return [[], []];
  }, [searchParams, treeData]);

  useEffect(() => {
    setExpandedKeys(expandedKeyFilters);
    setAutoExpandParent(true);
  }, [expandedKeyFilters]);

  const onRightClick: DirectoryTreeProps["onRightClick"] = ({
    event,
    node,
  }) => {
    const { screenX, screenY} = event;
    var tmp = node as any;
    setContextData({
      top: screenY,
      left: screenX,
      id: tmp.id || (tmp.key as string),
      dataNode: tmp,
    });
    setShowContext(true);
  };

  return (
    <>
      <DirectoryTree
        showLine
        {...rest}
        treeData={treeDataFiltered}
        expandedKeys={expandedKeys as any}
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        onRightClick={onRightClick}
      ></DirectoryTree>
      {showContext && contextData
        ? contextMenu &&
          contextMenu(
            setShowContext,
            contextData.id,
            contextData.top,
            contextData.left,
            contextData
          )
        : null}
    </>
  );
};
