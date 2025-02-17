import { useCallback, CSSProperties } from 'react';
import { Handle, Position, Node } from 'reactflow';
import { Typography } from 'antd';
import { AntdSpace } from '@/lib/antd/components';
import { EditOutlined } from '@ant-design/icons';
import { DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR } from '@/data';
import { BuocXuLy } from '@/models/buocXuLy';
const { Paragraph, Text, Title } = Typography;


// K được phép dùng context ở đây
export const EndNode = ({id, data, onEdit, highlightId}: Node<BuocXuLy> & {onEdit?: (id: string) => void, highlightId?: string}) => {
    return <div className='custom-node-thtt-react-flow' style={{backgroundColor: highlightId === id ? DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR : "#b34b62" }}>
        <Handle type="target" style={{width:12,height:12, backgroundColor:"#71d1c4"}} position={Position.Top} id='target-top'/>
        <Handle type="target" style={{width:12,height:12, backgroundColor:"#71d1c4"}} position={Position.Left} id='target-left'/>
        <div style={{width:"100%", height:"100%", textAlign:"center", }}>
        <AntdSpace direction="vertical">
           
        </AntdSpace>
        </div>
        <Handle type="source" style={{width:12,height:12, backgroundColor:"#de3e5b"}} position={Position.Bottom} id='source-bottom'/>
        <Handle type="source" style={{width:12,height:12, backgroundColor:"#de3e5b"}} position={Position.Right} id='source-right'/>
        {onEdit ? <EditOutlined onClick={() => onEdit(id)} style={{color:"#000", position:"absolute", top:0, right:0, padding:5, fontSize:16}}/> : null}
    </div>
}