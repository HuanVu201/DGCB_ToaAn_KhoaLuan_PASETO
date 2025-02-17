import { useState, useRef, ComponentProps } from "react"
import { Modal, ModalProps, Spin } from "antd"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks"
import Draggable, { DraggableEventHandler } from "react-draggable"
import { LoadingOutlined } from "@ant-design/icons"
export interface IAntdModalProps extends Omit<ModalProps, "open" | "title"> {
    positionStyle?: React.CSSProperties
    visible: boolean,
    fullsize?: boolean,
    fullsizeScrollable?: boolean,
    dragable?: boolean;
    title: React.ReactNode,
    handlerOk?: () => void,
    handlerCancel?: () => void,
}

export const AntdModal = (props: IAntdModalProps) => {
    const { children, positionStyle, dragable, handlerOk, visible, fullsize, fullsizeScrollable, title, handlerCancel, ...rest } = props
    const { loading: appLoading } = useAppSelector(state => state.global)
    const onHandlerCancel = () => {
        handlerCancel ? handlerCancel() : null
    }
    const onHandlerOk = () => {
        handlerOk ? handlerOk() : null
    }
    return <Modal
        open={visible}
        maskClosable={!fullsizeScrollable || !fullsize || true}
        wrapClassName={`modal-wrapper ${fullsize ? "fullsize" : ""} ${fullsizeScrollable ? "fullsizescrollable" : ""}`}
        style={{ ...positionStyle, pointerEvents: appLoading ? "none" : undefined}}
        title={title}
        onCancel={onHandlerCancel}
        onOk={onHandlerOk}
        {...rest}
    >
        {children}
        <Spin spinning={appLoading} fullscreen indicator={<LoadingOutlined spin />} />
    </Modal>
}