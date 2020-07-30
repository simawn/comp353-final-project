-- RUNNING THIS SCRIPT RESETS THE DATABASE

-- Before running this script ensure to replace the statement below with your schema name
USE <SCEHMA TO BE USED>;

-- --------------------------------------------------
-- Drop all previous tables (ORDER MATTERS)
-- --------------------------------------------------

DROP TABLE IF EXISTS `Applicant`;
DROP TABLE IF EXISTS `Job`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `CreditCard`;
DROP TABLE IF EXISTS `PaymentMethod`;
DROP TABLE IF EXISTS `Employer`;
DROP TABLE IF EXISTS `Employee`;
DROP TABLE IF EXISTS `Admin`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Subscription`;

-- --------------------------------------------------
-- Create all tables (ORDER MATTERS)
-- --------------------------------------------------

CREATE TABLE `Subscription`(
  `subscriptionID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `limit` INT,
  `cost` DECIMAL,
  PRIMARY KEY (`subscriptionID`)
);

CREATE TABLE `User`(
  `userName` VARCHAR(255) NOT NULL,
  `subscriptionID` INT NOT NULL,
  `password` VARCHAR(255),
  `email` VARCHAR(255),
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `isAdmin` BOOLEAN,
  `balance` DECIMAL,
  `suffering` BOOLEAN,
  `active` BOOLEAN,
  `lastPayment` DATE,
  PRIMARY KEY (`userName`),
  FOREIGN KEY (`subscriptionID`) REFERENCES `Subscription`(`subscriptionID`)
);

CREATE TABLE `Employer`(
  `employerID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employerID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Employee`(
  `employeeID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employeeID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `CreditCard`(
  `creditCardNumber` VARCHAR(255) NOT NULL,
  `expirationDate` VARCHAR(255),
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
  `employerID` INT NOT NULL,
  `categoryName` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255),
  `datePosted` DATE,
  `description` VARCHAR(255), -- MORE THAN 255?
  `employeesNeeded` INT,
  PRIMARY KEY (`jobID`),
  FOREIGN KEY (`employerID`) REFERENCES `Employer`(`employerID`),
  FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`)
);

CREATE TABLE `Applicant`(
  `employeeID` INT NOT NULL,
  `jobID` INT NOT NULL,
  `status` ENUM('pending', 'rejected', 'hired', 'withdrawn'),
  PRIMARY KEY (`employeeID`, `jobID`),
  FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`employeeID`),
  FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`)
);
