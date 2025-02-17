import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { Checkbox, Input, InputNumber, Popconfirm, TableColumnsType, Upload } from 'antd';
import { FormInstance } from 'antd/lib';
import { useAppSelector } from '@/lib/redux/Hooks';

import { Table } from 'antd';
import { AntdButton, AntdSelect, UploadTable } from '@/lib/antd/components';
import { toast } from 'react-toastify';
import { RegularUpload } from '@/lib/antd/components/upload/RegularUpload';
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable';
import { API_VERSION, HOST_PATH_FILE, UPLOADFILE_ENDPOINT } from '@/data';
import { getToken } from '@/lib/axios';
import { callApiAndDisplayFile, callApiAndDownload, getFileName, getFileNameWithFixedLength } from '@/utils';
import { DeleteOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { IDanhGiaColumn, ITieuChiCouple } from '@/features/DanhGiaCanBo/components/common/models/phieuDanhGia';
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext';
import { useReadOnlyDanhGiaContext } from '../contexts/useReadOnlyDanhGiaContext';




export const useMauPhieuReadOnLyDanhGiaColumn = ({
  scorePoint,
  dataSource,
  expandedRowKeys,
  onExpand,

}: {
  scorePoint: string,
  dataSource: IDanhGiaColumn[];
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: IDanhGiaColumn) => void;
}) => {
  const danhGiaContext = useReadOnlyDanhGiaContext()
  const [isPending, startTransition] = useTransition();
  const [selectValues, setSelectValues] = useState<{ [key: string]: number }>({});
  const buttonActionContext = useButtonActionContext()

  const columns: TableColumnsType<IDanhGiaColumn> = useMemo(
    () => {
      const baseColumns: TableColumnsType<IDanhGiaColumn> = [
        {
          title: <div className="text-center"><b>STT</b></div>,
          dataIndex: 'STT',
          key: 'STT',
          align: 'center',
          width: '5%',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
              return null
            return <span className={record.DiemThuong && record.DanhSachTieuChiCon?.length == 0 ? 'diemThuongRow' : record.DiemTru && record.DanhSachTieuChiCon?.length == 0 ? 'diemTruRow' : 'defaultRow'}>
              {text}
            </span>
          },
        },
        {
          title: (
            <div className="text-center">
              <b>Tiêu chí chấm điểm</b><br />
              <span style={{ fontWeight: 400 }}>Cơ cấu điểm: Tổng điểm đạt yêu cầu ({scorePoint ? scorePoint.split('#')[0] : '--'}) -
                <span className="diemThuongRow"> Tổng điểm thưởng ({scorePoint ? scorePoint.split('#')[1] : '--'}) </span> -
                <span className="diemTruRow"> Tổng điểm trừ ({scorePoint ? scorePoint.split('#')[2] : '--'}) </span>
              </span>
            </div>
          ),
          dataIndex: 'TenTieuChi',
          key: 'TenTieuChi',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
              return null
            return < >
              {
                record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 ? (
                  <b className={record.DiemThuong && !record.DiemTru && record.ThangDiem != 0 ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && record.ThangDiem != 0 ? 'diemTruRow' : 'defaultRow'}>{text}</b>
                ) : (
                  <span className={record.DiemThuong && !record.DiemTru && record.ThangDiem != 0 ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && record.ThangDiem != 0 ? 'diemTruRow' : 'defaultRow'}>{text}</span>
                )
              }
            </>
          },
        },
        {
          title: <div className="text-center"><b>Điểm chuẩn</b></div>,
          dataIndex: 'ThangDiem',
          key: 'ThangDiem',
          align: 'center',
          width: '5%',
          render: (text: any, record: IDanhGiaColumn, index: any) => {
            if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
              return null
            return <>
              {
                (record.ThangDiem != 0 && (record.DiemThuong || record.DiemTru)) || (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length <= 0)
                  ?
                  ((record.DiemThuong && record.DiemTru) || (!record.DiemThuong && !record.DiemTru)) && record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0
                    ? null
                    :
                    <div className={record.DiemThuong && !record.DiemTru ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong ? 'diemTruRow' : 'defaultRow'}>
                      {record.DiemTru && !record.DiemThuong ? " - " : record.DiemThuong && !record.DiemTru ? ' + ' : ''} {record.ThangDiem}
                    </div>
                  : null
              }</>
          }
        },
        {
          title: <p style={{ textAlign: 'center' }}>Đơn vị tính</p>,
          dataIndex: 'SoLuong',
          key: 'SoLuong',
          align: 'center',
          width: '5%',
          // style: 'maxWidth: 100px',
          render: (text: string, record: IDanhGiaColumn) => {

            return (
              <span className={record.DiemThuong && !record.DiemTru && !record.DanhSachTieuChiCon?.length ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && !record.DanhSachTieuChiCon?.length ? 'diemTruRow' : 'defaultRow'}>
                {record.DonViTinh}
              </span>
            )
          },
        },
        {
          title: <div className="text-center"><b>Điểm cá nhân tự chấm</b></div>,
          dataIndex: 'DiemTuCham',
          key: 'DiemTuCham',
          align: 'center',
          width: '5%',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.DiemLiet) {
              if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
              return <Checkbox
                checked={record.isChecked}
                disabled={record.JsonDiemLiet ? true : false}
              />
            }
            if (record.DiemThuong && !record.DiemTru)
              return <span className='diemThuongRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemTuCham ?? 0) != 0 && Math.abs(record.DiemTuCham ?? 0) != record.ThangDiem ? 0 : record.DiemTuCham ?? 0}
              </span>
            if (!record.DiemThuong && record.DiemTru)
              return <span className='diemTruRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemTuCham ?? 0) != 0 && Math.abs(record.DiemTuCham ?? 0) != record.ThangDiem ? 0 : record.DiemTuCham ?? 0}
              </span>
            return <span className='defaultRow'> {record.DiemTuCham ?? 0} </span>
          },
        },

      ]
      if (danhGiaContext.thongTinPhieuChamDiem?.diemNhanXet) {
        baseColumns.push({
          title: <div className="text-center"><b>Điểm lãnh đạo trực tiếp chấm</b></div>,
          dataIndex: 'DiemNhanXet',
          key: 'DiemNhanXet',
          align: 'center',
          width: '5%',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.DiemLiet) {
              if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
              return <Checkbox
                checked={record.isCheckedNX}
                disabled={record.JsonDiemLiet ? true : false}
              />
            }
            if (record.DiemThuong && !record.DiemTru)
              return <span className='diemThuongRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemNhanXet ?? 0) != 0 && Math.abs(record.DiemNhanXet ?? 0) != record.ThangDiem ? 0 : record.DiemNhanXet ?? 0}
              </span>
            if (!record.DiemThuong && record.DiemTru)
              return <span className='diemTruRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemNhanXet ?? 0) != 0 && Math.abs(record.DiemNhanXet ?? 0) != record.ThangDiem ? 0 : record.DiemNhanXet ?? 0}
              </span>
            return <span className='defaultRow'> {record.DiemNhanXet ?? 0} </span>
          },
        },)
      }

      if (danhGiaContext.thongTinPhieuChamDiem?.diemThamMuu) {
        baseColumns.push({
          title: <div className="text-center"><b>Điểm Phó thủ trưởng đơn vị chấm</b></div>,
          dataIndex: 'DiemThamMuu',
          key: 'DiemThamMuu',
          align: 'center',
          width: '5%',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.DiemLiet) {
              if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
              return <Checkbox
                checked={record.isCheckedTM}
                disabled={record.JsonDiemLiet ? true : false}
              />
            }
            if (record.DiemThuong && !record.DiemTru)
              return <span className='diemThuongRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemThamMuu ?? 0) != 0 && Math.abs(record.DiemThamMuu ?? 0) != record.ThangDiem ? 0 : record.DiemThamMuu ?? 0}
              </span>
            if (!record.DiemThuong && record.DiemTru)
              return <span className='diemTruRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemThamMuu ?? 0) != 0 && Math.abs(record.DiemThamMuu ?? 0) != record.ThangDiem ? 0 : record.DiemThamMuu ?? 0}
              </span>
            return <span className='defaultRow'> {record.DiemThamMuu ?? 0} </span>
          },
        },)
      }
      if (danhGiaContext.thongTinPhieuChamDiem?.diemLanhDaoDanhGia) {
        baseColumns.push({
          title: <div className="text-center"><b>Điểm Thủ trưởng cơ quan, đơn vị chấm</b></div>,
          dataIndex: 'DiemDanhGia',
          key: 'DiemDanhGia',
          align: 'center',
          width: '5%',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.DiemLiet) {
              if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) return null
              return <Checkbox
                checked={record.isCheckedDG}
                disabled={record.JsonDiemLiet ? true : false}
              />
            }
            if (record.DiemThuong && !record.DiemTru)
              return <span className='diemThuongRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemDanhGia ?? 0) != 0 && Math.abs(record.DiemDanhGia ?? 0) != record.ThangDiem ? 0 : record.DiemDanhGia ?? 0}
              </span>
            if (!record.DiemThuong && record.DiemTru)
              return <span className='diemTruRow'>
                {record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0 && Math.abs(record.DiemDanhGia ?? 0) != 0 && Math.abs(record.DiemDanhGia ?? 0) != record.ThangDiem ? 0 : record.DiemDanhGia ?? 0}
              </span>
            return <span className='defaultRow'> {record.DiemDanhGia ?? 0} </span>
          },
        },)
      }

      baseColumns.push({
        title: <div className="text-center"><b>Lịch sử đánh giá</b></div>,
        dataIndex: 'VetGiaiTrinh',
        key: 'VetGiaiTrinh',
        align: 'center',
        width: '2%',
        render: (text: string, record: IDanhGiaColumn) => {
          if (record.NoiDungGiaiTrinh || record.NoiDungGiaiTrinhNX || record.NoiDungGiaiTrinhTM || record.NoiDungGiaiTrinhDG)
            return (
              <>
                <span className='VetGiaiTrinh' title='Lịch sử đánh giá' style={{ cursor: 'pointer' }}
                  onClick={() => {
                    buttonActionContext.setTieuChiId(record.MaTieuChi)
                    buttonActionContext.setLichSuDanhGiaModalVisible(true)
                  }}
                >
                  <UnorderedListOutlined />
                </span>
              </>
            )
        }
      })

      return baseColumns
    },
    [expandedRowKeys, onExpand, dataSource]
  );

  return columns;
};
