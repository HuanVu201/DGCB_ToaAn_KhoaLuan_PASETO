import { FolderContextProvider } from "@/contexts/FolderContext";
import { Spliter } from "@/lib/spliter/Spliter";
import { CoCauToChuc } from "@/features/cocautochuc/components/leftside/CoCauToChuc";
import { DanhSachTab } from "@/features/cocautochuc/components/rightside/DanhSachTab";
import { CoCauModalProvider } from "@/features/cocautochuc/contexts/CoCauModalContext";
import { useEffect } from "react";
import { DanhSachTabSelectUser } from "@/features/cocautochuc/components/rightside/DanhSachTabSelectUser";

const CaNhanChucWrapper = ({ role }: { role: string }) => {
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
            <DanhSachTabSelectUser />
          </section>
        </Spliter>
      </CoCauModalProvider>
    </FolderContextProvider>
  );
};

export default CaNhanChucWrapper;
