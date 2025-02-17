
import React, { useEffect } from 'react'
import { Menu, MenuProps } from 'antd'
import { IBaseExt } from '@/models'
import { useMenu } from './hooks/useMenu'
import "./scss/menu.scss"
import { useNestedMenuData } from './hooks/listToMenu'

export interface AntdNestedMenuProps<IModel> extends MenuProps{
    generateMenu?:{
        model: IModel[] | undefined,
        label: keyof IModel,
        value: keyof IModel,
        iconName: keyof IModel,
        path: keyof IModel,
        parentKey: keyof IModel,
    };
} 

export const AntdNestedMenu = <IModel,>(props: AntdNestedMenuProps<IModel>) => {
  const {generateMenu, ...rest} = props
  const items = useNestedMenuData(generateMenu)
  
  return (
      <Menu items={items} {...rest}></Menu>
  )
}
