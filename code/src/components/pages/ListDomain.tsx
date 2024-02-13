import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Heading from "components/layout/parts/Heading";
import { showNotification } from "libs/Helpers";
import { Form, Input, ResetButton, SubmitButton, joi } from "components/form-elements/Form";
import { useAppForm } from "libs/Hooks";
import Loader from "components/layout/parts/Loader";

type TypeUserListItem = {
  userId: string;
  participantId: string;
  userName: string;
  label: string;
  roleId: string;
  roleName: string;
  email: string;
  phone: string;
  mobile: string;
  agencyId: string;
  agencyName: string;
  company: string;
  isArchived: boolean;
  isLocked: boolean;
  isPayabilityFacilitator: boolean;
  welcomeEmailSentAt?: Date;
  showContextMenu: boolean;
  canEdit: boolean;
  canArchive: boolean;
  canRestore: boolean;
  canDisassociate: boolean;
  canUnlock: boolean;
  canLoginAs: boolean;
  archivedLabel: string;
  supportTypes: string[];
};

type TypeSearchService = {
  serviceName: string;
  domain: string;
  minPrice: number | string;
  maxPrice: number | string;
}

const DomainList = () => {

  const apiBaseUrl = process.env.REACT_APP_API_DOMAIN;

  console.log({ apiBaseUrl })

  const initialParameters = {
    sortField: "",
    sortDirection: 'asc',
    page: 0,
    rowsPerPage: 10
  };

  const [serverSideParameters, setServerSideParameters] = useState(initialParameters);
  const [rowsPerPage, setRowsPerPage] = useState(initialParameters.rowsPerPage);
  const [data, setData] = useState<TypeUserListItem[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //#region Schema Management

  const initialState: TypeSearchService = {
    serviceName: "",
    domain: "",
    minPrice: "",
    maxPrice: ""
  };

  const schema = joi.object<TypeSearchService>({
    serviceName: joi.string().empty("").label("Service"),
    domain: joi.string().empty("").label("Domain"),
    minPrice: joi.number().empty("").greater(0).label("Min Price"),
    maxPrice: joi.number().empty("").greater(0).label("Min Price")
  });

  const methods = useAppForm<TypeSearchService>({
    schema,
    initialState
  });

  //#endregion

  const columns = [
    {
      name: "label",
      label: "Name",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "roleName",
      label: "Role",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "userName",
      label: "User Name",
      options: {
        filter: false,
        sort: true
      }
    }
  ];

  const loadTableData = async () => {
    try {
      setIsLoading(true);

      const payload = {
        pageIndex: serverSideParameters.page + 1,
        pageSize: serverSideParameters.rowsPerPage,
        sortField: serverSideParameters.sortField,
        sortAsc: serverSideParameters.sortDirection === "asc",
        // ...watch
      };

      // const response = await getAllUserList(payload);

      const requestAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiOTVQRE1YQjk1RkU4NjUzQkI3NEQ0OTA5ODNGMjZFMkM3MzIxRjlBMCIsIlJPTEVfSUQiOiJTWVNURU1fQURNSU4iLCJBVVRIX1NUQVRFX1JFRiI6IkY1NUQxOUI3MkY5QzQzMDNCMzQ4NzcwQkUyMTkxMEUyIiwiREVWSUNFX1JFRiI6IjQ4OUZFQUI2MUFGMjQwRUZBMjFGQkM4RUQ3NTE3NUE2IiwibmJmIjoxNzA3ODExNzE3LCJleHAiOjE3MDc4MTg5MTcsImlhdCI6MTcwNzgxMTcxN30.awJ9hGwaVTlkhtU0YJP3F97VMv8sAhUtNwN10HyECZA";

      await fetch("https://api.planability-dev.com.au/user/list",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + requestAccessToken
          }
        }
      ).then(response => {
        console.log({ response });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(responseData => {
        console.log('fetched data', responseData);
        setData(responseData.data?.items ?? []);
        setRowCount(responseData.data.totalCount);

        showNotification("SUCCESS", "Success");
      }).catch(error => {
        console.error('Error:', error);
      });

      // if (response.success && response.data) {
      //   setData(response.data?.items ?? []);
      //   setRowCount(response.data.totalCount);
      // } else {
      //   throw response.errorMessage;
      // }
      setIsLoading(false);
      // await dispatchLoading(false);
    } catch (error: any) {
      // await dispatchLoading(false);
      // showNotification(NOTIFICATION_TYPE.ERROR, error);
      // console.log("Exception", error);
    }
  };

  const onSubmit = async () => {
    try {
      console.log("onSubmit", methods.getValues());

    } catch (error: any) {
      console.log("exception", error);
    }
  };

  // useEffect(() => {
  //   // console.log({ serverSideParameters });
  //   loadTableData();
  // }, [serverSideParameters]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Box m="20px">
        <Heading title="Domain List" />
        <Box
          m="20px 0 0 0"
          height="75vh"
        >
          <Form
            methods={methods}
            onSubmit={onSubmit}
          >
            <>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-3">
                  <Input
                    name="serviceName"
                    label="Service"
                  />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                  <Input
                    name="minPrice"
                    label="Min Price"
                  />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                  <Input
                    name="maxPrice"
                    label="Max Price"
                    type="number"
                  />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                  <Input
                    name="domain"
                    label="Domain"
                    type="number"
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
                      <SubmitButton label="Search" />
                    </span>
                  </div>
                </div>
              </div>
            </>
          </Form>

          <Box mt="30px">
            <MUIDataTable
              title=""
              data={data}
              columns={columns}
              options={{
                tableBodyMaxHeight: "600px",
                rowsPerPage: rowsPerPage,
                page: serverSideParameters.page,
                jumpToPage: false,
                count: rowCount,
                search: false,
                download: false,
                filter: false,
                print: false,
                viewColumns: false,
                selectableRows: "none",
                rowsPerPageOptions: [10, 25, 50, 100],
                responsive: "vertical",
                elevation: 0,
                rowHover: false,
                serverSide: true,
                onColumnSortChange: (column, direction) => {
                  // console.log('onColumnSortChange :>> ', { column, direction });
                  setServerSideParameters({
                    ...serverSideParameters,
                    sortField: column,
                    sortDirection: direction
                  });
                },
                onChangePage: (currentPage) => {
                  // console.log("onChangePage :>> ", currentPage);
                  setServerSideParameters({
                    ...serverSideParameters,
                    page: currentPage
                  });
                },
                onChangeRowsPerPage: (numberOfRows) => {
                  // console.log("onChangeRowsPerPage :>> ", numberOfRows);
                  setServerSideParameters({
                    ...serverSideParameters,
                    page: 0,
                    rowsPerPage: numberOfRows
                  });
                  setRowsPerPage(numberOfRows);
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DomainList;