-- ======================================
-- USER SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_user_db;
USE projectb_user_db;

-- Buat struktur tabel users di sini...
-- INSERT data users di sini...
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_number` varchar(20) NOT NULL,
  `balance` decimal(15,2) DEFAULT 0.00,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `account_number`, `balance`, `created_at`) VALUES
(1, 'Alya Updated', 'alya_updated@example.com', 'updated', '8801234567', 0.00, '2025-06-14 23:13:32'),
(2, 'Budi', 'budi@mail.com', 'hashedpassword2', '8801234568', 785005.00, '2025-06-14 23:13:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `account_number` (`account_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

-- ======================================
-- TOPUP SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_topup_db;
USE projectb_topup_db;

-- Buat struktur tabel topups di sini...
-- INSERT data topups di sini...
CREATE TABLE `topups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `payment_method` varchar(30) DEFAULT NULL,
  `status` enum('success','failed') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topups`
--

INSERT INTO `topups` (`id`, `user_id`, `amount`, `payment_method`, `status`, `created_at`) VALUES
(1, 1, 150000.00, 'mandiri', 'success', '2025-06-14 23:15:49'),
(2, 2, 250000.00, 'OVO', 'success', '2025-06-14 23:15:49'),
(3, 2, 200000.00, 'OVO', 'success', '2025-06-14 23:23:06'),
(4, 2, 250000.00, 'BNI', 'success', '2025-06-14 23:23:57'),
(5, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:53'),
(6, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:55'),
(7, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:57'),
(8, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:57'),
(9, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:57'),
(10, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:58'),
(11, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:58'),
(12, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:58'),
(13, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:58'),
(14, 2, 100000.00, 'bni', 'success', '2025-06-15 00:47:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `topups`
--
ALTER TABLE `topups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `topups`
--
ALTER TABLE `topups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;
-- ======================================
-- TRANSACTION SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_transaction_db;
USE projectb_transaction_db;

-- Buat struktur tabel transactions di sini...
-- INSERT data transactions di sini...
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `note` text DEFAULT NULL,
  `status` enum('success','failed') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `sender_id`, `recipient_id`, `amount`, `note`, `status`, `created_at`) VALUES
(1, 1, 2, 50000.00, 'Diperbarui: bayar makan', 'success', '2025-06-14 23:26:15'),
(2, 1, 2, 50000.00, 'Bayar utang', 'success', '2025-06-14 23:28:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
-- ======================================
-- TRANSFER VALAS SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_valas_db;
USE projectb_valas_db;

-- Buat struktur tabel valas_transfers di sini...
-- INSERT data valas_transfers di sini...
CREATE TABLE `transfer_valas` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `account_number` varchar(30) NOT NULL,
  `recipient_bank` varchar(50) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `exchange_rate` decimal(10,2) NOT NULL,
  `amount_idr` decimal(15,2) NOT NULL,
  `amount_valas` decimal(15,2) NOT NULL,
  `status` enum('success','failed') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfer_valas`
--

INSERT INTO `transfer_valas` (`id`, `user_id`, `account_number`, `recipient_bank`, `currency`, `exchange_rate`, `amount_idr`, `amount_valas`, `status`, `created_at`) VALUES
(1, 1, 'SG123456789', 'Updated Bank', 'SGD', 11500.00, 230000.00, 20.00, 'success', '2025-06-14 23:31:39'),
(2, 2, 'US987654321', 'HSBC International', 'USD', 15500.00, 310000.00, 20.00, 'success', '2025-06-14 23:31:39'),
(3, 1, 'MY556677889', 'Maybank Malaysia', 'MYR', 3300.00, 66000.00, 20.00, 'failed', '2025-06-14 23:31:39'),
(4, 1, '8801234567', 'OCBC Singapore', 'SGD', 11500.00, 200000.00, 17.39, 'failed', '2025-06-14 23:37:15'),
(5, 1, '8801234567', 'OCBC Singapore', 'SGD', 11500.00, 200000.00, 17.39, 'failed', '2025-06-14 23:37:34'),
(6, 2, '8801234568', 'OCBC Singapore', 'SGD', 11500.00, 200000.00, 17.39, 'success', '2025-06-14 23:38:17'),
(7, 2, '8801234568', 'OCBC Singapore', 'SGD', 11500.00, 200000.00, 17.39, 'success', '2025-06-14 23:38:36'),
(8, 1, '8801234568', 'OCBC', 'SGD', 11500.00, 230000.00, 20.00, 'failed', '2025-06-15 01:16:02'),
(9, 2, '8801234568', 'OCBC', 'SGD', 11500.00, 230000.00, 20.00, 'success', '2025-06-15 01:16:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transfer_valas`
--
ALTER TABLE `transfer_valas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transfer_valas`
--
ALTER TABLE `transfer_valas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;
-- ======================================
-- TAGIHAN SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_bill_db;
USE projectb_bill_db;

-- Buat struktur tabel tagihans di sini...
-- INSERT data tagihans di sini...
CREATE TABLE `tagihans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `va_number` varchar(20) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','paid') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tagihans`
--

INSERT INTO `tagihans` (`id`, `user_id`, `va_number`, `amount`, `description`, `status`, `created_at`) VALUES
(1, 1, 'VA100001', 50000.00, 'Pajak Bulanan', 'paid', '2025-06-14 23:41:18'),
(2, 2, 'VA100002', 75000.00, 'Iuran Warga', 'pending', '2025-06-14 23:41:18'),
(3, 2, 'VA2561716', 75000.00, 'Iuran Bulanan Komunitas', 'pending', '2025-06-14 23:47:09'),
(4, 1, 'VA1414831', 50000.00, 'Pajak Bulanan', 'pending', '2025-06-14 23:47:52'),
(5, 2, 'VA2584241', 50000.00, 'Pajak Bulanan', 'pending', '2025-06-14 23:47:52'),
(6, 1, 'VA1215996', 50000.00, 'Pajak Bulanan', 'pending', '2025-06-14 23:50:30'),
(7, 2, 'VA2582529', 50000.00, 'Pajak Bulanan', 'pending', '2025-06-14 23:50:30'),
(8, 1, 'VA1210273', 50000.00, 'Pajak Bulanan', 'pending', '2025-06-14 23:50:48'),
(9, 2, 'VA2601482', 50000.00, 'Pajak Bulanan', 'paid', '2025-06-14 23:50:48'),
(11, 2, 'VA2484893', 10000.00, 'pungli', 'paid', '2025-06-14 23:54:58'),
(12, 2, 'VA2388783', 120000.00, 'Tagihan Air Bulan Juni', 'pending', '2025-06-15 01:24:36'),
(13, 1, 'VA1204097', 55000.00, 'Iuran Kebersihan', 'pending', '2025-06-15 01:24:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tagihans`
--
ALTER TABLE `tagihans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `va_number` (`va_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tagihans`
--
ALTER TABLE `tagihans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;
-- ======================================
-- PAYMENT SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_payment_db;
USE projectb_payment_db;

-- Buat struktur tabel payments di sini...
-- INSERT data payments di sini...
CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `va_number` varchar(20) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('success','failed') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `va_number`, `amount`, `description`, `status`, `created_at`) VALUES
(1, 1, 'VA100001', 50000.00, 'Pembayaran tagihan bulan Juni', 'success', '2025-06-15 00:00:07'),
(3, 2, 'VA2484893', 10000.00, 'pungli', 'success', '2025-06-15 00:06:22'),
(4, 2, 'VA2601482', 50000.00, 'Diperbarui oleh admin', 'success', '2025-06-15 01:32:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `va_number` (`va_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;
-- ======================================
-- DONATION SERVICE
-- ======================================
CREATE DATABASE IF NOT EXISTS projectb_donation_db;
USE projectb_donation_db;

-- Buat struktur tabel donations di sini...
-- INSERT data donations di sini...
CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`donation_id`, `user_id`, `amount`, `description`, `created_at`) VALUES
(1, 1, 10000.00, 'Update deskripsi donasi', '2025-06-14 17:13:06'),
(2, 2, 15000.00, 'Donasi kesehatan', '2025-06-14 17:13:06'),
(3, 2, 10000.00, 'Donasi bantuan bencana', '2025-06-14 17:21:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
