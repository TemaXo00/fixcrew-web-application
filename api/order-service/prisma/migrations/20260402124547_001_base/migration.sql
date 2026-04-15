-- CreateEnum
CREATE TYPE "Statuses" AS ENUM ('CREATED', 'PENDING', 'COMPLETED', 'CANCELED', 'UNDONE', 'WARRANTY_CASE');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "photo_ids" TEXT[],
    "master_id" TEXT,
    "status" "Statuses" NOT NULL DEFAULT 'CREATED',
    "price" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "known_masters" (
    "id" TEXT NOT NULL,
    "master_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "scheduleFrom" TIMESTAMP(3),
    "sheduleTo" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "known_masters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "orders_master_id_phone_email_idx" ON "orders"("master_id", "phone", "email");

-- CreateIndex
CREATE UNIQUE INDEX "known_masters_master_id_key" ON "known_masters"("master_id");

-- CreateIndex
CREATE UNIQUE INDEX "known_masters_email_key" ON "known_masters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "known_masters_phone_number_key" ON "known_masters"("phone_number");

-- CreateIndex
CREATE INDEX "known_masters_master_id_email_phone_number_idx" ON "known_masters"("master_id", "email", "phone_number");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "known_masters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
