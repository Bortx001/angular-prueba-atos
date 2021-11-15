// CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/modules/material.module';

// PIPES
import { AppPipesModule } from '@app/pipes/pipes.module';

// PAGE & COMPONENTS
import { PostsPage } from './posts.page';
import { AppNoDataModule } from '@app/components/noData/noData.module';
import { AppNoDataComponent } from '@app/components/noData/noData.component';

const routes: Routes =
    [
        {
            path: '',
            component: PostsPage
        },

    ];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AppPipesModule,
        AppNoDataModule,
        RouterModule.forChild(routes)
    ],
    entryComponents: [ AppNoDataComponent ],
    declarations: [PostsPage]
})

export class PostsPageModule { }
