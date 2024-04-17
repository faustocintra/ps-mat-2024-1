/*
  Warnings:

  - A unique constraint covering the columns `[identity_document]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identity_document` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "identity_document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seller_identity_document_key" ON "Seller"("identity_document");
