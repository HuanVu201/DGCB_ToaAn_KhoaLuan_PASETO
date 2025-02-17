import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import { IDanhGiaCanBo } from '@/features/DanhGiaCanBo/components/common/models'
import dayjs from "dayjs";
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext'
import { Space } from 'antd';
import { DanhGiaTableActions } from '../../../common/DanhGiaCommon';
import { BranchesOutlined } from '@ant-design/icons';
import { useKhieuNaiDanhGiaContext } from '../../../KhieuNaiKienNghiDanhGia/contexts/useKhieuNaiKienNghiContext';
import { TrangThai_DaDanhGia, TrangThai_DangDanhGia } from '../../../common/TenVetXuLyConstants';

export const useDanhGiaTableColumn = ({ pageNumber = 1, pageSize = 10, tableActions, setKhieuNaiId, setTrangThaiKhieuNai }: {
  pageNumber: number, pageSize: number, tableActions: DanhGiaTableActions[],
  setKhieuNaiId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTrangThaiKhieuNai: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const buttonActionContext = useButtonActionContext()
  const khieuNaiContext = useKhieuNaiDanhGiaContext()
  const columns = useMemo((): ColumnsType<IDanhGiaCanBo> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (_, record, idx) => {
          const pageNumberr = pageNumber ?? 1
          const pageSizee = pageSize ?? 10
          return <>{(pageNumberr - 1) * pageSizee + idx + 1}</>
        },
      },
      {
        title: <p style={{ textAlign: 'center' }}>Kỳ đánh giá</p>,
        key: "thoiGian",
        dataIndex: "thoiGian",
        align: 'center',
        render: (_, record) => (<>
          {record.loaiThoiGian} {record.thoiGian}
        </>)
      },
      {
        title: <p style={{ textAlign: 'center' }}>Năm đánh giá</p>,
        key: "namDanhGia",
        dataIndex: "namDanhGia",
        align: 'center',
      },
      {
        title: <p style={{ textAlign: 'center' }}>Điểm đánh giá</p>,
        key: "diemDanhGia",
        dataIndex: "diemDanhGia",
        align: 'center',
      },
      {
        title: <p style={{ textAlign: 'center' }}>Xếp loại</p>,
        key: "phanLoaiDanhGia",
        dataIndex: "phanLoaiDanhGia",
      },
      {
        title: <p style={{ textAlign: 'center' }}>Thời điểm tự đánh giá</p>,
        key: "createdOn",
        dataIndex: "createdOn",
        align: 'center',
        render: (_, record) => (<>
          {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
        </>)
      },
      {
        title: <p style={{ textAlign: 'center' }}>Trạng thái</p>,
        key: "trangThai",
        dataIndex: "trangThai",
        align: 'center',
      },
      {
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>Thao tác</p>,
        dataIndex: '',
        width: '10%',
        align: 'center',
        key: '',
        render: (_, record) => {
          let newAction: DanhGiaTableActions[] = tableActions
          if (record.trangThai != TrangThai_DangDanhGia)
            newAction = newAction.filter(x => x.key !== 'CapNhat' && x.key !== 'XoaDanhGia')
          if (!record.buocTruocId || (record.buocTruocId && record.daXem != '0') || record.trangThai == TrangThai_DaDanhGia)
            newAction = newAction.filter(x => x.key !== 'ThuHoi')

          return (
            <>
              <Space direction="horizontal">
                {newAction?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={(e) => {
                        // e.preventDefault()
                        buttonActionContext.setDanhGiaId(record.id)
                        // if (record.khieuNaiId) {
                        //   buttonActionContext.setKhieuNaiId(record.khieuNaiId)
                        //   console.log('1', record.khieuNaiId)
                        // }
                        // if (record.trangThaiKhieuNai) {
                        //   buttonActionContext.setTrangThaiKhieuNai(record.trangThaiKhieuNai)
                        //   console.log('2', record.trangThaiKhieuNai)
                        // }

                        if (record.khieuNaiId) {
                          setKhieuNaiId(record.khieuNaiId)
                        }
                        if (record.trangThaiKhieuNai) {
                          setTrangThaiKhieuNai(record.trangThaiKhieuNai)
                        }
                      }}
                    >
                      {item.icon}
                    </span>
                  )
                })}
              </Space>
              <BranchesOutlined title="Thông tin kiến nghị đánh giá"
                onClick={() => {
                  buttonActionContext.setReadOnlyKhieuNaiModalVisible(true)
                  buttonActionContext.setThemKhieuNaiDanhGiaModalVisible(true)
                  buttonActionContext.setDanhGiaId(record.id)
                  khieuNaiContext.setKhieuNaiId(record.khieuNaiId)
                  khieuNaiContext.setTrangThaiKhieuNai(record.trangThaiKhieuNai)
                }}
                style={{ marginLeft: 8 }}
                hidden={!record.khieuNaiId || record.trangThaiKhieuNai != 'Đã xử lý'}
              />
            </>
          )
        },
      },
    ]
  }, [pageNumber, pageSize, buttonActionContext.danhGiaId, buttonActionContext.khieuNaiId, buttonActionContext.trangThaiKhieuNai])

  // Trả về columns trực tiếp, thay vì trả về một đối tượng chứa columns
  return columns;
}
