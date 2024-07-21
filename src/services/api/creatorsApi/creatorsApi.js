import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creatorsApi = createApi({
  reducerPath: "creatorsApi",
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
  tagTypes: ["Creators"],
  endpoints: (builder) => ({
    searchCreators: builder.query({
      query: (text) => `user/searchCreators?search=${text}`,
      providesTags: ["Creators"],
    }),

    getTop20Creators: builder.query({
      query: () => `user/top20Creators`,
      // providesTags: ["Creators"],
    }),

    getCreatorProfile: builder.query({
      query: (username) => `user/fetchCreator/${username}`,
      providesTags: ["Creators"],
    }),

    getCreatorDetailsById: builder.query({
      query: (creatorId) => `user/fetchCreatorUsingId/${creatorId}`,
      // providesTags: ["Creators"],
    }),

    getPaymentIntent: builder.query({
      query: (creatorId) => `user/subscribeToCreatorPI/${creatorId}`,
      // providesTags: ["Creators"],
    }),

    paymentSuccess: builder.mutation({
      query: ({ creatorId, payment_intent }) => ({
        url: `user/subscribeToCreatorConfirmation/${creatorId}`,
        method: "POST",
        body: { payment_intent: payment_intent },
      }),
      invalidatesTags: ["Creators"],
    }),

    refundSubscription: builder.mutation({
      query: ({ creatorId }) => ({
        url: `user/refundSubscription/${creatorId}`,
        method: "POST",
        body: creatorId,
      }),
      invalidatesTags: ["Creators"],
      
    }),
  }),
});

export const {
  useSearchCreatorsQuery,
  useGetCreatorProfileQuery,
  useGetPaymentIntentQuery,
  usePaymentSuccessMutation,
  useGetCreatorDetailsByIdQuery,
  useRefundSubscriptionMutation,
  useGetTop20CreatorsQuery
} = creatorsApi;
