import { IResourceComponentsProps } from "@refinedev/core";
import { MuiEditInferencer } from "@refinedev/inferencer/mui";
import { Edit, ListButton, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CompanyEditForm } from "./companyEditForm";
import { useState, useEffect } from "react";

export const CompanyEdit: React.FC = () => {
  const {
    // saveButtonProps,
    refineCore: { onFinish, formLoading, queryResult },
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (queryResult?.data?.data) {
      setLoading(false);
    }
  }, [queryResult?.data?.data]);

  const { id } = useParams();

  return (
    <Edit
      title={<Typography variant="h5">Edit Company Details</Typography>}
      saveButtonProps={{ size: "small" }}
      isLoading={formLoading}
      // resource="users"
      // recordItemId={}
      canDelete={false}
      footerButtons={
        <>{/* <SaveButton onClick={handleSubmit(onFinish)} /> */}</>
      }
      headerButtons={({ listButtonProps }) => (
        <>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
        </>
      )}
    >
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {queryResult?.data?.data && (
        <CompanyEditForm paramsId={id} queryData={queryResult?.data?.data} />
      )}
    </Edit>
  );
};
