import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml } from './safeHtml.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SafeHtml
  ],
  exports: [
    SafeHtml
  ]
})
export class AppPipesModule { }
