import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { EditOutlined } from "@ant-design/icons"
import { UpdateScreen } from "./modals/UpdateScreen"
// import { updateScreen } from "./modals/SuaScreen"

const COCAUTOCHUC_CONTEXTMENU: AntdMenuProps<never>["items"] = [{
    label: 'Sửa screen',
    key: 'edit',
    icon: <EditOutlined />,
  },]

export const ScreenActionContextMenu = ({top, left, setVisible, id}: {top?:number, left?: number,id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [updateScreenModalVisible, setUpdateScreenModalVisible] = useState(false)
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
            if(!updateScreenModalVisible)
            onCleanUp()
            
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref,updateScreenModalVisible]);
    const onClick: AntdMenuProps<never>['onClick'] = (e) => {
        if(e.key == 'edit'){
            setUpdateScreenModalVisible(true)
        } 
    };
    return  <div ref={ref} style={{top, left}} className="context-menu-wrapper">
            <AntdMenu items={COCAUTOCHUC_CONTEXTMENU} mode="vertical" onClick={onClick}/>
            {updateScreenModalVisible? <UpdateScreen handlerClose={() => {
              setUpdateScreenModalVisible(false)
              onCleanUp()
            }} folderId={id}/> : <></>} 
        </div>

   
}