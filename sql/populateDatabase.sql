-- RUNNING THIS SCRIPT POPULATES THE DATABASE

-- USE jxc353_1;

INSERT INTO `Subscription`(`name`, `limit`, cost)
VALUES 
	('Employer Prime Membership', 5, 50.00),
	('Employer Gold Membership', 9999, 100.00),
	('Employee Basic Membership', 0, 0.00),
	('Employee Prime Membership', 5, 10),
	('Employee Gold Membership',	9999,	20)
;

    
INSERT INTO `User`(userName, subscriptionID, `password`, email, firstName, lastName, `role`, balance, suffering, `active`, lastPayment)
VALUES 
	('Leila Disney', 3,	'qwer', 'leila_disney@hotmail.com', 'Leila', 'Disney', 'employee', -9.98,	1, 1,	'2020-05-07'),
	('Hube Klamman',	2,	'tyui', 'hube_klamman@hotmail.com', 'Hube', 'Klamman', 'employer', 0.00, 0, 1, '2020-07-08'), 				
	('Den Balsdon', 4,	'asdf', 'den_balsdon@hotmail.com', 'Den', 'Balsdon', 'employee', 0.00, 0, 1, '2020-07-28'),
	('Arabella Andreutti',	1, 'ghjk', 'arabella_andreutti@gmail.com', 'Arabella',	'Andreutti', 'employer', -19.9,	1, 0, '2020-06-08'),
	('Diena Daniele', 5,	'zxcv', 'diena_daniele@gmail.com', 'Diena',	'Daniele', 'employee', 0.00, 0, 0, '2020-07-21'), 	
	('Bab Kelsall', 1,	'rewq', 'bab_kelsall@gmail.com', 'Bab', 'Kelsall', 'employer',	0.00,	0, 1, '2020-04-01'), 					
	('Melisse Costley', 3,	'iuyt', 'melisse_costley@gmail.com', 'Melisse',	'Costley', 'employee', -19.99, 1,	0, '2020-04-08'), 	
	('Shelley Girt', 1,	'fdsa', 'shelley_girt@gmail.com', 'Shelley', 'Girt', 'employer', 0,	 0, 1, '2020-06-08'), 					
	('Alexei Adcocks', 2,	'kjhg', 'alexei_adcocks@yahoo.com', 'Alexei',	'Adcocks', 'employer', 0,	0, 1, '2020-07-15'), 					
	('Sanford Gout', 5, 'vcxz', 'sanford_gout@yahoo.com', 'Sanford', 'Gout', 'employee', -99.99,	1, 1, '2020-06-01'), 	
  ('John Doe', 1,	'mnbv', 'john_doe@yahoo.com', 'John', 'Doe', 'employee', -99.99, 1, 0, '2020-02-01')
;     

INSERT INTO `CreditCard` (creditCardNumber, expirationDate, cvv)
VALUES
	('3533824238007180', '07/24', '132'),
  ('2016335644770111', '05/22', '253'),
  ('3742883897292441', '09/22', '638'),
  ('5602242629786240', '04/22', '952'),
  ('3558824795154210', '07/23', '685'),
  ('3570140841478170', '11/21', '956'),
  ('5020956162470040', '11/23', '645'),
  ('3547131580418310', '11/23', '067'),
  ('3536309143887770', '04/22', '684'),
  ('3555954581085500', '09/22', '782');
   

INSERT INTO `PaymentMethod` (userName, creditCardNumber, accountNumber)
VALUES 
	('Leila Disney', '3533824238007180', '1001001234'),
	('Hube Klamman', '2016335644770111', '1001001352'),
	('Den Balsdon', '3742883897292441', '1001001338'),
	('Arabella Andreutti', '5602242629786240', '1001001849'),
	('Diena Daniele', '3558824795154210', '1001001862'),
	('Bab Kelsall', '3570140841478170', '1001001283'),
	('Melisse Costley', '5020956162470040', '1001001976'),
	('Shelley Girt', '3547131580418310', '1001001937'),
	('Alexei Adcocks', '3536309143887770', '1001001392'),
	('Sanford Gout', '3555954581085500', '1001001823')
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
	('Hube Klamman', 'Computing', 'Full Stack Developer', '2020-06-01', 'We work with COBOL!', 3),
  ('Arabella Andreutti', 'Construction', 'Construction Worker', '2020-07-12', 'We build really cool stuff.', 5),
  ('Bab Kelsall', 'Design', 'Graphic Designer', '2020-07-14', 'We take commissions and give you bonuses.', 2),
  ('Shelley Girt', 'Education', 'High School Teacher', '2020-07-14', 'Show the kids how to behave and smack em around.', 1),
  ('Alexei Adcocks', 'Engineering', 'Senior Mechanical Engineer', '2020-07-20', 'Help us, we are stuck', 1)
;


INSERT INTO `Applicant` (userName, jobID, `status`)
VALUES 
	('Leila Disney', '1', 'pending'),
  ('Den Balsdon', '2', 'rejected'),
  ('Diena Daniele', '3', 'withdrawn'),
  ('Melisse Costley', '4', 'hired'),
  ('Sanford Gout', '5', 'pending'),
  ('Leila Disney', '3', 'pending');
	








