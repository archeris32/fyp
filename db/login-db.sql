-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2023 at 08:19 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(10) NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `age` int(10) NOT NULL,
  `sex` varchar(100) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `address` varchar(300) NOT NULL,
  `walkin` varchar(200) NOT NULL,
  `cost` int(100) NOT NULL,
  `treatement_1` varchar(200) DEFAULT NULL,
  `treatement_2` varchar(200) DEFAULT NULL,
  `treatement_3` varchar(200) DEFAULT NULL,
  `cost_1` varchar(255) DEFAULT NULL,
  `cost_2` varchar(255) DEFAULT NULL,
  `cost_3` varchar(255) DEFAULT NULL,
  `notes_1` varchar(255) DEFAULT NULL,
  `notes_2` varchar(255) DEFAULT NULL,
  `notes_3` varchar(255) DEFAULT NULL,
  `doctor_t1` varchar(255) DEFAULT NULL,
  `doctor_t2` varchar(255) DEFAULT NULL,
  `doctor_t3` varchar(255) DEFAULT NULL,
  `doctor` varchar(255) DEFAULT NULL,
  `t1_desc` varchar(255) DEFAULT NULL,
  `t2_desc` varchar(255) DEFAULT NULL,
  `t3_desc` varchar(255) DEFAULT NULL,
  `pay_t1` varchar(255) DEFAULT NULL,
  `pay_t2` varchar(255) DEFAULT NULL,
  `pay_t3` varchar(255) DEFAULT NULL,
  `nextapp1` varchar(200) DEFAULT NULL,
  `nextapp2` varchar(200) DEFAULT NULL,
  `nextapp3` varchar(200) DEFAULT NULL,
  `startime1` varchar(200) DEFAULT NULL,
  `startime2` varchar(200) DEFAULT NULL,
  `startime3` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `firstName`, `lastName`, `age`, `sex`, `phone`, `email`, `address`, `walkin`, `cost`, `treatement_1`, `treatement_2`, `treatement_3`, `cost_1`, `cost_2`, `cost_3`, `notes_1`, `notes_2`, `notes_3`, `doctor_t1`, `doctor_t2`, `doctor_t3`, `doctor`, `t1_desc`, `t2_desc`, `t3_desc`, `pay_t1`, `pay_t2`, `pay_t3`, `nextapp1`, `nextapp2`, `nextapp3`, `startime1`, `startime2`, `startime3`) VALUES
(93, 'carla-noemi', 'Adascalului', 23, 'Feminin', '07437782616', 'adascalului.bogdan@gmail.com', '38 MILFORD GARDENS', '2023-02-10', 800, 'Scale and polish', 'Broken or knocked out toot', '', '100', '200', '500', 'test', '', '', 'Dr. Pelumi Apantuku', 'Dr. Kimia Aksir', '', 'undefined', 'test', '', '', 'paid', 'paid', 'paid', '2023-02-13', '2023-02-23', '2023-03-18', '9:00-11:00', '1:00-3:00', '14:10'),
(94, 'Zak', 'Taylor', 14, 'Masculin', '4214553632', 'beniamin.androne@yahoo.com', '38 MILFORD GARDENS', '2023-03-19', 323, '', '', '', '323', '', '', '', '', '', '', '', '', 'undefined', '', '', '', 'paid', '', '', '2023-04-06', '2023-03-25', '2023-03-21', '14:50', '15:50', '14:49'),
(95, 'carla-noemi', 'Adascalului', 22, 'Feminin', '07437782616', 'adascalului.bogdan@gmail.com', '38 MILFORD GARDENS', '2023-03-11', 0, '', '', '', '', '', '', '', '', '', '', '', '', 'undefined', '', '', '', '', '', '', '', '2023-03-12', '2023-03-18', 'undefined', '13:53', '18:52'),
(96, 'test', 'test', 22, 'Masculin', '0123123123', 'test@test.com', 'asdasdas', '2023-03-13', 0, '', '', '', '', '', '', '', '', '', '', '', '', 'undefined', '', '', '', '', '', '', '', '2023-03-15', '2023-03-18', 'undefined', '15:53', '14:54'),
(97, 'test2', 'test2', 33, 'Masculin', '0123123123', 'test@test.com', 'asdasdas', '2023-03-13', 0, '', '', '', '', '', '', '', '', '', '', '', '', 'undefined', '', '', '', '', '', '', '', '2023-03-15', '2023-03-17', 'undefined', '17:00', 'undefined'),
(98, 'test3', 'test3', 22, 'Masculin', '0123123123', 'test@test.com', 'asdasdas', '2023-03-13', 122, '', 'Crowns', '', '', '', '', '', '', '', '', '', '', 'undefined', '', '', '', '', '', '', '2023-03-14', '2023-03-10', '2023-02-28', '15:48', '18:00', '16:48'),
(99, 'test4', 'test4', 32, 'Feminin', '07437782616', 'test4@test4.com', '38 MILFORD GARDENS', '2023-02-13', 2333, 'Filling', '', '', '', '', '', 'rw', '', '', 'Dr. Pelumi Apantuku', '', '', 'undefined', 're', '', '', '', '', '', '2023-02-13', '2023-02-08', '2023-03-27', '16:48', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(10) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `FirstName`, `LastName`, `Position`, `email`, `phone`) VALUES
(1, 'cel', 'test', 'CEO', 'adascalului.bogdan@gmail.com', '07437782616'),
(3, 'Zak', 'Taylor', 'CEO', 'adascalului.bogdan@gmail.com', '07437782616');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `email` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'oana', 'beniamin.a', 'Bogdan12', 'admin'),
(2, 'Bogdan', 'asdas@yaho', 'tata', 'staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

ALTER TABLE `users` MODIFY COLUMN role VARCHAR(255) DEFAULT 'staff';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
