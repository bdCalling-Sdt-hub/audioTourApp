import { api } from "../api/baseApi";

const bookMarkSlice = api.injectEndpoints({
    endpoints: builder => ({
        postStorBookMark: builder.mutation({
            query: (data) => ({
              url: `/bookmark`,
              method: 'POST', 
              headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
              body: data,
            }),
            invalidatesTags: ['map'],
          }),
    })
})

export const {usePostStorBookMarkMutation} = bookMarkSlice;