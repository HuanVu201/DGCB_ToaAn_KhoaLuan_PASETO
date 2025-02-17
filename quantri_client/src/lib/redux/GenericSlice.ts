import { ActionReducerMapBuilder, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers, createSlice } from "@reduxjs/toolkit"

export type GenericState<TObj, TKey extends keyof TObj> = {
    [Spec in TKey] ?: TObj[Spec]
    
}
//TObj, TKey truyền xuống GenericState
export type ExtendedState<T, TObj = {}, TKey extends keyof TObj = keyof TObj> = GenericState<TObj, TKey> & {
    data?: T,
    datas? : T[],
    
    loading: boolean,
    count?: number,
    error?: string,
    totalPages?: number,
    currentPages?: number,
    pageSize?: number
    
}

const createGenericSlice = <
    T,
    TObjExt,
    TKeyObjExt extends keyof TObjExt,
    Reducers extends SliceCaseReducers<ExtendedState<T, TObjExt, TKeyObjExt>>
>({
    name = '',
    initialState,
    reducers,
    extraReducers
}: {
    name: string
    initialState: ExtendedState<T, TObjExt, TKeyObjExt>
    reducers: ValidateSliceCaseReducers<ExtendedState<T, TObjExt, TKeyObjExt>, Reducers>,
    extraReducers: ((builder: ActionReducerMapBuilder<ExtendedState<T, TObjExt, TKeyObjExt>>) => void)
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            resetData: (state: GenericState<typeof initialState, "data">) => {
                state.data= undefined
            },
            resetDatas: (state: GenericState<typeof initialState, "datas" | "count">) => {
                state.datas = undefined
                state.count = undefined
            },
            ...reducers,
        },
        extraReducers: extraReducers
    })
}
export default createGenericSlice