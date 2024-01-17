import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super()
    this.statusCode = statusCode
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

const catchAsync = (fn: Function) => {
  return async (request: Request, { params }: any) => {
    try {
      return await fn(request, { params })
    } catch (e: any) {
      console.error(e) // Log the error for debugging purposes
      return NextResponse.json({ error: e.message }, { status: e.statusCode })
    }
  }
}

export default catchAsync
