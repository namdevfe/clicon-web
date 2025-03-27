let apiRoot = ''

if (process.env.NEXT_PUBLIC_BUILD_MODE === 'dev') {
  apiRoot = process.env.NEXT_PUBLIC_API_ROOT_LOCAL || ''
}

if (process.env.NEXT_PUBLIC_BUILD_MODE === 'prod') {
  apiRoot = process.env.NEXT_PUBLIC_API_ROOT_PROD || ''
}

export default apiRoot
