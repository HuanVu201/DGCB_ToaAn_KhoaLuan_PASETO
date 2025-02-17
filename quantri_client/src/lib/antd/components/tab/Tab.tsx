import React from 'react'
import {Tabs, TabsProps} from "antd"

export interface IAntdTabsProps extends TabsProps {

}
const {TabPane} = Tabs

export const AntdTab = (props: IAntdTabsProps) => {
  return (
    <Tabs {...props}   >
      
    </Tabs>
  )
}
AntdTab.TabPane = TabPane