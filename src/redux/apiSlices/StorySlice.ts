import { api } from "../api/baseApi";

const storySlice = api.injectEndpoints({
    endpoints: builder => ({
    postStoy: builder.mutation ({
        query: (id) => ({
            url: `/story`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
            body: id
        })
    }),   

    getAllStoy: builder.query ({
        query: () => ({
            url: `/story`,
            method: 'GET',
        })
    }),

    deleteStoy: builder.mutation ({
        query: (id) => ({
            url: `/story`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
            body: id
        }),
        
    }),   
    getAudioHistory: builder.query ({
        query: () => ({
            url: `/audio-history`,
            method: 'GET',
        }),
        providesTags: ["History"]
    }),
    postHistoy: builder.mutation ({
        query: (id) => ({
            url: `/add-audio-history`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
            body: id
        }),
        invalidatesTags: ["History"]
    }),   
    }),

    
    
})

export const {usePostStoyMutation,
    useGetAllStoyQuery,
    useDeleteStoyMutation,
    useGetAudioHistoryQuery,
    usePostHistoyMutation
} = storySlice;