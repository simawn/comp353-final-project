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
  `subscriptionID` VARCHAR(255),
  -- ADD ATTRIBUTES: s
  PRIMARY KEY (`subscriptionID`)
);

CREATE TABLE `User`(
  `userName` VARCHAR(255),
  `subscriptionID` VARCHAR(255),
  -- ADD ATTRIBUTES: u
  PRIMARY KEY (`userName`),
  FOREIGN KEY (`subscriptionID`) REFERENCES `Subscription`(`subscriptionID`)
);

CREATE TABLE `Admin`(
  `adminID` VARCHAR(255),
  `userName` VARCHAR(255),
  PRIMARY KEY (`adminID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Employee`(
  `employeeID` VARCHAR(255),
  `userName` VARCHAR(255),
  -- ADD ATTRIBUTES: e
  PRIMARY KEY (`employeeID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Employer`(
  `employerID` VARCHAR(255),
  `userName` VARCHAR(255),
  -- ADD ATTRIBUTES: r
  PRIMARY KEY (`employerID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Payment`(
  `paymentID` VARCHAR(255),
  `userName` VARCHAR(255),
  -- ADD ATTRIBUTES: a (credit card) and b (bank account)
  PRIMARY KEY (`paymentID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`)
);

CREATE TABLE `Category`(
  `categoryName` VARCHAR(255),
  -- ADD ATTRIBUTES: c
  PRIMARY KEY (`categoryName`)
);

CREATE TABLE `Job`(
  `jobID` VARCHAR(255),
  `employerID` VARCHAR(255),
  `categoryName` VARCHAR(255),
  -- ADD ATTRIBUTES: j
  PRIMARY KEY (`jobID`),
  FOREIGN KEY (`employerID`) REFERENCES `Employer`(`employerID`),
  FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`)
);

CREATE TABLE `Application`(
  `employeeID` VARCHAR(255),
  `jobID` VARCHAR(255),
  -- ADD ATTRIBUTES: x
  PRIMARY KEY (`employeeID`, `jobID`),
  FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`employeeID`),
  FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`)
);
