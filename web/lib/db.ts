import { PrismaClient } from '@prisma/client'

// Extend globalThis with prisma property for caching
declare global {
  var __db: PrismaClient | undefined
}

// Use global prisma instance in development to avoid multiple connections
let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!globalThis.__db) {
    globalThis.__db = new PrismaClient()
  }
  db = globalThis.__db
}

export { db }
