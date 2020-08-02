-- RUNNING THIS SCRIPT RESETS THE DATABASE

USE jxc353_1;

-- --------------------------------------------------
-- Drop all previous tables (ORDER MATTERS)
-- --------------------------------------------------

DROP TABLE IF EXISTS `Applicant`;
DROP TABLE IF EXISTS `PaymentMethod`;
DROP TABLE IF EXISTS `CreditCard`;
DROP TABLE IF EXISTS `Admin`;
DROP TABLE IF EXISTS `Job`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Subscription`;

-- --------------------------------------------------
-- Create all tables (ORDER MATTERS)
-- --------------------------------------------------

CREATE TABLE `Subscription`(
  `subscriptionID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `limit` INT,
  `cost` DECIMAL(19, 4),
  PRIMARY KEY (`subscriptionID`)
);

CREATE TABLE `User`(
  `userName` VARCHAR(255) NOT NULL,
  `subscriptionID` INT NOT NULL,
  `password` VARCHAR(255),
  `email` VARCHAR(255),
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `balance` DECIMAL(19, 4),
  `suffering` BOOLEAN,
  `active` BOOLEAN,
  `lastPayment` DATE,
  `role` ENUM('employer', 'employee', 'admin'),
  PRIMARY KEY (`userName`),
  FOREIGN KEY (`subscriptionID`) REFERENCES `Subscription`(`subscriptionID`)
);

CREATE TABLE `CreditCard`(
  `creditCardNumber` VARCHAR(255) NOT NULL,
  `expirationDate` DATE,
  `cvv` INT,  
  PRIMARY KEY (`creditCardNumber`)
);

CREATE TABLE `PaymentMethod`(
  `paymentID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `creditCardNumber` VARCHAR(255),
  `accountNumber` VARCHAR(255),
  PRIMARY KEY (`paymentID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`),
  FOREIGN KEY (`creditCardNumber`) REFERENCES `CreditCard`(`creditCardNumber`)
);

CREATE TABLE `Category`(
  `categoryName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`categoryName`)
);

CREATE TABLE `Job`(
  `jobID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `categoryName` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255),
  `datePosted` DATE,
  `description` VARCHAR(255),
  `employeesNeeded` INT,
  PRIMARY KEY (`jobID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`),
  FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`)
);

CREATE TABLE `Applicant`(
  `userName` VARCHAR(255) NOT NULL,
  `jobID` INT NOT NULL,
  `status` ENUM('pending', 'rejected', 'hired', 'withdrawn', 'offer'),
  PRIMARY KEY (`userName`, `jobID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`),
  FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`)
);
