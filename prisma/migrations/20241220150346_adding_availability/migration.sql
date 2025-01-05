-- CreateTable
CREATE TABLE "availability" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("id")
);
