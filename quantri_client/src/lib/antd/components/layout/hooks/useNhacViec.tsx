import { Service } from "@/services"
import { useCallback, useEffect, useMemo, useState } from "react"
import { NhacViecLinkResponseKey, NhacViecResponse, nhacViecLabelMapper, nhacViecLinkMapper, nhacViecMapper } from "../data/nhacViecMapper"
import { Badge, Dropdown, MenuProps } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { BellOutlined } from "@ant-design/icons"
import { AntdMenu } from "../.."
import { useAppSelector } from "@/lib/redux/Hooks"
import { IMenu } from "@/features/danhmucmenu/models"

export type NhacViecHookParams = {
  hideNhacViecOnMenu?: boolean 
}

const getNhacViecMenuParam = (menus: IMenu[]): string[]=> {
  const res : string[]= []
  menus.forEach((menu) => {
    const nhacViecValue = nhacViecMapper[menu.fullPath] as string
    if(nhacViecValue){
      res.push(nhacViecValue)
    }
  })
  return [...new Set(res)];
}

export const useNhacViec = ({hideNhacViecOnMenu = false} : NhacViecHookParams) => {
  const [nhacViec, setNhacViec] = useState<NhacViecResponse>()
  const {sideBarMenu} = useAppSelector(state => state.menu)

  // useEffect(() => {
  //   (async () => {
  //     if (location.pathname.includes(Service.primaryRoutes.dvc.root) && sideBarMenu) {
  //       const nhacViecReqParams = getNhacViecMenuParam(sideBarMenu)
  //       // const res = await tiepNhanHoSoTrucTuyenApi.NhacViec({Menus: nhacViecReqParams})
  //       // const respData = res.data.data
  //       // if (respData) {
  //       //   setNhacViec(respData)
  //       // }
  //       // setNhacViec(undefined)
  //     }
  //   })()
  // }, [location.pathname, sideBarMenu])

  const BadgeBell = useMemo(() => {
    const items = nhacViec ? (Object.keys(nhacViec) as Array<NhacViecLinkResponseKey>).map((key)  => {
     return {
      key: nhacViecLinkMapper[key],
      label: nhacViecLabelMapper[key](`${nhacViec[key]}`),
      count: nhacViec[key]
     }
    }) : null
    const availableKeys = nhacViec ? Object.keys(nhacViec): []
    let totalCount = 0;
    availableKeys.forEach((key) => {
      totalCount += (nhacViec as any)[key]
    })

    return <Badge count={totalCount} overflowCount={9999} offset={[5,0]}>
      <Dropdown menu={{items: items?.filter(x => x.count != 0) || []} as any} rootClassName="nhac_viec_dvc_dropdown" trigger={["click"]} placement="bottomRight">
        <BellOutlined style={{fontSize:22}} role="button"/>
      </Dropdown>
    </Badge>
  }, [nhacViec])

  const _internalRenderMenuItem: MenuProps["_internalRenderMenuItem"] = useCallback((originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>, props: any, stateProps: {
    selected: boolean;
  }) => {
    const nhacViecMenuItem = nhacViecMapper[props.eventKey]
    const renderNhacViecCount = <span style={{ color: "red" }}> {nhacViec && nhacViecMenuItem ? `(${nhacViec[nhacViecMenuItem]})` : undefined}</span>
    const cloneNode = React.cloneElement(originNode, {},
      <span className='ant-menu-title-content'>
        <Link to={props.eventKey}>{props.title} {hideNhacViecOnMenu ? null: renderNhacViecCount}</Link>
      </span>
    )
    return <> {cloneNode} </>
  }, [ nhacViec, hideNhacViecOnMenu])

  return {
    _internalRenderMenuItem,
    BadgeBell
  }
}