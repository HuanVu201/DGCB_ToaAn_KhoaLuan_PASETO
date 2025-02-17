import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { EditOutlined, FolderAddOutlined } from "@ant-design/icons"
//import { ThemKenhTinCon } from "@/features/portaldvc_admin/kenhtin/components/modals/ThemKenhTinCon"
import { ThemMenuCon } from "./modals/ThemMenuCon"
// import { UpdateMenu } from "./modals/UpdateMenu"
// import { updateMenu } from "./modals/SuaMenu"

const COCAUTOCHUC_CONTEXTMENU: AntdMenuProps<never>["items"] = [{
    label: 'Thêm Menu con',
    key: 'add',
    icon: <FolderAddOutlined />,
  },]

export const MenuActionContextMenu = ({top, left, setVisible, id}: {top?:number, left?: number,id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [updateMenuModalVisible, setUpdateMenuModalVisible] = useState(false)
    const onCleanUp = useCallback(() => {
      setVisible(false)
    },[])

    // useClickOutSide(ref, () => onCleanUp())
    useEffect(() => {
       
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
         
          if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
            if(!updateMenuModalVisible)
            onCleanUp()
            
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref,updateMenuModalVisible]);
    const onClick: AntdMenuProps<never>['onClick'] = (e) => {
        if(e.key == 'add'){
            setUpdateMenuModalVisible(true)
        } 
    };
    return  <div ref={ref} style={{top, left}} className="context-menu-wrapper">
            <AntdMenu items={COCAUTOCHUC_CONTEXTMENU} mode="vertical" onClick={onClick}/>
            {updateMenuModalVisible? <ThemMenuCon handlerClose={() => {
              setUpdateMenuModalVisible(false)
              onCleanUp()
            }} folderId={id} visible = {updateMenuModalVisible}/> : <></>} 
        </div>

   
}