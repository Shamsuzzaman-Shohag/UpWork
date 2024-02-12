import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import Heading from "components/layout/parts/Heading";
import { useAppForm } from "libs/Hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, InputWithIcon, ResetButton, joi } from "components/form-elements/Form";
import SubmitButton from "components/form-elements/SubmitButton";

type TypeCreateDomain = {
  domainName: string;
  siteUrl: string;
  apiKey: string;
}

const CreateDomain = () => {

  //#region Schema Management

  const initialState: TypeCreateDomain = {
    domainName: "",
    siteUrl: "",
    apiKey: "",
  };

  const schema = joi.object<TypeCreateDomain>({
    domainName: joi.string().empty("").required().label("User Name"),
    siteUrl: joi.string().empty("").required().label("Site URL"),
    apiKey: joi.string().empty("").required().label("Password")
  });

  const methods = useAppForm<TypeCreateDomain>({
    schema,
    initialState
  });

  //#endregion

  const onSubmit = async () => {
    try {
      console.log("onSubmit", methods.getValues());

    } catch (error: any) {
      console.log("exception", error);
    }
  };

  return (
    <Box m="20px">
      <Heading title="CREATE DOMAIN" />
      <Form
        methods={methods}
        onSubmit={onSubmit}
      >
        <>
          <div className="row">
            <div className="col-12 col-md-6 col-xl-4">
              <Input
                required
                name="domainName"
                label="Domain Name"
              />
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <Input
                required
                name="siteUrl"
                label="Site Url"
              />
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <Input
                required
                name="apiKey"
                label="Api Key"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 pt-4">
              <div className=" text-center text-lg-right">
                <span className="mt-0 mt-lg-3 mb-3">
                  <ResetButton label="Clear" />
                </span>

                <span className="mt-0 mt-lg-3 mb-3 ml-2 ml-lg-4">
                  <SubmitButton label="Save" />
                </span>
              </div>
            </div>
          </div>
        </>
      </Form>
    </Box>
  );
};

export default CreateDomain;