import { MenuProps } from "antd/es/menu";
import { AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, UserOutlined } from '@ant-design/icons';
import { Service } from '@/services'
import { useAppDispatch } from "@/lib/redux/Hooks";
import { resetData } from "@/features/auth/redux/Slice";
import resetDataUser from '../features/user/redux/Slice'
import { Link } from "react-router-dom";
const { apiEndpoints, primaryRoutes } = Service

