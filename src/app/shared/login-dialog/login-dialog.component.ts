import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AuthService } from 'app/user/auth.service';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'csbc-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });
  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  onCancelClick() {
    this.dialogRef.close();
  }
  onSubmitClick() {
    if (
      this.validate(
        this.loginForm.controls['userName'].value,
        this.loginForm.controls['password'].value
      )
    ) {
      this.dialogRef.close();
    }
  }
  validate(userName: string, password: string) {
    const user = this.authService.login(userName, password);
    console.log(user);
    return user !== undefined;
  }
}
