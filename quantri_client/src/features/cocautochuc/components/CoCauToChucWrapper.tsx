import { FolderContextProvider } from "@/contexts/FolderContext";
import { Spliter } from "@/lib/spliter/Spliter";
import { CoCauToChuc } from "./leftside/CoCauToChuc";
import { DanhSachTab } from "./rightside/DanhSachTab";
import { CoCauModalProvider, useCoCauModalContext } from "../contexts/CoCauModalContext";
import { useEffect } from "react";

const CoCauToChucWrapper = ({ role }: { role: string }) => {
  return (
    <FolderContextProvider>
      <CoCauModalProvider>
        <Spliter
          customClassName="custom-react-spliter"
          primaryIndex={1}
          percentage={true}
          primaryMinSize={25}
          secondaryMinSize={15}
          secondaryInitialSize={20}
        >
          <section style={{ marginRight: 12, maxHeight: 600 }}>
            <CoCauToChuc role={role} />
          </section>
          <section style={{ marginLeft: 12 }}>
            <DanhSachTab />
          </section>
        </Spliter>
      </CoCauModalProvider>
    </FolderContextProvider>
  );
};

export default CoCauToChucWrapper;
