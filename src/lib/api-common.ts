import permissionService from '@/services/permission-service'

export const getAllPermissions = async (accessToken: string) => {
  if (accessToken) {
    try {
      const response = await permissionService.getAllPermissions(accessToken)
      return response?.data
    } catch (error) {
      console.log(error)
    }
  }
}
