import { DefaultOptionType } from "antd/es/select";

export const filterOptions = (input: string, option :  DefaultOptionType | undefined) => {
  return ((option?.label ?? '') as string).toLowerCase().includes(input.toLowerCase())
}
export const filterOptionsChungThuc = (input: string, option :  DefaultOptionType | undefined) => {
  return ((option?.['data-ten'] ?? '') as string).toLowerCase().includes(input.toLowerCase())
}

export const filterOptionsWithTitle = (input: string, option : DefaultOptionType | undefined) => {
   if (!option?.title) return true
   let title = option?.title as string
   
   return title.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

export const filterOptionsWithValue = (input: string, option : DefaultOptionType | undefined) => {
  console.log(option, input);
  
  if (!option?.title) return true
  let title = option?.value as string
  
  return title.toLowerCase().indexOf(input.toLowerCase()) >= 0
}