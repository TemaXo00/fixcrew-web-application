/*
  Warnings:

  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `sale_percent` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "price",
DROP COLUMN "sale_percent";
