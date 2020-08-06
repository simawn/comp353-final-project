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
- `Job`
- `Category`
- `PaymentMethod`
- `Subscription`
- `CreditCard`
- `Applicant`

When we converted our E/R diagram to a relational schema, the decomposition was straightforward. We only had to test that is was 3NF, lossless and dependency preserving.

To simplify the proofs, we combined attributes that had the same dependencies. What is left is:

Variable|Attributes|
-|-
`S`|`subscriptionID`
`s`|`Subscription` attributes
`U`|`userName`
`u`|`User` attributes
`R`|`creditCardNumber`
`r`|`CreditCard` attributes
`P`|`paymentID`
`b`|`accountNumber`
`C`|`categoryName`
`J`|`jobID`
`j`|`Job` attributes
`a`|`Application` attributes

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

### PART 4 - SQL Statements to Create the Database

### PART 5 - SQL Statements to Populate the Database

### PART 6 - SQL Statements to Query the Database

