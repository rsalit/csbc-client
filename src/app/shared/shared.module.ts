import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { CoreModule } from 'app/core/core.module';
import { PageNotFoundComponent } from 'app/app.not-found.component';


@NgModule({
  imports: [CommonModule, FormsModule, CoreModule],
exports: [CommonModule, FormsModule],
  declarations: [LoginDialogComponent, PageNotFoundComponent],
  entryComponents: [LoginDialogComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class SharedModule {}
