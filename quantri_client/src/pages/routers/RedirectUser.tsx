import { setUserData } from "@/features/user/redux/Slice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IParseUserToken } from "@/models"
import { parseJwt } from "@/utils/common"
import { useEffect } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "@/services"
import { Spin } from "antd"
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState"
const {primaryRoutes} = Service

export const RedirectUser = () => {
    const {data: auth, loading: authLoading} = useAppSelector(state => state.auth)
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        
        if(auth !== undefined){
            const userData: IParseUserToken = parseJwt(auth.token)
            dispatch(togglerLoginModalVisible(false))
            if(userData){
                const pathName = location.pathname
                if(pathName == primaryRoutes.redirectUser){
                    navigate(primaryRoutes.dashboard.root, {replace: true})
                } else {
                    navigate(pathName, {replace: true})
                }
            }
            // dispatch(setUserData(userData))
        } else {
            navigate(primaryRoutes.login, {replace: true})
        }
    }, [auth,location])
    
    return <Spin style={{display:"flex", alignItems:"center", justifyContent:"center"}} spinning={authLoading}>

    </Spin>
}