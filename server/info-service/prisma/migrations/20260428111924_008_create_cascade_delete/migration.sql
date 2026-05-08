-- DropForeignKey
ALTER TABLE "zipcodes" DROP CONSTRAINT "zipcodes_region_id_fkey";

-- AddForeignKey
ALTER TABLE "zipcodes" ADD CONSTRAINT "zipcodes_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
