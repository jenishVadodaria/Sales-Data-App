interface AppConstantsTypes {
  baseApiUrl: string;
  userRole: string;
}

const getEnvString = (value: string | undefined): string => {
  if (value !== undefined) {
    return value.toString();
  }
  return "";
};

export const appConstants: AppConstantsTypes = {
  baseApiUrl: getEnvString(import.meta.env.VITE_BACKEND_API_BASE_URL),
  userRole: "user",
};
