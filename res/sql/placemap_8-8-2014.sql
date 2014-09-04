-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 08, 2014 at 04:53 PM
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `placemarker`
--

INSERT INTO `placemarker` (`id`, `lat`, `lng`, `fk_study_area_id`, `fk_participant_id`) VALUES
(1, 'test lat', 'test lng', 1, 0),
(2, 'test lat 2', 'test lng 2', 1, 0),
(3, '43.123123', '34.123123', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `study_area`
--

CREATE TABLE IF NOT EXISTS `study_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `lat` varchar(30) NOT NULL,
  `lng` varchar(30) NOT NULL,
  `timestamp` datetime NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `default_audit_type` int(11) NOT NULL DEFAULT '1',
  `display_placemarkers` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `study_area`
--

INSERT INTO `study_area` (`id`, `name`, `lat`, `lng`, `timestamp`, `fk_user_id`, `default_audit_type`, `display_placemarkers`) VALUES
(1, 'test area', 'test lat', 'test lng', '2014-08-07 15:58:25', 0, 1, 0),
(2, 'test area 2', 'test lat 2', 'test lng 2', '2014-08-07 15:59:45', 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `salt` varchar(5) NOT NULL,
  `is_admin` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
