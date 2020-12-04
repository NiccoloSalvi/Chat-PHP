-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dic 04, 2020 alle 08:09
-- Versione del server: 5.6.33-log
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `my_niccolosalvi`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `chat_amicizia`
--

CREATE TABLE IF NOT EXISTS `chat_amicizia` (
  `IDA` int(11) NOT NULL AUTO_INCREMENT,
  `Richiedente` char(20) NOT NULL,
  `Amico` char(20) NOT NULL,
  `Accettata` int(1) NOT NULL DEFAULT '-1',
  `NumeroRichieste` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IDA`),
  KEY `Richiedente` (`Richiedente`),
  KEY `Amico` (`Amico`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=35 ;

--
-- Dump dei dati per la tabella `chat_amicizia`
--

INSERT INTO `chat_amicizia` (`IDA`, `Richiedente`, `Amico`, `Accettata`, `NumeroRichieste`) VALUES
(2, 'niccosalvi', 'mattiaeffe', 1, 0),
(21, 'niccosalvi', 'sgambi', 1, 0),
(24, 'ssechi', 'niccosalvi', 1, 0),
(28, 'niccosalvi', 'simobap', 0, 0),
(31, 'lore', 'niccosalvi', -1, 0),
(32, 'michimonta', 'niccosalvi', 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
