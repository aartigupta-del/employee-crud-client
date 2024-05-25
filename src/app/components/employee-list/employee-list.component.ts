import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  searchTerm: string = '';

  constructor(private router: Router,private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    }, error => {
      console.log('Error occurred while fetching employees.', error);
    });
  }

  deleteAllEmployees(): void {
    if (confirm('Are you sure you want to delete all employees?')) {
      this.employeeService.deleteAll().subscribe(response => {
        console.log('All employees deleted successfully!', response);
        this.retrieveEmployees(); // Refresh employee list
      }, error => {
        console.log('Error occurred while deleting all employees.', error);
      });
    }
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  searchEmployees(): void {
    if (this.searchTerm.trim()) {
      this.employeeService.findByName(this.searchTerm.trim()).subscribe(data => {
        this.employees = data;
      }, error => {
        console.log('Error occurred while searching employees.', error);
      });
    } else {
      this.retrieveEmployees(); // If search term is empty, retrieve all employees
    }
  }

  deleteEmployee(id: number): void {
    this.employeeService.delete(id).subscribe(response => {
      this.retrieveEmployees();
    }, error => {
      console.log('Error occurred while deleting employee.', error);
    });
  }
  
}
