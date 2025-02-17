import React from 'react'
import { Space, SpaceProps } from 'antd'

const AntdSpace = (props: SpaceProps) => {
  return (
    <Space {...props}/>
  )
}
AntdSpace.Compact = Space.Compact

export { AntdSpace }