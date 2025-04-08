/* eslint-disable indent */
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import {
  AddProductCategoryPayload,
  EditProductCategoryPayload,
  ProductCategory,
  ProductCategoryList
} from '@/types/product-category'

const productCategoryService = {
  getProductCategories(query: QueryParams, accessToken?: string) {
    const url = `/product-categories/get-product-categories?page=${query.page}&limit=${query.limit}`
    return http.get<ApiResponse<ProductCategoryList>>(
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
  getAllProductCategories(accessToken?: string) {
    const url = '/product-categories/get-all-product-categories'
    return http.get<ApiResponse<ProductCategory[]>>(
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
  getProductCategoryDetailsBySlug(slug: string, accessToken?: string) {
    const url = `/product-categories/get-product-category-details-by-slug/${slug}`
    return http.get<ApiResponse<ProductCategory>>(
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
  addProductCategory(payload: AddProductCategoryPayload, accessToken?: string) {
    const url = '/product-categories/add-product-category'
    return http.post<ApiResponse<ProductCategory>>(
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
  editProductCategoryBySlug(slug: string, payload: EditProductCategoryPayload, accessToken?: string) {
    const url = `/product-categories/edit-product-category-by-slug/${slug}`
    return http.put<ApiResponse<ProductCategory>>(
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
  softDeleteProductCategoryBySlug(slug: string, accessToken?: string) {
    const url = `/product-categories/soft-delete-product-category-by-slug/${slug}`
    return http.delete<ApiResponse<ProductCategory>>(
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
  hardDeleteProductCategoryBySlug(slug: string, accessToken?: string) {
    const url = `/product-categories/hard-delete-product-category-by-slug/${slug}`
    return http.delete<ApiResponse<ProductCategory>>(
      url,
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

export default productCategoryService
