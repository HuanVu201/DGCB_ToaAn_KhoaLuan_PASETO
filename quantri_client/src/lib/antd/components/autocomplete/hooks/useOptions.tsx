import { SelectProps } from 'antd'
import React, { useMemo } from 'react'
import { IBaseExt } from '@/models'
import { AntdAutoCompleteProps } from '../AutoComplete'
import { DefaultOptionType } from 'antd/es/select'

// 1d menu // dùng list_to_tree để tạo (n)d 
export const useOptions = <IModel,>({generateOptions}: {generateOptions: AntdAutoCompleteProps<IModel>["generateOptions"]}) => {
    const menu = useMemo((): AntdAutoCompleteProps<IModel>["options"] => {
        if(generateOptions){
            const {model, label, value} = generateOptions
            return model?.map(x => ({label: x[label], key: x[value]} as DefaultOptionType))
        }
        return undefined
    },[generateOptions?.model])
  return menu
}