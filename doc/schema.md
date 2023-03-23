## Database Name : hedwig

### Table Name : recipients


| id (int id) | name(string) | email(string)   | contact(string) | gender (string) | dob(DateField) | group (string) |
| ----------- | ------------ | --------------- | --------------- | --------------- | -------------- | -------------- |
| 1           | Abylin       | abylin@mail.com | 9456453412      | male            | 22-04-2002     | thovali        | 

group : The thaluk of the reciptient from this the district can also be taken and the admin can also add new users such as police, teachers and etc.

### Table Name : mail_templates

| id (int id) | title (string)    | subject (string)                     | content (string)                  | attachment (file) |
| ----------- | ----------------- | ------------------------------------ | --------------------------------- | ----------------- |
| 1           | Schools Reopening | To notify the opening of the schools | Respected Mam/Sir, We hereby..... | timetable.png     | 

### Table Name : users

| id (int id) | name (string) | password (string)  | email (string)   | permission (string) |
| ----------- | ------------- | ------------------ | ---------------- | ------------------- |
| 1           | admin         | eeb36e726e3ffec16d | admin@mail.com   | admin               |
| 2           | chennai       | eeb36e726e3ffec    | chennai@mail.com | chennai             | 

 permission => tells us about the user permission ie. to what recipients the user can send 

### Table Name :  campaign

| id (int) | title (string)   | group (string) | started_at (DateTimeField) | ended_at(DateTimeField) | total_mail (int) | mail_sent (int) | status (string) | mail_id |
| -------- | ---------------- | -------------- | -------------------------- | ----------------------- | ---------------- | --------------- | --------------- | ------- |
| 1        | School reopening | chennai        | 21-03-2022:12:00:00        | 21-03-2022:01:00:00     | 456000           | 456000          | completed       | 1       | 

mail_id => The id of the mail that is going to be sent to the user