-- RUNNING THIS SCRIPT POPULATES THE DATABASE

USE jxc353_1;

INSERT INTO `Subscription`(`name`, `limit`, cost)
VALUES 
	('Employer Prime Membership', 5, 50.00),
	('Employer Gold Membership', 9999, 100.00),
	('Employee Basic Membership', 0, 0.00),
	('Employee Prime Membership', 5, 10),
	('Employee Gold Membership',	9999,	20)
;

    
INSERT INTO `User`(userName, subscriptionID, password, email, firstName, lastName, role, balance, suffering, active, lastPayment)
VALUES 
	('LeilaDisney', 3,	'qwer', 'leila_disney@hotmail.com', 'Leila', 'Disney', 'employee', -9.98,	1, 1,	'2020-05-07'),
	('HubeKlamman',	2,	'tyui', 'hube_klamman@hotmail.com', 'Hube', 'Klamman', 'employer', 0.00, 0, 1, '2020-07-08'), 				
	('DenBalsdon', 4,	'asdf', 'den_balsdon@hotmail.com', 'Den', 'Balsdon', 'employee', 0.00, 0, 1, '2020-07-28'),
	('ArabellaAndreutti',	1, 'ghjk', 'arabella_andreutti@gmail.com', 'Arabella',	'Andreutti', 'employer', -19.9,	1, 0, '2020-06-08'),
	('DienaDaniele', 5,	'zxcv', 'diena_daniele@gmail.com', 'Diena',	'Daniele', 'employee', 0.00, 0, 0, '2020-07-21'), 	
	('BabKelsall', 1,	'rewq', 'bab_kelsall@gmail.com', 'Bab', 'Kelsall', 'employer',	0.00,	0, 1, '2020-04-01'), 					
	('MelisseCostley', 3,	'iuyt', 'melisse_costley@gmail.com', 'Melisse',	'Costley', 'employee', -19.99, 1,	0, '2020-04-08'), 	
	('ShelleyGirt', 1,	'fdsa', 'shelley_girt@gmail.com', 'Shelley', 'Girt', 'employer', 0,	 0, 1, '2020-06-08'), 					
	('AlexeiAdcocks', 2,	'kjhg', 'alexei_adcocks@yahoo.com', 'Alexei',	'Adcocks', 'employer', 0,	0, 1, '2020-07-15'), 					
	('SanfordGout', 5, 'vcxz', 'sanford_gout@yahoo.com', 'Sanford', 'Gout', 'employee', -99.99,	1, 1, '2020-06-01'), 	
  ('JohnDoe', 1,	'mnbv', 'john_doe@yahoo.com', 'John', 'Doe', 'employee', -99.99, 1, 0, '2020-02-01')
;     

INSERT INTO `CreditCard` (creditCardNumber, expirationDate, cvv)
VALUES
	('3533824238007180', '2024-07-09', '132'),
  ('2016335644770111', '2022-05-14', '253'),
  ('3742883897292441', '2022-09-15', '638'),
  ('5602242629786240', '2022-04-08', '952'),
  ('3558824795154210', '2023-07-20', '685'),
  ('3570140841478170', '2021-11-02', '956'),
  ('5020956162470040', '2023-11-27', '645'),
  ('3547131580418310', '2023-11-27', '067'),
  ('3536309143887770', '2022-04-11', '684'),
  ('3555954581085500', '2022-09-06', '782')
;
   

INSERT INTO `PaymentMethod` (userName, creditCardNumber, accountNumber)
VALUES 
	('LeilaDisney', '3533824238007180', '1001001234'),
	('HubeKlamman', '2016335644770111', '1001001352'),
	('DenBalsdon', '3742883897292441', '1001001338'),
	('ArabellaAndreutti', '5602242629786240', '1001001849'),
	('DienaDaniele', '3558824795154210', '1001001862'),
	('BabKelsall', '3570140841478170', '1001001283'),
	('MelisseCostley', '5020956162470040', '1001001976'),
	('ShelleyGirt', '3547131580418310', '1001001937'),
	('AlexeiAdcocks', '3536309143887770', '1001001392'),
	('SanfordGout', '3555954581085500', '1001001823')
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
  ('AlexeiAdcocks', 'Engineering', 'Senior Mechanical Engineer', '2020-07-20', 'Help us, we are stuck', 1)
;


INSERT INTO `Applicant` (userName, jobID, `status`)
VALUES 
	('JohnDoe', '1', 'pending'),
  ('JohnDoe', '2', 'rejected'),
  ('JohnDoe', '3', 'withdrawn'),
  ('JohnDoe', '4', 'hired'),
  ('JohnDoe', '5', 'pending')
;
	








