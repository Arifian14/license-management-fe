import axios from 'axios'

export const getAll = async (url:string,token:string, params:object) => {
  const obj = new URL(url)
  Object.entries(params).forEach(([key, value]:any) => {
    if (value !== undefined && value !== null && value !== '') {
      obj.searchParams.append(key, value)
    }
  })

  try {
    const response = await axios.get(obj.toString(), {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}