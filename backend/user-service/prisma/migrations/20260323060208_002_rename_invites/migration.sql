/*
  Warnings:

  - You are about to drop the `invites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "invites";

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'CREATED',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_hash_key" ON "token"("hash");
