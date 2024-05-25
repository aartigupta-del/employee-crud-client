import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  currentEmployee: any;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    const idParam = this.route.snapshot.paramMap?.get('id');
    this.id = idParam ? +idParam : 0;
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getEmployee(this.id);
  }

  getEmployee(id: number): void {
    this.employeeService.get(id).subscribe(data => {
      this.currentEmployee = data;
      this.employeeForm.patchValue({
        name: this.currentEmployee.name,
        salary: this.currentEmployee.salary,
        department: this.currentEmployee.department
      });
    }, error => {
      console.log('Error occurred while fetching employee details.', error);
    });
  }

  updateEmployee(): void {
    this.employeeService.update(this.id, this.employeeForm.value).subscribe(response => {
      console.log('Employee updated successfully!', response);
      this.router.navigate(['/employees']);
    }, error => {
      console.log('Error occurred while updating employee.', error);
    });
  }
}
