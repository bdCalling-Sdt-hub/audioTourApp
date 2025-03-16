import { api } from "../api/baseApi";

const notificatiopnSlice = api.injectEndpoints({
    endpoints: builder => ({
        getNotification: builder.query({
            query: () => ({
              url: `/notifications`,
              method: 'GET', // Ensure method is explicitly defined
            }),
            providesTags: ['notification'],
          }),
          putMarkAllRead: builder.mutation<void, void>({
            query: (id) => ({
              url: '/notifications/mark-all-as-read',
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: {}, // Include if you need to send any data, otherwise this can be omitted.
            }),
            invalidatesTags: ['notification'],
          }),
          
    })
})

export const {useGetNotificationQuery,
    usePutMarkAllReadMutation,
} = notificatiopnSlice;