/*
  Warnings:

  - The `scheduleFrom` column on the `known_masters` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `scheduleTo` column on the `known_masters` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "known_masters" DROP COLUMN "scheduleFrom",
ADD COLUMN     "scheduleFrom" INTEGER,
DROP COLUMN "scheduleTo",
ADD COLUMN     "scheduleTo" INTEGER;
