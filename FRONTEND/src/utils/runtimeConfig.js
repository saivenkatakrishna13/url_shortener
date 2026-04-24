const stripTrailingSlash = (value) => value.replace(/\/+$/, '')

const fallbackApiBaseUrl = 'http://localhost:3000'

export const API_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl,
)

export const APP_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_APP_URL || API_BASE_URL,
)