import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_KEY = 'yum-toeJ8M4AzH5F1cFK';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/';
const TENANT_NAME = 'KingVon';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('x-zocom', API_KEY);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

 
export const foodtruckApi = createApi({
  reducerPath: 'foodtruckApi',
  baseQuery,
  endpoints: (builder) => ({

    postKey: builder.mutation<any, { name: string }>({
      query: (data) => ({
        url: '/keys',
        method: 'POST',
        body: data,
      }),
    }),

  
    postTenant: builder.mutation<any, { name: string }>({
      query: (data) => ({
        url: '/tenants',
        method: 'POST',
        body: data,
      }),
    }),


    getMenu: builder.query<any, void>({
      query: () => ({
        url: '/menu',
        method: 'GET',
      }),
    }),


    getMenuItemById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/menu/${id}`,
        method: 'GET',
      }),
    }),


    placeOrder: builder.mutation<any, { items: any[] }>({
      query: ({ items }) => ({
        url: `/${TENANT_NAME}/orders`,
        method: 'POST',
        body: { items },
      }),
    }),


    getOrders: builder.query<any, void>({
      query: () => ({
        url: `/${TENANT_NAME}/orders`,
        method: 'GET',
      }),
    }),


    getOrderById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/${TENANT_NAME}/orders/${id}`,
        method: 'GET',
      }),
    }),


    getReceiptById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/receipts/${id}`,
        method: 'GET',
      }),
    }),
  }),
});


export const {
  usePostKeyMutation,
  usePostTenantMutation,
  useGetMenuQuery,
  useGetMenuItemByIdQuery,
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetReceiptByIdQuery,
} = foodtruckApi;
