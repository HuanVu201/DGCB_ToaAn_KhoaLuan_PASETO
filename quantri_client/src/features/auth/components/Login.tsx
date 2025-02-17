import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Space,
  ConfigProvider,
} from "antd";
import { ILogin } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { GetToken } from "../redux/Actions";
import { stat } from "fs";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Service } from "@/services";
import "../../../../public/sass/login.scss";
import {
  SearchConfig,
  SearchPublicConfig,
} from "@/features/config/redux/action";
import Logo from "../../../../src/assets/images/LogoToaAn.png";
import Logosvg from "../../../../public/images/svg-image-1.svg";
export const Login = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<ILogin>();
  const { data: auth } = useAppSelector((state) => state.auth);
  const { publicModule } = useAppSelector((state) => state.config);
  const [useSecurityCode, setUseSecurityCode] = useState<boolean>(false);
  const pageLogin = import.meta.env.VITE_Page_Login === "default"
  useEffect(() => {
    dispatch(SearchPublicConfig());
  }, []);
  const [tenUngDung, tenDonVi, footerDangNhap, logoDangNhap] = useMemo(() => {
    return [
      publicModule?.find((x) => x.code == "ten-ung-dung"),
      publicModule?.find((x) => x.code == "ten-don-vi"),
      publicModule?.find((x) => x.code == "footer-dang-nhap"),
      publicModule?.find((x) => x.code == "logo-dang-nhap"),
    ];
  }, [publicModule]);

  useEffect(() => {
    publicModule?.map((item) => {
      if (item.code == "security-code" && item.content == "1") {
        setUseSecurityCode(true);
      }
    });
  }, [publicModule]);
  const onFinish = async (formData: ILogin) => {
    await dispatch(GetToken(formData));
  };
  if (auth !== undefined) {
    return <Navigate to={Service.primaryRoutes.redirectUser} />;
  }

  return (
    <>
    {pageLogin ? <>
      <div
        style={{ height: "100vh", justifyContent: "center" }}
        className="d-flex flex-center flex-column flex-lg-row-fluid"
      >
        <div className="d-flex justify-content-center mb-3">
          {logoDangNhap?.content ? (
            <img
              src={logoDangNhap?.content}
              style={{ width: "125px", height: "125px" }}
              alt=""
            ></img>
          ) : (
            <></>
          )}
        </div>
        <div className="text-center mb-11">
          <h3
            className="text-dark fw-bolder mb-3"
            style={{ wordBreak: "break-word", fontSize: "1.5rem" }}
          >
            {tenUngDung?.content}
          </h3>
          <div
            className="text-gray-500 fw-bold"
            style={{
              wordBreak: "break-word",
              fontSize: "1.25rem",
              color: "#8EAEC3",
            }}
          >
            {tenDonVi?.content}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Form
            style={{ width: 450 }}
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{ email: "", password: "" }}
          >
            <label className="form-label fs-6 fw-bolder text-dark">
              Tài khoản{" "}
            </label>
            <Form.Item
              name="userName"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            >
              <Input
                placeholder="Tài khoản"
                style={{ minHeight: "38px" }}
              ></Input>
            </Form.Item>

            <label className="form-label fs-6 fw-bolder text-dark">
              Mật khẩu
            </label>
            <Form.Item
              name="password"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                style={{ minHeight: "38px" }}
              ></Input.Password>
            </Form.Item>
            {useSecurityCode ? (
              <>
                <label className="form-label fs-6 fw-bolder text-dark">
                  Mã bảo mật
                </label>
                <Form.Item
                  name="securityCode"
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng nhập mã bảo mật" },
                  ]}
                >
                  <Input.Password
                    placeholder="Mã bảo mật"
                    style={{ minHeight: "38px" }}
                  ></Input.Password>
                </Form.Item>
              </>
            ) : null}

            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  width: "-webkit-fill-available",
                  marginTop: "20px",
                  backgroundColor: "#009ef7",
                  minHeight: "38px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Đăng nhập
                </span>
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="text-center mb-11">
          <span
            style={{ color: "#8EAEC3", fontWeight: "500", fontStyle: "italic" }}
          >
            {footerDangNhap?.content}
          </span>
        </div>
      </div>
    </> : <>
    <div className="login-page">
      <Row justify="center" align="middle" className="login-container">
        {/* Logo và tiêu đề */}
        <Col span={24} className="header-container">
          <div className="header">
            <Row justify="center" align="middle">
              {/* Logo */}
              <Col className="logo-container">
              {logoDangNhap?.content ? (<> <img  src={logoDangNhap?.content} alt="Logo" className="logo" /></>) : (<></>)
              }
              </Col>
              {/* Tiêu đề */}
              <Col className="title-container">
                {tenDonVi?.content ? (<><h1 className="main-title">{tenDonVi.content}</h1></>) : (<></>)}
                <h2 className="sub-title">
                  THE SUPREME PEOPLE’S COURT OF THE SOCIALIST REPUBLIC OF VIETNAM
                </h2>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={15}></Col>
        {/* Form đăng nhập */}
        <Col span={9} className="form-container">
          {/* <h3 className="form-title">
            ĐĂNG NHẬP HỆ THỐNG
            <br />
            ĐÁNH GIÁ CÁN BỘ, CÔNG CHỨC
          </h3> */}
          {tenUngDung?.content ? (<> <h3 className="form-title">
           {tenUngDung.content}
          </h3></>) : (<></>)}
          <Form name="login" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            >
              <Input placeholder="Tài khoản" className="input-field" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password placeholder="Mật khẩu" className="input-field" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" noStyle>
              <ConfigProvider
                theme={{
                  components: {
                    Checkbox: { colorPrimary: "#CE1F1F", borderRadius: 3 },
                  },
                }}
              >
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </ConfigProvider>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" className="submit-button">
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <a href="/HDSD" className="help-link">
                Hướng dẫn sử dụng
              </a>
            </Form.Item>
          </Form>

          <Col span={24} className="footer">
          {footerDangNhap?.content ? (<><span><a href="#" className="footer-link">{footerDangNhap.content}</a></span></>): (<></>)}
            {/* <span>
              © 2023{" "}
              <a href="#" className="footer-link">
                TÒA ÁN NHÂN DÂN TỐI CAO
              </a>
            </span> */}
          </Col>
        </Col>
      </Row>
    </div>
    </>}

    
    </>
  );
};
