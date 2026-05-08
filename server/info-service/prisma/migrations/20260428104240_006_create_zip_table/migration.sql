-- CreateTable
CREATE TABLE "Zip" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "region_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Zip" ADD CONSTRAINT "Zip_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
