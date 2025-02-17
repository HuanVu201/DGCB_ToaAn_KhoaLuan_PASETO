import { Handle, Position } from "reactflow";
import { Popconfirm, Space, Tag, Typography } from "antd";
import { AntdSpace } from "@/lib/antd/components";
import { Node } from "reactflow";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR } from "@/data";
import { BuocXuLy } from "@/models/buocXuLy";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useMemo } from "react";
const { Paragraph, Text, Title } = Typography;

// K được phép dùng context ở đây
export const CustomNode = ({
  id,
  data,
  onEdit,
  highlightId,
  onSelected,
  onDelete
}: Node<BuocXuLy> & {
  onEdit?: (id: string) => void;
  highlightId?: string;
  onSelected?: () => void;
  onDelete?:(id: string) => void;
}) => {
  const {datas: trangThaiDanhGias} = useAppSelector(state => state.danhmuc_trangthaidanhgia)
  const tenTrangThaiDanhGia = useMemo(() => {
    if(data.trangThaiDanhGia){
      return data.trangThaiDanhGia.ten
    }
    if(trangThaiDanhGias){
      return trangThaiDanhGias.find(x => x.id == data.trangThaiDanhGiaId)?.ten
    }
  }, [trangThaiDanhGias, data])
  return (
    <div
      className="custom-node-thtt-react-flow"
      style={{
        paddingTop: 16,
        backgroundColor:
          highlightId === id ? DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR : data.laBuocDauTien ? "#508eba" : data.laBuocCuoiCung ? "#aede8c" : undefined,
      }}
    >
      <Handle
        type="target"
        style={{ width: 12, height: 12, backgroundColor: "#71d1c4" }}
        position={Position.Top}
        id="target-top"
      />
      <Handle
        type="target"
        style={{ width: 12, height: 12, backgroundColor: "#71d1c4" }}
        position={Position.Left}
        id="target-left"
      />
      <div style={{ width: "100%", height: "100%" }}>
        <AntdSpace direction="vertical">
          {data.tenBuoc ? <Tag color="orange">Tên bước: {data.tenBuoc}</Tag> : null}
          {tenTrangThaiDanhGia ? <Tag color="cyan">Trạng thái: {tenTrangThaiDanhGia}</Tag> : null}
        </AntdSpace>
      </div>
      <Handle
        type="source"
        style={{ width: 12, height: 12, backgroundColor: "#de3e5b" }}
        position={Position.Bottom}
        id="source-bottom"
      />
      <Handle
        type="source"
        style={{ width: 12, height: 12, backgroundColor: "#de3e5b" }}
        position={Position.Right}
        id="source-right"
      />
      <div style={{
          color: "#000",
          position: "absolute",
          top: 5,
          left: 5,
          padding: 5,
        }}>
      </div>
      <div
        style={{
          color: "#000",
          position: "absolute",
          top: 0,
          right: 0,
          padding: 5,
        }}
      >
        <Space>
          {onEdit ? (
            <EditOutlined
              onClick={() => onEdit(id)}
              style={{
                fontSize: "1.3rem",
              }}
            />
          ) : null}
          {onSelected ? (
            <Popconfirm
              title="Chọn bước quy trình"
              onConfirm={() => onSelected()}
              okText="Xác nhận"
            >
              <CheckCircleOutlined
                style={{
                  fontSize: "1.3rem",
                }}
              />
            </Popconfirm>
          ) : null}
          {onDelete ? (
            <Popconfirm
              title="Xóa bước hiện tại"
              onConfirm={() => onDelete(id)}
              okText="Xác nhận"
            >
              <DeleteOutlined
                style={{
                  fontSize: "1.3rem",
                }}
              />
            </Popconfirm>
          ) : null}
        </Space>
      </div>
    </div>
  );
};
