const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar()
const cTable = require('console.table');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role')

//instantiate classes
const department = new Department;
const employee = new Employee;
const role = new Role;

//available actions
const actions = [
    {
        name: 'View all Departments',
        value: 1
    },
    {
        name: 'View all Roles',
        value: 2
    },
    {
        name: 'View all Employees',
        value: 3
    },
    {
        name: 'Add a Department',
        value: 4
    },
    {
        name: 'Add a Role',
        value: 5
    },
    {
        name: 'Add an Employee',
        value: 6
    },
    {
        name: 'Update an Employee role',
        value: 7
    },
    {
        name: 'Quit',
        value: 100
    }
]

const promptUpdateEmployee = async () => {
    const empData = {}
    empData["id"] = await employee.getEmployeeList()
        .then(result => {
            return inquirer.prompt({
                type: 'list',
                name: 'employee_id',
                choices: result,
                message: 'Select an employee to update'
            })
            .then(choice => choice.employee_id)           
        })

    empData["role"] = await role.getRolesList()
        .then(result => {
            return inquirer.prompt({
                type: 'list',
                name: 'role_id',
                choices: result,
                message: `Select the employee's new role`        
            })
            .then(choice => choice.role_id)
        })
        
    //console.log(empData);
    employee.updateRole(empData.id, empData.role)
        .then(result => console.log(`\n${result.info}`));
        
}

const promptAddEmployee = async () => {

    const roleChoices = await role.getRolesList();
    //console.log(roleChoices)
    const empChoices = await employee.getEmployeeList()

    return inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: `Enter the new employee's first name`
        },
        {
            type: 'input',
            name: 'last',
            message: `Enter the new employee's last name`
        },
        {
            type: 'list',
            name: 'role',
            choices: roleChoices,
            message: `Select the employee's new role`        
        },
        {
            type: 'list',
            name: 'manager',
            choices: empChoices,
            message: 'which employee will be their manager?'
        }
    ])
    .then((choices) => {
        return employee.addNewEmployee(choices)
            
    })
    .then(result => {
        if (result.affectedRows > 0) {
            
            return `\nSuccess! New ID is ${result.insertId}`;
        }

        return console.log("An error has occured");
         
    });
      
}

const promptNewRole = async () => {

    const deptChoices = await department.getDepartments();

    return inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            choices: deptChoices,
            message: 'Which department should this role belong to?'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the role title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: input => {
                if (isNaN(input)) {
                    console.log("You did not enter a valid salary")
                    return false;
                }

                return true;
            }
        }
    ])
    .then(choices => {
        return role.addNewRole(choices);
    })
    .then(result => {
        if (result.affectedRows > 0) {
            
            return `\nNew Role Created! ID is ${result.insertId}`;
        }
    
        return console.log("An error has occured");
    })
}

const promptNewDepartment = async () => {
    return inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new department?'
    })
    .then(choice => {
            //console.log(choice)
        return department.addNewDepartment(choice.deptName);
    })
    .then(result => {
        if (result.affectedRows > 0) {
            
            return `\nNew Department Created! ID is ${result.insertId}`;
        }
    
        return console.log("An error has occured");
    })
}

const listActions = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'mainAction',
            choices: actions,
            message: 'What would you like to do?'
        }
    )
        .then(action => {
            switch (action.mainAction) {
                case 100:
                    console.log('Exiting, see you again soon!')
                    break;
                case 1:
                    department.viewDepartments()
                        .then(result => {
                            console.log(`\n-----------------\nViewing All Departments`);
                            console.table(result)
                            listActions();
                        })
                    break;
                case 2:
                    role.viewRoles()
                        .then(result => {
                            console.log('Viewing all Roles')
                            console.table(result);
                            listActions();
                    })
                    break;
                case 3:
                    employee.viewEmployees()
                        .then(result => {
                            console.log('Viewing all Employees')
                            console.table(result);
                            listActions();
                    })
                    break;
                case 4:
                    promptNewDepartment().then(result => {
                        console.log(result);
                        listActions();
                    })
                    break;
                case 5:
                    promptNewRole().then(result => {
                        console.log(result);
                        listActions();
                    })
                    break;
                case 6:
                    promptAddEmployee().then((result) => {
                        console.log(result);
                        listActions()
                    })
                    break;
                case 7:
                    promptUpdateEmployee()
                        .then(() => listActions());
                    break;
                default:
                    console.log("This action is not valid, please try again");
                    listActions();
                    break;
            }
            //return listActions();
    })
}

listActions();
//promptAddEmployee();






// role.getRolesList()
//     .then(result => {
//         inquirer.prompt(
//             {
//                 type: 'list',
//                 name: 'role_id',
//                 choices: result,
//                 message: 'pick a role'
//             }
//         )
//             .then(choice => console.log(choice.role_id))
//     });



// department.getDepartments()
//     .then(result => {
//         inquirer.prompt(
//             {
//                 type: 'list',
//                 name: 'department',
//                 choices: result,
//                 message: 'pick a department'  
//             }
//         )
//         .then(choice => console.log(choice.department))
//     });

    
    