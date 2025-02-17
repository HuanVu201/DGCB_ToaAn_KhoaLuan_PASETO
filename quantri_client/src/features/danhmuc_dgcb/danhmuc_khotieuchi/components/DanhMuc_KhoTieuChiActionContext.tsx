import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { EditOutlined, FolderAddOutlined,DeleteOutlined } from "@ant-design/icons"
import { ThemDanhMuc_KhoTieuChiCon } from "./modals/ThemDanhMuc_KhoTieuChiCon"
import { XoaDanhMuc_KhoTieuChi } from "./modals/XoaDanhMuc_KhoTieuChi";
import { SuaDanhMuc_KhoTieuChiCon } from "./modals/SuaDanhMuc_KhoTieuChiConCon";
import { useAppSelector } from "@/lib/redux/Hooks";
import { DiemLietProvider } from "../../tieuchidanhgia/contexts/DiemLietContext";
// import { UpdateDanhMuc_KhoTieuChi } from "./modals/UpdateDanhMuc_KhoTieuChi"
// import { updateDanhMuc_KhoTieuChi } from "./modals/SuaDanhMuc_KhoTieuChi"

const LstButton_ConText: AntdMenuProps<never>["items"] = [
  {
    label: 'Thêm tiêu chí con',
    key: 'add',
    icon: <FolderAddOutlined/>,
  },
  {
    label: 'Sửa tiêu chí ',
    key: 'edit',
    icon: <EditOutlined />,
  },
  {
    label: 'Xóa tiêu chí ',
    key: 'delete',
    icon: <DeleteOutlined />, // Thêm icon cho mục xóa
  },
];

const LstButton_ConTextofParrent: AntdMenuProps<never>["items"] = [
  {
    label: 'Thêm tiêu chí con ',
    key: 'add',
    icon: <FolderAddOutlined />,
  },
  {
    label: 'Sửa tiêu chí ',
    key: 'edit',
    icon: <EditOutlined />,
  },
  {
    label: 'Xóa tiêu chí ',
    key: 'delete',
    icon: <DeleteOutlined />, // Thêm icon cho mục xóa
  },
];
export const DanhMuc_KhoTieuChiActionContextDanhMuc_KhoTieuChi = ({top, left, setVisible, id}: {top?:number, left?: number,id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [showContextMenu, setShowContextMenu] = useState(true);
    const [updateDanhMuc_KhoTieuChiModalVisible, setUpdateDanhMuc_KhoTieuChiModalVisible] = useState(false)
    const [deleteDanhMuc_KhoTieuChiModalVisible, setDeleteDanhMuc_KhoTieuChiModalVisible] = useState(false)
    const [addDanhMuc_KhoTieuChiModalVisible, setAddDanhMuc_KhoTieuChiModalVisible] = useState(false)
    const [addDanhMuc_KhoTieuChiOfKhoTieuChiModalVisible, setAddDanhMuc_KhoTieuChiOfKhoTieuChiModalVisible] = useState(false)
    const {datas: danhmuc_khotieuchis} = useAppSelector(state => state.danhmuc_khotieuchi);
   
    useEffect(() => {
      const Item = danhmuc_khotieuchis?.find(item => item.id == id);
      if(Item?.parrentCode == null)
      {
        setShowContextMenu(false);
      }
    },[id])
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
            if(!addDanhMuc_KhoTieuChiModalVisible && !updateDanhMuc_KhoTieuChiModalVisible && !deleteDanhMuc_KhoTieuChiModalVisible && !addDanhMuc_KhoTieuChiOfKhoTieuChiModalVisible)
            onCleanUp()
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref,addDanhMuc_KhoTieuChiModalVisible,updateDanhMuc_KhoTieuChiModalVisible, deleteDanhMuc_KhoTieuChiModalVisible,addDanhMuc_KhoTieuChiOfKhoTieuChiModalVisible]);
    const onClick: AntdMenuProps<never>['onClick'] = (e) => {
        if(e.key == 'edit'){
            setUpdateDanhMuc_KhoTieuChiModalVisible(true)
        } 
        if (e.key == 'delete') {
          setDeleteDanhMuc_KhoTieuChiModalVisible(true)
        }
        if (e.key == 'add') {
          setAddDanhMuc_KhoTieuChiModalVisible(true)
        }
        if (e.key == 'add-kho') {
          setAddDanhMuc_KhoTieuChiOfKhoTieuChiModalVisible(true)
        }
    };
    return <>
    <DiemLietProvider>
     <div ref={ref} style={{top, left}} className="context-menu-wrapper">
      {showContextMenu ? <><AntdMenu items={LstButton_ConText} mode="vertical" onClick={onClick}/></> 
       :<><AntdMenu items={LstButton_ConTextofParrent} mode="vertical" onClick={onClick}/></>}
            

            {updateDanhMuc_KhoTieuChiModalVisible? <SuaDanhMuc_KhoTieuChiCon handlerClose={() => {
              setUpdateDanhMuc_KhoTieuChiModalVisible(false)
              onCleanUp()
            }} folderId={id} visible = {updateDanhMuc_KhoTieuChiModalVisible}/> : <></>} 

{deleteDanhMuc_KhoTieuChiModalVisible ? <XoaDanhMuc_KhoTieuChi handleCancel={() => {
      setDeleteDanhMuc_KhoTieuChiModalVisible(false)
      onCleanUp()
    }} folderId={id} /> : <></>}
    
    {addDanhMuc_KhoTieuChiModalVisible ? <ThemDanhMuc_KhoTieuChiCon handlerClose={() => {
      setAddDanhMuc_KhoTieuChiModalVisible(false)
      onCleanUp()
    }} folderId={id} visible={addDanhMuc_KhoTieuChiModalVisible} /> : <></>}
        </div>
    </DiemLietProvider>
    </>
}