-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 27, 2023 at 11:06 PM
-- Server version: 8.0.33-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `profbioresearch`
--

-- --------------------------------------------------------

--
-- Table structure for table `batchfeedingrecords`
--

CREATE TABLE `batchfeedingrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `date` varchar(15) NOT NULL,
  `feedsid` int NOT NULL,
  `feedsquantity` int NOT NULL,
  `munits` varchar(5) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch`) VALUES
('buwama'),
('equatorial'),
('masanafu'),
('namungoona');

-- --------------------------------------------------------

--
-- Table structure for table `buwamabatchfeedingrecords`
--

CREATE TABLE `buwamabatchfeedingrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `date` varchar(15) NOT NULL,
  `feedsid` int NOT NULL,
  `feedsquantity` int NOT NULL,
  `munits` varchar(5) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamabatchfeedingrecords`
--

INSERT INTO `buwamabatchfeedingrecords` (`batchnumber`, `date`, `feedsid`, `feedsquantity`, `munits`, `notes`) VALUES
('CB-15913', '03/09/2023', 9, 2, 'Kgs', 'test feed');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenbatchfcrrecords`
--

CREATE TABLE `buwamachickenbatchfcrrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `totalfeedsconsumed` float NOT NULL,
  `totaleggsproduced` float NOT NULL,
  `fcrvalue` float NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenbatchfcrrecords`
--

INSERT INTO `buwamachickenbatchfcrrecords` (`batchnumber`, `totalfeedsconsumed`, `totaleggsproduced`, `fcrvalue`, `notes`) VALUES
('CB-15913', 0, 330, 0, 'init');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenbatchhealth`
--

CREATE TABLE `buwamachickenbatchhealth` (
  `batchnumber` varchar(15) NOT NULL,
  `reason` text NOT NULL,
  `treatmentdate` varchar(15) NOT NULL,
  `nextdateofadministration` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `medicinename` int NOT NULL,
  `medicinequantityused` int NOT NULL,
  `diseasename` text NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenbatchhealth`
--

INSERT INTO `buwamachickenbatchhealth` (`batchnumber`, `reason`, `treatmentdate`, `nextdateofadministration`, `medicinename`, `medicinequantityused`, `diseasename`, `notes`) VALUES
('CB-4462', 'treatment', '11/09/2023', '2023-09-07', 15, 0, 'Flue', '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenbatchmortalities`
--

CREATE TABLE `buwamachickenbatchmortalities` (
  `date` varchar(15) NOT NULL,
  `batchnumber` varchar(15) NOT NULL,
  `numberofchickendead` int NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenbatchmortalities`
--

INSERT INTO `buwamachickenbatchmortalities` (`date`, `batchnumber`, `numberofchickendead`, `notes`) VALUES
('19/08/2023', 'CB-3206', 1, ''),
('03/09/2023', 'CB-3206', 2, 'Testing buwama operations'),
('03/09/2023', 'CB-15913', 4, 'test form');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenfarmbatches`
--

CREATE TABLE `buwamachickenfarmbatches` (
  `batchnumber` varchar(10) NOT NULL,
  `date` varchar(15) NOT NULL,
  `numberofchicken` int NOT NULL,
  `chickenunitprice` float NOT NULL,
  `totalspent` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `status` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'active',
  `chickenalive` int NOT NULL,
  `chickendead` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenfarmbatches`
--

INSERT INTO `buwamachickenfarmbatches` (`batchnumber`, `date`, `numberofchicken`, `chickenunitprice`, `totalspent`, `notes`, `status`, `chickenalive`, `chickendead`) VALUES
('CB-15913', '03/09/2023', 500, 10000, 5000000, 'Test batch', 'completed', 496, 4),
('CB-3206', '29/06/2023', 477, 1800, 858600, '', 'active', 474, 3);

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenfeedsinventory`
--

CREATE TABLE `buwamachickenfeedsinventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenfeedsinventory`
--

INSERT INTO `buwamachickenfeedsinventory` (`productId`, `quantityinstock`, `munits`) VALUES
(9, 28, 'Kgs');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenfeedsinventoryrecords`
--

CREATE TABLE `buwamachickenfeedsinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenfeedsinventoryrecords`
--

INSERT INTO `buwamachickenfeedsinventoryrecords` (`date`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('28/08/2023', 1, 15, 'Kgs', 'external', 'Bought', ''),
('28/08/2023', 2, 45, 'Kgs', 'external', 'Bought from outside shop', ''),
('28/08/2023', 3, 4, 'Kgs', 'external', 'Bought from outside shop', ''),
('28/08/2023', 3, 36, 'Kgs', 'external', '', ''),
('28/08/2023', 4, 90, 'Kgs', 'external', '', ''),
('28/08/2023', 5, 80, 'Kgs', 'external', '', ''),
('28/08/2023', 6, 24, 'Kgs', 'custodian', '', 'Internal'),
('28/08/2023', 7, 438, 'Kgs', 'custodian', '', 'Internal'),
('28/08/2023', 8, 150, 'Kgs', 'custodian', '', 'Mixed'),
('03/09/2023', 9, 500, 'Kgs', 'external', 'init', ''),
('03/09/2023', 9, 780, 'Kgs', 'custodian', '', 'test'),
('03/09/2023', 9, 30, 'Kgs', 'custodian', '', 'qqazz');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenmedicineinventory`
--

CREATE TABLE `buwamachickenmedicineinventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenmedicineinventory`
--

INSERT INTO `buwamachickenmedicineinventory` (`productId`, `quantityinstock`, `munits`) VALUES
(1, 4, 'Pcs'),
(3, -5, 'Pcs'),
(4, -4, 'Pcs'),
(5, 0, 'Pcs'),
(6, 0, 'Pcs'),
(7, 0, 'Pcs'),
(9, 5, 'L'),
(10, 200, 'mls'),
(11, 1, 'L'),
(12, 400, 'mls'),
(13, 200, 'mls'),
(14, 20, 'mls'),
(8, 0, 'Pcs'),
(15, 320, 'Kgs');

-- --------------------------------------------------------

--
-- Table structure for table `buwamachickenmedicineinventoryrecords`
--

CREATE TABLE `buwamachickenmedicineinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamachickenmedicineinventoryrecords`
--

INSERT INTO `buwamachickenmedicineinventoryrecords` (`date`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('28/08/2023', 1, 5, 'Pcs', 'external', 'Each piece was ugx 8000', ''),
('28/08/2023', 3, 1, 'Pcs', 'custodian', '', 'Got it from the masanafu shop'),
('28/08/2023', 4, 1, 'Pcs', 'custodian', '', 'Got it from the masanafu shop'),
('28/08/2023', 5, 1, 'Pcs', 'custodian', '', 'Got it from the masanafu shop'),
('28/08/2023', 6, 1, 'Pcs', 'custodian', '', 'Got it from the masanafu shop'),
('28/08/2023', 7, 1, 'Pcs', 'custodian', '', 'Got it from the masanafu shop'),
('28/08/2023', 9, 5, 'L', 'custodian', '', 'From internal'),
('28/08/2023', 10, 200, 'mls', 'custodian', '', 'From internal'),
('28/08/2023', 11, 1, 'L', 'custodian', '', 'From internal'),
('28/08/2023', 12, 400, 'mls', 'custodian', '', 'From internal'),
('28/08/2023', 13, 200, 'mls', 'custodian', '', 'From internal'),
('28/08/2023', 14, 20, 'mls', 'custodian', '', 'From internal'),
('28/08/2023', 8, 1, 'Pcs', 'external', '', ''),
('03/09/2023', 15, 300, 'Kgs', 'custodian', '', 'init'),
('03/09/2023', 15, 20, 'Kgs', 'custodian', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamaeggproductionrecords`
--

CREATE TABLE `buwamaeggproductionrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `collectiondate` varchar(15) NOT NULL,
  `totaleggscollected` float NOT NULL,
  `totalgoodeggscollected` float NOT NULL,
  `totaldamagedeggscollected` float NOT NULL,
  `totaleggtrays` float NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamaeggproductionrecords`
--

INSERT INTO `buwamaeggproductionrecords` (`batchnumber`, `collectiondate`, `totaleggscollected`, `totalgoodeggscollected`, `totaldamagedeggscollected`, `totaleggtrays`, `notes`) VALUES
('CB-3206', '28/08/2023', 685, 663, 22, 22.1, 'Couldnot go in date by date recording all eggs collected as its time consuming hence we got the sum of all eggs collected and damaged from the month of July. The managers will record on a daily when they start using the system.'),
('CB-3206', '28/08/2023', 1380, 1357, 23, 45.2, 'Total collected in August. The managers will record on a daily when they start using the system.'),
('CB-3206', '03/09/2023', 270, 250, 20, 8.3, 'Testing buwama operations'),
('CB-15913', '03/09/2023', 30, 27, 3, 0.9, 'init'),
('CB-15913', '03/09/2023', 300, 280, 20, 9.3, '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamafarm`
--

CREATE TABLE `buwamafarm` (
  `batchno` varchar(20) NOT NULL,
  `items` varchar(500) NOT NULL,
  `stage` text NOT NULL,
  `stagestartedon` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamafarm`
--

INSERT INTO `buwamafarm` (`batchno`, `items`, `stage`, `stagestartedon`) VALUES
('B-179469', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"35\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-09-03'),
('B-179469', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"35\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"30\",\"Damages\":5}]', 'nursery', '2023-09-03'),
('B-179469', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"35\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"27\",\"Damages\":8}]', 'sent to general store', '2023-09-03T13:17:57.496Z'),
('B-157616', '[{\"itemName\":\"Super seeds\",\"itemQuantity\":\"12\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-09-03'),
('B-157616', '[{\"itemName\":\"Super seeds\",\"itemQuantity\":\"12\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"10\",\"Damages\":2}]', 'nursery', '2023-09-03T13:21:43.673Z'),
('B-155095', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-09-18'),
('B-155095', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"4\",\"Damages\":1}]', 'nursery', '2023-09-18T14:12:11.966Z'),
('B-155095', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"\",\"Damages\":null}]', 'sent to general store', '2023-09-18T14:13:49.293Z'),
('B-27057', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"50\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-09-18'),
('B-27057', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"50\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"47\",\"Damages\":3}]', 'nursery', '2023-09-18T18:31:30.645Z'),
('B-27057', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"50\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"47\",\"Damages\":3}]', 'sent to general store', '2023-09-18T18:34:28.950Z');

-- --------------------------------------------------------

--
-- Table structure for table `buwamafarmrequests`
--

CREATE TABLE `buwamafarmrequests` (
  `requisitionid` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `batchno` varchar(20) NOT NULL,
  `requesterbranch` varchar(100) NOT NULL,
  `requesterdepartment` varchar(50) NOT NULL,
  `requesterrole` varchar(50) NOT NULL,
  `requestedby` varchar(50) NOT NULL,
  `requestedfrombranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recieverdepartment` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recieverrole` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recievedby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `additionalinfo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `itemsrequested` text NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buwamafarmrequests`
--

INSERT INTO `buwamafarmrequests` (`requisitionid`, `date`, `batchno`, `requesterbranch`, `requesterdepartment`, `requesterrole`, `requestedby`, `requestedfrombranch`, `recieverdepartment`, `recieverrole`, `recievedby`, `additionalinfo`, `itemsrequested`, `status`, `comment`) VALUES
('RFM-722302', '2023-09-18', 'B-155095', 'buwama', 'farm', 'farmmanager', 'za9', NULL, NULL, NULL, NULL, 'Test 33', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-998621', '2023-09-03', 'B-157616', 'buwama', 'farm', 'farmmanager', 'za9', NULL, NULL, NULL, NULL, 'testing form', '[{\"itemName\":\"Super seeds\",\"itemQuantity\":\"12\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-119907', '2023-09-03', 'B-179469', 'buwama', 'farm', 'farmmanager', 'za9', NULL, NULL, NULL, NULL, 'test 2', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"35\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-1402252', '2023-09-18', 'B-27057', 'buwama', 'farm', 'farmmanager', 'za9', NULL, NULL, NULL, NULL, 'test', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"50\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-1083829', '2023-09-03', 'B-31609', 'buwama', 'farm', 'farmmanager', 'za9', NULL, NULL, NULL, NULL, 'init test', '[{\"itemName\":\"Amaranth seeds\",\"itemQuantity\":\"100\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Black pepper seeds\",\"itemQuantity\":\"100\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"100\",\"mUnits\":\"Pcs\"}]', 'approved', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buwamaGeneralStoreInventory`
--

CREATE TABLE `buwamaGeneralStoreInventory` (
  `productId` varchar(10) NOT NULL,
  `category` text NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamaGeneralStoreInventory`
--

INSERT INTO `buwamaGeneralStoreInventory` (`productId`, `category`, `quantityinstock`, `munits`) VALUES
('2', 'EQUIPMENT', 17, 'Pcs'),
('3', 'EQUIPMENT', 13, 'Pcs'),
('1', 'SEEDLINGS', 50, 'Pcs'),
('4', 'FEEDS', 30, 'Kgs'),
('6', 'MEDICINE', 46, 'L'),
('8', 'SEEDLINGS', 40, 'Pcs'),
('9', 'EQUIPMENT', 5, 'Pcs');

-- --------------------------------------------------------

--
-- Table structure for table `buwamageneralstoreinventoryrecords`
--

CREATE TABLE `buwamageneralstoreinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `recordcategory` varchar(20) NOT NULL DEFAULT 'incoming',
  `itemcategory` text NOT NULL,
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamageneralstoreinventoryrecords`
--

INSERT INTO `buwamageneralstoreinventoryrecords` (`date`, `recordcategory`, `itemcategory`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('11/09/2023', 'incoming', 'EQUIPMENT', 2, 15, 'Pcs', 'EXTERNAL', 'Hardware', 'test'),
('11/09/2023', 'incoming', 'EQUIPMENT', 3, 20, 'Pcs', 'INTERNAL', 'Test', ''),
('11/09/2023', 'incoming', 'SEEDLINGS', 1, 50, 'Pcs', 'INTERNAL', 'Seedlings from farm', ''),
('11/09/2023', 'incoming', 'EQUIPMENT', 2, 5, 'Pcs', 'INTERNAL', 'from other dept', ''),
('11/09/2023', 'outgoing', 'EQUIPMENT', 2, 3, 'Pcs', 'INTERNAL', 'test', ''),
('11/09/2023', 'outgoing', 'EQUIPMENT', 3, 7, 'Pcs', 'EXTERNAL', 'taken to masanafu', ''),
('18/09/2023', 'incoming', 'FEEDS', 4, 40, 'Kgs', 'INTERNAL', 'From Farm', ''),
('18/09/2023', 'outgoing', 'FEEDS', 4, 5, 'Kgs', 'INTERNAL', 'Going To Masanafu Farm', ''),
('18/09/2023', 'incoming', 'MEDICINE', 6, 50, 'L', 'EXTERNAL', 'Drug shop', ''),
('18/09/2023', 'incoming', 'SEEDLINGS', 8, 47, 'Pcs', 'INTERNAL', 'From buwama farm', ''),
('18/09/2023', 'outgoing', 'SEEDLINGS', 8, 7, 'Pcs', 'EXTERNAL', 'Going to masanafu', ''),
('18/09/2023', 'incoming', 'EQUIPMENT', 9, 5, 'Pcs', 'EXTERNAL', 'boguht from hardware', '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamaitems`
--

CREATE TABLE `buwamaitems` (
  `productId` int NOT NULL,
  `category` text NOT NULL,
  `name` text NOT NULL,
  `unitPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamaitems`
--

INSERT INTO `buwamaitems` (`productId`, `category`, `name`, `unitPrice`) VALUES
(1, 'SEEDLINGS', 'Makuna Seedlings', 5000),
(2, 'EQUIPMENT', 'Hoes', 8000),
(3, 'EQUIPMENT', 'Spades', 12000),
(4, 'FEEDS', 'Cow Grass', 1000),
(5, 'MANURE', 'Cow Dung', 0),
(6, 'MEDICINE', 'Syrup', 5000),
(7, 'MEDICINE', 'buwama test 45', 1000),
(8, 'SEEDLINGS', 'Cucumber Seedlings', 2000),
(9, 'EQUIPMENT', 'Wheel Barrows', 50000);

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockbatchfcrrecords`
--

CREATE TABLE `buwamalivestockbatchfcrrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `totalfeedsconsumed` float NOT NULL,
  `totaleggsproduced` float NOT NULL,
  `fcrvalue` float NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockbatchfcrrecords`
--

INSERT INTO `buwamalivestockbatchfcrrecords` (`batchnumber`, `totalfeedsconsumed`, `totaleggsproduced`, `fcrvalue`, `notes`) VALUES
('CB-11071', 3, 20, 0.15, '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockbatchfeedingrecords`
--

CREATE TABLE `buwamalivestockbatchfeedingrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `date` varchar(15) NOT NULL,
  `feedsid` int NOT NULL,
  `feedsquantity` int NOT NULL,
  `munits` varchar(5) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockbatchfeedingrecords`
--

INSERT INTO `buwamalivestockbatchfeedingrecords` (`batchnumber`, `date`, `feedsid`, `feedsquantity`, `munits`, `notes`) VALUES
('CB-15913', '03/09/2023', 9, 2, 'Kgs', 'test feed'),
('CB-4462', '18/09/2023', 4, 2, 'Kgs', 'init'),
('CB-11071', '18/09/2023', 4, 3, 'Kgs', '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockbatchhealth`
--

CREATE TABLE `buwamalivestockbatchhealth` (
  `batchnumber` varchar(15) NOT NULL,
  `reason` text NOT NULL,
  `treatmentdate` varchar(15) NOT NULL,
  `nextdateofadministration` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `medicinename` int NOT NULL,
  `medicinequantityused` int NOT NULL,
  `diseasename` text NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockbatchhealth`
--

INSERT INTO `buwamalivestockbatchhealth` (`batchnumber`, `reason`, `treatmentdate`, `nextdateofadministration`, `medicinename`, `medicinequantityused`, `diseasename`, `notes`) VALUES
('CB-4462', 'vaccination', '18/09/2023', '2023-09-30', 6, 2, 'Test disease', 'init'),
('CB-11071', 'vaccination', '18/09/2023', '2023-09-23', 6, 2, 'test disease', '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockbatchmortalities`
--

CREATE TABLE `buwamalivestockbatchmortalities` (
  `date` varchar(15) NOT NULL,
  `batchnumber` varchar(15) NOT NULL,
  `numberofanimalsdead` int NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockbatchmortalities`
--

INSERT INTO `buwamalivestockbatchmortalities` (`date`, `batchnumber`, `numberofanimalsdead`, `notes`) VALUES
('04/09/2023', 'CB-4559', 10, 'Initial mortality test'),
('04/09/2023', 'CB-4559', 10, 'Initial mortality test'),
('04/09/2023', 'CB-4559', 10, 'Initial mortality test'),
('04/09/2023', 'CB-4559', 10, 'Initial mortality test'),
('04/09/2023', 'CB-4559', 10, 'Initial mortality test'),
('11/09/2023', 'CB-4462', 1, ''),
('18/09/2023', 'CB-4462', 1, 'init'),
('18/09/2023', 'CB-11071', 1, ''),
('18/09/2023', 'CB-4559', 10, '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockfarmbatches`
--

CREATE TABLE `buwamalivestockfarmbatches` (
  `batchnumber` varchar(10) NOT NULL,
  `date` varchar(15) NOT NULL,
  `animalName` text NOT NULL,
  `numberofanimals` int NOT NULL,
  `unitprice` float NOT NULL,
  `totalspent` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `status` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'active',
  `animalsalive` int NOT NULL,
  `animalsdead` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockfarmbatches`
--

INSERT INTO `buwamalivestockfarmbatches` (`batchnumber`, `date`, `animalName`, `numberofanimals`, `unitprice`, `totalspent`, `notes`, `status`, `animalsalive`, `animalsdead`) VALUES
('CB-11071', '18/09/2023', 'CATTLE', 20, 1200000, 24000000, 'any notes', 'active', 19, 1),
('CB-4462', '04/09/2023', 'CATTLE', 50, 1600000, 80000000, 'Initial Cattle Testing Batch', 'active', 48, 2),
('CB-4559', '04/09/2023', 'RABBITS', 200, 150000, 30000000, 'Initial Rabbit Testing Batch', 'active', 180, 20),
('CB-9031', '04/09/2023', 'GOATS', 70, 350000, 24500000, 'Initial Goats Testing Batch', 'active', 70, 0);

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockfeeds`
--

CREATE TABLE `buwamalivestockfeeds` (
  `productId` int NOT NULL,
  `productName` varchar(100) NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockfeeds`
--

INSERT INTO `buwamalivestockfeeds` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
(1, 'Jubail', 4200, 0),
(2, 'Lime', 500, 0),
(3, 'Soya Beans', 2800, 0),
(4, 'Broken Corn', 1900, 0),
(5, 'Brand', 750, 0),
(6, 'Mukuna Powder', 10000, 0),
(7, 'Mukuna Seeds', 10000, 0),
(8, 'Mixed Feed', 0, 0),
(9, 'buwamatest', 5000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockmanureproductionrecords`
--

CREATE TABLE `buwamalivestockmanureproductionrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `collectiondate` varchar(15) NOT NULL,
  `totalManurecollected` float NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockmanureproductionrecords`
--

INSERT INTO `buwamalivestockmanureproductionrecords` (`batchnumber`, `collectiondate`, `totalManurecollected`, `notes`) VALUES
('CB-4462', '11/09/2023', 5, 'test'),
('CB-4462', '18/09/2023', 5, 'init'),
('CB-11071', '18/09/2023', 50, '');

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockmedicine`
--

CREATE TABLE `buwamalivestockmedicine` (
  `productId` int NOT NULL,
  `productName` varchar(100) NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockmedicine`
--

INSERT INTO `buwamalivestockmedicine` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
(1, 'Ashidox 100g', 8000, 0),
(2, 'chicken bomb 25mls', 0, 0),
(8, 'vaccine of newcastle 10mls', 8500, 0),
(15, 'buwamatest', 4000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `buwamalivestockmilkproductionrecords`
--

CREATE TABLE `buwamalivestockmilkproductionrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `collectiondate` varchar(15) NOT NULL,
  `totalLitrescollected` float NOT NULL,
  `exactlitrescollected` float NOT NULL,
  `totalLitresLost` float NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `buwamalivestockmilkproductionrecords`
--

INSERT INTO `buwamalivestockmilkproductionrecords` (`batchnumber`, `collectiondate`, `totalLitrescollected`, `exactlitrescollected`, `totalLitresLost`, `notes`) VALUES
('CB-4462', '11/09/2023', 10, 9.8, 0.2, 'test'),
('CB-4462', '18/09/2023', 5, 5, 0, 'test 22'),
('CB-11071', '18/09/2023', 20, 19, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `chickenbatchfcrrecords`
--

CREATE TABLE `chickenbatchfcrrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `totalfeedsconsumed` float NOT NULL,
  `totaleggsproduced` float NOT NULL,
  `fcrvalue` float NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `chickenbatchhealth`
--

CREATE TABLE `chickenbatchhealth` (
  `batchnumber` varchar(15) NOT NULL,
  `reason` text NOT NULL,
  `treatmentdate` varchar(15) NOT NULL,
  `nextdateofadministration` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `medicinename` int NOT NULL,
  `medicinequantityused` int NOT NULL,
  `diseasename` text NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `chickenbatchhealth`
--

INSERT INTO `chickenbatchhealth` (`batchnumber`, `reason`, `treatmentdate`, `nextdateofadministration`, `medicinename`, `medicinequantityused`, `diseasename`, `notes`) VALUES
('CB-3206', 'vaccination', '17/07/2023', '2023-08-17', 8, 1, 'Newcastle', 'Vaccinated against newcastle disease'),
('CB-3206', 'treatment', '28/08/2023', NULL, 1, 1, 'Cough', 'powder is mixed with water to form a liquid medicine'),
('CB-3206', 'treatment', '28/08/2023', NULL, 3, 6, 'Cough', '');

-- --------------------------------------------------------

--
-- Table structure for table `chickenbatchmortalities`
--

CREATE TABLE `chickenbatchmortalities` (
  `date` varchar(15) NOT NULL,
  `batchnumber` varchar(15) NOT NULL,
  `numberofchickendead` int NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `chickenbatchmortalities`
--

INSERT INTO `chickenbatchmortalities` (`date`, `batchnumber`, `numberofchickendead`, `notes`) VALUES
('19/08/2023', 'CB-3206', 1, ''),
('9/11/2023', 'CB-3206', 3, 'Two abrapt death and one suspected flu ');

-- --------------------------------------------------------

--
-- Table structure for table `clientprojectorders`
--

CREATE TABLE `clientprojectorders` (
  `orderId` varchar(15) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `contact1` varchar(15) NOT NULL,
  `contact2` varchar(15) DEFAULT NULL,
  `address` text NOT NULL,
  `itemname` varchar(15) NOT NULL,
  `quantity` float NOT NULL,
  `units` varchar(5) NOT NULL,
  `totalprice` float NOT NULL,
  `balance` float NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `clientprojectorders`
--

INSERT INTO `clientprojectorders` (`orderId`, `firstname`, `lastname`, `contact1`, `contact2`, `address`, `itemname`, `quantity`, `units`, `totalprice`, `balance`, `notes`) VALUES
('POE -3028-680', 'Lwasa', 'Reagan', '0775149572', '', 'Ndejje', 'PJ-26', 1, 'Pcs', 500000, 100000, 'xxxx'),
('POE -5687-477', 'Lwasa', 'Peter', '0701303137', '', 'Kira', 'PJ-26', 1, 'Pcs', 500000, 30000, ''),
('POE -7568-817', 'zziwa', 'raymond', '11', '22', 'kira', 'PJ-11', 5, 'Pcs', 1250000, 500000, 'test entry'),
('POE -8109-295', 'Zziwa', 'Raymond', '0701303137', '', 'Kira', 'PJ-26', 1, 'Pcs', 500000, 400000, 'Initial form testing');

-- --------------------------------------------------------

--
-- Table structure for table `clientprojectspayments`
--

CREATE TABLE `clientprojectspayments` (
  `paymentDate` varchar(30) NOT NULL,
  `orderId` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `itemName` text,
  `Quantity` float DEFAULT NULL,
  `Units` varchar(10) DEFAULT NULL,
  `amountPaid` float NOT NULL,
  `paymentmethod` text NOT NULL,
  `transactionId` varchar(20) DEFAULT NULL,
  `chequenumber` varchar(50) DEFAULT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `clientprojectspayments`
--

INSERT INTO `clientprojectspayments` (`paymentDate`, `orderId`, `itemName`, `Quantity`, `Units`, `amountPaid`, `paymentmethod`, `transactionId`, `chequenumber`, `notes`) VALUES
('14/08/2023', 'POE -3028-680', NULL, NULL, NULL, 25000, 'Cash', NULL, NULL, NULL),
('14/08/2023', 'POE -3028-680', NULL, NULL, NULL, 5000, 'Cash', NULL, NULL, 'Initial Test '),
('14/08/2023', 'POE -3028-680', NULL, NULL, NULL, 10000, 'Cash', NULL, NULL, 'Testing Product Payment'),
('14/08/2023', 'POE -3028-680', NULL, NULL, NULL, 10000, 'MTN MoMo', '346556547674363', NULL, 'Test 2'),
('14/08/2023', 'POE -5687-477', NULL, NULL, NULL, 20000, 'Cash', NULL, NULL, 'test'),
('18/10/2023', 'POE -7568-817', NULL, NULL, NULL, 300000, 'Cash', '6457645734567', NULL, ''),
('18/10/2023', 'POE -7568-817', NULL, NULL, NULL, 200000, 'Cash', NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `companycheques`
--

CREATE TABLE `companycheques` (
  `chequeId` varchar(10) NOT NULL,
  `chequeNumber` varchar(20) NOT NULL,
  `DrawerNames` text NOT NULL,
  `DrawerContact` varchar(15) NOT NULL,
  `BankName` text NOT NULL,
  `PaymentReason` text NOT NULL,
  `amount` float NOT NULL,
  `DateIssued` varchar(20) NOT NULL,
  `BankingDate` varchar(15) NOT NULL,
  `ChequeIssuedBy` text NOT NULL,
  `Notes` text,
  `status` varchar(20) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `companycheques`
--

INSERT INTO `companycheques` (`chequeId`, `chequeNumber`, `DrawerNames`, `DrawerContact`, `BankName`, `PaymentReason`, `amount`, `DateIssued`, `BankingDate`, `ChequeIssuedBy`, `Notes`, `status`) VALUES
('C-0021-116', '563', 'MUTAITE SALIM', '0701186242', 'hfb prof bio', 'mucuna', 160000, '9/7/2023', '2023-10-10', 'bridget', '', 'Pending'),
('C-0091-521', '503', 'SSEMPIRA SEMU', '0701186242', 'hfb nyanzi', 'oil', 1390000, '9/23/2023', '2023-10-09', 'bridget', '', 'Pending'),
('C-0131-129', '587', 'PAULINE MULUNGI', '0701186242', 'hfb prof', 'mucuna', 1006000, '08/09/2023', '2024-11-10', 'bridget', '', 'Pending'),
('C-0153-84', '552', 'ROSEMARY NAMAZZ I', '0701186242', 'hfn prof bio', '', 1440000, '9/6/2023', '2024-03-10', 'bridget', '', 'Pending'),
('C-0216-751', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-0268-736', '506', 'ROTA ', '0701186242', 'hfb nyanzi', 'oil', 2000000, '9/23/2023', '2023-09-22', 'bridget', '', 'Pending'),
('C-0533-755', '1810', 'BABIRYE ', '', 'BOA JULIUS', 'OIL', 3650000, '10/21/2023', '2023-11-15', 'bridget', '', 'Pending'),
('C-0560-653', '506', 'SHAKUL SSEBUNYA', '0701186242', 'hfb nyanzi', 'oil', 1394000, '9/23/2023', '2023-09-26', 'bridget', '', 'Pending'),
('C-0660-149', '553', 'JUSTINE ', '0701186242', 'hfn prof bio', '', 2810000, '9/6/2023', '2024-10-10', 'bridget', '', 'Pending'),
('C-0871-797', '264', 'ERINA NABUUSO', '0701186242', 'hfb nyanzi', 'oil', 994000, '9/23/2023', '2023-09-30', 'bridget', '', 'Pending'),
('C-0900-489', '580', 'ADAM MALE', '0701186242', 'hfb prof', 'mucuna', 600000, '08/09/2023', '2024-11-25', 'bridget', '', 'Pending'),
('C-0905-280', '581', 'ELISH LWANGA', '0701186242', 'hfb prof', 'mucuna', 2500000, '08/09/2023', '2025-12-11', 'bridget', '', 'Pending'),
('C-1063-879', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-1118-394', '238', 'VISION ', '0701186242', 'boa prof', 'oil', 3000000, '9/23/2023', '2023-09-26', 'bridget', '', 'Pending'),
('C-1268-871', '516', 'AISHA NALUMAGA', '0701186242', 'hfb nyanzi julius', 'oil', 2640000, '10/6/2023', '2023-10-25', 'bridget', '', 'Pending'),
('C-1329-950', '526', 'NTEGE DANIEL', '0701186242', 'hfb nyanzi julius', 'oil', 1300000, '10/6/2023', '2023-10-12', 'bridget', '', 'Paid'),
('C-1438-878', '589', 'PHILLIP SSEBUUFU', '0701186242', 'hfb prof', 'mucuna', 1740000, '08/09/2023', '2025-04-25', 'bridget', '', 'Pending'),
('C-1480-441', '591', 'ROBERT SSEBULIBA', '0701186242', 'hfb prof', 'mucuna', 610000, '08/09/2023', '2025-11-25', 'bridget', '', 'Pending'),
('C-1531-0', '571', 'ANNE NYANDOI', '0701186242', 'hfb prof', 'mucuna', 3300000, '08/09/2023', '2025-05-10', 'bridget', '', 'Pending'),
('C-1559-729', '316', 'MOSES ', '', 'HFB PROFBIO', '', 200000, '9/14/2023', '2023-09-15', 'bridget', '', 'Pending'),
('C-1559-965', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-1564-971', '003', 'NEW VISION', '0701186242', 'hfb nyanzi', 'july adverts', 5000000, '8/28/2023', '2023-10-21', 'bridget', '', 'Pending'),
('C-1591-713', '310', 'KIMBOWA MARGRET', '', 'HFB PROFBIO', '', 140000, '9/14/2023', '2023-12-20', 'bridget', '', 'Pending'),
('C-1611-781', '581', 'ELISH LWANGA', '0701186242', 'hfb prof', 'mucuna', 600000, '08/09/2023', '2024-11-25', 'bridget', '', 'Pending'),
('C-1705-308', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-1744-113', '562', 'AYA ', '0701186242', 'hfb prof bio', 'mucuna', 1900000, '9/7/2023', '2025-02-01', 'bridget', '', 'Pending'),
('C-1768-726', '', 'TEDDY ', '0701186242', 'hfb prof bio', 'mucuna', 1740000, '9/7/2023', '2025-04-23', 'bridget', '', 'Pending'),
('C-1773-93', '573', 'JACKSON MULINDA', '0701186242', 'hfb prof', 'mucuna', 1520000, '08/09/2023', '2024-12-11', 'bridget', '', 'Pending'),
('C-1795-175', '1770', 'SHALOM ', '0701186242', 'equity prof', 'oil', 3000000, '9/23/2023', '2023-11-30', 'bridget', '', 'Pending'),
('C-1974-141', '1814', 'NTV ', '', 'PROF EQUITY', 'OIL', 1600000, '10/21/2023', '2023-10-18', 'bridget', '', 'Pending'),
('C-1983-739', '308', 'NSUBUGA SSALI', '', 'HFB PROFBIO', '', 1150000, '9/14/2023', '2024-03-15', 'bridget', '', 'Pending'),
('C-2066-251', '1764', 'RICHARD SSEGUYA', '0701186242', 'equity prof', 'oil', 1170000, '9/23/2023', '2023-09-20', 'bridget', '', 'Pending'),
('C-2148-818', '590', 'RONALD WAGUMA', '0701186242', 'hfb prof', 'mucuna', 290000, '08/09/2023', '2024-03-15', 'bridget', '', 'Pending'),
('C-2233-600', '1804', 'MASABA WILFRED', '', 'BOA PROF', 'OIL', 2000000, '10/21/2023', '2023-10-12', 'bridget', '', 'Pending'),
('C-2251-234', '1809', 'UBC ', '', 'EQUITY PROF', 'OIL', 3000000, '10/21/2023', '2023-11-30', 'bridget', '', 'Pending'),
('C-2283-29', '324', 'GREGORY ', '0701186242', 'HFB PROFBIO', '', 275000, '9/14/2023', '2023-12-26', 'bridget', '', 'Pending'),
('C-2316-73', '239', 'VISION ', '0701186242', 'boa prof', 'oil', 3000000, '9/23/2023', '2023-10-03', 'bridget', '', 'Pending'),
('C-2319-476', '496', 'BAKER MUTUMBA', '0701186242', 'hfb nyanzi', 'oil', 1700000, '9/23/2023', '2023-09-10', 'bridget', '', 'Pending'),
('C-2375-832', '505', 'HASSAN MULINDWA', '0701186242', 'hfb nyanzi', 'oil', 2100000, '9/23/2023', '2023-10-20', 'bridget', '', 'Pending'),
('C-2435-374', '564', 'CATHLYN BAGUMA', '0701186242', 'hfb prof bio', 'mucuna', 400000, '9/7/2023', '2024-05-30', 'bridget', '', 'Pending'),
('C-2666-687', '578', 'MARIAM NAMPIJJA', '0701186242', 'hfb prof', 'mucuna', 3000000, '08/09/2023', '2024-09-15', 'bridget', '', 'Pending'),
('C-2756-475', '1804', 'ATUHE ', '', 'EQUITY PROF', 'OIL', 1220000, '10/21/2023', '2023-11-10', 'bridget', '', 'Pending'),
('C-2877-450', '512', 'DENIS MULAGWE', '0701186242', 'hfb nyanzi', 'oil', 920000, '9/23/2023', '2023-09-30', 'bridget', '', 'Pending'),
('C-2972-605', '579', 'ALI KAWESA', '0701186242', 'hfb prof', 'mucuna', 70000, '08/09/2023', '2024-11-27', 'bridget', '', 'Pending'),
('C-2985-972', '1771', 'SHALOM ', '0701186242', 'equity prof', 'oil', 3050000, '9/23/2023', '2023-10-21', 'bridget', '', 'Pending'),
('C-3005-628', '313', 'MOHOMED HAJIRAH', '', 'HFB PROFBIO', '', 1000000, '9/14/2023', '2024-03-15', 'bridget', '', 'Pending'),
('C-3094-125', '499', 'SAMAKA ', '0701186242', 'hfb nyanzi', 'oil', 4790000, '9/23/2023', '2023-10-31', 'bridget', '', 'Pending'),
('C-3298-125', '588', 'NDAGIRE ', '0701186242', 'hfb prof', 'mucuna', 2815000, '08/09/2023', '2025-08-26', 'bridget', '', 'Pending'),
('C-3307-523', '309', 'DICKSON ', '', 'HFB PROFBIO', '', 5800000, '9/14/2023', '2024-07-20', 'bridget', '', 'Pending'),
('C-3336-2', '490', 'AGRO ECO', '0701186242', 'hfb nyanzi julius', '', 3565000, '9/6/2023', '2023-10-26', 'bridget', '', 'Pending'),
('C-3353-332', '311', 'NAMUKASA HAJIRAH', '', 'HFB PROFBIO', '', 1000000, '9/14/2023', '2024-01-25', 'bridget', '', 'Pending'),
('C-3505-947', '539', 'MWANJE ', '', 'HFB PROF BIO', 'OIL', 820000, '10/21/2023', '2023-12-15', 'bridget', '', 'Pending'),
('C-3554-194', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-3601-386', '715', 'CRANE NALUN GA', '', 'BOA', '3568000', 0, '10/21/2023', '2023-10-31', 'bridget', '', 'Pending'),
('C-3644-649', '462', 'INNOCENT NUWALINDA', '0701186242', 'hfb nyanzi', 'oil', 1840000, '9/23/2023', '2023-09-13', 'bridget', '', 'Pending'),
('C-3763-665', '001', 'NEW VISION', '0701186242', 'hfb nyanzi', 'july adverts', 4000000, '8/28/2023', '2023-10-07', 'bridget', '', 'Pending'),
('C-3791-858', '559', 'ASUMAN SEBALAMU', '0701186242', 'hfb prof bio', 'mucuna', 1000000, '9/7/2023', '2025-02-01', 'bridget', '', 'Pending'),
('C-3823-669', '323', 'DRAMEH ', '0701186242', 'HFB PROFBIO', '', 150000, '9/14/2023', '2023-10-26', 'bridget', '', 'Pending'),
('C-3942-447', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-3950-693', '240', 'VISION ', '0701186242', 'boa prof', 'oil', 5000000, '9/23/2023', '2023-10-10', 'bridget', '', 'Pending'),
('C-3973-751', '578', 'MARIAM NAMPIJJA', '0701186242', 'hfb prof', 'mucuna', 3000000, '08/09/2023', '2024-09-15', 'bridget', '', 'Pending'),
('C-4032-772', '555', 'BRIAN RWAKANUMA', '0701186242', 'hfn prof bio', '', 250000, '9/6/2023', '2024-10-10', 'bridget', '', 'Pending'),
('C-4088-557', '497', 'SAMAKA ', '0701186242', 'hfb nyanzi', 'oil', 4000000, '9/23/2023', '2023-10-15', 'bridget', '', 'Pending'),
('C-4180-399', '1811', 'LWENGO ', '', 'PROF EQUITY', 'OIL', 3000000, '10/21/2023', '2023-11-22', 'bridget', '', 'Pending'),
('C-4268-66', '495', 'RACHAEL NAMPIJJA', '0701186242', 'hfb nyanzi', 'oil', 630000, '9/23/2023', '2023-09-06', 'bridget', '', 'Pending'),
('C-4351-845', '239', 'VISION ', '0701186242', 'boa prof', 'oil', 3000000, '9/23/2023', '2023-10-03', 'bridget', '', 'Pending'),
('C-4380-540', '570', 'PHIONA NAKASINGA', '0701186242', 'hfb prof', 'mucuna', 1000000, '08/09/2023', '2024-11-10', 'bridget', '', 'Pending'),
('C-4455-863', '1815', 'NTV ', '', 'PROF EQUITY', 'OIL', 1600000, '10/21/2023', '2023-10-18', 'bridget', '', 'Pending'),
('C-4511-429', '306', 'MATUA ', '0701186242', '', 'OIL', 3400000, '9/14/2023', '2024-03-10', 'bridget', '', 'Pending'),
('C-4542-404', '002', 'NEW VISION', '0701186242', 'hfb nyanzi', 'july adverts', 4000000, '8/28/2023', '2023-10-14', 'bridget', '', 'Pending'),
('C-4562-39', '322', 'JEREMIAH ', '0701186242', 'HFB PROFBIO', '', 400000, '9/14/2023', '2023-11-15', 'bridget', '', 'Pending'),
('C-4578-739', '565', 'MUHAMADI LUTWAMA', '0701186242', 'hfb prof bio', 'mucuna', 2800000, '9/7/2023', '2025-05-25', 'bridget', '', 'Pending'),
('C-4716-578', '465', 'MICHAEL KISENYI', '0701186242', 'hfb nyanzi', 'oil', 2000000, '9/23/2023', '2023-09-28', 'bridget', '', 'Pending'),
('C-4791-383', '1809', 'UBC ', '', 'EQUITY PROF', 'OIL', 3000000, '10/21/2023', '2023-11-30', 'bridget', '', 'Pending'),
('C-4867-798', '318', 'BEBINA ', '0701186242', 'HFB PROFBIO', '', 1320000, '9/14/2023', '2024-05-25', 'bridget', '', 'Pending'),
('C-4927-917', '707', 'LYDIA ', '', 'BOA JULIUS', 'OIL', 1235000, '10/21/2023', '2023-11-10', 'bridget', '', 'Pending'),
('C-4935-42', '715', 'CRANE ', '0701186242', 'hfb nyanzi julius', 'oil', 2500000, '10/6/2023', '2023-10-31', 'bridget', '', 'Pending'),
('C-4984-600', '499', 'SAPHILU KINTU', '0701186242', 'hfb nyanzi', 'oil', 700000, '9/23/2023', '2023-09-09', 'bridget', '', 'Pending'),
('C-5096-532', '576', 'EVA NANYANGE', '0701186242', 'hfb prof', 'mucuna', 1790000, '08/09/2023', '2025-07-26', 'bridget', '', 'Pending'),
('C-5096-840', '536', 'IBRAHIM ', '', 'HFB PROF', 'OIL', 2200000, '10/21/2023', '2023-10-26', 'bridget', '', 'Pending'),
('C-5154-722', '567', 'NATHAN KIBIIKE', '0701186242', 'hfb prof bio', 'mucuna', 180000, '9/7/2023', '2024-01-01', 'bridget', '', 'Pending'),
('C-5262-207', '1810', 'UBC ', '', 'EQUITY PROF', 'OIL', 4000000, '10/21/2023', '2023-12-31', 'bridget', '', 'Pending'),
('C-5267-161', '315', 'ZIPORAH ', '', 'HFB PROFBIO', '', 1000000, '9/14/2023', '2024-04-26', 'bridget', '', 'Pending'),
('C-5361-864', '572', 'WILLIAM KASOZI', '0701186242', 'hfb prof', 'mucuna', 1520000, '08/09/2023', '2025-06-25', 'bridget', '', 'Pending'),
('C-5371-10', '320', 'DAMAS ', '0701186242', 'HFB PROFBIO', '', 1800000, '9/14/2023', '2023-09-15', 'bridget', '', 'Pending'),
('C-5385-697', '517', 'MUKIIBI FAHAD', '0701186242', 'hfb nyanzi julius', 'oil', 3568000, '10/6/2023', '2023-11-16', 'bridget', '', 'Pending'),
('C-5399-74', '506', 'MICHAEL KAJJUMBI', '0701186242', 'hfb nyanzi', 'oil', 3000000, '9/23/2023', '2023-11-30', 'bridget', '', 'Pending'),
('C-5415-64', '584', 'KATO SERWANGA', '0701186242', 'hfb prof', 'mucuna', 300000, '08/09/2023', '2024-05-26', 'bridget', '', 'Pending'),
('C-5433-432', '311', 'KANDOLE MATHIAS', '', 'HFB PROFBIO', '', 1390000, '9/14/2023', '2024-06-20', 'bridget', '', 'Pending'),
('C-5442-796', '506', 'SHAKUL SSEBUNYA', '0701186242', 'hfb nyanzi', 'oil', 1394000, '9/23/2023', '2023-09-26', 'bridget', '', 'Pending'),
('C-5455-711', '1944', 'FAHAD MUKIIBI', '0701186242', 'equity prof bio', 'oil', 2100000, '9/23/2023', '2023-10-20', 'bridget', '', 'Pending'),
('C-5494-766', '577', 'SIMEON KASUMBA', '0701186242', 'hfb prof', 'mucuna', 230000, '08/09/2023', '2024-03-25', 'bridget', '', 'Pending'),
('C-5538-985', '715', 'FAHAD MUKIIBI', '', 'BOA', '3568000', 0, '10/21/2023', '2023-10-31', 'bridget', '', 'Pending'),
('C-5595-470', '492', 'DAVID MAWADA', '0701186242', 'hfb nyanzi julius', '', 1000000, '9/6/2023', '2023-09-09', 'bridget', '', 'Pending'),
('C-5597-370', '1810', 'UBC ', '', 'EQUITY PROF', 'OIL', 3000000, '10/21/2023', '2023-12-31', 'bridget', '', 'Pending'),
('C-5682-403', '237', 'DANIEL ONGOM', '0701186242', 'prof bio boa', '', 1200000, '8/28/2023', '2023-09-06', 'bridget', '', 'Paid'),
('C-5709-903', '489', 'ROBERT SSEBULIBA', '0', 'hfb nyanzi julius', '', 1200000, '9/6/2023', '2023-10-17', 'bridget', '', 'Pending'),
('C-5787-234', '556', 'KAGOYA ', '0701186242', 'hfn prof bio', '', 2850000, '9/6/2023', '2024-05-25', 'bridget', '', 'Pending'),
('C-5840-425', '594', 'ROSE ', '0701186242', 'hfb prof', 'mucuna', 210000, '08/09/2023', '2024-02-20', 'bridget', '', 'Pending'),
('C-6016-404', '461', 'FREDIE BASSU MUKASA', '0701186242', 'hfb nyanzi julius', '', 1000000, '9/6/2023', '2023-09-09', 'bridget', '', 'Pending'),
('C-6094-971', '463', 'ROSELYN APIO', '0701186242', 'hfb nyanzi', 'oil', 1900000, '9/23/2023', '2023-09-13', 'bridget', '', 'Pending'),
('C-6102-287', '1769', 'SHALOM ', '0701186242', 'equity prof', 'oil', 4000000, '9/23/2023', '2023-10-14', 'bridget', '', 'Pending'),
('C-6113-491', '713', 'NEW VISION', '0701186242', 'bank of africa nyanzi julius', 'adverts', 5000000, '10/6/2023', '2023-11-15', 'bridget', '', 'Pending'),
('C-6119-20', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-6173-949', '493', 'TWAHA MUWONGE', '0701186242', 'hfb nyanzi julius', '', 1000000, '9/6/2023', '2023-10-25', 'bridget', '', 'Pending'),
('C-6208-316', '528', 'MAGUMBA SHABAN', '', 'HFB NYANZI', '70000', 0, '10/21/2023', '2023-10-31', 'bridget', '', 'Pending'),
('C-6218-132', '566', 'FLAVIA ', '0701186242', 'hfb prof bio', 'mucuna', 320000, '9/7/2023', '2024-11-25', 'bridget', '', 'Pending'),
('C-6219-829', '494', 'RITAH NAMPEREZA', '0701186242', 'hfb nyanzi julius', '', 800000, '9/6/2023', '2023-10-17', 'bridget', '', 'Pending'),
('C-6243-781', '554', 'MIBULO ', '0701186242', 'hfn prof bio', '', 1750000, '9/6/2023', '2024-10-10', 'bridget', '', 'Pending'),
('C-6344-40', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-6355-936', '719', 'DAVID ', '', 'BOA JULIUS', 'OIL', 1590000, '10/21/2023', '2023-12-15', 'bridget', '', 'Pending'),
('C-6422-196', '580', 'CONSTANCE ', '0701186242', 'hfb prof', 'mucuna', 490000, '08/09/2023', '2024-11-25', 'bridget', '', 'Pending'),
('C-6425-160', '465', 'MICHAEL KISENYI', '0701186242', 'hfb nyanzi', 'oil', 2000000, '9/23/2023', '2023-09-28', 'bridget', '', 'Pending'),
('C-6426-402', '495', 'RACHEAL NAMPIJJA', '0701186242', 'hfn nyanzi julius', '', 630000, '9/6/2023', '2023-09-06', 'bridget', '', 'Pending'),
('C-6449-392', '583', 'TALINYO ', '0701186242', 'hfb prof', 'mucuna', 1890000, '08/09/2023', '2025-07-20', 'bridget', '', 'Pending'),
('C-6469-377', '004', 'NGOOBI HARMIS', '0701186242', 'hfb nyanzi', 'sunflower', 760000, '8/28/2023', '2023-12-15', 'bridget', '', 'Pending'),
('C-6571-18', '246', 'WILLIAM GEORGE', '', 'BOA PROF', 'OIL', 1300000, '10/21/2023', '2024-03-25', 'bridget', '', 'Pending'),
('C-6626-899', '321', 'DAMAS ', '0701186242', 'HFB PROFBIO', '', 1200000, '9/14/2023', '2023-09-29', 'bridget', '', 'Pending'),
('C-6661-166', '317', 'MAK JO ENTERPRIZES ', '', 'HFB PROFBIO', '', 1000000, '9/14/2023', '2024-03-26', 'bridget', '', 'Pending'),
('C-6665-144', '715', 'CRANE ', '0701186242', 'hfb nyanzi julius', 'oil', 2500000, '10/6/2023', '2023-10-31', 'bridget', '', 'Pending'),
('C-6868-528', '586', 'ROSCO SIMBWA', '0701186242', 'hfb prof', 'mucuna', 1780000, '08/09/2023', '2024-12-25', 'bridget', '', 'Pending'),
('C-6938-578', '1766', 'GEORGE SSEBALU', '0701186242', 'equity prof', 'oil', 1420000, '9/23/2023', '2023-10-14', 'bridget', '', 'Pending'),
('C-7057-162', '1818', 'KIM ', '', 'PROF EQUITY', 'OIL', 100000, '10/21/2023', '2023-10-21', 'bridget', '', 'Pending'),
('C-7158-142', '506', 'MICHAEL KAJJUMBI', '0701186242', 'hfb nyanzi', 'oil', 3800000, '9/23/2023', '2023-11-30', 'bridget', '', 'Pending'),
('C-7161-696', '1795', ' SEBUNYA', '', 'EQUITY PROF', 'OIL', 4000000, '10/21/2023', '2023-11-17', 'bridget', '', 'Pending'),
('C-7281-459', '462', 'INNOCENT NUWALINDA', '0701186242', 'hfn nyanzi julius', '', 1840000, '9/6/2023', '2023-09-13', 'bridget', '', 'Pending'),
('C-7283-467', '528', 'MAGUMBA SHABAN', '0701186242', 'hfb nyanzi julius', 'oil', 700000, '10/6/2023', '2023-10-11', 'bridget', '', 'Pending'),
('C-7338-701', '585', 'HASSAN LUKWANDWA', '0701186242', 'hfb prof', 'mucuna', 1830000, '08/09/2023', '2024-11-20', 'bridget', '', 'Pending'),
('C-7367-234', '573', 'JACKSON MULINDA', '0701186242', 'hfb prof', 'mucuna', 828000, '08/09/2023', '2024-12-11', 'bridget', '', 'Pending'),
('C-7411-734', '007', 'ERIC ', '0701186242', 'hfb nyanzi', 'oil payment', 500000, '8/28/2023', '2023-10-01', 'bridget', '', 'Pending'),
('C-7634-399', '504', 'RUTH BBALE', '0701186242', 'hfb nyanzi', 'oil', 1600000, '9/23/2023', '2023-09-16', 'bridget', '', 'Pending'),
('C-7724-894', '497', 'SAMAKA ', '0701186242', 'hfb nyanzi', 'oil', 4000000, '9/23/2023', '2023-10-15', 'bridget', '', 'Pending'),
('C-7730-448', '006', 'NAMUFUMA ', '0701186242', 'hfb nyanzi', 'bounced cheque', 1000000, '8/28/2023', '2023-09-02', 'bridget', '', 'Pending'),
('C-7920-802', '593', 'HAJARAH NALWOGA', '0701186242', 'hfb prof', 'mucuna', 280000, '08/09/2023', '2024-01-25', 'bridget', '', 'Pending'),
('C-8207-458', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-8375-626', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending'),
('C-8438-672', '516', 'SEBALU GEORGE', '0701186242', 'boa nyanzi julius', 'oil', 1110000, '10/6/2023', '2023-11-04', 'bridget', '', 'Pending'),
('C-8537-951', '575', 'FLAVIA NAKAYEMBA', '0701186242', 'hfb prof', 'mucuna', 610000, '08/09/2023', '2024-12-25', 'bridget', '', 'Pending'),
('C-8557-794', '325', 'HAFSWA ', '0701186242', 'HFB PROFBIO', '', 1000000, '9/14/2023', '2023-12-30', 'bridget', '', 'Pending'),
('C-8681-876', '151', 'DAN MUYINGO', '', 'PROF HFB', 'OIL', 1600000, '10/21/2023', '2025-02-20', 'bridget', '', 'Pending'),
('C-8809-135', '318', 'RASHID ', 'SSEKANDI', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-11-11', 'bridget', '', 'Pending'),
('C-8856-604', '1794', 'MAGUMBA SEBUNYA', '', 'HFB NYANZI', '2600000', 2600000, '10/21/2023', '2023-10-26', 'bridget', '', 'Pending'),
('C-8983-1', '568', 'ROBINA ', '0701186242', 'hfb prof bio', 'mucuna', 240000, '9/7/2023', '2024-03-10', 'bridget', '', 'Pending'),
('C-9009-203', '574', 'DAVID KIZZA', '0701186242', 'hfb prof', 'mucuna', 790000, '08/09/2023', '2023-10-21', 'bridget', '', 'Pending'),
('C-9043-273', '528', 'MAGUMBA SHABAN', '0701186242', 'hfb nyanzi julius', 'oil', 700000, '10/6/2023', '2023-10-11', 'bridget', '', 'Pending'),
('C-9103-355', '459', 'KIWANUKA SAMUEL', '0701186242', 'hfb nyanzi', 'oil payment', 600000, '8/28/2023', '2023-09-02', 'bridget', '', 'Pending'),
('C-9175-705', '714', 'SEMUSU ', '0701186242', 'boa nyanzi julius', 'oil', 2000000, '10/6/2023', '2023-11-04', 'bridget', '', 'Pending'),
('C-9192-190', '152', 'HINDU ', '', 'PROF HFB', 'OIL', 2840000, '10/21/2023', '2023-10-20', 'bridget', '', 'Pending'),
('C-9195-321', '551', 'MARK BOGERE', '0701186242', 'hfn prof bio', '', 800000, '9/6/2023', '2024-10-10', 'bridget', '', 'Pending'),
('C-9289-765', '008', 'SSEBALAMU ', '0701186242', 'hfb nyanzi', '', 500000, '8/28/2023', '2023-09-30', 'bridget', '', 'Pending'),
('C-9417-714', '527', 'AISHA NALUN GA', '', 'HFB NYANZI', '2640000', 0, '10/21/2023', '2023-10-25', 'bridget', '', 'Pending'),
('C-9452-225', '005', 'MANGET FRANCO', '0701186242', 'hfb nyanzi', 'oil payment', 1100000, '8/28/2023', '2023-08-29', 'bridget', '', 'Pending'),
('C-9505-216', '712', 'NEW VISION', '0701186242', 'bank of africa nyanzi julius', 'adverts', 3000000, '10/6/2023', '2023-10-19', 'bridget', '', 'Pending'),
('C-9556-148', '506', 'CHARLES SSEBUNYA', '0701186242', 'hfb nyanzi', 'oil', 4115000, '9/23/2023', '2023-09-14', 'bridget', '', 'Pending'),
('C-9559-338', '463', 'ROSELYN APIO', '0701186242', 'hfn nyanzi julius', '', 1900000, '9/6/2023', '2023-09-13', 'bridget', '', 'Pending'),
('C-9843-854', '578', 'MARIAM NAMPIJJA', '0701186242', 'hfb prof', 'mucuna', 3000000, '08/09/2023', '2024-09-15', 'bridget', '', 'Pending'),
('C-9926-313', '506', 'SHAKUL SSEBUNYA', '0701186242', 'hfb nyanzi', 'oil', 1394000, '9/23/2023', '2023-09-26', 'bridget', '', 'Pending'),
('C-9929-828', '326', 'IAN ', '0701186242', 'HFB PROFBIO', '', 500000, '9/14/2023', '2023-12-05', 'bridget', '', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `branch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `department` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`branch`, `department`) VALUES
('masanafu', 'production'),
('masanafu', 'projects'),
('masanafu', 'shop'),
('namungoona', 'inventory');

-- --------------------------------------------------------

--
-- Table structure for table `eggproductionrecords`
--

CREATE TABLE `eggproductionrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `collectiondate` varchar(15) NOT NULL,
  `totaleggscollected` float NOT NULL,
  `totalgoodeggscollected` float NOT NULL,
  `totaldamagedeggscollected` float NOT NULL,
  `totaleggtrays` float NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `eggproductionrecords`
--

INSERT INTO `eggproductionrecords` (`batchnumber`, `collectiondate`, `totaleggscollected`, `totalgoodeggscollected`, `totaldamagedeggscollected`, `totaleggtrays`, `notes`) VALUES
('CB-3206', '28/08/2023', 685, 663, 22, 22.1, 'Couldnot go in date by date recording all eggs collected as its time consuming hence we got the sum of all eggs collected and damaged from the month of July. The managers will record on a daily when they start using the system.'),
('CB-3206', '28/08/2023', 1380, 1357, 23, 45.2, 'Total collected in August. The managers will record on a daily when they start using the system.'),
('CB-3206', '11/9/2023', 2104, 2051, 53, 68.4, '');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialcustodianreleasedinventory`
--

CREATE TABLE `equatorialcustodianreleasedinventory` (
  `releaseId` int NOT NULL,
  `releasedate` varchar(30) NOT NULL,
  `itemreleasedId` int NOT NULL,
  `quantityreleased` float NOT NULL,
  `units` varchar(15) NOT NULL,
  `departmentreleasedto` text NOT NULL,
  `recievedby` text NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialexpensesreceipts`
--

CREATE TABLE `equatorialexpensesreceipts` (
  `expenditureid` int NOT NULL,
  `receiptimage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialgeneralstoreinventory`
--

CREATE TABLE `equatorialgeneralstoreinventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialgeneralstorerestockrecords`
--

CREATE TABLE `equatorialgeneralstorerestockrecords` (
  `date` varchar(20) NOT NULL,
  `deliverynotenumber` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatoriallabellingdailyoutput`
--

CREATE TABLE `equatoriallabellingdailyoutput` (
  `id` int NOT NULL,
  `date` varchar(50) NOT NULL,
  `itemid` int NOT NULL,
  `quantity` float NOT NULL,
  `units` text NOT NULL,
  `recordedby` text NOT NULL,
  `notes` text NOT NULL,
  `deliverynotenumber` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatoriallabellingdailyoutput`
--

INSERT INTO `equatoriallabellingdailyoutput` (`id`, `date`, `itemid`, `quantity`, `units`, `recordedby`, `notes`, `deliverynotenumber`) VALUES
(1, '20/10/2023', 77, 26, 'Pcs', 'cholthon', '', '499'),
(2, '20/10/2023', 1031, 95, 'Pcs', 'cholthon', '', '499'),
(3, '20/10/2023', 28, 11, 'Pcs', 'cholthon', '', '499'),
(4, '20/10/2023', 121, 23, 'Pcs', 'cholthon', '', '499'),
(5, '20/10/2023', 78, 38, 'Pcs', 'cholthon', '', '499'),
(6, '20/10/2023', 153, 25, 'Pcs', 'cholthon', '', '256'),
(7, '20/10/2023', 49, 28, 'Pcs', 'cholthon', '', '258'),
(8, '20/10/2023', 40, 50, 'Pcs', 'cholthon', '', '490'),
(9, '20/10/2023', 92, 77, 'Pcs', 'cholthon', '', '490'),
(10, '20/10/2023', 28, 11, 'Pcs', 'cholthon', '', '499'),
(11, '20/10/2023', 138, 19, 'Pcs', 'cholthon', '', '499'),
(12, '20/10/2023', 24, 50, 'Pcs', 'cholthon', '', '262'),
(13, '20/10/2023', 46, 70, 'Pcs', 'cholthon', '', '258'),
(14, '20/10/2023', 54, 50, 'Pcs', 'cholthon', '', '490'),
(15, '20/10/2023', 72, 20, 'Pcs', 'cholthon', '', '256'),
(16, '20/10/2023', 103, 11, 'Pcs', 'cholthon', '', '256'),
(17, '20/10/2023', 1075, 43, 'Pcs', 'cholthon', '', '255'),
(18, '20/10/2023', 1068, 35, 'Pcs', 'cholthon', '', '255'),
(19, '20/10/2023', 91, 23, 'Pcs', 'cholthon', '', '256'),
(20, '20/10/2023', 7013, 12, '', 'cholthon', '', '255'),
(21, '23/10/2023', 67, 11, 'Pcs', 'cholthon', 'Labelled on 21st October ', '263'),
(22, '23/10/2023', 66, 26, 'Pcs', 'cholthon', 'Labelled on 21st October ', '263'),
(23, '23/10/2023', 72, 4, 'Pcs', 'cholthon', 'Labelled on 21st October ', '263'),
(24, '23/10/2023', 107, 50, 'Pcs', 'cholthon', 'Labelled on 21st October ', '263'),
(25, '23/10/2023', 142, 42, 'Pcs', 'cholthon', 'Labelled on 21st October ', '263'),
(26, '23/10/2023', 1043, 16, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(27, '23/10/2023', 7017, 28, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(28, '23/10/2023', 137, 56, 'Pcs', 'cholthon', 'Labelled on 22nd October ', '551'),
(29, '23/10/2023', 126, 8, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(30, '23/10/2023', 125, 9, 'Pcs', 'cholthon', 'Labelled on 20th October ', '500'),
(31, '23/10/2023', 80, 44, 'Pcs', 'cholthon', '', '500'),
(32, '23/10/2023', 96, 11, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(33, '23/10/2023', 96, 11, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(34, '23/10/2023', 102, 18, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(35, '23/10/2023', 46, 4, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(36, '23/10/2023', 85, 14, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(37, '23/10/2023', 115, 11, 'Pcs', 'cholthon', 'Labelled on 22nd October ', '500'),
(38, '23/10/2023', 7013, 6, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(39, '23/10/2023', 76, 25, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(40, '23/10/2023', 79, 64, 'Pcs', 'cholthon', 'Labelled on 22nd October ', '500'),
(41, '23/10/2023', 28, 30, 'Pcs', 'cholthon', 'Labelled on 21st October ', '500'),
(42, '24/10/2023', 31, 47, 'Pcs', 'cholthon', '', '265'),
(43, '24/10/2023', 35, 18, 'Pcs', 'cholthon', '', '265'),
(44, '24/10/2023', 77, 47, 'Pcs', 'cholthon', '', '552'),
(45, '24/10/2023', 116, 43, 'Pcs', 'cholthon', '', '265'),
(46, '24/10/2023', 90, 55, 'Pcs', 'cholthon', '', '265'),
(47, '24/10/2023', 82, 55, 'Pcs', 'cholthon', '', '552'),
(48, '27/10/2023', 62, 20, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(49, '27/10/2023', 100, 10, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(50, '27/10/2023', 42, 12, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(51, '27/10/2023', 66, 14, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(52, '27/10/2023', 66, 2, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '271'),
(53, '27/10/2023', 142, 9, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '271'),
(54, '27/10/2023', 24, 30, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '271'),
(55, '27/10/2023', 7013, 10, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(56, '27/10/2023', 1077, 19, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(57, '27/10/2023', 115, 46, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '270'),
(58, '27/10/2023', 33, 12, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '557'),
(59, '27/10/2023', 80, 23, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '557'),
(60, '27/10/2023', 113, 82, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '264'),
(61, '27/10/2023', 114, 98, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '264'),
(62, '27/10/2023', 140, 20, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '267'),
(63, '27/10/2023', 147, 24, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '267'),
(64, '27/10/2023', 146, 50, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '556'),
(65, '27/10/2023', 51, 31, 'Pcs', 'cholthon', 'Labelled on 26 October 2023', '267'),
(66, '27/10/2023', 142, 14, 'Pcs', 'cholthon', '', '271'),
(67, '27/10/2023', 7013, 13, 'Pcs', 'cholthon', '', '270'),
(68, '27/10/2023', 37, 49, 'Pcs', 'cholthon', '', '267'),
(69, '27/10/2023', 74, 40, 'Pcs', 'cholthon', '', '267'),
(70, '27/10/2023', 24, 25, 'Pcs', 'cholthon', '', '271'),
(71, '27/10/2023', 112, 38, 'Pcs', 'cholthon', '', '270'),
(72, '27/10/2023', 141, 12, 'Pcs', 'cholthon', '', '558'),
(73, '27/10/2023', 43, 31, 'Pcs', 'cholthon', '', '267'),
(74, '27/10/2023', 119, 11, 'Pcs', 'cholthon', '', '270'),
(75, '27/10/2023', 146, 63, 'Pcs', 'cholthon', '', '557'),
(76, '27/10/2023', 50, 47, 'Pcs', 'cholthon', '', '558'),
(77, '27/10/2023', 122, 36, 'Pcs', 'cholthon', '', '271'),
(78, '27/10/2023', 1061, 16, 'Pcs', 'cholthon', '', '267'),
(79, '27/10/2023', 138, 3, 'Pcs', 'cholthon', '', '267');

-- --------------------------------------------------------

--
-- Table structure for table `equatoriallabellinginventory`
--

CREATE TABLE `equatoriallabellinginventory` (
  `itemid` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatoriallabellinginventory`
--

INSERT INTO `equatoriallabellinginventory` (`itemid`, `quantityinstock`, `munits`) VALUES
(115, 0, 'Pcs'),
(62, 0, 'Pcs'),
(112, 38, 'Pcs'),
(100, 50, 'Pcs'),
(42, 0, 'Pcs'),
(66, 41, 'Pcs'),
(1077, 0, 'Pcs'),
(7013, 0, 'Pcs'),
(119, 11, 'Pcs'),
(146, 228, 'Pcs'),
(80, 0, 'Pcs'),
(33, 6, 'Pcs'),
(137, 35, 'Pcs'),
(1028, 24, 'Pcs'),
(43, 31, 'Pcs'),
(37, 53, 'Pcs'),
(51, 0, 'Pcs'),
(74, 40, 'Pcs'),
(140, 0, 'Pcs'),
(147, 0, 'Pcs'),
(142, 11, 'Pcs'),
(138, 3, 'Pcs'),
(1061, 16, 'Pcs'),
(7014, 0, 'Pcs'),
(24, 25, 'Pcs'),
(122, 36, 'Pcs'),
(65, 0, 'Pcs'),
(141, 52, 'Pcs'),
(7017, 30, 'Pcs'),
(50, 47, 'Pcs'),
(67, 28, 'Pcs'),
(107, 30, 'Pcs'),
(105, 8, 'Pcs'),
(104, 8, 'Pcs'),
(1043, 40, 'Pcs');

-- --------------------------------------------------------

--
-- Table structure for table `equatoriallabellinginventoryrecords`
--

CREATE TABLE `equatoriallabellinginventoryrecords` (
  `restockId` varchar(25) NOT NULL,
  `date` varchar(30) NOT NULL,
  `itemId` int NOT NULL,
  `quantity` float NOT NULL,
  `units` varchar(10) NOT NULL,
  `restocksource` text NOT NULL,
  `externalsourcedetails` text,
  `companybranch` text,
  `deliveredby` text NOT NULL,
  `notes` text,
  `deliverynotenumber` varchar(25) NOT NULL,
  `deliverynoteimage` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatoriallabellinginventoryrecords`
--

INSERT INTO `equatoriallabellinginventoryrecords` (`restockId`, `date`, `itemId`, `quantity`, `units`, `restocksource`, `externalsourcedetails`, `companybranch`, `deliveredby`, `notes`, `deliverynotenumber`, `deliverynoteimage`) VALUES
('LR-1024', '27/10/2023, 11:07:24', 65, 2, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 26th October 2023', '271', 'delivery_notes_uploads/d2df8c8c145bd6bb1261e965efb0f5d8'),
('LR-1080', '24/10/2023, 09:47:46', 82, 40, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 23rd October 2023', '552', 'delivery_notes_uploads/85da8727b71502f15c2133e4e640c7a8'),
('LR-1089', '19/10/2023, 20:14:44', 54, 80, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-1171', '17/10/2023, 15:42:20', 49, 66, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-1174', '17/10/2023, 22:21:18', 123, 7, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-1284', '17/10/2023, 15:42:20', 145, 57, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-1346', '17/10/2023, 22:39:11', 120, 57, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-1412', '17/10/2023, 23:55:24', 113, 19, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-1431', '17/10/2023, 15:17:39', 26, 111, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October Labelled ', '487', 'delivery_notes_uploads/758b7a9f6f853ccec9d26c9793779010'),
('LR-1464', '17/10/2023, 23:06:12', 1026, 4, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-1468', '17/10/2023, 15:42:20', 65, 22, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-1531', '25/10/2023, 11:48:04', 142, 42, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-1532', '17/10/2023, 15:42:20', 32, 14, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-156', '27/10/2023, 10:51:48', 7014, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-1591', '21/10/2023, 23:09:19', 79, 64, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '551', 'delivery_notes_uploads/480a91d3600080740177bce6cc35b0da'),
('LR-162', '17/10/2023, 15:17:39', 147, 26, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October Labelled ', '487', 'delivery_notes_uploads/758b7a9f6f853ccec9d26c9793779010'),
('LR-1829', '25/10/2023, 11:48:04', 123, 30, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-1917', '25/10/2023, 15:39:33', 7061, 8, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-197', '27/10/2023, 10:51:48', 74, 40, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-1992', '17/10/2023, 23:33:01', 19, 42, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 16th October 2023', '493', 'delivery_notes_uploads/89fc0cc9b5499dc6a4fb238337ef6dbf'),
('LR-2086', '27/10/2023, 11:07:24', 24, 55, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 26th October 2023', '271', 'delivery_notes_uploads/d2df8c8c145bd6bb1261e965efb0f5d8'),
('LR-2114', '24/10/2023, 09:42:31', 31, 47, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-2136', '18/10/2023, 23:17:57', 62, 4, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '496', 'delivery_notes_uploads/f1d080b7c8d7da582bbdc67af901c6ea'),
('LR-2139', '17/10/2023, 22:39:11', 101, 55, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-2239', '27/10/2023, 10:32:58', 1028, 24, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 24th October ', '554', 'delivery_notes_uploads/7a129058626d06dbf1eb1b02ecc62cee'),
('LR-2388', '17/10/2023, 23:33:01', 33, 17, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 16th October 2023', '493', 'delivery_notes_uploads/89fc0cc9b5499dc6a4fb238337ef6dbf'),
('LR-2414', '17/10/2023, 15:42:20', 148, 13, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-2466', '19/10/2023, 20:30:20', 78, 38, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-2513', '27/10/2023, 08:26:50', 146, 50, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 25th October 2023', '556', 'delivery_notes_uploads/d5196eb3b8e22b666dcf680c13b485b1'),
('LR-2532', '17/10/2023, 22:39:11', 153, 14, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-2535', '24/10/2023, 09:42:31', 75, 12, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-26', '24/10/2023, 09:42:31', 1064, 55, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-2672', '22/10/2023, 15:00:33', 113, 82, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/732ed8c98fd9374843fb513e797c439a'),
('LR-2684', '17/10/2023, 23:06:12', 123, 25, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-2721', '17/10/2023, 16:30:20', 115, 21, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-2749', '21/10/2023, 22:00:38', 19, 31, 'Pcs', 'companybranches', '', 'masanafu', '', '', '499', 'delivery_notes_uploads/786146c109425ba0cb66c8ed2660cc29'),
('LR-2827', '25/10/2023, 15:39:33', 7017, 28, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-2841', '17/10/2023, 23:06:12', 47, 58, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-2866', '24/10/2023, 09:42:31', 116, 43, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-2882', '25/10/2023, 11:35:25', 1072, 55, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October ', '251', 'delivery_notes_uploads/5328624a09b71c67d0276410e60a6277'),
('LR-2908', '27/10/2023, 10:51:48', 147, 24, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-297', '19/10/2023, 20:30:20', 42, 35, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-3107', '17/10/2023, 23:06:12', 73, 31, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-3118', '18/10/2023, 23:36:54', 7014, 20, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/e88b5a5bfa9ae569be35ba434eee5bf7'),
('LR-3176', '27/10/2023, 18:31:28', 105, 8, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-3207', '17/10/2023, 22:00:32', 1041, 24, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/434c0cfe61c03dd019a4984ec7187c6c'),
('LR-3246', '17/10/2023, 15:42:20', 75, 33, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-3263', '27/10/2023, 11:07:24', 122, 36, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 26th October 2023', '271', 'delivery_notes_uploads/d2df8c8c145bd6bb1261e965efb0f5d8'),
('LR-3286', '18/10/2023, 12:16:42', 19, 43, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 17th October 2023', '495', 'delivery_notes_uploads/7fdba8bf8c6056195b2ebd5f1682ed33'),
('LR-3288', '18/10/2023, 12:31:44', 66, 28, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-3361', '27/10/2023, 08:22:55', 33, 12, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 25th October 2023', '557', 'delivery_notes_uploads/f42971d78b5551afa3adbeb4eca606b3'),
('LR-337', '27/10/2023, 18:31:28', 66, 41, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-3374', '27/10/2023, 18:31:28', 141, 40, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-3396', '27/10/2023, 10:32:58', 137, 47, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 24th October ', '554', 'delivery_notes_uploads/7a129058626d06dbf1eb1b02ecc62cee'),
('LR-3405', '24/10/2023, 09:42:31', 108, 48, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-3415', '17/10/2023, 15:42:20', 82, 25, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-3419', '25/10/2023, 15:39:33', 80, 44, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-3431', '27/10/2023, 18:18:06', 137, 35, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '717', 'delivery_notes_uploads/03378262985e86e191ee7b9861dacc3c'),
('LR-3448', '17/10/2023, 23:33:01', 77, 22, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 16th October 2023', '493', 'delivery_notes_uploads/89fc0cc9b5499dc6a4fb238337ef6dbf'),
('LR-3471', '17/10/2023, 16:30:20', 146, 42, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-3475', '18/10/2023, 11:47:10', 1061, 8, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October ', '252', 'delivery_notes_uploads/f2326c576c29f34149e71ec32987c3b0'),
('LR-352', '22/10/2023, 15:02:49', 1075, 39, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/b85118f304c68d40af4c3503ee44dee4'),
('LR-3523', '18/10/2023, 12:31:44', 72, 20, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-3570', '19/10/2023, 01:06:16', 92, 87, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/84bcebe100eb611b8fae6555c72c86b8'),
('LR-3573', '17/10/2023, 23:55:24', 114, 149, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-3596', '25/10/2023, 11:48:04', 7013, 14, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-3610', '17/10/2023, 23:06:12', 40, 50, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-3634', '25/10/2023, 15:39:33', 126, 8, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-3659', '18/10/2023, 23:12:34', 100, 6, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-3706', '19/10/2023, 20:14:44', 27, 87, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-3715', '27/10/2023, 11:12:44', 141, 12, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 26th October 2023', '558', 'delivery_notes_uploads/b54a7b4416fbc110235720e780dfb3ec'),
('LR-3842', '27/10/2023, 08:18:10', 7013, 23, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/0967646e5dacb3f81356162a3d2f37c4'),
('LR-3894', '18/10/2023, 11:53:14', 137, 50, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October ', '712', 'delivery_notes_uploads/a0f7cb4b90d7aae0d5ceb428952131b6'),
('LR-3948', '17/10/2023, 22:39:11', 53, 40, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-3981', '17/10/2023, 22:21:18', 100, 75, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-4016', '17/10/2023, 16:30:20', 62, 20, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-41', '19/10/2023, 00:02:50', 7013, 30, 'Pcs', 'companybranches', '', 'namungoona', 'Sam', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/c3e0e84ea5854831f4f5298811dc884f'),
('LR-4100', '17/10/2023, 16:54:29', 100, 75, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October ', '850', 'delivery_notes_uploads/8e406489089940f4839c891335179f58'),
('LR-4141', '27/10/2023, 11:12:44', 33, 11, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 26th October 2023', '558', 'delivery_notes_uploads/b54a7b4416fbc110235720e780dfb3ec'),
('LR-4195', '17/10/2023, 22:21:18', 1071, 35, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-4197', '27/10/2023, 08:13:47', 62, 20, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-4221', '25/10/2023, 11:35:25', 118, 23, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October ', '251', 'delivery_notes_uploads/5328624a09b71c67d0276410e60a6277'),
('LR-4356', '19/10/2023, 20:30:20', 24, 50, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-4357', '17/10/2023, 16:54:29', 1054, 39, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October ', '850', 'delivery_notes_uploads/8e406489089940f4839c891335179f58'),
('LR-4379', '17/10/2023, 23:33:01', 80, 18, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 16th October 2023', '493', 'delivery_notes_uploads/89fc0cc9b5499dc6a4fb238337ef6dbf'),
('LR-4418', '19/10/2023, 20:30:20', 147, 18, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-4493', '19/10/2023, 20:30:20', 115, 8, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-4522', '18/10/2023, 23:12:34', 115, 55, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-4536', '24/10/2023, 09:42:31', 35, 18, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-4725', '27/10/2023, 18:31:28', 104, 8, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-4769', '18/10/2023, 23:12:34', 49, 28, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-4888', '27/10/2023, 18:31:28', 100, 50, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-4890', '17/10/2023, 22:21:18', 142, 48, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-4912', '27/10/2023, 10:51:48', 37, 53, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-4930', '19/10/2023, 20:14:44', 92, 95, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-4969', '17/10/2023, 15:42:20', 98, 100, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-499', '27/10/2023, 10:51:48', 138, 3, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-5064', '25/10/2023, 15:39:33', 96, 11, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-5075', '19/10/2023, 00:17:57', 7022, 92, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 17th October 2023', '495', 'delivery_notes_uploads/4b395a7e4150019120808f2f39738c96'),
('LR-5156', '17/10/2023, 23:55:24', 1068, 35, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-5157', '27/10/2023, 08:18:10', 119, 11, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/0967646e5dacb3f81356162a3d2f37c4'),
('LR-5208', '18/10/2023, 23:12:34', 142, 31, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-5251', '17/10/2023, 22:00:32', 19, 49, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/434c0cfe61c03dd019a4984ec7187c6c'),
('LR-5280', '25/10/2023, 15:39:33', 1043, 16, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-5296', '17/10/2023, 16:30:20', 1029, 21, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-5324', '18/10/2023, 12:31:44', 153, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-533', '17/10/2023, 16:30:20', 69, 4, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-5346', '25/10/2023, 15:39:33', 85, 14, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-5354', '17/10/2023, 22:39:11', 107, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-5357', '25/10/2023, 15:39:33', 76, 25, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-54', '19/10/2023, 20:14:44', 25, 19, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-5403', '25/10/2023, 11:48:04', 67, 11, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-5450', '25/10/2023, 11:48:04', 66, 26, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-5506', '18/10/2023, 12:16:42', 81, 96, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 17th October 2023', '495', 'delivery_notes_uploads/7fdba8bf8c6056195b2ebd5f1682ed33'),
('LR-5510', '17/10/2023, 22:21:18', 1054, 39, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-5553', '17/10/2023, 15:42:20', 38, 16, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-5573', '27/10/2023, 08:13:47', 1077, 19, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-5597', '17/10/2023, 22:00:32', 7003, 10, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/434c0cfe61c03dd019a4984ec7187c6c'),
('LR-5646', '17/10/2023, 22:39:11', 72, 35, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-5682', '18/10/2023, 23:44:33', 7013, 12, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/68f4e65806f7270f42cec3e235fd9ad1'),
('LR-5701', '18/10/2023, 12:16:42', 126, 16, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 17th October 2023', '495', 'delivery_notes_uploads/7fdba8bf8c6056195b2ebd5f1682ed33'),
('LR-5822', '27/10/2023, 11:12:44', 50, 47, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 26th October 2023', '558', 'delivery_notes_uploads/b54a7b4416fbc110235720e780dfb3ec'),
('LR-5842', '24/10/2023, 09:47:46', 77, 47, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 23rd October 2023', '552', 'delivery_notes_uploads/85da8727b71502f15c2133e4e640c7a8'),
('LR-5844', '18/10/2023, 12:31:44', 103, 11, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-5857', '27/10/2023, 10:51:48', 43, 31, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-5861', '25/10/2023, 15:39:33', 125, 9, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-5875', '17/10/2023, 23:55:24', 20, 56, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-5934', '18/10/2023, 12:31:44', 51, 53, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-6003', '17/10/2023, 15:42:20', 25, 46, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-6075', '17/10/2023, 23:55:24', 101, 48, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-6136', '21/10/2023, 22:58:28', 137, 56, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy', '', '551', 'delivery_notes_uploads/7acc0d693ddd69e238765938f9f363ad'),
('LR-6202', '19/10/2023, 20:14:44', 128, 15, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-6237', '27/10/2023, 11:12:44', 7017, 30, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 26th October 2023', '558', 'delivery_notes_uploads/b54a7b4416fbc110235720e780dfb3ec'),
('LR-6288', '19/10/2023, 20:30:20', 100, 33, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-631', '27/10/2023, 18:31:28', 107, 30, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-6316', '19/10/2023, 20:14:44', 77, 26, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-6348', '17/10/2023, 22:39:11', 45, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October 2023', '252', 'delivery_notes_uploads/eb73f5674877705a5d60e0d5d3ebf4dc'),
('LR-6377', '17/10/2023, 23:55:24', 62, 22, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-6415', '27/10/2023, 18:31:28', 67, 28, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-6456', '17/10/2023, 23:33:01', 81, 120, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 16th October 2023', '493', 'delivery_notes_uploads/89fc0cc9b5499dc6a4fb238337ef6dbf'),
('LR-6536', '27/10/2023, 08:13:47', 112, 38, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-6558', '22/10/2023, 15:14:07', 7002, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/6c102f771d50b5158c56f357959d61ee'),
('LR-6597', '25/10/2023, 15:39:33', 7013, 6, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-6620', '27/10/2023, 08:13:47', 115, 61, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-676', '19/10/2023, 23:25:37', 103, 28, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/f67ea9802d2b2ef4ce6bf57437d33980'),
('LR-681', '24/10/2023, 09:42:31', 52, 46, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 23rd October 2023', '265', 'delivery_notes_uploads/aebe961f5fc4f382646816afaf13c271'),
('LR-6850', '17/10/2023, 15:42:20', 59, 17, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-6915', '17/10/2023, 23:55:24', 1075, 43, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-6999', '22/10/2023, 15:15:30', 114, 98, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/9a735e6cd7959aad7f3b2df548bb6b5e'),
('LR-7012', '19/10/2023, 20:14:44', 28, 69, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-7032', '25/10/2023, 15:39:33', 28, 207, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-7042', '17/10/2023, 22:21:18', 1038, 38, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-7080', '17/10/2023, 23:33:01', 128, 12, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 16th October 2023', '493', 'delivery_notes_uploads/89fc0cc9b5499dc6a4fb238337ef6dbf'),
('LR-7085', '19/10/2023, 20:14:44', 146, 42, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-7187', '18/10/2023, 23:12:34', 46, 70, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-7201', '19/10/2023, 20:14:44', 102, 38, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-7208', '25/10/2023, 11:35:25', 55, 37, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October ', '251', 'delivery_notes_uploads/5328624a09b71c67d0276410e60a6277'),
('LR-7235', '17/10/2023, 15:42:20', 144, 22, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-7240', '25/10/2023, 15:39:33', 40, 12, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-7277', '27/10/2023, 18:21:17', 146, 115, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '559', 'delivery_notes_uploads/0f43204ad235e4e716a3c66b91ed34f0'),
('LR-7384', '21/10/2023, 22:58:28', 54, 99, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy', '', '551', 'delivery_notes_uploads/7acc0d693ddd69e238765938f9f363ad'),
('LR-7417', '25/10/2023, 15:39:33', 70, 19, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-7425', '18/10/2023, 23:17:57', 61, 15, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '496', 'delivery_notes_uploads/f1d080b7c8d7da582bbdc67af901c6ea'),
('LR-7438', '27/10/2023, 08:13:47', 66, 24, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-7526', '18/10/2023, 23:12:34', 65, 20, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-756', '19/10/2023, 20:14:44', 138, 19, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-7562', '27/10/2023, 08:22:55', 146, 113, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 25th October 2023', '557', 'delivery_notes_uploads/f42971d78b5551afa3adbeb4eca606b3'),
('LR-759', '19/10/2023, 20:14:44', 121, 23, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-7594', '27/10/2023, 08:13:47', 100, 10, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-7606', '17/10/2023, 16:30:20', 118, 10, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-7682', '25/10/2023, 15:39:33', 115, 11, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-7700', '17/10/2023, 23:06:12', 1027, 8, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-7708', '22/10/2023, 15:01:15', 114, 98, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/1b66265132304dbf4ffaba65b709027a'),
('LR-7779', '19/10/2023, 20:14:44', 149, 48, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '499', 'delivery_notes_uploads/0adbdebdcee9cc01e133d3bb0d2cf69e'),
('LR-7792', '17/10/2023, 23:55:24', 78, 38, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-7817', '27/10/2023, 10:51:48', 51, 71, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-7904', '25/10/2023, 11:35:25', 140, 88, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October ', '251', 'delivery_notes_uploads/5328624a09b71c67d0276410e60a6277'),
('LR-7941', '19/10/2023, 01:06:16', 7015, 36, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/84bcebe100eb611b8fae6555c72c86b8'),
('LR-808', '27/10/2023, 18:31:28', 1043, 40, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '273', 'delivery_notes_uploads/cda4042c352954420462efa50bd5b786'),
('LR-8085', '25/10/2023, 15:39:33', 102, 18, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-8137', '17/10/2023, 22:21:18', 78, 5, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-8173', '17/10/2023, 16:54:29', 78, 5, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October ', '850', 'delivery_notes_uploads/8e406489089940f4839c891335179f58'),
('LR-821', '17/10/2023, 23:06:12', 54, 125, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-8241', '25/10/2023, 11:48:04', 107, 50, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-8285', '17/10/2023, 23:06:12', 34, 23, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 14th October 2023', '490', 'delivery_notes_uploads/946c6cd43211ad187790615b63202a65'),
('LR-8289', '17/10/2023, 15:42:20', 150, 18, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-8325', '25/10/2023, 11:35:25', 148, 42, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 14th October ', '251', 'delivery_notes_uploads/5328624a09b71c67d0276410e60a6277'),
('LR-8335', '25/10/2023, 11:48:04', 72, 4, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-8414', '25/10/2023, 15:39:33', 46, 4, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 20th October ', '500', 'delivery_notes_uploads/b96e799b20c180ae1530503712d92972'),
('LR-8569', '27/10/2023, 08:22:55', 80, 23, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 25th October 2023', '557', 'delivery_notes_uploads/f42971d78b5551afa3adbeb4eca606b3'),
('LR-8575', '17/10/2023, 22:21:18', 102, 28, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 13th October 2023', '850', 'delivery_notes_uploads/652cd2a9f349abc26516f7fe8a7852f7'),
('LR-8605', '18/10/2023, 12:31:44', 23, 37, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-8715', '17/10/2023, 16:30:20', 87, 11, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-8755', '22/10/2023, 15:01:15', 113, 82, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/1b66265132304dbf4ffaba65b709027a'),
('LR-8849', '18/10/2023, 23:12:34', 117, 23, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '258', 'delivery_notes_uploads/3bf5253787c80f66a27e042a43540202'),
('LR-8893', '17/10/2023, 16:30:20', 142, 20, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-89', '17/10/2023, 16:30:20', 132, 11, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-8908', '17/10/2023, 16:30:20', 72, 10, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-8925', '17/10/2023, 23:55:24', 1065, 32, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/7be888f3d526d8e66c80ba04bb7cf703'),
('LR-8942', '19/10/2023, 20:30:20', 102, 4, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-8955', '17/10/2023, 15:42:20', 44, 12, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-8972', '18/10/2023, 12:16:42', 110, 8, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 17th October 2023', '495', 'delivery_notes_uploads/7fdba8bf8c6056195b2ebd5f1682ed33'),
('LR-898', '17/10/2023, 16:30:20', 1038, 5, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-8990', '27/10/2023, 10:51:48', 140, 31, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-9119', '18/10/2023, 12:31:44', 91, 23, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 17th October 2023', '256', 'delivery_notes_uploads/46cc64a841f3c262743158e32d5280e2'),
('LR-9296', '19/10/2023, 20:30:20', 118, 22, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', '', '262', 'delivery_notes_uploads/32ade16d776515e34bb3eef1548d1afc'),
('LR-935', '17/10/2023, 16:30:20', 29, 23, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/a5b867eb9659f5aedd40570097efdd91'),
('LR-9352', '17/10/2023, 22:00:32', 1072, 8, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '488', 'delivery_notes_uploads/434c0cfe61c03dd019a4984ec7187c6c'),
('LR-9355', '17/10/2023, 15:42:20', 149, 10, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', 'Delivery received on 13th October labelled ', '487', 'delivery_notes_uploads/e98c0b880f459f483f0c6ba91ace49d9'),
('LR-9400', '25/10/2023, 11:48:04', 37, 15, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-9408', '22/10/2023, 15:02:49', 113, 82, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/b85118f304c68d40af4c3503ee44dee4'),
('LR-9549', '27/10/2023, 10:51:48', 142, 33, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-959', '18/10/2023, 23:17:57', 19, 41, 'Pcs', 'companybranches', '', 'masanafu', 'Sammy ', '', '496', 'delivery_notes_uploads/f1d080b7c8d7da582bbdc67af901c6ea'),
('LR-9739', '27/10/2023, 11:07:24', 142, 34, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 26th October 2023', '271', 'delivery_notes_uploads/d2df8c8c145bd6bb1261e965efb0f5d8'),
('LR-9807', '22/10/2023, 17:56:38', 7002, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 21st October 2023', '264', 'delivery_notes_uploads/552246941b79d6c3eebb3f483da43cd3'),
('LR-9858', '25/10/2023, 11:48:04', 94, 50, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-9859', '27/10/2023, 08:13:47', 42, 12, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy', 'Delivery received on 25th October 2023', '270', 'delivery_notes_uploads/e7609a784d31d0793ae9141f322f6fa5'),
('LR-9879', '25/10/2023, 11:48:04', 125, 40, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7'),
('LR-9930', '27/10/2023, 10:51:48', 1061, 16, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 24th October ', '267', 'delivery_notes_uploads/d3da6a9be72ca02068ba98a1f1dc33a8'),
('LR-9970', '18/10/2023, 23:44:33', 7014, 25, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 16th October 2023', '255', 'delivery_notes_uploads/68f4e65806f7270f42cec3e235fd9ad1'),
('LR-998', '25/10/2023, 11:48:04', 70, 50, 'Pcs', 'companybranches', '', 'namungoona', 'Sammy ', 'Delivery received on 20th October ', '263', 'delivery_notes_uploads/84e24b86f133c27e77091ee7ae73fca7');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialMassageInventory`
--

CREATE TABLE `equatorialMassageInventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialMassageInventory`
--

INSERT INTO `equatorialMassageInventory` (`productId`, `quantityinstock`, `munits`) VALUES
(19, 5, 'Pcs'),
(20, 12, 'Pcs'),
(24, 5, 'Pcs'),
(21, 3, 'Pcs'),
(22, 3, 'Pcs'),
(23, 0, 'Pcs'),
(25, 0, 'Pcs'),
(26, 7, 'Pcs'),
(27, 1, 'Pcs'),
(28, 11, 'Pcs'),
(29, 5, 'Pcs'),
(30, 4, 'Pcs'),
(31, 2, 'Pcs'),
(32, 4, 'Pcs'),
(33, 4, 'Pcs'),
(34, 5, 'Pcs'),
(35, 2, 'Pcs'),
(36, 4, 'Pcs'),
(37, 4, 'Pcs'),
(38, 5, 'Pcs'),
(39, 1, 'Pcs'),
(40, 2, 'Pcs'),
(41, 1, 'Pcs'),
(42, 4, 'Pcs'),
(47, 3, 'Pcs'),
(44, 5, 'Pcs'),
(45, 5, 'Pcs'),
(46, 6, 'Pcs'),
(48, 0, 'Pcs'),
(49, 4, 'Pcs'),
(51, 5, 'Pcs'),
(52, 5, 'Pcs'),
(53, 2, 'Pcs'),
(54, 1, 'Pcs'),
(56, 5, 'Pcs'),
(57, 3, 'Pcs'),
(58, 4, 'Pcs'),
(59, 5, 'Pcs'),
(60, 2, 'Pcs'),
(61, 2, 'Pcs'),
(62, 4, 'Pcs'),
(63, 2, 'Pcs'),
(68, 5, 'Pcs'),
(143, 5, 'Pcs'),
(144, 3, 'Pcs'),
(145, 5, 'Pcs'),
(69, 4, 'Pcs'),
(70, 2, 'Pcs'),
(71, 1, 'Pcs'),
(72, 7, 'Pcs'),
(74, 2, 'Pcs'),
(75, 5, 'Pcs'),
(77, 3, 'Pcs'),
(80, 7, 'Pcs'),
(78, 5, 'Pcs'),
(81, 5, 'Pcs'),
(82, 2, 'Pcs'),
(79, 6, 'Pcs'),
(83, 4, 'Pcs'),
(84, 4, 'Pcs'),
(85, 4, 'Pcs'),
(86, 8, 'Pcs'),
(87, 9, 'Pcs'),
(88, 5, 'Pcs'),
(89, 5, 'Pcs'),
(90, 3, 'Pcs'),
(91, 4, 'Pcs'),
(93, 5, 'Pcs'),
(94, 5, 'Pcs'),
(95, 3, 'Pcs'),
(96, 4, 'Pcs'),
(97, 4, 'Pcs'),
(98, 4, 'Pcs'),
(99, 5, 'Pcs'),
(100, 4, 'Pcs'),
(101, 0, 'Pcs'),
(102, 6, 'Pcs'),
(103, 8, 'Pcs'),
(104, 4, 'Pcs'),
(106, 1, 'Pcs'),
(107, 5, 'Pcs'),
(108, 5, 'Pcs'),
(110, 0, 'Pcs'),
(111, 5, 'Pcs'),
(112, 4, 'Pcs'),
(113, 3, 'Pcs'),
(114, 15, 'Pcs'),
(115, 1, 'Pcs'),
(116, 5, 'Pcs'),
(117, 4, 'Pcs'),
(118, 3, 'Pcs'),
(119, 5, 'Pcs'),
(120, 7, 'Pcs'),
(121, 5, 'Pcs'),
(122, 14, 'Pcs'),
(123, 6, 'Pcs'),
(124, 3, 'Pcs'),
(125, 5, 'Pcs'),
(126, 1, 'Pcs'),
(127, 5, 'Pcs'),
(128, 2, 'Pcs'),
(129, 1, 'Pcs'),
(131, 2, 'Pcs'),
(132, 3, 'Pcs'),
(133, 14, 'Pcs'),
(134, 9, 'Pcs'),
(135, 1, 'Pcs'),
(136, 8, 'Pcs'),
(137, 0, 'Pcs'),
(138, 5, 'Pcs'),
(140, 4, 'Pcs'),
(141, 5, 'Pcs'),
(142, 4, 'Pcs'),
(92, 0, 'Pcs'),
(43, 5, 'Pcs'),
(66, 0, 'Pcs'),
(67, 1, 'Pcs'),
(64, 2, 'Pcs'),
(65, 2, 'Pcs'),
(105, 5, 'Pcs'),
(146, 8, 'Pcs'),
(7012, 26, 'Pcs'),
(7009, 1, 'Pcs'),
(1027, 3, 'Pcs'),
(1026, 3, 'Pcs'),
(7003, 3, 'Pcs'),
(7071, 1, 'Pcs');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialmassageinventoryrecords`
--

CREATE TABLE `equatorialmassageinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `recordcategory` varchar(20) NOT NULL DEFAULT 'incoming',
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialmassageinventoryrecords`
--

INSERT INTO `equatorialmassageinventoryrecords` (`date`, `recordcategory`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('10/13/2023', 'incoming', 19, 9, 'Pcs', 'equatorialshop', '', 'initial  stock'),
('10/13/2023', 'incoming', 20, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 24, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 20, 6, 'Pcs', 'equatorialshop', '', 'initial  stock'),
('10/13/2023', 'incoming', 21, 3, 'Pcs', 'equatorialshop', '', 'initial stock '),
('10/13/2023', 'incoming', 22, 3, 'Pcs', 'equatorialshop', '', 'initial stock '),
('10/13/2023', 'incoming', 23, 1, 'Pcs', 'equatorialshop', '', 'initial stock '),
('10/13/2023', 'incoming', 25, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 26, 7, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 27, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 28, 11, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 29, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 30, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 31, 8, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 32, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 33, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 34, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 35, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 36, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 37, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 38, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 39, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 40, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 41, 1, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 42, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 47, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 44, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 45, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 46, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 48, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 49, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 51, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 52, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 53, 3, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 54, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 56, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 57, 3, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 58, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 59, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 60, 3, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 61, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 62, 1, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 63, 1, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 68, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 143, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 144, 3, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 145, 4, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 69, 4, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 70, 4, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 71, 1, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 72, 7, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 74, 3, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 75, 1, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 77, 6, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 80, 3, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 78, 1, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 81, 10, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 82, 2, 'Pcs', 'equatorialshop', '', ''),
('10/13/2023', 'incoming', 79, 8, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 79, 8, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 83, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 84, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 85, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 86, 8, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 87, 9, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 88, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 89, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 90, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 91, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 93, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 94, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 95, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 96, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 97, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 98, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 99, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 100, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 101, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 102, 9, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 103, 8, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 104, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 106, 1, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 107, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 108, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 110, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 111, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 112, 4, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 113, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 114, 20, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 115, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 116, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 117, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 118, 3, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 119, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 120, 7, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 121, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 122, 14, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 123, 6, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 124, 3, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 125, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 126, 1, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 127, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 128, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 129, 1, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 131, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 132, 3, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 133, 14, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 134, 9, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 135, 2, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 136, 8, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 137, 54, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 138, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 140, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 141, 5, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 137, 54, 'Pcs', 'equatorialshop', '', 'initial stock'),
('10/13/2023', 'incoming', 142, 2, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 33, 2, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 92, 4, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 43, 5, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 23, 5, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 75, 4, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 80, 7, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 66, 5, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 67, 5, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 62, 4, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 63, 4, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 64, 2, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 65, 2, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 44, 3, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 105, 5, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('10/13/2023', 'incoming', 146, 5, 'Pcs', 'equatorialshop', '', 'Initial stock'),
('18/10/2023', 'incoming', 7009, 2, 'Pcs', 'equatorialshop', '', ''),
('10/19/2023', 'incoming', 1027, 3, 'Pcs', 'equatorialshop', '', ''),
('10/19/2023', 'incoming', 115, 5, 'Pcs', 'external', '', ''),
('10/19/2023', 'incoming', 1026, 3, 'Pcs', 'equatorialshop', '', ''),
('10/19/2023', 'incoming', 145, 5, 'Pcs', 'equatorialshop', '', ''),
('10/19/2023', 'incoming', 142, 5, 'Pcs', 'equatorialshop', '', ''),
('10/19/2023', 'incoming', 78, 5, 'Pcs', 'equatorialshop', '', ''),
('10/21/2023', 'incoming', 142, 8, 'Pcs', 'equatorialshop', '', ''),
('10/23/2023', 'incoming', 7003, 3, 'Pcs', '', '', ''),
('10/27/2023', 'incoming', 142, 5, 'Pcs', 'equatorialshop', '', ''),
('10/27/2023', 'incoming', 146, 5, 'Pcs', 'equatorialshop', '', ''),
('10/27/2023', 'incoming', 33, 5, 'Pcs', 'equatorialshop', '', ''),
('10/27/2023', 'incoming', 7071, 2, 'Pcs', 'equatorialshop', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialmassagemoneysubmission`
--

CREATE TABLE `equatorialmassagemoneysubmission` (
  `submissionId` varchar(15) NOT NULL,
  `submissionDate` varchar(30) NOT NULL,
  `massageamount` float DEFAULT NULL,
  `productamount` float DEFAULT NULL,
  `submittedBy` text NOT NULL,
  `receivedby` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `submissionstatus` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialmassagemoneysubmission`
--

INSERT INTO `equatorialmassagemoneysubmission` (`submissionId`, `submissionDate`, `massageamount`, `productamount`, `submittedBy`, `receivedby`, `submissionstatus`) VALUES
('SM-0', '10/19/2023', 50000, 111000, 'fred', 'bridget', 'unconfirmed'),
('SM-1', '10/23/2023', 60000, 217000, 'fred', '', 'unconfirmed'),
('SM-11', '10/25/2023', 20000, 150000, 'fred', 'bridget', 'unconfirmed'),
('SM-19', '10/18/2023', 20000, 90000, 'fred', 'bridget', 'unconfirmed'),
('SM-27', '10/24/2023', 40000, 100000, 'fred', 'bridget', 'unconfirmed'),
('SM-39', '10/21/2023', 50000, 92000, 'fred', 'bridget', 'unconfirmed'),
('SM-4', '10/18/2023', 30000, 290000, 'fred', 'bridget', 'unconfirmed'),
('SM-55', '10/25/2023', 20000, NULL, 'fred', '', 'unconfirmed'),
('SM-78', '10/27/2023', 30000, 643000, 'fred', 'bridget', 'unconfirmed'),
('SM-81', '10/18/2023', 30000, 175000, 'fred', 'bridget', 'unconfirmed'),
('SM-89', '10/26/2023', 10000, 50000, 'fred', 'bridget', 'unconfirmed'),
('SM-91', '10/20/2023', 50000, 346000, 'fred', 'bridget', 'unconfirmed'),
('SM-92', '10/18/2023', 70000, 49000, 'fred', 'bridget', 'unconfirmed'),
('SM-94', '10/13/2023', 30000, 40000, 'fred', 'bridget', 'unconfirmed'),
('SM-95', '10/20/2023', 346000, 50000, 'fred', 'bridget', 'unconfirmed'),
('SM-97', '10/24/2023', 40000, 100000, 'fred', 'bridget', 'unconfirmed');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialMassageSales`
--

CREATE TABLE `equatorialMassageSales` (
  `receiptNumber` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `saleDate` varchar(20) NOT NULL,
  `customerNames` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `customerContact` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `itemsSold` varchar(21000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `totalAmount` float NOT NULL,
  `balance` float NOT NULL,
  `paymentStatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `additionalinfo` text,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialMassageSales`
--

INSERT INTO `equatorialMassageSales` (`receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`, `transactionID`) VALUES
('0083-5881', '18/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":81,\"name\":\"EPSOM SALT 250G\",\"unitCost\":10000,\"discount\":0,\"quantity\":2,\"totalCost\":20000},{\"id\":19,\"name\":\"PEPPERMINT ROOT TEA 200G\",\"unitCost\":20000,\"discount\":0,\"quantity\":2,\"totalCost\":40000},{\"id\":101,\"name\":\"CEDAR OIL SPRAY \",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":2,\"totalCost\":10000},{\"id\":54,\"name\":\"CASTOR SEEDS PLANTING 100G\",\"unitCost\":10000,\"discount\":0,\"quantity\":4,\"totalCost\":40000},{\"id\":92,\"name\":\"FLAX SEEDS BIG 100G\",\"unitCost\":10000,\"discount\":0,\"quantity\":4,\"totalCost\":40000},{\"id\":140,\"name\":\"TRICHODERMA 250ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":145,\"name\":\"MOSQUITO REPELLANT  CREAM BIG 100G\",\"unitCost\":5000,\"discount\":0,\"quantity\":4,\"totalCost\":20000},{\"id\":7009,\"name\":\"CHIA SEEDS BIG 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":114,\"name\":\"KOFF BOMB 120ML\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000},{\"id\":42,\"name\":\"BAZUKA 9 POWDER 100G\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":74,\"name\":\"LWASA MAYINJA 60ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":49,\"name\":\"PUMPKIN OIL 60ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":35,\"name\":\"BIO SILVER 100ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000}]', 290000, 0, 'fullypaid', 'Cash', 'All sales made on 17/10/2023', NULL),
('0376-49594', '18/10/2023', 'AA ZZ', '101', '[{\"id\":7012,\"name\":\"test22\",\"unitCost\":0,\"discount\":0,\"quantity\":1,\"totalCost\":0}]', 0, 0, 'fullypaid', 'Cash', '', NULL),
('0377-69727', '21/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":137,\"name\":\"SAFFRON EGGS \",\"unitCost\":1000,\"discount\":0,\"quantity\":12,\"totalCost\":12000},{\"id\":80,\"name\":\"HIMALAYAN PINK SALT 250G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":39,\"name\":\"COLON CLEANSER 100G\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":95,\"name\":\"GARLIC OIL 20ML\",\"unitCost\":30000,\"discount\":0,\"quantity\":1,\"totalCost\":30000}]', 67000, 0, 'fullypaid', 'Cash', 'daily sales 21/10/23', NULL),
('0629-27052', '18/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":47,\"name\":\"KISULA POWDER\",\"unitCost\":5000,\"discount\":0,\"quantity\":2,\"totalCost\":10000},{\"id\":31,\"name\":\"ROSEMARY OIL AMBER 10ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":37,\"name\":\"DIATOMACEOUS CLAY 100G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":115,\"name\":\"MAGNESIUM OIL 100ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":4,\"totalCost\":40000},{\"id\":25,\"name\":\"STEVIA POWDER BIG 180G\",\"unitCost\":15000,\"discount\":0,\"quantity\":3,\"totalCost\":45000},{\"id\":110,\"name\":\"LAVENDER OIL AMBER 10ML\",\"unitCost\":25000,\"discount\":0,\"quantity\":2,\"totalCost\":50000}]', 175000, 0, 'fullypaid', 'Cash', 'daily sales made on 18/10/23', NULL),
('1484-1803', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":137,\"name\":\"SAFFRON EGGS \",\"unitCost\":1000,\"discount\":0,\"quantity\":6,\"totalCost\":6000}]', 6000, 0, 'fullypaid', 'Cash', 'sales 19/10/23', NULL),
('1841-72509', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":102,\"name\":\"CITRONELLA OIL AMBER 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":2,\"totalCost\":40000}]', 40000, 0, 'fullypaid', 'Cash', 'Daily sale made 19/10/20', NULL),
('3307-68885', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":114,\"name\":\"KOFF BOMB 120ML\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 5000, 0, 'fullypaid', 'Cash', 'sales 19/10/23', NULL),
('3554-45592', '27/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":67,\"name\":\"SHEA BUTTER 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":59,\"name\":\"MANGO BUTTER  SMALL 50G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":135,\"name\":\"SLIMMING BELT\",\"unitCost\":500000,\"discount\":0,\"quantity\":1,\"totalCost\":500000},{\"id\":48,\"name\":\"ALKALI POWDER  SMALL 100G\",\"unitCost\":10000,\"discount\":0,\"quantity\":2,\"totalCost\":20000},{\"id\":81,\"name\":\"EPSOM SALT 250G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":7071,\"name\":\"borax\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":31,\"name\":\"ROSEMARY OIL AMBER 10ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":117,\"name\":\"JAMAICAN BLACK CASTOR  OIL 60ML\",\"unitCost\":30000,\"discount\":0,\"quantity\":1,\"totalCost\":30000},{\"id\":33,\"name\":\"ACTIVATED CHARCOAL 250G\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":100,\"name\":\"CEDAR OIL AMBER 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":63,\"name\":\"ALOE VERA GEL SMALL 50G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000},{\"id\":137,\"name\":\"SAFFRON EGGS \",\"unitCost\":1000,\"discount\":0,\"quantity\":18,\"totalCost\":18000}]', 693000, 0, 'fullypaid', 'Visa', '540k was visa the rest cash', NULL),
('3750-65200', '14/10/2023', 'CLIENT CLIENT', '0701303137', '[{\"id\":19,\"name\":\"PEPPERMINT ROOT TEA 200G\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":27,\"name\":\"STEVIA POWDER SMALL  45G\",\"unitCost\":9000,\"discount\":0,\"quantity\":3,\"totalCost\":3000},{\"id\":116,\"name\":\"MASSAGE OIL 100ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000}]', 49000, 0, 'fullypaid', 'Cash', 'TAKEN', NULL),
('3983-48111', '13/10/2023', 'DAILY SALES', '0701951913', '[{\"id\":25,\"name\":\"STEVIA POWDER BIG 180G\",\"unitCost\":15000,\"discount\":0,\"quantity\":2,\"totalCost\":30000},{\"id\":78,\"name\":\"CIDER VINEGAR\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000},{\"id\":114,\"name\":\"KOFF BOMB 120ML\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 40000, 0, 'fullypaid', 'Cash', '', NULL),
('3988-91945', '23/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":67,\"name\":\"SHEA BUTTER 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":2,\"totalCost\":20000},{\"id\":66,\"name\":\"TURMERIC BUTTER 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":113,\"name\":\"POULTRY BOMB 250ML\",\"unitCost\":5000,\"discount\":0,\"quantity\":2,\"totalCost\":10000},{\"id\":137,\"name\":\"SAFFRON EGGS \",\"unitCost\":1000,\"discount\":0,\"quantity\":12,\"totalCost\":12000},{\"id\":53,\"name\":\"CASTOR OIL EYES 60ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":35,\"name\":\"BIO SILVER 100ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":36,\"name\":\"OZONE WATER 100ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":94,\"name\":\"NEEM OIL 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":146,\"name\":\"STEVIA CONCENTRATE 20ML\",\"unitCost\":5000,\"discount\":0,\"quantity\":2,\"totalCost\":10000},{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":5,\"totalCost\":25000},{\"id\":31,\"name\":\"ROSEMARY OIL AMBER 10ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":3,\"totalCost\":60000}]', 217000, 0, 'fullypaid', 'Cash', 'daily sales 23/10/23', NULL),
('4075-48625', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":114,\"name\":\"KOFF BOMB 120ML\",\"unitCost\":5000,\"discount\":0,\"quantity\":2,\"totalCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'daily sale 19/10/2023', NULL),
('4312-6837', '25/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":33,\"name\":\"ACTIVATED CHARCOAL 250G\",\"unitCost\":20000,\"discount\":0,\"quantity\":2,\"totalCost\":40000},{\"id\":58,\"name\":\"MANGO BUTTER  BIG 100G\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":80,\"name\":\"HIMALAYAN PINK SALT 250G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":101,\"name\":\"CEDAR OIL SPRAY \",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":79,\"name\":\"GREEN TEA 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":115,\"name\":\"MAGNESIUM OIL 100ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":63,\"name\":\"ALOE VERA GEL SMALL 50G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000}]', 120000, 0, 'fullypaid', 'Cash', 'sales 25/10/23', NULL),
('4376-75104', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":35,\"name\":\"BIO SILVER 100ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'daily sales made 19/10/2023', NULL),
('5207-98880', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 5000, 0, 'fullypaid', 'Cash', 'sales 19/10/23', NULL),
('5447-6077', '21/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":110,\"name\":\"LAVENDER OIL AMBER 10ML\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000}]', 25000, 0, 'fullypaid', 'Cash', 'sales 21/10/23', NULL),
('5681-95839', '20/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":67,\"name\":\"SHEA BUTTER 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":98,\"name\":\"BLACK SEED OIL 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":23,\"name\":\"EUCALYPTUS TEA BIG 130G\",\"unitCost\":10000,\"discount\":0,\"quantity\":6,\"totalCost\":60000},{\"id\":70,\"name\":\"JOJOBA OIL 60ML\",\"unitCost\":30000,\"discount\":0,\"quantity\":2,\"totalCost\":60000},{\"id\":66,\"name\":\"TURMERIC BUTTER 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":2,\"totalCost\":20000},{\"id\":19,\"name\":\"PEPPERMINT ROOT TEA 200G\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":102,\"name\":\"CITRONELLA OIL AMBER 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":115,\"name\":\"MAGNESIUM OIL 100ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":4,\"totalCost\":20000},{\"id\":90,\"name\":\"TONJATULA SUPER 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":2,\"totalCost\":40000},{\"id\":91,\"name\":\"FLAX OIL 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":62,\"name\":\"ALOE VERA GEL BIG 100G\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":137,\"name\":\"SAFFRON EGGS \",\"unitCost\":1000,\"discount\":0,\"quantity\":6,\"totalCost\":6000},{\"id\":100,\"name\":\"CEDAR OIL AMBER 20ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000}]', 346000, 0, 'fullypaid', 'Cash', 'sales made on 20/10/23', NULL),
('6363-38023', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":115,\"name\":\"MAGNESIUM OIL 100ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'daily sales made on 19/10/23', NULL),
('8033-23866', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":60,\"name\":\"CUCUMBER GEL SMALL 50G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'daily sales made on 19/10/2023', NULL),
('8174-40148', '19/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":83,\"name\":\"HONEY SMALL 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 5000, 0, 'fullypaid', 'Cash', 'sales 19/10/23', NULL),
('8673-63441', '24/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":31,\"name\":\"ROSEMARY OIL AMBER 10ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":101,\"name\":\"CEDAR OIL SPRAY \",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":110,\"name\":\"LAVENDER OIL AMBER 10ML\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000},{\"id\":66,\"name\":\"TURMERIC BUTTER 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":2,\"totalCost\":20000},{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 90000, 0, 'fullypaid', 'Cash', '24/10/24 plus 10k for majegere', NULL),
('8731-4298', '23/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":142,\"name\":\"MAJEGERE PORRIDGE 500G\",\"unitCost\":5000,\"discount\":0,\"quantity\":2,\"totalCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'sales 23/10/23', NULL),
('9794-81123', '18/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":77,\"name\":\"COCONUT OIL 300ML\",\"unitCost\":20000,\"discount\":0,\"quantity\":3,\"totalCost\":60000},{\"id\":115,\"name\":\"MAGNESIUM OIL 100ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":81,\"name\":\"EPSOM SALT 250G\",\"unitCost\":10000,\"discount\":0,\"quantity\":2,\"totalCost\":20000}]', 90000, 0, 'fullypaid', 'Cash', 'sales for 16/10/2023', NULL),
('9853-19735', '25/10/2023', 'DAILY SALES', '0782169837', '[{\"id\":33,\"name\":\"ACTIVATED CHARCOAL 250G\",\"unitCost\":20000,\"discount\":0,\"quantity\":2,\"totalCost\":40000},{\"id\":58,\"name\":\"MANGO BUTTER  BIG 100G\",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":80,\"name\":\"HIMALAYAN PINK SALT 250G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":101,\"name\":\"CEDAR OIL SPRAY \",\"unitCost\":20000,\"discount\":0,\"quantity\":1,\"totalCost\":20000},{\"id\":79,\"name\":\"GREEN TEA 200G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":115,\"name\":\"MAGNESIUM OIL 100ML\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":63,\"name\":\"ALOE VERA GEL SMALL 50G\",\"unitCost\":10000,\"discount\":0,\"quantity\":1,\"totalCost\":10000},{\"id\":95,\"name\":\"GARLIC OIL 20ML\",\"unitCost\":30000,\"discount\":0,\"quantity\":1,\"totalCost\":30000}]', 150000, 0, 'fullypaid', 'Cash', 'sale 25/10/23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `equatorialmassagesalespayments`
--

CREATE TABLE `equatorialmassagesalespayments` (
  `receiptNumber` varchar(10) NOT NULL,
  `paymentdate` varchar(20) NOT NULL,
  `amountPaid` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `paymentMethod` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialMassageServicesRecords`
--

CREATE TABLE `equatorialMassageServicesRecords` (
  `receiptNumber` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `saleDate` varchar(20) NOT NULL,
  `customerNames` varchar(100) NOT NULL,
  `customerContact` varchar(15) NOT NULL,
  `servicesOffered` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `totalAmount` float NOT NULL,
  `balance` float NOT NULL,
  `paymentStatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `additionalinfo` text,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialMassageServicesRecords`
--

INSERT INTO `equatorialMassageServicesRecords` (`receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `servicesOffered`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`, `transactionID`) VALUES
('0045-60448', '18/10/2023', 'FLORENCE MADAM', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage service done on 17/10/23', NULL),
('0171-10080', '14/10/2023', 'KASIBANTE KASIBANTE', '0701303137', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'DONE', NULL),
('0186-36283', '23/10/2023', 'OMARCH SANTOS', '0772408723', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 23/10/23', NULL),
('0233-87925', '14/10/2023', 'ABRAHAM SUDAN', '0765691264', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000},{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 30000, 0, 'fullypaid', 'Cash', 'DONE', NULL),
('0385-46061', '23/10/2023', 'KAWOYA SHARIFAH', '0703458249', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 23/10/23', NULL),
('1519-66595', '18/10/2023', 'RICHARD CLIENT', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made on 18/10/2023', NULL),
('1747-25968', '24/10/2023', 'PASCA CLIENT', '0785289952', '[{\"Id\":\"S-25\",\"productName\":\"belt therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made 24/10/23', NULL),
('1781-881', '13/10/2023', 'MUHUMUZA MUHUMUZA', '0701303137', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', '', NULL),
('1972-87032', '25/10/2023', 'MARGRET CLIENT', '0785159284', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 25/10/23', NULL),
('2202-92767', '27/10/2023', 'KIJAMBO CLIENT', '0782533991', '[]', 20000, 0, 'fullypaid', 'Cash', 'massage 27/10/23', NULL),
('2245-692', '24/10/2023', 'DOREEN CLIENT', '0772377995', '[{\"Id\":\"S-25\",\"productName\":\"belt therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made on 24/10/23', NULL),
('2332-38002', '19/10/2023', 'HAJI ABDUL', '0782169837', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 19/10/23', NULL),
('2350-38312', '14/10/2023', 'NAYIGA MASSAGE', '0703332425', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'TAKEM', NULL),
('2953-79075', '25/10/2023', 'HARRIET ALINDA', '0772611458', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 25/10/23', NULL),
('3045-7552', '13/10/2023', 'BRIDGET BRIDGET', '0701303137', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', '', NULL),
('3715-48927', '14/10/2023', 'ABRAHAM SUDAN', '0765691264', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000},{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 30000, 0, 'fullypaid', 'Cash', 'DONE', NULL),
('4422-96957', '19/10/2023', 'NAMUSI CLIENT', '0782169837', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage made on 19/10/23', NULL),
('4655-27791', '26/10/2023', 'FAITH FLORENCE', '0782135500', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 2/10/23', NULL),
('4976-93346', '18/10/2023', 'JOAN CLIENT', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made on 18/10/2023', NULL),
('4999-42286', '21/10/2023', 'KALUNGI CLIENT', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 21/10/23', NULL),
('5228-1272', '21/10/2023', 'LEBBRON CLIENT', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 21/10/23', NULL),
('5793-69306', '18/10/2023', 'MADAM SHAKINA', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage service done on 17/10/23', NULL),
('5850-4006', '20/10/2023', 'TAKIA CLIENT', '0770423319', '[{\"Id\":\"S-73\",\"productName\":\"light therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'MASSAGE 20/10/23', NULL),
('6213-37873', '24/10/2023', 'FLORENCE CLIENT', '0782765055', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made on 24/10/23', NULL),
('6353-40542', '18/10/2023', 'OMARCH SANTOS', '0772408723', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made on 18/10/2023', NULL),
('6973-72692', '18/10/2023', 'BRIDGHET MADAM', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage service done on 17/10/23', NULL),
('7233-21758', '23/10/2023', 'NAJEMBA CLIENT', '0752566009', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 23/10/23', NULL),
('7690-86388', '27/10/2023', 'OLIVER CLIENT', '0782169837', '[]', 10000, 0, 'fullypaid', 'Cash', 'massage 27/10/23', NULL),
('8555-21777', '20/10/2023', 'DOREEN CLIENT', '0772377995', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 20/10/23', NULL),
('8815-59236', '24/10/2023', 'PASCA CLIENT', '0785289952', '[{\"Id\":\"S-25\",\"productName\":\"belt therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage made 24/10/23', NULL),
('8848-97102', '18/10/2023', 'NAMUSI PROSSY', '0772342819', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage service done on 16/10/23', NULL),
('8906-92389', '20/10/2023', 'PASCA CLIENT', '0785289952', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 20/10/23', NULL),
('9008-9349', '19/10/2023', 'NAOME CONGO', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 19/10/23', NULL),
('9070-53091', '21/10/2023', 'MUKULA CASTROL', '0703833259', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 21/10/23', NULL),
('9343-2855', '23/10/2023', 'KANSIIME JANE', '0772419862', '[{\"Id\":\"S-73\",\"productName\":\"light therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 23/10/23', NULL),
('9393-39745', '24/10/2023', 'DOREEN CLIENT', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 24/10/23', NULL),
('9589-2989', '23/10/2023', 'REBECCA CLIENT', '0782169837', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', 'massage 23/1023', NULL),
('9708-42677', '21/10/2023', 'WINYI ROBERT', '0784516717', '[{\"Id\":\"S-17\",\"productName\":\"full therapy\",\"quantity\":1,\"totalCost\":20000,\"unitCost\":20000}]', 20000, 0, 'fullypaid', 'Cash', 'massage 21/1023', NULL),
('9792-61822', '13/10/2023', 'RICHARD RICHARD', '0701303137', '[{\"Id\":\"S-75\",\"productName\":\"Bio tuner and vibrator therapy\",\"quantity\":1,\"totalCost\":10000,\"unitCost\":10000}]', 10000, 0, 'fullypaid', 'Cash', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `equatorialmassagesubscriptions`
--

CREATE TABLE `equatorialmassagesubscriptions` (
  `subscriptionId` varchar(10) NOT NULL,
  `subscriptiondate` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `clientnames` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `clientcontact` varchar(12) NOT NULL,
  `amountPaid` float NOT NULL,
  `balance` float NOT NULL,
  `notes` text,
  `subscriptionstatus` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialmassagesubscriptionusage`
--

CREATE TABLE `equatorialmassagesubscriptionusage` (
  `subscriptionId` varchar(15) NOT NULL,
  `serviceDate` varchar(10) NOT NULL,
  `serviceOfferedId` varchar(15) NOT NULL,
  `amountSpent` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialncts`
--

CREATE TABLE `equatorialncts` (
  `transactionId` int NOT NULL,
  `date` varchar(30) NOT NULL,
  `clientnames` text NOT NULL,
  `clientcontact` varchar(15) NOT NULL,
  `iteminid` int NOT NULL,
  `quantityin` float NOT NULL,
  `unitsin` varchar(10) NOT NULL,
  `itemoutid` int NOT NULL,
  `quantityout` float NOT NULL,
  `unitsout` varchar(10) NOT NULL,
  `notes` text NOT NULL,
  `authorizedby` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialprojectsclientpaymentplans`
--

CREATE TABLE `equatorialprojectsclientpaymentplans` (
  `receiptNumber` varchar(15) NOT NULL,
  `paymentPlan` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialProjectsInventory`
--

CREATE TABLE `equatorialProjectsInventory` (
  `productId` varchar(10) NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialProjectsInventoryrecords`
--

CREATE TABLE `equatorialProjectsInventoryrecords` (
  `date` varchar(20) NOT NULL,
  `recordcategory` varchar(20) NOT NULL DEFAULT 'incoming',
  `itemid` varchar(10) NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialProjectsSales`
--

CREATE TABLE `equatorialProjectsSales` (
  `saleId` int DEFAULT NULL,
  `receiptNumber` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `saleDate` varchar(20) NOT NULL,
  `customerNames` varchar(100) NOT NULL,
  `customerContact` varchar(15) NOT NULL,
  `itemsSold` varchar(500) NOT NULL,
  `totalAmount` float NOT NULL,
  `balance` float NOT NULL,
  `paymentStatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `additionalinfo` text,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialprojectssalespayments`
--

CREATE TABLE `equatorialprojectssalespayments` (
  `receiptNumber` varchar(10) NOT NULL,
  `paymentdate` varchar(20) NOT NULL,
  `amountPaid` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `paymentMethod` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialshopexpenditure`
--

CREATE TABLE `equatorialshopexpenditure` (
  `expenditureid` int NOT NULL,
  `date` varchar(50) NOT NULL,
  `expenditurecategory` text NOT NULL,
  `expenditurename` text NOT NULL,
  `expendituredescription` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `expenditurecost` float NOT NULL,
  `amountspent` float NOT NULL,
  `balance` float NOT NULL,
  `paymentmethod` text NOT NULL,
  `paymentstatus` text NOT NULL,
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialshopexpensespayments`
--

CREATE TABLE `equatorialshopexpensespayments` (
  `paymentdate` varchar(20) NOT NULL,
  `expenseid` int NOT NULL,
  `additionalnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `amountpaid` float NOT NULL,
  `paymentmethod` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialShopInventory`
--

CREATE TABLE `equatorialShopInventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialShopInventory`
--

INSERT INTO `equatorialShopInventory` (`productId`, `quantityinstock`, `munits`) VALUES
(7012, 35, 'Pcs');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialshopinventoryrecords`
--

CREATE TABLE `equatorialshopinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `recordcategory` varchar(20) NOT NULL DEFAULT 'incoming',
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `equatorialShopSales`
--

CREATE TABLE `equatorialShopSales` (
  `saleId` int DEFAULT NULL,
  `receiptNumber` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `saleDate` varchar(20) NOT NULL,
  `customerNames` varchar(100) NOT NULL,
  `customerContact` varchar(15) NOT NULL,
  `itemsSold` varchar(500) NOT NULL,
  `totalAmount` float NOT NULL,
  `balance` float NOT NULL,
  `paymentStatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `additionalinfo` text,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialShopSales`
--

INSERT INTO `equatorialShopSales` (`saleId`, `receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`, `transactionID`) VALUES
(NULL, '1073-42180', '26/10/2023', ' ', '', '[{\"id\":7012,\"name\":\"test22\",\"unitCost\":0,\"discount\":0,\"quantity\":4,\"totalCost\":0}]', 0, 0, 'fullypaid', 'Cash', '', NULL),
(NULL, '6684-96638', '18/10/2023', 'ZZIWA RAYMOND', '0701303137', '[{\"id\":7012,\"name\":\"test22\",\"unitCost\":0,\"discount\":0,\"quantity\":3,\"totalCost\":0}]', 0, 0, 'unpaid', '', '', NULL),
(NULL, '7040-36692', '18/10/2023', 'ZZIWA RAYMOND', '0701303137', '[{\"id\":7012,\"name\":\"test22\",\"unitCost\":0,\"discount\":0,\"quantity\":3,\"totalCost\":0}]', 0, 0, 'unpaid', '', '', NULL),
(NULL, '7495-65310', '18/10/2023', 'SAM PATRICK', '0701303137', '[{\"id\":7012,\"name\":\"test22\",\"unitCost\":0,\"discount\":0,\"quantity\":5,\"totalCost\":0}]', 0, 0, 'unpaid', '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `equatorialshopsalespayments`
--

CREATE TABLE `equatorialshopsalespayments` (
  `receiptNumber` varchar(10) NOT NULL,
  `paymentdate` varchar(20) NOT NULL,
  `itemin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `quantityin` float DEFAULT NULL,
  `units` varchar(5) DEFAULT NULL,
  `amountPaid` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `paymentMethod` varchar(20) NOT NULL,
  `transactionId` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `exhibitionincome`
--

CREATE TABLE `exhibitionincome` (
  `date` varchar(30) NOT NULL,
  `exhibitionId` int NOT NULL,
  `amountRecieved` float NOT NULL,
  `DeliveredBy` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `RecievedBy` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `exhibitions`
--

CREATE TABLE `exhibitions` (
  `id` int NOT NULL,
  `exhibitionname` varchar(100) NOT NULL,
  `date` varchar(50) NOT NULL,
  `itemsrecord` text NOT NULL,
  `filledfrombranch` varchar(50) NOT NULL,
  `filledbydepartment` varchar(50) NOT NULL,
  `filledbyrole` varchar(50) NOT NULL,
  `filledbyuser` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `exhibitions`
--

INSERT INTO `exhibitions` (`id`, `exhibitionname`, `date`, `itemsrecord`, `filledfrombranch`, `filledbydepartment`, `filledbyrole`, `filledbyuser`, `status`) VALUES
(1, 'BUBU', '2023-07-02', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"2\",\"itemQuantitySold\":\"1\",\"itemQuantityReturned\":\"0\",\"Discrepancies\":1,\"mUnits\":\"KG\"}]', 'masanafu', 'production', 'custodian', 'namugangamaria', 'postexhibition'),
(2, 'ZAZA', '2023-08-30', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"5\",\"itemQuantitySold\":\"0\",\"itemQuantityReturned\":\"0\",\"Discrepancies\":\"0\",\"mUnits\":\"KG\"}]', 'masanafu', 'production', 'custodian', 'namugangamaria', 'preexhibition');

-- --------------------------------------------------------

--
-- Table structure for table `exhibitionsales`
--

CREATE TABLE `exhibitionsales` (
  `receiptNumber` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `exhibitionId` int NOT NULL,
  `saleDate` varchar(20) NOT NULL,
  `customerNames` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `customerContact` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `itemsSold` varchar(500) NOT NULL,
  `totalAmount` float NOT NULL,
  `balance` float NOT NULL,
  `paymentStatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `additionalinfo` text,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `exhibitionsales`
--

INSERT INTO `exhibitionsales` (`receiptNumber`, `exhibitionId`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`, `transactionID`) VALUES
('1531-49463', 2, '21/08/2023', ' ', '', '[{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', '', '', NULL),
('3656-67189', 2, '21/08/2023', ' ', '', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":6,\"name\":\"Stevia 50 grams\",\"unitCost\":8000,\"discount\":0,\"quantity\":1,\"totalCost\":8000}]', 23000, 0, 'fullypaid', '', '', NULL),
('6591-48885', 2, '21/08/2023', ' ', '', '[{\"id\":6,\"name\":\"Stevia 50 grams\",\"unitCost\":8000,\"discount\":0,\"quantity\":1,\"totalCost\":8000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 23000, 0, 'fullypaid', 'MTN MoMo', '', '654635474573001'),
('7002-21277', 2, '21/08/2023', ' ', '', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 7500, 0, 'fullypaid', 'Cash', '', NULL),
('7384-91035', 1, '21/08/2023', ' ', '', '[{\"id\":4,\"name\":\"Makuna 50 grams\",\"unitCost\":3500,\"discount\":0,\"quantity\":1,\"totalCost\":3500}]', 3500, 0, 'fullypaid', '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `expensesreceipts`
--

CREATE TABLE `expensesreceipts` (
  `expenditureid` int NOT NULL,
  `receiptimage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `expensesreceipts`
--

INSERT INTO `expensesreceipts` (`expenditureid`, `receiptimage`) VALUES
(13, 'receipt_uploads/3cf6862cea60f535166e0d07f326fb85');

-- --------------------------------------------------------

--
-- Table structure for table `externalreceipts`
--

CREATE TABLE `externalreceipts` (
  `receiptnumber` varchar(20) NOT NULL,
  `receiptdate` varchar(20) NOT NULL,
  `itemsattached` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `receiptissuedfrombranch` varchar(50) NOT NULL,
  `receiptissuedfromdepartment` varchar(50) NOT NULL,
  `receiptissuedby` varchar(50) NOT NULL,
  `receiptdeliveredtobranch` varchar(50) NOT NULL,
  `receiptdeliveredtodepartment` varchar(50) NOT NULL,
  `receiptdeliveredtopersonnel` varchar(50) NOT NULL,
  `receiptpaymentstatus` varchar(20) NOT NULL,
  `receiptdeliverystatus` varchar(20) NOT NULL,
  `additionalinfo` text,
  `clientfirstname` text NOT NULL,
  `clientmiddlename` text,
  `clientlastname` text NOT NULL,
  `clientcontact` varchar(15) NOT NULL,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `externalreceipts`
--

INSERT INTO `externalreceipts` (`receiptnumber`, `receiptdate`, `itemsattached`, `receiptissuedfrombranch`, `receiptissuedfromdepartment`, `receiptissuedby`, `receiptdeliveredtobranch`, `receiptdeliveredtodepartment`, `receiptdeliveredtopersonnel`, `receiptpaymentstatus`, `receiptdeliverystatus`, `additionalinfo`, `clientfirstname`, `clientmiddlename`, `clientlastname`, `clientcontact`, `transactionID`) VALUES
('2164-87460', '16/07/2023', '[{\"id\":4,\"name\":\"Makuna 50 grams\",\"unitCost\":3500,\"discount\":0,\"quantity\":1,\"totalCost\":3500},{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'unpaid', 'pending', '', 'Zziwa', NULL, 'Raymond', '111-222-333-444', NULL),
('2647-21869', '16/07/2023', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'unpaid', 'delivered', 'testing', 'zz', NULL, 'rr', '333-444-555', NULL),
('2764-99421', '11/10/2023', '[{\"id\":\"PJ-39\",\"name\":\"Stand\",\"unitCost\":120000,\"discount\":0,\"quantity\":1,\"totalCost\":120000}]', 'equatorial', 'shop', 'bridget', 'masanafu', 'shop', 'za1', 'fullypaid', 'pending', '', 'BRIAN', NULL, 'HOME', '0701303137', NULL),
('2912-94093', '7/19/2023', '[{\"id\":\"PJ-26\",\"name\":\"Biomass Dryer (BIG)\",\"unitCost\":500000,\"discount\":0,\"quantity\":2,\"totalCost\":1000000},{\"id\":\"PJ-39\",\"name\":\"Stand\",\"unitCost\":120000,\"discount\":0,\"quantity\":1,\"totalCost\":120000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'fullypaid', 'pending', '', 'Lwasa', NULL, 'Reagan Peter', '+256704259828', NULL),
('5520-11215', '16/07/2023', '[{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":5,\"name\":\"Avocado Oil\",\"unitCost\":3500,\"discount\":0,\"quantity\":1,\"totalCost\":3500}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'partiallypaid', 'pending', '', 'Zziwa', NULL, 'Raymond', '111-222-333-444', NULL),
('6717-35126', '7/19/2023', '[{\"id\":\"PJ-26\",\"name\":\"Biomass Dryer (BIG)\",\"unitCost\":500000,\"discount\":0,\"quantity\":1,\"totalCost\":500000},{\"id\":\"PJ-39\",\"name\":\"Stand\",\"unitCost\":120000,\"discount\":0,\"quantity\":1,\"totalCost\":120000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'fullypaid', 'pending', '', 'Lwasa', NULL, 'Reagan Peter', '+256704259828', NULL),
('8408-31695', '7/19/2023', '[{\"id\":\"PJ-26\",\"name\":\"Biomass Dryer (BIG)\",\"unitCost\":500000,\"discount\":0,\"quantity\":2,\"totalCost\":1000000},{\"id\":\"PJ-39\",\"name\":\"Stand\",\"unitCost\":120000,\"discount\":0,\"quantity\":1,\"totalCost\":120000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'partiallypaid', 'pending', '', 'Lwasa', NULL, 'Reagan Peter', '+256704259828', NULL),
('8690-12685', '17/07/2023', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":40,\"totalCost\":600000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'fullypaid', 'delivered', '', 'sss', NULL, 'aaaa', '1223345', NULL),
('9973-72674', '16/07/2023', '[{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'fullypaid', 'pending', '', 'Zziwa', NULL, 'Raymond', '111-222-333-444', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `farm`
--

CREATE TABLE `farm` (
  `batchno` varchar(20) NOT NULL,
  `items` varchar(500) NOT NULL,
  `stage` text NOT NULL,
  `stagestartedon` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `farm`
--

INSERT INTO `farm` (`batchno`, `items`, `stage`, `stagestartedon`) VALUES
('B-1696054', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"15\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Flax seeds\",\"itemQuantity\":\"20\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-06-07'),
('B-1696054', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"15\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"13\",\"Damages\":2},{\"itemName\":\"Flax seeds\",\"itemQuantity\":\"20\",\"mUnits\":\"Pcs\",\"itemNewQuantity\":\"18\",\"Damages\":2}]', 'nursery', '2023-06-09'),
('B-1618867', '[{\"itemName\":\"Fenugreek seeds\",\"itemQuantity\":\"45\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"23\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-06-06'),
('B-1440457', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Black seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-06-19'),
('B-1334553', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"50\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"47\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-09-03');

-- --------------------------------------------------------

--
-- Table structure for table `farmrequests`
--

CREATE TABLE `farmrequests` (
  `requisitionid` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `batchno` varchar(20) NOT NULL,
  `requesterbranch` varchar(100) NOT NULL,
  `requesterdepartment` varchar(50) NOT NULL,
  `requesterrole` varchar(50) NOT NULL,
  `requestedby` varchar(50) NOT NULL,
  `requestedfrombranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recieverdepartment` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recieverrole` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recievedby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `additionalinfo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `itemsrequested` text NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `farmrequests`
--

INSERT INTO `farmrequests` (`requisitionid`, `date`, `batchno`, `requesterbranch`, `requesterdepartment`, `requesterrole`, `requestedby`, `requestedfrombranch`, `recieverdepartment`, `recieverrole`, `recievedby`, `additionalinfo`, `itemsrequested`, `status`, `comment`) VALUES
('RFM-148607', '2023-09-03', 'B-1334553', 'buwama', 'farm', 'farmmanager', 'za9', NULL, NULL, NULL, NULL, 'buwama test', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"50\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"47\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-594041', '2023-05-14', 'B-1370114', 'masanafu', 'farm', 'farmmanager', 'zray1', 'masanafu', 'production', 'custodian', 'namugangamaria', 'Testing', '[{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"10\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Amaranth seeds\",\"itemQuantity\":\"35\",\"mUnits\":\"Pcs\"}]', 'approved', ''),
('RFM-786815', '2023-06-19', 'B-1440457', 'masanafu', 'farm', 'farmmanager', 'zray1', NULL, NULL, NULL, NULL, '', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Black seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-1617354', '2023-06-06', 'B-1618867', 'masanafu', 'farm', 'farmmanager', 'zray1', NULL, NULL, NULL, NULL, '', '[{\"itemName\":\"Fenugreek seeds\",\"itemQuantity\":\"45\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"23\",\"mUnits\":\"Pcs\"}]', 'approved', NULL),
('RFM-875813', '2023-06-05', 'B-1696054', 'masanafu', 'farm', 'farmmanager', 'zray1', 'masanafu', 'production', 'custodian', 'namugangamaria', 'For the equatorial order', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"15\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Flax seeds\",\"itemQuantity\":\"20\",\"mUnits\":\"Pcs\"}]', 'approved', ''),
('RFM-1633881', '2023-06-05', 'B-329344', 'masanafu', 'farm', 'farmmanager', 'zray1', 'masanafu', 'production', 'custodian', 'namugangamaria', '', '[{\"itemName\":\"Amaranth seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Black seeds\",\"itemQuantity\":\"7\",\"mUnits\":\"Pcs\"}]', 'approved', ''),
('RFM-554520', '2023-05-14', 'B-870743', 'masanafu', 'farm', 'farmmanager', 'zray1', 'masanafu', 'production', 'manager', 'zray', 'New Request', '[{\"itemName\":\"Chill seeds\",\"itemQuantity\":\"20\",\"mUnits\":\"KG\"}]', 'rejected', '');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`name`) VALUES
('Amaranth seeds'),
('Argan oil'),
('Bio tuners'),
('Black pepper seeds'),
('Black seeds'),
('Blenders'),
('Borax'),
('Candlenut oil'),
('Castor oil'),
('Cedar oil'),
('Chia seeds'),
('Chill seeds'),
('Cinnamon oil'),
('Citronella oil'),
('Clove seeds'),
('Coconut oil'),
('Coffee oil'),
('Cucumber seeds'),
('Distillers'),
('Eucalyptus globulus oil'),
('Fennel seeds'),
('Fenugreek seeds'),
('Flax seeds'),
('Frankinscence oil'),
('Geranium'),
('Ginger oil'),
('Gypsum powders'),
('Hand massagers'),
('Himalayan lamps'),
('Jazmine oil'),
('Jojoba oil'),
('Lavender oil'),
('Lemon Eucalyptus oil'),
('Lemon grass oil'),
('Lemon oil'),
('Maringa Powder'),
('Mint oil'),
('Mujaja oil'),
('Mujaja seeds'),
('Nebulizers'),
('Neem oil'),
('Neem seeds'),
('Orange oil'),
('Oregano oil'),
('Ovocado oil'),
('Pine oil'),
('Pumpkin oil'),
('Pumpkin seeds'),
('Rosehip oil'),
('Rosemary oil'),
('Sage oil'),
('Sandle wood oil'),
('Sesame oil'),
('Solar lamps big'),
('Solar lamps small'),
('Stand'),
('Steamer'),
('Sugarcane machine'),
('Sunflower oil'),
('Sunflower seeds'),
('Super seeds'),
('Tea tree oil'),
('Thyme oil'),
('Vitamin C oil'),
('Water pumps'),
('Ylang Ylang oil');

-- --------------------------------------------------------

--
-- Table structure for table `inventorytransactions`
--

CREATE TABLE `inventorytransactions` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` varchar(20) NOT NULL,
  `inventoryname` varchar(100) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `additionalnotes` varchar(500) DEFAULT NULL,
  `sourcebranch` varchar(100) NOT NULL,
  `broughtby` varchar(50) NOT NULL,
  `destinationbranch` varchar(100) NOT NULL,
  `recievedby` varchar(50) NOT NULL,
  `quantity` float NOT NULL,
  `actualquantity` float NOT NULL,
  `damages` float DEFAULT NULL,
  `expectedoutput` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `measurementunit` varchar(10) NOT NULL,
  `category` varchar(50) NOT NULL,
  `authorizedby` varchar(100) NOT NULL,
  `authorizedbyrole` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `branch` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inventorytransactions`
--

INSERT INTO `inventorytransactions` (`id`, `date`, `inventoryname`, `reason`, `additionalnotes`, `sourcebranch`, `broughtby`, `destinationbranch`, `recievedby`, `quantity`, `actualquantity`, `damages`, `expectedoutput`, `measurementunit`, `category`, `authorizedby`, `authorizedbyrole`, `branch`, `department`) VALUES
('T-masanafu-namungoona-13868', '2023-04-11', 'Eucalyptus globulus oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 267.92, 267.95, -0.03, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-106191', '2023-04-11', 'Lemon Eucalyptus oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 124.8, 122.8, 2, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-141722', '2023-04-11', 'Lemon Eucalyptus oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 86.255, 85.255, 1, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-94221', '2023-04-11', 'Pine oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 313, 311, 2, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-62087', '2023-04-11', 'Coconut oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 666, 664, 2, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-110579', '2023-05-10', 'Candlenut oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda', 500, 500, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-143325', '2023-05-11', 'Castor oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda', 450, 448, 2, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-80387', '2023-05-15', 'Pumpkin oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 660, 660, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-156384', '2023-05-15', 'Candlenut oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 672.7, 672.7, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-53203', '2023-05-15', 'Sunflower oil', 'restocking', '', 'masanafu', '', 'namungoona', 'Brenda ', 1980.7, 1980.7, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-100670', '2023-05-15', 'Sunflower oil', 'restocking', '', 'masanafu', '', 'namungoona', 'Brenda ', 1980.7, 1980.7, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-101721', '2023-05-15', 'Sunflower oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 1980.7, 1980.7, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-157792', '2023-05-15', 'Coconut oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 677, 677, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-21328', '2023-05-15', 'Eucalyptus globulus oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 915, 915, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-106556', '2023-05-15', 'Eucalyptus globulus oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 915, 915, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-173450', '2023-05-15', 'Rosemary oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 101.4, 101.4, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-157143', '2023-05-15', 'Pine oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 604.1, 604.1, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-27911', '2023-05-15', 'Neem oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 57, 57, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-external-supplier-namungoona-45438', '2023-05-15', 'Borax', 'restocking', '', 'external-supplier', 'Boda boda man', 'namungoona', 'Brenda ', 50, 50, 0, NULL, 'KG', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-external-supplier-namungoona-174698', '2023-05-15', 'Mint oil', 'restocking', '', 'external-supplier', 'Sammy', 'namungoona', 'Brenda ', 4.5, 4.5, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-external-supplier-namungoona-7226', '2023-05-15', 'Mint oil', 'restocking', '', 'external-supplier', 'Sammy', 'namungoona', 'Brenda ', 4.5, 4.5, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-111786', '2023-05-15', 'Lemon Eucalyptus oil', 'restocking', '', 'masanafu', 'Lutalo', 'namungoona', 'Brenda ', 57, 57, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-external-supplier-namungoona-60735', '2023-05-15', 'Himalayan lamps', 'restocking', '', 'external-supplier', 'Nicholas ', 'namungoona', 'Brenda ', 14, 14, 0, NULL, 'Pcs', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-masanafu-namungoona-13686', '2023-05-15', 'Chia seeds', 'restocking', '', 'masanafu', 'Boda boda man', 'namungoona', 'Brenda ', 25.8, 25.8, 0, NULL, 'KG', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-external-supplier-namungoona-166431', '2023-05-15', 'Lavender oil', 'restocking', '', 'external-supplier', 'Sammy', 'namungoona', 'Brenda ', 2, 2, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-equatorial-namungoona-76343', '2023-05-15', 'Lemon Eucalyptus oil', 'restocking', '', 'equatorial', 'Sammy', 'namungoona', 'Brenda ', 10, 10, 0, NULL, 'L', 'incoming', 'nakiwalabrenda', '', 'namungoona', 'inventory'),
('T-external-supplier-masanafu-152504', '2023-06-24', 'Black seeds', 'restocking', '', 'external-supplier', 'Lutalo', 'masanafu', 'Manager', 65.8, 65.8, 0, NULL, 'KG', 'incoming', 'zray', 'manager', 'masanafu', 'production');

-- --------------------------------------------------------

--
-- Table structure for table `labelledinventorydeliveryrecords`
--

CREATE TABLE `labelledinventorydeliveryrecords` (
  `deliveryId` int NOT NULL,
  `date` varchar(30) NOT NULL,
  `itemId` int NOT NULL,
  `deliverynotenumber` varchar(25) NOT NULL,
  `quantitydelivered` float NOT NULL,
  `units` varchar(10) NOT NULL,
  `deliveredto` text NOT NULL,
  `otherdestinationinfo` text,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `labelledinventorydeliveryrecords`
--

INSERT INTO `labelledinventorydeliveryrecords` (`deliveryId`, `date`, `itemId`, `deliverynotenumber`, `quantitydelivered`, `units`, `deliveredto`, `otherdestinationinfo`, `notes`) VALUES
(3, '19/10/2023', 147, '487', 26, 'Pcs', 'Equatorial Custodian', NULL, 'Sent some days ago'),
(4, '19/10/2023', 26, '487', 111, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(5, '19/10/2023', 25, '487', 46, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(6, '19/10/2023', 49, '487', 66, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(7, '19/10/2023', 98, '487', 100, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(8, '19/10/2023', 149, '487', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(9, '19/10/2023', 75, '487', 33, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(10, '19/10/2023', 150, '487', 16, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(11, '19/10/2023', 82, '487', 25, 'Pcs', 'Equatorial Custodian', NULL, 'Last seven pieces delivered today'),
(12, '19/10/2023', 32, '487', 17, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(13, '19/10/2023', 148, '487', 13, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago'),
(14, '19/10/2023', 44, '487', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(15, '19/10/2023', 145, '487', 57, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(16, '19/10/2023', 144, '487', 22, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(17, '19/10/2023', 65, '487', 22, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(18, '19/10/2023', 59, '487', 17, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(19, '19/10/2023', 38, '487', 16, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(20, '19/10/2023', 62, '488', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(21, '19/10/2023', 29, '488', 23, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(22, '19/10/2023', 1041, '488', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(23, '19/10/2023', 72, '488', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(24, '19/10/2023', 1072, '488', 11, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(25, '19/10/2023', 69, '488', 4, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(26, '19/10/2023', 1038, '488', 21, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(27, '19/10/2023', 87, '488', 11, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(28, '19/10/2023', 118, '488', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(29, '19/10/2023', 132, '488', 11, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(30, '19/10/2023', 115, '488', 21, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(31, '19/10/2023', 1029, '488', 21, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(32, '19/10/2023', 146, '488', 42, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(33, '19/10/2023', 19, '488', 49, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(34, '19/10/2023', 7003, '488', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(35, '19/10/2023', 142, '488', 20, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(36, '19/10/2023', 78, '850', 5, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(37, '19/10/2023', 100, '850', 75, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(38, '19/10/2023', 1054, '850', 39, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(39, '19/10/2023', 103, '850', 28, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(40, '19/10/2023', 1071, '850', 35, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(41, '19/10/2023', 142, '850', 48, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(42, '19/10/2023', 1038, '850', 30, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(43, '19/10/2023', 123, '850', 7, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(44, '19/10/2023', 7013, '850', 30, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(45, '19/10/2023', 148, '251', 42, 'Pcs', 'Equatorial Custodian', NULL, ''),
(46, '19/10/2023', 1072, '251', 55, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(47, '19/10/2023', 118, '251', 23, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(48, '19/10/2023', 137, '712', 50, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 16th October '),
(49, '20/10/2023', 7015, '490', 36, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(50, '20/10/2023', 34, '490', 23, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(51, '20/10/2023', 40, '490', 50, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(52, '20/10/2023', 54, '490', 75, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(53, '20/10/2023', 73, '490', 31, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(54, '20/10/2023', 123, '490', 25, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(55, '20/10/2023', 47, '490', 58, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(56, '20/10/2023', 1026, '490', 4, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(57, '20/10/2023', 1027, '490', 8, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(58, '20/10/2023', 45, '252', 25, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(59, '20/10/2023', 53, '252', 40, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(60, '20/10/2023', 72, '252', 35, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(61, '20/10/2023', 101, '252', 55, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(62, '20/10/2023', 107, '252', 25, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(63, '20/10/2023', 120, '252', 57, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(64, '20/10/2023', 153, '252', 14, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(65, '20/10/2023', 1061, '252', 8, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered some days ago '),
(66, '20/10/2023', 25, '499', 19, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 19th October '),
(67, '20/10/2023', 27, '499', 43, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 19th October '),
(68, '20/10/2023', 28, '499', 56, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 19th October '),
(69, '20/10/2023', 102, '499', 32, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 19th October '),
(70, '20/10/2023', 146, '499', 42, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 19th October '),
(71, '20/10/2023', 28, '499', 11, 'Pcs', 'Equatorial Custodian', NULL, ''),
(72, '23/10/2023', 142, '263', 42, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(73, '23/10/2023', 7013, '500', 6, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(74, '23/10/2023', 1043, '500', 6, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(75, '23/10/2023', 115, '500', 11, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 22nd October '),
(76, '23/10/2023', 107, '263', 50, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(77, '23/10/2023', 102, '500', 11, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(78, '23/10/2023', 85, '500', 14, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(79, '23/10/2023', 79, '551', 64, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 22nd October '),
(80, '23/10/2023', 76, '500', 25, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(81, '23/10/2023', 72, '263', 4, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(82, '23/10/2023', 67, '263', 11, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(83, '23/10/2023', 66, '263', 26, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(84, '23/10/2023', 46, '500', 4, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(85, '23/10/2023', 37, '263', 15, 'Pcs', 'other', NULL, 'Delivered on 19th October '),
(86, '23/10/2023', 28, '500', 30, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(87, '23/10/2023', 87, '500', 30, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(88, '23/10/2023', 125, '500', 9, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 20th October '),
(89, '23/10/2023', 126, '500', 8, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(90, '23/10/2023', 137, '551', 50, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 22nd October '),
(91, '23/10/2023', 7061, '500', 8, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(92, '23/10/2023', 7017, '500', 28, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 21st October '),
(93, '23/10/2023', 70, '500', 19, 'Pcs', 'Equatorial Custodian', NULL, 'Last 2 pcs Delivered on 21st October '),
(94, '23/10/2023', 80, '500', 44, 'Pcs', 'Equatorial Custodian', NULL, ''),
(95, '23/10/2023', 20, '500', 46, 'Pcs', 'Equatorial Custodian', NULL, ''),
(96, '23/10/2023', 123, '263', 30, 'Pcs', 'Equatorial Custodian', NULL, ''),
(97, '23/10/2023', 40, '500', 12, 'Pcs', 'Equatorial Custodian', NULL, ''),
(98, '23/10/2023', 80, '500', 44, 'Pcs', 'Equatorial Custodian', NULL, ''),
(99, '23/10/2023', 7013, '263', 14, 'Pcs', 'Equatorial Custodian', NULL, ''),
(100, '23/10/2023', 7013, '255', 12, 'Pcs', 'Equatorial Custodian', NULL, ''),
(101, '23/10/2023', 72, '263', 4, 'Pcs', 'Equatorial Custodian', NULL, ''),
(102, '23/10/2023', 1055, '263', 40, 'Pcs', 'Equatorial Custodian', NULL, ''),
(103, '23/10/2023', 40, '500', 12, 'Pcs', 'Equatorial Custodian', NULL, ''),
(104, '24/10/2023', 31, '265', 47, 'Pcs', 'Equatorial Custodian', NULL, ''),
(105, '24/10/2023', 82, '552', 40, 'Pcs', 'Equatorial Custodian', NULL, ''),
(106, '24/10/2023', 116, '265', 43, 'Pcs', 'Equatorial Custodian', NULL, ''),
(107, '24/10/2023', 35, '265', 18, 'Pcs', 'Equatorial Custodian', NULL, ''),
(108, '24/10/2023', 77, '552', 47, 'Pcs', 'Equatorial Custodian', NULL, ''),
(109, '27/10/2023', 100, '270', 10, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(110, '27/10/2023', 62, '270', 20, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(111, '27/10/2023', 66, '270', 14, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(112, '27/10/2023', 7013, '270', 23, 'Pcs', 'Equatorial Custodian', NULL, '10 transferred on 26th, 13 transferred 27th October '),
(113, '27/10/2023', 115, '270', 61, 'Pcs', 'Equatorial Custodian', NULL, '46 transferred on 26th, 15 transferred previously '),
(114, '27/10/2023', 1077, '270', 19, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(115, '27/10/2023', 42, '270', 12, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(116, '27/10/2023', 80, '557', 23, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(117, '27/10/2023', 33, '557', 12, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(118, '27/10/2023', 140, '267', 31, 'Pcs', 'Equatorial Custodian', NULL, '20 transferred on 26th October, 11 was transferred previously '),
(119, '27/10/2023', 147, '267', 24, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(120, '27/10/2023', 146, '556', 50, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(121, '27/10/2023', 142, '267', 33, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred some days ago '),
(122, '27/10/2023', 142, '271', 23, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th and 27th '),
(123, '27/10/2023', 24, '271', 30, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(124, '27/10/2023', 66, '271', 2, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 26th October '),
(125, '27/10/2023', 51, '267', 71, 'Pcs', 'Equatorial Custodian', NULL, '31 transferred on 26th October and the rest previously on 26th October '),
(126, '27/10/2023', 137, '554', 47, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred some days ago '),
(127, '27/10/2023', 7014, '267', 25, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred some days ago '),
(128, '27/10/2023', 33, '558', 5, 'Pcs', 'Equatorial Custodian', NULL, 'To massage unit'),
(129, '27/10/2023', 65, '258', 2, 'Pcs', 'Equatorial Custodian', NULL, 'Delivered on 26th October '),
(130, '27/10/2023', 66, '270', 8, 'Pcs', 'Equatorial Custodian', NULL, 'Transferred on 25th and Completes all 26 returned to Namungoona and brought back ');

-- --------------------------------------------------------

--
-- Table structure for table `machinery`
--

CREATE TABLE `machinery` (
  `id` int NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `machinery`
--

INSERT INTO `machinery` (`id`, `name`) VALUES
(1, 'Soap Machine'),
(2, 'Stand'),
(3, 'Sandal Machine'),
(4, 'Charcoal Lighter Machine'),
(5, 'Biomass Dryer'),
(6, 'Water pump');

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenfarmbatches`
--

CREATE TABLE `masanafuchickenfarmbatches` (
  `batchnumber` varchar(10) NOT NULL,
  `date` varchar(15) NOT NULL,
  `numberofchicken` int NOT NULL,
  `chickenunitprice` float NOT NULL,
  `totalspent` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `status` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'active',
  `chickenalive` int NOT NULL,
  `chickendead` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenfarmbatches`
--

INSERT INTO `masanafuchickenfarmbatches` (`batchnumber`, `date`, `numberofchicken`, `chickenunitprice`, `totalspent`, `notes`, `status`, `chickenalive`, `chickendead`) VALUES
('CB-3206', '29/06/2023', 477, 10000, 4770000, '', 'active', 473, 4);

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenfarmexpenditure`
--

CREATE TABLE `masanafuchickenfarmexpenditure` (
  `expenditureid` int NOT NULL,
  `date` varchar(50) NOT NULL,
  `expenditurename` text NOT NULL,
  `expendituredescription` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `expenditurecost` float NOT NULL,
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenfarmexpenditure`
--

INSERT INTO `masanafuchickenfarmexpenditure` (`expenditureid`, `date`, `expenditurename`, `expendituredescription`, `expenditurecost`, `createdat`) VALUES
(1, '13/09/2023', 'test expense', 'test expense', 15000, '2023-09-13 11:10:53'),
(2, '13/09/2023', 'test expense 2', 'test expense 2', 5000, '2023-09-13 11:12:56');

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenfeeds`
--

CREATE TABLE `masanafuchickenfeeds` (
  `productId` int NOT NULL,
  `productName` varchar(100) NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenfeeds`
--

INSERT INTO `masanafuchickenfeeds` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
(1, 'Jubail', 4200, 0),
(2, 'Lime', 500, 0),
(3, 'Soya Beans', 2800, 0),
(4, 'Broken Corn', 1900, 0),
(5, 'Brand', 750, 0),
(6, 'Mukuna Powder', 10000, 0),
(7, 'Mukuna Seeds', 10000, 0),
(8, 'Mixed Feed', 0, 0),
(10, 'Sprouts ', 10000, 0),
(11, 'Sprouts  powder ', 10000, 0),
(12, 'Saffron ', 1000000, 0),
(13, 'Egg yolk ', 200000, 0),
(14, 'Diatomite ', 50000, 0),
(15, 'Diatomite ', 50000, 0),
(16, 'Diatomite ', 50000, 0),
(17, 'Diatomite ', 50000, 0),
(18, 'Mucuna broken (roasted)', 20000, 0),
(19, 'Sunflower ', 800, 0);

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenfeedsinventory`
--

CREATE TABLE `masanafuchickenfeedsinventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenfeedsinventory`
--

INSERT INTO `masanafuchickenfeedsinventory` (`productId`, `quantityinstock`, `munits`) VALUES
(1, 115, 'Kgs'),
(2, 226, 'Kgs'),
(3, 310, 'Kgs'),
(4, 540, 'Kgs'),
(5, 80, 'Kgs'),
(6, 424, 'Kgs'),
(7, 638, 'Kgs'),
(8, 150, 'Kgs'),
(9, 1280, 'Kgs');

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenfeedsinventoryrecords`
--

CREATE TABLE `masanafuchickenfeedsinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenfeedsinventoryrecords`
--

INSERT INTO `masanafuchickenfeedsinventoryrecords` (`date`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('28/08/2023', 1, 15, 'Kgs', 'external', 'Bought', ''),
('28/08/2023', 2, 45, 'Kgs', 'external', 'Bought from outside shop', ''),
('28/08/2023', 3, 4, 'Kgs', 'external', 'Bought from outside shop', ''),
('28/08/2023', 3, 36, 'Kgs', 'external', '', ''),
('28/08/2023', 4, 90, 'Kgs', 'external', '', ''),
('28/08/2023', 5, 80, 'Kgs', 'external', '', ''),
('28/08/2023', 6, 24, 'Kgs', 'custodian', '', 'Internal'),
('28/08/2023', 7, 438, 'Kgs', 'custodian', '', 'Internal'),
('28/08/2023', 8, 150, 'Kgs', 'custodian', '', 'Mixed'),
('03/09/2023', 9, 500, 'Kgs', 'external', 'init', ''),
('03/09/2023', 9, 780, 'Kgs', 'custodian', '', 'test'),
('9/14/2023', 1, 100, 'Kgs', 'Select Restock Source', '', 'From masanafu '),
('9/14/2023', 2, 181, 'Kgs', '', '', 'Purchased '),
('9/14/2023', 3, 270, 'Kgs', '', '', 'Purchased '),
('9/14/2023', 4, 450, 'Kgs', '', '', 'Purchased '),
('9/14/2023', 6, 400, 'Kgs', '', '', 'Masanafu production '),
('9/14/2023', 7, 200, 'Kgs', '', '', 'Masanafu production ');

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenmedicine`
--

CREATE TABLE `masanafuchickenmedicine` (
  `productId` int NOT NULL,
  `productName` varchar(100) NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenmedicine`
--

INSERT INTO `masanafuchickenmedicine` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
(1, 'Ashidox 100g', 8000, 0),
(3, 'chicken bomb 250mls', 5000, 0),
(8, 'vaccine of newcastle 10mls', 8500, 0),
(17, 'Chicken bomb litres ', 20000, 0),
(18, 'Neem oil  20ml', 20000, 0),
(19, 'Neem oil  20oml', 200000, 0),
(20, 'Oregano oil 10ml', 20000, 0),
(21, 'Cinnamon oil 20ml', 30000, 0),
(22, 'Thieves oil ', 30000, 0),
(25, 'Pine 1ltr', 200000, 0),
(27, 'Artimesia extract  1ltr', 50000, 0),
(28, 'Artimesia powder ', 60000, 0),
(29, 'Cedar spray  30ml', 20000, 0),
(30, 'Cedar spray  30ml', 20000, 0),
(31, 'Piperine ws dewormer 100g', 18000, 0),
(32, 'Glucose 250g', 6000, 0),
(33, 'Diatomite ', 50000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenmedicineinventory`
--

CREATE TABLE `masanafuchickenmedicineinventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenmedicineinventory`
--

INSERT INTO `masanafuchickenmedicineinventory` (`productId`, `quantityinstock`, `munits`) VALUES
(1, 4, 'Pcs'),
(3, -5, 'Pcs'),
(8, 0, 'Pcs'),
(17, 5, 'L'),
(29, 2, 'Pcs'),
(27, 1, 'L'),
(28, 2, 'Kgs'),
(32, 2, 'Grams');

-- --------------------------------------------------------

--
-- Table structure for table `masanafuchickenmedicineinventoryrecords`
--

CREATE TABLE `masanafuchickenmedicineinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuchickenmedicineinventoryrecords`
--

INSERT INTO `masanafuchickenmedicineinventoryrecords` (`date`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('28/08/2023', 1, 5, 'Pcs', 'external', 'Each piece was ugx 8000', ''),
('28/08/2023', 3, 1, 'Pcs', 'custodian', '', 'Got it from the masanafu shop'),
('28/08/2023', 8, 1, 'Pcs', 'external', '', ''),
('9/11/2023', 17, 5, 'L', 'external', 'From namungona', ''),
('9/11/2023', 29, 2, 'Pcs', 'external', 'From exhibition stock ', ''),
('9/11/2023', 27, 1, 'L', 'external', 'Namungona ', ''),
('9/11/2023', 28, 2, 'Kgs', 'external', 'Masanafu production ', ''),
('9/14/2023', 32, 2, 'Grams', 'external', 'Purchased ', '');

-- --------------------------------------------------------

--
-- Table structure for table `masanafushopexpenditure`
--

CREATE TABLE `masanafushopexpenditure` (
  `expenditureid` int NOT NULL,
  `date` varchar(50) NOT NULL,
  `expenditurecategory` text NOT NULL,
  `expenditurename` text NOT NULL,
  `expendituredescription` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `expenditurecost` float NOT NULL,
  `amountspent` float NOT NULL,
  `balance` float NOT NULL,
  `paymentmethod` text NOT NULL,
  `paymentstatus` text NOT NULL,
  `createdat` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafushopexpenditure`
--

INSERT INTO `masanafushopexpenditure` (`expenditureid`, `date`, `expenditurecategory`, `expenditurename`, `expendituredescription`, `expenditurecost`, `amountspent`, `balance`, `paymentmethod`, `paymentstatus`, `createdat`) VALUES
(1, '10/06/2023', 'utilities', 'Yaaka', 'Testing Data Collection Of Expenses Form', 150000, 150000, 0, 'MTN MoMo', 'fully paid', '2023-06-09 23:01:56'),
(2, '10/06/2023', 'professional services', 'Computer Technician', 'Computer technician to repair computer', 50000, 35000, 15000, 'Cash', 'partially paid', '2023-06-09 23:10:42'),
(3, '14/06/2023', 'utilities', 'Water bill MWSC', 'Paying water bill for the month of May', 35000, 35000, 0, 'Cash', 'fully paid', '2023-06-14 08:58:19'),
(5, '14/06/2023', 'professional services', 'Mechanic', 'Repairing the company truck', 550000, 550000, 0, 'Cash', 'fully paid', '2023-06-14 20:36:28'),
(6, '19/06/2023', 'utilities', 'Yaaka', 'Paying for Yaaka', 50000, 50000, 0, 'MTN MoMo', 'fully paid', '2023-06-19 15:24:16'),
(7, '19/06/2023', 'product transportation and delivery', 'Fuel', 'Fuel for Lutalo to deliver to namungoona', 75000, 75000, 0, 'Cash', 'fully paid', '2023-06-19 15:24:51'),
(8, '19/06/2023', 'product transportation and delivery', 'Fuel for delivery', 'Lutalo fuel', 100000, 100000, 0, 'Cash', 'fully paid', '2023-06-19 18:27:13'),
(9, '23/06/2023', 'utilities', 'Water', 'Water bill', 25000, 25000, 0, 'MTN MoMo', 'fully paid', '2023-06-22 23:45:19'),
(10, '26/06/2023', 'shop equipment', 'Computer Purchase', 'We purchased a mac book pro 2017 for the custodian', 2400000, 2400000, 0, 'Cash', 'fully paid', '2023-06-26 10:30:11'),
(11, '17/07/2023', 'utilities', 'Yaaka', 'Yaaka testing form dfsdfs', 250000, 200000, 50000, 'MTN MoMo', 'partially paid', '2023-07-17 14:23:43'),
(12, '17/07/2023', 'utilities', 'dfsdfs', 'dfs', 150000, 50000, 100000, 'MTN MoMo', 'partially paid', '2023-07-17 14:26:00'),
(13, '17/07/2023', 'utilities', 'Yaaka', 'Power for machines', 150000, 100000, 50000, 'Cash', 'partially paid', '2023-07-17 17:46:02');

-- --------------------------------------------------------

--
-- Table structure for table `masanafushopexpensespayments`
--

CREATE TABLE `masanafushopexpensespayments` (
  `paymentdate` varchar(20) NOT NULL,
  `expenseid` int NOT NULL,
  `additionalnotes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `amountpaid` float NOT NULL,
  `paymentmethod` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafushopexpensespayments`
--

INSERT INTO `masanafushopexpensespayments` (`paymentdate`, `expenseid`, `additionalnotes`, `amountpaid`, `paymentmethod`) VALUES
('10/06/2023', 2, 'Making partial payment', 10000, 'Cash'),
('19/06/2023', 7, 'Cleared Lutalo', 35000, 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `masanafuShopInventory`
--

CREATE TABLE `masanafuShopInventory` (
  `productId` int NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `masanafushopinventoryrecords`
--

CREATE TABLE `masanafushopinventoryrecords` (
  `date` varchar(20) NOT NULL,
  `recordcategory` varchar(20) NOT NULL DEFAULT 'incoming',
  `itemid` int NOT NULL,
  `quantityin` float NOT NULL,
  `munits` varchar(20) NOT NULL,
  `restocksource` varchar(50) NOT NULL,
  `externalsourcedetails` text,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `masanafuShopSales`
--

CREATE TABLE `masanafuShopSales` (
  `saleId` int DEFAULT NULL,
  `receiptNumber` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `saleDate` varchar(20) NOT NULL,
  `customerNames` varchar(100) NOT NULL,
  `customerContact` varchar(15) NOT NULL,
  `itemsSold` varchar(500) NOT NULL,
  `totalAmount` float NOT NULL,
  `balance` float NOT NULL,
  `paymentStatus` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `additionalinfo` text,
  `transactionID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `masanafushopsalespayments`
--

CREATE TABLE `masanafushopsalespayments` (
  `receiptNumber` varchar(10) NOT NULL,
  `paymentdate` varchar(20) NOT NULL,
  `amountPaid` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `paymentMethod` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `massageServices`
--

CREATE TABLE `massageServices` (
  `productId` varchar(10) NOT NULL,
  `productName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `massageServices`
--

INSERT INTO `massageServices` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
('S-17', 'full therapy', 20000, 0),
('S-25', 'belt therapy', 10000, 0),
('S-38', 'facial therapy', 5000, 0),
('S-73', 'light therapy', 10000, 0),
('S-75', 'Bio tuner and vibrator therapy', 10000, 0),
('S-81', 'vibrator therapy', 10000, 0),
('S-86', 'biotuner therapy', 10000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `unitPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `name`, `unitPrice`) VALUES
(1, 'Thinner', 25000),
(2, 'Grinding disks', 6000),
(3, 'Cutting disks', 10000),
(4, 'Flat 16*3 mm', 7500),
(5, 'Aluminium Bright', 90000),
(6, 'HIS 20*20 Tembo', 14500),
(7, 'HIS 16*16 Tembo', 11000),
(8, 'Electrodes G12', 2800),
(9, 'Bolts 5*5', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `mgeneralstore`
--

CREATE TABLE `mgeneralstore` (
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantityinstock` float NOT NULL,
  `measurementunits` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `mgeneralstore`
--

INSERT INTO `mgeneralstore` (`name`, `quantityinstock`, `measurementunits`) VALUES
('Black seeds', 7, 'KG');

-- --------------------------------------------------------

--
-- Table structure for table `mpstore`
--

CREATE TABLE `mpstore` (
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantityinstock` float NOT NULL,
  `measurementunits` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `mpstore`
--

INSERT INTO `mpstore` (`name`, `quantityinstock`, `measurementunits`) VALUES
('Black seeds', 65.8, 'KG');

-- --------------------------------------------------------

--
-- Table structure for table `productionrecords`
--

CREATE TABLE `productionrecords` (
  `productionid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `orderid` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` varchar(20) NOT NULL,
  `branch` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `productionrecords`
--

INSERT INTO `productionrecords` (`productionid`, `orderid`, `date`, `branch`) VALUES
('PROD-1180938', 'OR-182953', '2023-05-20', 'masanafu'),
('PROD-1229252', 'OR-182953', '2023-06-06', 'masanafu'),
('PROD-1242883', 'OR-182953', '2023-06-06', 'masanafu'),
('PROD-1393022', 'OR-182953', '2023-06-05', 'masanafu'),
('PROD-1725017', 'OR-182953', '2023-06-05', 'masanafu'),
('PROD-181080', 'OR-182953', '2023-06-06', 'masanafu'),
('PROD-359123', 'OR-182953', '2023-06-06', 'masanafu'),
('PROD-79811', 'OR-182953', '2023-06-06', 'masanafu');

-- --------------------------------------------------------

--
-- Table structure for table `productorders`
--

CREATE TABLE `productorders` (
  `orderid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sourcebranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `orderedbydepartment` varchar(100) NOT NULL,
  `orderedbyrole` varchar(100) NOT NULL,
  `orderby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `destinationbranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `recieverdepartment` varchar(100) NOT NULL,
  `recieverrole` varchar(100) NOT NULL,
  `deliveredto` varchar(100) NOT NULL,
  `itemsordered` text NOT NULL,
  `additionalinfo` text,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productorders`
--

INSERT INTO `productorders` (`orderid`, `date`, `sourcebranch`, `orderedbydepartment`, `orderedbyrole`, `orderby`, `destinationbranch`, `recieverdepartment`, `recieverrole`, `deliveredto`, `itemsordered`, `additionalinfo`, `status`, `comment`) VALUES
('OR-1034767', '2023-05-18', 'namungoona', 'inventory', '', 'nakiwalabrenda', 'masanafu', 'production', 'custodian', 'namugangamaria', '[{\"itemName\":\"Coconut oil\",\"itemQuantity\":\"5\",\"mUnits\":\"L\"},{\"itemName\":\"Chill seeds\",\"itemQuantity\":\"12\",\"mUnits\":\"KG\"}]', '', 'sent to the production unit', ''),
('OR-1042911', '2023-06-08', 'namungoona', 'inventory', '', 'nakiwalabrenda', 'masanafu', 'production', 'custodian', 'namugangamaria', '[{\"itemName\":\"Stand\",\"itemQuantity\":\"7\",\"mUnits\":\"Pcs\"}]', 'Order from Namungoona testing', 'sent to the production unit', ''),
('OR-182953', '2023-05-18', 'namungoona', 'inventory', '', 'nakiwalabrenda', 'masanafu', 'production', 'custodian', 'namugangamaria', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"2\",\"mUnits\":\"KG\"}]', '', 'rejected', ''),
('OR-19118', '2023-06-03', 'namungoona', 'inventory', '', 'nakiwalabrenda', 'masanafu', 'production', 'custodian', 'namugangamaria', '[{\"itemName\":\"Stand\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', '', 'rejected', ''),
('OR-193684', '2023-06-25', 'namungoona', 'inventory', '', 'nakiwalabrenda', 'masanafu', 'production', 'custodian', 'namugangamaria', '[{\"itemName\":\"Bio tuners\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', '', 'pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_prices`
--

CREATE TABLE `product_prices` (
  `id` int NOT NULL,
  `productName` varchar(100) NOT NULL,
  `productPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `projectsequipmentrequisitions`
--

CREATE TABLE `projectsequipmentrequisitions` (
  `requisitionid` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `orderid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `requesterbranch` varchar(100) NOT NULL,
  `requesterdepartment` varchar(50) NOT NULL,
  `requesterrole` varchar(50) NOT NULL,
  `requestedby` varchar(50) NOT NULL,
  `requestedfrombranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `recieverdepartment` varchar(100) NOT NULL,
  `recieverrole` varchar(50) NOT NULL,
  `recievedby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `additionalinfo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `itemsrequested` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projectsequipmentrequisitions`
--

INSERT INTO `projectsequipmentrequisitions` (`requisitionid`, `date`, `orderid`, `requesterbranch`, `requesterdepartment`, `requesterrole`, `requestedby`, `requestedfrombranch`, `recieverdepartment`, `recieverrole`, `recievedby`, `additionalinfo`, `itemsrequested`, `status`, `comment`) VALUES
('RFM-1095859', '2023-06-06', 'OR-182953', 'masanafu', 'projects', 'projectsmanager', 'zaz', 'masanafu', 'production', 'custodian', 'namugangamaria', 'For the first order', '[{\"itemName\":\"Aluminium Bright\",\"itemQuantity\":\"30\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Grinding disks\",\"itemQuantity\":\"12\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Bolts 5*5\",\"itemQuantity\":\"12\",\"mUnits\":\"Pcs\"}]', 'approved', 'Alright..It is  working'),
('RFM-117313', '2023-06-06', 'OR-19118', 'masanafu', 'projects', 'projectsmanager', 'zaz', 'masanafu', 'production', 'custodian', 'namugangamaria', '', '[{\"itemName\":\"Flat 16*3 mm\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Grinding disks\",\"itemQuantity\":\"12\",\"mUnits\":\"Pcs\"}]', 'approved', ''),
('RFM-1674477', '2023-06-19', 'OR-1042911', 'masanafu', 'projects', 'projectsmanager', 'zaz', 'masanafu', 'production', 'custodian', 'namugangamaria', '', '[{\"itemName\":\"Flat 16*3 mm\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'approved', ''),
('RFM-755946', '2023-06-22', 'OR-1042911', 'masanafu', 'projects', 'projectsmanager', 'zaz', 'masanafu', 'production', 'custodian', 'namugangamaria', '', '[{\"itemName\":\"Grinding disks\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'approved', '');

-- --------------------------------------------------------

--
-- Table structure for table `ProjectsItems`
--

CREATE TABLE `ProjectsItems` (
  `productId` varchar(10) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `ProjectsItems`
--

INSERT INTO `ProjectsItems` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
('PJ-10', 'TEST', 100, 0),
('PJ-11', 'CHARCOAL LIGHTER MACHINE ', 250000, 0),
('PJ-12', 'CANDLE MAKER MOLD ', 500000, 0),
('PJ-15', 'SUGAR CANE JUICE MAKER MANUAL MACHINE ', 2000000, 0),
('PJ-16', 'SPROUTS FARMING ', 1000000, 0),
('PJ-18', 'GYPSUM POWDER CHALK MAKING 1KG', 4000, 0),
('PJ-19', 'BIO DIESEL TRAINING ', 100000, 0),
('PJ-2', 'STAND AND TRAYS', 500000, 0),
('PJ-23', 'MOISTURE METRE', 3000000, 0),
('PJ-30', 'DISTILLER DOMESTIC ', 5000000, 0),
('PJ-37', 'DISTILLER COMMERCIAL ', 50000000, 0),
('PJ-40', 'SANDAL MAKING MACHINE ', 1000000, 0),
('PJ-42', 'COLD PRESS BIG MACHINE ', 15000000, 0),
('PJ-44', 'SUGAR CANE  JUICE MACHINE ELECTRICAL ', 5000000, 0),
('PJ-45', 'PELLET MAKING MACHINE ', 5000000, 0),
('PJ-47', 'BIO MASS DRYER SMALL', 2000000, 0),
('PJ-48', 'SOAP MAKING MEDIUM PACKAGE', 500000, 0),
('PJ-5', 'SANDAL MAKING SMALL PACKAGE ', 250000, 0),
('PJ-56', 'SUNSCREEN DRYER SMALL ', 500000, 0),
('PJ-6', 'SOAP MAKING COMMERCIAL PACKAGE', 1000000, 0),
('PJ-63', 'GROUNDNUT PASTE STAINLESS STEEL MACHINE ', 2500000, 0),
('PJ-7', 'CARBONIZER ', 500000, 0),
('PJ-71', ' GARNODERMA GARDEN ', 5000, 0),
('PJ-73', 'SANDAL PIN', 100000, 0),
('PJ-75', 'DISTILLER BIG', 15000000, 0),
('PJ-77', 'CHALK MOLD MACHINE ', 500000, 0),
('PJ-78', 'BIO MASS DRYER BIG ', 10000000, 0),
('PJ-80', 'SANDALS MATS', 25000, 0),
('PJ-81', 'CANDLE WAX 1KG', 12000, 0),
('PJ-83', 'GARNODERMA PROJECT FULL PACKAGE ', 1000000, 0),
('PJ-92', 'BIO DIESEL STOVE BIG ', 1000000, 0),
('PJ-95', 'BIO DIESEL STOVE SMALL', 500000, 0),
('PJ-97', 'SUN SCREEN DRYER BIG', 2000000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `projectsorders`
--

CREATE TABLE `projectsorders` (
  `orderid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sourcebranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `orderedbydepartment` varchar(100) NOT NULL,
  `orderedbyrole` varchar(100) NOT NULL,
  `orderby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `destinationbranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `recieverdepartment` varchar(100) NOT NULL,
  `recieverrole` varchar(100) NOT NULL,
  `deliveredto` varchar(100) NOT NULL,
  `itemsordered` text NOT NULL,
  `orderedquantitynotdelivered` varchar(5) NOT NULL,
  `additionalinfo` text,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projectsorders`
--

INSERT INTO `projectsorders` (`orderid`, `date`, `sourcebranch`, `orderedbydepartment`, `orderedbyrole`, `orderby`, `destinationbranch`, `recieverdepartment`, `recieverrole`, `deliveredto`, `itemsordered`, `orderedquantitynotdelivered`, `additionalinfo`, `status`, `comment`) VALUES
('OR-1042911', '2023-06-08', 'masanafu', 'production', 'custodian', 'namugangamaria', 'masanafu', 'projects', 'projectsmanager', 'zaz', '[{\"itemName\":\"Stand\",\"itemQuantity\":\"7\",\"mUnits\":\"Pcs\"}]', '-3', 'New New New', 'completed', NULL),
('OR-182953', '2023-05-20', 'masanafu', 'production', 'custodian', 'namugangamaria', 'masanafu', 'projects', 'projectsmanager', 'zaz', '[{\"itemName\":\"Bio tuners\",\"itemQuantity\":\"67\",\"mUnits\":\"units\"},{\"itemName\":\"Distillers\",\"itemQuantity\":\"12\",\"mUnits\":\"units\"}]', '0', '', 'completed', NULL),
('OR-19118', '2023-06-03', 'masanafu', 'production', 'custodian', 'namugangamaria', 'masanafu', 'projects', 'projectsmanager', 'zaz', '[{\"itemName\":\"Stand\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', '0', 'Order from namungoona', 'completed', NULL),
('OR-193684', '2023-06-25', 'masanafu', 'production', 'custodian', 'namugangamaria', 'masanafu', 'projects', 'projectsmanager', 'zaz', '[{\"itemName\":\"Bio tuners\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', '4', '', 'completed', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectsrecords`
--

CREATE TABLE `projectsrecords` (
  `orderid` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantitydelivered` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `deliverydate` varchar(30) CHARACTER SET utf8mb3 NOT NULL,
  `orderbalance` varchar(20) CHARACTER SET utf8mb3 NOT NULL,
  `munits` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projectsrecords`
--

INSERT INTO `projectsrecords` (`orderid`, `quantitydelivered`, `deliverydate`, `orderbalance`, `munits`) VALUES
('OR-19118', '2', '08/06/2023', '3', 'Pcs'),
('OR-1042911', '1', '09/06/2023', '6', 'Pcs'),
('OR-1042911', '2', '09/06/2023', '4', 'Pcs'),
('OR-1042911', '1', '09/06/2023', '3', 'Pcs'),
('OR-1042911', '1', '09/06/2023', '2', 'Pcs'),
('OR-1042911', '1', '09/06/2023', '1', 'Pcs'),
('OR-1042911', '1', '09/06/2023', '0', 'Pcs'),
('OR-1042911', '3', '19/06/2023', '-3', 'Pcs'),
('OR-193684', '1', '25/06/2023', '4', 'Pcs');

-- --------------------------------------------------------

--
-- Table structure for table `rawmaterialrequisitions`
--

CREATE TABLE `rawmaterialrequisitions` (
  `requisitionid` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `orderid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `requesterbranch` varchar(100) NOT NULL,
  `requesterdepartment` varchar(50) NOT NULL,
  `requesterrole` varchar(50) NOT NULL,
  `requestedby` varchar(50) NOT NULL,
  `requestedfrombranch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `recieverdepartment` varchar(100) NOT NULL,
  `recieverrole` varchar(50) NOT NULL,
  `recievedby` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `additionalinfo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `itemsrequested` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `machineid` int NOT NULL,
  `itemsrequired` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `requirements`
--

INSERT INTO `requirements` (`machineid`, `itemsrequired`) VALUES
(2, '[{\"itemName\":\"HIS 20*20 Tembo\",\"itemQuantity\":\"2.2\"},{\"itemName\":\"HIS 16*16 Tembo\",\"itemQuantity\":\"4\"},{\"itemName\":\"Flat 16*3 mm\",\"itemQuantity\":\"0.2\"},{\"itemName\":\"Electrodes G12\",\"itemQuantity\":\"0.2\"},{\"itemName\":\"Cutting disks\",\"itemQuantity\":\"0.4\"},{\"itemName\":\"Grinding disks\",\"itemQuantity\":\"0.2\"},{\"itemName\":\"Thinner\",\"itemQuantity\":\"0.2\"},{\"itemName\":\"Aluminium Bright\",\"itemQuantity\":\"0.1\"}]'),
(6, '[{\"itemName\":\"Aluminium Bright\",\"itemQuantity\":\"5\"},{\"itemName\":\"Thinner\",\"itemQuantity\":\"2\"},{\"itemName\":\"Bolts 5*5\",\"itemQuantity\":\"20\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `saphroneparticipantperformance`
--

CREATE TABLE `saphroneparticipantperformance` (
  `employeeId` varchar(20) NOT NULL,
  `merchandisesold` float NOT NULL DEFAULT '0',
  `points` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `saphroneparticipantperformance`
--

INSERT INTO `saphroneparticipantperformance` (`employeeId`, `merchandisesold`, `points`) VALUES
('E-218', 1014, 507),
('E-299', 396, 198),
('E-204', 126, 63),
('E-811', 96, 48),
('E-417', 249, 124.5),
('E-852', 137, 68.5),
('E-264', 270, 135),
('E-767', 270, 135),
('E-164', 72, 36),
('E-433', 252, 126),
('E-644', 312, 156),
('E-269', 18, 9),
('E-673', 24, 12),
('E-862', 360, 180),
('E-518', 210, 105),
('E-896', 258, 129),
('E-291', 24, 12),
('E-473', 42, 21),
('E-94', 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `saphroneparticipants`
--

CREATE TABLE `saphroneparticipants` (
  `employeeId` varchar(8) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `username` varchar(30) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `contact1` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `contact2` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `gender` text NOT NULL,
  `branch` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `profilepicture` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `registrationdate` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `saphroneparticipants`
--

INSERT INTO `saphroneparticipants` (`employeeId`, `username`, `firstName`, `lastName`, `contact1`, `contact2`, `address`, `gender`, `branch`, `profilepicture`, `password`, `registrationdate`) VALUES
('E-164', 'Esther', 'NANSUKUSA', 'ESTHER', '0778434246', '0706011952', 'LUGALA', 'FEMALE', 'MASANAFU', 'saphrone_participants_profile_pictures_uploads/ce3eeb8c77b0f6fc5327f407911a1fe0', '$2a$12$JQgO4IikUTz7S1ytp6Q9cO10XBpnRw4CjU2Om7w.Ytwdlr5d87VEK', '15/09/2023, 10:37:33'),
('E-199', 'Ochwo Oyo ben', 'OYO', 'BEN', '0705901926', '0774687706', 'BUWAMA', 'MALE', 'BUWAMA', 'saphrone_participants_profile_pictures_uploads/2e19f56eb13436ab85590304c6d5b418', '$2a$12$vEXitSdlC8YZWP4BXZ8PXeA/NNT2B0vYllOp4BdtuJX0vVpOe/q8i', '9/18/2023, 8:54:36 AM'),
('E-204', 'Ngenda123', 'NGENDA', 'FRED', '0782169837', '', 'KYEBANDO', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/e20181ee0f52cff6d7acad02abb49fb5', '$2a$12$gr2xUQQqrJYBL807HICECOQ1dFwknmGUoIEskl2yORCW9oTCO1hg6', '9/14/2023, 7:08:55 PM'),
('E-206', 'Ochwo Oyo Benedict', 'OYO', 'BEN', NULL, NULL, NULL, 'MALE', NULL, NULL, '$2a$12$PH6KEYRkhGWud7hOdwLhruH47P.B9L3FrV34lHUScR8EiBJ40GR36', '9/17/2023, 4:53:29 PM'),
('E-218', 'Truth', 'KYAMPIRE', 'LYNE', '0705307847', '', 'NAMIREMBE', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/22a6c5b543153c9fd5ecf0a225d8b4b1', '$2a$12$x.BnVkY8f27VaAEJ8Qngl.EvW21DYMd8G3ElydWgBx5/0jnpvaUaW', '14/09/2023, 19:08:12'),
('E-264', 'Charity12', 'CHARITY', 'SANYU', '0702617699', '', 'KAWANDA', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/d29f1827e38790d9d433a655de916e83', '$2a$12$bZk62GiKknQPLGeaQZSW6uisRIeoOSmMpgtjHpIXNyZKaZJ4ON9Vy', '9/14/2023, 7:25:21 PM'),
('E-269', 'Kizito@123', 'KIZITO', 'EMMANUEL', '0700610535', '0788706947', 'SEETA', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/cd23fdc4b6b08ff5ad7dfd6892e5669a', '$2a$12$pKjzs.D75FDSBBncHRcV4.Zzvtdd./EkAstL7/1iJeQvscpNT0jTy', '9/14/2023, 5:37:36 PM'),
('E-291', 'Sambanksworth', 'SAMUEL', 'BAKALUBA', '0782727638', '0704107296', 'KASUBI', 'MALE', 'MASANAFU', 'saphrone_participants_profile_pictures_uploads/913e43cbc646aa7db5342666ae4beb1f', '$2a$12$jtu.ueobq49/ZPKJCsm3l.9k2XukK6n6LrM4BD3paNFDp3au/t8Te', '15/09/2023, 10:47:59'),
('E-299', '@simeon', 'SIMON', 'KIMULI', '0701110875', '0773656731', 'MUTUNGO', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/b5ccc4716feb33c62ff2503afe9069aa', '$2a$12$uk.r5uydGMYsvc/cpZVOg.YS5v5OFx2I6IAfpfcCOnJU/56axzImW', '14/09/2023, 18:22:18'),
('E-388', 'Omugethum12', 'JOHN', 'KAHINDI', '0782207031', '', 'MULAGO', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/421237e04234aabdab716e71c6f035db', '$2a$12$d76uEOTFsL0H5mSDrBi8guptJJYOPhmgf6ir9cFoA7RflLFtNZaH.', '9/14/2023, 7:26:26 PM'),
('E-417', 'Tony 12345', 'KISUULE', 'TONY', '0702152152 ', '', 'NAMUGOONA', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/52c9819d96a555cc466108f8b0868798', '$2a$12$HmuXSB2omBw5MiZ28au2d.KiQZAuFm3a0mVAWYO.LkKk6aMF2POo.', '14/09/2023, 19:08:35'),
('E-433', 'Olympia1', 'APILI', 'OLYMPIA', '0783653104', '0758568717', 'KYALIWAJALA', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/51a25db1614602079dbdac99afa49638', '$2a$12$nVAY48FxlNCXcWqTQSU8iOblppDTbbuX1Z820sBKtKA59oBGLSRZe', '14/09/2023, 19:01:51'),
('E-470', 'zray', 'ZZIWA', 'RAYMOND', '0701303137', '0775563805', 'KIRA', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/885458746b13b14ebf57249026db6baf', '$2a$12$Dev04U89OCglnnsDtH7heu.fzMBXI8rSlPz33O92jaVC4htYoARF.', '15/09/2023, 09:49:23'),
('E-473', 'Eddy', 'KIRONDE', 'EDRINE', '0759918985', '', 'MASANAFU', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/b7421cbc342bdf487762760b057c66f8', '$2a$12$citajmmPQuVzpLGGTeJox.IJSxCpt5xR9UKNfDXfDqPK4GMwRVP1u', '9/14/2023, 7:07:15 PM'),
('E-518', 'namawejjebridget', 'BRIDGET', 'NAMAWEJJE', '0701186242', '0701186242', 'NAMUNGOONA', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/1c3ea74096273b88d91fa7af65d9bd2a', '$2a$12$1pdBi5YsD7Gq5CAPdsyOC.jkydg89Oi41AQ26NOp5mauA511ktUyW', '9/6/2023, 2:10:23 PM'),
('E-644', 'Gloria@123', 'GLORIA', 'NAKITENDE', '0701951913', '0775803200', 'KIKAAYA', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/594654d0efeaefd48e22361b6a535d6c', '$2a$12$V7rTKg8q0A6/HwlsR7.xruIaqOE8xsMG70k9sW/9UcGGdp4ZCs9Gu', '9/14/2023, 7:08:10 PM'),
('E-673', 'Cathy12', 'CATHERINE', 'NABATENDE', NULL, NULL, NULL, 'FEMALE', NULL, NULL, '$2a$12$mc9E7nRPNBNObo0V/tD.HekMtJnuOm7bZnOwGzbXgU0UaITNeR8Xy', '14/09/2023, 19:26:29'),
('E-767', 'Nalubowa91', 'NALUBOWA', 'JOSEPHINE', '0704505242', '', 'BUSEGA', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/9ca5fc00eb4c8c8f8fb4a00c009092d9', '$2a$12$p6gI1rbW33n22fkdULuOD.XZpVrPumPI/7M8Klyg5i319qdAzsImO', '9/14/2023, 6:12:31 PM'),
('E-77', 'Sammy', 'OKELLO', 'SAMMY WYNESS', NULL, NULL, NULL, 'MALE', NULL, NULL, '$2a$12$KUXm9mfd1bJqN17addRd9uOyfD/3SkZxZv4qqE3zogmfklX79MYhe', '9/18/2023, 6:08:06 PM'),
('E-777', 'Kintu Shaphilu', 'SHAPHILU', 'KINTU', '0707121017', '0783442728', 'MASANAFU', 'MALE', 'MASANAFU', 'saphrone_participants_profile_pictures_uploads/516562344c4f49d178cbb32c282be776', '$2a$12$ZVlilC/JkEqAbbbhCR8x5Os2UclE7fE7dN.WGjDpOjEBNdhzaWFo.', '18/09/2023, 15:36:54'),
('E-811', 'Abdul 034', 'SSEWAMALA', 'ABDUL', '0774232926', '0757886958 ', 'KYABANDO', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/db404d9eb98a7fe2036a5940a69f261a', '$2a$12$A63s/ZSyy.u4CIYiwOTriuA1v9.SLh4yhrWPA8h47VIMoJXgRrBui', '9/14/2023, 7:26:27 PM'),
('E-852', 'JULIANNE', 'AIJUKA', 'JULIANNE', '0742036026', '0702048388', 'NAMUNGOONA', 'FEMALE', 'MASANAFU', 'saphrone_participants_profile_pictures_uploads/ea599591afe0ca9a85c18b6a8d22e2e1', '$2a$12$H4ZIiFboflCg9wfxPsIepOIRyf4xeQkC/S45NRKdAi7LTIat0.CkK', '9/15/2023, 11:04:45 AM'),
('E-862', 'Winnie', 'NAMUBIRU', 'WINNIE', '0705343449', '0781007405', 'KAWAALA', 'FEMALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/7c8634b7a8d70b5a5fcc710ee9ecf14e', '$2a$12$9lJdpdd8laI8.Vs8lj4ryO3l790qiVxDlTv3OCIsfaPYDxy9pHvQq', '9/20/2023, 12:38:43 PM'),
('E-886', 'Ochwo Oyo ben', 'OYO', 'BEN', NULL, NULL, NULL, 'MALE', NULL, NULL, '$2a$12$0ZLcIY4zuG57JTMlLLJPE.lwaHxQlYk3Gu/pNDizPpKBzUJb3bFl2', '9/18/2023, 8:54:37 AM'),
('E-896', 'AMONE', 'AMONE', 'GODFREY', '0758505565', '0782270916', 'KYEBANDO', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/fcf5db979819370a128b32f866d55ff8', '$2a$12$OoR/WE.eWQdrV70psSlpqugeeSmuP9I6SO5w9PFxiGCz.I2AKPk2.', '9/22/2023, 11:39:03 AM'),
('E-904', 'Sammy123', 'OKELLO', 'SAMMY WYNESS', '0774153730', '0709631150', 'BUKASA', 'MALE', 'EQUATORIAL', 'saphrone_participants_profile_pictures_uploads/5ae01b89006f3930687170b9ac23fb89', '$2a$12$F2jL7CGkJB1iF7PxpJn53uZsqpU6YSoqSYp2Pug8uFPxcXZd8yAtG', '9/18/2023, 6:13:08 PM'),
('E-94', 'Kenny', 'GAMUTAMBULI', 'KENNETH', '0772701410', '0753955505', 'MASANAFU', 'MALE', 'MASANAFU', 'saphrone_participants_profile_pictures_uploads/652aae0fed1c0eff31ff1677fc69a847', '$2a$12$isqzn0zMRZgfCXClfsPEAeDeEHjYR7WPrZslnqo4/GlfoHh8J/ys.', '16/09/2023, 21:46:04'),
('E-974', 'Charles', 'MULWANA', 'JAMES', '0751680367', '0771078828', 'MASANAFU', 'MALE', '', 'saphrone_participants_profile_pictures_uploads/83d9f7b061a71b151191d3ed25b2ba5f', '$2a$12$uMa5o0wPGhggWtspIWpeFe4wkUFWo9K96uRUK9lNK9IcquPbY15yG', '18/09/2023, 16:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `saphroneperformancerecords`
--

CREATE TABLE `saphroneperformancerecords` (
  `employeeId` varchar(20) NOT NULL,
  `date` varchar(50) NOT NULL,
  `merchandisesold` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `saphroneperformancerecords`
--

INSERT INTO `saphroneperformancerecords` (`employeeId`, `date`, `merchandisesold`) VALUES
('E-218', '14/09/2023', 6),
('E-299', '14/09/2023', 12),
('E-204', '15/09/2023', 6),
('E-218', '15/09/2023', 6),
('E-218', '15/09/2023', 18),
('E-811', '15/09/2023', 6),
('E-218', '15/09/2023', 6),
('E-204', '15/09/2023', 12),
('E-204', '15/09/2023', 6),
('E-417', '15/09/2023', 6),
('E-852', '15/09/2023', 6),
('E-204', '15/09/2023', 12),
('E-218', '15/09/2023', 6),
('E-264', '15/09/2023', 30),
('E-767', '16/09/2023', 18),
('E-218', '16/09/2023', 30),
('E-164', '16/09/2023', 6),
('E-433', '16/09/2023', 6),
('E-264', '16/09/2023', 12),
('E-299', '16/09/2023', 18),
('E-644', '18/09/2023', 60),
('E-811', '18/09/2023', 24),
('E-269', '18/09/2023', 18),
('E-433', '18/09/2023', 6),
('E-218', '18/09/2023', 48),
('E-767', '18/09/2023', 18),
('E-299', '18/09/2023', 24),
('E-218', '19/09/2023', 30),
('E-417', '19/09/2023', 18),
('E-811', '19/09/2023', 12),
('E-767', '19/09/2023', 24),
('E-673', '19/09/2023', 18),
('E-299', '19/09/2023', 36),
('E-264', '19/09/2023', 18),
('E-299', '19/09/2023', 36),
('E-767', '20/09/2023', 6),
('E-417', '20/09/2023', 24),
('E-264', '20/09/2023', 12),
('E-218', '20/09/2023', 30),
('E-644', '21/09/2023', 12),
('E-264', '21/09/2023', 36),
('E-218', '21/09/2023', 54),
('E-862', '21/09/2023', 72),
('E-673', '21/09/2023', 6),
('E-417', '21/09/2023', 6),
('E-433', '21/09/2023', 6),
('E-862', '22/09/2023', 24),
('E-204', '22/09/2023', 6),
('E-767', '22/09/2023', 12),
('E-218', '22/09/2023', 24),
('E-417', '22/09/2023', 16),
('E-518', '22/09/2023', 12),
('E-896', '22/09/2023', 36),
('E-299', '22/09/2023', 60),
('E-204', '25/09/2023', 6),
('E-862', '25/09/2023', 12),
('E-218', '25/09/2023', 24),
('E-896', '25/09/2023', 6),
('E-767', '25/09/2023', 6),
('E-264', '25/09/2023', 102),
('E-299', '25/09/2023', 42),
('E-218', '25/09/2023', 18),
('E-896', '25/09/2023', 24),
('E-299', '25/09/2023', 18),
('E-417', '25/09/2023', 6),
('E-518', '25/09/2023', 12),
('E-644', '25/09/2023', 36),
('E-291', '25/09/2023', 6),
('E-433', '25/09/2023', 12),
('E-852', '25/09/2023', 12),
('E-164', '25/09/2023', 36),
('E-264', '25/09/2023', 24),
('E-264', '25/09/2023', 36),
('E-218', '26/09/2023', 18),
('E-862', '26/09/2023', 60),
('E-299', '26/09/2023', 30),
('E-862', '26/09/2023', 24),
('E-218', '27/09/2023', 30),
('E-433', '27/09/2023', 18),
('E-896', '27/09/2023', 18),
('E-299', '28/09/2023', 12),
('E-218', '28/09/2023', 18),
('E-862', '28/09/2023', 6),
('E-767', '28/09/2023', 12),
('E-433', '28/09/2023', 6),
('E-433', '29/09/2023', 12),
('E-644', '29/09/2023', 6),
('E-218', '29/09/2023', 6),
('E-218', '02/10/2023', 48),
('E-433', '02/10/2023', 42),
('E-204', '02/10/2023', 6),
('E-767', '02/10/2023', 12),
('E-811', '02/10/2023', 6),
('E-473', '02/10/2023', 12),
('E-417', '02/10/2023', 30),
('E-218', '02/10/2023', 12),
('E-433', '03/10/2023', 6),
('E-896', '03/10/2023', 6),
('E-204', '03/10/2023', 30),
('E-896', '03/10/2023', 30),
('E-767', '03/10/2023', 12),
('E-518', '03/10/2023', 6),
('E-896', '03/10/2023', 6),
('E-299', '05/10/2023', 6),
('E-767', '05/10/2023', 6),
('E-218', '05/10/2023', 24),
('E-518', '05/10/2023', 6),
('E-417', '05/10/2023', 30),
('E-218', '07/10/2023', 12),
('E-767', '07/10/2023', 12),
('E-644', '07/10/2023', 18),
('E-291', '07/10/2023', 6),
('E-896', '07/10/2023', 18),
('E-218', '07/10/2023', 18),
('E-644', '07/10/2023', 18),
('E-862', '07/10/2023', 6),
('E-94', '07/10/2023', 6),
('E-896', '07/10/2023', 12),
('E-218', '07/10/2023', 12),
('E-644', '07/10/2023', 12),
('E-862', '10/10/2023', 30),
('E-767', '10/10/2023', 6),
('E-218', '10/10/2023', 6),
('E-862', '10/10/2023', 42),
('E-862', '10/10/2023', 36),
('E-417', '12/10/2023', 11),
('E-862', '12/10/2023', 6),
('E-218', '12/10/2023', 6),
('E-767', '12/10/2023', 18),
('E-299', '12/10/2023', 12),
('E-433', '12/10/2023', 6),
('E-862', '12/10/2023', 12),
('E-218', '12/10/2023', 18),
('E-767', '12/10/2023', 6),
('E-433', '14/10/2023', 12),
('E-218', '14/10/2023', 18),
('E-644', '14/10/2023', 30),
('E-291', '14/10/2023', 12),
('E-862', '14/10/2023', 18),
('E-218', '14/10/2023', 30),
('E-767', '14/10/2023', 12),
('E-417', '14/10/2023', 6),
('E-417', '14/10/2023', 6),
('E-433', '14/10/2023', 6),
('E-852', '14/10/2023', 12),
('E-644', '14/10/2023', 24),
('E-218', '14/10/2023', 36),
('E-218', '17/10/2023', 36),
('E-767', '17/10/2023', 30),
('E-433', '17/10/2023', 48),
('E-862', '17/10/2023', 12),
('E-299', '17/10/2023', 30),
('E-417', '17/10/2023', 6),
('E-164', '17/10/2023', 30),
('E-852', '17/10/2023', 65),
('E-852', '17/10/2023', 30),
('E-218', '19/10/2023', 42),
('E-299', '19/10/2023', 12),
('E-204', '19/10/2023', 6),
('E-518', '19/10/2023', 12),
('E-896', '21/10/2023', 60),
('E-644', '21/10/2023', 18),
('E-811', '21/10/2023', 12),
('E-433', '21/10/2023', 6),
('E-518', '21/10/2023', 18),
('E-204', '21/10/2023', 6),
('E-218', '21/10/2023', 168),
('E-811', '21/10/2023', 12),
('E-767', '21/10/2023', 6),
('E-852', '21/10/2023', 12),
('E-896', '21/10/2023', 12),
('E-433', '21/10/2023', 12),
('E-204', '21/10/2023', 12),
('E-218', '21/10/2023', 66),
('E-299', '24/10/2023', 30),
('E-767', '24/10/2023', 36),
('E-644', '24/10/2023', 30),
('E-433', '24/10/2023', 24),
('E-811', '24/10/2023', 18),
('E-218', '24/10/2023', 42),
('E-417', '24/10/2023', 30),
('E-204', '24/10/2023', 18),
('E-518', '24/10/2023', 48),
('E-473', '24/10/2023', 30),
('E-518', '24/10/2023', 78),
('E-218', '27/10/2023', 48),
('E-811', '27/10/2023', 6),
('E-417', '27/10/2023', 30),
('E-433', '27/10/2023', 24),
('E-518', '27/10/2023', 18),
('E-299', '27/10/2023', 18),
('E-767', '27/10/2023', 6),
('E-644', '27/10/2023', 48),
('E-896', '27/10/2023', 30),
('E-417', '27/10/2023', 30),
('E-767', '27/10/2023', 12);

-- --------------------------------------------------------

--
-- Table structure for table `shopProducts`
--

CREATE TABLE `shopProducts` (
  `productId` int NOT NULL,
  `productName` varchar(100) NOT NULL,
  `unitPrice` float NOT NULL,
  `discount` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `shopProducts`
--

INSERT INTO `shopProducts` (`productId`, `productName`, `unitPrice`, `discount`) VALUES
(19, 'PEPPERMINT ROOT TEA 200G', 20000, 0),
(20, 'PRESSURE TEA 150G', 20000, 0),
(21, 'ULCER TEA 150G', 20000, 0),
(22, 'ANTI SINUS TEA 150G', 20000, 0),
(23, 'EUCALYPTUS TEA BIG 130G', 10000, 0),
(24, 'EUCALYPTUS TEA SMALL 75G', 5000, 0),
(25, 'STEVIA POWDER BIG 180G', 15000, 0),
(26, 'STEVIA POWDER MEDIUM 90G', 7000, 0),
(27, 'STEVIA POWDER SMALL  45G', 3000, 0),
(28, 'STEVIA LIQUID 20ML', 5000, 0),
(29, 'STINGING NETTLE 100G', 20000, 0),
(30, 'ROSEMARY POWDER SMALL 100G', 10000, 0),
(31, 'ROSEMARY OIL AMBER 10ML', 20000, 0),
(32, 'VITAMIN C  POWDER 100G', 30000, 0),
(33, 'ACTIVATED CHARCOAL 250G', 20000, 0),
(34, 'ARTEMISIA POWDER 180G', 20000, 0),
(35, 'BIO SILVER 100ML', 20000, 0),
(36, 'OZONE WATER 100ML', 20000, 0),
(37, 'DIATOMACEOUS CLAY 100G', 10000, 0),
(38, 'WATER BILL 100G', 15000, 0),
(39, 'COLON CLEANSER 100G', 15000, 0),
(40, 'BELLY LINER SMALL 100G', 15000, 0),
(41, 'BELLY LINER BIG 200G', 30000, 0),
(42, 'BAZUKA 9 POWDER 100G', 15000, 0),
(43, 'PRUNUS POWDER 200G', 20000, 0),
(44, 'SABA SABA POWDER  90G', 20000, 0),
(45, 'SABA SABA OIL 20ML', 30000, 0),
(46, 'SABA SABA NOSE DROP 20ML', 10000, 0),
(47, 'KISULA POWDER', 5000, 0),
(48, 'ALKALI POWDER  SMALL 100G', 10000, 0),
(49, 'PUMPKIN OIL 60ML', 20000, 0),
(50, 'PUMPKIN CAKE 200G', 10000, 0),
(51, 'CASTOR OIL BIG 120ML', 20000, 0),
(52, 'CASTOR OIL SMALL 60ML', 10000, 0),
(53, 'CASTOR OIL EYES 60ML', 10000, 0),
(54, 'CASTOR SEEDS PLANTING 100G', 10000, 0),
(55, 'CASTOR SEEDS FAMILY PLANNING', 2000, 0),
(56, 'SPROUTS POWDER BIG 100G', 10000, 0),
(57, 'SPROUTS POWDER  SMALL 50G', 5000, 0),
(58, 'MANGO BUTTER  BIG 100G', 20000, 0),
(59, 'MANGO BUTTER  SMALL 50G', 10000, 0),
(60, 'CUCUMBER GEL SMALL 50G', 10000, 0),
(61, 'CUCUMBER GEL BIG 100G', 20000, 0),
(62, 'ALOE VERA GEL BIG 100G', 20000, 0),
(63, 'ALOE VERA GEL SMALL 50G', 10000, 0),
(64, 'TURMERIC  GEL SMALL 50G', 10000, 0),
(65, 'TURMERIC  GEL BIG 100G', 20000, 0),
(66, 'TURMERIC BUTTER 200G', 10000, 0),
(67, 'SHEA BUTTER 200G', 10000, 0),
(68, 'ROSE WATER SMALL 60ML', 5000, 0),
(69, 'ARGAN OIL 60ML', 30000, 0),
(70, 'JOJOBA OIL 60ML', 30000, 0),
(71, 'OLIVE OIL 60ML', 20000, 0),
(72, 'FENUGREEK OIL 60ML', 20000, 0),
(73, 'FENUGREEK CAKE 200G', 10000, 0),
(74, 'LWASA MAYINJA 60ML', 20000, 0),
(75, 'MPIRIVUMA OIL 60ML', 30000, 0),
(76, 'MPIRIVUMA CAKE 200G', 10000, 0),
(77, 'COCONUT OIL 300ML', 20000, 0),
(78, 'CIDER VINEGAR', 5000, 0),
(79, 'GREEN TEA 200G', 10000, 0),
(80, 'HIMALAYAN PINK SALT 250G', 10000, 0),
(81, 'EPSOM SALT 250G', 10000, 0),
(82, 'HONEY BIG 500G', 10000, 0),
(83, 'HONEY SMALL 500G', 5000, 0),
(84, 'AVOCADO OIL 20ML', 20000, 0),
(85, 'CARROT OIL 20ML', 20000, 0),
(86, 'MORINGA OIL 20ML', 20000, 0),
(87, 'BLACK PEPPER OIL 20ML', 20000, 0),
(88, 'BLACK PEPPER CAKE 200G', 10000, 0),
(89, 'SELENIUM EXTRACT 20ML', 10000, 0),
(90, 'TONJATULA SUPER 20ML', 20000, 0),
(91, 'FLAX OIL 20ML', 20000, 0),
(92, 'FLAX SEEDS BIG 100G', 10000, 0),
(93, 'FLAX CAKE 200G', 10000, 0),
(94, 'NEEM OIL 20ML', 20000, 0),
(95, 'GARLIC OIL 20ML', 30000, 0),
(96, 'CLOVE OIL 20ML', 20000, 0),
(97, 'CLOVE CAKE 200G', 10000, 0),
(98, 'BLACK SEED OIL 20ML', 20000, 0),
(99, 'BLACK SEED CAKE 200G', 10000, 0),
(100, 'CEDAR OIL AMBER 20ML', 20000, 0),
(101, 'CEDAR OIL SPRAY ', 20000, 0),
(102, 'CITRONELLA OIL AMBER 20ML', 20000, 0),
(103, 'CITRONELLA OIL SPRAY', 20000, 0),
(104, 'LEMON GRASS OIL SPRAY', 20000, 0),
(105, 'LEMON GRASS OIL AMBER 20ML', 20000, 0),
(106, 'LEMON GRASS TEA 200G', 20000, 0),
(107, 'THIEVES OIL 20ML', 30000, 0),
(108, 'MUJAAJA OIL AMBER 10ML', 30000, 0),
(110, 'LAVENDER OIL AMBER 10ML', 25000, 0),
(111, 'IODINE AMBER 10ML', 30000, 0),
(112, 'GINGER ESSENTIAL OIL 10ML', 30000, 0),
(113, 'POULTRY BOMB 250ML', 5000, 0),
(114, 'KOFF BOMB 120ML', 5000, 0),
(115, 'MAGNESIUM OIL 100ML', 10000, 0),
(116, 'MASSAGE OIL 100ML', 20000, 0),
(117, 'JAMAICAN BLACK CASTOR  OIL 60ML', 30000, 0),
(118, 'CINNAMON OIL 20ML', 30000, 0),
(119, 'EUCALYPTUS OIL AMBER 20ML', 20000, 0),
(120, 'EUCALYPTUS OIL SPRAY', 20000, 0),
(121, 'CHLOROPHYLL EXTRACT 20ML', 20000, 0),
(122, 'PEPPERMINT OIL AMBER 10ML', 25000, 0),
(123, 'OREGANO OIL AMBER 10ML', 30000, 0),
(124, 'TEA TREE OIL AMBER 10ML', 25000, 0),
(125, 'THYME  OIL AMBER 10ML', 30000, 0),
(126, 'NEEM PESTICIDE 100ML', 20000, 0),
(127, 'AFRICAN BLACK SOAP SMALL', 10000, 0),
(128, 'AFRICAN BLACK SOAP BIG', 30000, 0),
(129, 'HIMALAYAN LAMP ', 200000, 0),
(131, 'NEBULIZER', 100000, 0),
(132, 'CLAY BURNER SMALL', 20000, 0),
(133, 'MASSAGER', 500000, 0),
(134, 'BIO TUNER MACHINE', 500000, 0),
(135, 'SLIMMING BELT', 500000, 0),
(136, 'HOT PACK', 100000, 0),
(137, 'SAFFRON EGGS ', 1000, 0),
(138, 'JASMINE SPRAY', 20000, 0),
(139, 'VANILLA SPRAY', 20000, 0),
(140, 'TRICHODERMA 250ML', 10000, 0),
(141, 'BAMBOO PESTICIDE 250ML', 10000, 0),
(142, 'MAJEGERE PORRIDGE 500G', 5000, 0),
(143, 'MUCUNA POWDER 100G', 20000, 0),
(144, 'MOSQUITO REPELLANT  CREAM SMALL 50G', 3000, 0),
(145, 'MOSQUITO REPELLANT  CREAM BIG 100G', 5000, 0),
(146, 'STEVIA CONCENTRATE 20ML', 5000, 0),
(147, 'WATER HYACINTH 250ML', 10000, 0),
(148, 'BENTONITE CLAY 100G', 20000, 0),
(149, 'BLACK SEED POWDER ', 10000, 0),
(150, 'AVOCADO OIL BIG 60ML', 30000, 0),
(151, 'GOTUKOLA POWDER 100G', 10000, 0),
(152, 'YEAST 100G', 5000, 0),
(153, 'AMARANTH OIL 60ML', 20000, 0),
(154, 'BLACK SEEDS SMALL 60G', 5000, 0),
(155, 'BLACK SEEDS BIG 120G', 10000, 0),
(1026, 'GANODERMA POWDER SMALL ', 10000, 0),
(1027, 'GANODERMA POWDER BIG', 20000, 0),
(1028, 'MUSHROOM POWDER SMALL 50G', 5000, 0),
(1029, 'MUSHROOM POWDER BIG 100G', 10000, 0),
(1030, 'MILK THISTLE POWDER 100G', 20000, 0),
(1031, 'FLAX SEEDS SMALL 50G', 5000, 0),
(1032, 'FLAX OIL BIG 60ML', 50000, 0),
(1033, 'BLACK SEED OIL BIG 60ML', 50000, 0),
(1034, 'ROSE HIP OIL 60ML', 20000, 0),
(1035, 'CANDLENUT OIL 60ML', 20000, 0),
(1036, 'CHIA OIL 60ML', 20000, 0),
(1037, 'WILD ROOT POWDER 20G', 50000, 0),
(1038, 'MACA POWDER 20G', 20000, 0),
(1039, 'LIP BALM', 5000, 0),
(1040, 'ROSEMARY POWDER BIG 180G', 15000, 0),
(1041, 'MORINGA POWDER 90G', 5000, 0),
(1042, 'JAMAICAN BLACK CASTOR OIL BIG 120ML', 50000, 0),
(1043, 'SESAME OIL BIG 120ML', 10000, 0),
(1044, 'SESAME OIL SMALL 60ML', 5000, 0),
(1045, 'MUSTARD OIL 60ML', 20000, 0),
(1046, 'FENNEL OIL 60ML', 20000, 0),
(1047, 'GINGER VIRGIN OIL 60ML', 30000, 0),
(1048, 'FRANKINCENSE OIL 60ML', 100000, 0),
(1049, 'ROSE ESSENTIAL OIL 10ML', 200000, 0),
(1050, 'GERANIUM ESSENTIAL OIL 10ML', 30000, 0),
(1051, 'SANDAL WOOD OIL 10ML', 30000, 0),
(1052, 'DMSO OIL 20ML', 40000, 0),
(1053, 'CHAMOMILE OIL 10ML', 30000, 0),
(1054, 'SAGE OIL 10ML', 30000, 0),
(1055, 'THYME OIL 10ML', 30000, 0),
(1056, 'KABANI OIL 10ML', 30000, 0),
(1057, 'YLANG YLANG OIL 10ML', 30000, 0),
(1058, 'GRAPE FRUIT OIL 10ML', 30000, 0),
(1059, 'LEMON OIL 10ML', 30000, 0),
(1060, 'SWEET ORANGE OIL 10ML', 30000, 0),
(1061, 'PINE OIL 20ML', 40000, 0),
(1062, 'PROPOLIS EXTRACT 20ML', 10000, 0),
(1063, 'TONJATULA 2 OIL 20ML', 40000, 0),
(1064, 'TONJATULA 3 OIL 20ML', 100000, 0),
(1065, 'JASMINE OIL  PLASTIC 20ML', 20000, 0),
(1066, 'VANILLA OIL PLASTIC 20ML', 20000, 0),
(1067, 'CLOVE OIL 20ML', 20000, 0),
(1068, 'PAPAYA OIL 20ML', 20000, 0),
(1069, 'CHILLI OIL 20ML', 20000, 0),
(1070, 'ARTEMISIA EXTRACT 20ML', 30000, 0),
(1071, 'TURMERIC OIL 20ML', 20000, 0),
(1072, 'VITAMIN E OIL 20ML', 20000, 0),
(1073, 'CUCUMBER OIL 20ML', 20000, 0),
(1074, 'SWEET ALMOND OIL 20ML', 20000, 0),
(1075, 'COFFEE OIL 20ML', 20000, 0),
(1076, ' ROSE WATER BIG 120ML', 10000, 0),
(1077, ' SANITIZER BIG 500ML', 10000, 0),
(1078, ' SANITIZER SMALL 100ML', 5000, 0),
(1079, ' FRACTIONATED COCONUT BIG 120ML', 10000, 0),
(1080, 'COCKROACH GEL 20G', 5000, 0),
(7001, 'FRACTIONATED COCONUT SMALL 60ML', 5000, 0),
(7002, 'SAFFRON EXTRACT 10ML', 30000, 0),
(7003, 'SAFFRON PELLETS 250G', 10000, 0),
(7004, 'CINNAMON FORMULA SMALL 250G', 8000, 0),
(7005, 'CINNAMON FORMULA BIG 500G', 15000, 0),
(7006, 'LEMON PRESERVATIVE SMALL 50G', 10000, 0),
(7007, 'LEMON PRESERVATIVE BIG 100G', 20000, 0),
(7008, 'CHIA SEEDS SMALL 90G', 5000, 0),
(7009, 'CHIA SEEDS BIG 200G', 10000, 0),
(7010, 'WATER POTS', 70000, 0),
(7011, 'COOKING POTS', 70000, 0),
(7012, 'test22', 0, 0),
(7013, 'CYPRESS TEA 75G', 5000, 0),
(7014, 'RABBIT URINE 1LITRE', 20000, 0),
(7015, 'TURMERIC CAKE 200G', 10000, 0),
(7016, 'CURES CAKE 200G', 10000, 0),
(7017, 'NEEM CAKE 200G', 10000, 0),
(7018, 'PROF STORY BOOK ENGLISH', 20000, 0),
(7019, 'PROF STORY BOOK LUGANDA ', 20000, 0),
(7020, 'TOOL BOX LUGANDA ', 5000, 0),
(7021, 'TOOL BOX ENGLISH', 5000, 0),
(7022, 'TOILET PAPERS ', 2000, 0),
(7023, 'SILICON CANDLE MOULD', 100000, 0),
(7024, 'SILICON SOAP MOULD', 50000, 0),
(7025, 'WOODEN SOAP MOULD', 10000, 0),
(7026, 'SANDLE NEEDLE ', 100000, 0),
(7027, 'SANDLE STRAPS', 500, 0),
(7028, 'SANDLE MAT', 25000, 0),
(7029, 'SANDLE CUTTER', 10000, 0),
(7030, 'SANDLE SCISSORS ', 50000, 0),
(7031, 'CANDLE MOULD MACHINE ', 500000, 0),
(7032, 'CHALK MOULD MACHINE ', 500000, 0),
(7033, 'CHARCOAL LIGHTER MACHINE ', 250000, 0),
(7034, 'CHARCOAL BRIQUETTE MACHINE ', 700000, 0),
(7035, 'CHARCOAL LIGHTERS ', 1000, 0),
(7036, 'COW URINE 20ML', 3000, 0),
(7037, 'MUJAAJA SEEDS', 2000, 0),
(7038, 'KOMBUCHA DRINK SMALL', 5000, 0),
(7039, 'KOMBUCHA DRINK BIG', 10000, 0),
(7040, 'CLAY BURNER MEDIUM ', 30000, 0),
(7041, 'CLAY BURNER BIG', 50000, 0),
(7042, 'STEAMER', 150000, 0),
(7043, 'SEZ TOOTH PASTE', 5000, 0),
(7044, 'GUAVA TEA SMALL 75G', 10000, 0),
(7045, 'GUAVA TEA BIG 150G', 20000, 0),
(7046, 'GYPSUM POWDER 1KG', 4000, 0),
(7047, 'SUGARCANE MACHINE ', 2000000, 0),
(7048, 'GROUNDNUT MACHINE ', 2500000, 0),
(7049, 'SLICER', 1000000, 0),
(7050, 'JUICE EXTRACTOR ', 500000, 0),
(7052, 'GLASS DIFFUSER ', 30000, 0),
(7053, 'ELECTRIC GLASS BURNER', 100000, 0),
(7054, 'MICRO WAX 1KG', 12000, 0),
(7055, 'BEE WAX 200G', 5000, 0),
(7056, 'CAR SCENT', 20000, 0),
(7057, 'BLACK STRAP MOLASSES 300ML', 10000, 0),
(7058, 'SUNFLOWER OIL 300ML', 20000, 0),
(7059, 'GROUNDNUT OIL 300ML', 20000, 0),
(7060, 'JASMINE ROLL ON SMALL', 5000, 0),
(7061, 'JASMINE ROLL ON BIG', 15000, 0),
(7062, 'FENUGREEK SEEDS BIG', 20000, 0),
(7063, 'FENUGREEK SEEDS SMALL', 10000, 0),
(7064, 'AMARANTH SEEDS BIG', 20000, 0),
(7065, 'AMARANTH SEEDS SMALL', 10000, 0),
(7066, 'POTASSIUM SALT SMALL 20G', 2000, 0),
(7071, 'borax', 20000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `name` varchar(100) NOT NULL,
  `quantityinstock` float NOT NULL,
  `measurementunits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`name`, `quantityinstock`, `measurementunits`) VALUES
('Eucalyptus globulus oil', 2097.95, 'L'),
('Lemon Eucalyptus oil', 275.055, 'L'),
('Pine oil', 915.1, 'L'),
('Coconut oil', 1341, 'L'),
('Candlenut oil', 1172.7, 'L'),
('Castor oil', 448, 'L'),
('Pumpkin oil', 660, 'L'),
('Sunflower oil', 5942.1, 'L'),
('Rosemary oil', 101.4, 'L'),
('Neem oil', 57, 'L'),
('Borax', 50, 'KG'),
('Mint oil', 9, 'L'),
('Himalayan lamps', 14, 'Pcs'),
('Chia seeds', 25.8, 'KG'),
('Lavender oil', 2, 'L');

-- --------------------------------------------------------

--
-- Table structure for table `supplierpaymentrecords`
--

CREATE TABLE `supplierpaymentrecords` (
  `paymentDate` varchar(30) NOT NULL,
  `supplyId` varchar(15) NOT NULL,
  `itemName` text,
  `Quantity` float DEFAULT NULL,
  `Units` varchar(10) DEFAULT NULL,
  `amountPaid` float NOT NULL,
  `paymentmethod` text NOT NULL,
  `transactionId` varchar(20) DEFAULT NULL,
  `chequenumber` varchar(50) DEFAULT NULL,
  `PaidBy` text NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `supplierpaymentrecords`
--

INSERT INTO `supplierpaymentrecords` (`paymentDate`, `supplyId`, `itemName`, `Quantity`, `Units`, `amountPaid`, `paymentmethod`, `transactionId`, `chequenumber`, `PaidBy`, `notes`) VALUES
('29/07/2023, 00:40:34', 'SP-12', NULL, NULL, NULL, 20000, 'Cash', NULL, NULL, 'Bridget', 'Testing Form once'),
('29/07/2023, 00:41:49', 'SP-12', NULL, NULL, NULL, 62000, 'cheque', NULL, '534654365536346', 'Prof', 'Testing Again'),
('29/07/2023, 00:42:22', 'SP-28', NULL, NULL, NULL, 100000, 'Cash', NULL, NULL, 'Bridget', 'Testing form twice'),
('29/07/2023, 01:14:24', 'SP-12', NULL, NULL, NULL, 50000, 'cheque', NULL, '3753254767652', 'Prof', ''),
('13/08/2023, 12:49:21', 'SP-8', NULL, NULL, NULL, 50000, 'Airtel Money', '4856245872520', NULL, 'Bridget', 'Testing Supplier Payment Form'),
('13/08/2023, 14:09:35', 'SP-12', NULL, NULL, NULL, 1500000, '', NULL, NULL, '', ''),
('13/08/2023, 14:52:06', 'SP-12', NULL, NULL, NULL, 50000, 'Cash', NULL, NULL, 'Bridget', 'Test 11'),
('13/08/2023, 15:07:09', 'SP-12', NULL, NULL, NULL, 0, '', NULL, NULL, '', ''),
('13/08/2023, 19:10:59', 'SP-12', 'PJ-38', 5, 'Pcs', 175000, '', NULL, NULL, 'Prof', 'Testing Item Form'),
('13/08/2023, 19:37:19', 'SP-12', 'Levanda Oil 20 mls', 3, 'Pcs', 0, '', NULL, NULL, 'Bridget', 'RRRR'),
('13/08/2023, 19:50:32', 'SP-12', '4', 4, '', 14000, '', NULL, NULL, 'Bridget', 'Testing'),
('13/08/2023, 20:15:33', 'SP-12', NULL, 2, 'Pcs', 16000, '', NULL, NULL, 'Bridget', 'YY Form'),
('13/08/2023, 20:17:52', 'SP-12', 'Levanda Oil 20 mls', 2, 'Pcs', 30000, '', NULL, NULL, 'Bridget', 'QQ Form Testing'),
('14/08/2023, 21:28:55', 'SP-60', NULL, 1, '', 100000, 'MTN MoMo', '12674574367530', NULL, 'Bridget', 'Test'),
('14/08/2023, 21:29:25', 'SP-60', NULL, 1, '', 200000, 'Cheque', NULL, '679548675896006', 'Prof', 'Test'),
('14/08/2023, 21:31:36', 'SP-60', 'Ginger 50 grams', 2, 'Pcs', 15000, '', NULL, NULL, 'Bridget', 'Test'),
('14/08/2023, 22:38:33', 'SP-27', NULL, 1, '', 30000, 'Cash', NULL, NULL, 'Bridget', ''),
('14/08/2023, 22:38:59', 'SP-27', NULL, 1, '', 100000, 'Cheque', NULL, '564879643853855', 'Prof', ''),
('14/08/2023, 22:39:55', 'SP-27', 'Levanda Oil 20 mls', 2, 'Pcs', 30000, '', NULL, NULL, 'Bridget', '');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplyId` varchar(10) NOT NULL,
  `suppliernames` text NOT NULL,
  `supplydate` varchar(30) NOT NULL,
  `branchsupplied` text NOT NULL,
  `itemssupplied` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `quantitysupplied` float NOT NULL,
  `units` varchar(30) NOT NULL,
  `totalsupplycost` float NOT NULL,
  `balance` float NOT NULL,
  `paymentmethod` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `paymentstatus` text NOT NULL,
  `transactionId` varchar(20) DEFAULT NULL,
  `chequenumber` varchar(50) DEFAULT NULL,
  `receivedBy` text NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplyId`, `suppliernames`, `supplydate`, `branchsupplied`, `itemssupplied`, `quantitysupplied`, `units`, `totalsupplycost`, `balance`, `paymentmethod`, `paymentstatus`, `transactionId`, `chequenumber`, `receivedBy`, `notes`) VALUES
('SP-12', 'xxx zzz aaa', '12/07/2023', 'masanafu', 'cedar', 32, 'KG', 400000, 93000, NULL, 'partially paid', NULL, NULL, 'Gloria', 'test'),
('SP-27', 'STEVEN  NKUGWA', '14/08/2023, 22:36:47', 'namungoona', 'Levandah Oil', 200, 'L', 450000, 90000, 'Cash', 'partially paid', NULL, NULL, 'Brenda', ''),
('SP-28', 'ZZIWA RAYMOND IAN', '28/07/2023, 23:30:00', 'namungoona', 'Levanda Oil', 25, 'L', 250000, 150000, 'Cash', 'partially paid', NULL, NULL, 'Brenda', ''),
('SP-37', 'BRIAN HOME', '11/10/2023, 14:45:36', 'namungoona', 'Levandah oil', 50, 'L', 500000, 250000, 'Cash', 'partially Paid', NULL, NULL, 'brian', 'final test'),
('SP-38', 'LWASA  REAGAN', '28/07/2023, 23:31:06', 'namungoona', 'Avocado Oil', 12, 'L', 75000, 55000, 'MTN MoMo', 'partially Paid', '85693475682451', NULL, 'Brenda', 'Test'),
('SP-60', 'SAM  ODEKE', '14/08/2023, 21:28:09', 'namungoona', 'Cedar', 50, 'KG', 780000, 265000, 'Cash', 'partially paid', NULL, NULL, 'Brenda', 'Test'),
('SP-8', 'ZZIWA RAYMOND IAN', '13/08/2023, 12:11:56', 'namungoona', 'Levandah Oil', 56, 'L', 560000, 260000, 'Cash', 'partially paid', NULL, NULL, 'Brenda', 'Testing Form');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `branch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `department` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'supervisor',
  `dob` varchar(100) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dateofregistration` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `firstname`, `lastname`, `branch`, `department`, `role`, `dob`, `contact`, `email`, `gender`, `dateofregistration`, `password`) VALUES
('bridget', 'zziwa', 'raymond', 'equatorial', 'shop', 'equatorialshopmanager', '2001-07-02', '0701303137', 'ee@gmail.com', 'Male', '7-07-2023', '$2a$10$QkwkyxJvMz6eR5x4HE7wQ.3ETgXsOaB7ha/RyyLhzBEPvp6BaYDCW'),
('cholthon', 'Chol', 'Thon', 'equatorial', 'labelling', 'equatoriallabellingmanager', '2001-07-02', '0784927375', 'ckthon@gmial.ocm', 'male', '2023-08-1', '$2a$10$l179/eI74pQHKEwXl93Q9.lNxEB98PnqUeSeRzMcLQCAX5lyN1nVK'),
('edrine', 'Edrine', 'Edrine', 'equatorial', 'shop', 'equatorialdebtmanager', '2001-07-02', '0775149572', 'qq@gmail.com', 'male', '2023-08-1', '$2a$12$A5VTRWOyjj9CpHcKoqGNj.MycQKQ.kE5bfr777XMiK.s5JqRJ3XhW'),
('fred', 'Ngenda', 'Fred', 'equatorial', 'massage', 'massagemanager', '2001-07-02', '0782169837', 'fredngenda86@gmail.com', 'Male', '7-07-2023', '$2a$10$LpF45TQ3m6AbeWu6lj5XCOetQgs2brR7IWp/AKs5waLqWM9xGhUki'),
('gloria', 'Nakitende', 'Gloria', 'equatorial', 'shop', 'equatorialinventorycustodian', '2001-07-02', '0701951913', 'glorianakitende2012@gmial.ocm', 'female', '2023-08-1', '$2a$10$3qlbwCsLUGx8t1hvyDcDHuqmpFlrQIIiotRoUWP9Uf3rXUSvuCsxe'),
('jalia', 'Julia', 'Hajatti', 'masanafu', 'chickenfarm', 'chickenfarmmanager', 'unknown', '0700367023', 'unknown', 'Female', '2023-08-28', '$2a$12$h91jDnBLxFyu7CWOnLpQM.v75/6vlPaRcylDpxDvs53yHeO.UkbSu'),
('john', 'Omugethum', 'John Kahindi', 'equatorial', 'labelling', 'equatoriallabellingmanager', '2001-07-02', '0782207031', 'jkomugethum@gmial.ocm', 'male', '2023-08-1', '$2a$10$fQqud4dQetH3wcy0BAWxkubxSWM1bCT1IERE.nQ8mw5d7eeKbrQJC'),
('ken', 'ken', 'ken', 'masanafu', 'chickenfarm', 'chickenfarmmanager', 'unknown', '0753955505', 'unknown', 'Male', '2023-08-28', '$2a$12$NLnvT.3dvXltUXrtSQQrHuupVVPpX.renWZ20adRIxeGNf57VMBiS'),
('nakiwalabrenda', 'Nakiwala', 'Brenda', 'namungoona', 'inventory', 'supervisor', '1997-11-09', '0777083417', 'nakiwalaruth@gmail.com', 'Female', '2023-02-25 08:28:30.848', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('namugangamaria', 'Namuganga', 'Maria', 'Masanafu', 'production', 'custodian', '2000-11-29', '0755847378', 'nalutayamarienick@gmail.com', 'Female', '2023-04-28', '$2a$12$cfDeaqbBUG1f4UXM/sVNU.9wFsXBLK/gGFTgS7KOa7mKlqy4h2Gey'),
('ngoloberobert', 'Ngolobe', 'Robert', 'namungoona', 'inventory', 'supervisor', '1992-10-09', '0787843064', 'ngoloberobert73@gmail.com', 'Male', '2023-02-25 08:30:52.756', '$2a$10$kyBYGutINIIcX.67ahsc2.m0zToeVYKuSBvZBKPzEPJYKN5DZL0nG'),
('profadmin', 'Prof', 'Admin', 'admin', '', '', '2023-02-25', '0779519652', 'Profbioresearch@gmail.com', 'Male', '2023-02-25 08:41:58.988', '$2a$12$VKcdPD2M2QnnF5mAmlZhqOL47E6LzYdt.QLbqy5RnZtKgvbk46Yyy'),
('test', 'Ngenda', 'Fred', 'equatorial', 'massage', 'massagemanager', '2001-07-02', '0782169837', 'fredngenda86@gmail.com', 'Male', '7-07-2023', '$2a$12$LJAng9NGPnN3vJqOrxQ//.zYvkJ2xFEMWN/.UJBt3a8xc6NqZ8Pju'),
('tony', 'Kisuule', 'Tony', 'equatorial', 'projects', 'equatorialprojectsmanager', '2001-07-02', '0750875909', 'tonykisuule500@gmail.com', 'Male', '7-07-2023', '$2a$12$/O3GspCNlPaja9pUy77RzeVwX4MrXYjC6Hqy1/pwy1Q7pDayxA9TS'),
('za1', 'ZZIWA', 'RAYMOND', 'masanafu', 'shop', 'shopmanager', '2001-07-02', '0775149572', 'raymondzian@gmailcom', 'Male', '2023-06-04', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za8', 'zz', 'rr', 'equatorial', 'labelling', 'equatoriallabellingmanager', '2001-07-02', '0775149572', 'raymondzian@gmial.ocm', 'male', '2023-08-1', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za9', 'zziwa', 'raymond', 'buwama', 'farm', 'farmmanager', '02-07-2001', '0775149572', 'raymondzian@gmail.com', 'male', '9-05-2023', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('zaz', 'zaz', 'zaz', 'masanafu', 'projects', 'projectsmanager', '2001-07-02', '0775563805', 'raymondzian@gmail.com', 'male', '2023-05-18', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('zray', 'Zziwa', 'Raymond ', 'masanafu', 'production', 'manager', '2001-07-02', '0779632420', 'raymondzian@gmail.com', 'Male', '2023-03-06 10:44:00.779', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('zray1', 'zziwa', 'raymond', 'masanafu', 'farm', 'farmmanager', '02-07-2001', '0775149572', 'raymondzian@gmail.com', 'female', '9-05-2023', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batchfeedingrecords`
--
ALTER TABLE `batchfeedingrecords`
  ADD KEY `batchnumber` (`batchnumber`,`feedsid`),
  ADD KEY `feedsid` (`feedsid`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch`);

--
-- Indexes for table `buwamabatchfeedingrecords`
--
ALTER TABLE `buwamabatchfeedingrecords`
  ADD KEY `batchnumber` (`batchnumber`,`feedsid`),
  ADD KEY `feedsid` (`feedsid`);

--
-- Indexes for table `buwamachickenbatchfcrrecords`
--
ALTER TABLE `buwamachickenbatchfcrrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `buwamachickenbatchhealth`
--
ALTER TABLE `buwamachickenbatchhealth`
  ADD KEY `batchnumber` (`batchnumber`),
  ADD KEY `medicineId` (`medicinename`);

--
-- Indexes for table `buwamachickenbatchmortalities`
--
ALTER TABLE `buwamachickenbatchmortalities`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `buwamachickenfarmbatches`
--
ALTER TABLE `buwamachickenfarmbatches`
  ADD PRIMARY KEY (`batchnumber`);

--
-- Indexes for table `buwamachickenfeedsinventory`
--
ALTER TABLE `buwamachickenfeedsinventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `buwamachickenfeedsinventoryrecords`
--
ALTER TABLE `buwamachickenfeedsinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `buwamachickenmedicineinventory`
--
ALTER TABLE `buwamachickenmedicineinventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `buwamachickenmedicineinventoryrecords`
--
ALTER TABLE `buwamachickenmedicineinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `buwamaeggproductionrecords`
--
ALTER TABLE `buwamaeggproductionrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `buwamafarm`
--
ALTER TABLE `buwamafarm`
  ADD KEY `batchno` (`batchno`);

--
-- Indexes for table `buwamafarmrequests`
--
ALTER TABLE `buwamafarmrequests`
  ADD PRIMARY KEY (`batchno`);

--
-- Indexes for table `buwamaGeneralStoreInventory`
--
ALTER TABLE `buwamaGeneralStoreInventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `buwamageneralstoreinventoryrecords`
--
ALTER TABLE `buwamageneralstoreinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `buwamaitems`
--
ALTER TABLE `buwamaitems`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `buwamalivestockbatchfcrrecords`
--
ALTER TABLE `buwamalivestockbatchfcrrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `buwamalivestockbatchfeedingrecords`
--
ALTER TABLE `buwamalivestockbatchfeedingrecords`
  ADD KEY `batchnumber` (`batchnumber`,`feedsid`),
  ADD KEY `feedsid` (`feedsid`);

--
-- Indexes for table `buwamalivestockbatchhealth`
--
ALTER TABLE `buwamalivestockbatchhealth`
  ADD KEY `batchnumber` (`batchnumber`),
  ADD KEY `medicineId` (`medicinename`);

--
-- Indexes for table `buwamalivestockbatchmortalities`
--
ALTER TABLE `buwamalivestockbatchmortalities`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `buwamalivestockfarmbatches`
--
ALTER TABLE `buwamalivestockfarmbatches`
  ADD PRIMARY KEY (`batchnumber`);

--
-- Indexes for table `buwamalivestockfeeds`
--
ALTER TABLE `buwamalivestockfeeds`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `buwamalivestockmanureproductionrecords`
--
ALTER TABLE `buwamalivestockmanureproductionrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `buwamalivestockmedicine`
--
ALTER TABLE `buwamalivestockmedicine`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `buwamalivestockmilkproductionrecords`
--
ALTER TABLE `buwamalivestockmilkproductionrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `chickenbatchfcrrecords`
--
ALTER TABLE `chickenbatchfcrrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `chickenbatchhealth`
--
ALTER TABLE `chickenbatchhealth`
  ADD KEY `batchnumber` (`batchnumber`),
  ADD KEY `medicineId` (`medicinename`);

--
-- Indexes for table `chickenbatchmortalities`
--
ALTER TABLE `chickenbatchmortalities`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `clientprojectorders`
--
ALTER TABLE `clientprojectorders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `itemname` (`itemname`);

--
-- Indexes for table `clientprojectspayments`
--
ALTER TABLE `clientprojectspayments`
  ADD KEY `supplyId` (`orderId`);

--
-- Indexes for table `companycheques`
--
ALTER TABLE `companycheques`
  ADD PRIMARY KEY (`chequeId`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department`),
  ADD KEY `branch` (`branch`);

--
-- Indexes for table `eggproductionrecords`
--
ALTER TABLE `eggproductionrecords`
  ADD KEY `batchnumber` (`batchnumber`);

--
-- Indexes for table `equatorialcustodianreleasedinventory`
--
ALTER TABLE `equatorialcustodianreleasedinventory`
  ADD PRIMARY KEY (`releaseId`),
  ADD KEY `itemreleasedId` (`itemreleasedId`);

--
-- Indexes for table `equatorialexpensesreceipts`
--
ALTER TABLE `equatorialexpensesreceipts`
  ADD KEY `expenditureid` (`expenditureid`),
  ADD KEY `expenditureid_2` (`expenditureid`);

--
-- Indexes for table `equatorialgeneralstoreinventory`
--
ALTER TABLE `equatorialgeneralstoreinventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `equatorialgeneralstorerestockrecords`
--
ALTER TABLE `equatorialgeneralstorerestockrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `equatoriallabellingdailyoutput`
--
ALTER TABLE `equatoriallabellingdailyoutput`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `equatoriallabellinginventory`
--
ALTER TABLE `equatoriallabellinginventory`
  ADD KEY `productId` (`itemid`);

--
-- Indexes for table `equatoriallabellinginventoryrecords`
--
ALTER TABLE `equatoriallabellinginventoryrecords`
  ADD PRIMARY KEY (`restockId`),
  ADD KEY `itemId` (`itemId`);

--
-- Indexes for table `equatorialMassageInventory`
--
ALTER TABLE `equatorialMassageInventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `equatorialmassageinventoryrecords`
--
ALTER TABLE `equatorialmassageinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `equatorialmassagemoneysubmission`
--
ALTER TABLE `equatorialmassagemoneysubmission`
  ADD PRIMARY KEY (`submissionId`);

--
-- Indexes for table `equatorialMassageSales`
--
ALTER TABLE `equatorialMassageSales`
  ADD PRIMARY KEY (`receiptNumber`);

--
-- Indexes for table `equatorialmassagesalespayments`
--
ALTER TABLE `equatorialmassagesalespayments`
  ADD KEY `receiptNumber` (`receiptNumber`),
  ADD KEY `receiptNumber_2` (`receiptNumber`);

--
-- Indexes for table `equatorialMassageServicesRecords`
--
ALTER TABLE `equatorialMassageServicesRecords`
  ADD PRIMARY KEY (`receiptNumber`);

--
-- Indexes for table `equatorialmassagesubscriptions`
--
ALTER TABLE `equatorialmassagesubscriptions`
  ADD PRIMARY KEY (`subscriptionId`);

--
-- Indexes for table `equatorialmassagesubscriptionusage`
--
ALTER TABLE `equatorialmassagesubscriptionusage`
  ADD KEY `subscriptionId` (`subscriptionId`,`serviceOfferedId`),
  ADD KEY `serviceOfferedId` (`serviceOfferedId`);

--
-- Indexes for table `equatorialncts`
--
ALTER TABLE `equatorialncts`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `iteminid` (`iteminid`,`itemoutid`),
  ADD KEY `itemoutid` (`itemoutid`);

--
-- Indexes for table `equatorialprojectsclientpaymentplans`
--
ALTER TABLE `equatorialprojectsclientpaymentplans`
  ADD KEY `receiptNumber` (`receiptNumber`),
  ADD KEY `receiptNumber_2` (`receiptNumber`);

--
-- Indexes for table `equatorialProjectsInventory`
--
ALTER TABLE `equatorialProjectsInventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `equatorialProjectsInventoryrecords`
--
ALTER TABLE `equatorialProjectsInventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `equatorialProjectsSales`
--
ALTER TABLE `equatorialProjectsSales`
  ADD PRIMARY KEY (`receiptNumber`);

--
-- Indexes for table `equatorialprojectssalespayments`
--
ALTER TABLE `equatorialprojectssalespayments`
  ADD KEY `receiptNumber` (`receiptNumber`),
  ADD KEY `receiptNumber_2` (`receiptNumber`);

--
-- Indexes for table `equatorialshopexpenditure`
--
ALTER TABLE `equatorialshopexpenditure`
  ADD PRIMARY KEY (`expenditureid`);

--
-- Indexes for table `equatorialshopexpensespayments`
--
ALTER TABLE `equatorialshopexpensespayments`
  ADD KEY `expenseid` (`expenseid`);

--
-- Indexes for table `equatorialShopInventory`
--
ALTER TABLE `equatorialShopInventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `equatorialshopinventoryrecords`
--
ALTER TABLE `equatorialshopinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `equatorialShopSales`
--
ALTER TABLE `equatorialShopSales`
  ADD PRIMARY KEY (`receiptNumber`);

--
-- Indexes for table `equatorialshopsalespayments`
--
ALTER TABLE `equatorialshopsalespayments`
  ADD KEY `receiptNumber` (`receiptNumber`),
  ADD KEY `receiptNumber_2` (`receiptNumber`),
  ADD KEY `itemin` (`itemin`);

--
-- Indexes for table `exhibitionincome`
--
ALTER TABLE `exhibitionincome`
  ADD KEY `exhibitionId` (`exhibitionId`);

--
-- Indexes for table `exhibitions`
--
ALTER TABLE `exhibitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exhibitionsales`
--
ALTER TABLE `exhibitionsales`
  ADD PRIMARY KEY (`receiptNumber`),
  ADD KEY `exhibitionId` (`exhibitionId`);

--
-- Indexes for table `expensesreceipts`
--
ALTER TABLE `expensesreceipts`
  ADD KEY `expenditureid` (`expenditureid`),
  ADD KEY `expenditureid_2` (`expenditureid`);

--
-- Indexes for table `externalreceipts`
--
ALTER TABLE `externalreceipts`
  ADD PRIMARY KEY (`receiptnumber`);

--
-- Indexes for table `farm`
--
ALTER TABLE `farm`
  ADD KEY `batchno` (`batchno`);

--
-- Indexes for table `farmrequests`
--
ALTER TABLE `farmrequests`
  ADD PRIMARY KEY (`batchno`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `inventorytransactions`
--
ALTER TABLE `inventorytransactions`
  ADD KEY `inventoryname` (`inventoryname`),
  ADD KEY `recievedby` (`recievedby`),
  ADD KEY `broughtby` (`broughtby`);

--
-- Indexes for table `labelledinventorydeliveryrecords`
--
ALTER TABLE `labelledinventorydeliveryrecords`
  ADD PRIMARY KEY (`deliveryId`),
  ADD KEY `itemId` (`itemId`);

--
-- Indexes for table `machinery`
--
ALTER TABLE `machinery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `masanafuchickenfarmbatches`
--
ALTER TABLE `masanafuchickenfarmbatches`
  ADD PRIMARY KEY (`batchnumber`);

--
-- Indexes for table `masanafuchickenfarmexpenditure`
--
ALTER TABLE `masanafuchickenfarmexpenditure`
  ADD PRIMARY KEY (`expenditureid`);

--
-- Indexes for table `masanafuchickenfeeds`
--
ALTER TABLE `masanafuchickenfeeds`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `masanafuchickenfeedsinventory`
--
ALTER TABLE `masanafuchickenfeedsinventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `masanafuchickenfeedsinventoryrecords`
--
ALTER TABLE `masanafuchickenfeedsinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `masanafuchickenmedicine`
--
ALTER TABLE `masanafuchickenmedicine`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `masanafuchickenmedicineinventory`
--
ALTER TABLE `masanafuchickenmedicineinventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `masanafuchickenmedicineinventoryrecords`
--
ALTER TABLE `masanafuchickenmedicineinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `masanafushopexpenditure`
--
ALTER TABLE `masanafushopexpenditure`
  ADD PRIMARY KEY (`expenditureid`);

--
-- Indexes for table `masanafushopexpensespayments`
--
ALTER TABLE `masanafushopexpensespayments`
  ADD KEY `expenseid` (`expenseid`);

--
-- Indexes for table `masanafuShopInventory`
--
ALTER TABLE `masanafuShopInventory`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `masanafushopinventoryrecords`
--
ALTER TABLE `masanafushopinventoryrecords`
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `masanafuShopSales`
--
ALTER TABLE `masanafuShopSales`
  ADD PRIMARY KEY (`receiptNumber`);

--
-- Indexes for table `masanafushopsalespayments`
--
ALTER TABLE `masanafushopsalespayments`
  ADD KEY `receiptNumber` (`receiptNumber`),
  ADD KEY `receiptNumber_2` (`receiptNumber`);

--
-- Indexes for table `massageServices`
--
ALTER TABLE `massageServices`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mgeneralstore`
--
ALTER TABLE `mgeneralstore`
  ADD KEY `name` (`name`);

--
-- Indexes for table `mpstore`
--
ALTER TABLE `mpstore`
  ADD KEY `name` (`name`);

--
-- Indexes for table `productionrecords`
--
ALTER TABLE `productionrecords`
  ADD PRIMARY KEY (`productionid`),
  ADD KEY `orderid` (`orderid`);

--
-- Indexes for table `productorders`
--
ALTER TABLE `productorders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `product_prices`
--
ALTER TABLE `product_prices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectsequipmentrequisitions`
--
ALTER TABLE `projectsequipmentrequisitions`
  ADD PRIMARY KEY (`requisitionid`),
  ADD KEY `orderid` (`orderid`);

--
-- Indexes for table `ProjectsItems`
--
ALTER TABLE `ProjectsItems`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `projectsorders`
--
ALTER TABLE `projectsorders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `projectsrecords`
--
ALTER TABLE `projectsrecords`
  ADD KEY `orderid` (`orderid`);

--
-- Indexes for table `rawmaterialrequisitions`
--
ALTER TABLE `rawmaterialrequisitions`
  ADD PRIMARY KEY (`requisitionid`),
  ADD KEY `orderid` (`orderid`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD KEY `machineid` (`machineid`);

--
-- Indexes for table `saphroneparticipantperformance`
--
ALTER TABLE `saphroneparticipantperformance`
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `saphroneparticipants`
--
ALTER TABLE `saphroneparticipants`
  ADD PRIMARY KEY (`employeeId`);

--
-- Indexes for table `saphroneperformancerecords`
--
ALTER TABLE `saphroneperformancerecords`
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `shopProducts`
--
ALTER TABLE `shopProducts`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD KEY `name` (`name`);

--
-- Indexes for table `supplierpaymentrecords`
--
ALTER TABLE `supplierpaymentrecords`
  ADD KEY `supplyId` (`supplyId`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplyId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `branch` (`branch`,`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buwamaitems`
--
ALTER TABLE `buwamaitems`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `buwamalivestockfeeds`
--
ALTER TABLE `buwamalivestockfeeds`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `buwamalivestockmedicine`
--
ALTER TABLE `buwamalivestockmedicine`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `equatorialcustodianreleasedinventory`
--
ALTER TABLE `equatorialcustodianreleasedinventory`
  MODIFY `releaseId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equatoriallabellingdailyoutput`
--
ALTER TABLE `equatoriallabellingdailyoutput`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `equatorialncts`
--
ALTER TABLE `equatorialncts`
  MODIFY `transactionId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equatorialshopexpenditure`
--
ALTER TABLE `equatorialshopexpenditure`
  MODIFY `expenditureid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exhibitions`
--
ALTER TABLE `exhibitions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `labelledinventorydeliveryrecords`
--
ALTER TABLE `labelledinventorydeliveryrecords`
  MODIFY `deliveryId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `machinery`
--
ALTER TABLE `machinery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `masanafuchickenfarmexpenditure`
--
ALTER TABLE `masanafuchickenfarmexpenditure`
  MODIFY `expenditureid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `masanafuchickenfeeds`
--
ALTER TABLE `masanafuchickenfeeds`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `masanafuchickenmedicine`
--
ALTER TABLE `masanafuchickenmedicine`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `masanafushopexpenditure`
--
ALTER TABLE `masanafushopexpenditure`
  MODIFY `expenditureid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product_prices`
--
ALTER TABLE `product_prices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopProducts`
--
ALTER TABLE `shopProducts`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7072;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batchfeedingrecords`
--
ALTER TABLE `batchfeedingrecords`
  ADD CONSTRAINT `batchfeedingrecords_ibfk_1` FOREIGN KEY (`batchnumber`) REFERENCES `masanafuchickenfarmbatches` (`batchnumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `batchfeedingrecords_ibfk_2` FOREIGN KEY (`feedsid`) REFERENCES `buwamalivestockfeeds` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chickenbatchfcrrecords`
--
ALTER TABLE `chickenbatchfcrrecords`
  ADD CONSTRAINT `chickenbatchfcrrecords_ibfk_1` FOREIGN KEY (`batchnumber`) REFERENCES `masanafuchickenfarmbatches` (`batchnumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chickenbatchhealth`
--
ALTER TABLE `chickenbatchhealth`
  ADD CONSTRAINT `chickenbatchhealth_ibfk_1` FOREIGN KEY (`batchnumber`) REFERENCES `masanafuchickenfarmbatches` (`batchnumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chickenbatchhealth_ibfk_2` FOREIGN KEY (`medicinename`) REFERENCES `masanafuchickenmedicine` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chickenbatchmortalities`
--
ALTER TABLE `chickenbatchmortalities`
  ADD CONSTRAINT `chickenbatchmortalities_ibfk_1` FOREIGN KEY (`batchnumber`) REFERENCES `masanafuchickenfarmbatches` (`batchnumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clientprojectorders`
--
ALTER TABLE `clientprojectorders`
  ADD CONSTRAINT `clientprojectorders_ibfk_1` FOREIGN KEY (`itemname`) REFERENCES `ProjectsItems` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clientprojectspayments`
--
ALTER TABLE `clientprojectspayments`
  ADD CONSTRAINT `clientprojectspayments_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `clientprojectorders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`branch`) REFERENCES `branches` (`branch`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `eggproductionrecords`
--
ALTER TABLE `eggproductionrecords`
  ADD CONSTRAINT `eggproductionrecords_ibfk_1` FOREIGN KEY (`batchnumber`) REFERENCES `masanafuchickenfarmbatches` (`batchnumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialcustodianreleasedinventory`
--
ALTER TABLE `equatorialcustodianreleasedinventory`
  ADD CONSTRAINT `equatorialcustodianreleasedinventory_ibfk_1` FOREIGN KEY (`itemreleasedId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialexpensesreceipts`
--
ALTER TABLE `equatorialexpensesreceipts`
  ADD CONSTRAINT `equatorialexpensesreceipts_ibfk_1` FOREIGN KEY (`expenditureid`) REFERENCES `equatorialshopexpenditure` (`expenditureid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialgeneralstoreinventory`
--
ALTER TABLE `equatorialgeneralstoreinventory`
  ADD CONSTRAINT `equatorialgeneralstoreinventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatoriallabellingdailyoutput`
--
ALTER TABLE `equatoriallabellingdailyoutput`
  ADD CONSTRAINT `equatoriallabellingdailyoutput_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatoriallabellinginventory`
--
ALTER TABLE `equatoriallabellinginventory`
  ADD CONSTRAINT `equatoriallabellinginventory_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatoriallabellinginventoryrecords`
--
ALTER TABLE `equatoriallabellinginventoryrecords`
  ADD CONSTRAINT `equatoriallabellinginventoryrecords_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialMassageInventory`
--
ALTER TABLE `equatorialMassageInventory`
  ADD CONSTRAINT `equatorialMassageInventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialmassagesalespayments`
--
ALTER TABLE `equatorialmassagesalespayments`
  ADD CONSTRAINT `equatorialmassagesalespayments_ibfk_1` FOREIGN KEY (`receiptNumber`) REFERENCES `equatorialMassageSales` (`receiptNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialmassagesubscriptionusage`
--
ALTER TABLE `equatorialmassagesubscriptionusage`
  ADD CONSTRAINT `equatorialmassagesubscriptionusage_ibfk_1` FOREIGN KEY (`subscriptionId`) REFERENCES `equatorialmassagesubscriptions` (`subscriptionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equatorialmassagesubscriptionusage_ibfk_2` FOREIGN KEY (`serviceOfferedId`) REFERENCES `massageServices` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialncts`
--
ALTER TABLE `equatorialncts`
  ADD CONSTRAINT `equatorialncts_ibfk_1` FOREIGN KEY (`iteminid`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equatorialncts_ibfk_2` FOREIGN KEY (`itemoutid`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialprojectsclientpaymentplans`
--
ALTER TABLE `equatorialprojectsclientpaymentplans`
  ADD CONSTRAINT `equatorialprojectsclientpaymentplans_ibfk_1` FOREIGN KEY (`receiptNumber`) REFERENCES `equatorialProjectsSales` (`receiptNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialProjectsInventory`
--
ALTER TABLE `equatorialProjectsInventory`
  ADD CONSTRAINT `equatorialProjectsInventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `ProjectsItems` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialProjectsInventoryrecords`
--
ALTER TABLE `equatorialProjectsInventoryrecords`
  ADD CONSTRAINT `equatorialProjectsInventoryrecords_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `ProjectsItems` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialprojectssalespayments`
--
ALTER TABLE `equatorialprojectssalespayments`
  ADD CONSTRAINT `equatorialprojectssalespayments_ibfk_1` FOREIGN KEY (`receiptNumber`) REFERENCES `equatorialProjectsSales` (`receiptNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialshopexpensespayments`
--
ALTER TABLE `equatorialshopexpensespayments`
  ADD CONSTRAINT `equatorialshopexpensespayments_ibfk_1` FOREIGN KEY (`expenseid`) REFERENCES `equatorialshopexpenditure` (`expenditureid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialShopInventory`
--
ALTER TABLE `equatorialShopInventory`
  ADD CONSTRAINT `equatorialShopInventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialshopinventoryrecords`
--
ALTER TABLE `equatorialshopinventoryrecords`
  ADD CONSTRAINT `equatorialshopinventoryrecords_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equatorialshopsalespayments`
--
ALTER TABLE `equatorialshopsalespayments`
  ADD CONSTRAINT `equatorialshopsalespayments_ibfk_1` FOREIGN KEY (`receiptNumber`) REFERENCES `equatorialShopSales` (`receiptNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exhibitionincome`
--
ALTER TABLE `exhibitionincome`
  ADD CONSTRAINT `exhibitionincome_ibfk_1` FOREIGN KEY (`exhibitionId`) REFERENCES `exhibitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exhibitionsales`
--
ALTER TABLE `exhibitionsales`
  ADD CONSTRAINT `exhibitionsales_ibfk_1` FOREIGN KEY (`exhibitionId`) REFERENCES `exhibitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `expensesreceipts`
--
ALTER TABLE `expensesreceipts`
  ADD CONSTRAINT `expensesreceipts_ibfk_1` FOREIGN KEY (`expenditureid`) REFERENCES `masanafushopexpenditure` (`expenditureid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventorytransactions`
--
ALTER TABLE `inventorytransactions`
  ADD CONSTRAINT `inventorytransactions_ibfk_1` FOREIGN KEY (`inventoryname`) REFERENCES `inventory` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `labelledinventorydeliveryrecords`
--
ALTER TABLE `labelledinventorydeliveryrecords`
  ADD CONSTRAINT `labelledinventorydeliveryrecords_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafuchickenfeedsinventory`
--
ALTER TABLE `masanafuchickenfeedsinventory`
  ADD CONSTRAINT `masanafuchickenfeedsinventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `buwamalivestockfeeds` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafuchickenfeedsinventoryrecords`
--
ALTER TABLE `masanafuchickenfeedsinventoryrecords`
  ADD CONSTRAINT `masanafuchickenfeedsinventoryrecords_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `buwamalivestockfeeds` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafuchickenmedicineinventory`
--
ALTER TABLE `masanafuchickenmedicineinventory`
  ADD CONSTRAINT `masanafuchickenmedicineinventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `masanafuchickenmedicine` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafuchickenmedicineinventoryrecords`
--
ALTER TABLE `masanafuchickenmedicineinventoryrecords`
  ADD CONSTRAINT `masanafuchickenmedicineinventoryrecords_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `masanafuchickenmedicine` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafushopexpensespayments`
--
ALTER TABLE `masanafushopexpensespayments`
  ADD CONSTRAINT `masanafushopexpensespayments_ibfk_1` FOREIGN KEY (`expenseid`) REFERENCES `masanafushopexpenditure` (`expenditureid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafuShopInventory`
--
ALTER TABLE `masanafuShopInventory`
  ADD CONSTRAINT `masanafuShopInventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafushopinventoryrecords`
--
ALTER TABLE `masanafushopinventoryrecords`
  ADD CONSTRAINT `masanafushopinventoryrecords_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `shopProducts` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafushopsalespayments`
--
ALTER TABLE `masanafushopsalespayments`
  ADD CONSTRAINT `masanafushopsalespayments_ibfk_1` FOREIGN KEY (`receiptNumber`) REFERENCES `masanafuShopSales` (`receiptNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mgeneralstore`
--
ALTER TABLE `mgeneralstore`
  ADD CONSTRAINT `mgeneralstore_ibfk_1` FOREIGN KEY (`name`) REFERENCES `inventory` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mpstore`
--
ALTER TABLE `mpstore`
  ADD CONSTRAINT `mpstore_ibfk_1` FOREIGN KEY (`name`) REFERENCES `inventory` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productionrecords`
--
ALTER TABLE `productionrecords`
  ADD CONSTRAINT `productionrecords_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `productorders` (`orderid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectsequipmentrequisitions`
--
ALTER TABLE `projectsequipmentrequisitions`
  ADD CONSTRAINT `projectsequipmentrequisitions_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `projectsorders` (`orderid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectsrecords`
--
ALTER TABLE `projectsrecords`
  ADD CONSTRAINT `projectsrecords_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `projectsorders` (`orderid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rawmaterialrequisitions`
--
ALTER TABLE `rawmaterialrequisitions`
  ADD CONSTRAINT `rawmaterialrequisitions_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `productorders` (`orderid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requirements`
--
ALTER TABLE `requirements`
  ADD CONSTRAINT `requirements_ibfk_1` FOREIGN KEY (`machineid`) REFERENCES `machinery` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `saphroneparticipantperformance`
--
ALTER TABLE `saphroneparticipantperformance`
  ADD CONSTRAINT `saphroneparticipantperformance_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `saphroneparticipants` (`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `saphroneperformancerecords`
--
ALTER TABLE `saphroneperformancerecords`
  ADD CONSTRAINT `saphroneperformancerecords_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `saphroneparticipants` (`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`name`) REFERENCES `inventory` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supplierpaymentrecords`
--
ALTER TABLE `supplierpaymentrecords`
  ADD CONSTRAINT `supplierpaymentrecords_ibfk_1` FOREIGN KEY (`supplyId`) REFERENCES `suppliers` (`supplyId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
