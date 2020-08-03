# COMP 353 MAin Project

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
- Pierre-André Gagnon

### PART 2 - Conceptual Design

#### Assumptions

#### Changes to the requirements

#### Additions to the requirements

### PART 3 - Normalization

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

### Part 5 - SQL Statements to Populate the Database

### Part 6 - SQL Statements to Query the Database

