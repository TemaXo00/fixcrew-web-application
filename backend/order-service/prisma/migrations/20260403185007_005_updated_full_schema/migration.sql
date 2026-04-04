/*
  Warnings:

  - You are about to drop the column `scheduleFrom` on the `known_masters` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleTo` on the `known_masters` table. All the data in the column will be lost.
  - Added the required column `date` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMin` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_master_id_fkey";

-- DropIndex
DROP INDEX "known_masters_master_id_email_phone_number_idx";

-- DropIndex
DROP INDEX "orders_master_id_phone_email_idx";

-- AlterTable
ALTER TABLE "known_masters" DROP COLUMN "scheduleFrom",
DROP COLUMN "scheduleTo";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "region_id" TEXT NOT NULL,
ADD COLUMN     "startMin" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "masters_schedule" (
    "id" TEXT NOT NULL,
    "master_id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startMin" INTEGER NOT NULL,
    "endMin" INTEGER NOT NULL,

    CONSTRAINT "masters_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KnownMastersToRegion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KnownMastersToRegion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "masters_schedule_master_id_dayOfWeek_idx" ON "masters_schedule"("master_id", "dayOfWeek");

-- CreateIndex
CREATE INDEX "masters_schedule_dayOfWeek_startMin_endMin_idx" ON "masters_schedule"("dayOfWeek", "startMin", "endMin");

-- CreateIndex
CREATE UNIQUE INDEX "masters_schedule_master_id_dayOfWeek_key" ON "masters_schedule"("master_id", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "regions_region_id_key" ON "regions"("region_id");

-- CreateIndex
CREATE UNIQUE INDEX "regions_name_key" ON "regions"("name");

-- CreateIndex
CREATE INDEX "_KnownMastersToRegion_B_index" ON "_KnownMastersToRegion"("B");

-- CreateIndex
CREATE INDEX "known_masters_created_at_idx" ON "known_masters"("created_at");

-- CreateIndex
CREATE INDEX "orders_master_id_idx" ON "orders"("master_id");

-- CreateIndex
CREATE INDEX "orders_region_id_idx" ON "orders"("region_id");

-- CreateIndex
CREATE INDEX "orders_date_idx" ON "orders"("date");

-- CreateIndex
CREATE INDEX "orders_date_startMin_idx" ON "orders"("date", "startMin");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "known_masters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masters_schedule" ADD CONSTRAINT "masters_schedule_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "known_masters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnownMastersToRegion" ADD CONSTRAINT "_KnownMastersToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "known_masters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnownMastersToRegion" ADD CONSTRAINT "_KnownMastersToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
