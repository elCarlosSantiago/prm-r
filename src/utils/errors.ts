import { TRPCError } from '@trpc/server'

export const badRequest = (message?: string) => {
  return new TRPCError({
    code: 'BAD_REQUEST',
    message: message || 'Please check the information sent',
  })
}

export const unauthorized = (message?: string) => {
  return new TRPCError({
    code: 'UNAUTHORIZED',
    message: message || 'Unauthorized',
  })
}

export const notFound = (message?: string) => {
  return new TRPCError({
    code: 'NOT_FOUND',
    message: message || 'Resource not found',
  })
}

export const serverError = (message?: string) => {
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: message || 'Internal server error',
  })
}
