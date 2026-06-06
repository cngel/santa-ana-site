-- CreateTable
CREATE TABLE `price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` FLOAT NULL,
    `propina` FLOAT NULL,
    `manual` FLOAT NULL,
    `cartao` FLOAT NULL,
    `uniforme_puniv` FLOAT NULL,
    `uniforme_enfermagem` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
