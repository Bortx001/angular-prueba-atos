// CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/material.module';
import { RouterModule } from '@angular/router';


// COMPONENTS
import { NewDialogComponent } from './new.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    NewDialogComponent
  ],
  exports: [
    NewDialogComponent
  ]
})
export class NewDialogComponentModule { }
