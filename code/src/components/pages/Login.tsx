import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppForm } from "libs/Hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, InputWithIcon, joi } from "components/shared/form/Form";
import SubmitButton from "components/shared/form/SubmitButton";
import { setUserSession } from "libs/Helpers";


type TypeLogin = {
  userName: string;
  password: string;
}

const Login = () => {

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  const navigate = useNavigate();

  //#region Schema Management

  const initialState: TypeLogin = {
    userName: "",
    password: "",
  };

  const schema = joi.object<TypeLogin>({
    userName: joi.string().empty("").required().label("User Name"),
    password: joi.string().empty("").required().label("Password")
  });

  const methods = useAppForm<TypeLogin>({
    schema,
    initialState
  });

  //#endregion

  const handleShowPassword = () => {
    setIsShowPassword(prevState => !prevState);
  };

  const onSubmit = async () => {
    try {
      console.log("onSubmit", methods.getValues());

      setUserSession("token", methods.getValues().userName);

      navigate("/create-domain");
    } catch (error: any) {
      console.log("exception", error);
    }
  };

  return (
    <div className="account-screen">
      <div className="account-container pd-10">
        <div className="account-header">
          <div className="account-logo">
            {/* <Link to="/">
                    <LogoImg />
                  </Link> */}
          </div>
          <div className="color-black fs-16">Please login to your account</div>
        </div>

        <div className="card light mgt-lg">
          <div className="card-body nopdt">
            <Form
              methods={methods}
              onSubmit={onSubmit}
            >
              {
                localErrorMessage !== "" &&
                <div className="fs-16 text-danger text-center pdb-20">
                  {localErrorMessage}
                </div>
              }

              <div className="pdb-20">
                <Input
                  required
                  name="userName"
                  label="User Name"
                  InputLabelProps={{
                    shrink: true,
                    className: "login-input-label"
                  }}
                />
              </div>
              <div className="pdb-lg">
                <InputWithIcon
                  required
                  name="password"
                  label="Password"
                  type={isShowPassword ? "text" : "password"}
                  icon={isShowPassword ? <VisibilityOff /> : <Visibility />}
                  onIconClick={handleShowPassword}
                  InputLabelProps={{
                    shrink: true,
                    className: "login-input-label"
                  }}
                />
              </div>
              <div className="pdb-lg text-center">
                <SubmitButton
                  className="login-button"
                  label="Login"
                  isUseLoading={true}
                  loadingLabel="Logging in..."
                />
              </div>
              <div className="text-center">
                <Link to="/account/forgot-password" className="fs-16">Forgot Password?</Link> &nbsp;|&nbsp; <Link to="/account/forgot-username" className="fs-16">Forgot User Name?</Link>
              </div>
              <div className="text-center mgt mgb-sm">
                <a
                  href={`https://credsys.com.au/privacy-policy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="color-secondary"
                >
                  Privacy Policy
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;