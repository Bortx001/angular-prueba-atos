// CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/modules/material.module';

// PIPES
import { AppPipesModule } from '@app/pipes/pipes.module';

// PAGE & COMPONENTS
import { PostDetailPage } from './postDetail.page';

const routes: Routes =
    [
        {
            path: '',
            component: PostDetailPage
        },

    ];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AppPipesModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PostDetailPage]
})

export class PostDetailPageModule { }
