import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  subs: Subscription[] = [];
  public formGroup: FormGroup;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private srvAutentication: AutenticationService,
    private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formulario();
  }
  formulario() {
    const userCount = "gclaure_4";
    this.form = this.formBuilder.group({
      userName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password: ["",[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    });
  }
  login() {
    if (this.form.valid) { 
      console.log('valor form=', this.form.value);
      this.srvAutentication.login(this.form.value).subscribe(data => {
        var objUserAut = {
          user: data['userName'],
          token: data['token'],
        }
        localStorage.setItem('Autentication', JSON.stringify(objUserAut));  //add localstorage
        console.log('data=', data);
        //console.log('objuser=', objUserAut);
        this.router.navigate(['/']);
      }, error => {
        //console.log('Error', error);
        alert('Sorry, the username or password is incorrect');
      })
    }
  }

  openRegister(): void {
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '600px',
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }
  get userName() { return this.form.get('userName'); }
  get password() { return this.form.get('password'); }
}
