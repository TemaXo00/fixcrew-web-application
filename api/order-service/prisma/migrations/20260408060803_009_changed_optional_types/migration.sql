-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "endMin" INTEGER,
ADD COLUMN     "reminder_job_id" TEXT,
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "startMin" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "orders_name_idx" ON "orders"("name");
