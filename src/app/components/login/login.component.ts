import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { EmployeeService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/interfaces/employee.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  employee: Employee = {
    administrator: false,
    birthday: new Date(),
    education: '',
    email: '',
    firstLastName: '',
    maritalStatus: '',
    name: '',
    password: '',
    rfc: '',
    salary: 0,
    secondLastName: '',
  };

  userFormControl = new FormGroup({
    email: new FormControl('luis@gmail.com', [Validators.required]),
    password: new FormControl('luis123', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('token', '');
  }

  async login() {
    var res: LoginResponse = await this.loginService.login({
      email: this.userFormControl.controls.email.value!,
      password: this.userFormControl.controls.password.value!,
    });

    if (res) {
      localStorage.setItem('token', res.token);
      alert('Bienvenido ' + this.employee.name + '!');
      this.router.navigateByUrl('home');
    }
  }

  async getEmployee(id: number) {
    this.employee = await this.employeeService.getEmployee(id);
  }
}
