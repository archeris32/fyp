
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



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
  `nextapp` varchar(200) NOT NULL,
  `cost` int(100) NOT NULL,
  `doctor` varchar(200) DEFAULT NULL,
  `treatement_1` varchar(200) DEFAULT NULL,
  `treatement_2` varchar(200) DEFAULT NULL,
  `treatement_3` varchar(200) DEFAULT NULL,
  `cost_1` varchar(255) DEFAULT NULL,
  `cost_2` varchar(255) DEFAULT NULL,
  `cost_3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `firstName`, `lastName`, `age`, `sex`, `phone`, `email`, `address`, `walkin`, `nextapp`, `cost`, `doctor`, `treatement_1`, `treatement_2`, `treatement_3`, `cost_1`, `cost_2`, `cost_3`) VALUES
(54, 'Samoil-Bogdan', 'Adascalului', 33, 'undefined', '07437782616', 'adascalului.bogdan@gmail.com', '38 MILFORD GARDENS', '2023-01-25', '', 22, 'Dr. Kimia Aksir', NULL, NULL, NULL, '22', '', '');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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

