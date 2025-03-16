import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
    endpoints: builder => ({
        getHomeSection: builder.query({
            query: ()=> ({
                url: `/home-section`,
                method: "GET",
            })
        }),
        getCatetgorisAudio: builder.query({
            query: (id)=> ({
                url: `/category/${id}/audio?per_page=10`,
                method: "GET",
            })
        })
    })
})

export const {useGetHomeSectionQuery,
    useGetCatetgorisAudioQuery
} = homeSlice;