/*
  Warnings:

  - You are about to drop the column `trainingTitle` on the `trainingregistration` table. All the data in the column will be lost.
  - You are about to drop the column `trainingType` on the `trainingregistration` table. All the data in the column will be lost.
  - Added the required column `trainingId` to the `trainingregistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lecturerprofile` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `teammember` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `teamproject` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `training` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `trainingregistration` DROP COLUMN `trainingTitle`,
    DROP COLUMN `trainingType`,
    ADD COLUMN `trainingId` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `research` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `lecturerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `communityservice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lecturerId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scientificwork` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lecturerId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `intellectualproperty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lecturerId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teammember` ADD CONSTRAINT `teammember_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `teamproject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trainingregistration` ADD CONSTRAINT `trainingregistration_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `research` ADD CONSTRAINT `research_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `lecturerprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `communityservice` ADD CONSTRAINT `communityservice_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `lecturerprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scientificwork` ADD CONSTRAINT `scientificwork_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `lecturerprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectualproperty` ADD CONSTRAINT `intellectualproperty_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `lecturerprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `teammember_projectId_idx` ON `teammember`(`projectId`);
DROP INDEX `TeamMember_projectId_fkey` ON `teammember`;
