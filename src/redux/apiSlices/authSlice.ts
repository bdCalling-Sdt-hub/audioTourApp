import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
      getCheckToken: builder.query({
        query: () => ({
          url: `/validate-token`,
          method: 'GET', // Ensure method is explicitly defined
        }),
        providesTags: ['user'],
      }),
      loginUser: builder.mutation({
        query: (data) => ({
          url: `/login`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      // registerUser: builder.mutation({
      //   query: (data) => ({
      //     url: `/register`,
      //     method: 'POST', // Ensure method is explicitly defined
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //     body: data,
      //   }),
      //   invalidatesTags: ['user'],
      // }),
      registerUser: builder.mutation({
        query: (data) => ({
          url: `/register`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/json',
          },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      otipVerify: builder.mutation({
        query: (otp) => ({
          url: `/verify-email`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
          body: otp,
        }),
        invalidatesTags: ['user'],
      }),
      resentOtp: builder.mutation({
        query: (otp) => ({
          url: `/resent-otp`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
          body: otp,
        }),
        invalidatesTags: ['user'],
      }),
      
    }),
  });
  
export const {useLoginUserMutation,
    useLazyGetCheckTokenQuery,
    useRegisterUserMutation,
    useOtipVerifyMutation,
    useResentOtpMutation,
} = authSlice;