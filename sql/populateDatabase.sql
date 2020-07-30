-- RUNNING THIS SCRIPT POPULATES THE DATABASE

-- Before running this script ensure to replace the statement below with your schema name
-- USE <SCEHMA TO BE USED>;

-- --------------------------------------------------
-- Populate all tables with atleast 10 tuples (ORDER MATTERS)
-- --------------------------------------------------

INSERT INTO `subscription` (subscriptionID, `limit`, cost)
VALUES 
	('1',	'2000',	'4.99'),
	('2',	'1000',	'9.99'),
	('3',	'500',	'19.99'),
	('4',	'100',	'49.99'),
	('5',	'20',	'99.99');

    
INSERT INTO `user` (userName, subscriptionID)
VALUES 
	('Leila Disney',	'1'), 	-- employee
	('Hube Klamman',	'1'), 					-- employer 
	('Den Balsdon',		'2'), 	-- employee
	('Arabella Andreutti',	'2'),				-- employer
	('Diena Daniele',	'3'), 	-- employee
	('Bab Kelsall',		'3'), 					-- employer
	('Melisse Costley',	'3'), 	-- employee
	('Shelley Girt',	'4'), 					-- employer
	('Alexei Adcocks',	'4'), 					-- employer
	('Sanford Gout',	'5'); 	-- employee 
    
    
INSERT INTO `admin` (adminID, userName)
VALUES 
	('00-000-0001',	'Leila Disney'),
	('00-000-0002',	'Alexei Adcocks');


INSERT INTO `employee` (employeeID, userName)
VALUES 
	('00-000-0001', 'Leila Disney'),
	('00-000-0002', 'Den Balsdon'),
	('00-000-0003', 'Diena Daniele'),
	('00-000-0004', 'Melisse Costley'),
	('00-000-0005', 'Sanford Gout');
    
    
INSERT INTO `employer` (employerID, userName)
VALUES 
	('00-000-0001', 'Hube Klamman'),
	('00-000-0002', 'Arabella Andreutti'),
	('00-000-0003', 'Bab Kelsall'),
	('00-000-0004', 'Shelley Girt'),
	('00-000-0005', 'Alexei Adcocks');
	    

INSERT INTO `payment` (paymentID, userName, creditCardNumber, expirationDate, cvv, accountNumber, bank)
VALUES 
	('00-000-0001', 'Leila Disney', '3533824238007180', '2024-07-09', '132', '33-524-9584', 'BMO'),
	('00-000-0002', 'Hube Klamman', '201633564477011', '2022-05-14', '253', '91-099-0775', 'Scotia'),
	('00-000-0003', 'Den Balsdon', '374288389729244', '2022-09-15', '638', '35-028-7494', 'TD'),
	('00-000-0004', 'Arabella Andreutti', '560224262978624000', '2022-04-08', '952', '34-014-6449', 'RBC'),
	('00-000-0005', 'Diena Daniele', '3558824795154210', '2023-07-20', '685', '88-009-7183', 'BMO'),
	('00-000-0006', 'Bab Kelsall', '3570140841478170', '2021-11-02', '956', '79-266-5833', 'TD'),
	('00-000-0007', 'Melisse Costley', '5020956162470040', '2023-11-27', '645', '99-028-8440', 'Scotia'),
	('00-000-0008', 'Shelley Girt', '3547131580418310', '2023-11-27', '067', '37-673-6253', 'RBC'),
	('00-000-0009', 'Alexei Adcocks', '3536309143887770', '2022-04-11', '684', '10-255-9364', 'RBC'),
	('00-000-0010', 'Sanford Gout', '3555954581085500', '2022-09-06', '782', '05-975-8821', 'DesJardins');


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
    

INSERT INTO `job` (jobID, employerID, categoryName, title, datePosted, `description`, employeeNeeded)
VALUES 
	('00-000-0001', '00-000-0001', 'computing', 'full stack dev', '2020-06-01', 'We work with COBOL', 2),
    ('00-000-0002', '00-000-0002', 'construction', 'construction worker', '2020-07-12', 'Welcome to the field', 5),
    ('00-000-0003', '00-000-0003', 'design', 'graphic designer', '2020-07-14', 'We make cool stuff', 1),
    ('00-000-0004', '00-000-0004', 'education', 'high school teacher', '2020-07-14', 'Show the kids how to behave', 1),
    ('00-000-0005', '00-000-0005', 'engineering', 'senior mechanical engineer', '2020-07-20', 'Help us, we are stuck', 1);


INSERT INTO `application` (employeeID, jobID, `status`)
VALUES 
	('00-000-0001', '00-000-0001', 'pending'),
    ('00-000-0002', '00-000-0002', 'rejected'),
    ('00-000-0003', '00-000-0003', 'hired'),
    ('00-000-0004', '00-000-0004', 'withdrawn'),
    ('00-000-0005', '00-000-0005', 'hired');
	








