import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employeeFormControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstLastName: new FormControl('', [Validators.required]),
    secondLastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    birthday: new FormControl<Date | undefined>(undefined, [Validators.required]),
    rfc: new FormControl('', [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    administrator: new FormControl<boolean>(false, [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    
  }

}
