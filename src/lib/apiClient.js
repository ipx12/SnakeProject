const BASE_URL = import.meta.env
  .VITE_API_URL
const DEFAULT_HEADERS = {
  'x-api-key': import.meta.env
    .VITE_API_KEY,
  'Content-Type': 'application/json',
}

/** In-memory cache for GET responses. Key → resolved value. */
const cache = new Map()

const log = (label, path, color) => {
  if (import.meta.env.DEV)
    console.warn(
      `%c[${label}] GET ${path}`,
      `color: ${color}`,
    )
}

async function request(
  path,
  options = {},
) {
  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    },
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(
      error ||
        `Request failed with status ${response.status}`,
    )
  }

  return response.json()
}

function withBody(method) {
  return (path, body, options) =>
    request(path, {
      method,
      body: JSON.stringify(body),
      ...options,
    })
}

const apiClient = {
  get: async (path, options = {}) => {
    const {
      cache: useCache = true,
      ...restOptions
    } = options

    if (useCache && cache.has(path)) {
      log('cache', path, '#a78bfa')
      return cache.get(path)
    }

    log(
      'request',
      `${BASE_URL}${path}`,
      '#34d399',
    )
    const data = await request(path, {
      method: 'GET',
      ...restOptions,
    })

    if (useCache) cache.set(path, data)
    return data
  },
  post: withBody('POST'),
  put: withBody('PUT'),
  delete: (path, options) =>
    request(path, {
      method: 'DELETE',
      ...options,
    }),
}

export default apiClient
