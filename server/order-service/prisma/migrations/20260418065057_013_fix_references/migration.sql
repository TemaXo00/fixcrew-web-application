-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_region_id_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("region_id") ON DELETE CASCADE ON UPDATE CASCADE;
