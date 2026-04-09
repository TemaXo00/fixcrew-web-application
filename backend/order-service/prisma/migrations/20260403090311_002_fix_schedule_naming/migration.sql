/*
  Warnings:

  - You are about to drop the column `sheduleTo` on the `known_masters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "known_masters" DROP COLUMN "sheduleTo",
ADD COLUMN     "scheduleTo" TIMESTAMP(3);
