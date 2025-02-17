import { useCallback, CSSProperties } from "react";
import { Handle, Position, Node } from "reactflow";
import { Popconfirm, Space, Typography } from "antd";
import { AntdSpace } from "@/lib/antd/components";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR } from "@/data";
import { BuocXuLy } from "@/models/buocXuLy";
const { Paragraph, Text, Title } = Typography;

// K được phép dùng context ở đây
export const StartNode = ({
  id,
  data,
  onEdit,
  highlightId,
  onSelected,
}: Node<BuocXuLy> & {
  onEdit?: (id: string) => void;
  highlightId?: string;
  onSelected?: () => void;
}) => {
  console.log(data);
  
  return (
    <div
      className="custom-node-thtt-react-flow"
      style={{
        backgroundColor:
          highlightId === id ? DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR : "#508eba",
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
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <AntdSpace direction="vertical">
          
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
                color: "#000",
                position: "absolute",
                top: 0,
                right: 0,
                padding: 5,
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
        </Space>
      </div>
    </div>
  );
};
