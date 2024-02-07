// prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to avoid
  // creating a new Prisma Client instance on each hot reload
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
