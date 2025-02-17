import { FolderContextProvider } from "@/contexts/FolderContext"
import { Spliter } from "@/lib/spliter/Spliter"
import { VaiTro } from "./leftside/VaiTro"
import { DanhSachTab } from "./rightside/DanhSachTab"
import { VaiTroModalProvider } from "../contexts//VaiTroModalContext"

const VaiTroWrapper = () => {
    return <FolderContextProvider>
        <VaiTroModalProvider>
            <Spliter
                customClassName='custom-react-spliter'
                primaryIndex={1}
                percentage={true}
                primaryMinSize={25}
                secondaryMinSize={15}
                secondaryInitialSize={20}>
                <section style={{ marginRight: 12 }}><VaiTro /></section>
                <section style={{ marginLeft: 12 }}><DanhSachTab /></section>
            </Spliter>
        </VaiTroModalProvider>
    </FolderContextProvider>
}

export default VaiTroWrapper