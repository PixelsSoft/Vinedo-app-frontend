import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["ProfileUser"],
  endpoints: (builder) => ({
    getProfileDetails: builder.query({
      query: () => `user/profile`,
      providesTags: ["ProfileUser", "Post"],
    }),

    uploadCoverPhoto: builder.mutation({
      query: (data) => ({
        url: "user/coverPhoto",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    storeUserBio: builder.mutation({
      query: (data) => ({
        url: "user/description",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    deleteAccount: builder.mutation({
      query: (data) => ({
        url: "user/deleteAccount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    getBankDetails: builder.query({
      query: () => `user/bankDetails`,
      providesTags: ["ProfileUser"],
    }),

    getWithdrawDetails: builder.query({
      query: () => `user/withdraw`,
      providesTags: ["ProfileUser"],
    }),

    withdrawBalance: builder.mutation({
      query: (data) => ({
        url: "user/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    addBankDetails: builder.mutation({
      query: (data) => ({
        url: "user/bankDetails",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    uploadProfilePhoto: builder.mutation({
      query: (data) => ({
        url: "user/profilePicture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),
  }),
});

export const {
 useGetProfileDetailsQuery,
 useUploadCoverPhotoMutation,
 useUploadProfilePhotoMutation,
 useStoreUserBioMutation,
 useDeleteAccountMutation,
 useAddBankDetailsMutation,
 useGetBankDetailsQuery,
 useGetWithdrawDetailsQuery,
 useWithdrawBalanceMutation
} = profileApi;
