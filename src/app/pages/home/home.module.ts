// CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/modules/material.module';

// PAGE & COMPONENTS
import { HomePage } from './home.page';

const routes: Routes =
    [
       { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
            path: '',
            component: HomePage,
            children: [
              {
                path: 'posts',
                loadChildren: () => import('@app/pages/home/posts/posts.module').then(m => m.PostsPageModule)
              },
              {
                path: 'post-detail/:id',
                loadChildren: () => import('@app/pages/home/postDetail/postDetail.module').then(m => m.PostDetailPageModule)
              },
              {
                path: 'admin',
                loadChildren: () => import('@app/pages/home/admin/admin.module').then(m => m.AdminPageModule)
              }
            ]
        },

    ];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomePage]
})

export class HomePageModule { }
