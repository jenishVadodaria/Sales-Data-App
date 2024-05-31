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

export const UserList: React.FC = () => {
  // const { dataGridProps, filterMode, filterModel, onFilterModelChange } = useDataGrid(
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<any>("");
  const { dataGridProps, search, filters } = useDataGrid<
    IUserList,
    HttpError,
    IUserFilterVariables
  >({
    syncWithLocation: true,
    filters: { mode: "server" },
    sorters: { mode: "off" },
    pagination: { mode: "off", pageSize: 10, current: 1 },
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      return filters;
    },
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

  const { edit } = useNavigation();

  const { mutate: mutateDelete } = useDelete();

  const token = localStorage.getItem("refine-auth");

  // const handleDeleteuser = async ({ id }: { id: any }) => {
  //   try {
  //     console.log(id, "++");
  //     // await axiosInstance.delete(
  //     //   `http://localhost:3000/api/v1/users/user/delete`,
  //     //   {
  //     //     data: {
  //     //       _id: id,
  //     //       isDeleted: true,
  //     //     },
  //     //   }
  //     // );

  //     mutateDelete({
  //       resource: "users/user/delete",
  //       id: id,
  //       // mutationMode: "undoable",
  //       meta: {
  //         config: {
  //           headers: {
  //             Authorization:
  //               "Bearer UserId",
  //           },
  //           data: {
  //             _id: id,
  //             isDeleted: true,
  //           },
  //         },
  //       },
  //     });

  //     // mutateDelete({
  //     //   id: id,
  //     //   dataProviderName: "http://localhost:3000/api/v1/users",
  //     //   resource: 'user/delete'
  //     // });
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       success: false,
  //       error: {
  //         name: "DeleteError",
  //         message: "Something went wrong",
  //       },
  //     };
  //   }
  // };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "_id",
        headerName: "Id",
        type: "string",
        minWidth: 200,
        filterable: true,
        flex: 1,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
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
        field: "role",
        headerName: "Role",
        minWidth: 120,
        filterable: true,
        flex: 1,
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
              <EditButton
                hideText
                recordItemId={row._id}
                onClick={() => edit("users", row._id)}
              />
              {/* <ShowButton hideText recordItemId={row.id} /> */}
              <DeleteButton
                hideText
                recordItemId={row._id}
                onClick={() => handleClickOpen(row._id)}
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
    const path = `/register`;
    navigate(path);
  };

  const { register, handleSubmit, control } = useForm<
    IUserList,
    HttpError,
    IUserFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  const handleClickOpen = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteUser = () => {
    try {
      mutateDelete({
        resource: "users/user/delete",
        id: selectedUserId,
        meta: {
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              _id: selectedUserId,
              isDeleted: true,
            },
          },
        },
        invalidates: ["all"],
      });
      handleClose();
    } catch (error) {
      console.log(error);
      // Handle error here
    }
  };

  return (
    <List
      title={"User List"}
      headerButtons={<CreateButton onClick={routeChange} />}
      // headerButtons={({ defaultButtons }) => (
      //   <>
      //     {defaultButtons}
      //     <Box
      //       sx={{
      //         display: "flex",
      //         flexDirection: "row",
      //         alignItems: "center",
      //         gap: "350px",
      //       }}
      //     >
      //       <CreateButton
      //         onClick={routeChange}
      //         sx={{
      //           mt: "10px",
      //         }}
      //       />
      //     </Box>
      //   </>
      // )}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          position: "relative",
          bottom: "50px",
        }}
        autoComplete="off"
        onSubmit={handleSubmit(search)}
      >
        <TextField
          {...register("q")}
          label={" "}
          placeholder={"filter any name, email"}
          margin="normal"
          // fullWidth
          autoFocus
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <br />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            padding: "6px 20px",
            mt: "7px",
          }}
        >
          {"Filter"}
        </Button>
      </Box>
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
      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button color="error" onClick={handleDeleteUser}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};
