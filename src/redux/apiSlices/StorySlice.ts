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
    })   
    })
})

export const {usePostStoyMutation} = storySlice