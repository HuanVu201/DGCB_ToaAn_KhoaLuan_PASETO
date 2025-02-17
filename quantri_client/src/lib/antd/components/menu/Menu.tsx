
import React from 'react'
import { Menu, MenuProps } from 'antd'
import { IBaseExt } from '@/models'
import { useMenu } from './hooks/useMenu'
import "./scss/menu.scss"

export interface AntdMenuProps<IModel> extends MenuProps{
  generateMenu?:{
    model: IModel[] | undefined;
    label: keyof IModel;
    value: keyof IModel;
    useValueAsLink?: boolean;
  };
} 

export const AntdMenu = <IModel,>(props: AntdMenuProps<IModel>) => {
  const {generateMenu, ...rest} = props
  const items = useMenu({generateMenu})
  return (
    <Menu items={items} {...rest}></Menu>
  )
}
