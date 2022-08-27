import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IPortfolio} from '../../models/api/portfolio'

export const portfolioBaseAPI = createApi({
  reducerPath: 'portfolioBaseApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://62d43987cd960e45d45543ce.mockapi.io/'}),
  tagTypes: ['Portfolios'],
  endpoints: (build) => ({
    fetchPortfolios: build.query<IPortfolio[], void>({
      query: () => ({
        url: 'portfolios'
      }),
      providesTags: (result) => (
        result
        ? [
            ...result.map(({id}) => ({type: 'Portfolios' as const, id})),
            {type: 'Portfolios', id: 'LIST'}
          ]
        : [{type: 'Portfolios', id: 'LIST'}]
      )
    }),

    updatePortfolio: build.mutation<IPortfolio, IPortfolio>({
      query: (portfolio) => ({
        url: `portfolios/${portfolio.id}`,
        method: 'PUT',
        body: portfolio
      }),
      invalidatesTags: [{type: 'Portfolios', id: 'LIST'}]
    }),

    createPortfolio: build.mutation<void, string>({
      query: (name) => ({
        url: 'portfolios',
        method: 'POST',
        body: {name, assets: []}
      }),
      invalidatesTags: [{type: 'Portfolios', id: 'LIST'}]
    }),

    removePortfolio: build.mutation<void, string>({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'Portfolios', id: 'LIST'}]
    })
  })
})

export const {
  useFetchPortfoliosQuery,
  useUpdatePortfolioMutation,
  useCreatePortfolioMutation,
  useRemovePortfolioMutation
} = portfolioBaseAPI