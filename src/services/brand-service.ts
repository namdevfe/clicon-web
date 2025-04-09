/* eslint-disable indent */
import http from '@/lib/http'
import { AddBrandPayload, Brand, BrandList, EditBrandPayload } from '@/types/brand'
import { ApiResponse, QueryParams } from '@/types/global'

const brandService = {
  getAll() {
    const url = '/brands/get-all-brands'
    return http.get<ApiResponse<Brand[]>>(url)
  },
  getList(query: QueryParams) {
    const url = `/brands/get-brands?page=${query.page}&limit=${query.limit}`
    return http.get<ApiResponse<BrandList>>(url)
  },
  getDetails(slug: string, accessToken?: string) {
    const url = `/brands/get-brand-details-by-slug/${slug}`
    return http.get<ApiResponse<Brand>>(
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
  addNew(payload: AddBrandPayload, accessToken?: string) {
    const url = '/brands/add-brand'
    return http.post<ApiResponse<Brand>>(
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
  editBySlug(slug: string, payload: EditBrandPayload, accessToken?: string) {
    const url = `/brands/edit-brand-by-slug/${slug}`
    return http.put<ApiResponse<Brand>>(
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
    const url = `/brands/soft-delete-brand-by-slug/${slug}`
    return http.delete<ApiResponse<Brand>>(
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
    const url = `/brands/hard-delete-brand-by-slug/${slug}`
    return http.delete<ApiResponse<Brand>>(
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

export default brandService
