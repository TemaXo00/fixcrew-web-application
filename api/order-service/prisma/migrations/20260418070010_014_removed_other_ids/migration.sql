/*
  Warnings:

  - You are about to drop the column `master_id` on the `known_masters` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `regions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_region_id_fkey";

-- DropIndex
DROP INDEX "known_masters_master_id_key";

-- DropIndex
DROP INDEX "regions_region_id_key";

-- AlterTable
ALTER TABLE "known_masters" DROP COLUMN "master_id";

-- AlterTable
ALTER TABLE "regions" DROP COLUMN "region_id";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
