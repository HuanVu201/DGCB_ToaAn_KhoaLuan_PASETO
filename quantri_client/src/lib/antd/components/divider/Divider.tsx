
import { DividerProps, Divider } from 'antd'

export interface IAntdDividerProps extends DividerProps {
}

export const AntdDivider = (props: IAntdDividerProps) => {
    return (
        <Divider style={{marginTop:10,marginBottom: 10}} {...props}/>
    )
}
