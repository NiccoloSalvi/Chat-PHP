-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dic 04, 2020 alle 08:16
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
-- Struttura della tabella `chat_messaggio`
--

CREATE TABLE IF NOT EXISTS `chat_messaggio` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Testo` text NOT NULL,
  `DataMex` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Ricevuto` tinyint(1) NOT NULL DEFAULT '0',
  `Letto` tinyint(1) NOT NULL DEFAULT '0',
  `Tipo` tinyint(1) NOT NULL DEFAULT '0',
  `Mittente` char(20) NOT NULL,
  `Destinatario` char(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Destinatario` (`Destinatario`),
  KEY `Mittente` (`Mittente`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=728 ;

--
-- Dump dei dati per la tabella `chat_messaggio`
--

INSERT INTO `chat_messaggio` (`ID`, `Testo`, `DataMex`, `Ricevuto`, `Letto`, `Tipo`, `Mittente`, `Destinatario`) VALUES
(1, 'Hey, tutto bene dai.. tu effe?', '2020-09-08 04:09:00', 1, 1, 0, 'sgambi', 'niccosalvi'),
(2, 'Nicco, mi faresti un piacere?', '2020-10-30 15:40:00', 1, 1, 0, 'mattiaeffe', 'niccosalvi'),
(3, 'Si certo, conosci effe?...', '2020-10-30 18:15:00', 1, 1, 0, 'niccosalvi', 'mattiaeffe');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
