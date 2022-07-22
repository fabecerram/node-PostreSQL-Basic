
CREATE DATABASE TodoDB;


CREATE TABLE todo(
	todo_Id SERIAL PRIMARY KEY,
	todo_description VARCHAR(255),
	creation_Date DATE,
	update_Date DATE,
	completion_Date DATE,
	completed BOOLEAN	
);