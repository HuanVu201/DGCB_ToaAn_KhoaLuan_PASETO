import { IBaseExt } from "@/models";
import { TreeProps,TreeNodeProps } from "antd";
import { DataNode } from "antd/es/tree";

export const listToTree = <IModel extends IBaseExt & {children?: IBaseExt[], key?: string}>(data: IModel[], title: keyof IModel, parentId: keyof IModel, id: keyof IModel = "id", type : "flat" | "tree" = "tree",point? : keyof IModel
 ) 
:TreeProps["treeData"] => {
  if(type === "flat"){
    return data.map(item => ({ key: item[id], title: item[title]})) as any
  }
    const list = data.map((item) => ({...item, children: []}))
    let map : Record<string, any>= {}
    let node: IModel
    let roots: TreeProps["treeData"]= []
    
    for (let i = 0; i < list.length; i += 1) {
        map[list[i][id] as any] = i; 
        list[i].children = []; 
    }
    for (let i = 0; i < list.length; i += 1) {
        node = list[i];
        const { children } = node
        if (node[parentId] !== null) {
            list[map[node[parentId] as any]]?.children?.push({ key: node[id],title: point && node[point] !== undefined ? `${node[title]} (${node[point]} điểm)` : node[title], children, dataRef: {...node,children:[]} } as any);
        } else {
            roots.push({ key: node[id],title: point && node[point] !== undefined ? `${node[title]} (${node[point]} điểm)` : node[title] ,dataRef: {...node,children:[]} , children: children } as any);
        }
    }
    
    if(list.length && !roots.length)
      return list as any;
    return roots;
}

// export const listToTree = <IModel extends IBaseExt & {children?: IBaseExt[], key?: string}>(data: IModel[], title: keyof IModel, key: keyof IModel, parentKey: keyof IModel, id:any= "" ) 
//  :TreeProps["treeData"] => {
//     let tmp: TreeProps["treeData"]= [];
//      tmp = data
//     .filter(x=>x[parentKey] == id)
//     .map(node=>{

//         return {
//             id: node['id'],
//             key: node[key],
//             title: node[title],
//             children: listToTree(data,title,key,parentKey, node[key])
//         }
//     }) as TreeProps["treeData"];
//     // console.log(tmp);
//   return tmp;
   
// }

export const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    //truyền key lớp 1
    
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children?.length) {
  
        if (node.children.some((item) => item.key === key)) { //kiểm tra children keys có bằng key lớp 1 k => đéo thể xảy ra
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) { // nhảy vào đây => 
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };