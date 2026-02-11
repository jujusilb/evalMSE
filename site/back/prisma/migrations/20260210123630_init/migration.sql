-- CreateTable
CREATE TABLE `grimoire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `grimoire_platId_userId_key`(`platId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grimoire` ADD CONSTRAINT `grimoire_platId_fkey` FOREIGN KEY (`platId`) REFERENCES `plat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grimoire` ADD CONSTRAINT `grimoire_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
