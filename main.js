'use strict';

const {getAll, get, add, add2, remove, update, update2} = require('./datalayer');


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