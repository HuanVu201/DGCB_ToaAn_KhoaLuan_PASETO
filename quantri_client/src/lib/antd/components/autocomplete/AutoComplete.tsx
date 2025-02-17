import { IBaseExt } from "@/models"
import { AutoComplete, AutoCompleteProps, SelectProps } from "antd"
import { useEffect, useState } from "react"
import { DefaultOptionType } from "antd/es/select"

export interface AntdAutoCompleteProps<IModel> extends AutoCompleteProps{
    generateOptions?:{
      model: IModel[] | undefined,
      label: keyof IModel,
      value:  keyof IModel,
    },
} 

export const AntdAutoComplete = <IModel,>(props: AntdAutoCompleteProps<IModel>) => {
    const {generateOptions, ...rest} = props
    const [options, setOptions] = useState<DefaultOptionType[] | undefined>([])
    const onSearch = (text: string) => {
      if(generateOptions){
        const {model, label, value} = generateOptions
        setOptions(value ? model?.filter(x => (x[value] as string).toLocaleLowerCase().includes(text.toLocaleLowerCase())).map(x => ({
          label: x[label],
          value: x[value],
        }) as DefaultOptionType): [])
      }
    }
    useEffect(()=>{
      if(generateOptions){
        const {model, label, value} = generateOptions
        setOptions(model?.map(x => ({
          label: x[label],
          value: x[value],
        }) as DefaultOptionType))
      }
    },[generateOptions])
    return <AutoComplete options={options}  {...rest} onSearch={onSearch}/>
}