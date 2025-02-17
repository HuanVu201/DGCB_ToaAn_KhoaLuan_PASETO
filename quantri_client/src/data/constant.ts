import moment from "moment"
import dayjs from 'dayjs'

export const HOST_PATH = import.meta.env.VITE_HOST_PATH
export const HOST_PATH_FILE = import.meta.env.VITE_HOST_PATH_FILE
export const API_VERSION = import.meta.env.VITE_API_VERSION
export const API_VERSION_DEFAULT = import.meta.env.VITE_API_VERSION_DEFAULT
export const BEARER_TOKEN =  import.meta.env.VITE_BEARER_TOKEN
export const VITE_THONGTINCSDLDANCU_API_ENDPOINT = import.meta.env.VITE_THONGTINCSDLDANCU_API_ENDPOINT
export const VITE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
export const SIDER_MENU_WIDTH = '250px'
export const FORMAT_DATE = "DD/MM/YYYY HH:mm:ss"
export const FORMAT_DATE_ISO = "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
export const FORMAT_DATE_FORMIO = "YYYY/MM/DD"
export const FORMAT_DATE_WITHOUT_SECOND = "DD/MM/YYYY HH:mm"
export const FORMAT_TIME = "HH:mm, DD/MM/YYYY"
export const FORMAT_DATE_WITHOUT_TIME = "DD/MM/YYYY"
export const FORMAT_DATE_WITHOUT_DATE = "HH:mm:ss"
export const FORMAT_ISO_DATE = "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
export const ID_SEPARATE = "##"
export const ID_SEPARATE_ONE_THUNK = "#"
export const DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR="#ffe000"
export const DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH=300
export const DEFAULT_HOUR_PER_DAY=8
export const DANG_NHAP_SSO_URL="https://apidvc.hatinh.gov.vn/sso/authorize?state=aHR0cHM6Ly9kdmN0aGFuaGhvYS5oYW5oY2hpbmhjb25nLm5ldC9wb3J0YWxkdmMvaG9tZQ=="
export const UPLOADFILE_ENDPOINT="files/uploadfilebucket"
export const GETFILE_ENDPOINT="files/getfilebucket"
export const UPLOADPUBLICFILE_ENDPOINT="files/uploadfile"
export const PORTAL_PRIMARY_COLOR= "#ce7a58"

export const DATE = new Date().getDate()
export const MONTH = new Date().getMonth() + 1
export const YEAR = new Date().getFullYear()
export const CURRENTTIME = moment().format('HH [giờ] mm [phút], [ngày] DD/MM/YYYY')
export const CURRENTTIME_ISOSTRING = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
export const NOTADMIN_ROUTE_ACCESS_TEXT = "Vui lòng đăng nhập tài khoản quản trị để tiếp tục"
export const ISMOBILE_AGENT = (/android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk-Accelerated|Mobile|PlayBook|BB10|MeeGo/i.test(navigator.userAgent))