/* eslint-disable indent */
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import { AddProductTagPayload, EditProductTagPayload, ProductTag, ProductTagList } from '@/types/product-tag'

const productTagService = {
  getAll() {
    const url = '/product-tags/get-all-product-tags'
    return http.get<ApiResponse<ProductTag[]>>(url)
  },
  getList(query: QueryParams) {
    const url = `/product-tags/get-product-tags?page=${query.page}&limit=${query.limit}`
    return http.get<ApiResponse<ProductTagList>>(url)
  },
  getDetails(slug: string, accessToken?: string) {
    const url = `/product-tags/get-product-tag-details-by-slug/${slug}`
    return http.get<ApiResponse<ProductTag>>(
      url,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  addNew(payload: AddProductTagPayload, accessToken?: string) {
    const url = '/product-tags/add-product-tag'
    return http.post<ApiResponse<ProductTag>>(
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
  editBySlug(slug: string, payload: EditProductTagPayload, accessToken?: string) {
    const url = `/product-tags/edit-product-tag-by-slug/${slug}`
    return http.put<ApiResponse<ProductTag>>(
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
  softDelete(slug: string, accessToken?: string) {
    const url = `/product-tags/soft-delete-product-tag-by-slug/${slug}`
    return http.delete<ApiResponse<ProductTag>>(
      url,
      {},
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  hardDelete(slug: string, accessToken?: string) {
    const url = `/product-tags/hard-delete-product-tag-by-slug/${slug}`
    return http.delete<ApiResponse<ProductTag>>(
      url,
      {},
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

export default productTagService
