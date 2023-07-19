-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 17, 2023 at 03:32 PM
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

--
-- Dumping data for table `batchfeedingrecords`
--

INSERT INTO `batchfeedingrecords` (`batchnumber`, `date`, `feedsid`, `feedsquantity`, `munits`, `notes`) VALUES
('CB-13747', '19/06/2023', 10, 5, 'Kgs', 'Testing Feeding Form'),
('CB-3061', '19/06/2023', 10, 15, 'Kgs', 'Testing Again'),
('CB-13747', '19/06/2023', 10, 15, 'Kgs', 'Adding on quantity'),
('CB-13747', '19/06/2023', 10, 78, 'Kgs', 'Adding on quantity eaten'),
('CB-6252', '19/06/2023', 9, 15, 'Kgs', 'Feeding'),
('CB-12488', '22/06/2023', 10, 2, 'Kgs', 'Testing');

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
-- Table structure for table `chickenbatchfcrrecords`
--

CREATE TABLE `chickenbatchfcrrecords` (
  `batchnumber` varchar(15) NOT NULL,
  `totalfeedsconsumed` float NOT NULL,
  `totaleggsproduced` float NOT NULL,
  `fcrvalue` float NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `chickenbatchfcrrecords`
--

INSERT INTO `chickenbatchfcrrecords` (`batchnumber`, `totalfeedsconsumed`, `totaleggsproduced`, `fcrvalue`, `notes`) VALUES
('CB-13747', 98, 1177, 0.08, 'Testing FCR form logic'),
('CB-3061', 15, 200, 0.07, 'Testing again and collecting data for fcr graph');

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
('CB-13747', 'vaccination', '19/06/2023', '2023-07-19', 1, 5, 'Worms', 'Testing '),
('CB-13747', 'vaccination', '19/06/2023', '2023-07-19', 4, 5, 'Worms', 'Testing  again and again'),
('CB-13747', 'treatment', '19/06/2023', NULL, 3, 1, 'Coccidiosis', 'qweas'),
('CB-3061', '', '22/06/2023', '2023-06-29', 1, 2, 'Worms', 'Deworming this batch');

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
('19/06/2023', 'CB-13747', 13, 'Testing backend again'),
('19/06/2023', 'CB-13747', 17, 'Testing backend again 2'),
('19/06/2023', 'CB-13747', 15, 'Testing again and again and again'),
('19/06/2023', 'CB-6252', 5, 'Testing Current Report'),
('19/06/2023', 'CB-12488', 30, '');

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
('CB-13747', '19/06/2023', 1000, 766, 234, 26, 'Testing Egg Submit Form'),
('CB-13747', '19/06/2023', 50, 40, 10, 1, 'Testing Form and records'),
('CB-13747', '19/06/2023', 60, 60, 0, 2, 'Testing Form and records'),
('CB-13747', '19/06/2023', 67, 63, 4, 2.1, 'Testing Form and records'),
('CB-3061', '19/06/2023', 200, 180, 20, 6, 'Adding up'),
('CB-6252', '19/06/2023', 500, 450, 50, 15, 'qwea');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialexpensesreceipts`
--

CREATE TABLE `equatorialexpensesreceipts` (
  `expenditureid` int NOT NULL,
  `receiptimage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialexpensesreceipts`
--

INSERT INTO `equatorialexpensesreceipts` (`expenditureid`, `receiptimage`) VALUES
(3, 'receipt_uploads/b2d26a05d44026eb651cb9a60907fbb1');

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
(2, 41, 'Pcs'),
(7, 74, 'Pcs'),
(8, 30, 'Pcs');

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
('08/07/2023', 'incoming', 2, 50, 'Pcs', 'equatorialshop', '', ''),
('08/07/2023', 'incoming', 7, 75, 'Pcs', 'equatorialshop', '', ''),
('08/07/2023', 'incoming', 8, 30, 'Pcs', 'equatorialshop', '', ''),
('08/07/2023', 'outgoing', 2, 5, 'Pcs', 'other', '', 'Exhibitions');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialMassageSales`
--

CREATE TABLE `equatorialMassageSales` (
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
  `additionalinfo` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialMassageSales`
--

INSERT INTO `equatorialMassageSales` (`saleId`, `receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`) VALUES
(NULL, '1723-73026', '08/07/2023', 'aa qq', '12345', '[{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":\"S-2\",\"name\":\"Full Body Massage\",\"unitCost\":50000,\"discount\":0,\"quantity\":1,\"totalCost\":50000},{\"id\":\"S-1\",\"name\":\"Foot Massage\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000}]', 90000, 0, 'fullypaid', 'Cash', ''),
(NULL, '4472-98391', '08/07/2023', 'za1 za1', '11', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(NULL, '6308-28886', '08/07/2023', 'zza1 zza11', '11111', '[{\"id\":\"S-1\",\"name\":\"Foot Massage\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000},{\"id\":\"S-2\",\"name\":\"Full Body Massage\",\"unitCost\":50000,\"discount\":0,\"quantity\":1,\"totalCost\":50000},{\"id\":\"S-93\",\"name\":\"Head Massage\",\"unitCost\":35000,\"discount\":0,\"quantity\":1,\"totalCost\":35000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 125000, 28500, 'partiallypaid', 'Cash', ''),
(NULL, '6587-92020', '08/07/2023', 'za1 za1', '11', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":\"S-2\",\"name\":\"Full Body Massage\",\"unitCost\":50000,\"discount\":0,\"quantity\":1,\"totalCost\":50000}]', 65000, 0, 'fullypaid', 'Cash', ''),
(NULL, '8921-946', '08/07/2023', 'zza1 zza11', '11111', '[{\"id\":\"S-1\",\"name\":\"Foot Massage\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000},{\"id\":\"S-2\",\"name\":\"Full Body Massage\",\"unitCost\":50000,\"discount\":0,\"quantity\":1,\"totalCost\":50000},{\"id\":\"S-93\",\"name\":\"Head Massage\",\"unitCost\":35000,\"discount\":0,\"quantity\":1,\"totalCost\":35000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 125000, 28500, 'partiallypaid', 'Cash', '');

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
-- Table structure for table `equatorialprojectsclientpaymentplans`
--

CREATE TABLE `equatorialprojectsclientpaymentplans` (
  `receiptNumber` varchar(15) NOT NULL,
  `paymentPlan` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialprojectsclientpaymentplans`
--

INSERT INTO `equatorialprojectsclientpaymentplans` (`receiptNumber`, `paymentPlan`) VALUES
('8982-20825', '[{\"paymentDate\":\"17/07/2023\",\"amountToBePaid\":1562500,\"balanceAfterPayment\":4687500},{\"paymentDate\":\"17/08/2023\",\"amountToBePaid\":1562500,\"balanceAfterPayment\":3125000},{\"paymentDate\":\"17/09/2023\",\"amountToBePaid\":1562500,\"balanceAfterPayment\":1562500},{\"paymentDate\":\"17/10/2023\",\"amountToBePaid\":1562500,\"balanceAfterPayment\":0}]');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialProjectsInventory`
--

CREATE TABLE `equatorialProjectsInventory` (
  `productId` varchar(10) NOT NULL,
  `quantityinstock` int NOT NULL,
  `munits` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialProjectsInventory`
--

INSERT INTO `equatorialProjectsInventory` (`productId`, `quantityinstock`, `munits`) VALUES
('PJ-26', 62, 'Pcs'),
('PJ-39', 22, 'Pcs'),
('PJ-97', 20, 'Pcs');

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

--
-- Dumping data for table `equatorialProjectsInventoryrecords`
--

INSERT INTO `equatorialProjectsInventoryrecords` (`date`, `recordcategory`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('16/07/2023', 'incoming', 'PJ-26', 5, 'Pcs', 'external', 'Restocked from the Masanafu projects department', ''),
('16/07/2023', 'incoming', 'PJ-39', 25, 'Pcs', 'equatorialshop', '', ''),
('16/07/2023', 'outgoing', 'PJ-39', 2, 'Pcs', 'external', 'Delivery to a certain client', 'Test'),
('16/07/2023', 'incoming', 'PJ-26', 78, 'Pcs', 'external', 'From Masanafu', ''),
('16/07/2023', 'incoming', 'PJ-97', 35, 'Pcs', 'equatorialshop', '', '');

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
  `additionalinfo` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialProjectsSales`
--

INSERT INTO `equatorialProjectsSales` (`saleId`, `receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`) VALUES
(NULL, '4045-27630', '16/07/2023', 'Zziwa Raymond', '444-777-120', '[{\"id\":\"PJ-26\",\"name\":\"Biomass Dryer (BIG)\",\"unitCost\":500000,\"discount\":0,\"quantity\":1,\"totalCost\":500000},{\"id\":\"PJ-39\",\"name\":\"Stand\",\"unitCost\":120000,\"discount\":0,\"quantity\":1,\"totalCost\":120000}]', 620000, 0, 'fullypaid', 'Cash', ''),
(101, '555-100', '2-07-2001', 'zz', '242444', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 50000, 5000, 'unpaid', 'cash', NULL),
(NULL, '8982-20825', '16/07/2023', 'Musoke Peter', '111-675-346', '[{\"id\":\"PJ-26\",\"name\":\"Biomass Dryer (BIG)\",\"unitCost\":500000,\"discount\":0,\"quantity\":20,\"totalCost\":10000000},{\"id\":\"PJ-97\",\"name\":\"Biomass Dryer (SMALL)\",\"unitCost\":250000,\"discount\":0,\"quantity\":15,\"totalCost\":3750000}]', 13750000, 4687500, 'partiallypaid', 'Cash', '');

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

--
-- Dumping data for table `equatorialprojectssalespayments`
--

INSERT INTO `equatorialprojectssalespayments` (`receiptNumber`, `paymentdate`, `amountPaid`, `notes`, `paymentMethod`) VALUES
('8982-20825', '17/07/2023', 1562500, 'Testing 22', 'Cash');

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

--
-- Dumping data for table `equatorialshopexpenditure`
--

INSERT INTO `equatorialshopexpenditure` (`expenditureid`, `date`, `expenditurecategory`, `expenditurename`, `expendituredescription`, `expenditurecost`, `amountspent`, `balance`, `paymentmethod`, `paymentstatus`, `createdat`) VALUES
(1, '17/07/2023', 'utilities', 'Dfsdfsjfv dfj b', 'Testing 123', 120000, 60000, 60000, 'MTN MoMo', 'partially paid', '2023-07-17 14:27:49'),
(2, '17/07/2023', 'utilities', 'Yaaka', 'Power', 310000, 150000, 160000, 'MTN MoMo', 'partially paid', '2023-07-17 14:28:16'),
(3, '17/07/2023', 'professional services', 'Mechanic', 'Repairing company trucks', 410000, 270000, 140000, 'Cash', 'partially paid', '2023-07-17 14:28:53');

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
(14, 105, 'Pcs');

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

--
-- Dumping data for table `equatorialshopinventoryrecords`
--

INSERT INTO `equatorialshopinventoryrecords` (`date`, `recordcategory`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('17/07/2023', 'incoming', 14, 150, 'Pcs', 'external', 'From Namungoona', ''),
('17/07/2023', 'incoming', 14, 15, 'Pcs', 'external', 'From Namungoona', ''),
('17/07/2023', 'outgoing', 14, 5, 'Pcs', 'Equatorial', '', 'Taken to the massage department');

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
  `additionalinfo` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialShopSales`
--

INSERT INTO `equatorialShopSales` (`saleId`, `receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`) VALUES
(NULL, '2240-64639', '17/07/2023', 'Dada Pipiro', '44-680-210-331', '[{\"id\":14,\"name\":\"Levanda Oil 100 mls\",\"unitCost\":3000,\"discount\":0,\"quantity\":20,\"totalCost\":60000}]', 60000, 0, 'fullypaid', 'Cash', 'Testing'),
(NULL, '4143-66901', '17/07/2023', 'Musika Peter', '555-999-000', '[{\"id\":14,\"name\":\"Levanda Oil 100 mls\",\"unitCost\":3000,\"discount\":0,\"quantity\":15,\"totalCost\":45000}]', 45000, 0, 'fullypaid', 'Cash', ''),
(NULL, '9374-51343', '17/07/2023', 'Dada Pipiro', '44-680-210-331', '[{\"id\":14,\"name\":\"Levanda Oil 100 mls\",\"unitCost\":3000,\"discount\":10,\"quantity\":20,\"totalCost\":54000}]', 54000, 54000, 'unpaid', 'Cash', 'Testing');

-- --------------------------------------------------------

--
-- Table structure for table `equatorialshopsalespayments`
--

CREATE TABLE `equatorialshopsalespayments` (
  `receiptNumber` varchar(10) NOT NULL,
  `paymentdate` varchar(20) NOT NULL,
  `amountPaid` float NOT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `paymentMethod` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `equatorialshopsalespayments`
--

INSERT INTO `equatorialshopsalespayments` (`receiptNumber`, `paymentdate`, `amountPaid`, `notes`, `paymentMethod`) VALUES
('2240-64639', '17/07/2023', 35000, NULL, 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `exhibitions`
--

CREATE TABLE `exhibitions` (
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

INSERT INTO `exhibitions` (`exhibitionname`, `date`, `itemsrecord`, `filledfrombranch`, `filledbydepartment`, `filledbyrole`, `filledbyuser`, `status`) VALUES
('BUBU', '2023-07-02', '[{\"itemName\":\"Black seeds\",\"itemQuantity\":\"2\",\"itemQuantitySold\":\"1\",\"itemQuantityReturned\":\"0\",\"Discrepancies\":1,\"mUnits\":\"KG\"}]', 'masanafu', 'production', 'custodian', 'namugangamaria', 'postexhibition');

-- --------------------------------------------------------

--
-- Table structure for table `expensesreceipts`
--

CREATE TABLE `expensesreceipts` (
  `expenditureid` int NOT NULL,
  `receiptimage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `clientcontact` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `externalreceipts`
--

INSERT INTO `externalreceipts` (`receiptnumber`, `receiptdate`, `itemsattached`, `receiptissuedfrombranch`, `receiptissuedfromdepartment`, `receiptissuedby`, `receiptdeliveredtobranch`, `receiptdeliveredtodepartment`, `receiptdeliveredtopersonnel`, `receiptpaymentstatus`, `receiptdeliverystatus`, `additionalinfo`, `clientfirstname`, `clientmiddlename`, `clientlastname`, `clientcontact`) VALUES
('101', '11/6/2023', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":10,\"quantity\":5,\"totalCost\":67500},{\"id\":4,\"name\":\"Makuna 50 grams\",\"unitCost\":3500,\"discount\":0,\"quantity\":2,\"totalCost\":7000}]', 'equatorial', 'shop', 'bridget', 'masanafu', 'shop', 'julie', 'fully paid', 'delivered', 'Please fullfill this receipt as the customer is in urgent need', 'Mukasa', NULL, 'Paul', '0775149572'),
('102', '11/6/2023', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":10,\"quantity\":30,\"totalCost\":405000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":2,\"totalCost\":15000},{\"id\":4,\"name\":\"Makuna 50 grams\",\"unitCost\":3500,\"discount\":0,\"quantity\":3,\"totalCost\":10500}]', 'equatorial', 'shop', 'bridget', 'masanafu', 'shop', 'julie', 'partially paid', 'delivered', NULL, 'Lwasa', 'Reagan', 'Peter', '0701303137'),
('2164-87460', '16/07/2023', '[{\"id\":4,\"name\":\"Makuna 50 grams\",\"unitCost\":3500,\"discount\":0,\"quantity\":1,\"totalCost\":3500},{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'unpaid', 'pending', '', 'Zziwa', NULL, 'Raymond', '111-222-333-444'),
('2647-21869', '16/07/2023', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'unpaid', 'pending', 'testing', 'zz', NULL, 'rr', '333-444-555'),
('5520-11215', '16/07/2023', '[{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":5,\"name\":\"Avocado Oil\",\"unitCost\":3500,\"discount\":0,\"quantity\":1,\"totalCost\":3500}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'partiallypaid', 'pending', '', 'Zziwa', NULL, 'Raymond', '111-222-333-444'),
('9973-72674', '16/07/2023', '[{\"id\":7,\"name\":\"Stevia 100 grams\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 'equatorial', 'projects', 'za4', 'masanafu', 'shop', 'za1', 'fullypaid', 'pending', '', 'Zziwa', NULL, 'Raymond', '111-222-333-444');

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
('B-1440457', '[{\"itemName\":\"Clove seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Black seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"},{\"itemName\":\"Cucumber seeds\",\"itemQuantity\":\"5\",\"mUnits\":\"Pcs\"}]', 'incubator', '2023-06-19');

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
('CB-12488', '19/06/2023', 670, 2000, 1340000, '', 'active', 640, 30),
('CB-13747', '19/06/2023', 750, 3500, 2625000, 'Testing form 2', 'completed', 705, 45),
('CB-3061', '19/06/2023', 500, 2500, 1250000, 'Testing form', 'completed', 500, 0),
('CB-6252', '19/06/2023', 1000, 2500, 2500000, 'Latest Batch', 'completed', 995, 5);

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
(7, 'Corn', 1200, 0),
(8, 'Mashed Corn Grains', 3500, 0),
(9, 'Rye', 6500, 0),
(10, 'Wheat', 2500, 0);

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
(9, 101, 'Kgs'),
(10, 35, 'Kgs'),
(7, 45, 'Kgs');

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
('18/06/2023', 9, 75, 'Kgs', 'custodian', '', ''),
('18/06/2023', 10, 150, 'Kgs', 'custodian', '', ''),
('18/06/2023', 7, 45, 'Kgs', 'custodian', '', ''),
('19/06/2023', 9, 40, 'Kgs', 'external', 'shop', ''),
('19/06/2023', 9, 1, 'Kgs', 'custodian', '', '');

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
(1, 'Worm Out Tablets', 1000, 0),
(2, 'Oxymav B', 2000, 0),
(3, 'Cocciprol 100g', 1500, 0),
(4, ' Doxycycline', 7000, 0);

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
(4, 15, 'mls'),
(3, 4, 'Pcs');

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
('18/06/2023', 4, 20, 'mls', 'custodian', '', ''),
('18/06/2023', 3, 5, 'Pcs', 'external', 'Bought from the chicken pharmacy', '');

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
(12, '17/07/2023', 'utilities', 'dfsdfs', 'dfs', 150000, 50000, 100000, 'MTN MoMo', 'partially paid', '2023-07-17 14:26:00');

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

--
-- Dumping data for table `masanafuShopInventory`
--

INSERT INTO `masanafuShopInventory` (`productId`, `quantityinstock`, `munits`) VALUES
(2, 713, 'Pcs'),
(1, 346, 'Pcs'),
(6, 409, 'Pcs'),
(5, 225, 'Pcs'),
(3, 790, 'Pcs'),
(8, 0, 'Pcs'),
(10, 30, 'Pcs');

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

--
-- Dumping data for table `masanafushopinventoryrecords`
--

INSERT INTO `masanafushopinventoryrecords` (`date`, `recordcategory`, `itemid`, `quantityin`, `munits`, `restocksource`, `externalsourcedetails`, `notes`) VALUES
('12/06/2023', 'incoming', 2, 850, 'Pcs', 'custodian', '', 'Testing'),
('12/06/2023', 'incoming', 2, 100, 'Pcs', 'custodian', '', 'Testing 2'),
('12/06/2023', 'incoming', 3, 10, 'Pcs', 'custodian', '', 'Testing 3'),
('12/06/2023', 'incoming', 4, 25, 'Pcs', 'external', 'From Namungoona', 'Testing 4'),
('17/06/2023', 'incoming', 1, 500, 'Pcs', 'custodian', '', ''),
('17/06/2023', 'incoming', 6, 350, 'Pcs', 'custodian', '', ''),
('17/06/2023', 'incoming', 5, 250, 'Pcs', 'custodian', '', ''),
('17/06/2023', 'incoming', 3, 750, 'Pcs', 'custodian', '', ''),
('19/06/2023', 'incoming', 6, 100, 'Pcs', 'custodian', '', 'Trying Restock form'),
('19/06/2023', 'incoming', 3, 100, 'Pcs', 'custodian', '', 'notes'),
('21/06/2023', 'incoming', 8, 20, 'Pcs', 'custodian', '', ''),
('21/06/2023', 'incoming', 8, 13, 'Pcs', 'custodian', '', 'Trying after adding category'),
('21/06/2023', 'incoming', 8, 7, 'Pcs', 'custodian', '', 'Trying after adding category 22'),
('21/06/2023', 'outgoing', 8, 4, 'Pcs', 'Equatorial', '', 'They were out of products'),
('12/7/2023', 'incoming', 1, 2, 'Pcs', 'custodian', '', ''),
('12/07/2023', 'incoming', 10, 35, 'Pcs', 'external', 'Delivered external', ''),
('12/07/2023', 'outgoing', 10, 5, 'Pcs', 'Equatorial', '', '');

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
  `additionalinfo` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `masanafuShopSales`
--

INSERT INTO `masanafuShopSales` (`saleId`, `receiptNumber`, `saleDate`, `customerNames`, `customerContact`, `itemsSold`, `totalAmount`, `balance`, `paymentStatus`, `paymentMethod`, `additionalinfo`) VALUES
(NULL, '0116-41156', '27/06/2023', 'Nsubuga Raymond', '0775563800', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 7500, 0, 'fullypaid', 'Cash', ''),
(NULL, '0321-39203', '27/06/2023', 'Aketch Sonia', '0775563760', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 7500, 0, 'fullypaid', 'Cash', ''),
(NULL, '0542-98097', '21/06/2023', 'qqqq aaaaazzz', '123345', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":5,\"totalCost\":25000}]', 25000, 0, 'fullypaid', 'Cash', ''),
(NULL, '0596-4229', '27/06/2023', 'Ssali Sean Paul', '0775563805', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 7500, 0, 'fullypaid', 'Cash', ''),
(NULL, '0824-96361', '27/06/2023', 'scvc sdcvsd', '345', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(NULL, '0977-88268', '22/06/2023', 'cfv vfv', '4536', '[]', 0, 0, 'fullypaid', 'Cash', ''),
(NULL, '112512', '20/05/2023', 'Zziwa Raymond', '0701303137', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":15,\"totalCost\":75000}]', 75000, 0, 'fullypaid', 'Cash', ''),
(NULL, '1168972', '21/06/2023', 'Naki Sharon', '0701303137', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":10,\"totalCost\":75000},{\"id\":8,\"name\":\"Collodial Silver 20 mls\",\"unitCost\":2500,\"discount\":0,\"quantity\":10,\"totalCost\":25000}]', 100000, 50000, 'partiallypaid', 'Cash', 'Testing'),
(0, '139473', '17/05/2023', 'Mukisa Tricia', '0775149572', '[{\"id\":6,\"name\":\"Stevia 50 grams\",\"unitCost\":8000,\"discount\":0,\"quantity\":1,\"totalCost\":8000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 30500, 0, 'fullypaid', 'Cash', ''),
(NULL, '1415103', '21/06/2023', 'Naki Sharon', '0701303137', '[{\"id\":8,\"name\":\"Collodial Silver 20 mls\",\"unitCost\":2500,\"discount\":0,\"quantity\":10,\"totalCost\":25000}]', 25000, -25000, 'partiallypaid', 'Cash', ''),
(NULL, '1590-26995', '21/06/2023', '1 1', '1', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 5000, 0, 'fullypaid', 'Cash', ''),
(NULL, '1621171', '15/06/2023', 'Zziwa Raymond', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":50,\"totalCost\":750000}]', 750000, 0, 'fullypaid', 'Cash', ''),
(NULL, '178566', '27/06/2023', 'Nayiga Carol', '123456789', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":2,\"quantity\":10,\"totalCost\":49000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":5,\"quantity\":10,\"totalCost\":142500}]', 191500, 0, 'fullypaid', 'Cash', 'Paying Partially'),
(NULL, '1883-13434', '27/06/2023', 'Asia Europe', '123456789', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":7,\"totalCost\":52500},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":3,\"totalCost\":45000}]', 97500, 0, 'fullypaid', 'Cash', ''),
(NULL, '1935-52439', '21/06/2023', '1 1', '1', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 5000, 0, 'fullypaid', 'Cash', ''),
(NULL, '2036-55133', '08/07/2023', 'zz aa', '1234', '[{\"id\":\"S-2\",\"name\":\"Full Body Massage\",\"unitCost\":50000,\"discount\":0,\"quantity\":1,\"totalCost\":50000},{\"id\":\"S-1\",\"name\":\"Foot Massage\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 97500, 0, 'fullypaid', 'Cash', ''),
(NULL, '2185-93093', '27/06/2023', 'Nalwadda Leila', '0701303137', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":2,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(NULL, '2278-78472', '21/06/2023', 'fdv xc s', '5654', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":12,\"totalCost\":60000}]', 60000, 0, 'fullypaid', 'Cash', ''),
(NULL, '258494', '01/06/2023', 'Isaac Jjingo', '123456789', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":10,\"totalCost\":150000},{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":10,\"totalCost\":50000}]', 200000, 0, 'fullypaid', 'Cash', 'Fully paid'),
(NULL, '2864-61038', '27/06/2023', 'Naomi Mary', '0775563805', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 7500, 0, 'fullypaid', 'Cash', ''),
(NULL, '2907-30902', '21/06/2023', 'Wakibu Shona', '12345678', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":5,\"totalCost\":75000}]', 75000, 45000, 'partiallypaid', 'Cash', ''),
(NULL, '2995-54334', '21/06/2023', 'qqq aaa', '324424', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":5,\"totalCost\":25000}]', 25000, 0, 'fullypaid', 'Cash', ''),
(NULL, '32623', '20/06/2023', 'Zziwa Raymond', '0701303137', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":15,\"totalCost\":75000}]', 75000, 0, 'fullypaid', 'Cash', ''),
(NULL, '3486-87584', '27/06/2023', 'Nalwadda Leila', '0701303137', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":2,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(NULL, '3602-73780', '27/06/2023', 'Kibumba Moses', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":5,\"quantity\":15,\"totalCost\":213750}]', 213750, 0, 'fullypaid', 'Airtel Money', ''),
(NULL, '3643-1122', '27/06/2023', 'Nalwadda Leila', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(NULL, '3726-5061', '06/07/2023', 'xx xx', '324', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 22500, 0, 'fullypaid', 'Cash', ''),
(NULL, '3736-38282', '21/06/2023', 'Lwasa Peter', '4254354435', '[{\"id\":5,\"name\":\"Avocado Oil\",\"unitCost\":3500,\"discount\":0,\"quantity\":10,\"totalCost\":35000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":10,\"totalCost\":75000}]', 110000, 0, 'fullypaid', 'Airtel Money', ''),
(NULL, '4014-95364', '21/06/2023', 'css zaz', '44', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":1,\"totalCost\":5000}]', 5000, 0, 'fullypaid', 'Cash', ''),
(NULL, '4094-63412', '27/06/2023', 'Lwasa Reagan', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":2,\"totalCost\":30000}]', 30000, 0, 'fullypaid', 'Cash', ''),
(NULL, '423926', '21/06/2023', 'Nakigudde Sharon', '0701303137', '[{\"id\":8,\"name\":\"Collodial Silver 20 mls\",\"unitCost\":2500,\"discount\":0,\"quantity\":10,\"totalCost\":25000}]', 25000, 15000, 'partiallypaid', 'Cash', ''),
(NULL, '4293-43481', '06/07/2023', 'Test22 Test22', '12345', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 7500, 0, 'fullypaid', 'Cash', ''),
(NULL, '4301-33254', '21/06/2023', 'Lemi Sharon', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":10,\"totalCost\":150000},{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":10,\"totalCost\":50000}]', 200000, 50000, 'partiallypaid', 'MTN MoMo', ''),
(NULL, '4361-36890', '27/06/2023', 'test45 das', '1234567', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(0, '436517', '17/06/2023', 'John Aduman', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":2,\"totalCost\":30000},{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":5,\"totalCost\":25000},{\"id\":6,\"name\":\"Stevia 50 grams\",\"unitCost\":8000,\"discount\":0,\"quantity\":10,\"totalCost\":80000}]', 135000, 0, 'fullypaid', 'Cash', ''),
(NULL, '4534-88847', '27/06/2023', 'Lwasa Reagan', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":2,\"totalCost\":30000}]', 30000, 0, 'fullypaid', 'Cash', ''),
(NULL, '475704', '19/06/2023', 'Makubuya Moses', '0701303137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":5,\"totalCost\":75000},{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":16,\"totalCost\":80000}]', 155000, 0, 'fullypaid', 'Prof MM', 'Partially Paid'),
(NULL, '5226-77067', '08/07/2023', 'zz aa', '1234', '[{\"id\":\"S-2\",\"name\":\"Full Body Massage\",\"unitCost\":50000,\"discount\":0,\"quantity\":1,\"totalCost\":50000},{\"id\":\"S-1\",\"name\":\"Foot Massage\",\"unitCost\":25000,\"discount\":0,\"quantity\":1,\"totalCost\":25000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 97500, 0, 'fullypaid', 'Cash', ''),
(NULL, '5271-31026', '21/06/2023', 'zzzzzzz ssssss', '12345678', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":5,\"totalCost\":75000}]', 75000, 0, 'fullypaid', 'Cash', ''),
(NULL, '5371-14626', '21/06/2023', 'zz aa', '324', '[{\"id\":8,\"name\":\"Collodial Silver 20 mls\",\"unitCost\":2500,\"discount\":0,\"quantity\":1,\"totalCost\":2500}]', 2500, 0, 'fullypaid', 'Cash', ''),
(NULL, '5373-30738', '27/06/2023', 'test tester', '0701393137', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(NULL, '5579-61061', '23/06/2023', 'Zziwa Raymond', '1234567', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":5,\"totalCost\":75000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":5,\"totalCost\":37500}]', 112500, 0, 'fullypaid', 'Cash', 'New Sale'),
(0, '706427', '2/06/2023', 'Mwesigwa Joseph', '0701303137', '[{\"id\":6,\"name\":\"Stevia 50 grams\",\"unitCost\":8000,\"discount\":0,\"quantity\":15,\"totalCost\":120000},{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":20,\"totalCost\":100000}]', 220000, 0, 'fullypaid', 'Prof MM', ''),
(NULL, '7649-83257', '27/06/2023', 'Aketch Sonia', '0701303133', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":1,\"totalCost\":7500}]', 22500, 0, 'fullypaid', 'Cash', ''),
(NULL, '7652-84744', '21/06/2023', 'aaaa zzzzz', '1234567', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":5,\"totalCost\":75000}]', 75000, 0, 'fullypaid', 'Cash', ''),
(NULL, '8074-68501', '27/06/2023', 'Adut Mary', '0775563805', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":1,\"totalCost\":15000}]', 15000, 0, 'fullypaid', 'Cash', ''),
(0, '857015', '9/06/2023', 'Mwesigwa Joseph', '0701303137', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":2,\"totalCost\":15000},{\"id\":6,\"name\":\"Stevia 50 grams\",\"unitCost\":8000,\"discount\":0,\"quantity\":15,\"totalCost\":120000},{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":20,\"totalCost\":100000},{\"id\":5,\"name\":\"Avocado Oil\",\"unitCost\":3500,\"discount\":0,\"quantity\":10,\"totalCost\":35000}]', 270000, 30000, 'partiallypaid', 'Cash', ''),
(NULL, '8647-81105', '21/06/2023', 'qqq aaa', '324424', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":5,\"totalCost\":25000}]', 25000, 0, 'fullypaid', 'Cash', ''),
(NULL, '9001-58735', '27/06/2023', 'Qaz Zaq', '0775149572', '[{\"id\":5,\"name\":\"Avocado Oil\",\"unitCost\":3500,\"discount\":0,\"quantity\":5,\"totalCost\":17500},{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":5,\"totalCost\":37500}]', 55000, 0, 'fullypaid', 'MTN MoMo', ''),
(NULL, '9112-59252', '27/06/2023', 'Asia Europe', '123456789', '[{\"id\":3,\"name\":\"Ginger 50 grams\",\"unitCost\":7500,\"discount\":0,\"quantity\":7,\"totalCost\":52500},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":3,\"totalCost\":45000}]', 97500, 0, 'fullypaid', 'Cash', ''),
(NULL, '9199-21293', '21/06/2023', 'Wakibu Peter', '12345678', '[{\"id\":1,\"name\":\"Cedar\",\"unitCost\":5000,\"discount\":0,\"quantity\":5,\"totalCost\":25000},{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":5,\"totalCost\":75000}]', 100000, 0, 'fullypaid', 'Cash', ''),
(NULL, '9866-23093', '21/06/2023', 'nnnnnnn lala', '12345678', '[{\"id\":2,\"name\":\"Levanda Oil 20 mls\",\"unitCost\":15000,\"discount\":0,\"quantity\":10,\"totalCost\":150000}]', 150000, 30000, 'partiallypaid', 'Cash', ''),
(NULL, '9933-76973', '21/06/2023', 'Naki Sharon', '0701303137', '[{\"id\":8,\"name\":\"Collodial Silver 20 mls\",\"unitCost\":2500,\"discount\":0,\"quantity\":5,\"totalCost\":12500}]', 12500, 0, 'fullypaid', 'MTN MoMo', '');

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

--
-- Dumping data for table `masanafushopsalespayments`
--

INSERT INTO `masanafushopsalespayments` (`receiptNumber`, `paymentdate`, `amountPaid`, `notes`, `paymentMethod`) VALUES
('857015', '18/06/2023', 270000, NULL, 'Cash'),
('857015', '18/06/2023', 90000, NULL, 'Airtel Money'),
('857015', '18/06/2023', 90000, NULL, 'MTN MoMo'),
('857015', '18/06/2023', 270000, NULL, 'MTN MoMo'),
('436517', '18/06/2023', 60000, NULL, 'Cash'),
('436517', '18/06/2023', 15000, NULL, 'MTN MoMo'),
('436517', '18/06/2023', 15000, NULL, 'MTN MoMo'),
('436517', '18/06/2023', 15000, NULL, 'MTN MoMo'),
('857015', '18/06/2023', 45000, NULL, 'Cash'),
('436517', '18/06/2023', 60000, NULL, 'Prof MM'),
('857015', '18/06/2023', 15000, NULL, 'Cash'),
('178566', '19/06/2023', 91500, NULL, 'Cash'),
('475704', '19/06/2023', 55000, NULL, 'Cash');

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
('S-1', 'Foot Massage', 25000, 0),
('S-2', 'Full Body Massage', 50000, 0),
('S-93', 'Head Massage', 35000, 0);

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
('Black seeds', 12, 'KG');

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
('PJ-26', 'Biomass Dryer (BIG)', 500000, 0),
('PJ-39', 'Stand', 120000, 0),
('PJ-97', 'Biomass Dryer (SMALL)', 250000, 0);

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
(1, 'Cedar', 5000, 0),
(2, 'Levanda Oil 20 mls', 15000, 0),
(3, 'Ginger 50 grams', 7500, 0),
(4, 'Makuna 50 grams', 3500, 0),
(5, 'Avocado Oil', 3500, 0),
(6, 'Stevia 50 grams', 8000, 0),
(7, 'Stevia 100 grams', 15000, 0),
(8, 'Collodial Silver 20 mls', 2500, 0),
(10, 'Oils', 0, 0),
(11, 'Burger', 50000, 0),
(12, 'Burger', 50000, 0),
(13, 'Makuna 100 grams', 5000, 0),
(14, 'Levanda Oil 100 mls', 3000, 0);

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
('nakiwalabrenda', 'Nakiwala', 'Brenda', 'namungoona', 'inventory', 'supervisor', '1997-11-09', '0777083417', 'nakiwalaruth@gmail.com', 'Female', '2023-02-25 08:28:30.848', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('namugangamaria', 'Namuganga', 'Maria', 'Masanafu', 'production', 'custodian', '2000-11-29', '0755847378', 'nalutayamarienick@gmail.com', 'Female', '2023-04-28', '$2a$12$cfDeaqbBUG1f4UXM/sVNU.9wFsXBLK/gGFTgS7KOa7mKlqy4h2Gey'),
('ngoloberobert', 'Ngolobe', 'Robert', 'namungoona', 'inventory', 'supervisor', '1992-10-09', '0787843064', 'ngoloberobert73@gmail.com', 'Male', '2023-02-25 08:30:52.756', '$2a$10$kyBYGutINIIcX.67ahsc2.m0zToeVYKuSBvZBKPzEPJYKN5DZL0nG'),
('profadmin', 'Prof', 'Admin', 'admin', '', '', '2023-02-25', '0779519652', 'Profbioresearch@gmail.com', 'Male', '2023-02-25 08:41:58.988', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('qaz', 'qaz', 'qaz', 'masanafu', 'chickenfarm', 'chickenfarmmanager', '2-07-2001', '0775149572', 'xx@gmail.com', 'Male', '2023-06-22', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za1', 'ZZIWA', 'RAYMOND', 'masanafu', 'shop', 'shopmanager', '2001-07-02', '0775149572', 'raymondzian@gmailcom', 'Male', '2023-06-04', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za2', 'zziwa', 'raymond', 'equatorial', 'massage', 'massagemanager', '2001-07-02', '0701303137', 'ee@gmail.com', 'Male', '7-07-2023', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za3', 'zziwa', 'raymond', 'equatorial', 'shop', 'equatorialshopmanager', '2001-07-02', '0701303137', 'ee@gmail.com', 'Male', '7-07-2023', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za4', 'Zziwa', 'Raymond', 'equatorial', 'projects', 'equatorialprojectsmanager', '2001-07-02', '0775149572', 'raymondzian@gmail.com', 'Male', '7-07-2023', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
('za5', 'Zziwa', 'Raymond Ian', 'equatorial', 'labelling', 'supervisor', '02-07-2001', '0701303137', 'raymondzian@gmail.com', 'Male', '7-02-2023', '$2a$10$TvfDqyy3qAPoN5.pvesbqOykXx.RX2.bgb0wRElBU2GfV33WzLA6a'),
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
-- Indexes for table `equatorialexpensesreceipts`
--
ALTER TABLE `equatorialexpensesreceipts`
  ADD KEY `expenditureid` (`expenditureid`),
  ADD KEY `expenditureid_2` (`expenditureid`);

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
  ADD KEY `receiptNumber_2` (`receiptNumber`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `branch` (`branch`,`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equatorialshopexpenditure`
--
ALTER TABLE `equatorialshopexpenditure`
  MODIFY `expenditureid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `machinery`
--
ALTER TABLE `machinery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `masanafuchickenfeeds`
--
ALTER TABLE `masanafuchickenfeeds`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `masanafuchickenmedicine`
--
ALTER TABLE `masanafuchickenmedicine`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `masanafushopexpenditure`
--
ALTER TABLE `masanafushopexpenditure`
  MODIFY `expenditureid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batchfeedingrecords`
--
ALTER TABLE `batchfeedingrecords`
  ADD CONSTRAINT `batchfeedingrecords_ibfk_1` FOREIGN KEY (`batchnumber`) REFERENCES `masanafuchickenfarmbatches` (`batchnumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `batchfeedingrecords_ibfk_2` FOREIGN KEY (`feedsid`) REFERENCES `masanafuchickenfeeds` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `equatorialexpensesreceipts`
--
ALTER TABLE `equatorialexpensesreceipts`
  ADD CONSTRAINT `equatorialexpensesreceipts_ibfk_1` FOREIGN KEY (`expenditureid`) REFERENCES `equatorialshopexpenditure` (`expenditureid`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `masanafuchickenfeedsinventory`
--
ALTER TABLE `masanafuchickenfeedsinventory`
  ADD CONSTRAINT `masanafuchickenfeedsinventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `masanafuchickenfeeds` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `masanafuchickenfeedsinventoryrecords`
--
ALTER TABLE `masanafuchickenfeedsinventoryrecords`
  ADD CONSTRAINT `masanafuchickenfeedsinventoryrecords_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `masanafuchickenfeeds` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`name`) REFERENCES `inventory` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
