/*
  Warnings:

  - You are about to drop the `lectureraccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `lectureraccount`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `shortDescription` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'web',
    `price` INTEGER NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `costDetails` JSON NULL,
    `requirements` JSON NULL,
    `schedule` JSON NULL,
    `rundown` JSON NULL,
    `organizer` VARCHAR(191) NULL DEFAULT 'PSTeam Academy',
    `duration` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `certificate` VARCHAR(191) NULL,
    `instructor` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
