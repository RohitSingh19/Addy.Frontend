export interface AddyResponse {
    count: number
    isSuccess: boolean
    message: string
    data: Url[]
  }
  
  export interface Url {
    rawUrl: string
    addyUrl: string
  }