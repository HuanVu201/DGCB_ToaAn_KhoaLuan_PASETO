import { useCallback, useState } from "react"
export type SetSearchParams<IModel> = (data: IModel | undefined, flag?: "RESET" | "REFETCH" | "SEARCH") => void
export const useSearchStateHolder = <IModel,>(params: IModel) => {
    const [searchQuery, setSearchQuery] = useState(params)

    const resetSearchQuery = useCallback(() => {
        setSearchQuery({...params})
    }, [])

    const setSearchParams : SetSearchParams<IModel> = (data: IModel | undefined, flag: "RESET" | "REFETCH" | "SEARCH" = "SEARCH") => {
        if(flag == "RESET"){ // xóa hết params 
            resetSearchQuery()
        } else if(flag == "REFETCH") { // tải lại truy vấn hiện tại
            setSearchQuery((curr) => ({...curr}))
        } else if(flag == "SEARCH") { // cập nhật param mới vào bộ lọc hiện tại
            setSearchQuery((curr) => ({...curr, ...data}))
        }
    }

    return {
        setSearchParams,
        searchParams: searchQuery
    }
}