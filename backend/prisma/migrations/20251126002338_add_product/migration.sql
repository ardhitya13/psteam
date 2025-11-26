/*
  Warnings:

  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `publishDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
