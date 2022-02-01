# Database class

This database class is a general purpose class for creating and using MariaDB / MySQL queries. The constructor takes all necessary information needed to open a database connection as a parameter object. The layer is used between the database engine and our application.

The constructor takes one parameter. Example:

```js
{
const options= {
    host:'localhost',
    port:3306,
    user:'roxie',
    password:'heat',
    database:'employeedb'
    allowPublicKeyRetrieval: true //mysql, but still asking me this???
}
}
```

## Usage

```js
const db = new Database(options);
```

## **doQuery(sql,parameters)** 
The method has two parameters:
- `sql`: is a statement as a string 
- `parameters`: an array of query parameters to be used in place of the questionmarks `?` in the sql statement. Parameters may also be omitted if the sql statement has no placeholder `?` in it.

### Usage
#### No parameters needed
```js
const result = await db.doQuery('select * from employee');
```

#### Query criterion is employeeId=1
```js
const result = await db.doQuery('select * from employee where employeeId=?', [1]);
```
This brings us every column that is associated with employeeId 1
Return value of select with employeeId=1 for example:
```js
{
    queryResult:[
        {
            employeeId:1,
            firstname:'Matt',
            lastname:'River',
            department:'ICT',
            salary:5000
        }
    ],
    resultSet:true
}
```

#### Insert, update, delete etc.
##### Insert
```js
const result = await db.doQuery('insert into employee values(?,?,?,?,?)', 
[6,'Sheldon','Cooper','DR',8000]);
```
Return value is an object:
```js
{
    queryResult:{rowsChanged:1, insertId:0, status:0},
    resultSet:false
}
```

