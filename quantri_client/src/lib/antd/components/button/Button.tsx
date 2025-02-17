import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
import { Button } from 'antd'
import {ComponentProps} from 'react'

export interface IAntdButtonProps extends ComponentProps<typeof Button>{

}

export const AntdButton = (props: IAntdButtonProps) => {
    const {isMobile} = useWindowSizeChange()
    const {children, ...rest} = props
  return (
    <Button {...rest} size={isMobile ? "small" : rest.size}>{children}</Button>
  )
}
