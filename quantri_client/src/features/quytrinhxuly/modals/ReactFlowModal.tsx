import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components";
import ReactFlow, { ReactFlowProps, Node, MarkerType, useNodesState, useEdgesState, OnConnect, addEdge, ReactFlowProvider, OnNodesDelete, Edge, EdgeProps, NodeProps } from "reactflow"
import { useCallback, useEffect, useMemo, useState, useRef, useImperativeHandle } from "react";
import { AddNodeModal, AddNodeModalProps } from "./AddNodeModal";
import { CustomNode, EndNode, StartNode, CustomEdge } from "../components/reactflow";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { ChangeEdgeModal } from "./ChangeEdgeModal";
import 'reactflow/dist/style.css';
import {v4 as uuid} from 'uuid'
import { useUpdateNodeInternals } from "reactflow";
import { toast } from "react-toastify";
import { EditStartNodeModal } from "./EditStartNodeModal";
import { BuocXuLy } from "@/models/buocXuLy";
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext";
import { GetFlowQuyTrinhXuLy, UpdateFlowQuyTrinhXuLy } from "../redux/action";
import { resetGetFlowData } from "../redux/slice";
import { AddBuocXuLyCommand, UpdateBuocXuLyCommand } from "@/features/buocxuly/services/params";
import { AddBuocXuLy, DeleteBuocXuLy, UpdateBuocXuLy } from "@/features/buocxuly/redux/action";
import { UpdateReactFlowQuyTrinhCommand, UpdateReactFlowQuyTrinhCommandBuocXuLy, UpdateReactFlowQuyTrinhCommandLienKetBuocXuLy } from "../services/params";
import { LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";
import { LienKetbuocXuLyApi } from "@/features/lienKetBuocXuLy/services";
import React from "react";
export interface CustomReactFlowProps extends ReactFlowProps {
    laDonVi: AddNodeModalProps["laDonVi"],
    ref: ReactFlowInnerRef
}
export type ReactFlowInnerRef = {
    updateNodeInternals: () => void;
    handlerCancel: () => void
}

const ReactFlowInner = React.forwardRef<ReactFlowInnerRef, CustomReactFlowProps>((props, ref) => {
    const quyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [elementChanged, setElementChanged] = useState(false)
    const updateNodeInternals = useUpdateNodeInternals();
    const [btnLoading, setBtnLoading] = useState(false)
    const {nodes: nodeDatas, edges: edgeDatas} = useAppSelector(state => state.quytrinhxulys);
    const dispatch = useAppDispatch()
    const [defaultNodes, setDefaultNodes] = useState<Node[]>([])
    const [defaultEdges, setDefaultEdges] = useState<Edge[]>([])
    const onEdgeClick = useCallback((evt: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, label: string) => {
        evt.stopPropagation();
        quyTrinhXuLyContext.setChangeEdgeModalVisible(true)
        quyTrinhXuLyContext.setEdgeId(id)
        quyTrinhXuLyContext.setEdgeLabel(label)
    }, [])
    const onEdit = useCallback((id: string) => {
        quyTrinhXuLyContext.setAddNodeModalVisible(true)
        quyTrinhXuLyContext.setBuocXuLyId(id)
    }, [])
    const OnDelete = useCallback(async (id: string) => {
        const res = await dispatch(DeleteBuocXuLy({forceDelete: false, id})).unwrap()
        if(res.succeeded){
            setNodes((curr) => curr.filter(x => x.id != id));
        }
    }, [])

    
    const onEditStartNode = useCallback((id: string) => {
        quyTrinhXuLyContext.setEditStartModalVisible(true)
        quyTrinhXuLyContext.setBuocXuLyId(id)
    }, [])
    const nodeTypes = useMemo(() => ({ customNode: (props: Node<BuocXuLy>) => <CustomNode onEdit={onEdit} onDelete={OnDelete} {...props}/>,
        startNode: (props: Node<BuocXuLy>) => <StartNode onEdit={onEditStartNode} {...props}/>, endNode: EndNode }), []);
    const edgeTypes = useMemo(() => ({ customEdge: (props: EdgeProps) => <CustomEdge onEdgeClick={onEdgeClick} {...props}/> }), []);
    useEffect(() => {
        if(quyTrinhXuLyContext.QuyTrinhXuLyId) dispatch(GetFlowQuyTrinhXuLy({id: quyTrinhXuLyContext.QuyTrinhXuLyId}))
    }, [quyTrinhXuLyContext.QuyTrinhXuLyId])

    useEffect(() => {
        if(nodeDatas) {
            setNodes(nodeDatas)
            setDefaultNodes(nodeDatas)
        }
        if(edgeDatas) {
            setEdges(edgeDatas)
            setDefaultEdges(edgeDatas)
        }
    }, [nodeDatas, edgeDatas])

    const onCleanState = () => {
        quyTrinhXuLyContext.setReactFlowModalVisible(false)
        quyTrinhXuLyContext.setQuyTrinhXuLyId(undefined)
        dispatch(resetGetFlowData())
    }
    const handlerCancel = useCallback(() => {
        if(elementChanged){
            Modal.confirm({
                title: "Có thay đổi trên quy trình, xác nhận đóng?",
                cancelText: "Bỏ qua và đóng",
                okText: "Lưu và đóng",
                onOk: async () => {
                    await onSaveQuyTrinh()
                    onCleanState()
                },
                onCancel: () => {
                    onCleanState()
                }
            })  
        } else{
            onCleanState()
        }
        
    }, [elementChanged])

    useImperativeHandle(ref, () => ({
        updateNodeInternals: () => updateNodeInternals(nodes.map(x => x.id)),
        handlerCancel: handlerCancel
    }), [nodes])


    const onAddNode = useCallback(async (id: string, data: AddBuocXuLyCommand) => {
        if(!quyTrinhXuLyContext.QuyTrinhXuLyId){
            return
        }
        const pos = Math.random() * 500;
        const newNode: Node = {
            id,
            position: {
              x: pos,
              y: pos,
            },
            data,
            type: "customNode"
        };
        const buocXuLy : AddBuocXuLyCommand= {
            tenBuoc: data.tenBuoc,
            laBuocDauTien: data.laBuocDauTien,
            thoiHanXuLy: data.thoiHanXuLy,
            laBuocCuoiCung: data.laBuocCuoiCung,
            layNguoiQuanLy: data.layNguoiQuanLy,
            cungDonVi: data.cungDonVi,
            cungPhongBan: data.cungPhongBan,
            layDonViCapTren: data.layDonViCapTren,
            khongCoChucDanh: data.khongCoChucDanh,
            khongCoChucVu: data.khongCoChucVu,
            quyTrinhXuLyId: quyTrinhXuLyContext.QuyTrinhXuLyId,
            trangThaiDanhGiaId: data.trangThaiDanhGiaId,
            positionX: newNode.position.x,
            positionY: newNode.position.y,
            positionAbsoluteX: newNode.position.x,
            positionAbsoluteY: newNode.position.y,
            type: newNode.type || "customNode",
            deletable: newNode.deletable || false,
            width: newNode.width || 150,
            height: newNode.height || 80,
            selected: newNode.selected || false,
            dragging: newNode.dragging ||false,
            buocXuLyChucDanhIds: data.buocXuLyChucDanhIds,
            buocXuLyChucVuIds: data.buocXuLyChucVuIds,
            buocXuLyNhomNguoiDungIds: data.buocXuLyNhomNguoiDungIds,
            buocXuLyDonVis: data.buocXuLyDonVis,
            id
        } 
        const res = await dispatch(AddBuocXuLy(buocXuLy)).unwrap()
        if(res.succeeded){
            setNodes((curr) => curr.concat(newNode))
            // setElementChanged(true)
        }
        
    }, [quyTrinhXuLyContext.QuyTrinhXuLyId])
    const onChangeNode = useCallback(async (id: string, data: UpdateBuocXuLyCommand) => {
        const newData = nodes.map(node => {
            if(node.id === id){
                return {...node, data: {...node.data, ...data}}
            }
            return node
        })
        const updatedNode = newData.find(x => x.id == id);
        if(!updatedNode || !quyTrinhXuLyContext.QuyTrinhXuLyId){
            return
        }
        console.log(data);
        
        const buocXuLy : UpdateBuocXuLyCommand= {
            tenBuoc: data.tenBuoc,
            laBuocDauTien: data.laBuocDauTien,
            laBuocCuoiCung: data.laBuocCuoiCung,
            thoiHanXuLy: data.thoiHanXuLy,
            cungDonVi: data.cungDonVi,
            cungPhongBan: data.cungPhongBan,
            layNguoiQuanLy: data.layNguoiQuanLy,
            layDonViCapTren: data.layDonViCapTren,
            khongCoChucDanh: data.khongCoChucDanh,
            khongCoChucVu: data.khongCoChucVu,
            quyTrinhXuLyId: quyTrinhXuLyContext.QuyTrinhXuLyId,
            trangThaiDanhGiaId: data.trangThaiDanhGiaId,
            positionX: updatedNode.position.x,
            positionY: updatedNode.position.y,
            positionAbsoluteX: updatedNode.position.x,
            positionAbsoluteY: updatedNode.position.y,
            type: updatedNode.type || undefined,
            deletable: updatedNode.deletable || undefined,
            width: updatedNode.width || undefined,
            height: updatedNode.height || undefined,
            selected: updatedNode.selected || undefined,
            dragging: updatedNode.dragging ||undefined,
            buocXuLyChucDanhIds: data.buocXuLyChucDanhIds,
            buocXuLyChucVuIds: data.buocXuLyChucVuIds,
            buocXuLyNhomNguoiDungIds: data.buocXuLyNhomNguoiDungIds,
            buocXuLyDonVis: data.buocXuLyDonVis,
            id,
        } 
        const res = await dispatch(UpdateBuocXuLy(buocXuLy)).unwrap()
        if(res.succeeded){
            setNodes(newData)
            // setElementChanged(true)
        }
    }, [nodes])
    const onDeleteNode : OnNodesDelete = useCallback(async (updatedNode) => {
        
        if(nodes.length){
            const currentNodeIds = updatedNode.flatMap(x => x.id);
            const deletedNodes = nodes.filter((node) => !currentNodeIds.includes(node.id))
            if(deletedNodes.length){
                const res = await dispatch(DeleteBuocXuLy({forceDelete: false, id: deletedNodes[0].id})).unwrap()
                if(res.succeeded){
                    setNodes(deletedNodes)
                }
            }
        }
    }, [nodes])
    const onChangeEdge = useCallback(async (id:string, label:string) => {
        try {
            const res = await LienKetbuocXuLyApi.Update({
                label,
                id
            })
            if(res.data.succeeded){
                setEdges((edges) => {
                    return edges.map(edge => {
                        if(edge.id === id){
                            return {...edge, label}
                        }
                        return edge
                    })
                })
                toast.success("Sửa thành công")
            }
        } catch (error) {
            toast.error("Thao tác thất bại")
        }
    },[])
    const onConnect: OnConnect = useCallback(
        (connection) => {
            const lienKetId = uuid()
            setEdges((eds) => addEdge({...connection, label:"Chuyển đánh giá", id: lienKetId}, eds))
            setElementChanged(true)
        },
        [setEdges]
    );
    const onSaveQuyTrinh = useCallback(async () => {
        const req : UpdateReactFlowQuyTrinhCommand = {
            quyTrinhXuLyId : quyTrinhXuLyContext.QuyTrinhXuLyId,
            lienKetBuocXuLys: edges.map((x) : UpdateReactFlowQuyTrinhCommandLienKetBuocXuLy=> {
                return {
                    animated: x.animated || true,
                    type: x.type || "customNode",
                    markerEndType: "arrowclosed",
                    styleStrokeWidth: +(x.style?.strokeWidth || 4),
                    styleStroke: "black",
                    source: x.source,
                    target: x.target,
                    id: x.id,
                    sourceHandle: x.sourceHandle as string,
                    targetHandle: x.targetHandle as string,
                    label: x.label as string,
                    quyTrinhXuLyId: quyTrinhXuLyContext.QuyTrinhXuLyId as string,
                }
            }),
            buocXuLys: nodes.map((x : Node<BuocXuLy>) : UpdateReactFlowQuyTrinhCommandBuocXuLy=> {
                return {
                    id: x.id,
                    positionAbsoluteX: x.positionAbsolute?.x || x.position.x,
                    positionAbsoluteY: x.positionAbsolute?.y || x.position.y,
                    positionX: x.position.x,
                    positionY: x.position.y,
                    laBuocDauTien: x.data.laBuocDauTien,
                    deletable: x.deletable as boolean,
                    dragging: x.dragging as boolean,
                    selected: x.selected as boolean,
                    layNguoiQuanLy: x.data.layNguoiQuanLy,
                    cungDonVi: x.data.cungDonVi,
                    cungPhongBan: x.data.cungPhongBan,
                    layDonViCapTren: x.data.layDonViCapTren,
                    khongCoChucDanh: x.data.khongCoChucDanh,
                    khongCoChucVu: x.data.khongCoChucVu,
                    laBuocCuoiCung: x.data.laBuocCuoiCung
                }
            })
        }
        try {
            setBtnLoading(true)
            const res = await dispatch(UpdateFlowQuyTrinhXuLy(req)).unwrap()
            if(res.succeeded){
                setNodes(nodes)
                setEdges(edges)
                setDefaultEdges(edges)
                setDefaultNodes(nodes)
                setElementChanged(false)
                toast.success("Lưu thành công")
            }
            setBtnLoading(false)
        } catch (error) {
        } finally{
            setBtnLoading(false)
        }
        
        
    }, [nodes, edges])
    // const onRestoreQuyTrinh = useCallback(() => {
    //     setEdges(defaultEdges)
    //     setNodes(defaultNodes)
    // }, [defaultEdges, defaultNodes])
    return <>
    {/* <AntdModal visible={true} title="Chỉnh sửa quy trình" fullsize footer={null} handlerCancel={handlerCancel} afterOpenChange={(open) => {
        open ? updateNodeInternals(nodes.map(x => x.id)) : null
    }}> */}
        <AntdSpace direction="horizontal" style={{marginBottom:12}}>
            <AntdButton type="primary" loading={btnLoading} onClick={() => quyTrinhXuLyContext.setAddNodeModalVisible(true)}>Thêm bước</AntdButton>
            <AntdButton type="dashed" loading={btnLoading} style={{marginBottom:6}} onClick={onSaveQuyTrinh}>Lưu quy trình</AntdButton>
            {/* <AntdButton style={{marginBottom:6}} loading={btnLoading} onClick={onRestoreQuyTrinh}>Khôi phục quy trình gốc</AntdButton> */}
        </AntdSpace>
        <div style={{width:"100%", height:"80dvh", border:"1px dashed black"}}  >
            {nodes.length ? <ReactFlow 
                nodeTypes={nodeTypes as any}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onDeleteNode}
                deleteKeyCode={["Backspace","Delete"]}
                fitView
                defaultEdgeOptions={{type:"customEdge", markerEnd: {type: MarkerType.ArrowClosed}, animated:true, style:{strokeWidth:5, stroke:"black"}}}
            />: null}
        </div>
    {/* </AntdModal> */}
    {quyTrinhXuLyContext.addNodeModalVisible ? <AddNodeModal addNode={onAddNode} onChangeNode={onChangeNode} nodes={nodes} laDonVi={props.laDonVi}/> : null}
    {quyTrinhXuLyContext.editStartModalVisible ? <EditStartNodeModal onChangeNode={onChangeNode} nodes={nodes} laDonVi={props.laDonVi}/> : null}
    {quyTrinhXuLyContext.changeEdgeModalVisible ? <ChangeEdgeModal changeEdge={onChangeEdge}/> : null}
    </>
    
})

const ReactFlowModal = React.forwardRef<ReactFlowInnerRef, CustomReactFlowProps>((props, ref) => {
    return (
        <ReactFlowProvider>
            <ReactFlowInner {...props} ref={ref}/>
        </ReactFlowProvider>
      );
})
export default ReactFlowModal