-- RUNNING THIS SCRIPT RESETS THE DATABASE

-- Before running this script ensure to replace the statement below with your schema name
USE <SCEHMA TO BE USED>;

-- --------------------------------------------------
-- Drop all previous tables (ORDER MATTERS)
-- --------------------------------------------------

DROP TABLE IF EXISTS `Application`;
DROP TABLE IF EXISTS `Job`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Payment`;
DROP TABLE IF EXISTS `Employer`;
DROP TABLE IF EXISTS `Employee`;
DROP TABLE IF EXISTS `Admin`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Subscription`;

-- --------------------------------------------------
-- Create all tables (ORDER MATTERS)
-- --------------------------------------------------

CREATE TABLE `Subscription`(
  `subscriptionID` VARCHAR(255) NOT NULL,
  -- ADD ATTRIBUTES: s
  `limit` INT,
  `cost` INT,
  PRIMARY KEY (`subscriptionID`)
);

CREATE TABLE `User`(
  `userName` VARCHAR(255) NOT NULL,
  `subscriptionID` VARCHAR(255) NOT NULL,
  -- ADD ATTRIBUTES: u

  PRIMARY KEY (`userName`),
  FOREIGN KEY (`subscriptionID`) REFERENCES `Subscription`(`subscriptionID`)
);

CREATE TABLE `Admin`(
  `adminID` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`adminID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Employee`(
  `employeeID` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employeeID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Employer`(
  `employerID` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employerID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Payment`(
  `paymentID` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(255) NOT NULL,
  -- ADD ATTRIBUTES: a (credit card)
  `creditCardNumber` VARCHAR(255),
  `expirationDate` VARCHAR(255),
  `cvv` VARCHAR(255),
   -- ADD ATTRIBUTES: b (bank account)
  `accountNumber` VARCHAR(255),
  `Bank` VARCHAR(255),
  PRIMARY KEY (`paymentID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Category`(
  `categoryName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`categoryName`)
);

CREATE TABLE `Job`(
  `jobID` VARCHAR(255) NOT NULL,
  `employerID` VARCHAR(255) NOT NULL,
  `categoryName` VARCHAR(255),
  -- ADD ATTRIBUTES: j
  `title` VARCHAR(255),
  `datePosted` DATE,
  `description` VARCHAR(255), -- MORE THAN 255?
  `employeeNeeded` INT,
  PRIMARY KEY (`jobID`),
  FOREIGN KEY (`employerID`) REFERENCES `Employer`(`employerID`),
  FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`)
);

CREATE TABLE `Application`(
  `employeeID` VARCHAR(255) NOT NULL,
  `jobID` VARCHAR(255) NOT NULL,
  -- ADD ATTRIBUTES: x
  `status` ENUM('pending', 'rejected', 'hired', 'withdrawn'),
  PRIMARY KEY (`employeeID`, `jobID`),
  FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`employeeID`),
  FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`)
);
