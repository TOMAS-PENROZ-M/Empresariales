-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
