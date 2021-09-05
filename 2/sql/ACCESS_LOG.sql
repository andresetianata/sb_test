CREATE TABLE `ACCESS_LOG` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `DateTimeAccess` datetime DEFAULT NULL,
  `EndPoint` varchar(100) DEFAULT NULL,
  `Parameter` varchar(100) DEFAULT NULL,
  `HttpResponseCode` integer default NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;