import { HttpResponse } from './httpResponse'

export type ControllerRequest = {
  params: any
  query: any
  body: any
  headers: any
  flow: any
}

export interface Controller {
  handle(request: ControllerRequest): Promise<HttpResponse>
}
