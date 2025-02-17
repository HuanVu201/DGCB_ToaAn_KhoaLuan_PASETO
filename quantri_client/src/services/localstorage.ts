export class LocalStorageItem {
    value?: any;
    key?: string;
    expiry?: number
}
export  interface ICrudLocalStorage {
    
    setWithExpiry({key,value,expiry} : LocalStorageItem) : void
    getWithExpriry(key:string) : string
}
export class CrudLocalStorage implements ICrudLocalStorage{
    setWithExpiry({ key, value, expiry }: LocalStorageItem): void {
        if(!key) throw new Error("key not found.")
        const now = new Date();
        const item = expiry ? {
            value: value,
            expiry: now.getTime() + expiry
        } : {
            value: value
        }
        localStorage.setItem(key, JSON.stringify(item))
    }
    getWithExpriry(key: string): any {
        if(!key) throw new Error("key not found.")
        const itemStr = localStorage.getItem(key)

        if (!itemStr) {
            return null
        }
        const item :LocalStorageItem  = JSON.parse(itemStr)
        if(!item.expiry)  return item.value
        const now = new Date()
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }

}

