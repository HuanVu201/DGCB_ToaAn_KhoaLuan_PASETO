import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { EditOutlined, FolderAddOutlined,DeleteOutlined } from "@ant-design/icons"
import { ThemTieuChiDanhGiaCon } from "./modals/ThemTieuChiDanhGiaConCon"
import { XoaTieuChiDanhGia } from "./modals/XoaTieuChiDanhGia";
import { SuaTieuChiDanhGiaCon } from "./modals/SuaTieuChiDanhGiaConCon";
import { ThemTieuChiDanhGiaConOfKhoTieuChi } from "./modals/ThemTieuChiDanhGiaConConOfKhoTieuChi";
import { useAppSelector } from "@/lib/redux/Hooks";
import { DiemLiet } from "../diemliet/DiemLiet";
import { DiemLietProvider } from "../contexts/DiemLietContext";
// import { UpdateTieuChiDanhGia } from "./modals/UpdateTieuChiDanhGia"
// import { updateTieuChiDanhGia } from "./modals/SuaTieuChiDanhGia"

const LstButton_ConText: AntdMenuProps<never>["items"] = [
  {
    label: 'Thêm tiêu chí con',
    key: 'add',
    icon: <FolderAddOutlined/>,
  },
  {
    label: 'Thêm tiêu chí từ kho',
    key: 'add-kho',
    icon: <FolderAddOutlined/>,
  },
  // {
  //   label: 'Thêm Tiêu chí từ kho',
  //   key: 'add-kho',
  //   icon: <EditOutlined/>,
  // },
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
    label: 'Thêm tiêu chí từ kho ',
    key: 'add-kho',
    icon: <FolderAddOutlined/>,
  },
];
export const TieuChiDanhGiaActionContextTieuChiDanhGia = ({top, left, setVisible, id}: {top?:number, left?: number,id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [showContextMenu, setShowContextMenu] = useState(true);
    const [updateTieuChiDanhGiaModalVisible, setUpdateTieuChiDanhGiaModalVisible] = useState(false)
    const [deleteTieuChiDanhGiaModalVisible, setDeleteTieuChiDanhGiaModalVisible] = useState(false)
    const [addTieuChiDanhGiaModalVisible, setAddTieuChiDanhGiaModalVisible] = useState(false)
    const [addTieuChiDanhGiaOfKhoTieuChiModalVisible, setAddTieuChiDanhGiaOfKhoTieuChiModalVisible] = useState(false)
    const {danhSachTieuChiDanhGia: tieuchidanhgias} = useAppSelector(state => state.tieuchidanhgia);
   
    useEffect(() => {
      const Item = tieuchidanhgias?.find(item => item.id == id);
      if(Item?.parentCode == null)
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
            if(!addTieuChiDanhGiaModalVisible && !updateTieuChiDanhGiaModalVisible && !deleteTieuChiDanhGiaModalVisible && !addTieuChiDanhGiaOfKhoTieuChiModalVisible)
            onCleanUp()
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref,addTieuChiDanhGiaModalVisible,updateTieuChiDanhGiaModalVisible, deleteTieuChiDanhGiaModalVisible,addTieuChiDanhGiaOfKhoTieuChiModalVisible]);
    const onClick: AntdMenuProps<never>['onClick'] = (e) => {
        if(e.key == 'edit'){
            setUpdateTieuChiDanhGiaModalVisible(true)
        } 
        if (e.key == 'delete') {
          setDeleteTieuChiDanhGiaModalVisible(true)
        }
        if (e.key == 'add') {
          setAddTieuChiDanhGiaModalVisible(true)
        }
        if (e.key == 'add-kho') {
          setAddTieuChiDanhGiaOfKhoTieuChiModalVisible(true)
        }
    };
    return <>
    <DiemLietProvider>
     <div ref={ref} style={{top, left}} className="context-menu-wrapper">
      {showContextMenu ? <><AntdMenu items={LstButton_ConText} mode="vertical" onClick={onClick}/></> 
       :<><AntdMenu items={LstButton_ConTextofParrent} mode="vertical" onClick={onClick}/></>}
            

            {updateTieuChiDanhGiaModalVisible? <SuaTieuChiDanhGiaCon handlerClose={() => {
              setUpdateTieuChiDanhGiaModalVisible(false)
              onCleanUp()
            }} folderId={id} visible = {updateTieuChiDanhGiaModalVisible}/> : <></>} 

{deleteTieuChiDanhGiaModalVisible ? <XoaTieuChiDanhGia handleCancel={() => {
      setDeleteTieuChiDanhGiaModalVisible(false)
      onCleanUp()
    }} folderId={id} /> : <></>}
    
    {addTieuChiDanhGiaModalVisible ? <ThemTieuChiDanhGiaCon handlerClose={() => {
      setAddTieuChiDanhGiaModalVisible(false)
      onCleanUp()
    }} folderId={id} visible={addTieuChiDanhGiaModalVisible} /> : <></>}

{addTieuChiDanhGiaOfKhoTieuChiModalVisible ? <ThemTieuChiDanhGiaConOfKhoTieuChi handlerClose={() => {
      setAddTieuChiDanhGiaOfKhoTieuChiModalVisible(false)
      onCleanUp()
    }} folderId={id} visible={addTieuChiDanhGiaOfKhoTieuChiModalVisible} /> : <></>}
        </div>
    </DiemLietProvider>
    </>
}