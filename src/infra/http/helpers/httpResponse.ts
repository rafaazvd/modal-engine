export type HttpResponse = {
  statusCode: number
  body: any
}

export function success(data?: any): HttpResponse {
  return {
    statusCode: 200,
    body: data,
  }
}

export function clientError(msg: string): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: msg,
    },
  }
}

export function fail(): HttpResponse {
  return {
    statusCode: 500,
    body: {
      error: 'internal',
    },
  }
}
