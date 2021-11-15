// CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/modules/material.module';

// PIPES
import { AppPipesModule } from '@app/pipes/pipes.module';

// PAGE & COMPONENTS
import { AdminPage } from './admin.page';
import { EditDialogComponent } from '@app/components/modals/edit/edit.component';
import { EditDialogComponentModule } from '@app/components/modals/edit/edit.module';
import { NewDialogComponent } from '@app/components/modals/new/new.component';
import { NewDialogComponentModule } from '@app/components/modals/new/new.module';

const routes: Routes =
    [
        {
            path: '',
            component: AdminPage
        },

    ];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AppPipesModule,
        EditDialogComponentModule,
        NewDialogComponentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AdminPage],
    entryComponents: [ EditDialogComponent, NewDialogComponent],
})

export class AdminPageModule { }
