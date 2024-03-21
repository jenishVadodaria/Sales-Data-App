import { IResourceComponentsProps } from "@refinedev/core";
import { MuiEditInferencer } from "@refinedev/inferencer/mui";
import { Edit, ListButton, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";

export const UserEdit: React.FC = () => {
  const {
    // saveButtonProps,
    refineCore: { onFinish, formLoading },
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    // <Edit saveButtonProps={saveButtonProps}>
    //   <Box
    //     component="form"
    //     sx={{ display: "flex", flexDirection: "column" }}
    //     autoComplete="off"
    //   >
    //     <TextField
    //       // {...register("id", {
    //       //   required: "This field is required",
    //       //   valueAsNumber: true,
    //       // })}
    //       error={!!(errors as any)?.id}
    //       helperText={(errors as any)?.id?.message}
    //       margin="normal"
    //       fullWidth
    //       InputLabelProps={{ shrink: true }}
    //       type="number"
    //       label="Id"
    //       name="id"
    //       disabled
    //     />
    //     <TextField
    //       // {...register("title", {
    //       //   required: "This field is required",
    //       // })}
    //       error={!!(errors as any)?.title}
    //       helperText={(errors as any)?.title?.message}
    //       margin="normal"
    //       fullWidth
    //       InputLabelProps={{ shrink: true }}
    //       type="text"
    //       label="Title"
    //       name="title"
    //     />
    //   </Box>
    // </Edit>
    <Edit
      title={<Typography variant="h5">Edit User</Typography>}
      saveButtonProps={{ size: "small" }}
      isLoading={formLoading}
      // resource="users"
      // recordItemId={}
      canDelete={false}
      footerButtons={
        <>
          <SaveButton onClick={handleSubmit(onFinish)} />
        </>
      }
      headerButtons={({ listButtonProps }) => (
        <>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
        </>
      )}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/* <TextField
          {...register("_id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Id"
          name="_id"
          disabled
        /> */}
        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.email}
          // helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label="Email"
          name="email"
        />
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          // helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <TextField
          {...register("role", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.role}
          // helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Role"
          name="role"
        />
      </Box>
    </Edit>
  );
};

// import { Edit } from "@refinedev/mui";
// import { Box, TextField } from "@mui/material";
// import { useForm } from "@refinedev/react-hook-form";
// import { IResourceComponentsProps } from "@refinedev/core";

// export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
//   const {
//     saveButtonProps,
//     refineCore: { queryResult },
//     register,
//     control,
//     formState: { errors },
//   } = useForm();

//   const categoriesData = queryResult?.data?.data;

//   return (
//     <Edit saveButtonProps={saveButtonProps}>
//       <Box
//         component="form"
//         sx={{ display: "flex", flexDirection: "column" }}
//         autoComplete="off"
//       >
//         <TextField
//           {...register("id", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.id}
//           helperText={(errors as any)?.id?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Id"
//           name="id"
//           disabled
//         />
//         <TextField
//           {...register("title", {
//             required: "This field is required",
//           })}
//           error={!!(errors as any)?.title}
//           helperText={(errors as any)?.title?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="text"
//           label="Title"
//           name="title"
//         />
//       </Box>
//     </Edit>
//   );
// };
