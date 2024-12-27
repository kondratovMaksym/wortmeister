-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "wordsTotal" INTEGER,
    "besttime" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");
