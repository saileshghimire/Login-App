export {}

declare global {
  namespace Express {
    export interface Request {
      userId?: Int
      email?: string
      username?: string
      // extra variables you want to use in req object
    }
  }

}