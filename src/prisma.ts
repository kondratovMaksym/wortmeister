import { PrismaClient } from "@prisma/client";

// Создаем объект для хранения глобального экземпляра PrismaClient.
// Этот объект будет доступен глобально через `global`.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Проверяем, существует ли уже экземпляр PrismaClient в `globalForPrisma`.
// Если да, используем его. Если нет, создаем новый экземпляр.
const prisma = globalForPrisma.prisma || new PrismaClient();

// В среде разработки (`NODE_ENV !== 'production'`)
// сохраняем экземпляр PrismaClient в `globalForPrisma`.
// Это гарантирует, что один и тот же экземпляр используется повторно
// при каждом изменении кода (и при перезапуске сервера).
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Экспортируем prisma для использования в других частях приложения.
export default prisma;
