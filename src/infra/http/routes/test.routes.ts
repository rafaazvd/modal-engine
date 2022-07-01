import fs from 'fs'
import path from 'path'
import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'
import { v4 as uuid } from 'uuid'

import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { uploadImageToStorage } from '@infra/services/firebaseUploadImage'

const testRoute = new Route('test')

export class ControllerTest implements Controller {
  private static instance = new ControllerTest()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ files }: ControllerRequest): Promise<HttpResponse> {
      try {
        if (Object.keys(files).length === 0) {
          return success('No files were uploaded.');
        }
        const token = uuid()
        const dirPath = path.join(__dirname, '../../../../docs')
        const buffer = await files.toBuffer('image/png')
        fs.writeFileSync(`${dirPath}/${token}-doc.png`, buffer)
        const urlDoc = await uploadImageToStorage(`${dirPath}/${token}-doc.png`, 'rg', `${token}-doc.png`)
        fs.unlinkSync(`${dirPath}/${token}-doc.png`)
        return success({msg: urlDoc})
    } catch (err) {
      console.log(err)
      return fail()
    }
  }
}

testRoute.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(ControllerTest.getSingleton()),
})

export { testRoute }
