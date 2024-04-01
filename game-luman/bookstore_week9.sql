-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 08, 2024 at 12:58 PM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: bookstore
--

-- --------------------------------------------------------

--
-- Table structure for table authors
--

CREATE TABLE authors (
  id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table authors
--

INSERT INTO authors (id, name, email, created_at, updated_at) VALUES
(1, 'John Smith', 'john.smith@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(2, 'Jane Doe', 'jane.doe@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(3, 'Bob Johnson', 'bob.johnson@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(4, 'Lisa Davis', 'lisa.davis@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(5, 'Mike Brown', 'mike.brown@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(6, 'Karen Lee', 'karen.lee@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(7, 'David Kim', 'david.kim@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(8, 'Amy Nguyen', 'amy.nguyen@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(9, 'Chris Hernandez', 'chris.hernandez@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32'),
(10, 'Melissa Martinez', 'melissa.martinez@example.com', '2024-03-08 12:57:32', '2024-03-08 12:57:32');

-- --------------------------------------------------------

--
-- Table structure for table books
--

CREATE TABLE books (
  id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  author_id int(11) NOT NULL,
  published_date date NOT NULL,
  book_image varchar(125) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table books
--

INSERT INTO books (id, title, author_id, published_date, book_image, created_at, updated_at) VALUES
(1, 'The Great Gatsby', 1, '1925-04-10', 'gatsby.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(2, 'To Kill a Mockingbird', 2, '1960-07-11', 'mockingbird.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(3, '1984', 3, '1949-06-08', '1984_book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(4, 'Pride and Prejudice', 4, '1813-01-28', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(5, 'The Catcher in the Rye', 5, '1951-07-16', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(6, 'The Hobbit', 6, '1937-09-21', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(7, 'The Lord of the Rings', 6, '1954-07-29', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(8, 'Animal Farm', 3, '1945-08-17', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(9, 'Fahrenheit 451', 7, '1953-10-19', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(10, 'Brave New World', 3, '1932-01-01', 'book.jpg', '2024-03-07 21:20:36', '2024-03-07 21:20:36'),
(12, 'bbbbbb', 2, '2023-02-03', 'test.jpg', '2024-03-07 21:27:44', '2024-03-07 21:37:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table authors
--
ALTER TABLE authors
  ADD PRIMARY KEY (id);

--
-- Indexes for table books
--
ALTER TABLE books
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table authors
--
ALTER TABLE authors
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table books
--
ALTER TABLE books
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
