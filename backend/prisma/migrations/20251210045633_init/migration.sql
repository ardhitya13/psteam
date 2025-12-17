/*
  Warnings:

  - You are about to drop the `lectureraccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `teammember` DROP FOREIGN KEY `TeamMember_projectId_fkey`;

-- AlterTable
ALTER TABLE `teammember` MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teamproject` MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trainingregistration` MODIFY `id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `lectureraccount`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL,
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
    `id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `organizer` VARCHAR(191) NULL DEFAULT 'PSTeam Academy',
    `certificate` VARCHAR(191) NULL,
    `costDetails` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` VARCHAR(191) NULL,
    `instructor` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `requirements` LONGTEXT NULL,
    `rundown` LONGTEXT NULL,
    `schedule` LONGTEXT NULL,
    `shortDescription` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'web',
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `educationhistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lecturerId` INTEGER NULL,
    `degree` VARCHAR(255) NULL,
    `university` VARCHAR(255) NULL,
    `major` VARCHAR(255) NULL,

    INDEX `fk_lecturer_edu`(`lecturerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecturerprofile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `studyProgram` VARCHAR(255) NULL,
    `specialization` VARCHAR(255) NULL,
    `imageUrl` TEXT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `educationhistory` ADD CONSTRAINT `fk_lecturer_edu` FOREIGN KEY (`lecturerId`) REFERENCES `lecturerprofile`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lecturerprofile` ADD CONSTRAINT `fk_user_lecturer` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
