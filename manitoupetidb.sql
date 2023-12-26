-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: manitoupetidb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `is_main_admin` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (3,'adminka','$2b$13$KX3TwuKc3kEzEpG.Tt.bGuIKk1wm5SYSgVpUsyC5MxdLV7Vu1a2De','Kedves Admin',1),(4,'zsozso','$2a$13$IEpdHoHNbFt2Nzt/CJ9axOv4uPZL8VTjBsf9Y9wxpxykE6b76hrbO','Legszebb Admin',0),(5,'admin','$2a$13$wAFX25jysGZoTtXglEpkY..UVRg3SBtG3piIFqUBxAtgUQTv8jEGC','Teszt Admin',1);
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive_bookings`
--

DROP TABLE IF EXISTS `archive_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `machine_id` int DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected','Expired','Paid') DEFAULT NULL,
  `price` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `machine_id` (`machine_id`),
  CONSTRAINT `archive_bookings_ibfk_1` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_bookings`
--

LOCK TABLES `archive_bookings` WRITE;
/*!40000 ALTER TABLE `archive_bookings` DISABLE KEYS */;
INSERT INTO `archive_bookings` VALUES (98,121,9,'Lucas','Hernandez','lucas.hernandez@example.com','555-8765','Location B','2023-03-02','2023-03-10','Paid',141000,'2023-02-27 08:30:00','2023-11-28 23:00:00','Late payment'),(99,122,9,'Aubrey','Lopez','aubrey.lopez@example.com','555-5432','Location C','2023-03-15','2023-03-22','Paid',120000,'2023-03-10 07:45:00','2023-11-28 23:00:00','No show'),(100,123,9,'Christopher','Gomez','christopher.gomez@example.com','555-2345','Location A','2023-04-01','2023-04-08','Paid',134000,'2023-03-27 13:30:00','2023-11-28 23:00:00','Early check-out'),(101,124,9,'Harper','Barnes','harper.barnes@example.com','555-8765','Location B','2023-04-15','2023-04-22','Paid',142000,'2023-04-10 09:10:00','2023-11-28 23:00:00','Special occasion'),(125,63,9,'Sophia','Jones','sophia.jones@example.com','555-1234','Location A','2023-01-10','2023-01-15','Paid',90000,'2023-01-05 09:30:00','2023-01-08 13:45:00','Special occasion'),(126,64,9,'Oliver','Smith','oliver.smith@example.com','555-5678','Location B','2023-02-20','2023-02-25','Paid',105000,'2023-02-15 08:45:00','2023-02-18 12:00:00','Late payment'),(127,65,9,'Aria','Gomez','aria.gomez@example.com','555-9876','Location C','2023-03-08','2023-03-12','Paid',120000,'2023-03-05 07:15:00','2023-03-08 10:30:00','Early check-out'),(128,66,9,'Ethan','Martinez','ethan.martinez@example.com','555-8765','Location A','2023-05-15','2023-05-22','Paid',110000,'2023-05-10 09:20:00','2023-05-13 14:40:00','Group booking'),(129,67,9,'Olivia','Davis','olivia.davis@example.com','555-4321','Location B','2023-06-12','2023-06-18','Paid',95000,'2023-06-07 13:00:00','2023-06-10 08:15:00','No show'),(130,68,9,'Jackson','Lee','jackson.lee@example.com','555-2345','Location C','2023-07-25','2023-08-01','Paid',98000,'2023-07-20 07:30:00','2023-07-23 11:45:00','Special request'),(131,69,9,'Emma','Wang','emma.wang@example.com','555-8765','Location A','2023-09-02','2023-09-08','Paid',112000,'2023-08-28 08:10:00','2023-08-31 12:30:00','Late check-in'),(132,70,11,'Sophia','Johnson','sophia.johnson@example.com','555-1234','Location A','2023-01-10','2023-01-15','Paid',90000,'2023-01-05 09:30:00','2023-01-08 13:45:00','Special occasion'),(133,71,11,'Oliver','Smith','oliver.smith@example.com','555-5678','Location B','2023-02-20','2023-02-25','Paid',105000,'2023-02-15 08:45:00','2023-02-18 12:00:00','Late payment'),(134,72,11,'Aria','Gomez','aria.gomez@example.com','555-9876','Location C','2023-03-08','2023-03-12','Paid',120000,'2023-03-05 07:15:00','2023-03-08 10:30:00','Early check-out'),(135,73,11,'Ethan','Martinez','ethan.martinez@example.com','555-8765','Location A','2023-05-15','2023-05-22','Paid',110000,'2023-05-10 09:20:00','2023-05-13 14:40:00','Group booking'),(136,74,11,'Olivia','Davis','olivia.davis@example.com','555-4321','Location B','2023-06-12','2023-06-18','Paid',95000,'2023-06-07 13:00:00','2023-06-10 08:15:00','No show'),(137,75,11,'Jackson','Lee','jackson.lee@example.com','555-2345','Location C','2023-07-25','2023-08-01','Paid',98000,'2023-07-20 07:30:00','2023-07-23 11:45:00','Special request'),(138,76,11,'Emma','Wang','emma.wang@example.com','555-8765','Location A','2023-09-02','2023-09-08','Paid',112000,'2023-08-28 08:10:00','2023-08-31 12:30:00','Late check-in'),(139,143,9,'Zsolt','Tardi','mocsok2000@gmail.com','9352895238','Tatabánya','2023-12-04','2023-12-05','Approved',100002,'2023-11-29 13:36:35','2023-12-05 13:51:00',NULL),(140,144,9,'Zsolt','Tardi','mocsok2000@gmail.com','2395898523','Tatabánya','2023-12-04','2023-12-05','Approved',100002,'2023-11-29 13:39:10','2023-12-05 13:51:00',NULL),(141,145,9,'Zsolt','Tardi','mocsok2000@gmail.com','3298592853','Tatabánya','2023-12-04','2023-12-05','Rejected',100002,'2023-11-29 14:01:02','2023-12-05 13:51:00','Sajnos csúnya vagy, ne haragudj'),(142,146,11,'Sophia','Johnson','sophia.johnson@example.com','555-1234','Location A','2021-01-10','2021-01-15','Paid',90000,'2021-01-05 09:30:00','2023-12-05 13:51:00','Special occasion'),(143,147,11,'Oliver','Smith','oliver.smith@example.com','555-5678','Location B','2021-02-20','2021-02-25','Paid',105000,'2021-02-15 08:45:00','2023-12-05 13:51:00','Late payment'),(144,148,11,'Aria','Gomez','aria.gomez@example.com','555-9876','Location C','2021-03-08','2021-03-12','Paid',120000,'2021-03-05 07:15:00','2023-12-05 13:51:00','Early check-out'),(145,149,11,'Ethan','Martinez','ethan.martinez@example.com','555-8765','Location A','2021-05-15','2021-05-22','Paid',110000,'2021-05-10 09:20:00','2023-12-05 13:51:00','Group booking'),(146,150,11,'Olivia','Davis','olivia.davis@example.com','555-4321','Location B','2021-06-12','2021-06-18','Paid',95000,'2021-06-07 13:00:00','2023-12-05 13:51:00','No show'),(147,151,11,'Jackson','Lee','jackson.lee@example.com','555-2345','Location C','2021-07-25','2021-08-01','Paid',98000,'2021-07-20 07:30:00','2023-12-05 13:51:00','Special request'),(148,152,11,'Emma','Wang','emma.wang@example.com','555-8765','Location A','2021-09-02','2021-09-08','Paid',112000,'2021-08-28 08:10:00','2023-12-05 13:51:00','Late check-in'),(149,153,12,'William','Smith','william.smith@example.com','555-1234','Location B','2021-02-10','2021-02-15','Paid',90000,'2021-02-05 10:30:00','2023-12-05 13:51:00','Late check-out'),(150,154,12,'Aria','Gomez','aria.gomez@example.com','555-5678','Location C','2021-03-18','2021-03-22','Paid',105000,'2021-03-15 09:45:00','2023-12-05 13:51:00','Early check-out'),(151,155,12,'Ethan','Martinez','ethan.martinez@example.com','555-9876','Location A','2021-05-01','2021-05-08','Paid',120000,'2021-04-27 06:15:00','2023-12-05 13:51:00','Special occasion'),(152,156,12,'Olivia','Davis','olivia.davis@example.com','555-8765','Location B','2021-06-22','2021-06-28','Paid',110000,'2021-06-18 08:20:00','2023-12-05 13:51:00','Group booking'),(153,157,12,'Jackson','Lee','jackson.lee@example.com','555-4321','Location C','2021-08-05','2021-08-12','Paid',95000,'2021-08-01 12:00:00','2023-12-05 13:51:00','No show'),(154,158,12,'Emma','Wang','emma.wang@example.com','555-2345','Location A','2021-09-15','2021-09-22','Paid',98000,'2021-09-10 07:30:00','2023-12-05 13:51:00','Special request'),(155,159,12,'William','Smith','william.smith@example.com','555-8765','Location B','2021-10-05','2021-10-12','Paid',112000,'2021-10-01 08:10:00','2023-12-05 13:51:00','Late check-in'),(156,160,12,'Aria','Gomez','aria.gomez@example.com','555-1234','Location C','2021-11-18','2021-11-22','Paid',98000,'2021-11-15 08:30:00','2023-12-05 13:51:00','Late payment'),(157,161,12,'Ethan','Martinez','ethan.martinez@example.com','555-5678','Location A','2021-12-05','2021-12-08','Paid',105000,'2021-12-01 07:15:00','2023-12-05 13:51:00','Early check-out'),(158,162,11,'Sophia','Johnson','sophia.johnson@example.com','555-1234','Location A','2022-01-10','2022-01-15','Paid',90000,'2022-01-05 09:30:00','2023-12-05 13:51:00','Special occasion'),(159,163,11,'Oliver','Smith','oliver.smith@example.com','555-5678','Location B','2022-02-20','2022-02-25','Paid',105000,'2022-02-15 08:45:00','2023-12-05 13:51:00','Late payment'),(160,164,11,'Aria','Gomez','aria.gomez@example.com','555-9876','Location C','2022-03-08','2022-03-12','Paid',120000,'2022-03-05 07:15:00','2023-12-05 13:51:00','Early check-out'),(161,165,11,'Ethan','Martinez','ethan.martinez@example.com','555-8765','Location A','2022-05-15','2022-05-22','Paid',110000,'2022-05-10 09:20:00','2023-12-05 13:51:00','Group booking'),(162,166,11,'Olivia','Davis','olivia.davis@example.com','555-4321','Location B','2022-06-12','2022-06-18','Paid',95000,'2022-06-07 13:00:00','2023-12-05 13:51:00','No show'),(163,167,11,'Jackson','Lee','jackson.lee@example.com','555-2345','Location C','2022-07-25','2022-08-01','Paid',98000,'2022-07-20 07:30:00','2023-12-05 13:51:00','Special request'),(164,168,11,'Emma','Wang','emma.wang@example.com','555-8765','Location A','2022-09-02','2022-09-08','Paid',112000,'2022-08-28 08:10:00','2023-12-05 13:51:00','Late check-in'),(165,169,12,'William','Smith','william.smith@example.com','555-1234','Location B','2022-01-10','2022-01-15','Paid',90000,'2022-01-05 10:30:00','2023-12-05 13:51:00','Late check-out'),(166,170,12,'Aria','Gomez','aria.gomez@example.com','555-5678','Location C','2022-02-18','2022-02-22','Paid',105000,'2022-02-15 09:45:00','2023-12-05 13:51:00','Early check-out'),(167,171,12,'Ethan','Martinez','ethan.martinez@example.com','555-9876','Location A','2022-04-01','2022-04-08','Paid',120000,'2022-03-27 06:15:00','2023-12-05 13:51:00','Special occasion'),(168,172,12,'Olivia','Davis','olivia.davis@example.com','555-8765','Location B','2022-05-22','2022-05-28','Paid',110000,'2022-05-18 08:20:00','2023-12-05 13:51:00','Group booking'),(169,173,12,'Jackson','Lee','jackson.lee@example.com','555-4321','Location C','2022-07-05','2022-07-12','Paid',95000,'2022-07-01 12:00:00','2023-12-05 13:51:00','No show'),(170,174,12,'Emma','Wang','emma.wang@example.com','555-2345','Location A','2022-08-15','2022-08-22','Paid',98000,'2022-08-10 07:30:00','2023-12-05 13:51:00','Special request'),(171,175,12,'William','Smith','william.smith@example.com','555-8765','Location B','2022-09-05','2022-09-12','Paid',112000,'2022-09-01 08:10:00','2023-12-05 13:51:00','Late check-in'),(172,176,12,'Aria','Gomez','aria.gomez@example.com','555-1234','Location C','2022-10-18','2022-10-22','Paid',98000,'2022-10-15 07:30:00','2023-12-05 13:51:00','Late payment'),(173,177,12,'Ethan','Martinez','ethan.martinez@example.com','555-5678','Location A','2022-11-05','2022-11-08','Paid',105000,'2022-11-01 07:15:00','2023-12-05 13:51:00','Early check-out'),(174,189,11,'Oliver','Smith','oliver.smith@example.com','555-5678','Location B','2023-12-25','2023-12-27','Expired',108000,'2023-12-02 07:45:00','2023-12-11 19:39:32','Late payment'),(175,190,11,'Aria','Gomez','aria.gomez@example.com','555-9876','Location C','2023-12-22','2023-12-25','Expired',123000,'2023-12-01 07:00:00','2023-12-11 19:40:50','Early check-out'),(176,191,11,'Ethan','Martinez','ethan.martinez@example.com','555-8765','Location A','2023-12-20','2023-12-23','Expired',115000,'2023-12-03 09:20:00','2023-12-11 19:42:01','Group booking');
/*!40000 ALTER TABLE `archive_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Pending','Approved','Paid','Rejected','Expired') NOT NULL DEFAULT 'Pending',
  `price` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `machine_id` (`machine_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (178,12,'Sophia','Johnson','sophia.johnson@example.com','555-1234','Location A','2023-12-03','2023-12-07','Rejected',90000,'2023-11-30 09:30:00','2023-12-11 18:46:30','test'),(179,12,'Oliver','Smith','oliver.smith@example.com','555-5678','Location B','2023-12-12','2023-12-15','Paid',105000,'2023-12-07 08:45:00','2023-12-10 12:00:00','Late payment'),(180,12,'Aria','Gomez','aria.gomez@example.com','555-9876','Location C','2023-12-17','2023-12-18','Paid',120000,'2023-12-15 07:15:00','2023-12-18 10:30:00','Early check-out'),(181,12,'Ethan','Martinez','ethan.martinez@example.com','555-8765','Location A','2023-12-22','2023-12-24','Paid',110000,'2023-12-20 10:20:00','2023-12-11 19:23:46','Group booking'),(182,12,'Olivia','Davis','olivia.davis@example.com','555-4321','Location B','2023-12-28','2023-12-30','Paid',95000,'2023-12-01 14:00:00','2023-12-11 19:24:25','No show'),(183,11,'Teszt','Teszt','teszt@teszt.com','53928952','Pest','2023-12-10','2023-12-11','Paid',60000,'2023-12-10 15:50:35','2023-12-11 19:26:13',NULL),(184,11,'asd','asd','asd@asd.com','9328598259','sdpfgokopsdg','2023-12-10','2023-12-14','Approved',150000,'2023-12-10 15:52:31','2023-12-10 15:52:39',NULL),(185,11,'asd','asd','asd@asd.com','32598','asd','2023-12-11','2023-12-11','Rejected',30000,'2023-12-11 18:39:10','2023-12-11 18:44:16','csunya'),(186,11,'asd','asd','asd@asd.asd','32513253','asd','2023-12-11','2023-12-11','Approved',40000,'2023-12-11 18:51:32','2023-12-11 19:15:18',NULL),(187,11,'asd','asd','asd@asdfsad.com','934268','apsij','2023-12-11','2023-12-13','Approved',90000,'2023-12-11 19:15:55','2023-12-11 19:16:20',NULL),(188,11,'Sophia','Johnson','sophia.johnson@example.com','555-1234','Location A','2023-12-28','2023-12-29','Paid',92000,'2023-12-01 08:30:00','2023-12-11 19:34:45','Special occasion'),(192,11,'Olivia','Davis','olivia.davis@example.com','555-4321','Location B','2023-12-30','2023-12-31','Expired',98000,'2023-12-01 14:30:00','2023-12-04 10:45:00','Late check-in'),(193,11,'asd','asd','asd@asd.com','39528','asd','2023-12-12','2023-12-14','Pending',90000,'2023-12-11 19:44:37','2023-12-11 19:44:37',NULL),(194,11,'Teszt','Teszt','teszt@gfhmitew.com','953284958','Teszt','2023-12-12','2023-12-13','Pending',60000,'2023-12-12 11:22:45','2023-12-12 11:22:45',NULL),(195,11,'teszt','teszt','tedts@asdsda.com','5392859','TAtatabag','2023-12-12','2023-12-13','Pending',60000,'2023-12-12 11:23:33','2023-12-12 11:23:33',NULL),(196,11,'TAasf','Tadt','teasojg@hgjreji.com','2359898','Tatab','2023-12-12','2023-12-13','Pending',60000,'2023-12-12 11:30:22','2023-12-12 11:30:22',NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_hu` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description_hu` varchar(500) DEFAULT NULL,
  `description_en` varchar(500) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES (16,'Hercules','Hercules EN','Ebben a filmben 3 nehézgéppel voltunk jelen. A forgatás 3 hetet vett igénybe.','In this film, the director rented 3 machines from us. The filming of this movie took 3 weeks.','/images/1701079097202-330632886-Hercules.jpg'),(17,'Terminátor: Sötét végzet','Terminator: Dark fate','A filmforgatáson 8 nehézgéppel voltunk jelen. A forgatáson lehetőségünk volt Arnold Schwarzenegger elismerését is elnyerni munkánkkal. A forgatás 2 hónapot vett igénybe.','We were present at the film shooting with 8 heavy machines. During the shoot, we had the opportunity to earn recognition from Arnold Schwarzenegger for our work. The filming took 2 months.','/images/1701079211268-745779284-7d6d1329-f4bb-4388-80c1-345ef09e9ee5.jpg'),(18,'Szárnyas fejvadász 2049','Blade Runner 2049','A forgatáson 6 nehézgéppel voltunk jelen. Nagy megtiszteltetés volt számunkra, hogy Ryan Goslinggal és Harrison Forddal találkozhattunk a forgatás során.','We were present at the filming with 6 heavy machines. It was a great honor for us to meet Ryan Gosling and Harrison Ford during the shoot.','/images/1701080084879-801595643-BladeRunner.jpg'),(19,'Spectral (2016)','Spectral (2016)','A Spectral (2016) sorozat forgatásán nagyon jó hangulat volt a munkatársak között. A sorozat forgatása 2 hónapot vett igénybe, melyen összesen 9 nehézgéppel voltunk jelen.','During the filming of the Spectral (2016) series, there was a very positive atmosphere among the colleagues. The shooting of the series took 2 months, during which we were present with a total of 9 machines.','/images/1701292898509-823027989-Spectral.jpg'),(20,'The Alienist','The Alienist','Szövegleírás','Description in english','/images/1701292955982-127011664-Alienist.jpg'),(21,'Borderlands','Borderlands','Borderlands','Borderlands','/images/1701293096184-291792002-borderlands.jpeg'),(22,'Marco Polo','Marco Polo','Marco Polo','Marco Polo','/images/1701293273228-573428628-marcopolo.webp'),(23,'The Last Kingdom','The Last Kingdom','A The Last Kingdom forgatásán különösen új technológiát alkalmaztunk, a vízhullámok generálásához egy hatalmas hengerfejet csatoltunk a nehézgépre, aminek fel-le mozgatásával hullámok keletkeztek a medencében.','The Last Kingdom','/images/1701293556356-339089818-thelastkingdom.webp');
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobname_hu` varchar(100) DEFAULT NULL,
  `jobname_en` varchar(100) DEFAULT NULL,
  `jobdescription_hu` varchar(255) DEFAULT NULL,
  `jobdescription_en` varchar(255) DEFAULT NULL,
  `jobtime_hu` varchar(100) DEFAULT NULL,
  `jobtime_en` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Emelőgépkezelő','Crane Operator','Szeretnénk felvenni minél több emelőgépkezelőt, mindenképpen elvárás az OKJ képzés megléte. Részletek a \'Jelentkezz most!\' gombra kattintás után elérhetőek.','We would like to apply more and more machine operators, you must have OKJ. Details at \'Apply now!\' button go check','Teljes munkaidő','Full-time'),(2,'Földmunkagépkezelő','Heavy Equipment Operator','Szeretnénk felvenni minél több földmunkagépkezelőt, mindenképpen elvárás az OKJ képzés megléte. Részletek a \'Jelentkezz most!\' gombra kattintás után elérhetőek.','We would like to apply more and more machine operators, you must have OKJ. Details at \'Apply now!\' button go checkdel','Teljes munkaidő','Full-time');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machines`
--

DROP TABLE IF EXISTS `machines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine_name` varchar(255) NOT NULL,
  `max_height` int NOT NULL,
  `max_weight` int NOT NULL,
  `has_sole` tinyint(1) NOT NULL,
  `sole_count` tinyint DEFAULT NULL,
  `has_basket` tinyint(1) NOT NULL,
  `has_fork` tinyint(1) NOT NULL,
  `is_remote` tinyint(1) NOT NULL,
  `price_per_day` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machines`
--

LOCK TABLES `machines` WRITE;
/*!40000 ALTER TABLE `machines` DISABLE KEYS */;
INSERT INTO `machines` VALUES (9,'Manituuuu',40,3500,1,4,0,1,1,50000,'/images/1701034936471-842044124-74.jpg'),(11,'Bobcat',38,2500,1,2,1,1,0,30000,'/images/1701088614754-472530177-99r9g.jpg'),(12,'Bobcat 18m',18,1000,0,0,0,1,1,25000,'/images/1701088659662-130828927-33.jpg');
/*!40000 ALTER TABLE `machines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paragraphs`
--

DROP TABLE IF EXISTS `paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_hu` varchar(100) DEFAULT NULL,
  `title_en` varchar(100) DEFAULT NULL,
  `content_hu` varchar(1000) DEFAULT NULL,
  `content_en` varchar(1000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paragraphs`
--

LOCK TABLES `paragraphs` WRITE;
/*!40000 ALTER TABLE `paragraphs` DISABLE KEYS */;
INSERT INTO `paragraphs` VALUES (11,'Teszt Paragrafuska','Test Paragraphka','Ez a paragrafuska teljes mértékben teszt miatt jött létre. Minden itt látható információ teszt jellegű. Minél többet szeretnék ideírni, hogy az edge-caseket is meg tudjam vizsgálni. ','This paragraphka was created entirely for testing purposes. All information visible here is of a test nature. I want to write more here to be able to examine edge cases as well.','/images/1701076819577-970202468-99r9g.jpg'),(12,'Második Teszt Paragrafus','Second Test Paragraph','Ez szintén egy teszt paragrafus. Ez is csak tesztek miatt jött létre, az a lényeg, hogy minél több tesztelési lehetőségem legyen, hogy minden is működjön. Nagyon úgy néz ki, hogy minden megfelelően működik.','This is also a test paragraph. It was created for testing purposes as well; the key is to have as many testing opportunities as possible to ensure everything functions correctly. It really looks like everything is working properly.','/images/1701074814741-892017186-99r8.jpg'),(13,'Harmadik Teszt Paragrafus','Third Test Paragraph','Ez a harmadik és egyben utolsó teszteléshez szükséges paragrafus. Egyelőre minden megfelelően működött, ha itt is tökéletesen látszik minden, akkor jók vagyunk. Elméletileg minden is jó lesz, de jobb biztosra menni. Kézi teszteléshez ez az utolsó szükséges rész!','This is the third and final paragraph needed for testing. So far, everything has been working correctly, and if everything is perfectly visible here as well, then we\'re good. In theory, everything should be fine, but it\'s better to be sure. This is the last necessary part for manual testing!','/images/1701074895434-606944820-99q1.jpg');
/*!40000 ALTER TABLE `paragraphs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-26 21:09:25
