-- CreateTable
CREATE TABLE `ShortenedURL` (
    `ID` VARCHAR(191) NOT NULL,
    `originalUrl` VARCHAR(191) NULL,
    `customAlias` VARCHAR(191) NULL,
    `shortenUrl` VARCHAR(191) NULL,
    `expirationDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ShortenedURL_customAlias_key`(`customAlias`),
    UNIQUE INDEX `ShortenedURL_shortenUrl_key`(`shortenUrl`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
