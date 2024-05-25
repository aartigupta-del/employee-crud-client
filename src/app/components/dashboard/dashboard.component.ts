import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  employees: any;
  totalEmployees: number=0;
  totalSalary: number=0;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
      this.calculateMetrics();
    }, error => {
      console.log('Error occurred while fetching employees.', error);
    });
  }

  calculateMetrics(): void {
    this.totalEmployees = this.employees.length;
    this.totalSalary = this.employees.reduce((sum: number, employee: any) => sum + employee.salary, 0);
  }
}
