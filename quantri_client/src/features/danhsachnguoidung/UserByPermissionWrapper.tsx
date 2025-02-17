import { FolderContextProvider } from "@/contexts/FolderContext"
import { Spliter } from "@/lib/spliter/Spliter"
import { VaiTro } from "../vaitro/components/leftside/VaiTro"
//import { DanhSachTab } from "./rightside/DanhSachTab"
import UserTableByPermision from "./components/UserTableByPermision"
import { VaiTroModalProvider } from "../vaitro/contexts/VaiTroModalContext"

const UserByPermisionWrapper = () => {
    return (
        <FolderContextProvider>
        <VaiTroModalProvider>
            <UserTableByPermision />
        </VaiTroModalProvider>
    </FolderContextProvider>

    )
}

export default UserByPermisionWrapper;
