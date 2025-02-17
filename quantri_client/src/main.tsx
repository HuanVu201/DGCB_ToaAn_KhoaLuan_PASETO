import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./lib/antd/scss/customAntdStyle.scss";
import "./assets/sass/styles.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-splitter-layout/lib/index.css";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./lib/redux/Store.ts";
import { App, ConfigProvider } from "antd";
import "dayjs/locale/vi";
import locale from "antd/lib/locale/vi_VN";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { VITE_RECAPTCHA_SITE_KEY } from "./data/constant.ts";
import { MyRouterProvider } from "./pages/routers/MyRouterProvider.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            fontFamily:"'Roboto', Arial;",
            fontWeightStrong: 600,
            fontSize: 15
          },
          components: {
            Typography: {
              fontSize: 14,
              fontSizeHeading5: 16,
            },
            Form:{
              labelFontSize: 16,
            } as any,
            Timeline: {
              itemPaddingBottom: 30,
            },
            Layout: {
              headerBg: "#2C62B9",
              siderBg: "#2C62B9"
            } as any,
            Menu: {
              darkItemBg: "#2C62B9",
              darkItemColor: "#fff",
              darkItemHoverBg: "rgba(255,255,255,0.1)",
              darkSubMenuItemBg: "#2C62B9",
              darkItemHoverColor: "#F0F3E7",
              darkItemSelectedBg: "#F0F3E7",
              darkItemSelectedColor: "#173B70"
            },
            DatePicker: {
              colorTextDisabled: "#000"
            },
            Table: {
              padding: 8,
              paddingContentVertical:8,
              paddingContentVerticalLG:8,
              paddingContentVerticalSM:8,
              fontSizeHeading1: 50,
              borderColor: "#757474"
            } as any,
          },
        }}
      >
        <App>
          <PersistGate loading={null} persistor={persistor}>
          <MyRouterProvider/>
          </PersistGate>
        </App>
      </ConfigProvider>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
     
  </>
);
