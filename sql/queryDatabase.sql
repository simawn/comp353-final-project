-- -----------------------------------------------------------------------------------------------------------------
-- i. Create an Employer.
-- -----------------------------------------------------------------------------------------------------------------
  
  SET @givenUserName = 'Mickey Mouse';
  SET @givenSubscriptionID = '3';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'Mickey_mouse@gg.com';
  SET @givenFirstName = 'Mickey';
  SET @givenLastName = 'Mouse';
  SET @givenIsAdmin = '1';
  SET @givenBalance = '0';
  SET @givenSuffering = '0';
  SET @givenActive = '1';
  SET @givenLastPayment = '2020-07-02'; 
  
INSERT INTO `user`
VALUES
(@givenUserName, 'employer', @givenSubscriptionID, @givenPassword, @givenEmail, @givenFirstName, @givenLastName,
@givenIsAdmin, @givenBalance, @givenSuffering, @givenActive, @givenLastPayment); 

-- -----------------------------------------------------------------------------------------------------------------
-- i. Delete an Employer.
-- -----------------------------------------------------------------------------------------------------------------

SET @givenUserName = 'Mickey Mouse';

DELETE FROM `user`
WHERE 
	userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- i. Display an Employer.
-- -----------------------------------------------------------------------------------------------------------------

 SET @givenUserName = 'Alexei Adcocks';
 
 SELECT *
 FROM `user`
 where userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- i. Edit an Employer.
-- -----------------------------------------------------------------------------------------------------------------
 
  SET @originalUserName = 'Mickey Mouse';
  
  SET @givenUserName = 'MR MICKEY';
  SET @givenRole = 'employer';
  SET @givenSubscriptionID = '3';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'Mickey_mouse@gg.com';
  SET @givenFirstName = 'Mickey';
  SET @givenLastName = 'MR';
  SET @givenIsAdmin = '1';
  SET @givenBalance = '0';
  SET @givenSuffering = '0';
  SET @givenActive = '1';
  SET @givenLastPayment = '2020-07-02'; 

UPDATE `user`
	SET userName = @givenUserName, lastName = @givenLastName
    WHERE userName = @originalUserName;

-- -----------------------------------------------------------------------------------------------------------------
-- ii. Create a category by an Employer.
-- -----------------------------------------------------------------------------------------------------------------
  SET @givenCategoryName = 'concordia';
  
  INSERT INTO category
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
-- iii. post a new job by an employer ???
-- ----------------------------------------------------------------------------------------------------------------- 
  
  SET @givenJobID = '7';
  SET @givenUserName = 'Leila Disney';
  SET @givenCategoryName = 'education';
  SET @givenTitle = 'manager';
  SET @givenDatePosted = '2020-07-03';
  SET @givenDescription = 'we need manager';
  SET @givenEmployeesNeeded = '3';

INSERT INTO `job`
VALUES
	(jobID = @givenJobID, userName = @givenUserName, categoryName = @givenCategoryName, title = @givenTitle, datePosted = @givenDatePosted,
	`description` = @givenDescription, employeesNeeded = @givenEmployeesNeeded)

-- ------------------------------------------------------------------------------------------------------------------
-- iv. Provide a job offer for an employee by an employer.
-- ------------------------------------------------------------------------------------------------------------------
SET @givenUserName = 'Leila Disney';
SET @givenJobID = '1'; 

UPDATE applicant
SET status = 'hired'
WHERE userName = @givenUserName AND jobID = @givenJobID;


-- ------------------------------------------------------------------------------------------------------------------
-- v. Report of a posted job by an employer (Job title and description, date posted, 
-- list of employees applied to the job and status of each application).
-- ------------------------------------------------------------------------------------------------------------------
SET @givenJobID = '1';

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
SET @givenUserName = 'Bab Kelsall';

SELECT J.jobID, J.title, J.datePosted, J.`description`, J.employeesNeeded, count(A.jobID) as numOfApplicants
FROM job AS J, applicant AS A
WHERE J.datePosted BETWEEN @givenStartDate AND @givenEndDate 
		AND J.jobID = A.jobID 
        AND J.userName = @givenUserName
GROUP BY J.jobID;


-- -----------------------------------------------------------------------------------------------------------------
-- vii. Create an Employee.
-- -----------------------------------------------------------------------------------------------------------------
  
  SET @givenUserName = 'Mickey Mouse';
  SET @givenSubscriptionID = '3';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'Mickey_mouse@gg.com';
  SET @givenFirstName = 'Mickey';
  SET @givenLastName = 'Mouse';
  SET @givenIsAdmin = '1';
  SET @givenBalance = '0';
  SET @givenSuffering = '0';
  SET @givenActive = '1';
  SET @givenLastPayment = '2020-07-02'; 
  
INSERT INTO `user`
VALUES
(@givenUserName, 'employee', @givenSubscriptionID, @givenPassword, @givenEmail, @givenFirstName, @givenLastName,
@givenIsAdmin, @givenBalance, @givenSuffering, @givenActive, @givenLastPayment); 

-- -----------------------------------------------------------------------------------------------------------------
-- vii. Delete an Employee.
-- -----------------------------------------------------------------------------------------------------------------

SET @givenUserName = 'Mickey Mouse';

DELETE FROM `user`
WHERE 
	userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- vii. Display an Employee.
-- -----------------------------------------------------------------------------------------------------------------
 SET @givenUserName = 'Leila Disney';
 
 SELECT *
 FROM `user`
 where userName = @givenUserName;
 
-- -----------------------------------------------------------------------------------------------------------------
-- vii. Edit an Employee.
-- -----------------------------------------------------------------------------------------------------------------
  SET @originalUserName = 'Mickey Mouse';
  
  SET @givenUserName = 'MR MICKEY';
  SET @givenSubscriptionID = '3';
  SET @givenPassword = 'qetu';
  SET @givenEmail = 'Mickey_mouse@gg.com';
  SET @givenFirstName = 'Mickey';
  SET @givenLastName = 'MR';
  SET @givenIsAdmin = '1';
  SET @givenBalance = '0';
  SET @givenSuffering = '0';
  SET @givenActive = '1';
  SET @givenLastPayment = '2020-07-02'; 

UPDATE `user`
	SET userName = @givenUserName, lastName = @givenLastName
    WHERE userName = @originalUserName;

-- -----------------------------------------------------------------------------------------------------------------
-- viii. Search for a job by an Employee 
-- -----------------------------------------------------------------------------------------------------------------
SET @givenJobTitle = 'full stack dev';
SET @givenJobCategory = 'construction';

SELECT *
FROM job 
WHERE title = @givenJobTitle; 

SELECT *
FROM job
WHERE categoryName = @givenJobCategory; 

-- -----------------------------------------------------------------------------------------------------------------
-- ix. apply for a job by an employee
-- -----------------------------------------------------------------------------------------------------------------
SET @givenJobID = '5'; 
SET @givenUserName = 'Leila Disney';

INSERT INTO applicant(userName, jobID, `status`) 
VALUES ( @givenUserName, @givenJobID,'pending');

