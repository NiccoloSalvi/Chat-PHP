-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dic 04, 2020 alle 08:08
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
-- Struttura della tabella `chat_user`
--

CREATE TABLE IF NOT EXISTS `chat_user` (
  `Nickname` char(20) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Nominativo` varchar(255) NOT NULL,
  `ProfileImage` varchar(20) NOT NULL DEFAULT 'blank',
  `Bio` varchar(200) DEFAULT NULL,
  `Password` char(128) NOT NULL,
  `Token` varchar(255) NOT NULL,
  UNIQUE KEY `Nickname` (`Nickname`),
  UNIQUE KEY `Nickname_2` (`Nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `chat_user`
--

INSERT INTO `chat_user` (`Nickname`, `Email`, `Nominativo`, `ProfileImage`, `Bio`, `Password`, `Token`) VALUES
('averdi', 'averdi444@gmail.com', 'Verdi Alessandro', 'averdi.png', NULL, 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', ''),
('lore', 'ripa.lorenzo@gmail.com', 'Ripa Lorenzo', 'blank.png', NULL, 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', ''),
('mattiaeffe', 'mattiaeffendi@gmail.com', 'Effendi Mattia', 'mattiaeffe.jpg', 'For you and me, my beautiful fantasy', 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibWF0dGlhZWZmZSJ9.KT8iqArDeADFVIGzuI8MosH16k-kJIaNw5IGv6itxMM'),
('michimonta', 'michi@gmail.com', 'Montanelli Michele', 'michimonta.png', 'Bergamo 24/12/2002 Paleocapa', 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibWljaGltb250YSJ9.nvnPa95kpl6uZ-j6Dc8K2vgEdEn3WSTFbwACHrqq5tQ'),
('niccosalvi', 'nicco.salvi@gmail.com', 'Salvi Niccolo', 'niccosalvi.jpg', 'I am not in competition with anyone but myself. My goal is to improve myself continuously', 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibmljY29zYWx2aSJ9.wi1311B59R-0f0qn158ycB7Z0cTlYgFzjgZuFtIlF38'),
('sgambi', 'sbambi@gmail.com', 'Gambirasio Sergio', 'sgambi.png', 'Informatica e Telecomunicazioni, Basket, Ciclismo, Nuoto', 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', ''),
('simobap', 'simobap@gmail.com', 'Baptiste Simone', 'simobap.png', 'ITIS P. Paleocapa, Ghisalba', 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2ltb2JhcCJ9.JwcLf0NekXXfLd7cSg51O4mdG_8nTyorfmFVEMLtG_g'),
('ssechi', 'ssechi@gmail.com', 'Sechi Simone', 'ssechi.png', 'I.T.I.S Paleocapa going for Bicocca. Budding programme', 'a0c299b71a9e59d5ebb07917e70601a3570aa103e99a7bb65a58e780ec9077b1902d1dedb31b1457beda595fe4d71d779b6ca9cad476266cc07590e31d84b206', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3NlY2hpIn0.1Okk_8w2CK9FtJ8c8_joWAoXzTd-JnLnK6NHh-vbckA');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
