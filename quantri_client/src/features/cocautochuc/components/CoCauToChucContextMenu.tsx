import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { useFolderContext } from "@/contexts/FolderContext";
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { SuaCoCauToChuc } from "./modals/SuaCoCauToChuc";
import { DelGroup } from "./modals/DelGroup";
import { DataNode } from "antd/es/tree";
import { DelGroupChild } from "./modals/DelGroupChild";
import { AddGroupChild } from "./modals/AddGroupChild";
import { useCoCauModalContext } from "../contexts/CoCauModalContext";

const COCAUTOCHUC_CONTEXTMENU: AntdMenuProps<never>["items"] = [
  {
    label: "Thêm nhóm con",
    key: "add",
    icon: <PlusCircleOutlined />,
    className: 'root.admin'
  },
  {
    label: "Sửa cơ cấu",
    key: "edit",
    icon: <EditOutlined />,
    className: 'root.admin'
  },

  {
    label: "Xoá nhóm",
    key: "del",
    icon: <DeleteOutlined />,
    className: 'root.admin##don-vi'
  },

  {
    label: "Xoá nhóm con",
    key: "delGroupChild",
    icon: <DeleteOutlined />,
    className: 'root.admin##don-vi'
  },
];

export const CoCauToChucContextMenu = ({
  top,
  left,
  setVisible,
  id,
  folder,
}: {
  top?: number;
  left?: number;
  id: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  folder?: DataNode;
}) => {
  const coCauToChucContext = useCoCauModalContext()

  const ref = useRef<HTMLDivElement>(null);
  const [addGroupModalVisible, setAddGroupModalVisible] = useState(false);
  const [suaCoCauToChucModalVisible, setSuaCoCauToChucModalVisible] =
    useState(false);
  const [delGroupModalVisible, setDelGroupModalVisible] = useState(false);
  const [delGroupChildModalVisible, setDelGroupChildModalVisible] =
    useState(false);
  const onCleanUp = useCallback(() => {
    setVisible(false);
  }, []);

  // useClickOutSide(ref, () => onCleanUp())
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        if (
          !suaCoCauToChucModalVisible &&
          !delGroupModalVisible &&
          !delGroupChildModalVisible &&
          !addGroupModalVisible
        )
          onCleanUp();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    ref,
    suaCoCauToChucModalVisible,
    delGroupModalVisible,
    delGroupChildModalVisible,
    addGroupModalVisible,
  ]);
  const onClick: AntdMenuProps<never>["onClick"] = (e) => {
    switch (e.key) {
      case "add":
        setAddGroupModalVisible(true);
        break;
      case "edit":
        setSuaCoCauToChucModalVisible(true);
        break;
      case "del":
        setDelGroupModalVisible(true);
        break;
      case "delGroupChild":
        setDelGroupChildModalVisible(true);
        break;
    }

    // setVisible(false)
  };
  return (
    <div ref={ref} style={{ top, left }} className="context-menu-wrapper">
      <AntdMenu
        items={COCAUTOCHUC_CONTEXTMENU.filter(x => x?.className?.includes(coCauToChucContext.role || ''))}
        mode="vertical"
        onClick={onClick}
      />
      {suaCoCauToChucModalVisible ? (
        <SuaCoCauToChuc
          visible={suaCoCauToChucModalVisible}
          handlerClose={() => setSuaCoCauToChucModalVisible(false)}
          folderId={id}
        />
      ) : null}
      {delGroupModalVisible ? (
        <DelGroup
          visible={delGroupModalVisible}
          handleCancel={() => setDelGroupModalVisible(false)}
          folderId={id}
          folder={folder}
        />
      ) : null}
      {delGroupChildModalVisible ? (
        <DelGroupChild
          visible={delGroupChildModalVisible}
          handleCancel={() => setDelGroupChildModalVisible(false)}
          folder={folder}
        />
      ) : null}
      {addGroupModalVisible ? (
        <AddGroupChild
          visible={addGroupModalVisible}
          handlerClose={() => setAddGroupModalVisible(false)}
          folderId={id}
          folder={folder}
        />
      ) : null}
    </div>
  );
};
