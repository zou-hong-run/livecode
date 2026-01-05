-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2026-01-05 19:51:26
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `livecode`
--

-- --------------------------------------------------------

--
-- 表的结构 `childrencode`
--

CREATE TABLE `childrencode` (
  `id` int(11) NOT NULL,
  `codeUrl` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `childrencode`
--

INSERT INTO `childrencode` (`id`, `codeUrl`, `count`) VALUES
(33, 'uploads/file-1693729580888-79470867.png', 1),
(34, 'uploads/file-1693729580892-989881854.jpg', 1),
(35, 'uploads/file-1693739869371-183497168.jpeg', 0),
(36, 'uploads/file-1693739869370-162502727.jpg', 0),
(37, 'uploads/file-1693743507780-354816462.jpg', 2),
(38, 'uploads/file-1693743507781-130813864.jpg', 0),
(39, 'uploads/file-1693791070819-809775047.png', 0),
(40, 'uploads/file-1693791070823-630837883.jpg', 0),
(41, 'uploads/file-1693791593884-727254617.png', 0),
(42, 'uploads/file-1693791920926-907857155.jpg', 1),
(43, 'uploads/file-1693791920928-309838325.jpg', 3),
(44, 'uploads/file-1693791920947-482328041.png', 1),
(45, 'uploads/file-1693791920948-305439171.jpeg', 1),
(46, 'uploads/file-1693996888887-747559639.png', 10);

-- --------------------------------------------------------

--
-- 表的结构 `livecode`
--

CREATE TABLE `livecode` (
  `id` int(11) NOT NULL,
  `codeTitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `codeDescription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `childrenIds` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `logoUrl` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `changeValue` int(11) DEFAULT NULL COMMENT '更换阈值',
  `count` int(11) UNSIGNED DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `livecode`
--

INSERT INTO `livecode` (`id`, `codeTitle`, `codeDescription`, `childrenIds`, `logoUrl`, `changeValue`, `count`) VALUES
(17, 'rfwf', 'q', '[39,40]', 'uploads/file-1693791074403-985307881.jpg', 1, 1),
(18, 'fewf', 'fwef', '[41]', 'uploads/file-1693791597795-597132397.jpg', 1, 0),
(19, 'g4w4tgt4g', 'wg4w', '[43,45,44,42]', 'uploads/file-1693791924865-976613022.jpg', 1, 9),
(20, '发的服务访问哇', '方无法', '[46]', 'uploads/file-1693996895229-457637871.jpg', 1, 9);

--
-- 转储表的索引
--

--
-- 表的索引 `childrencode`
--
ALTER TABLE `childrencode`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `livecode`
--
ALTER TABLE `livecode`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `childrencode`
--
ALTER TABLE `childrencode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- 使用表AUTO_INCREMENT `livecode`
--
ALTER TABLE `livecode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
