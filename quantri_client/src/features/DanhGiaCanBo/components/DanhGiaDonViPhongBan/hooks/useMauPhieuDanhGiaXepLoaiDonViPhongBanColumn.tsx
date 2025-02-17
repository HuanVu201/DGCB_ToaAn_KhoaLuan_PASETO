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
import { DeleteOutlined, PlusOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { IDanhGiaColumn, ITieuChiCouple } from '@/features/DanhGiaCanBo/components/common/models/phieuDanhGia';
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext';
import { useDanhGiaXepLoaiDonViPhongBanContext } from '../contexts/useDanhGiaXepLoaiDonViPhongBanContext';

const updateParentScores = (data: IDanhGiaColumn[]): IDanhGiaColumn[] => {
  const updateScore = (item: IDanhGiaColumn): number => {
    if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
      const childrenSum = item.DanhSachTieuChiCon.reduce((sum, child) => sum + updateScore(child), 0);

      if ((!item.DiemThuong && item.DiemTru) || (!item.DiemTru && item.DiemThuong)) {
        // Nếu phần tử có DiemCong hoặc DiemTru, giữ nguyên DiemDanhGia hiện tại
        return item.DiemDanhGia || 0;
      } else {
        // Nếu không, cập nhật DiemNhanXet bằng tổng điểm của các phần tử con
        item.DiemDanhGia = childrenSum;
        return childrenSum;
      }
    }
    return item.DiemDanhGia || 0;
  };

  data.forEach(updateScore);
  return data;
};


export const useMauPhieuDanhGiaXepLoaiDonViPhongBanColumn = ({
  dataRoot,
  scorePoint,
  dataSource,
  setDataSource,
  expandedRowKeys,
  onExpand,
  updateData,
  updatePoint,

}: {
  dataRoot: IDanhGiaColumn,
  scorePoint: string,
  dataSource: IDanhGiaColumn[];
  setDataSource: React.Dispatch<React.SetStateAction<IDanhGiaColumn[]>>;
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: IDanhGiaColumn) => void;
  updateData: (newData: IDanhGiaColumn) => void,
  updatePoint: (totalPoint: number, normalPoint: number, bonusPoint: number, penaltyPoint: number, hasDiemLiet: boolean) => void,
}) => {
  const danhGiaContext = useDanhGiaXepLoaiDonViPhongBanContext()
  const [isPending, startTransition] = useTransition();
  const [selectValues, setSelectValues] = useState<{ [key: string]: number }>({});
  const buttonActionContext = useButtonActionContext()
  const [textValues, setTextValues] = useState<{ [key: string]: string }>({});
  const handleTextChange = useCallback((value: string, record: IDanhGiaColumn) => {
    setTextValues(prev => ({
      ...prev,
      [record.MaTieuChi]: value
    }));
  }, []);

  const onRowChangeGiaiTrinh = useCallback((value: any, record: IDanhGiaColumn, colName: keyof IDanhGiaColumn) => {
    startTransition(() => {

      setDataSource((curr) => {
        const updateDataSourse = (items: IDanhGiaColumn[]): IDanhGiaColumn[] => {
          return items.map(item => {
            if (item.MaTieuChi === record.MaTieuChi) {
              let updatedItem = { ...item, [colName]: value }
              if (colName === 'isGiaiTrinhDG')
                updatedItem.isGiaiTrinhDG = value

              return updatedItem
            }
            if (item.DanhSachTieuChiCon) {
              const updatedChildren = updateDataSourse(item.DanhSachTieuChiCon);
              const updatedItem = { ...item, DanhSachTieuChiCon: updatedChildren };
              return updatedItem;
            }
            return item
          })
        }
        const newDataSource = updateDataSourse([...curr])
        updateData({
          ...dataRoot,
          DanhSachTieuChiCon: newDataSource
        })
        return newDataSource;
      })
    })
  }, [])

  useEffect(() => {
    if (danhGiaContext.saoChepDiemHandler) {
      buttonActionContext.setLoading(true)
      if (!dataSource) {
        toast.error('Không có dữ liệu để sao chép điểm')
        danhGiaContext.setSaoChepDiemHandler(false)
        buttonActionContext.setLoading(false)
        return
      }

      function AutoFillHandler(data: IDanhGiaColumn[]) {
        data.forEach(item => {
          const diemAutoFill = danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.diemThamMuu ? item.DiemThamMuu : item.DiemTuCham ?? 0

          if (item.ThangDiem && item.ThangDiem > 0 && diemAutoFill != null && !item.DiemThuong && !item.DiemTru && !item.DiemDanhGia) {
            item.DiemDanhGia = Number(diemAutoFill)
            item.isGiaiTrinhDG = false
          }

          if (!item.DiemDanhGia && ((item.DiemThuong && !item.DiemTru) || (!item.DiemThuong && item.DiemTru)) && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)) {
            item.DiemDanhGia = Number(diemAutoFill)
            item.isGiaiTrinhDG = false
          }

          if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
            AutoFillHandler(item.DanhSachTieuChiCon)
          }
        })
        return updateParentScores(data)
      }

      danhGiaContext.setSaoChepDiemHandler(false)
      buttonActionContext.setLoading(false)
      const data = AutoFillHandler(dataSource)
      updateBonusAndPenaltyPoints(data)
      updateData({
        ...dataRoot,
        DanhSachTieuChiCon: data
      })
    }
  }, [danhGiaContext.saoChepDiemHandler])

  const updateBonusAndPenaltyPoints = useCallback((data: IDanhGiaColumn[]) => {
    let normalPoints = 0;
    let bonusPoints = 0;
    let penaltyPoints = 0;
    let hasDiemLiet = false

    const calculatePoints = (items: IDanhGiaColumn[]) => {
      items.forEach(item => {

        if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
          if ((item.DiemThuong || item.DiemTru) && item.ThangDiem && item.DiemDanhGia && (Math.abs(item.ThangDiem) == Math.abs(item.DiemDanhGia))) {
            if (item.DiemThuong && !item.DiemTru)
              bonusPoints += item.DiemDanhGia || 0
            if (!item.DiemThuong && item.DiemTru)
              penaltyPoints += item.DiemDanhGia || 0
          }
        } else {
          if (item.DiemThuong && !item.DiemTru) {
            bonusPoints += item.DiemDanhGia || 0
          }
          if (item.DiemTru && !item.DiemThuong) {
            penaltyPoints += item.DiemDanhGia || 0
          }
          if (!item.DiemThuong && !item.DiemTru) {
            normalPoints += item.DiemDanhGia || 0
          }
          if (item.DiemLiet && item.isCheckedDG) {
            hasDiemLiet = true
          }

        }

        if (item.DanhSachTieuChiCon) {
          calculatePoints(item.DanhSachTieuChiCon);
        }
      });
    };

    calculatePoints(data);

    updatePoint(
      Number(normalPoints + bonusPoints + penaltyPoints),
      normalPoints,
      bonusPoints,
      penaltyPoints,
      hasDiemLiet
    )

  }, []);



  const onRowChange = useCallback((value: any, record: IDanhGiaColumn, colName: keyof IDanhGiaColumn) => {
    // startTransition(() => {
    if (colName === 'DiemDanhGia') {
      const maxScore = record.ThangDiem || 0;
      value = Math.min(value, maxScore)
    }
    //Xử lý render lại dữ liệu khi OnChange ==========================================================================
    setDataSource((curr) => {
      const updateDataSourse = (items: IDanhGiaColumn[]): IDanhGiaColumn[] => {
        return items.map(item => {

          if (item.MaTieuChi === record.MaTieuChi) {
            let updatedItem = { ...item, [colName]: value }

            const diemAutoFill = danhGiaContext.thongTinPhieuChamDiem && danhGiaContext.thongTinPhieuChamDiem.diemThamMuu ? updatedItem.DiemThamMuu : updatedItem.DiemTuCham

            if (colName === 'SoLuong') {
              updatedItem.DiemDanhGia = (updatedItem.ThangDiem || 0) * (value) * (record.DiemTru ? -1 : 1)
            }

            if (colName === 'isGiaiTrinhDG') {
              updatedItem.isGiaiTrinhDG = value
            } else if (!updatedItem.NoiDungGiaiTrinhDG && !updatedItem.DinhKemDG) {
              if (updatedItem.DuocChamNhieuLan || updatedItem.DiemThuong || updatedItem.DiemTru) {
                updatedItem.isGiaiTrinhDG = updatedItem.DiemDanhGia != diemAutoFill
              } else if (item.DiemLiet)
                updatedItem.isGiaiTrinhDG = updatedItem.isCheckedDG ? updatedItem.isGiaiTrinhDG : false
              else updatedItem.isGiaiTrinhDG = updatedItem.DiemDanhGia != diemAutoFill
            }
            return updatedItem
          }
          if (item.DanhSachTieuChiCon) {
            const updatedChildren = updateDataSourse(item.DanhSachTieuChiCon);
            const updatedItem = { ...item, DanhSachTieuChiCon: updatedChildren };

            // Tính toán DiemNhanXet cho phần tử cha nếu có DiemCong hoặc DiemTru và có danh sách con
            if ((updatedItem.DiemThuong || updatedItem.DiemTru) && updatedChildren.length > 0) {
              const currentSelectValue = Number(selectValues[updatedItem.MaTieuChi])
              const totalChild = updatedChildren.reduce((sum, child) => sum + (child.DiemDanhGia || 0), 0)
              updatedItem.DiemDanhGia = currentSelectValue ? currentSelectValue : Number(totalChild)
            }


            return updatedItem;
          }

          return item
        })
      }
      const newDataSource = updateDataSourse([...curr])

      // Xử lý tiêu chí đối lập ==========================================================================
      const checkChildrenRecursivelyOpposition = (datas: IDanhGiaColumn[], currMaTieuChi?: string) => {
        datas.forEach(item => {
          danhGiaContext.opposeArr?.forEach((opposeItem: ITieuChiCouple) => {
            if (opposeItem.tieuChi1 === currMaTieuChi && item.MaTieuChi === opposeItem.tieuChi2) {
              item.isDisabledDG = value !== 0;
            } else if (opposeItem.tieuChi2 === currMaTieuChi && item.MaTieuChi === opposeItem.tieuChi1) {
              item.isDisabledDG = value !== 0;
            }
          })

          if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
            checkChildrenRecursivelyOpposition(item.DanhSachTieuChiCon, currMaTieuChi)
          }
        })
      }


      // Xử lý tiêu chí điểm liệt ==========================================================================
      const confirmLietArr: ITieuChiCouple[] = []
      const checkToComfirmLieuHandler = () => {
        danhGiaContext.diemLietArr?.forEach((diemLietItem: ITieuChiCouple) => {
          Recursive(newDataSource)

          function Recursive(datas: IDanhGiaColumn[]) {
            datas.forEach(data => {
              if (diemLietItem.tieuChi1 == data.MaTieuChi) {
                if (diemLietItem.soLanTieuChi1 && diemLietItem.soLanTieuChi1 > 0 && data.DiemDanhGia && data.ThangDiem) {
                  if ((data.ThangDiem || 0) * diemLietItem.soLanTieuChi1 <= Math.abs(data.DiemDanhGia || 0)) {
                    confirmLietArr.push(diemLietItem)
                  }
                }
                if (!diemLietItem.soLanTieuChi1 && data.DiemDanhGia && data.DiemDanhGia != 0) {
                  confirmLietArr.push(diemLietItem)
                }
              }

              if (data.DanhSachTieuChiCon && data.DanhSachTieuChiCon.length > 0) {
                Recursive(data.DanhSachTieuChiCon)
              }
            })
          }

        })
      }

      const verifiCheckRecursivelyDiemLiet = (datas: IDanhGiaColumn[], currMaTieuChi?: string) => {
        datas.forEach(item => {
          danhGiaContext.diemLietArr?.forEach((diemLietItem: ITieuChiCouple) => {
            // Row nào liên quan đến điểm liệt này thì reset isCheck = false, sau đó thực hiện kiểm tra tiếp
            if (item.MaTieuChi == diemLietItem.tieuChi2 && diemLietItem.tieuChi1 == currMaTieuChi) {
              item.isCheckedDG = false
            }
          })
          confirmLietArr?.forEach((diemLietItem: ITieuChiCouple) => {
            // Row nào liên quan đến điểm liệt đã lọc thì set lại isCheck  = true
            if (item.MaTieuChi == diemLietItem.tieuChi2) {
              item.isCheckedDG = true
            }
          })

          if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
            verifiCheckRecursivelyDiemLiet(item.DanhSachTieuChiCon, currMaTieuChi)
          }
        })
      }


      if (danhGiaContext.opposeArr)
        checkChildrenRecursivelyOpposition(newDataSource, record.MaTieuChi);

      if (danhGiaContext.diemLietArr) {
        checkToComfirmLieuHandler()
        verifiCheckRecursivelyDiemLiet(newDataSource, record.MaTieuChi);
      }
      const result = updateParentScores(newDataSource);
      updateBonusAndPenaltyPoints(result)
      updateData({
        ...dataRoot,
        DanhSachTieuChiCon: result
      })
      return result;
    })
    // })
  }, [danhGiaContext.opposeArr, danhGiaContext.diemLietArr]);

  const onViewFile = async (fileName: string) => {
    buttonActionContext.setLoading(true)
    await callApiAndDisplayFile(fileName)
    buttonActionContext.setLoading(false)
  }

  const handleSelectChange = (value: number, record: IDanhGiaColumn) => {
    setSelectValues(prev => ({ ...prev, [record.MaTieuChi]: value }));
    onRowChange(value, record, 'DiemDanhGia');
  };

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
                  <span style={{ fontWeight: 500 }} className={record.DiemThuong && !record.DiemTru && record.ThangDiem != 0 ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && record.ThangDiem != 0 ? 'diemTruRow' : 'defaultRow'}>{text}</span>
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
          width: '8%',
          // style: 'maxWidth: 100px',
          render: (text: string, record: IDanhGiaColumn) => {
            if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
              return null
            return (
              <>
                {record.DuocChamNhieuLan ? (
                  <span className={record.DiemThuong && !record.DiemTru && !record.DanhSachTieuChiCon?.length ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && !record.DanhSachTieuChiCon?.length ? 'diemTruRow' : 'defaultRow'}>
                    <InputNumber
                      min={0}
                      max={Number(record.SoLan) || undefined}
                      defaultValue={Number(text) || 0}
                      onChange={(value) => onRowChange(value, record, 'SoLuong')}
                    />
                    {' '}{record.DonViTinh}
                  </span>
                ) : (
                  <span className={record.DiemThuong && !record.DiemTru && !record.DanhSachTieuChiCon?.length ? 'diemThuongRow' : record.DiemTru && !record.DiemThuong && !record.DanhSachTieuChiCon?.length ? 'diemTruRow' : 'defaultRow'}>
                    {record.DonViTinh}
                  </span>
                )}
              </>
            )
          },
        },
        {
          title: <div className="text-center"><b>Điểm đơn vị tự chấm</b></div>,
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

      if (danhGiaContext.thongTinPhieuChamDiem?.diemThamMuu) {
        baseColumns.push({
          title: <div className="text-center"><b>Điểm đơn vị, bộ phận tham mưu</b></div>,
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

      baseColumns.push({
        title: <p style={{ textAlign: 'center' }}>Điểm đánh giá, xếp loại</p>,
        dataIndex: 'DiemDanhGia',
        key: 'DiemDanhGia',
        align: 'center',
        width: '5%',
        render: (text: string, record: IDanhGiaColumn) => {
          if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
            return null
          if (record.ThangDiem != 0) {
            if (record.DuocChamNhieuLan) {
              return (
                <Input disabled value={record.DiemDanhGia} style={{ textAlign: 'center' }} />
              )
            }

            if (record.DiemThuong || record.DiemTru) {
              if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0) {
                if (!((record.DiemThuong && record.DiemTru) || (!record.DiemThuong && !record.DiemTru)))
                  return (<>
                    <Input disabled hidden value={record.DiemDanhGia} />
                    <AntdSelect
                      value={selectValues[record.MaTieuChi] ?? 0}
                      onChange={(value) => {
                        handleSelectChange(value, record)
                        onRowChange(value, record, 'DiemDanhGia')
                      }}
                      options={[
                        { label: '0', value: 0 },
                        {
                          label: `${record.DiemTru ? "-" : record.DiemThuong ? '+' : ''}${record.ThangDiem}`,
                          value: record.DiemTru ? (record.ThangDiem || 0) * (-1) : record.ThangDiem
                        }
                      ]}
                      disabled={record.isDisabledDG}
                    /></>)

              } else {
                return (<>
                  <AntdSelect
                    value={record.DiemDanhGia}
                    onChange={(value) => onRowChange(value, record, 'DiemDanhGia')}
                    options={[
                      { label: '0', value: 0 },
                      {
                        label: `${record.DiemTru ? "-" : record.DiemThuong ? '+' : ''}${record.ThangDiem}`,
                        value: record.DiemTru ? (record.ThangDiem || 0) * (-1) : record.ThangDiem
                      }
                    ]}
                    disabled={record.isDisabledDG}
                  /></>)

              }
            }
            if (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0)
              return (
                <Input disabled value={record.DiemDanhGia} style={{ textAlign: 'center' }} />
              )
            else {
              return (
                <>
                  <Input
                    disabled={record.isDisabledDG || (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length > 0)}
                    value={record.DiemDanhGia} style={{ textAlign: 'center' }}
                    onChange={(e) => onRowChange(Number(e.target.value), record, 'DiemDanhGia')}
                  />
                </>
              )
            }
          }
          else {
            if (record.DiemLiet) {
              if (record.DanhSachTieuChiCon && !(record.DanhSachTieuChiCon.length > 0)) {
                return (<Checkbox
                  checked={record.isCheckedDG}
                  disabled={record.JsonDiemLiet ? true : false}
                  onChange={(e) => {
                    record.isCheckedDG = !record.isCheckedDG
                    onRowChange(e.target.checked ? true : false, record, 'DiemDanhGia')
                  }} />)
              } else return (<></>)
            }
          }
          return <Input disabled value={record.DiemDanhGia} style={{ textAlign: 'center' }} />
        }
      },)

      baseColumns.push({
        title: <p style={{ textAlign: 'center' }}>Giải trình <br /><i style={{ fontWeight: 400 }}>(Nếu có)</i></p>,
        key: "dinhKemDG",
        render: (_, record, idx) => {
          if (record.KiemNhiem && !danhGiaContext.kiemNhiem)
            return null
          return <>
            {(record.ThangDiem != 0 && (record.DiemThuong || record.DiemTru) && !((record.DiemThuong && record.DiemTru) || (!record.DiemThuong && !record.DiemTru))) || (record.DanhSachTieuChiCon && record.DanhSachTieuChiCon.length <= 0)
              ?
              !record.isGiaiTrinhDG
                ?
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                  <div className="addGiaiTrinhBtn" onClick={() => onRowChangeGiaiTrinh(true, record, 'isGiaiTrinhDG')}>
                    <PlusOutlined style={{ marginRight: "5px", fontSize: "14px", color: '#fff' }} />Thêm giải trình
                  </div>
                </div>
                :
                <>
                  <Input.TextArea style={{ width: '100%', marginBottom: 3, textAlign: 'left' }} rows={2}
                    placeholder='Nhập nội dung giải trình...'
                    onChange={(e) => handleTextChange(e.target.value, record)}
                    onMouseLeave={(e: React.MouseEvent<HTMLTextAreaElement>) => {
                      onRowChangeGiaiTrinh((e.target as HTMLTextAreaElement).value, record, 'NoiDungGiaiTrinhDG')
                    }}
                    onBlur={(e) => {
                      onRowChangeGiaiTrinh(e.target.value, record, 'NoiDungGiaiTrinhDG')
                    }}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onRowChangeGiaiTrinh(e.target.value, record, 'NoiDungGiaiTrinhDG')
                      }
                    }}
                    value={textValues[record.MaTieuChi] ?? record.NoiDungGiaiTrinhDG}
                  />
                  {record.DinhKemDG
                    ?
                    <>
                      <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={buttonActionContext.loading} type="link" title={getFileName(record.DinhKemDG || '')} onClick={() => onViewFile(record.DinhKemDG || '')}>
                        <p style={{ fontSize: '0.8rem' }}> {getFileNameWithFixedLength(record.DinhKemDG || '')}</p>

                      </AntdButton>
                      <Popconfirm
                        title='Xoá?'
                        onConfirm={() => {
                          onRowChangeGiaiTrinh(undefined, record, 'DinhKemDG')
                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                      >
                        <DeleteOutlined style={{ color: "tomato" }} />
                      </Popconfirm>
                      <br /></>
                    : null
                  }

                  <Upload
                    name='Files'
                    action={HOST_PATH_FILE + API_VERSION + UPLOADFILE_ENDPOINT} headers={{
                      Authorization: `Bearer ${getToken()}`
                    }}
                    data={{ FolderName: "GiaiTrinh" }}
                    showUploadList={false}
                    maxCount={1}
                    onChange={(info) => {
                      if (info.file.status == "done") {
                        onRowChangeGiaiTrinh(info.file.response.data, record, 'DinhKemDG')
                      }
                    }}>

                    <AntdButton icon={<UploadOutlined />} style={{ border: '1px solid #999' }}>Chọn tệp</AntdButton>
                  </Upload>
                </>
              : null
            }
          </>
        }
      },
      )

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
    [onRowChange, onRowChangeGiaiTrinh, expandedRowKeys, onExpand, dataSource]
  );

  return columns;
};
