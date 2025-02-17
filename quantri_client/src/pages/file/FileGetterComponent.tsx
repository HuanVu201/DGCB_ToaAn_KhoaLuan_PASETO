import { fileApi } from "@/features/file/services"
import { useEffect, useState } from "react"
import {useSearchParams} from 'react-router-dom'

export const FileGetterComponent = () => {
    const [searchParams] = useSearchParams()
    const [link, setLink] = useState<string>()


    useEffect(() => {
        (async () => {
            if(searchParams.has("path")){
                const path = searchParams.get("path")
                if(path){
                    const fileStream = await fileApi.GetFileByte({path})
                    const bloburl = window.URL.createObjectURL(fileStream.data)
                    setLink(bloburl)
                }
            }
        })()
    }, [searchParams])
    return <div style={{width: "100dvw", height: "100dvh"}}>
        <iframe src={link} width="100%" height="100%"></iframe>
    </div>
}