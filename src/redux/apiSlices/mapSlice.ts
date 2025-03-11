import { api } from "../api/baseApi";

const mapSlice = api.injectEndpoints({
    endpoints: builder =>({
        PostNearByAudio: builder.mutation({
            query: (data) => ({
              url: `/get-nearby-audio`,
              method: 'POST', 
              headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
              body: data,
            }),
            invalidatesTags: ['map'],
          }),
          findNearbyAudio: builder.mutation({
            query: (data) => ({
              url: `/find-nearby-audio`,
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

export const {usePostNearByAudioMutation,
useFindNearbyAudioMutation

} = mapSlice;