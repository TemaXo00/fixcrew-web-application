/*
  Warnings:

  - Added the required column `name` to the `known_masters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "known_masters" ADD COLUMN     "name" TEXT NOT NULL;
