import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("vineo_authToken");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    validateToken: builder.query({
      query: () => `validateToken`,
      providesTags: ["Users"],
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    continueWithGoogle: builder.mutation({
      query: ({token}) => ({
        url: "auth/google/callback",
        method: "POST",
        body: {token: token},
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    storeName: builder.mutation({
      query: (data) => ({
        url: "user/name",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users", "ProfileUser"],
    }),

    storeUserName: builder.mutation({
      query: (data) => ({
        url: "user/username",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users", "ProfileUser"],
    }),

    storeProfilePicture: builder.mutation({
      query: (data) => ({
        url: "user/profilePicture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    storeRate: builder.mutation({
      query: (data) => ({
        url: "user/rate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutMutation,
  useValidateTokenQuery,
  useRegisterUserMutation,
  useStoreUserNameMutation,
  useStoreProfilePictureMutation,
  useStoreRateMutation,
  useStoreNameMutation,
  useContinueWithGoogleMutation
} = authApi;
