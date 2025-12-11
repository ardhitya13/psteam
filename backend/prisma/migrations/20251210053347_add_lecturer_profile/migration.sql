/*
  Warnings:

  - You are about to alter the column `degree` on the `educationhistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `university` on the `educationhistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `major` on the `educationhistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `studyProgram` on the `lecturerprofile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `specialization` on the `lecturerprofile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Made the column `lecturerId` on table `educationhistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `lecturerprofile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `lecturerprofile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `lecturerprofile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `educationhistory` DROP FOREIGN KEY `fk_lecturer_edu`;

-- DropForeignKey
ALTER TABLE `lecturerprofile` DROP FOREIGN KEY `fk_user_lecturer`;

-- AlterTable
ALTER TABLE `educationhistory` MODIFY `lecturerId` INTEGER NOT NULL,
    MODIFY `degree` VARCHAR(191) NULL,
    MODIFY `university` VARCHAR(191) NULL,
    MODIFY `major` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `lecturerprofile` MODIFY `userId` INTEGER NOT NULL,
    MODIFY `studyProgram` VARCHAR(191) NULL,
    MODIFY `specialization` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `lecturerprofile` ADD CONSTRAINT `lecturerprofile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `educationhistory` ADD CONSTRAINT `educationhistory_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `lecturerprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `educationhistory_lecturerId_idx` ON `educationhistory`(`lecturerId`);
DROP INDEX `fk_lecturer_edu` ON `educationhistory`;

-- RedefineIndex
CREATE UNIQUE INDEX `lecturerprofile_userId_key` ON `lecturerprofile`(`userId`);
DROP INDEX `userId` ON `lecturerprofile`;
