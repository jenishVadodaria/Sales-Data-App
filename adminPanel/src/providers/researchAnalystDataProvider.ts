import axios from "axios";
import {
  CrudFilters,
  CrudOperators,
  DataProvider,
  HttpError,
} from "@refinedev/core";
import { stringify } from "query-string";

import React from "react";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

const getTokenFromLocalStorage = () => localStorage.getItem("refine-auth");

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};

const generateFilters = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
    filters?.map((filter): void => {
      if ("field" in filter) {
        const { field, operator, value } = filter;
        // if (field === "q") {
        //   queryFilters[field] = value;
        //   return;
        // }
        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

export const researchAnalystDataProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  getList: async ({ resource, filters }) => {
    const url = `${apiUrl}/${resource}/all`;

    // const { current = 1, pageSize = 10 } = pagination ?? {};

    // const query: {
    //   _start?: number;
    //   _end?: number;
    //   _sort?: string;
    //   _order?: string;
    // } = {
    //   _start: (current - 1) * pageSize,
    //   _end: current * pageSize,
    // };

    const token = getTokenFromLocalStorage();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const queryFilters = generateFilters(filters);

    const { data, headers } = await axios.get(
      //   `${url}?${stringify(queryFilters)}`,
      `${url}`
      //   ,
      //   config
    );

    const total = data?.length;

    return {
      data,
      total,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axios.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/company/${id}`;
    console.log(resource, "+++");

    const token = getTokenFromLocalStorage();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(url, variables);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}`;
    const dataConfig = {
      headers: meta?.config?.headers ?? {},
      data: meta?.config?.data ?? {},
    };
    const { data } = await axios.delete(url, dataConfig);
    console.log("Deleted!");

    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const token = getTokenFromLocalStorage();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(url);

    return {
      data,
    };
  },
});
