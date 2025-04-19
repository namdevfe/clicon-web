/* eslint-disable indent */
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import { AddProductPayload, Product, ProductList } from '@/types/product'
import queryString from 'query-string'

const productService = {
  add(payload: AddProductPayload, accessToken?: string) {
    const url = '/products/add-product'
    return http.post<ApiResponse<Product>>(
      url,
      payload,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  getList(query: QueryParams) {
    const queryStr = queryString.stringify(query)
    const url = `/products/get-products?${queryStr}`
    return http.get<ApiResponse<ProductList>>(url)
  }
}

export default productService
