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
    }),
  });
  
export const {useLoginUserMutation,
    useLazyGetCheckTokenQuery,
} = authSlice;