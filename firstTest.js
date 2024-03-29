'use strict';

const MariaDb = require('./database');

const options= {
    host:'localhost',
    port:3306,
    user:'roxie',
    password:'heat',
    database:'employeedb',
    allowPublicKeyRetrieval: true //mysql, but still asking me this???
};

const db = new MariaDb(options);

//db.doQuery('select * from employee').then(console.log).catch(console.log);

function printWorkers(employees) {
    for(let person of employees) {
        console.log(`${person.employeeId}:${person.firstname} ${person.lastname}` + 
        ` Dept: ${person.department}, ${person.salary} $`);
    }
}

async function getAll() {
    try {
        const result = await db.doQuery('select * from employee');
        if(result.resultSet) {
            printWorkers(result.queryResult);
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function get(id) {
    try {
        const result = await db.doQuery('select * from employee where employeeId=?', [id]);
        printWorkers(result.queryResult);
    }
    catch(error) {
        console.log(error);
    }
}

async function add(person) {
    try {
        const parameters = [
            person.employeeId,
            person.firstname,
            person.lastname,
            person.department,
            person.salary
        ];
        // const parameters = Object.values(person); //this can be used instead of the list above. However with the list there is less possibilities for mistakes in the order.
        const sql='insert into employee values(?,?,?,?,?)';
        const status=await db.doQuery(sql, parameters);
        console.log('Status', status);
    }
    catch(error) {
        console.log(error);
    }
}

async function add2(person) {
    try {
        const parameters = [
            person.lastname,
            person.firstname,
            person.department,
            person.salary,
            person.employeeId  
        ];
        const sql='insert into employee (lastname,firstname,department,salary,employeeId)' + 'values(?,?,?,?,?)';
        const status=await db.doQuery(sql, parameters);
        console.log('Status', status);
    }
    catch(error) {
        console.log(error);
    }
}

async function remove(id) {
    try {
        const sql  = 'delete from employee where employeeId=?';
        const status = await db.doQuery(sql, [id]);
        console.log('removal status', status);
    }
    catch(error) {
        console.log(error);
    }
}

async function update(person) {
    try {
        const sql='Update employee set firstname=?, lastname=?, department=?, salary=? ' 
        + 'where employeeId=?'
        const parameters = [
            person.firstname,
            person.lastname,
            person.department,
            person.salary,
            person.employeeId
        ];

        const status = await db.doQuery(sql, parameters);
        console.log('update status: rowsChanged=',status.queryResult.rowsChanged);
    }
    catch(error) {
        console.log(error);
    }
}

async function update2(person) {
    try {
        const sql = 'update employee set firstname=?, lastname=?, department=?, salary=? ' +
            'where employeeId=?'
        const parameters = [
            person.firstname,
            person.lastname,
            person.department,
            person.salary,
            person.employeeId
        ];
        const result = await db.doQuery('select employeeId from employee where employeeId=?',
            [person.employeeId]);
        if (result.queryResult.length === 0) {
            console.log(`nothing to update with Id=${person.employeeId}`);
        }
        else {
            const status = await db.doQuery(sql, parameters);
            console.log('update status: rowsChanged=', status.queryResult.rowsChanged);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function run() {
    console.log('***get all***');
    await getAll();
    console.log('***get 1***');
    await get(1);
    console.log('***get 2***');
    await get(2);
    console.log('*** remove ***');
    await remove(5);
    console.log('*** add 7***');
    const newEmp= {
        employeeId:5,
        firstname:'Penny',
        lastname:'Hofstadter',
        department:'Sales',
        salary:7300
    };
    await add(newEmp);
    
    await add2(newEmp);
    console.log('####### remove 200,300 and 400 ###');
    await remove(200);
    await remove(300);
    await remove(400);
    await getAll();
    const updatedEmp={
        employeeId:6,
        firstname:'Sheldon',
        lastname:'Cooper',
        department:'Physics',
        salary:8900
    };
    await update(updatedEmp);
    await getAll();
    await update2({
        employeeId: 5,
        firstname: 'Penny',
        lastname: 'Hofstadter',
        department: 'Sales',
        salary: 7700
    });
    await getAll();
}

run();