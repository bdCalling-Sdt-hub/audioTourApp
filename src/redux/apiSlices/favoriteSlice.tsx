import { api } from "../api/baseApi";

const favoriteSlice = api.injectEndpoints({
    endpoints: builder => ({
        postStoreFavorite: builder.mutation({
            query: (data) => ({
              url: `/favorite`,
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

export const {usePostStoreFavoriteMutation} = favoriteSlice;