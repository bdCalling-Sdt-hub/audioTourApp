import { api } from "../api/baseApi";

const drawwerSlices = api.injectEndpoints({
    endpoints: builder => ({
        getAbout: builder.query({
            query: () => ({
                url: `/pages/about`,
                method: "GET",

            })
        }),
        getFaq: builder.query({
            query: () => ({
                url: `/pages/faq`,
                method: "GET",

            })
        }),
        getTerms: builder.query({
            query: () => ({
                url: `/pages/terms`,
                method: "GET",

            })
        })
    })
});

export const { useGetAboutQuery,
    useGetFaqQuery,
    useGetTermsQuery,
} = drawwerSlices;
