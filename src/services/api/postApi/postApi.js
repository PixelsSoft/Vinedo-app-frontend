import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
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
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "user/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    getAllPostsByUser: builder.query({
      query: (postId) => `user/posts`,
      providesTags: ["Post"],
    }),

    getPostById: builder.query({
      query: (postId) => `user/fetchPost/${postId}`,
      providesTags: ["Post"],
    }),

    likeAPost: builder.mutation({
      query: (postId) => ({
        url: `user/likeAPost/${postId}`,
        method: "POST",
        body: postId,
      }),
      invalidatesTags: ["Post"],
    }),

    viewAPost: builder.mutation({
      query: (postId) => ({
        url: `user/viewAPost/${postId}`,
        method: "POST",
        body: postId,
      }),
      invalidatesTags: ["Post"],
    }),

    rateAPost: builder.mutation({
      query: ({ postId, rating }) => ({
        url: `user/rateAPost/${postId}`,
        method: "POST",
        body: { rating: rating },
      }),
      invalidatesTags: ["Post", "ProfileUser"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useGetAllPostsByUserQuery,
  useLikeAPostMutation,
  useViewAPostMutation,
  useRateAPostMutation
} = postApi;
