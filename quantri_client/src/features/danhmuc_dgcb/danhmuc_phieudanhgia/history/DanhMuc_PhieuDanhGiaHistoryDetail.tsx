import {
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Upload,
    Button,
  } from "antd";
  import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
  import { useEffect,useState } from "react";
  import {
    AntdButton,
    AntdModal,
    AntdSelect,
    AntdSpace,
    AntdTable,
    AntdUploadPublicFile,
  } from "@/lib/antd/components";
  import {
    AddDanhMuc_PhieuDanhGia,
    GetDanhMuc_PhieuDanhGia,
    SearchDanhMuc_PhieuDanhGiaHistory,
    UpdateDanhMuc_PhieuDanhGia,
  } from "../redux/action";
  import { useDanhMuc_PhieuDanhGiaContext } from "../contexts/DanhMuc_PhieuDanhGiaContext";
  import { resetData } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/slice";
  import Search from "antd/es/transfer/search";
  import { SearchDanhMuc_BoTieuChuan } from "../../danhmuc_botieuchuan/redux/action";
  import { SearchDanhMuc_ChucDanh } from "../../danhmuc_chucdanh/redux/action";
  import { SearchDanhMuc_ChucVu } from "../../danhmuc_chucvu/redux/action";
  import { AntdTreeSelect } from "@/lib/antd/components/select/TreeSelect";
  import { PlusOutlined } from "@ant-design/icons";
  import { toast } from 'react-toastify';
  import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
  import { filterOptions, filterOptionsWithTitle } from "@/utils";
  import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useColumnHistory } from "../hooks/useColumnHistory";
import { ISearchDanhMuc_PhieuDanhGiaHistory } from "../models";
  export const DanhMuc_PhieuDanhGiaHistoryDetail = () => {
    const dispatch = useAppDispatch();
    const danhMuc_PhieuDanhGiaContext = useDanhMuc_PhieuDanhGiaContext();
    const { listHistory: listHistory,data: phieuDanhGia,count} = useAppSelector(state => state.danhmuc_phieudanhgia)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_PhieuDanhGiaHistory>({ pageNumber: 1, pageSize: 1000,mauPhieuDanhGiaId:phieuDanhGia?.id})
    const { columns } = useColumnHistory({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
  
  
    useEffect(() => {
      if (phieuDanhGia?.id) {
        dispatch(
          SearchDanhMuc_PhieuDanhGiaHistory({mauPhieuDanhGiaId:phieuDanhGia?.id}
          )
        );
      }
    }, [phieuDanhGia?.id]);

    const handleCancel = () => {
      dispatch(resetData())
      danhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaHistoryModalVisible(false)
      danhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaId(undefined)
  };
    return (
      <AntdModal
        title={
          danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaId
            ? `Lịch sử thay đổi :  ${phieuDanhGia?.ten}` 
            : ""
        }
        visible={danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaHistoryModalVisible}
        onCancel={handleCancel}
        footer={null}   
      >
        <AntdSpace direction="vertical" style={{width:"100%"}}>
                <AntdTable
                    columns={columns}
                    dataSource={listHistory}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_PhieuDanhGiaHistory(params))}
                />
            </AntdSpace>
      </AntdModal>
    );
  };
  