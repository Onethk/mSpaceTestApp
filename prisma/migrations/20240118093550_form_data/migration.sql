-- CreateTable
CREATE TABLE "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
