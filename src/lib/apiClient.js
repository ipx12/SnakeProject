const BASE_URL = import.meta.env
  .VITE_API_URL
const API_KEY = import.meta.env
  .VITE_API_KEY

if (!BASE_URL)
  throw new Error(
    '[apiClient] VITE_API_URL is not defined. Add it to your .env file.',
  )
if (!API_KEY)
  throw new Error(
    '[apiClient] VITE_API_KEY is not defined. Add it to your .env file.',
  )

const normalizedBase = BASE_URL.replace(
  /\/$/,
  '',
)

const DEFAULT_HEADERS = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
}

/** In-memory cache for GET responses. Key → resolved value. */
const cache = new Map()

const log = (method, url, color) => {
  if (import.meta.env.DEV)
    console.warn(
      `%c[apiClient] ${method} ${url}`,
      `color: ${color}`,
    )
}

function buildUrl(path) {
  return `${normalizedBase}/${path.replace(/^\//, '')}`
}

async function request(
  path,
  options = {},
) {
  const url = buildUrl(path)
  const method = options.method ?? 'GET'

  log(
    method,
    url,
    method === 'GET'
      ? '#34d399'
      : '#f59e0b',
  )

  let response
  try {
    response = await fetch(url, {
      ...options,
      method,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    })
  } catch (networkError) {
    throw new Error(
      `[apiClient] Network error on ${method} ${url}: ${networkError.message}`,
      { cause: networkError },
    )
  }

  if (!response.ok) {
    let body = ''
    try {
      body = await response.text()
    } catch {
      // ignore parse error
    }
    throw new Error(
      body ||
        `[apiClient] ${method} ${url} failed with status ${response.status}`,
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
      log(
        'GET (cache)',
        buildUrl(path),
        '#a78bfa',
      )
      return cache.get(path)
    }

    const data = await request(
      path,
      restOptions,
    )

    if (useCache) cache.set(path, data)
    return data
  },
  post: withBody('POST'),
  put: withBody('PUT'),
  patch: withBody('PATCH'),
  delete: (path, options) =>
    request(path, {
      method: 'DELETE',
      ...options,
    }),
}

export default apiClient
