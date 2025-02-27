import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_KEY = 'yum-toeJ8M4AzH5F1cFK';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/';
const TENANT_NAME = 'KingVon';

// Base query configuration for fetch requests
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('x-zocom', API_KEY);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});


// Define the API service
export const foodtruckApi = createApi({
  reducerPath: 'foodtruckApi',
  baseQuery,
  endpoints: (builder) => ({
    // POST /keys: Authenticate or register a key
    postKey: builder.mutation<any, { name: string }>({
      query: (data) => ({
        url: '/keys',
        method: 'POST',
        body: data,
      }),
    }),

    // POST /tenants: Register a tenant
    postTenant: builder.mutation<any, { name: string }>({
      query: (data) => ({
        url: '/tenants',
        method: 'POST',
        body: data,
      }),
    }),

    // GET /menu: Fetch all menu items
    getMenu: builder.query<any, void>({
      query: () => ({
        url: '/menu',
        method: 'GET',
      }),
    }),

    // GET /menu/{id}: Fetch a specific menu item by ID
    getMenuItemById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/menu/${id}`,
        method: 'GET',
      }),
    }),

    // POST /{tenant}/orders: Place an order for a tenant
    placeOrder: builder.mutation<any, { items: any[] }>({
      query: ({ items }) => ({
        url: `/${TENANT_NAME}/orders`,
        method: 'POST',
        body: { items },
      }),
    }),

    // GET /{tenant}/orders: Fetch all orders for a tenant
    getOrders: builder.query<any, void>({
      query: () => ({
        url: `/${TENANT_NAME}/orders`,
        method: 'GET',
      }),
    }),

    // GET /{tenant}/{id}: Fetch a specific order by ID for a tenant
    getOrderById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/${TENANT_NAME}/orders/${id}`,
        method: 'GET',
      }),
    }),

    // GET /receipts/{id}: Fetch receipt details by ID
    getReceiptById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/receipts/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export the hooks for using in components
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
