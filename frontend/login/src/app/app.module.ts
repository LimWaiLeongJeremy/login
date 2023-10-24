import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { AuthGuard } from "./authentication/auth.guard";
import { AuthInterceptor } from "./authentication/auth.interceptor";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { LoginService } from './service/login/login.service';
import { HeaderComponent } from './component/header/header.component';
import { ForbiddenPageComponent } from './component/forbidden-page/forbidden-page.component';


const routes: Routes = [
  {
    path: '',
    title: 'Login Page',
    component: LoginPageComponent,
  },
  {
    path: 'login',
    title: 'Login Page',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    title: 'Home Page',
    component: HomePageComponent,
  },
  {
    path: 'admin',
    title: 'Admin Page',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin']},
  },
  {
    path: 'forbidden',
    title: 'Forbidden Page',
    component: ForbiddenPageComponent,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AdminPageComponent,
    HeaderComponent,
    ForbiddenPageComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    InputTextModule,
    MenubarModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
