import axios, { AxiosError } from 'axios'
import { getCookie, getCookies } from 'cookies-next'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const instance = axios.create({
  baseURL,
  headers: defaultHeaders,
})

let token: string | undefined = undefined

instance.interceptors.request.use(
  async config => {
    console.log('instance being called')
    console.log('token', await getCookies())
    if (!token) {
      token = await getCookie('token')
    }
    console.log('here is token', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

export const formatUrl = (url: string, params?: string[]): string => {
  if (!params) return url
  const matchParams = /{(\d+)}/g
  const replacer = (match: string, index: number): string => params[index] ?? match

  return url.replace(matchParams, replacer)
}

export async function getData<T>(url: string, params?: string[], headers?: unknown): Promise<T> {
  try {
    console.log('📡 Calling GET:', url)
    const response = await instance.get<T>(formatUrl(url, params), { headers })
    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export async function postData<T>(url: string, data: unknown, headers?: unknown): Promise<T> {
  try {
    const response = await instance.post<T>(url, data, { headers })
    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export async function putData<T>(url: string, data: unknown, headers?: unknown): Promise<T> {
  try {
    const response = await instance.put<T>(url, data, { headers })
    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}
