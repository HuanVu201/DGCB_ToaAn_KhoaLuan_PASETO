import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { useClickOutSide } from "@/hooks/useClickOutSide"
import { useFolderContext } from "@/contexts/FolderContext"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { SuaVaiTro } from "./modal/SuaVaiTro"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { DeleteVaiTro } from "../redux/action"
import { useVaiTroModalContext } from "../contexts/VaiTroModalContext"
import { XoaVaiTro } from "./modal/XoaVaiTro"

const VAITRO_CONTEXTMENU: AntdMenuProps<never>["items"] = [
  {
    label: 'Chỉnh sửa vai trò',
    key: 'edit',
    icon: <EditOutlined />,
  },
  {
    label: 'Xóa vai trò',
    key: 'delete',
    icon: <DeleteOutlined />,
  },
]

export const VaiTroContextMenu = ({ top, left, setVisible, id }: { top?: number, left?: number, id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [xoaVaiTroModalVisible, setXoaVaiTroModalVisible] = useState(false)
  const [suaVaiTroModalVisible, setSuaVaiTroModalVisible] = useState(false)
  const onCleanUp = useCallback(() => {

    setVisible(false)

  }, [])
  // console.log(id);

  // useClickOutSide(ref, () => onCleanUp())
  useEffect(() => {

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {

      if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
        if (!xoaVaiTroModalVisible && !suaVaiTroModalVisible)
          onCleanUp()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, xoaVaiTroModalVisible,suaVaiTroModalVisible]);
  const onClick: AntdMenuProps<never>['onClick'] = (e) => {

    if (e.key == 'delete') {
      setXoaVaiTroModalVisible(true)
    }
    
    else if (e.key == 'edit') {
      setSuaVaiTroModalVisible(true)
    }
    // setVisible(false)
  };
  return <div ref={ref} style={{ top, left }} className="context-menu-wrapper">
    <AntdMenu items={VAITRO_CONTEXTMENU} mode="vertical" onClick={onClick} />
    {xoaVaiTroModalVisible ? <XoaVaiTro visible={xoaVaiTroModalVisible} handlerClose={() => setXoaVaiTroModalVisible(false)} id={id} /> : <></>}
    {suaVaiTroModalVisible ? <SuaVaiTro visible={suaVaiTroModalVisible} handlerClose={() => setSuaVaiTroModalVisible(false)} folderId={id} /> : <></>}
  </div>


}