-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2021 at 05:29 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crawlerdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(55) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `url`) VALUES
(1, 'digikala-mobile-phones', 'https://www.digikala.com/search/category-mobile-phone');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `start_crawl_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `end_crawl_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `count` int(5) NOT NULL,
  `site_id` int(5) NOT NULL,
  `category_id` int(5) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `start_crawl_time`, `end_crawl_time`, `count`, `site_id`, `category_id`, `date`) VALUES
(1, '13232', '34242432', 0, 0, 0, '2021-06-09'),
(2, '1623261358193', '1623261358193', 0, 0, 0, '2021-06-09'),
(3, '1623259841567', '1623259845233', 0, 0, 0, '2021-06-09'),
(4, '1623341922491', '1623341930709', 0, 0, 0, '2021-06-10'),
(5, '1623342135294', '1623342140332', 108, 0, 1, '2021-06-10'),
(6, '1623343243758', '1623343248805', 108, 0, 1, '2021-06-10');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  `site_id` int(5) NOT NULL,
  `category_id` int(2) NOT NULL,
  `date` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `url`, `image`, `site_id`, `category_id`, `date`) VALUES
(541, 'گوشی موبایل سامسونگ مدل Galaxy A51 SM-A515F/DSN دو سیم ', '/product/dkp-2361428/گوشی-موبایل-سامسونگ-مدل-galaxy-a51-sm-a515fdsn-دو-سیم-کارت-ظرفیت-128گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(542, 'گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت ', '/product/dkp-3868296/گوشی-موبایل-اپل-مدل-iphone-12-a2404-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(543, 'گوشی موبایل سامسونگ مدل Galaxy A12 SM-A125F/DS دو سیم ک', '/product/dkp-4122136/گوشی-موبایل-سامسونگ-مدل-galaxy-a12-sm-a125fds-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(544, 'گوشی موبایل سامسونگ مدل Galaxy A32 SM-A325F/DS دو سیم‌ک', '/product/dkp-4834144/گوشی-موبایل-سامسونگ-مدل-galaxy-a32-sm-a325fds-دو-سیمکارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(545, 'گوشی موبایل شیائومی مدل POCO X3 M2007J20CG دو سیم‌ کارت', '/product/dkp-3754319/گوشی-موبایل-شیائومی-مدل-poco-x3-m2007j20cg-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(546, 'گوشی موبایل سامسونگ مدل Galaxy S20 FE SM-G780F/DS دو سی', '/product/dkp-4008192/گوشی-موبایل-سامسونگ-مدل-galaxy-s20-fe-sm-g780fds-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(547, 'گوشی موبایل شیائومی مدل POCO M3 M2010J19CG دو سیم‌ کارت', '/product/dkp-4149037/گوشی-موبایل-شیائومی-مدل-poco-m3-m2010j19cg-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(548, 'گوشی موبایل اپل مدل iPhone 12 Pro Max A2412 دو سیم‌ کار', '/product/dkp-3893718/گوشی-موبایل-اپل-مدل-iphone-12-pro-max-a2412-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/be7a0e9bf7866759fa3cea7648b149f589a01040_1607433995.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(549, 'گوشی موبایل سامسونگ مدل Galaxy A21S SM-A217F/DS دو سیم‌', '/product/dkp-3048126/گوشی-موبایل-سامسونگ-مدل-galaxy-a21s-sm-a217fds-دو-سیمکارت-ظرفیت-64-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(550, 'گوشی موبایل شیائومی مدل POCO X3 Pro M2102J20SG دو سیم‌ ', '/product/dkp-4958276/گوشی-موبایل-شیائومی-مدل-poco-x3-pro-m22102j20sg-دو-سیم-کارت-ظرفیت-256-گیگابایت-و-8-گیگابایت-رم', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(551, 'گوشی موبایل سامسونگ مدل  A72 SM-A725F/DS دو سیم‌کارت ظر', '/product/dkp-4834527/گوشی-موبایل-سامسونگ-مدل-a72-sm-a725fds-دو-سیمکارت-ظرفیت-256-گیگابایت-و-رم-8-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(552, 'گوشی موبایل سامسونگ مدل Galaxy A31 SM-A315F/DS دو سیم ک', '/product/dkp-2910269/گوشی-موبایل-سامسونگ-مدل-galaxy-a31-sm-a315fds-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(553, 'گوشی موبایل سامسونگ مدل Galaxy A02 SM-A022F/DS دو سیم ک', '/product/dkp-4453371/گوشی-موبایل-سامسونگ-مدل-galaxy-a02-sm-a022fds-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-3-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(554, 'گوشی موبایل شیائومی مدل Redmi 9A M2006C3LG دو سیم‌ کارت', '/product/dkp-3246506/گوشی-موبایل-شیائومی-مدل-redmi-9a-m2006c3lg-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(555, 'گوشی موبایل شیائومی مدل Redmi Note 10 M2101K7AG دو سیم‌', '/product/dkp-4884058/گوشی-موبایل-شیائومی-مدل-redmi-note-10-m2101k7ag-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/aa5301ced52fcd9171af55d75619ebe073a91d73_1618212062.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(556, 'گوشی موبایل شیائومی مدل Redmi Note 8 Pro m1906g7G دو سی', '/product/dkp-2212020/گوشی-موبایل-شیائومی-مدل-redmi-note-8-pro-m1906g7g-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/114358181.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(557, 'گوشی موبایل سامسونگ مدل Galaxy S21 Ultra 5G SM-G998B/DS', '/product/dkp-4330247/گوشی-موبایل-سامسونگ-مدل-galaxy-s21-ultra-5g-sm-g998bds-دو-سیم-کارت-ظرفیت-256-گیگابایت-و-رم-12-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/62c8a2c6d57dce6efbde8bbd348490c2f10a55e1_1611742799.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(558, 'گوشی موبایل اپل مدل  iPhone SE 2020 A2275 ظرفیت 128 گیگ', '/product/dkp-3007747/گوشی-موبایل-اپل-مدل-iphone-se-2020-a2275-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/122045219.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(559, 'گوشی موبایل سامسونگ مدل A52 5G SM-A526B/DS دو سیم‌کارت ', '/product/dkp-4906095/گوشی-موبایل-سامسونگ-مدل-a52-5g-sm-a526bds-دو-سیمکارت-ظرفیت-128-گیگابایت-و-رم-8-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/49f4f2be1e7982cf969ab86cd14ae14ff694d32c_1618397706.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(560, 'گوشی موبایل شیائومی مدل Redmi Note 9T 5G M2007J22G ظرفی', '/product/dkp-4418954/گوشی-موبایل-شیائومی-مدل-redmi-note-9t-5g-m2007j22g-ظرفیت-128-گیگابایت-و-رم-4-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(561, 'گوشی موبایل شیائومی مدل Mi 10T PRO 5G M 2007J3SG دو سیم', '/product/dkp-4107334/گوشی-موبایل-شیائومی-مدل-mi-10t-pro-5g-m-2007j3sg-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/3fd94686aff190d2994a9df75673f50dbf49cff4_1609159004.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(562, 'گوشی موبایل شیائومی مدل Mi 10T 5G M2007J3SY دو سیم‌ کار', '/product/dkp-4209461/گوشی-موبایل-شیائومی-مدل-mi-10t-5g-m2007j3sy-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-8-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/5b7dd839ced00621a17ffb4089b46cbd434a2f8e_1610345232.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(563, 'گوشی موبایل شیائومی مدل Redmi 9 M2004J19G دو سیم‌ کارت ', '/product/dkp-3151747/گوشی-موبایل-شیائومی-مدل-redmi-9-m2004j19g-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(564, 'گوشی موبایل شیائومی مدل Redmi Note 9 M2003J15SS دو سیم‌', '/product/dkp-3105133/گوشی-موبایل-شیائومی-مدل-redmi-note-9-m2003j15ss-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-3-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/f92dfb141480b0800859d266e85063f09f6d3237_1595064082.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(565, 'گوشی موبایل سامسونگ مدل Galaxy A12 SM-A125F/DS دو سیم ک', '/product/dkp-4230579/گوشی-موبایل-سامسونگ-مدل-galaxy-a12-sm-a125fds-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/6207b3bf015d7fff97e9e04868497ac6a30474a3_1610543495.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(566, 'گوشی موبایل اپل مدل iPhone 12 Pro A2408 دو سیم‌ کارت ظر', '/product/dkp-4149142/گوشی-موبایل-اپل-مدل-iphone-12-pro-a2408-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(567, 'گوشی موبایل شیائومی مدل POCO X3 Pro M2102J20SG دو سیم‌ ', '/product/dkp-4957468/گوشی-موبایل-شیائومی-مدل-poco-x3-pro-m22102j20sg-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-6-گیگابایت-رم', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(568, 'گوشی موبایل اپل مدل iPhone 11 A2223 دو سیم‌ کارت ظرفیت ', '/product/dkp-2062198/گوشی-موبایل-اپل-مدل-iphone-11-a2223-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/987bbf684de2df847c8fa1dcb9570fbf580f79dc_1611468226.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(569, 'گوشی موبایل شیائومی مدل POCO X3 NFC M2007J20CG دو سیم‌ ', '/product/dkp-4244447/گوشی-موبایل-شیائومی-مدل-poco-x3-nfc-m2007j20cg-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-6-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/a1981f054f980e183cb23ff39799bd37ac983ae4_1610788090.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(570, 'گوشی موبایل هوآوی مدل Y8p AQM-LX1 دو سیم کارت ظرفیت 128', '/product/dkp-3532969/گوشی-موبایل-هوآوی-مدل-y8p-aqm-lx1-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/7ed37a46aceaefc032c405304049e34cd7dfc91c_1602333633.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(571, 'گوشی موبایل سامسونگ مدل Galaxy A02s SM-A025F/DS دو سیم ', '/product/dkp-4230198/گوشی-موبایل-سامسونگ-مدل-galaxy-a02s-sm-a025fds-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-4-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(572, 'گوشی موبایل سامسونگ مدل Galaxy Note20 Ultra 5G SM-N986 ', '/product/dkp-4048744/گوشی-موبایل-سامسونگ-مدل-galaxy-note20-ultra-5g-sm-n986bzkwxsg-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/0ca836dc8142c065747aa86a9899347631a5b9e5_1608382853.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(573, 'گوشی موبایل شیائومی مدل POCO M3 M2010J19CG دو سیم‌ کارت', '/product/dkp-4148736/گوشی-موبایل-شیائومی-مدل-poco-m3-m2010j19cg-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/219163a48b85831190b1aa4983a71565a19434c2_1609659114.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(574, 'گوشی موبایل سامسونگ مدل Galaxy A01 Core SM-A013G/DS دو ', '/product/dkp-3266410/گوشی-موبایل-سامسونگ-مدل-galaxy-a01-core-sm-a013gds-دو-سیم-کارت-ظرفیت-16-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/d0287df2f6aa331ed66926d9d30684ad1ca018ab_1597834727.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(575, 'گوشی موبایل سامسونگ مدل Galaxy A10s SM-A107F/DS دو سیم ', '/product/dkp-2066213/گوشی-موبایل-سامسونگ-مدل-galaxy-a10s-sm-a107fds-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/113562469.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(576, 'گوشی موبایل شیائومی مدل Redmi Note 9S M2003J6A1G دو سیم', '/product/dkp-2848198/گوشی-موبایل-شیائومی-مدل-redmi-note-9s-m2003j6a1g-دو-سیم-کارت-ظرفیت-128گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(577, 'گوشی موبایل سامسونگ مدل Galaxy A71 SM-A715F/DS دو سیم‌ک', '/product/dkp-2677898/گوشی-موبایل-سامسونگ-مدل-galaxy-a71-sm-a715fds-دو-سیمکارت-ظرفیت-128-گیگابایت-و-رم-8-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/120415904.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(578, 'گوشی موبایل شیائومی مدل Redmi Note 10 M2101K7AG دو سیم‌', '/product/dkp-5071843/گوشی-موبایل-شیائومی-مدل-redmi-note-10-m2101k7ag-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت-clone-1-of-4884058', 'https://dkstatics-public.digikala.com/digikala-products/aa5301ced52fcd9171af55d75619ebe073a91d73_1620034796.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(579, 'گوشی موبایل شیائومی مدل redmi 9T M2010J19SG ظرفیت 64 گی', '/product/dkp-4418812/گوشی-موبایل-شیائومی-مدل-redmi-9t-m2010j19sg-ظرفیت-64-گیگابایت-و-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/4e320a0c9c619738b7551e71d6ad7f17f370400f_1612769873.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(580, 'گوشی موبایل شیائومی مدل redmi 9T M2010J19SG ظرفیت 128 گ', '/product/dkp-4418645/گوشی-موبایل-شیائومی-مدل-redmi-9t-m2010j19sg-ظرفیت-128-گیگابایت-و-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/4e320a0c9c619738b7551e71d6ad7f17f370400f_1612769073.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(581, 'گوشی موبایل شیائومی مدل Mi 10T Lite 5G M2007J17G دو سیم', '/product/dkp-4259238/گوشی-موبایل-شیائومی-مدل-mi-10t-lite-5g-m2007j17g-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(582, 'گوشی موبایل هوآوی مدل Nova 7i JNY-LX1 دو سیم کارت ظرفیت', '/product/dkp-2961837/گوشی-موبایل-هوآوی-مدل-nova-7i-jny-lx1-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(583, 'گوشی موبایل سامسونگ مدل Galaxy A42 5G SM-A426B/DS دو سی', '/product/dkp-4176781/گوشی-موبایل-سامسونگ-مدل-galaxy-a42-5g-sm-a426bds-دو-سیم-کارت-ظرفیت-128گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/a2934e41291fccb2cb8e5cad943f92281e272412_1609927486.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(584, 'گوشی موبایل شیائومی مدل Redmi Note 9S M2003J6A1G دو سیم', '/product/dkp-2848855/گوشی-موبایل-شیائومی-مدل-redmi-note-9s-m2003j6a1g-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/121250961.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(585, 'گوشی موبایل شیائومی مدل Redmi 9C M2006C3MG دو سیم‌ کارت', '/product/dkp-3512785/گوشی-موبایل-شیائومی-مدل-redmi-9c-m2006c3mg-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/30e2f4b3fe0109f41b77ab59b6c1cd870802664b_1601977271.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(586, 'گوشی موبایل سامسونگ مدل Galaxy A11 SM-A115F/DS دو سیم ک', '/product/dkp-3168416/گوشی-موبایل-سامسونگ-مدل-galaxy-a11-sm-a115fds-دو-سیم-کارت-ظرفیت-32-گیگابایت-با-2-گیگابایت-رم', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(587, 'گوشی موبایل شیائومی مدل Redmi Note 9 Pro M2003J6B2G دو ', '/product/dkp-3105612/گوشی-موبایل-شیائومی-مدل-redmi-note-9-pro-m2003j6b2g-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/9236d53437d221c908f3ea53a0ae4d5f165ea8e9_1595064824.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(588, 'گوشی موبایل شیائومی مدل POCO X3 Pro M2102J20SG NFC دو س', '/product/dkp-4964868/گوشی-موبایل-شیائومی-مدل-poco-x3-pro-m22102j20sg-nfc-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-6-گیگابایت-رم', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(589, 'گوشی موبایل سامسونگ مدل Galaxy A31 SM-A315G/DS دو سیم ک', '/product/dkp-5130255/گوشی-موبایل-سامسونگ-مدل-galaxy-a31-sm-a315gds-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-6-گیگابایت-رم', 'https://dkstatics-public.digikala.com/digikala-products/cacf0cea8b8ada23d2f0e87dfded3bd5ba2b8ab5_1620627049.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(590, 'گوشی موبایل شیائومی مدل Mi 10 Lite 5G M2002J9G دو سیم‌ ', '/product/dkp-4175705/گوشی-موبایل-شیائومی-مدل-mi-10-lite-5g-m2002j9g-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/a9cd12d1f0ddcf4f419a92b3ee1fe4b35572d049_1609920664.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(591, 'گوشی موبایل اپل مدل iPhone 12 Pro Max A2412 دو سیم‌ کار', '/product/dkp-3555626/گوشی-موبایل-اپل-مدل-iphone-12-pro-max-a2412-دو-سیم-کارت-ظرفیت-512-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/be7a0e9bf7866759fa3cea7648b149f589a01040_1607438980.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(592, 'گوشی موبایل شیائومی مدل Redmi Note 9 Pro M2003J6B2G دو ', '/product/dkp-3087539/گوشی-موبایل-شیائومی-مدل-redmi-note-9-pro-m2003j6b2g-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/9236d53437d221c908f3ea53a0ae4d5f165ea8e9_1594729254.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(593, 'گوشی موبایل سامسونگ مدل Galaxy Z Flip SM-F700F/DS دو سی', '/product/dkp-2922863/گوشی-موبایل-سامسونگ-مدل-galaxy-z-flip-sm-f700fds-تک-سیم-کارت-ظرفیت-256-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(594, 'گوشی موبایل شیائومی مدل Mi 11 Lite M2101K9AG دو سیم‌ کا', '/product/dkp-5063474/گوشی-موبایل-شیائومی-مدل-mi-11-lite-m2101k9ag-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-6-گیگابایت-رم', 'https://dkstatics-public.digikala.com/digikala-products/3000a4c6a87111a1940f391985bd3ec7a848a9a4_1619953480.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(595, 'گوشی موبایل شیائومی مدل Redmi 9C M2006C3MG دو سیم‌ کارت', '/product/dkp-3246524/گوشی-موبایل-شیائومی-مدل-redmi-9c-m2006c3mg-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(596, 'گوشی موبایل اپل مدل  iPhone SE 2020 A2275 ظرفیت 64 گیگا', '/product/dkp-3240894/گوشی-موبایل-اپل-مدل-iphone-se-2020-a2275-ظرفیت-64-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/2d8b2a93deff77b2689b9dd011571aa37a6b0d00_1597481724.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(597, 'گوشی موبایل سامسونگ مدل Galaxy A02s SM-A025F/DS دو سیم ', '/product/dkp-4177353/گوشی-موبایل-سامسونگ-مدل-galaxy-a02s-sm-a025fds-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/1666cd01cdce4aa23e8ba5df719fb11b8accfc58_1609930630.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(598, 'گوشی موبایل سامسونگ مدل Galaxy Z Fold2 LTE SM-F916B تک ', '/product/dkp-4230936/گوشی-موبایل-سامسونگ-مدل-galaxy-z-fold2-lte-sm-f916b-تک-سیمکارت-ظرفیت-256-گیگابایت-و-رم-12-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(599, 'گوشی موبایل سامسونگ مدل Galaxy A51 SM-A515F/DSN دو سیم ', '/product/dkp-3569970/گوشی-موبایل-سامسونگ-مدل-galaxy-a51-sm-a515fdsn-دو-سیم-کارت-ظرفیت-128گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/b94fc21a67b4e43a4b4c7539129ee4b45303c71b_1602999418.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(600, 'گوشی موبایل شیائومی مدل Redmi Note 10 M2101K7AG دو سیم‌', '/product/dkp-5071844/گوشی-موبایل-شیائومی-مدل-redmi-note-10-m2101k7ag-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت-clone-2-of-4884058', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(601, 'گوشی موبایل نوکیا مدل 105 - 2019 TA-1174 DS دو سیم‌ کار', '/product/dkp-2087200/گوشی-موبایل-نوکیا-مدل-105-2019-ta-1174-ds-دو-سیم-کارت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(602, 'گوشی موبایل شیائومی مدل Mi 10T Lite 5G M2007J17G دو سیم', '/product/dkp-4258800/گوشی-موبایل-شیائومی-مدل-mi-10t-lite-5g-m2007j17g-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-6-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(603, 'گوشی موبایل سامسونگ مدل  A52 SM-A525F/DS دو سیم‌کارت ظر', '/product/dkp-4884468/گوشی-موبایل-سامسونگ-مدل-a52-sm-a525fds-دو-سیمکارت-ظرفیت-256-گیگابایت-و-رم-8-گیگابایت-clone-1-of-4833369', 'https://dkstatics-public.digikala.com/digikala-products/49f4f2be1e7982cf969ab86cd14ae14ff694d32c_1618211163.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(604, 'گوشی موبایل سامسونگ مدل Galaxy S21 Plus 5G SM-G996B/DS ', '/product/dkp-4244451/گوشی-موبایل-سامسونگ-مدل-galaxy-s21-plus-5g-sm-g996bds-دو-سیم-کارت-ظرفیت-256-گیگابایت-و-رم-8-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(605, 'گوشی موبایل سامسونگ مدل Galaxy A11 SM-A115F/DS دو سیم ک', '/product/dkp-2982864/گوشی-موبایل-سامسونگ-مدل-galaxy-a11-sm-a115fds-دو-سیم-کارت-ظرفیت-32-گیگابایت-با-3-گیگابایت-رم', 'https://dkstatics-public.digikala.com/digikala-products/121916216.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(606, 'گوشی موبایل سامسونگ مدل Galaxy S20 FE 5G SM-G781B/DS دو', '/product/dkp-4667388/گوشی-موبایل-سامسونگ-مدل-galaxy-s20-fe-sm-g780fds-دو-سیم-کارت-ظرفیت-128-گیگابایت-clone-1-of-4008192', 'https://dkstatics-public.digikala.com/digikala-products/2e16bad7f6ea176ae6502406d7342afe9982fbf7_1615294431.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(607, 'گوشی موبایل اپل مدل iPhone 12 mini A2176 ظرفیت 128 گیگا', '/product/dkp-4166193/گوشی-موبایل-اپل-مدل-iphone-12-mini-a2176-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/2d5bb77c9e694379ec4b3c8294520b143600e638_1609831833.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(608, 'گوشی موبایل شیائومی مدل Redmi Note 8 Pro m1906g7G دو سی', '/product/dkp-2244022/گوشی-موبایل-شیائومی-مدل-redmi-note-8-pro-m1906g7g-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/114533958.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(609, 'گوشی موبایل شیائومی مدل Mi 10T 5G M2007J3SY دو سیم‌ کار', '/product/dkp-4583598/گوشی-موبایل-شیائومی-مدل-mi-10t-5g-m2007j3sy-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(610, 'گوشی موبایل شیائومی مدل redmi 9T M2010J19SG ظرفیت 128 گ', '/product/dkp-4795362/گوشی-موبایل-شیائومی-مدل-redmi-9t-m2010j19sg-ظرفیت-128-گیگابایت-و-رم-4-گیگابایت-clone-1-of-4418645', 'https://dkstatics-public.digikala.com/digikala-products/4e320a0c9c619738b7551e71d6ad7f17f370400f_1616840086.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(611, 'گوشی موبایل سامسونگ مدل Galaxy Note20 Ultra SM-N985F/DS', '/product/dkp-3221442/گوشی-موبایل-سامسونگ-مدل-galaxy-note20-ultra-sm-n985fds-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(612, 'گوشی موبایل هوآوی مدل Huawei Y7p ART-L29 دو سیم کارت ظر', '/product/dkp-3175138/گوشی-موبایل-هوآوی-مدل-huawei-y7p-art-l29-دو-سیم-کارت-ظرفیت-64-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(613, 'گوشی موبایل شیائومی مدل REDMI 9AT M2006C3LVG دوسیم کارت', '/product/dkp-4904601/گوشی-موبایل-شیائومی-مدل-redmi-9at-m2006c3lvg-دوسیم-کارت-ظرفیت-32-گیگابایت-و-رم-2-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/903760521a892ad06471abb0264173640faf0aa2_1618391532.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(614, 'گوشی موبایل شیائومی مدل Redmi 9 M 2004J19C دو سیم‌ کارت', '/product/dkp-4214164/گوشی-موبایل-شیائومی-مدل-redmi-9-m-2004j19c-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/dda06bfb7f4df20d01f58bdcdee0d91625c96797_1610369584.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(615, 'گوشی موبایل شیائومی مدل Redmi Note 9 M2003J15SS دو سیم‌', '/product/dkp-3105641/گوشی-موبایل-شیائومی-مدل-redmi-note-9-m2003j15ss-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-۴-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/f92dfb141480b0800859d266e85063f09f6d3237_1595065027.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(616, 'گوشی موبایل نوکیا مدل  7.2 TA-1196 DS دو سیم کارت ظرفیت', '/product/dkp-2213443/گوشی-موبایل-نوکیا-مدل-72-ta-1196-ds-دو-سیم-کارت-ظرفیت-128-گیگابایت-همراه-با-رم-6-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/114367786.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(617, 'گوشی موبایل اپل مدل iPhone 12 Pro Max A2412 دو سیم‌ کار', '/product/dkp-4640519/گوشی-موبایل-اپل-مدل-iphone-12-pro-max-a2412-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(618, 'گوشی موبایل موتورولا مدل Moto G 5G Plus XT2075-3 دو سیم', '/product/dkp-4377689/گوشی-موبایل-موتورولا-مدل-moto-g-5g-plus-xt2075-3-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-8-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/a0e991ad72975138883e9159e237ada3bafc9a5e_1612269417.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(619, 'گوشی موبایل شیائومی مدل Redmi 9 M2004J19G دو سیم‌ کارت ', '/product/dkp-3183082/گوشی-موبایل-شیائومی-مدل-redmi-9-m2004j19g-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/dda06bfb7f4df20d01f58bdcdee0d91625c96797_1596431171.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(620, 'گوشی موبایل سامسونگ مدل  Galaxy M11 SM-M115F/DS دو سیم ', '/product/dkp-3071433/گوشی-موبایل-سامسونگ-مدل-galaxy-m11-sm-m115fds-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(621, 'گوشی موبایل شیائومی مدل POCO X3 NFC M2007J20CT دو سیم‌ ', '/product/dkp-4924610/گوشی-موبایل-شیائومی-مدل-poco-x3-nfc-m2007j20ct-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-6-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/a1981f054f980e183cb23ff39799bd37ac983ae4_1618634826.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(622, 'گوشی موبایل سامسونگ مدل  Galaxy Note10 Lite SM-N770F/DS', '/product/dkp-2495015/گوشی-موبایل-سامسونگ-مدل-galaxy-note10-lite-sm-n770fds-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/119439246.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(623, 'گوشی موبایل سامسونگ مدل Galaxy S20 Plus 5G SM-G986B/DS ', '/product/dkp-3351315/گوشی-موبایل-سامسونگ-مدل-galaxy-s20-plus-5g-sm-g986bds-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/5e77a08742b4dfbc6832c3d9b058635c2fc011ee_1599391974.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(624, 'گوشی موبایل سامسونگ مدل Galaxy A02 SM-A022F/DS دو سیم ک', '/product/dkp-4702881/گوشی-موبایل-سامسونگ-مدل-galaxy-a02-sm-a022fds-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-3-گیگابایت-clone-1-of-4453371', 'https://dkstatics-public.digikala.com/digikala-products/065fce9cf6dbed1da15bebbda4d8b4e2a9d5ae42_1615615792.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(625, 'گوشی موبایل سامسونگ مدل  Galaxy S20 Ultra 5G SM-G988B/D', '/product/dkp-2922605/گوشی-موبایل-سامسونگ-مدل-galaxy-s20-ultra-5g-sm-g988bds-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/121614556.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(626, 'گوشی موبایل شیائومی مدل Mi 10 5G M2001J2G تک سیم‌ کارت ', '/product/dkp-3320722/گوشی-موبایل-شیائومی-مدل-mi-10-5g-m2001j2g-تک-سیم-کارت-ظرفیت-256-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/8fbd7325f2e24b3031258db57fa89b33bff64324_1598879322.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(627, 'گوشی موبایل سامسونگ مدل Galaxy A01 Core SM-A013G/DS دو ', '/product/dkp-4194752/گوشی-موبایل-سامسونگ-مدل-galaxy-a01-core-sm-a013gds-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/d0287df2f6aa331ed66926d9d30684ad1ca018ab_1610188511.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(628, 'گوشی موبایل سامسونگ مدل Galaxy A31 SM-A315F/DS دو سیم ک', '/product/dkp-3579600/گوشی-موبایل-سامسونگ-مدل-galaxy-a31-sm-a315fds-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/cacf0cea8b8ada23d2f0e87dfded3bd5ba2b8ab5_1603112724.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(629, 'گوشی موبایل سامسونگ مدل Galaxy S21 Ultra 5G SM-G998B/DS', '/product/dkp-4243657/گوشی-موبایل-سامسونگ-مدل-galaxy-s21-ultra-5g-sm-g998bds-دو-سیم-کارت-ظرفیت-512-گیگابایت-و-رم-16-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/62c8a2c6d57dce6efbde8bbd348490c2f10a55e1_1610788061.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(630, 'گوشی موبایل نوکیا مدل 3.4 دو سیم کارت ظرفیت 64 گیگابایت', '/product/dkp-4713303/گوشی-موبایل-نوکیا-مدل-34-دو-سیم-کارت-ظرفیت-32-گیگابایت-و-رم-3-گیگابایت-clone-1-of-4675320', 'https://dkstatics-public.digikala.com/digikala-products/7de1c965e925d0a5cf77d3baffff23405433f06d_1615704813.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(631, 'گوشی موبایل سامسونگ مدل Galaxy S21 Plus 5G SM-G996B/DS ', '/product/dkp-4584694/گوشی-موبایل-سامسونگ-مدل-galaxy-s21-plus-5g-sm-g996bds-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-8-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(632, 'گوشی موبایل نوکیا مدل G10 TA-1334 دو سیم کارت ظرفیت 64 ', '/product/dkp-5195673/گوشی-موبایل-نوکیا-مدل-g10-ta-1334-دو-سیم-کارت-ظرفیت-64-گیگابایت-همراه-با-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/618d6fa52e8004c81c822c87222e7c1fbd0b4b1b_1621318582.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(633, 'گوشی موبایل آنر مدل 9X STK-LX1 دوسیم کارت ظرفیت 128 گیگ', '/product/dkp-2275774/گوشی-موبایل-آنر-مدل-9x-stk-lx1-دوسیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/120301366.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(634, 'گوشی موبایل سامسونگ مدل Galaxy A51 SM-A515F/DSN دو سیم ', '/product/dkp-4175973/گوشی-موبایل-سامسونگ-مدل-galaxy-a51-sm-a515fdsn-دو-سیم-کارت-ظرفیت-256گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/b94fc21a67b4e43a4b4c7539129ee4b45303c71b_1609922105.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(635, 'گوشی موبایل نوکیا مدل C1 TA-1165 دوسیم کارت ظرفیت 16 گی', '/product/dkp-2478080/گوشی-موبایل-نوکیا-مدل-c1-ta-1165-دوسیم-کارت-ظرفیت-16-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/119346965.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(636, 'گوشی موبایل سامسونگ مدل Galaxy S21 5G SM-G991B/DS دو سی', '/product/dkp-5244179/گوشی-موبایل-سامسونگ-مدل-galaxy-s21-5g-sm-g991bds-دو-سیم-کارت-ظرفیت-256-گیگابایت-و-رم-8-گیگابایت-clone-1-of-4244974', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(637, 'گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت ', '/product/dkp-3556105/گوشی-موبایل-اپل-مدل-iphone-12-a2404-دو-سیم-کارت-ظرفیت-256-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/9f5d8f6583a7289a096a9180ac88708856f4bd8f_1607433888.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(638, 'گوشی موبایل شیائومی مدل Mi A3 M1906F9SH دو سیم‌ کارت ظر', '/product/dkp-2013047/گوشی-موبایل-شیائومی-مدل-mi-a3-m1906f9sh-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/113272308.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(639, 'گوشی موبایل شیائومی مدل Redmi Note 9 M2003J15SG دو سیم‌', '/product/dkp-3106218/گوشی-موبایل-شیائومی-مدل-redmi-note-9-m2003j15sg-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-3-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/f92dfb141480b0800859d266e85063f09f6d3237_1595070099.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(640, 'گوشی موبایل نوکیا مدل Nokia 5.3 TA-1234 DS دو سیم کارت ', '/product/dkp-4245483/گوشی-موبایل-نوکیا-مدل-nokia-53-ta-1234-ds-دو-سیم-کارت-ظرفیت-64-گیگابایت-و-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/562ccfcb0a0bd3e18def9bd813b1af8e427a9512_1610799961.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(641, 'گوشی موبایل سامسونگ مدل Galaxy S21 5G SM-G991B/DS دو سی', '/product/dkp-4244974/گوشی-موبایل-سامسونگ-مدل-galaxy-s21-5g-sm-g991bds-دو-سیم-کارت-ظرفیت-256-گیگابایت-و-رم-8-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/9f6193556cd48d99da708db5082ec2526a5bc79e_1610794028.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(642, 'گوشی موبایل سامسونگ مدل  A52 SM-A525F/DS دو سیم‌کارت ظر', '/product/dkp-4833369/گوشی-موبایل-سامسونگ-مدل-a52-sm-a525fds-دو-سیمکارت-ظرفیت-256-گیگابایت-و-رم-8-گیگابایت', 'https://www.digikala.com/static/files/921c1a32.svg', 0, 1, '1623343248805'),
(643, 'گوشی موبایل نوکیا مدل Nokia 5.4 TA-1325 دو سیم کارت ظرف', '/product/dkp-4928673/گوشی-موبایل-نوکیا-مدل-nokia-54-ta-1325-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-4-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/e2e5a5039589b3d80db822baec9009c4bbd74733_1618659121.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(644, 'گوشی موبایل ال جی مدل Velvet LM-G910EMW ظرفیت 128 گیگاب', '/product/dkp-4402474/گوشی-موبایل-ال-جی-مدل-velvet-lm-g910emw-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/5530c98af79ddb5fa356bee60ff2cbba260663f4_1612608674.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(645, 'گوشی موبایل آنر مدل 10 Lite HRY-LX1 دو سیم کارت ظرفیت 1', '/product/dkp-2343192/گوشی-موبایل-آنر-مدل-10-lite-hry-lx1-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/115076713.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(646, 'گوشی موبایل وان پلاس مدل NORD N10 5G BE2029 دو سیم‌کارت', '/product/dkp-4935058/گوشی-موبایل-وان-پلاس-مدل-nord-n10-5g-be2029-دو-سیمکارت-ظرفیت-128-گیگابایت-و-رم-6-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/b9b7903a9a8d5ce39de827b44d3a45033859efbc_1618730250.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805'),
(647, 'گوشی موبایل نوکیا مدل 2018  106 دو سیم‌ کارت', '/product/dkp-2261669/گوشی-موبایل-نوکیا-مدل-2018-106-دو-سیم-کارت', 'https://dkstatics-public.digikala.com/digikala-products/114632776.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90', 0, 1, '1623343248805'),
(648, 'گوشی موبایل ریلمی مدل 8PRO RMX3081 دو سیم کارت ظرفیت 12', '/product/dkp-4965489/گوشی-موبایل-ریلمی-مدل-8pro-rmx3081-دو-سیم-کارت-ظرفیت-128-گیگابایت-و-رم-8-گیگابایت', 'https://dkstatics-public.digikala.com/digikala-products/b37eac09857144525448f80f866302c217fe8ead_1618998078.jpg?x-oss-process=image/resize,m_lfit,h_600,w_6', 0, 1, '1623343248805');

-- --------------------------------------------------------

--
-- Table structure for table `selectors`
--

CREATE TABLE `selectors` (
  `id` int(11) NOT NULL,
  `site_id` int(5) NOT NULL,
  `main_selector` varchar(105) COLLATE utf8_unicode_ci NOT NULL,
  `title_selector` varchar(105) COLLATE utf8_unicode_ci NOT NULL,
  `href_selector` varchar(105) COLLATE utf8_unicode_ci NOT NULL,
  `img_selector` varchar(105) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `selectors`
--

INSERT INTO `selectors` (`id`, `site_id`, `main_selector`, `title_selector`, `href_selector`, `img_selector`) VALUES
(1, 1, 'ul.c-listing__items.js-plp-products-list > li > .c-product-box', 'data-title-fa', 'a.js-product-url', 'img');

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(155) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `name`, `url`) VALUES
(1, 'digikala', 'https://www.digikala.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selectors`
--
ALTER TABLE `selectors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=649;

--
-- AUTO_INCREMENT for table `selectors`
--
ALTER TABLE `selectors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
