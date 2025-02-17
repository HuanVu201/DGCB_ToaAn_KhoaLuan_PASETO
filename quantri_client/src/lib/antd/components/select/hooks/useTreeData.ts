import { IBaseExt } from "@/models";
import { TreeProps,TreeNodeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { TreeSelectProps } from "antd/lib";
import { AntdSelectProps } from "../Select";
import { useMemo } from "react";
import { AntdTreeSelectProps } from "../TreeSelect";

export const listToTree = <IModel,>(data: IModel[],parentKey:keyof IModel, title: keyof IModel,value: keyof IModel, defaultValue:any, key: keyof IModel) 
 :TreeSelectProps["treeData"] => {    
    if(!data) return [];
    let tmp: TreeSelectProps["treeData"] = data
    .filter(x=> (x[parentKey] as string)?.toLowerCase() == (defaultValue as string | undefined)?.toLowerCase())
    .map(node=>{
        return {
          id: node[key],
          value: node[value],
          title: node[title],
          children: listToTree(data,parentKey,title,value,node[value],key)
      }
    }) as TreeSelectProps["treeData"];
    // console.log(tmp);
  
  return tmp;
}
export const useTreeSelectData = <IModel,>(generateTree: AntdTreeSelectProps<IModel>["generateOptions"] | undefined) => {
  const treeData = useMemo(() => {
    if(generateTree && generateTree.model){
        const {model,title,value,defaultValue,parentKey,key} = generateTree
        
        
        return listToTree(model, parentKey,title,value,defaultValue, key);
    }
    return undefined
}, [generateTree?.model])

  return treeData
}