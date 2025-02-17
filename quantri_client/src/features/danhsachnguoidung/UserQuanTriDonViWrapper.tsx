import { FolderContextProvider } from "@/contexts/FolderContext";
import { CoCauModalProvider } from "../cocautochuc/contexts/CoCauModalContext";
import UserTable from "./components/UserTable";
import UserTableQuanTriDonVi from "./components/UserTableQuanTriDonVi";

const UserQuanTriDonViWrapper = () => {
    return (
        <FolderContextProvider>
            <CoCauModalProvider>
                <UserTableQuanTriDonVi></UserTableQuanTriDonVi>
            </CoCauModalProvider>
        </FolderContextProvider>

    )
}

export default UserQuanTriDonViWrapper;