-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2020 at 11:43 PM
-- Server version: 10.4.12-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jira-invoice-manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `businessName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billTo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ratePerHour` float NOT NULL,
  `total` float NOT NULL,
  `issued` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `number`, `userId`, `status`, `businessName`, `billTo`, `ratePerHour`, `total`, `issued`, `due`) VALUES
('5515a08a-491d-44ee-b659-95c05423e1e5', 1, '598d1d2b-0fe1-4bca-a160-606e336a5b9b', 'awaiting payment', 'placeholder business', 'example employer', 35.2, 30000, '2020-03-29T09:40:56', '2020-03-29T09:40:56'),
('75ca541c-90a6-4779-9161-13e5d0a5bea8', 2, '598d1d2b-0fe1-4bca-a160-606e336a5b9b', 'awaiting payment', 'placeholder business', 'example employer', 35.2, 30000, '2020-03-29T09:40:56', '2020-03-29T09:40:56');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item`
--

CREATE TABLE `invoice_item` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jiraId` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issueId` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_item`
--

INSERT INTO `invoice_item` (`id`, `jiraId`, `invoiceId`, `issueId`) VALUES
('0599e8e6-924f-4651-bacd-88f9d5cb3224', '10010', '75ca541c-90a6-4779-9161-13e5d0a5bea8', '11047'),
('781219f8-86b2-4570-805b-c388a7b7e202', '10011', '75ca541c-90a6-4779-9161-13e5d0a5bea8', '11047'),
('cff17765-fd5c-4912-a06c-7c8f95942902', '10010', '5515a08a-491d-44ee-b659-95c05423e1e5', '11047'),
('d2c3cf34-ff94-4271-b76d-98c4738c82f0', '10011', '5515a08a-491d-44ee-b659-95c05423e1e5', '11047');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userAgent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `timestamp`, `action`, `userAgent`, `ip`) VALUES
('0224d58a-a84f-451b-b8d8-5753ec50705c', 'Sun Apr 26 2020 19:07:17 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('0326159a-b701-4bc1-8f2a-1d44a9cb90a2', 'Sun Apr 26 2020 19:07:13 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('054da4a4-4b96-4c05-818d-6440111dcd24', 'Sun Apr 26 2020 18:56:00 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('0654508d-4f6a-4a3d-88f0-7461d3c3e2f6', 'Sun Apr 26 2020 19:07:21 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('096bb104-2979-4718-861b-681fc765743f', 'Sun Apr 26 2020 22:01:48 GMT+1000 (Australian Eastern Standard Time)', 'createInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('0df7c54f-5d3f-4f2b-b9b6-2f49759d6374', 'Sun Apr 26 2020 19:03:18 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('109771c2-79bc-4149-9c79-10839a12ac0a', 'Sun Apr 26 2020 19:12:30 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('1777a491-37bc-42ce-8b8a-43cfceac37e0', 'Sun Apr 26 2020 19:07:20 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('196fe9c9-bc04-4d7c-95bf-fe655305d774', 'Sun Apr 26 2020 19:07:23 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('1ba7799e-5640-4ada-b4e5-4719121c87cc', 'Mon Apr 27 2020 09:36:02 GMT+1000 (Australian Eastern Standard Time)', 'login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('1c9a60b0-4c75-44d9-862b-df81de708650', 'Sun Apr 26 2020 18:56:01 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('1e408b85-f3fe-42fc-941a-ae7d14f64627', 'Sun Apr 26 2020 19:03:19 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('1efa9fd8-ade0-48ae-9319-0a17d76b54c3', 'Sun Apr 26 2020 18:56:03 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('26eeb41e-b584-400d-a487-8f970c6172d7', 'Sun Apr 26 2020 18:56:03 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('2d349137-fffd-497c-8743-89cad5a6fdb0', 'Sun Apr 26 2020 19:07:19 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('32971b47-2281-4262-b5c6-984bc12b5419', 'Sun Apr 26 2020 18:55:59 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('3a3a73fd-c3a4-45de-a98b-b6d67997e3fe', 'Sun Apr 26 2020 22:00:47 GMT+1000 (Australian Eastern Standard Time)', 'createInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('3a3bfacf-cecf-477d-89c0-23279979184a', 'Sun Apr 26 2020 21:59:43 GMT+1000 (Australian Eastern Standard Time)', 'createInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('4d59c107-20ed-4d36-a85b-9127a0a4004b', 'Mon Apr 27 2020 09:37:03 GMT+1000 (Australian Eastern Standard Time)', 'exchangeAuthCode', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('5087c108-46f3-4c6f-b098-8b41ba24fc7c', 'Sun Apr 26 2020 22:02:35 GMT+1000 (Australian Eastern Standard Time)', 'createInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('5563fe62-990e-4612-a1a4-4f3222f655b9', 'Sun Apr 26 2020 20:58:41 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('59346dc8-a61a-4526-ac9f-953405977e88', 'Mon Apr 27 2020 09:37:08 GMT+1000 (Australian Eastern Standard Time)', 'getAuthUrl', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('5cd83cbd-da36-4671-b5a9-7e6df105621b', 'Mon Apr 27 2020 08:55:16 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('6109a725-bfe3-4588-a094-967089d216ae', 'Mon Apr 27 2020 09:36:39 GMT+1000 (Australian Eastern Standard Time)', 'exchangeAuthCode', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('6f54b415-d3ee-4cc3-9af9-87babcfce129', 'Sun Apr 26 2020 19:08:57 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('70706c8f-e6be-4a56-93ce-054c43dcbb5e', 'Sun Apr 26 2020 19:04:21 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('72bfbc37-6626-4c39-b08a-195e3bf1012b', 'Sun Apr 26 2020 19:07:18 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('7e142ab8-e7bf-43e4-9637-724fad9d2658', 'Sun Apr 26 2020 15:39:26 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('8c2bb9e5-8372-4d9c-8a77-12bd5def5596', 'Mon Apr 27 2020 09:39:27 GMT+1000 (Australian Eastern Standard Time)', 'exchangeAuthCode', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('8e7ec1b2-c153-47b3-9841-110bee5b8d93', 'Sun Apr 26 2020 19:12:28 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('9561c114-d7aa-47ad-b151-448634a4dafe', 'Sun Apr 26 2020 21:28:42 GMT+1000 (Australian Eastern Standard Time)', 'updateInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('97439938-d63a-4936-988a-4e8a07242eb3', 'Sun Apr 26 2020 22:03:14 GMT+1000 (Australian Eastern Standard Time)', 'createInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('99405d48-3ca5-4275-967a-3a9fb3ff7127', 'Mon Apr 27 2020 09:10:33 GMT+1000 (Australian Eastern Standard Time)', 'getAuthUrl', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('9dcec7fb-7513-4548-accb-d4a444850978', 'Sun Apr 26 2020 22:02:08 GMT+1000 (Australian Eastern Standard Time)', 'createInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('a5620da9-7ca9-4d2b-a9be-256aea66f822', 'Sun Apr 26 2020 18:56:03 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('adb148c8-2079-4cf1-ac25-9668b800b876', 'Sun Apr 26 2020 19:03:41 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('b99ab579-d00e-4be2-a7c1-e6e67e7755a8', 'Sun Apr 26 2020 18:56:03 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('bca08b9a-a477-4128-af00-7ce4aaea0dca', 'Sun Apr 26 2020 19:04:20 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('c19fe9cb-3e06-4021-989f-dbc4f7a56472', 'Mon Apr 27 2020 09:35:50 GMT+1000 (Australian Eastern Standard Time)', 'login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('c515ed79-342b-4f3d-a627-0a38f2dae6ec', 'Sun Apr 26 2020 19:07:25 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('cd620601-dfdb-47bb-a727-177ce0da94c7', 'Sun Apr 26 2020 21:29:03 GMT+1000 (Australian Eastern Standard Time)', 'updateInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('cf73a70b-a579-48f7-9585-fc4bf6c2d17c', 'Mon Apr 27 2020 08:48:46 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('da3ca7dd-6b5a-4138-892b-1c3c379f3a2e', 'Sun Apr 26 2020 18:56:02 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('e6e92ef0-1753-4f33-a07c-b02096d310b5', 'Sun Apr 26 2020 19:07:15 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('e88055e7-3b79-4d81-b962-8173e88fa922', 'Sun Apr 26 2020 21:01:49 GMT+1000 (Australian Eastern Standard Time)', 'updateInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('ea1f0c66-e3bc-442c-8218-ec05296757e4', 'Sun Apr 26 2020 19:12:29 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('eaae51d3-801a-4122-8a19-e48ff8fdbc44', 'Sun Apr 26 2020 15:31:43 GMT+1000 (Australian Eastern Standard Time)', 'login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::ffff:192.168.0.22'),
('ebf82621-8456-48c5-85f8-5d00c3d46db1', 'Sun Apr 26 2020 21:23:58 GMT+1000 (Australian Eastern Standard Time)', 'updateInvoice', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('edb2f648-1f1a-44af-8ae8-dd691f5183f6', 'Sun Apr 26 2020 19:03:17 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('f11188e1-3034-4f0a-9cbd-e7048df5cc1b', 'Sun Apr 26 2020 19:03:20 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('f1b67589-3d0f-4759-811d-15d621ee98e8', 'Sun Apr 26 2020 18:56:02 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1'),
('f5ec7cbf-c32f-4687-bb4a-f9b66f02d668', 'Sun Apr 26 2020 19:03:18 GMT+1000 (Australian Eastern Standard Time)', 'currentUser', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('RGHVt8COm-DetlVE_C5vy9nWhm61x47V', 1590363650, '{\"cookie\":{\"originalMaxAge\":2419200000,\"expires\":\"2020-05-24T23:36:02.666Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"598d1d2b-0fe1-4bca-a160-606e336a5b9b\",\"userState\":\"$2b$10$qIRhlaPvZDo/.41qj3Jd3ePf8/XdFEu2WANUnjyfvo7V3I18kQH/u\"}'),
('rgO3-DiV25ZJ0YvKh1Mx_6n8u5HYqv_K', 1590298303, '{\"cookie\":{\"originalMaxAge\":2419200000,\"expires\":\"2020-05-24T05:31:43.481Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"598d1d2b-0fe1-4bca-a160-606e336a5b9b\",\"userState\":\"$2b$10$Q5Bmb9U3bGt5ULGaka0pYOazUm6GCHwH9byCTfY2vADVXU9wItHVu\"}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `password`, `email`, `refreshToken`) VALUES
('598d1d2b-0fe1-4bca-a160-606e336a5b9b', 'bryn', 'mailer', '$2b$10$LF.EuOufZ09T00OWzHPPh.Rp.BDNonp8EvH4nICHDGZDknuoUkP0G', 'bryndiupero@gmail.com', 'YmiX16kAsuvSQThtZMXPUCzOhkCCsYtIvmNBQTUt7I1cH');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f8e849201da83b87f78c7497dde` (`userId`);

--
-- Indexes for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_553d5aac210d22fdca5c8d48ead` (`invoiceId`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `FK_f8e849201da83b87f78c7497dde` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD CONSTRAINT `FK_553d5aac210d22fdca5c8d48ead` FOREIGN KEY (`invoiceId`) REFERENCES `invoice` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
