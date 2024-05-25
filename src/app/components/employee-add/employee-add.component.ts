import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;

  constructor(private router: Router,private employeeService: EmployeeService, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  saveEmployee(): void {
    this.employeeService.create(this.employeeForm.value).subscribe(response => {
      console.log('Employee created successfully!', response);
      this.router.navigate(['/employees']);
    }, error => {
      console.log('Error occurred while creating employee.', error);
    });
  }
}
