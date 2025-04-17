/* eslint-disable indent */
import http from '@/lib/http'
import { ApiResponse } from '@/types/global'
import { AddProductPayload, Product } from '@/types/product'

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
  }
}

export default productService
