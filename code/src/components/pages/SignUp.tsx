import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppForm } from "libs/Hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, InputWithIcon, joi } from "components/form-elements/Form";
import SubmitButton from "components/form-elements/SubmitButton";
import { setUserSession } from "libs/Helpers";
import Loader from "components/layout/parts/Loader";


type TypeSignUp = {
  userName: string;
  password: string;
}

const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  const navigate = useNavigate();

  //#region Schema Management

  const initialState: TypeSignUp = {
    userName: "",
    password: "",
  };

  const schema = joi.object<TypeSignUp>({
    userName: joi.string().empty("").required().label("User Name"),
    password: joi.string().empty("").required().label("Password")
  });

  const methods = useAppForm<TypeSignUp>({
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

      setUserSession("authToken");

      navigate("/");
    } catch (error: any) {
      console.log("exception", error);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="account-screen">
        <div className="account-container">
          <div className="account-header">
            <div className="account-logo">
              {/* <Link to="/">
              <LogoImg />
            </Link> */}
            </div>
            <span className="title">Sign Up</span>
          </div>

          <Form
            methods={methods}
            onSubmit={onSubmit}
          >
            {
              localErrorMessage !== "" &&
              <div className="text-danger text-center pb-4">
                {localErrorMessage}
              </div>
            }

            <div className="pb-4">
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
            <div className="pb-4">
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
            <div className="pb-4 text-center">
              <SubmitButton
                className="login-button"
                label="Sign Up"
              />
            </div>
            <div className="text-center">
              <Link to="/sign-in" className="">Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;