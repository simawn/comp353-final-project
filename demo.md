# Demo

## TODO before

- Make sure the employee `debt` with typical password:
  - is active,
  - has a negative balance,
  - has no payment method.

## Steps

- Create an employer account.
- Login with this account.
  - In **Your Job Postings**.
    - Create a category.
    - Create a job with this category.
    - Show that there is no applicant.
    - Show edit option, but do not use it.
    - Show delete option, but do not use it.
  - In **Contact Support**.
    - Do nothing.
  - Logout.
- Create an employee account.
  - In **Job Listings**.
    - Set start date to a month ago and search.
    - Select category that was created before.
    - Try to apply to the job that was created and notice it doesn't work.
  - In **Acount Settings**.
    - Show edit, but do not use it.
    - Change subscription to **Employee Prime Membership**.
  - In **Job Listings**.
    - Apply to any job and then withdraw.
    - Apply again to job.
  - Logout.
- Change password of employeer.
- Login as employeer.
  - In **Your Job Postings**.
    - Show applicant list.
    - Select Send Offer.
  - Logout.
- Login as employee.
  - In **Job Listings**.
    - Notice that you have an offer.
    - Click it and accept the job.
- Login to account with negative balance.
  - In **Job Listings**.
    - Notice that the account is frozen and everything is disabled.
  - In **Payment Methods**.
    - Add a credit card.
    - Make Active.
  - In **Acount Settings**.
    - Make a payment.
  - In **Job Listings**.
    - Show that it is now working.
  - Logout.
- Login as admin.
  - In **Job Overview**.
    - Just show that everything is there.
  - In **User Overview**.
    - Deactivate the user that had a negative balance.
  - Logout.
- Login to account with negative balance.
  - In **Job Listings**.
    - Notice that the account is deactivate and everything is disabled.
  - Delete account.
- Try to login as employee with negative balance and fail.

## Requirements that cannot be shown

- Automatic payment.
- Email when account is suffering.

