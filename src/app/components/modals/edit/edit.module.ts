// CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/material.module';
import { RouterModule } from '@angular/router';


// COMPONENTS
import { EditDialogComponent } from './edit.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    EditDialogComponent
  ],
  exports: [
    EditDialogComponent
  ]
})
export class EditDialogComponentModule { }
