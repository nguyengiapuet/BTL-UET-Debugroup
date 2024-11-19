CREATE DATABASE btlweb;
USE btlweb;

CREATE TABLE account (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `role` TEXT NOT NULL,
  `avatar` longtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `pens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `description` longtext,
  `html` longtext,
  `css` longtext,
  `js` longtext,
  `output` longtext,
  `visibility` CHAR(10) DEFAULT ('private'),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES account(`id`)
);

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_pens` int NOT NULL,
  `content` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`) REFERENCES account(`id`),
  FOREIGN KEY (`id_pens`) REFERENCES pens(`id`)
);

CREATE TABLE `follower` (
  `user_id` int NOT NULL,
  `follower_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `follower_id`),
  FOREIGN KEY (`user_id`) REFERENCES account(`id`),
  FOREIGN KEY (`follower_id`) REFERENCES account(`id`)
);

CREATE TABLE `likes` (
  `id_pen` int NOT NULL,
  `id_user` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pen`, `id_user`),
  FOREIGN KEY (`id_pen`) REFERENCES pens(`id`),
  FOREIGN KEY (`id_user`) REFERENCES account(`id`)
);
