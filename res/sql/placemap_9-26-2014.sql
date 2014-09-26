-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 26, 2014 at 11:41 AM
-- Server version: 5.5.38-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `placemap_tothdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_category_TO_audit_type`
--

CREATE TABLE IF NOT EXISTS `audit_category_TO_audit_type` (
  `fk_audit_category_id` int(11) NOT NULL,
  `fk_audit_type_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`fk_audit_category_id`,`fk_audit_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `audit_question`
--

CREATE TABLE IF NOT EXISTS `audit_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` varchar(400) NOT NULL,
  `fk_question_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `audit_question_category`
--

CREATE TABLE IF NOT EXISTS `audit_question_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `audit_question_TO_category`
--

CREATE TABLE IF NOT EXISTS `audit_question_TO_category` (
  `fk_audit_question_id` int(11) NOT NULL,
  `fk_audit_question_category_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`fk_audit_question_id`,`fk_audit_question_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `audit_question_type`
--

CREATE TABLE IF NOT EXISTS `audit_question_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `audit_response`
--

CREATE TABLE IF NOT EXISTS `audit_response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `fk_placemarker_id` int(11) NOT NULL,
  `fk_audit_type_id` int(11) NOT NULL,
  `fk_audit_question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `audit_response_TO_question`
--

CREATE TABLE IF NOT EXISTS `audit_response_TO_question` (
  `fk_audit_response_id` int(11) NOT NULL,
  `fk_audit_question_id` int(11) NOT NULL,
  `response` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `audit_type`
--

CREATE TABLE IF NOT EXISTS `audit_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE IF NOT EXISTS `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL,
  `fk_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `participant`
--

INSERT INTO `participant` (`id`, `ip`, `fk_user_id`) VALUES
(1, '0', 0),
(2, '0', 0),
(3, '0', 0),
(4, '0', 0),
(5, '0', 0),
(6, '0', 0),
(7, '0', 0),
(8, '0', 0),
(9, '0', 0),
(10, '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `placemarker`
--

CREATE TABLE IF NOT EXISTS `placemarker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lat` varchar(30) NOT NULL,
  `lng` varchar(30) NOT NULL,
  `fk_study_area_id` int(11) NOT NULL,
  `fk_participant_id` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `location_type` varchar(30) NOT NULL,
  `question_1` varchar(800) DEFAULT NULL,
  `question_2` varchar(800) DEFAULT NULL,
  `question_3` varchar(800) DEFAULT NULL,
  `question_4` varchar(800) DEFAULT NULL,
  `question_5` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `placemarker`
--

INSERT INTO `placemarker` (`id`, `lat`, `lng`, `fk_study_area_id`, `fk_participant_id`, `icon`, `location_type`, `question_1`, `question_2`, `question_3`, `question_4`, `question_5`) VALUES
(1, 'test lat', 'test lng', 1, 0, '', '', '', '', '', '', ''),
(2, 'test lat 2', 'test lng 2', 1, 0, '', '', '', '', '', '', ''),
(3, '43.123123', '34.123123', 1, 1, '', '', '', '', '', '', ''),
(4, '43.123123', '34.123123', 1, 1, '', '', '', '', '', '', ''),
(6, '44.477037092754', '-73.214108196039', 5, -1, 'red', '', '', '', '', '', ''),
(7, '44.475972987963', '-73.210986104746', 5, -1, 'yellow', '', '', '', '', '', ''),
(8, '44.475957676961', '-73.212455955286', 5, -1, 'green', '', '', '', '', '', ''),
(9, '44.477044748114', '-73.212563243647', 5, -1, 'green', '', '', '', '', '', ''),
(10, '44.475919399439', '-73.213936534662', 5, 7, 'yellow', 'intersection', '', '', '', '', ''),
(11, '44.475812222242', '-73.215535131235', 5, 7, 'yellow', 'intersection', '', '', '', '', ''),
(12, '44.477190199761', '-73.211039748926', 5, 7, 'green', 'intersection', '', '', '', '', ''),
(13, '44.476095475834', '-73.208915439386', 5, 7, 'yellow', 'intersection', '', '', '', '', ''),
(14, '44.476960539101', '-73.215717521448', 5, 7, 'yellow', 'street', '', '', '', '', ''),
(15, '44.475750978042', '-73.218646493692', 5, 7, 'red', 'intersection', '', '', '', '', ''),
(16, '44.476485904206', '-73.218753782053', 5, 7, 'red', 'street', '', '', '', '', ''),
(17, '44.47696819447', '-73.217112270136', 5, 9, 'red', 'intersection', '', '', '', '', ''),
(18, '44.474771062092', '-73.212477412958', 5, 9, 'red', 'intersection', '', '', '', '', ''),
(19, '40.365658929209', '-74.944851842661', 6, 10, 'yellow', 'street', '', '', '', '', ''),
(20, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'health care', 'd', 'd', 'd', 'd', 'd'),
(21, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'street', 'd', 'd', 'd', 'd', 'd'),
(22, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'intersection', 'd', 'd', 'd', 'd', 'd'),
(23, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'intersection', 'sd', 'sd', 'sd', 'sd', 'sd'),
(24, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'shops', 'd', 'a', '', '', ''),
(25, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'shops', NULL, NULL, NULL, NULL, NULL),
(26, '40.365225674763', '-74.944733825464', 6, 10, 'yellow', 'historic', 'undefined ', 'undefined ', 'undefined ', 'undefined ', 'undefined ');

-- --------------------------------------------------------

--
-- Table structure for table `study_area`
--

CREATE TABLE IF NOT EXISTS `study_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `lat` varchar(30) NOT NULL,
  `lng` varchar(30) NOT NULL,
  `zoom` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `default_audit_type` int(11) NOT NULL DEFAULT '1',
  `display_placemarkers` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `study_area`
--

INSERT INTO `study_area` (`id`, `name`, `lat`, `lng`, `zoom`, `timestamp`, `fk_user_id`, `default_audit_type`, `display_placemarkers`) VALUES
(1, 'test area', 'test lat', 'test lng', 0, '2014-08-07 15:58:25', 0, 1, 1),
(2, 'test area 2', 'test lat 2', 'test lng 2', 0, '2014-08-07 15:59:45', 0, 1, 0),
(3, 'd', '44.337689', '-72.7561371', 10, '2014-09-09 18:34:08', 0, 1, 0),
(4, 'BTV 1', '44.479953712184', '-73.205095973749', 15, '2014-09-09 18:34:45', 0, 1, 0),
(5, 'Downtown Burlington', '44.476187341568', '-73.211544004221', 17, '2014-09-10 15:28:29', 0, 1, 1),
(6, 'Lambertville', '40.365225674763', '-74.944733825464', 17, '2014-09-25 11:09:09', 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `hash_pass` varchar(256) NOT NULL,
  `salt` varchar(10) NOT NULL,
  `fk_user_type` varchar(15) NOT NULL,
  `token` varchar(6) NOT NULL,
  `token_expire` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `hash_pass`, `salt`, `fk_user_type`, `token`, `token_expire`) VALUES
(1, 'mtotho@gmail.com', '39aa1f49e4fdfb1ff66acedca674c84ec333aedcd94228ea0bab828e6332490b', '732c14f4b4', 'super_admin', 'bad63d', '2014-09-26 15:08:36');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
