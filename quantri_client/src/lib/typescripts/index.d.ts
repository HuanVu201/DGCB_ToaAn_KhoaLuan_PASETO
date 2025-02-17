export namespace TSTypeHelpers {
    export type ValuesOf<T> = T[keyof T]

    // immediate indexed mapped type
    /* Get all keys in TObj when the value type is asignable to union of TType*/
    export type ExtractTypeKeys<TObj, TType> = ValuesOf<{
        [K in keyof TObj] : TObj[K] extends TType ? K : never
    }>
    export type OverrideProps<T, TOverriden> = Omit<T, keyof TOverriden> & TOverriden 
    export type CapitalizeAllKeys<TObj> = {
        [Key in keyof TObj as `${Capitalize<K>}`]: TObj[Key]
    }
}

