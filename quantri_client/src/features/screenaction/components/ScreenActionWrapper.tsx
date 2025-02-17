import { FolderContextProvider } from "@/contexts/FolderContext"
import { Spliter } from "@/lib/spliter/Spliter"
import { Screen } from "./leftside/Screen"
import { DanhSachTab } from "./rightside/DanhSachTab"
import { ScreenActionProvider } from "../contexts/ScreenActionContext"

const CoCauToChucWrapper = () => {
    return <ScreenActionProvider>
            <Spliter
                customClassName='custom-react-spliter'
                primaryIndex={1}
                percentage={true}
                primaryMinSize={25}
                secondaryMinSize={15}
                secondaryInitialSize={20}>
                <section style={{marginRight:12}}><Screen /></section>
                <section style={{marginLeft:12}}><DanhSachTab/></section>
            </Spliter>
        </ScreenActionProvider>
   
}

export default CoCauToChucWrapper