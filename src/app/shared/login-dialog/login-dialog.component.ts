import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AuthService } from 'app/user/auth.service';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'csbc-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm = this.fb.group({
    userName: new FormControl(''),
  password: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }
  onCancelClick() {
    this.dialogRef.close();
  }
  onSubmitClick() {
    console.log(this.loginForm);
    if (this.validate(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value, )) {
      this.dialogRef.close();
    }
  }
  validate(userName: string, password: string) {
    const user = this.authService.login(userName, password);
    console.log(user);
    return true;
  }
}
