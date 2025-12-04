-- AlterTable
ALTER TABLE `projectsubmission` ADD COLUMN `projectType` VARCHAR(191) NOT NULL DEFAULT 'web',
    MODIFY `projectDescription` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `lectureraccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `lectureraccount_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
