# COMP 353 Main Project

|    Student Name     | Student # |
| :-----------------: | :-------: |
|   Sean Heinrichs    | 40075789  |
|     Simon Huang     | 27067380  |
|     Shuo Zhang      | 40103576  |
| Pierre-André Gagnon | 40067198  |

## Deliverables

### PART 1 - Contributions

- Sean Heinrichs
- Simon Huang
- Shuo Zhang
- Pierre-André Gagnon: E/R design, relational schema normalization, multiple queries/transactions...

### PART 2 - Conceptual Design and E/R Diagram

Since we were provided with the minimum requirements, we had to assume certain elements of the design. Moreover, some details had to be changed to fit these assumptions. In this section, all thes assumptions and changes will be listed.

#### Assumptions about Requirements

- A job must have exacly one job category.
- A job application can have one of 5 status: `pending`, `rejected`, `hired`, `withdrawn`, `offer`.
- An employer can only send a job offer and reject a job application when it is on `pending`.
- A job offer can only be accepted/denied by an employee if the job application is on `offer`.
- The applied job maximum only consider applications that are `pending` and `offer`.
- Each user can have only one active payment method which is either automatic of manual.
- A manual payment can only be done when the user account is frozen by a negative balance.

#### Changes to Requirements

- The requirements asked for "Create/Delete/Edit/Display a category by an Employer. Since this entered in conflict with our assumption that a job offer must have exaclty one job category and it could have lead to issues about job category ownership, we only included the option create job categories.
- Instead of keeping track of the date when an account started to be suffering, we decided to keep track of the date of the last payment since it was more useful.

#### E/R Diagram

**E/R Diagrams can be found attached at the end of this document.**

Based on the analysis of the modified requirements, we came up with an E/R Diagram containing the following elements and their respective constraints (not that a ^ is used to used to note referential integrity):
- Entity Sets:
  - `User`
  - `Job`
  - `Category`
  - `PaymentMethod`
  - `Subscription`
  - `CreditCard`
- Relationships:
  - `Applicant`: many-to-many between `User` and `Job`
    - Each user may apply to many jobs and each job can be applied to by many users.
  - `Offering`: many-to-one^ between `Job` and `User`
    - Each job must be offered by exactly one user and a user can offer many jobs.
  - `JobCategory`: many-to-one^ between `Job` and `Category`
    - Each job must be in exactly one category and one category can have many jobs.
  - `UserSubscription`: many-to-one^ between `User` and `Subscription`
    - Each user must have exactly one subscription and one subscription can have many users.
  - `UserPaymentMethod`: between many-to-one^ `PaymentMethod` and `User`
    - Each payment method must belong to exactly one user and a user can have many payment methods.
  - `IsCreditCard`: one-to-one^ between `CreditCard` and `PaymentMethod`
    - Each credit card must belong to exactly one payment method and one payment method might have one credit card. 

There are some constraints that could not be captured by the E/R diagram.
- The number of jobs a user can register to is limited by her/his subscription. However, since each subscription has a different limit, it cannot be included in the diagram.
- Each user can only have one active payment method.

The functional dependencies will be listed in the next part after the the E/R diagram as been transformed into a relational schema.

### PART 3 - Database Relational Schema and Normalization

**Relational schema diagram can be found attached at the end of this document.**

#### E/R Diagram to Relational Schema conversions

The transformation is straightforward since we have only one many-to-many relationships. Obviously, each entity set becomes a relation. The relationships are converted as follow:
- `Applicant`: since it is many-to-many, we need a new relation with `userName` and `jobID` as primary and foreign keys.
- `Offering`: since it is many-to-one, we can add a `userName` foreign key in `Job`.
- `JobCategory`: since it is many-to-one, we can add a `categoryName` foreign key in `Job`.
- `UserSubscription`: since it is many-to-one, we can add a `subscriptionID` foreigh key in `User`.
- `UserPaymentMethod`: since it is many-to-one, we can add a `userName` foreign key in `PaymentMethod`.
- `IsCreditCard`: since it is one-to-one, we could add a foreign in either relations, but since there is referential integrity on `PaymentMethod`, we added `creditCardNumber` on `PaymentMethod`.

#### Relational Schema

After the conversion we add the following relations:
- `User(userName,password,email,firstName,lastName,balance,payswithManual,active,lastPayment,role)`
  - Primary key: `userName`
  - Foreign key: `subscriptionID` from `Subscription`
- `Job(jobID,userName,categoryName,title,datePosted,description,employeeNeeded)`
  - Primary key: `jobID`
  - Foreign key: `userName` from `User`
  - Foreigh key: `categoryName` from `Category`
- `Category(categoryName)`
  - Primary key: `categoryName`
- `PaymentMethod(paymentID,userName,creditCardNumber,accountNumber,active)`
  - Primary key: `paymentID`
  - Foreign key: `userName` from `User`
  - Foreign key: `creditCardNumber` from `CreditCard`
- `Subscription(subscriptionID,name,limit,cost)`
  - Primary key: `subscriptionID`
- `CreditCard(creditCardNumber,expirationDate,cvv)`
  - Primary key: `creditCardNumber`
- `Applicant(userName,jobID,status,applicationDate)`
  - Foreign keys: `userName`, `jobID`
  - Foreign key: `userName` from `User`
  - Foreign key: `jobID` from `Job`

The other constraints can be found on the relational schema diagram.

#### Normalization

With the conversion from E/R diagram to a relational schema, we already had a decomposition thats looked promising. To make sure it was, we only had to test that is was 3NF, lossless and dependency preserving.

To simplify the proofs, we combined attributes that had the same dependencies. What is left is:

Variable|Attributes|
-|-
`S`|`subscriptionID`
`s`|other `Subscription` attributes
`U`|`userName`
`u`|other `User` attributes
`R`|`creditCardNumber`
`r`|other `CreditCard` attributes
`P`|`paymentID`
`b`|`accountNumber`
`C`|`categoryName`
`J`|`jobID`
`j`|other `Job` attributes
`a`|other `Applicant` attributes

Using these variables, the decomposition and the functional dependencies can be expressed as follow:

Relation|Functional Dependencies
-|-
`Ss`|`S->s`
`USu`|`U->uS`
`Rr`|`R->r`
`PbRU`|`P->URb`
`JjCU`|`J->UCj`
`JUa`|`JU->a`
`PJ`|

#### Lossless

Table initialization
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α||α|α|||||||| 
`Rr`|||||α|α||||||
`PbR`|||||α||α|α||||
`JjCU`|||α||||||α|α|α|	
`JUa`|||α||||||α|||α
`PJ`|||||||α||α|||

Round 1: `S->s`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|+α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|||α||α||α|α||||
`JjCU`|||α||||||α|α|α|
`JUa`|||α||||||α|||α
`PJ`|||||||α||α|||

Round 1: `U->uS`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|+α||α|+α|α||α|α||||
`JjCU`|+α||α|+α|||||α|α|α|	
`JUa`|+α||α|+α|||||α|||α
`PJ`|||||||α||α|||


Round 1: `R->r`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α||α|α|α|+α|α|α||||
`JjCU`|α||α|α|||||α|α|α|	
`JUa`|α||α|α|||||α|||α
`PJ`|||||||α||α|||

Round 1: `P->URb`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α||α|α|α|α|α|α||||
`JjCU`|α||α|α|||||α|α|α|	
`JUa`|α||α|α|||||α|||α
`PJ`|||+α||+α||α|+α|α|||

Round 1: `J->UCj`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α||α|α|α|α|α|α||||
`JjCU`|α||α|α|||||α|α|α|	
`JUa`|α||α|α|||||α|+α|+α|α
`PJ`|||α||α||α|α|α|+α|+α|

Round 1: `JU->a`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α||α|α|α|α|α|α||||
`JjCU`|α||α|α|||||α|α|α|+α
`JUa`|α||α|α|||||α|α|α|α
`PJ`|||α||α||α|α|α|α|α|+α

Round 2: `S->s`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|+α|α|α|α|α|α|α||||
`JjCU`|α|+α|α|α|||||α|α|α|α
`JUa`|α|+α|α|α|||||α|α|α|α
`PJ`|||α||α||α|α|α|α|α|α

Round 2: `U->uS`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|+α||α|+α|α||α|α|α|α|α|α

Round 2: `R->r`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|α||α|α|α|+α|α|α|α|α|α|α

Round 2: `R->r`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|α||α|α|α|+α|α|α|α|α|α|α

Round 2: `P->URb`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|α||α|α|α|α|α|α|α|α|α|α

Round 2: `J->UCj`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|α||α|α|α|α|α|α|α|α|α|α

Round 2: `JU->a`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|α||α|α|α|α|α|α|α|α|α|α

Round 3: `S->s`
Relation|`S`|`s`|`U`|`u`|`R`|`r`|`P`|`b`|`J`|`j`|`C`|`a`
-|-|-|-|-|-|-|-|-|-|-|-|-
`Ss`|α|α|||||||||| 
`USu`|α|α|α|α|||||||| 
`Rr`|||||α|α||||||
`PbRU`|α|α|α|α|α|α|α|α||||
`JjCU`|α|α|α|α|||||α|α|α|α
`JUa`|α|α|α|α|||||α|α|α|α
`PJ`|α|+α|α|α|α|α|α|α|α|α|α|α

We have a row full of `α`, so it is lossless.

#### Dependency Preserving

There is nothing to check since all the original functional dependencies are present in the decomposition. So they are all preserved.

#### Third Normal Form

Candidate key: `PJ`.
Prime attributes: `P` and `J`.

* Check `S->s` in `Ss`: Ok, since `S` is a key in `Ss`.
* Check `U->uS` in `USu`: Ok, since `U` is a key in `USu`.
* Check `R->r` in `Rr`: Ok, since `R` is a key in `Rr`.
* Check `P->URb` in `PbRU`: Ok, since `P` is a key in `PbRU`.
* Check `J->UCj` in `JjCU`: Ok, since `J` is a key in `JjCU`.
* Check `JU->a` in `JUa`: Ok, since `JU` is a key in `JUa`.

So it is in 3NF.

### PART 4 - SQL Statements to Create or to Reset the Database

```
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

CREATE TABLE `CreditCard`(
  `creditCardNumber` VARCHAR(255) NOT NULL,
  `expirationDate` VARCHAR(5),
  `cvv` INT,  
  PRIMARY KEY (`creditCardNumber`)
);

CREATE TABLE `PaymentMethod`(
  `paymentID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `creditCardNumber` VARCHAR(255),
  `accountNumber` VARCHAR(255),
  `active` BOOL,
  PRIMARY KEY (`paymentID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`) ON DELETE CASCADE,
  FOREIGN KEY (`creditCardNumber`) REFERENCES `CreditCard`(`creditCardNumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `User`(
  `userName` VARCHAR(255) NOT NULL,
  `subscriptionID` INT,
  `password` VARCHAR(255),
  `email` VARCHAR(255),
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `balance` DECIMAL(19, 4),
  `paysWithManual` BOOLEAN,
  `active` BOOLEAN,
  `lastPayment` DATE,
  `role` ENUM('employer', 'employee', 'admin'),
  PRIMARY KEY (`userName`),
  FOREIGN KEY (`subscriptionID`) REFERENCES `Subscription`(`subscriptionID`)
)ENGINE=InnoDB;

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
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`) ON DELETE CASCADE,
  FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`)
) ENGINE=InnoDB;

CREATE TABLE `Applicant`(
  `userName` VARCHAR(255) NOT NULL,
  `jobID` INT NOT NULL,
  `status` ENUM('pending', 'rejected', 'hired', 'withdrawn', 'offer'),
  `appliedDate` DATE,
  PRIMARY KEY (`userName`, `jobID`),
  FOREIGN KEY (`userName`) REFERENCES `User`(`userName`) ON DELETE CASCADE,
  FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`)
) ENGINE=InnoDB;

```

### PART 5 - SQL Statements to Populate the Database with test data 
```
-- RUNNING THIS SCRIPT POPULATES THE DATABASE

USE jxc353_1;

INSERT INTO `Subscription`(`name`, `limit`, cost)
VALUES 
	('Employer Prime Membership', 5, 50.00),
	('Employer Gold Membership', 9999, 100.00),
	('Employee Basic Membership', 0, 0.00),
	('Employee Prime Membership', 5, 10),
	('Employee Gold Membership', 9999, 20)
;

INSERT INTO `User`(userName, subscriptionID, `password`, email, firstName, lastName, `role`, balance, paysWithManual, `active`, lastPayment)
VALUES 
	('LeilaDisney', 3, 'qwer', 'leila_disney@hotmail.com', 'Leila', 'Disney', 'employee', -9.98, 1, 1, '2020-05-07'),
	('HubeKlamman',	2, 'tyui', 'hube_klamman@hotmail.com', 'Hube', 'Klamman', 'employer', 0.00, 0, 1, '2020-07-08'), 				
	('DenBalsdon', 4, 'vcbh', 'den_balsdon@hotmail.com', 'Den', 'Balsdon', 'employee', 0.00, 0, 1, '2020-07-28'),
	('ArabellaAndreutti', 1, 'ghjk', 'arabella_andreutti@gmail.com', 'Arabella', 'Andreutti', 'employer', -19.9, 1, 0, '2020-06-08'),
	('DienaDaniele', 5, 'zxcv', 'diena_daniele@gmail.com', 'Diena',	'Daniele', 'employee', 0.00, 0, 0, '2020-07-21'), 	
	('BabKelsall', 1, 'rewq', 'bab_kelsall@gmail.com', 'Bab', 'Kelsall', 'employer', 0.00, 0, 1, '2020-04-01'), 					
	('MelisseCostley', 3, 'iuyt', 'melisse_costley@gmail.com', 'Melisse', 'Costley', 'employee', -19.99, 1,	0, '2020-04-08'), 	
	('ShelleyGirt', 1, 'fdsa', 'shelley_girt@gmail.com', 'Shelley', 'Girt', 'employer', 0, 0, 1, '2020-06-08'), 					
	('AlexeiAdcocks', 2, 'kjhg', 'alexei_adcocks@yahoo.com', 'Alexei', 'Adcocks', 'employer', 0, 0, 1, '2020-07-15'), 				
	('SanfordGout', 5, 'vcxz', 'sanford_gout@yahoo.com', 'Sanford', 'Gout', 'employee', -99.99, 1, 1, '2020-06-01')	
;     

INSERT INTO `CreditCard` (creditCardNumber, expirationDate, cvv)
VALUES
	('2016335644770111', '05/22', '253'),
	('3742883897292441', '09/22', '638'),
	('5602242629786240', '04/22', '952'),
	('5020956162470040', '11/23', '645'),
	('3547131580418310', '11/23', '067'),
	('3536309143887770', '04/22', '684')
;   

INSERT INTO `PaymentMethod` (userName, creditCardNumber, accountNumber, active)
VALUES 
	('LeilaDisney', NULL, '1001001234', 1),
	('HubeKlamman', '2016335644770111', NULL, 1),
	('DenBalsdon', '3742883897292441', NULL, 1),
	('ArabellaAndreutti', '5602242629786240', NULL, 1),
	('DienaDaniele', NULL, '1001001862', 1),
	('BabKelsall', NULL, '1001001283', 1),
	('MelisseCostley', '5020956162470040', NULL, 1),
	('ShelleyGirt', '3547131580418310', NULL, 1),
	('AlexeiAdcocks', '3536309143887770', NULL, 1),
	('SanfordGout', NULL, '1001001823', 1)
;

INSERT INTO `Category`(categoryName)
VALUES 
  	('Administration'),
 	('Computing'),
 	('Construction'),
 	('Design'),
 	('Education'),
 	('Engineering'),
  	('Finance'),
  	('Legal Services'),
  	('Retail'),
  	('Security')
;
  
INSERT INTO `Job`(userName, categoryName, title, datePosted, `description`, employeesNeeded)
VALUES 
	('HubeKlamman', 'Computing', 'Full Stack Developer', '2020-06-01', 'We work with COBOL!', 3),
  	('ArabellaAndreutti', 'Construction', 'Construction Worker', '2020-07-12', 'We build really cool stuff.', 5),
  	('BabKelsall', 'Design', 'Graphic Designer', '2020-07-14', 'We take commissions and give you bonuses.', 2),
  	('ShelleyGirt', 'Education', 'High School Teacher', '2020-07-14', 'Show the kids how to behave and smack em around.', 1),
  	('AlexeiAdcocks', 'Engineering', 'Senior Mechanical Engineer', '2020-07-20', 'Help us, we are stuck', 1),
  	('AlexeiAdcocks', 'Engineering', 'Chief Mechanical Engineer', '2020-07-20', 'Help us, we are stuck too', 1)
;

INSERT INTO `Applicant` (userName, jobID, `status`, `appliedDate`)
VALUES 
	('LeilaDisney', '1', 'pending', '2020-06-01'),
  	('DenBalsdon', '2', 'rejected', '2020-05-01'),
  	('DienaDaniele', '3', 'withdrawn', '2020-04-01'),
  	('MelisseCostley', '4', 'hired', '2020-03-01'),
  	('SanfordGout', '5', 'pending', '2020-02-01'),
  	('LeilaDisney', '3', 'pending', '2020-01-01');
```
### PART 6 - SQL Statements to Query the Database
```
-- -----------------------------------------------------------------------------------------------------------------
-- i. Create an Employer.
-- -----------------------------------------------------------------------------------------------------------------
  
  SET @givenUserName = 'KevinCarlsen';
  SET @givenSubscriptionID = '3';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'kevin_carlsen@yahoo.com';
  SET @givenFirstName = 'Kevin';
  SET @givenLastName = 'Carlsen';
  SET @givenBalance = '0';
  SET @givenSuffering = '0';
  SET @givenActive = '1';
  SET @givenLastPayment = '2020-07-31'; 
  
  INSERT INTO `User` (userName, `role`, subscriptionID, `password`, email, firstName, lastName, balance, suffering, `active`, lastPayment)
  VALUES
	(@givenUserName, 'employer', @givenSubscriptionID, @givenPassword, @givenEmail, @givenFirstName, @givenLastName,
	@givenBalance, @givenSuffering, @givenActive, @givenLastPayment); 

-- -----------------------------------------------------------------------------------------------------------------
-- i. Delete an Employer.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'AlexeiAdcocks';
  SET @givenUserCreditCardNumber = 
	(SELECT C.creditCardNumber
    	FROM creditCard AS C, paymentMethod AS P
    	WHERE C.creditCardnumber = P.creditCardNumber AND P.userName = @givenUsername);
   
  DELETE FROM paymentMethod 
  WHERE 
	userName = @givenUserName; 

  DELETE FROM creditcard
  WHERE 
	creditCardNumber = @givenUserCreditCardNumber; 

  DELETE FROM applicant 
  WHERE jobID IN  
	(SELECT	A.jobID 
    	FROM (SELECT * FROM job) AS J INNER JOIN (SELECT * FROM applicant) AS A
    	WHERE J.userName = @givenUserName); 
    
  DELETE FROM job 
  WHERE 
	userName = @givenUserName; 
    
  DELETE FROM `user`
  WHERE 
	userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- i. Display an Employer.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'AlexeiAdcocks';
 
  SELECT *
  FROM `user`
  where userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- i. Edit an Employer.
-- -----------------------------------------------------------------------------------------------------------------
 
  SET @givenUserName = 'KevinCarlsen';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'Mickey_mouse@gg.com';
  SET @givenFirstName = 'Mickey';
  SET @givenLastName = 'Mouse';
  
  UPDATE `user`
	SET `password` = @givenPassword, email = @givenEmail, firstName = @givenFirstName, lastName = @givenLastName
    	WHERE userName = @givenUserName;

-- -----------------------------------------------------------------------------------------------------------------
-- ii. Create a category by an Employer.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenCategoryName = 'concordia';
  
  INSERT INTO category (categoryName)
  VALUES 
	(@givenCategoryName);
  
-- -----------------------------------------------------------------------------------------------------------------
-- ii. Delete a category by an Employer.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenCategoryName = 'concordia'; 
  
  DELETE FROM category
  WHERE 
	(categoryName = @givenCategoryName);
    
  -- -----------------------------------------------------------------------------------------------------------------
-- ii. Edit a category by an Employer.
-- -----------------------------------------------------------------------------------------------------------------

  SET @originalCategoryName = 'concordia';
  SET @givenCategoryName = 'mcgill'; 
  
  UPDATE category
  SET categoryName = @givenCategoryName
  WHERE
	(categoryName = @originalCategoryName);
    
-- -----------------------------------------------------------------------------------------------------------------
-- ii. Display a category by an Employer.
-- ----------------------------------------------------------------------------------------------------------------- 

  SET @givenCategoryName = 'mcgill';
   
  SELECT *
  FROM category
  where categoryName = @givenCategoryName; 
    
  
  -- -----------------------------------------------------------------------------------------------------------------
-- iii. post a new job by an employer 
-- ----------------------------------------------------------------------------------------------------------------- 
  
  SET @givenUserName = 'ArabellaAndreutti';
  SET @givenCategoryName = 'finance';
  SET @givenTitle = 'stock manager';
  SET @givenDatePosted = '2020-07-29';
  SET @givenDescription = 'we need a money maker';
  SET @givenEmployeesNeeded = '1';

  INSERT INTO `job` (userName, categoryName, title, datePosted, `description`, employeesNeeded)
  VALUES
	  (@givenUserName, @givenCategoryName, @givenTitle, @givenDatePosted, @givenDescription, @givenEmployeesNeeded);

-- ------------------------------------------------------------------------------------------------------------------
-- iv. Provide a job offer for an employee by an employer.
-- ------------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'LeilaDisney';
  SET @givenJobID = '1'; 

  UPDATE applicant
  SET status = 'offer'
  WHERE userName = @givenUserName AND jobID = @givenJobID;

-- ------------------------------------------------------------------------------------------------------------------
-- v. Report of a posted job by an employer (Job title and description, date posted, 
-- list of employees applied to the job and status of each application).
-- ------------------------------------------------------------------------------------------------------------------

  SET @givenJobID = '3';

  SELECT J.title, J.`description`, J.datePosted, A.userName, A.`status`
  FROM job as J INNER JOIN applicant as A
  WHERE J.jobID = @givenJobID AND J.jobID = A.jobID;


-- ------------------------------------------------------------------------------------------------------------------
-- vi. Report of posted jobs by an employer during a specific period of time (Job title, date posted, 
-- short description of the job up to 50 characters, number of needed employees to the post, number of applied jobs to the post, 
-- number of accepted offers).
-- ------------------------------------------------------------------------------------------------------------------

  SET @givenStartDate = '2020-02-01';
  SET @givenEndDate = '2020-07-30';
  SET @givenUserName = 'BabKelsall';

  SELECT J.jobID, J.title, J.datePosted, J.`description`, J.employeesNeeded, count(A.jobID) as numOfApplicants
  FROM job AS J, applicant AS A
  WHERE J.datePosted BETWEEN @givenStartDate AND @givenEndDate 
	AND J.jobID = A.jobID 
        AND J.userName = @givenUserName
  GROUP BY J.jobID;


-- -----------------------------------------------------------------------------------------------------------------
-- vii. Create an Employee.
-- -----------------------------------------------------------------------------------------------------------------
  
  SET @givenUserName = 'MickeyMouse';
  SET @givenSubscriptionID = '3';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'Mickey_mouse@gg.com';
  SET @givenFirstName = 'Mickey';
  SET @givenLastName = 'Mouse';
  SET @givenBalance = '0';
  SET @givenSuffering = '0';
  SET @givenActive = '1';
  SET @givenLastPayment = '2020-07-02'; 
  
  INSERT INTO `user` (userName, `role`, subscriptionID, `password`, email, firstName, lastName, balance, suffering, `active`, lastPayment)
  VALUES
  	(@givenUserName, 'employee', @givenSubscriptionID, @givenPassword, @givenEmail, @givenFirstName, @givenLastName,
  	@givenBalance, @givenSuffering, @givenActive, @givenLastPayment); 

-- -----------------------------------------------------------------------------------------------------------------
-- vii. Delete an Employee.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'LeilaDisney';
  SET @givenUserCreditCardNumber = 
	(SELECT C.creditCardNumber
    	FROM creditCard AS C, paymentMethod AS P
    	WHERE C.creditCardnumber = P.creditCardNumber AND P.userName = @givenUsername);

  DELETE FROM paymentMethod 
  WHERE 
  	userName = @givenUserName; 

  DELETE FROM creditcard
  WHERE 
  	creditCardNumber = @givenUserCreditCardNumber; 

  DELETE FROM applicant 
  WHERE 
	userName = @givenUserName; 
    
  DELETE FROM `user`
  WHERE 
	userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- vii. Display an Employee.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'LeilaDisney';
 
  SELECT *
  FROM `user`
  WHERE userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- vii. Edit an Employee.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'MickeyMouse';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'MR_MICKEY@gg.com';
  SET @givenFirstName = 'TOM';
  SET @givenLastName = 'CAT';


  UPDATE `user`
  	SET `password` = @givenPassword, email = @givenEmail, firstName = @givenFirstName, lastName = @givenLastName
    	WHERE userName = @givenUserName;

-- -----------------------------------------------------------------------------------------------------------------
-- viii. Search for a job by an Employee 
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenJobTitle = 'full stack developer';
  SET @givenJobCategory = 'construction';

  -- search by title 
  SELECT *
  FROM job 
  WHERE title = @givenJobTitle; 

  -- search by category 
  SELECT *
  FROM job
  WHERE categoryName = @givenJobCategory; 

-- -----------------------------------------------------------------------------------------------------------------
-- ix. apply for a job by an employee
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenJobID = '5'; 
  SET @givenUserName = 'LeilaDisney';

  INSERT INTO applicant(userName, jobID, `status`) 
  VALUES ( @givenUserName, @givenJobID,'pending');

-- -----------------------------------------------------------------------------------------------------------------
-- x. Accept a job offer by an employee 
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenJobID = '3';
  SET @givenUserName = 'LeilaDisney';

  UPDATE applicant 
  SET `status` = 'hired'
  WHERE
  	jobID = @givenJobID AND
    	userName = @givenUserName;

-- -----------------------------------------------------------------------------------------------------------------
-- xi. Withdraw from an applied job by an employee.
-- -----------------------------------------------------------------------------------------------------------------

  SET @givenEmployeeUserName = 'JohnDoe';
  SET @givenJobID = '1'; 

  UPDATE Applicant
  SET status = 'withdrawn'
  WHERE
  	userName = @givenEmployeeUserName AND
    	jobID = @givenJobID;

-- ----------------------------------------------------------------------------------------------------------------  
-- xiii. Report of applied jobs by an employee during a specific period of time (Job title, date applied, short
-- description of the job up to 50 characters, status of the application).
-- ----------------------------------------------------------------------------------------------------------------  

  SET @givenEmployeeUserName = 'LeilaDisney';
  SET @givenStartDate = '2019-05-07';
  SET @givenEndDate = '2020-06-07';

  SELECT title, appliedDate, description, status
  FROM Job, Applicant
  WHERE
  	Applicant.userName = @givenEmployeeUserName AND
    	Job.jobID = Applicant.jobID AND
    	@givenStartDate <= appliedDate AND
    	appliedDate <= @givenEndDate;

-- ----------------------------------------------------------------------------------------------------------------  
-- xiv. Add a method of payment by a user.
-- ----------------------------------------------------------------------------------------------------------------

  -- Add credit card.alter
  SET @givenUserName = 'BabKelsall';
  SET @givenCreditCardNumber = '3533824238000000';
  SET @givenExpirationDate = '10/25';
  SET @givenCvv = '123';

  INSERT INTO `CreditCard` (creditCardNumber, expirationDate, cvv)
  VALUES
  	(@givenCreditCardNumber, @givenExpirationDate, @givenCvv);

  INSERT INTO `PaymentMethod` (userName, creditCardNumber, accountNumber)
  VALUES
	(@givenUserName, @givenCreditCardNumber , NULL);

  -- Add bank accound.
  SET @givenUserName = 'BabKelsall';
  SET @givenAccountNumber = '1001000000';

  INSERT INTO `PaymentMethod` (userName, creditCardNumber, accountNumber)
  VALUES
  	(@givenUserName, NULL, @givenAccountNumber);

-- ----------------------------------------------------------------------------------------------------------------  
-- xiv. Delete a method of payment by a user.
-- ----------------------------------------------------------------------------------------------------------------

  SET @givenPaymentID = 30;

  DELETE PaymentMethod, CreditCard
  FROM PaymentMethod
  	INNER JOIN CreditCard ON PaymentMethod.creditCardNumber = CreditCard.creditCardNumber
  WHERE
	paymentID = @givenPaymentID;

  DELETE FROM PaymentMethod
  WHERE
	paymentID = @givenPaymentID;

-- ----------------------------------------------------------------------------------------------------------------  
-- xiv. Edit a method of payment by a user.
-- ----------------------------------------------------------------------------------------------------------------

  -- Edit credit card.
  SET @givenPaymentID = 3;
  SET @givenCreditCardNumber = '3533824238000001';
  SET @givenExpirationDate = '11/25';
  SET @givenCvv = '123';

  SET @previousCreditCardNumber = (SELECT creditCardNumber FROM PaymentMethod WHERE paymentID = @givenPaymentID);

  UPDATE `CreditCard`
  SET creditCardNumber = @givenCreditCardNumber, expirationDate = @givenExpirationDate, cvv = @givenCvv
  WHERE
	creditCardNumber = @previousCreditCardNumber;

  -- Edit bank account.
  SET @givenPaymentID = 1;
  SET @givenAccountNumber = '1001000001';

  UPDATE `PaymentMethod`
  SET accountNumber = @givenAccountNumber
  WHERE
	paymentID = @givenPaymentID;

-- ----------------------------------------------------------------------------------------------------------------  
-- xvi. Make a manual payment by a user.
-- ----------------------------------------------------------------------------------------------------------------

  SET @givenUserName = 'SanfordGout';

  UPDATE User
  SET balance = 0, lastPayment = DATE(NOW()), active = True
  WHERE
  	userName = @givenUserName AND
    	subscriptionID <> 0;

-- ----------------------------------------------------------------------------------------------------------------  
-- xvii. Report of all users by the administrator for employers or employees (Name, email, category, status,
-- balance).
-- ----------------------------------------------------------------------------------------------------------------

  SET @givenRole = 'employer';

  SELECT firstName, lastName, email, Subscription.name, active, balance
  FROM User, Subscription
  WHERE
  	User.subscriptionID = Subscription.subscriptionID AND
    	role = @givenRole;


-- ----------------------------------------------------------------------------------------------------------------  
-- xviii. Report of all outstanding balance accounts (User name, email, balance, since when the account is
-- suffering).
-- ----------------------------------------------------------------------------------------------------------------

  SELECT userName, email, balance, lastPayment
  FROM User
  WHERE
	balance < 0;
    

-- ----------------------------------------------------------------------------------------------------------------  
-- bonus: A suffering account will receive a warning message once a week until the account is settled or deactivated.
-- ----------------------------------------------------------------------------------------------------------------

  SELECT userName, email 
  FROM `user` 
  WHERE lastPayment < DATE_ADD(DATE(NOW()), INTERVAL -1 WEEK)
	AND balance < 0 
        AND `active` = 1;


-- ----------------------------------------------------------------------------------------------------------------  
-- bonus: A suffering account for a year will be deactivated automatically by the system.
-- ----------------------------------------------------------------------------------------------------------------

  SET SQL_SAFE_UPDATES=0;
  UPDATE `user`
  	SET `active` = 0
    	WHERE
		lastPayment < DATE_ADD(DATE(NOW()), INTERVAL -1 YEAR)
		AND balance < 0 
		AND `active` = 1;
  SET SQL_SAFE_UPDATES=1;


-- ----------------------------------------------------------------------------------------------------------------  
-- bonus: Charge everyone using automatic payment in the DB the amount of their subscription cost. 
-- ----------------------------------------------------------------------------------------------------------------
  SET SQL_SAFE_UPDATES=0;

  -- for automatic payment 
  UPDATE `user`
	SET lastPayment = DATE(NOW()), balance = 0
    	WHERE paysWithManual = 0 
		AND `active` = 1 
            	AND lastPayment < DATE_ADD(DATE(NOW()), INTERVAL -1 MONTH);

  -- for manual payment 
  SELECT userName, email 
	FROM `user`
    	WHERE paysWithManual = 1 
		AND `active` = 1 
            	AND lastPayment < DATE_ADD(DATE(NOW()), INTERVAL -1 MONTH); 

  SET SQL_SAFE_UPDATES=1;
```
### PART 7 - User Interface  

The user interface is divided to satisfy the need of 3 types of users: the employee, the employer and the administrator. 

All users need to first login regardless of their type. Below are the login and registration interfaces.

Login page             |  Registration page
:-------------------------:|:-------------------------:
<img src="https://i.imgur.com/HHXuKrm.png" alt="" width="500"/>  |  <img src="https://i.imgur.com/nSTdV7V.png" alt="" width="500"/>

Depending on the user type, different navigation panels show up after user login. Below are navigation panels for employees, employers and administrators

Employee             |  Employer | Admin
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://i.imgur.com/4LHQy2D.png" alt="" width="500"/>  |  <img src="https://i.imgur.com/RfBBKve.png" alt="" width="500"/> |<img src="https://i.imgur.com/oplGCQR.png" alt="" width="500"/> 


