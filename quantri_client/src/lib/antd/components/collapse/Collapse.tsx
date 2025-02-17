import { CollapseProps, Collapse } from "antd";

export interface AntdCollapseProps extends CollapseProps{

}

export const AntdCollapse = (props: AntdCollapseProps) => {
    return <Collapse {...props}></Collapse>
}