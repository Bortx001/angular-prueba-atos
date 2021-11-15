import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/material.module';

// PIPES
// import { AppPipesModule } from '@app/pipes/pipes.module';

// COMPONENT
import { AppNoDataComponent } from './noData.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    AppNoDataComponent
  ],
  exports: [
    AppNoDataComponent
  ]
})
export class AppNoDataModule { }
