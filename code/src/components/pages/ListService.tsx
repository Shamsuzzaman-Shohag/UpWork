import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Loader from "components/layout/parts/Loader";
import { tokens } from "theme";
import Heading from "components/layout/parts/Heading";

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

const ServiceList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const loadUsers = async () => {
    try {
      // await dispatchLoading(true);
      setIsLoading(true);

      const payload = {
        pageIndex: serverSideParameters.page + 1,
        pageSize: serverSideParameters.rowsPerPage,
        sortField: serverSideParameters.sortField,
        sortAsc: serverSideParameters.sortDirection === "asc",
        // ...watch
      };

      // const response = await getAllUserList(payload);

      const requestAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiOTVQRE1YQjk1RkU4NjUzQkI3NEQ0OTA5ODNGMjZFMkM3MzIxRjlBMCIsIlJPTEVfSUQiOiJTWVNURU1fQURNSU4iLCJBVVRIX1NUQVRFX1JFRiI6IkY1NUQxOUI3MkY5QzQzMDNCMzQ4NzcwQkUyMTkxMEUyIiwiREVWSUNFX1JFRiI6IjUxRTlBMUE0MDM4NTQyMjJCOTI3QkVFNEVGMkVENEQwIiwibmJmIjoxNzA3NzM2MTE5LCJleHAiOjE3MDc3NDMzMTksImlhdCI6MTcwNzczNjExOX0.ahRDH9U_Oxl9AXbxLs6oldHGxHwEfNnmySUCAQyNwgs";

      // await fetch("https://api.planability-dev.com.au/user/list",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(payload),
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Authorization": "Bearer " + requestAccessToken
      //     }
      //   }
      // ).then(response => {
      //   console.log({ response });
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      //   return response.json();
      // }).then(responseData => {
      //   console.log('fetched data', responseData);
      //   setData(responseData.data?.items ?? []);
      //   setRowCount(responseData.data.totalCount);
      // }).catch(error => {
      //   console.error('Error:', error);
      // });

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

  useEffect(() => {
    console.log({ serverSideParameters });
    loadUsers();
  }, [serverSideParameters]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Box m="20px">
        <Heading title="Service List" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <MUIDataTable
            title=""
            data={data}
            columns={columns}
            options={{
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
    </>
  );
};

export default ServiceList;
