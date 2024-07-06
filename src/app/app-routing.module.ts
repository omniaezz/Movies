import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { authGuard } from './auth.guard';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[authGuard], component:HomeComponent},
  {path:'people',canActivate:[authGuard], component:PeopleComponent},
  {path:'movies',canActivate:[authGuard], component:MoviesComponent},
  {path:'tv',canActivate:[authGuard], component:TvShowsComponent},
  {path:'details/:id/:media',canActivate:[authGuard], component:MovieDetailsComponent},

  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
