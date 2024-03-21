import React, { useState } from "react";
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
import { axiosInstance } from "@refinedev/simple-rest";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TransitionProps } from "@mui/material/transitions";

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

export const CompanyList: React.FC = () => {
  // const { dataGridProps, filterMode, filterModel, onFilterModelChange } = useDataGrid(
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<any>("");
  const { dataGridProps, search, filters } = useDataGrid<HttpError>({
    // IUserFilterVariables
    syncWithLocation: false,
    filters: { mode: "off" },
    sorters: { mode: "off" },
    pagination: { mode: "client", pageSize: 50, current: 1 },
    // onSearch: (params) => {
    //   const filters: CrudFilters = [];
    //   const { q } = params;

    //   filters.push({
    //     field: "q",
    //     operator: "eq",
    //     value: q !== "" ? q : undefined,
    //   });

    //   return filters;
    // },
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

  const { edit, show } = useNavigation();

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
      // {
      //   field: "_id",
      //   headerName: "id",
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
              <EditButton
                hideText
                recordItemId={row._id}
                onClick={() => edit("companies", row._id)}
              />
              <ShowButton
                hideText
                recordItemId={row.id}
                onClick={() => show("companies", row._id)}
              />
            </>
          );
        },
        // align: "center",
        // headerAlign: "center",
        minWidth: 120,
      },
    ],
    []
  );

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/createCompany`;
    navigate(path);
  };

  //   const { register, handleSubmit, control } = useForm<
  //     IUserList,
  //     HttpError,
  //     IUserFilterVariables
  //   >({
  //     defaultValues: {
  //       q: getDefaultFilter("q", filters, "eq"),
  //     },
  //   });

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <List
      title={"Company List"}
      headerButtons={<CreateButton onClick={routeChange} />}
    >
      <Box height={"40px"}></Box>
      <DataGrid
        {...restDataGridProps}
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
