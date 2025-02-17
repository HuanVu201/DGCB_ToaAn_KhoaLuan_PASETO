import { useEffect, useState } from "react"
import { userService } from "../services"
import { DanhSachUserGroupVaiTroDto } from "../models/ApplicationUserGroups"
import { AntdSpace } from "@/lib/antd/components"
import { Card, Modal, Typography } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { authService } from "@/services"
import { setAuth } from "@/features/auth/redux/Slice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ChuyenVaiTroModal = () => {
    const [vaiTros, setVaiTros] = useState<DanhSachUserGroupVaiTroDto[]>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const res = await userService.DanhSachVaiTro();
                setVaiTros(res.data.data)
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false)
            }
        })()
    }, [])
    return <AntdSpace direction="vertical" style={{width:"100%"}}>
        {vaiTros?.map((vaiTro) => (<>
            <VaiTroItem vaiTro={vaiTro}/>
        </>))}
    </AntdSpace>
}

const VaiTroItem = ({vaiTro}: {vaiTro: DanhSachUserGroupVaiTroDto}) => {
    const {data: credential, parseToken} = useAppSelector(state => state.auth)
    const isCurrentUserGroup = parseToken?.userGroupId == vaiTro.userGroupId
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onClick = async () => {
        if(isCurrentUserGroup) {
            toast.info("Không thể chọn vai trò hiện tại")
            return;
        }
        Modal.confirm({
            title:"Xác nhận chuyển vai trò",
            onOk: async () => await handlerChangUserGroup(),
        })
    }
    const handlerChangUserGroup = async () => {
        try {
            if(credential){
                const newTokenData = await authService.ChangeUserGroup({
                    token: credential.token,
                    refreshToken: credential.refreshToken,
                    userGroupId: vaiTro.userGroupId
                })
                if(newTokenData.status == 200) {
                    dispatch(setAuth(newTokenData.data))
                    navigate(0)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("có lỗi xảy ra, vui lòng thử lại sau");
        }
    }
    return <Card hoverable style={{backgroundColor:isCurrentUserGroup ? "lightcyan" : undefined}} onClick={onClick}>
        <Typography.Title level={5}>{vaiTro.tenDonVi}</Typography.Title>
        <Typography.Text>{vaiTro.tenPhongBan}</Typography.Text>
    </Card>
}

export default ChuyenVaiTroModal