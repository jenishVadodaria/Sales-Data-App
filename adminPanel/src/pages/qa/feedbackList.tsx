import React, { useState, MouseEvent } from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { HttpError } from "@refinedev/core";
import { Box, Popover, Typography } from "@mui/material";

export const FeedbackList: React.FC = () => {
  const { dataGridProps, search, filters } = useDataGrid<HttpError>({
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

  const DescriptionCellRendererWithPopover = (params: any) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {params.value}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableRestoreFocus
        >
          <Typography sx={{ p: 2, maxWidth: 400 }}>{params.value}</Typography>
        </Popover>
      </Box>
    );
  };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "companyName",
        headerName: "Company Name",
        minWidth: 90,
        filterable: true,
        flex: 1,
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 90,
        filterable: true,
      },
      {
        field: "description",
        headerName: "Description",
        minWidth: 280,
        filterable: true,
        flex: 2,
        wrapMode: "true",
        // renderCell: (params) => {
        //   return DescriptionCellRendererWithPopover(params);
        // },
      },
    ],
    []
  );

  return (
    <List title={"Feedback List"}>
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
