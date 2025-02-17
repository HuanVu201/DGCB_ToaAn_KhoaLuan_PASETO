import { IBaseExt } from "@/models"
import { Tree, TreeProps } from "antd"
import { AntdDirectoryTree } from "./DirctoryTree"
import { useTreeData } from "./hooks/useTreeData"

export interface AntdTreeProps<IModel> extends TreeProps {
    generateTree?: {
        data: IModel[] | undefined,
        key?: keyof IModel,
        title: keyof IModel,
        parentId: keyof IModel,
        point?: keyof IModel,
        id?: keyof IModel
        type?: "flat" | "tree"
    }
}

export const AntdTree = <IModel extends IBaseExt>(props: AntdTreeProps<IModel>) => {
    const {generateTree, ...rest} = props
    const treeData = useTreeData({generateTree})
  return (
    <Tree {...rest} treeData={treeData}>

    </Tree>
  )
}

AntdTree.AntdDirectoryTree = AntdDirectoryTree 