import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/services/autentication.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  private onlyletters: any = /^([A-ZÑÁÉÍÓÚa-zñáéíóú]+[\s]*)+$/;
  constructor(
    private fBuilder: FormBuilder,
    private routes: Router,
    private srvAut: AutenticationService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario() {
    this.form = this.fBuilder.group({
      userName: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      firstName: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this.onlyletters)]],
      lastName: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this.onlyletters)]]
    });
  }

  save() {    
    if (this.form.valid) { 
      this.srvAut.registerUser(this.form.value).subscribe(data=> {
        console.log('data=', data);
        if(data['status'] == true) {
          alert(data['message']);
          this.closeDialog();
        } else {
          alert(data['message']);
          this.form.get('userName').setValue('');
        }
      }, error => {
        console.log('error=', error);
      });
    }
  }
  closeDialog(){
    this.matDialog.closeAll();
  }

  get userName() { return this.form.get('userName'); }
  get password() { return this.form.get('password'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
}
