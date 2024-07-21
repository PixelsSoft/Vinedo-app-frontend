import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StripeApi = createApi({
  reducerPath: "StripeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://php82.demo-customlinks.com/backend/public/api/',
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("vineo_authToken");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["GET"],
  endpoints: (builder) => ({
    
    ConnectStripe: builder.query({
      query: ({ userId }) => `connected_account/?id=${userId}`,
      providesTags: ["Post"],
    }),

  }),
});

export const { useConnectStripeQuery } = StripeApi;
