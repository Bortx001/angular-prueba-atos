import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialModule } from '@app/modules/material.module';
import { RouterTestingModule } from '@angular/router/testing';

/* SERVICES */
import { UsersService } from '@app/services/users/users.service';
import { PostsService } from '@app/services/posts/posts.service';

/* COMPONENT */
import { HomePage } from './home.page';

/* MOCKS */
import getAllPosts from 'assets/data/mocks/allPosts.json';
import detailPost1 from 'assets/data/mocks/detailPost1.json';
import { DebugElement } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { PostsPage } from './posts/posts.page';

describe('HomePage', () => {
  let httpController: HttpTestingController;
  let url = 'https://jsonplaceholder.typicode.com';
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let debugElement: DebugElement;
  let router: Router;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes(routes) 
      ], 
      providers: [UsersService, PostsService],
      declarations: [
        HomePage
      ],
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
});

  /* SHOULD */
  it('** COMPONENT ** Should create the app', async(() => {
    const app = debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('** COMPONENT ** UserService should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
   });

   it('** COMPONENT ** PostsService should be created', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service).toBeTruthy();
   });

  it('** DOM ** Footer should render @ 2021 Angular Prueba Atos', async(() => {
    fixture.detectChanges();
    const compiled = debugElement.nativeElement;
    expect(compiled.querySelector('.copyright p').textContent).toContain('© 2021 Angular Prueba Atos');
  }));

   it('** SERVICES ** UserService should have getData function', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service.getAllUsers).toBeTruthy();
   });

   it('** SERVICES ** PostsService should have getData function', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service.getAllComments).toBeTruthy();
   });

  it('** SERVICES **  Should call getAllPosts and return data', () => {
    const service: PostsService = TestBed.get(PostsService);
    service.getAllPosts().subscribe((res) => {
      expect(res).toEqual(getAllPosts);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/posts`,
    });

    req.flush(getAllPosts);
  });

  it('** SERVICES **  should call getPostDetail and return the detail', () => {
    const id = 1;
    const service: PostsService = TestBed.get(PostsService);
    service.getPostDetail(id).subscribe((res) => {
      expect(res).toEqual(detailPost1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/posts/${id}`,
    });

    req.flush(detailPost1);
  });

  it('** ROUTER ** Navigate to Posts', async(() => {
    const fixture = TestBed.createComponent(HomePage);
    const postPage = fixture.componentInstance;
    spyOn(router, 'navigate');
    postPage.nav('/home/posts');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/home/posts']);
  }));

  it('** ROUTER ** Navigate to Admin', async(() => {
    const fixture = TestBed.createComponent(HomePage);
    const postPage = fixture.componentInstance;
    spyOn(router, 'navigate');
    postPage.nav('/home/admin');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/home/admin']);
  }));

  it('** ROUTER ** Navigate to post-detail', async(() => {
    const fixture = TestBed.createComponent(HomePage);
    const postPage = fixture.componentInstance;
    const id = 1;
    spyOn(router, 'navigate');
    postPage.nav(`/home/post-detail/${id}`);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([`/home/post-detail/${id}`]);
  }));

  // http://localhost:4200/#/home/post-detail/1
});