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
	(@givenUserName, @givenCategoryName, @givenTitle, @givenDatePosted,	@givenDescription, @givenEmployeesNeeded);

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
 where userName = @givenUserName;
 
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
WHERE jobID = @givenJobID AND userName = @givenUserName;

-- -----------------------------------------------------------------------------------------------------------------
-- xi. Withdraw from an applied job by an employee. DUPLICATE AS VII.
-- -----------------------------------------------------------------------------------------------------------------


-- ----------------------------------------------------------------------------------------------------------------  
--   
-- ----------------------------------------------------------------------------------------------------------------    

