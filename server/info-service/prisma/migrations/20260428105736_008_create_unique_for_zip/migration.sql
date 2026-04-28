/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `zipcodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "zipcodes_code_key" ON "zipcodes"("code");
