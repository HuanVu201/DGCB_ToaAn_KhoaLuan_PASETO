import { FolderContextProvider } from "@/contexts/FolderContext";
import { CoCauModalProvider } from "../cocautochuc/contexts/CoCauModalContext";
import UserTable from "./components/UserTable";

const UserWrapper = () => {
    return (
        <FolderContextProvider>
            <CoCauModalProvider>
                <UserTable></UserTable>
            </CoCauModalProvider>
        </FolderContextProvider>

    )
}

export default UserWrapper;