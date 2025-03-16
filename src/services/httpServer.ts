import { getCookie } from 'cookies-next/server'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const formatUrl = (url: string, params?: string[]): string => {
  if (!params) return url
  const matchParams = /{(\d+)}/g
  const replacer = (match: string, index: number): string => params[index] ?? match

  return url.replace(matchParams, replacer)
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  headers: Record<string, string> = {},
): Promise<T> {
  try {
    const token = getCookie('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${baseURL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return (await response.json()) as T
  } catch (error) {
    throw error
  }
}

export async function getData<T>(
  url: string,
  params?: string[],
  headers?: Record<string, string>,
): Promise<T> {
  return request<T>('GET', formatUrl(url, params), undefined, headers)
}

export async function postData<T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>,
): Promise<T> {
  return request<T>('POST', url, data, headers)
}

export async function putData<T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>,
): Promise<T> {
  return request<T>('PUT', url, data, headers)
}
