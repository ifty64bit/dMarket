-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 06:41 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dmarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `seller_addr` varchar(255) DEFAULT NULL,
  `buyer_addr` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `seller_addr`, `buyer_addr`, `price`) VALUES
(1000, 0, 'genisis', 'enisis', 0),
(1001, 1002, '0xd84Fbd94880a8EC1591755bf4409e5D654987791', '0xd84Fbd94880a8EC1591755bf4409e5D654987791', 2),
(1002, 1002, '0xd84Fbd94880a8EC1591755bf4409e5D654987791', '0xd84Fbd94880a8EC1591755bf4409e5D654987791', 2),
(1003, 1003, '0xAce28AE647552Ab79C93088ABAc7Ff0Eea61481C', '0xAce28AE647552Ab79C93088ABAc7Ff0Eea61481C', 5),
(1004, 1003, '0xAce28AE647552Ab79C93088ABAc7Ff0Eea61481C', '0xb8a3b1e18c8757e6073dfcc4c9447f342ff90447', 5),
(1005, 1003, '0xAce28AE647552Ab79C93088ABAc7Ff0Eea61481C', '0xB8a3B1e18c8757E6073DfcC4c9447F342FF90447', 5),
(1006, 1004, '0x00D7141f1df1E35Ecc796971181A9150D47f6Ca2', '0x02e80fd45412838163da50386596a185f508f604', 5),
(1007, 1005, '0x00D7141f1df1E35Ecc796971181A9150D47f6Ca2', '0x02e80fd45412838163da50386596a185f508f604', 5);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `p_name` varchar(255) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `img_name` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `p_name`, `owner`, `img_name`, `details`, `price`) VALUES
(1003, 'Apple iPhone 13 Pro Max', '0xAce28AE647552Ab79C93088ABAc7Ff0Eea61481C', 'apple-iphone-13-pro-max-01-1653722472672.jpg', '[\"GSM / CDMA / HSPA / EVDO / LTE / 5G\",\"OS: iOS 15, upgradable to iOS 15.5\",\"Chipset: Apple A15 Bionic (5 nm)\"]', 5),
(1005, 'Samsung Galaxy S22 Ultra 5G', '0x00D7141f1df1E35Ecc796971181A9150D47f6Ca2', 'samsung-galaxy-s22-ultra-5g-2-1654200452377.jpg', '[\"12Gb Ram\",\"108MP Camera\"]', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1006;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
