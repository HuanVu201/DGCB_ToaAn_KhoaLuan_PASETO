import { FolderContextProvider } from "@/contexts/FolderContext"
import { Spliter } from "@/lib/spliter/Spliter"
import { Menu } from "./leftside/Menu"
import { DanhSachTab } from "./rightside/DanhSachTab"
import { MenuProvider } from "../contexts/MenuContext"

const CoCauToChucWrapper = () => {
    return <MenuProvider>
            <Spliter
                customClassName='custom-react-spliter'
                primaryIndex={1}
                percentage={true}
                primaryMinSize={25}
                secondaryMinSize={15}
                secondaryInitialSize={20}>
                <section style={{marginRight:12}}><Menu /></section>
                <section style={{marginLeft:12}}><DanhSachTab/></section>
            </Spliter>
        </MenuProvider>
   
}

export default CoCauToChucWrapper