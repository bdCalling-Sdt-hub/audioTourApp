import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
    endpoints: builder => ({
        postSubscription: builder.mutation({
           query: (id) => ({
            url: `/create-checkout-session?plan_id=${id}`,
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
              },
              body: id
           })
           
           
        }),
        
        getSubscription: builder.query({
            query: ()=> ({
                url: `/admin/pricing-plan/`,
                method: "GET",
            })
        }),
        getCheckIsSubscribed: builder.query({
            query: ()=> ({
                url: `/is-subscribed-required`,
                method: "GET",
            })
        }),
       getListenCount: builder.query({
        query: () => ({
            url: `/audio-count`,
            method: "GET"
        })
       })
          
    })
});
export const {usePostSubscriptionMutation,
useGetSubscriptionQuery,
useGetCheckIsSubscribedQuery,
useGetListenCountQuery,
} = subscriptionSlice;