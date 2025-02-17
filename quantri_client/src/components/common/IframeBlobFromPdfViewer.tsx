import { useEffect, useMemo, useState } from "react"
import { RenderTitle, ZoomComponent } from "."
import { getFileName, getUrlFromBlob } from "@/utils"
import { Col } from "antd"

export const IframeBlobFromPdfViewer = ({fileName}: {fileName: string | undefined}) =>{
    const [link, setLink] = useState<string>()

    useEffect(() => {
        (async() =>{
            if(fileName){
                const link = await getUrlFromBlob(fileName)
                setLink(link)
            }
        })()
    }, [fileName])

    return <Col span={24} >
        {link ? <>
            <RenderTitle title={`Tệp đính kèm${fileName ? ": " + getFileName(fileName) : ""}`}/>
        <div style={{height: 1000}}>
            <iframe src={link} width="100%" height="100%"></iframe>
        </div>
        </> : null}
    </Col>
       
}