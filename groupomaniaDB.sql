CREATE DATABASE `groupomania`; 
USE `groupomania`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `UserId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/ NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `UserFirstname` varchar(255) NOT NULL,
  `UserEmail` varchar(255) NOT NULL,
  `UserPresentation` varchar(255) DEFAULT NULL,
  `UserDepartement` varchar(255) NOT NULL,
  `UserRole` varchar(255) DEFAULT NULL,
  `UserPassword` varchar(255) NOT NULL,
  `UserHabilitation` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `users_UserEmail_unique` (`UserEmail`)
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci*/;

DROP TABLE IF EXISTS `shares`;

CREATE TABLE `shares` (
  `ShareId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/ NOT NULL,
  `ShareText` varchar(10000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userUserId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/  NOT NULL,
  PRIMARY KEY (`ShareId`),
  KEY `userUserId` (`userUserId`),
  CONSTRAINT `shares_ibfk_1` FOREIGN KEY (`userUserId`) REFERENCES `users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci*/;

DROP TABLE IF EXISTS `media`;

CREATE TABLE `media` (
  `MediaId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/ NOT NULL,
  `MediaName` varchar(50) NOT NULL,
  `MediaMimetype` varchar(50) NOT NULL,
  `MediaSize` int DEFAULT NULL,
  `MediaDescription` text,
  `MediaUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `shareShareId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/  DEFAULT NULL,
  PRIMARY KEY (`MediaId`),
  KEY `shareShareId` (`shareShareId`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`shareShareId`) REFERENCES `shares` (`ShareId`) ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci*/;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `CommentId` int NOT NULL AUTO_INCREMENT,
  `CommentText` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userUserId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/ NOT NULL,
  `shareShareId` char(36) /*CHARACTER SET utf8mb4 COLLATE utf8mb4_bin*/ NOT NULL,
  `commentCommentId` int DEFAULT NULL,
  PRIMARY KEY (`CommentId`),
  KEY `userUserId` (`userUserId`),
  KEY `shareShareId` (`shareShareId`),
  KEY `commentCommentId` (`commentCommentId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userUserId`) REFERENCES `users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`shareShareId`) REFERENCES `shares` (`ShareId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`commentCommentId`) REFERENCES `comments` (`CommentId`) ON DELETE SET NULL ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci*/;

INSERT INTO users (UserId, UserEmail, UserName, UserFirstname, UserDepartement, UserHabilitation, createdAt, updatedAt, UserPassword)
VALUES ('0b1720d9-aaaa-4bd9-8db7-1fe6a25da328' , 'admin@admin.ad', 'adminONE', 'admin', 'administration', true, '2022-02-02 02:02:02', '2022-02-02 02:02:02', '$2b$10$SpxKSxnol4NM/oPZ/zu5O.N8IITbR5nqYnxZPFz5QeptQRnkVMcoK');
INSERT INTO users (UserId, UserEmail, UserName, UserFirstname, UserDepartement, UserHabilitation, createdAt, updatedAt, UserPassword)
VALUES ('0b1720d9-bbbb-4bd9-8db7-1fe6a25da328' , 'admin2@admin.ad', 'adminTWO', 'admin', 'administration', true, '2022-02-02 01:01:01', '2022-02-02 01:01:01','$2b$10$SpxKSxnol4NM/oPZ/zu5O.N8IITbR5nqYnxZPFz5QeptQRnkVMcoK');
