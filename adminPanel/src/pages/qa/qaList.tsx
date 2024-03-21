import React, { useEffect, useState } from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  CreateButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  CrudFilters,
  HttpError,
  getDefaultFilter,
  useDelete,
  useNavigation,
} from "@refinedev/core";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

interface IUserList {
  _id: string;
  email: string;
  name: string;
  // role: string;
  //   status: "published" | "draft" | "rejected";
}

interface IUserFilterVariables {
  q: string;
  email: string;
  name: string;
}

export const NewDataGrid = () => {
  const { dataGridProps } = useDataGrid<HttpError>({
    // IUserFilterVariables
    syncWithLocation: false,
    filters: { mode: "off" },
    sorters: { mode: "off" },
    pagination: { mode: "off", pageSize: 50, current: 1 },
  });
  const {
    filterMode,
    filterModel,

    onFilterModelChange,
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    ...restDataGridProps
  } = dataGridProps;

  const newData = dataGridProps.rows.filter((row) => row.isNew === true);
  const { edit, show } = useNavigation();

  const refresh = () => window.location.reload();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "profile",
        flex: 1,
        headerName: "Profile",
        minWidth: 200,
        filterable: true,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 120,
        filterable: true,
        flex: 1,
      },
      {
        field: "headquarter",
        headerName: "Headquarter",
        minWidth: 120,
        filterable: true,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        type: "string",
        minWidth: 200,
        filterable: true,
        flex: 1,
      },
      {
        field: "isEdited",
        headerName: "Updated",
        type: "string",
        minWidth: 120,
        filterable: true,
        flex: 1,
        // hideable: true,
      },
      {
        field: "isNew",
        headerName: "New Data",
        type: "string",
        minWidth: 120,
        filterable: true,
        flex: 1,
        // hideable: true,
      },
      {
        field: "isPublished",
        headerName: "Published",
        type: "string",
        minWidth: 120,
        filterable: true,
        flex: 1,
        // hideable: true,
      },
      {
        field: " ",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton
                hideText
                recordItemId={row.id}
                onClick={() => show("qaCompanies", row._id)}
              />
            </>
          );
        },

        minWidth: 120,
      },
      {
        field: "",
        headerName: "Mark as Done",
        minWidth: 200,
        flex: 1,
        renderCell: (params: any) => {
          return (
            <>
              <Button
                variant="outlined"
                onClick={() => handleMarkAsDone(params)}
              >
                Mark as Done
              </Button>
            </>
          );
        },
      },
      // {
      //   field: "isPublished",
      //   headerName: "Is Published",
      //   type: "string",
      //   minWidth: 200,
      //   filterable: true,
      //   flex: 1,
      //   // hideable: true,
      // },
      // {
      //   field: " ",
      //   headerName: "Actions",
      //   flex: 1,
      //   sortable: false,
      //   disableColumnMenu: true,
      //   renderCell: function render({ row }) {
      //     return (
      //       <>
      //         <ShowButton
      //           hideText
      //           recordItemId={row.id}
      //           onClick={() => show("companies", row._id)}
      //         />
      //       </>
      //     );
      //   },

      //   minWidth: 120,
      // },
    ],
    []
  );

  const handleMarkAsDone = async (params: any) => {
    const payLoad = {
      isNew: false,
      isPublished: params.row.isEdited ? true : false,
    };
    const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

    try {
      const response = await axios.patch(
        API_URL + `/companies/company/${params.id}`,
        payLoad
      );
      if (response.status === 200) {
        console.log("Company updated successfully:", response.data);
        alert("Company reviewed by QA and marked as Done successfully!");
        refresh();
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // console.log(params);
  };

  return (
    <DataGrid
      {...restDataGridProps}
      rows={newData}
      getRowId={(row) => row._id}
      columns={columns}
      autoHeight
      filterMode={filterMode}
      filterModel={undefined}
      onFilterModelChange={onFilterModelChange}
      paginationMode={paginationMode}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      // autoPageSize
      // rowsPerPageOptions={[10, 20, 30, 50, 100]}
      pageSizeOptions={[10, 20, 50, 100]}
      disableColumnFilter
      style={{
        position: "relative",
        bottom: "40px",
      }}
    />
  );
};

export const QaList: React.FC = () => {
  const { dataGridProps } = useDataGrid<HttpError>({
    // IUserFilterVariables
    syncWithLocation: false,
    filters: { mode: "off" },
    sorters: { mode: "off" },
    pagination: { mode: "client", pageSize: 50, current: 1 },
  });
  const {
    filterMode,
    filterModel,
    onFilterModelChange,
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    ...restDataGridProps
  } = dataGridProps;

  const newData = dataGridProps.rows.filter((row) => row.isNew === true);
  const oldData = dataGridProps.rows.filter((row) => row.isNew === false);

  const { edit, show } = useNavigation();

  const refresh = () => window.location.reload();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "profile",
        flex: 1,
        headerName: "Profile",
        minWidth: 200,
        filterable: true,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 120,
        filterable: true,
        flex: 1,
      },
      {
        field: "headquarter",
        headerName: "Headquarter",
        minWidth: 120,
        filterable: true,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        type: "string",
        minWidth: 200,
        filterable: true,
        flex: 1,
      },
      {
        field: "isEdited",
        headerName: "Updated",
        type: "string",
        minWidth: 120,
        filterable: true,
        flex: 1,
        // hideable: true,
      },
      {
        field: "isNew",
        headerName: "New Data",
        type: "string",
        minWidth: 120,
        filterable: true,
        flex: 1,
        // hideable: true,
      },
      {
        field: "isPublished",
        headerName: "Published",
        type: "string",
        minWidth: 120,
        filterable: true,
        flex: 1,
        // hideable: true,
      },
      // {
      //   field: "isPublished",
      //   headerName: "Is Published",
      //   type: "string",
      //   minWidth: 200,
      //   filterable: true,
      //   flex: 1,
      //   // hideable: true,
      // },
      {
        field: " ",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton
                hideText
                recordItemId={row.id}
                onClick={() => show("qaCompanies", row._id)}
              />
            </>
          );
        },

        minWidth: 120,
      },
      {
        field: "  ",
        headerName: "Mark to Publish",
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
        renderCell: function render({ row }) {
          return (
            <>
              {row.isPublished === true ? (
                <Button
                  variant="outlined"
                  onClick={() => handleUnPublishCompany(row)}
                >
                  Mark to UnPublish
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => handlePublishCompany(row)}
                >
                  Mark to Publish
                </Button>
              )}
            </>
          );
        },

        minWidth: 200,
      },
    ],
    []
  );

  const handlePublishCompany = async (params: any) => {
    const patchPayLoad = {
      isNew: false,
      isPublished: true,
    };

    const payload = { ...params };

    delete payload.__v;
    delete payload.isNew;
    delete payload.isPublished;
    delete payload.isEdited;
    const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

    try {
      const response = await axios.post(
        API_URL + `/companies/create-published`,
        payload
      );
      if (response.status === 201) {
        console.log("Company published successfully:", response.data);
        alert("Company Published successfully!");
        refresh();
        try {
          const response = await axios.patch(
            API_URL + `/companies/company/${params._id}`,
            patchPayLoad
          );
          if (response.status === 200) {
            console.log("Company updated successfully to status publish");
            // alert("Company reviewed by QA and marked as Done successfully!");
          } else {
            console.log("Unexpected response:", response.status, response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // console.log(params, "++--++");
    // console.log(payload);
  };

  const handleUnPublishCompany = async (params: any) => {
    const patchPayLoad = {
      isNew: false,
      isPublished: false,
    };
    const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

    try {
      const response = await axios.delete(API_URL + `/companies/${params._id}`);
      if (response.status === 200) {
        console.log("Company deleted successfully");
        alert("Company UnPublished successfully!");
        refresh();
        try {
          const response = await axios.patch(
            API_URL + `/companies/company/${params._id}`,
            patchPayLoad
          );
          if (response.status === 200) {
            console.log("Company updated successfully to status Unpublish");
            // alert("Company reviewed by QA and marked as Done successfully!");
          } else {
            console.log("Unexpected response:", response.status, response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/createCompany`;
    navigate(path);
  };

  return (
    <List
      title={"Company List"}
      // headerButtons={<CreateButton onClick={routeChange} />}
    >
      <Box height={"40px"}></Box>
      {/* <DataGrid
        {...restDataGridProps}
        rows={newData}
        getRowId={(row) => row._id}
        columns={columns}
        autoHeight
        filterMode={filterMode}
        filterModel={undefined}
        onFilterModelChange={onFilterModelChange}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        // autoPageSize
        // rowsPerPageOptions={[10, 20, 30, 50, 100]}
        pageSizeOptions={[10, 20, 50, 100]}
        disableColumnFilter
        style={{
          position: "relative",
          bottom: "40px",
        }}
      /> */}
      <Typography variant="h6" style={{ position: "relative", top: "-50px" }}>
        New Companies Info :
      </Typography>
      <NewDataGrid />
      <Box height={"40px"}></Box>
      <Typography variant="h6" style={{ position: "relative", top: "-50px" }}>
        Companies Marked as Done :
      </Typography>
      <DataGrid
        {...restDataGridProps}
        rows={oldData}
        getRowId={(row) => row._id}
        columns={columns}
        autoHeight
        filterMode={filterMode}
        filterModel={undefined}
        onFilterModelChange={onFilterModelChange}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        // autoPageSize
        // rowsPerPageOptions={[10, 20, 30, 50, 100]}
        pageSizeOptions={[10, 20, 50, 100]}
        disableColumnFilter
        style={{
          position: "relative",
          bottom: "40px",
        }}
      />
    </List>
  );
};
