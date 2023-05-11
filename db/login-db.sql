-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2023 at 12:55 PM
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
  `cost` int(100) DEFAULT NULL,
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
  `pay_t1` varchar(255) DEFAULT 'unpaid',
  `pay_t2` varchar(255) DEFAULT 'unpaid',
  `pay_t3` varchar(255) DEFAULT 'unpaid',
  `nextapp1` varchar(200) DEFAULT NULL,
  `nextapp2` varchar(200) DEFAULT NULL,
  `nextapp3` varchar(200) DEFAULT NULL,
  `startime1` varchar(200) DEFAULT NULL,
  `startime2` varchar(200) DEFAULT NULL,
  `startime3` varchar(200) DEFAULT NULL,
  `user` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `firstName`, `lastName`, `age`, `sex`, `phone`, `email`, `address`, `walkin`, `cost`, `treatement_1`, `treatement_2`, `treatement_3`, `cost_1`, `cost_2`, `cost_3`, `notes_1`, `notes_2`, `notes_3`, `doctor_t1`, `doctor_t2`, `doctor_t3`, `doctor`, `t1_desc`, `t2_desc`, `t3_desc`, `pay_t1`, `pay_t2`, `pay_t3`, `nextapp1`, `nextapp2`, `nextapp3`, `startime1`, `startime2`, `startime3`, `user`) VALUES
(136, 'Johny', 'Smith', 33, 'Masculin', '07823441223', 'J.smith@yahoo.com', '38 MILFORD GARD', '2023-05-03', 3787, 'Filling', 'Filling', '', '232', '3232', '323', 'asdasd', 'asdasd', '', 'Dr. John Smith II', 'Dr. John Smith II', 'Dr. John Smith II', 'undefined', 'asdasd', 'asdasd', '', 'paid', 'paid', 'paid', '2023-04-12', '2023-05-02', '2023-05-12', '9:00-11:00', '15:00-17:00', '9:00-11:00', NULL),
(138, 'Zak', 'Taylor', 7, 'Masculin', '07437782616', 'adascalului.bogdan@gmail.com', '152 de Havilland Road', '2023-05-02', 1323, 'Crowns', 'Teeth whitening', '', '323', '1000', '', 'asdas', 'dasda', '', 'Dr. Kamely Asin', 'Dr. Trevor Hightower', '', 'undefined', 'asdasd', 'asda', '', 'paid', 'paid', 'unpaid', '2023-05-11', '2023-05-12', '', '9:00-11:00', '11:00-13:00', '', NULL),
(139, 'Achim', 'Taylor', 33, 'Masculin', '07437782616', 'adascalului.bogdan@gmail.com', '152 de Havilland Road', '2023-05-01', 0, '', '', '', '', '', '', '', '', '', '', '', '', 'undefined', '', '', '', 'paid', 'unpaid', 'unpaid', '2023-05-11', '', '2023-05-05', '9:00-11:00', '', '', NULL),
(141, 'Samoil-Bogdan doc', 'Adascalului', 21, 'Masculin', '07437782616', 'adascalului.bogdan@gmail.com', '152 de Havilland Road', '2023-04-01', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, NULL, NULL, 'unpaid', 'unpaid', 'unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(142, 'Samoil-Bogdan cel mai test', 'Adascalului', 22, 'Masculin', '07437782616', 'adascalului.bogdan@gmail.com', '38 MILFORD GARDENS', '2023-05-11', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, NULL, NULL, 'unpaid', 'unpaid', 'unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(143, 'steven ', 'smith', 22, 'Feminin', '07437882331', 's.smith@yahoo.com', '38 princess gate', '2023-05-04', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, NULL, NULL, 'unpaid', 'unpaid', 'unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(47, 'benitest', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(48, 'benitest', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(49, 'benitest', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(50, 'oana', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(51, 'test2323', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(52, 'oana', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(53, 'test2323', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(54, 'oana', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(55, 'oana', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313'),
(56, 'test2323', 'testttt', 'CEO', 'bogdan@yahoo.com', '07332322313');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(3, 'oana', 'beniamin.a', 'Bogdan12', 'admin'),
(5, 'Bogdan', 'asdas@yaho', 'tata', 'staff'),
(21, 'tata', 'tata', 'tata', 'staff'),
(22, 'new', 'new@gmail.com', 'new', 'new');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `patient_ibfk_2` FOREIGN KEY (`user`) REFERENCES `staff` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
