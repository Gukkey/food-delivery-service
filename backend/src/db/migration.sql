CREATE TABLE
  `customer` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `Customer_id_address_key` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci

  CREATE TABLE
  `customer_credentials` (
    `id` int NOT NULL AUTO_INCREMENT,
    `customer_id` int DEFAULT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `customer_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci

  CREATE TABLE
  `menu` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `price` int NOT NULL,
    `dietary_tags` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `restaurant_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `Menu_restaurantId_fkey` (`restaurant_id`),
    CONSTRAINT `Menu_restaurantId_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci

  CREATE TABLE
  `order` (
    `id` int NOT NULL AUTO_INCREMENT,
    `customerId` int NOT NULL,
    `itemId` int NOT NULL,
    `deliveryAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    KEY `Order_customerId_deliveryAddress_fkey` (`customerId`, `deliveryAddress`),
    KEY `Order_itemId_fkey` (`itemId`),
    CONSTRAINT `Order_customerId_deliveryAddress_fkey` FOREIGN KEY (`customerId`, `deliveryAddress`) REFERENCES `customer` (`id`, `address`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `Order_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `menu` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci

  CREATE TABLE
  `restaurant` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `cuisine_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `delivery_area` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `rating` int DEFAULT '0',
    `rating_count` int DEFAULT '0',
    PRIMARY KEY (`id`),
    UNIQUE KEY `Restaurant_name_key` (`name`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci