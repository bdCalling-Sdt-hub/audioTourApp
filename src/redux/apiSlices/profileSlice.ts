import { api } from "../api/baseApi";

const profileSlice = api.injectEndpoints({
    endpoints: builder => ({
        postUpdateProfile: builder.mutation({
            query: (data) => ({
              url: `/update-profile`,
              method: 'POST', 
              headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
              body: data,
            }),
            invalidatesTags: ['Profile'],
          }),
    })
})

export const {usePostUpdateProfileMutation} = profileSlice;