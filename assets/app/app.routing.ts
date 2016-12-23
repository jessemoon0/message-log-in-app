//Import Routes and RouterModule
import { Routes, RouterModule } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";

//You use a component for each route. Each route is a JS object in an array
const APP_ROUTES: Routes = [
  ///If we take off the '/' in the redirection, would always append messages
  //to the last part of the route (ex: localhost/user/messages). Thats why
  //we use an absolute path. Pathmatch: full is so the empty path
  //doesnt match everything (which is how routes behave).
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  //This is localhost/auth
  //Children registers all auth routes as childs. Lazy Loading usage.
  { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

//Make Angular2 aware of our routes. We import in app.module.ts
export const routing = RouterModule.forRoot(APP_ROUTES);
