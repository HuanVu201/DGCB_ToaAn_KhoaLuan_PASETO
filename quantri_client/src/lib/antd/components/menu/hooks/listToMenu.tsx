import { IBaseExt } from "@/models";
import { MenuProps } from "antd";
import { Key } from "antd/es/table/interface";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AntdNestedMenuProps } from "../NestedMenu";
import { ICON_HOLDER, ICON_HOLDER_KEYS } from "@/data";
type MenuItem = Required<MenuProps>["items"][number];
export type NestedMenuParams = {

}


// export const listToMenu2 = <IModel,>(data: IModel[], parentKey: keyof IModel, title: keyof IModel, value: keyof IModel, iconName: keyof IModel, path: keyof IModel): MenuItem[] => {
//   if (!data) return [];
//   const nodeMap: any = {};

//   data.forEach((nodeData) => {
//     const id = nodeData[value] 
//     const parentId = nodeData[parentKey] 
//     const newNode = { 
//       children:  undefined,
//       label: nodeData[title],
//       icon: Object.keys(ICON_HOLDER_KEYS).includes(nodeData[iconName] as string) ? (ICON_HOLDER as any)[nodeData[iconName]] : "",
//       key:nodeData[path] ,
//       title: nodeData[title]
//     };
//     nodeMap[id] = newNode;

//     // không có cha
//     if (parentId !== null && data.findIndex(node => node[value] == parentId) != -1) {
//       const parentNode = nodeMap[parentId];

//       if (parentNode) {
//         // Nếu parentNode không có children, gán children là một mảng trống
//         if (parentNode.children === undefined) {
//           parentNode.children = [];
//         }
//         parentNode.children.push(newNode);
//       } else {
//         const newParentNode = { id: parentId, children: [newNode] };
//         nodeMap[parentId] = newParentNode;
//       }
//     }
//   });
//   // lấy ra các node cha (các node cha này đã có children)
//   const rootNodes = data.filter((x) => 
//     data.findIndex(node => node[value] == x[parentKey]) == -1)
//     .map((node) => nodeMap[node[value]]);
//   console.log(rootNodes);
  
//   return rootNodes;
// }

export const listToMenu = <IModel,>(data: IModel[], parentKey: keyof IModel, title: keyof IModel, value: keyof IModel, iconName: keyof IModel, path: keyof IModel): MenuItem[] => {
  if (!data) return [];
  const list  = data.map((item): IModel & {children?: IModel[]} => ({ ...item, children: [] }))
  let map: Record<string, any> = {}
  let node: IModel 
  let roots: MenuItem[] = []

  for (let i = 0; i < list.length; i += 1) {
    map[list[i][value] as any] = i;
    list[i].children = [];
  }
  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    let children= list[i].children
    const parentExitst = data.findIndex(x => x[value] == node[parentKey]) != -1
    if (node[parentKey] !== null && parentExitst) {
    const childrenHasChild = data.findIndex(x => x[parentKey] == node[value])

      list[map[node[parentKey] as any]]?.children?.push({
        children: childrenHasChild != -1 ? children : undefined,
        label: node[title],
        icon: Object.keys(ICON_HOLDER_KEYS).includes(node[iconName] as string) ? (ICON_HOLDER as any)[node[iconName]] : "",
        key:node[path] ,
        title: node[title],
      } as any);
    } else {
      roots.push({
        children: children,
        label: node[title],
        icon: Object.keys(ICON_HOLDER_KEYS).includes(node[iconName] as string) ? (ICON_HOLDER as any)[node[iconName]] : "",
        key:node[path] ,
        title: node[title]
      } as any);
    }
  }
  if (list.length && !roots.length)
    return list as any;
  return roots;
}
export const useNestedMenuData = <IModel,>(generateMenu: AntdNestedMenuProps<IModel>["generateMenu"] | undefined) => {
  const menuData = useMemo(() => {
    if (generateMenu && generateMenu.model) {
      const { model, value, label, iconName, parentKey, path } = generateMenu
      return listToMenu(model, parentKey, label, value, iconName, path);
    }
    return undefined
  }, [generateMenu?.model])

  return menuData
}