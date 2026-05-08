/*
  Warnings:

  - You are about to drop the `Zip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Zip" DROP CONSTRAINT "Zip_region_id_fkey";

-- DropTable
DROP TABLE "Zip";

-- CreateTable
CREATE TABLE "zipcodes" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "region_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zipcodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "zipcodes_region_id_idx" ON "zipcodes"("region_id");

-- CreateIndex
CREATE INDEX "zipcodes_code_idx" ON "zipcodes"("code");

-- AddForeignKey
ALTER TABLE "zipcodes" ADD CONSTRAINT "zipcodes_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
