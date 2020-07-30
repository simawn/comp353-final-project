-- RUNNING THIS SCRIPT POPULATES THE DATABASE

-- Before running this script ensure to replace the statement below with your schema name
-- USE <SCEHMA TO BE USED>;

-- --------------------------------------------------
-- Populate all tables with atleast 10 tuples (ORDER MATTERS)
-- --------------------------------------------------

INSERT INTO `subscription` (subscriptionID, `name`, `limit`, cost)
VALUES 
	('1',	'bronze membership',	'2000',	'4.99'),
	('2',	'silver membership',	'1000',	'9.99'),
	('3',	'gold membership',		'500',	'19.99'),
	('4',	'platinum membership',	'100',	'49.99'),
	('5',	'diamond membership',	'20',	'99.99');

    
INSERT INTO `user` (userName, subscriptionID, `password`, email, firstName, lastName, isAdmin, balance, suffering, `active`, lastPayment)
VALUES 
	('Leila Disney',		'1',	'qwer',		'leila_disney@hotmail.com',		'Leila',	'Disney',		'1',		'-9.98',	'1',		'1',		'2020-05-07'), 	-- employee
	('Hube Klamman',		'1',	'tyui',		'hube_klamman@hotmail.com',		'Hube',		'Klamman',		'0',		'9.98',		'0',		'1',		'2020-07-08'), 					-- employer 
	('Den Balsdon',			'2',	'asdf',		'den_balsdon@hotmail.com',		'Den',		'Balsdon',		'0',		'9.99',		'0',		'1',		'2020-07-28'), 	-- employee
	('Arabella Andreutti',	'2',	'ghjk',		'arabella_andreutti@gmail.com',	'Arabella',	'Andreutti',	'0',		'-19.98',	'1',		'1',		'2020-06-08'),					-- employer
	('Diena Daniele',		'3',	'zxcv',		'diena_daniele@gmail.com',		'Diena',	'Daniele',		'0',		'19.99',	'0',		'1',		'2020-07-21'), 	-- employee
	('Bab Kelsall',			'3',	'rewq',		'bab_kelsall@gmail.com',		'Bab',		'Kelsall',		'0',		'199.90',	'0',		'1',		'2020-04-01'), 					-- employer
	('Melisse Costley',		'3',	'iuyt',		'melisse_costley@gmail.com',	'Melisse',	'Costley',		'0',		'-19.99',	'1',		'1',		'2020-04-08'), 	-- employee
	('Shelley Girt',		'4',	'fdsa',		'shelley_girt@gmail.com',		'Shelley',	'Girt',			'0',		'0',		'0',		'1',		'2020-06-08'), 					-- employer
	('Alexei Adcocks',		'4',	'kjhg',		'alexei_adcocks@yahoo.com',		'Alexei',	'Adcocks',		'1',		'49.99',	'0',		'1',		'2020-07-15'), 					-- employer
	('Sanford Gout',		'5',	'vcxz',		'sanford_gout@yahoo.com',		'Sanford',	'Gout',			'0',		'-99.99',	'1',		'1',		'2020-06-01'), 	-- employee 
   	('John Doe',			'5',	'mnbv',		'john_doe@yahoo.com',			'John',		'Doe',			'0',		'-99.99',	'1',		'0',		'2020-02-01'); 	-- employee 

    
INSERT INTO `employer` (employerID, userName)
VALUES 
	('1', 'Hube Klamman'),
	('2', 'Arabella Andreutti'),
	('3', 'Bab Kelsall'),
	('4', 'Shelley Girt'),
	('5', 'Alexei Adcocks');
    
    
INSERT INTO `employee` (employeeID, userName)
VALUES 
	('1', 'Leila Disney'),
	('2', 'Den Balsdon'),
	('3', 'Diena Daniele'),
	('4', 'Melisse Costley'),
	('5', 'Sanford Gout'),
    ('6', 'John Doe');
    

INSERT INTO `CreditCard` (creditCardNumber, expirationDate, cvv)
VALUES
	('3533824238007180', 	'2024-07-09', 	'132'),
    ('201633564477011', 	'2022-05-14', 	'253'),
    ('374288389729244', 	'2022-09-15', 	'638'),
    ('560224262978624000', 	'2022-04-08', 	'952'),
    ('3558824795154210', 	'2023-07-20', 	'685'),
    ('3570140841478170', 	'2021-11-02', 	'956'),
    ('5020956162470040', 	'2023-11-27', 	'645'),
    ('3547131580418310', 	'2023-11-27', 	'067'),
    ('3536309143887770', 	'2022-04-11', 	'684'),
    ('3555954581085500', 	'2022-09-06', 	'782');
   

INSERT INTO `PaymentMethod` (paymentID, userName, creditCardNumber, accountNumber)
VALUES 
	('1', 	'Leila Disney', 		'3533824238007180', 	'1001001234'),
	('2', 	'Hube Klamman', 		'201633564477011', 		'1001001352'),
	('3', 	'Den Balsdon', 			'374288389729244', 		'1001001338'),
	('4', 	'Arabella Andreutti', 	'560224262978624000', 	'1001001849'),
	('5', 	'Diena Daniele', 		'3558824795154210', 	'1001001862'),
	('6', 	'Bab Kelsall', 			'3570140841478170', 	'1001001283'),
	('7', 	'Melisse Costley', 		'5020956162470040', 	'1001001976'),
	('8', 	'Shelley Girt', 		'3547131580418310', 	'1001001937'),
	('9', 	'Alexei Adcocks', 		'3536309143887770', 	'1001001392'),
	('10', 	'Sanford Gout', 		'3555954581085500', 	'1001001823');


INSERT INTO `category` (categoryName)
VALUES 
	('administration'),
    ('computing'),
    ('construction'),
    ('design'),
    ('education'),
    ('engineering'),
    ('finance'),
    ('legal services'),
    ('retail'),
    ('security');
    

INSERT INTO `job` (jobID, employerID, categoryName, title, datePosted, `description`, employeesNeeded)
VALUES 
	('1', '1', 'computing', 		'full stack dev', 				'2020-06-01', 		'We work with COBOL', 			3),
    ('2', '2', 'construction', 		'construction worker', 			'2020-07-12', 		'Welcome to the field', 		5),
    ('3', '3', 'design', 			'graphic designer', 			'2020-07-14', 		'We take commissions', 			2),
    ('4', '4', 'education', 		'high school teacher', 			'2020-07-14', 		'Show the kids how to behave', 	1),
    ('5', '5', 'engineering', 		'senior mechanical engineer', 	'2020-07-20', 		'Help us, we are stuck', 		1);


INSERT INTO `Applicant` (employeeID, jobID, `status`)
VALUES 
	('2', 	'1', 	'pending'),
    ('1', 	'2', 	'rejected'),
    ('3', 	'3', 	'hired'),
    ('5', 	'4', 	'withdrawn'),
    ('4', 	'5', 	'hired');
	








