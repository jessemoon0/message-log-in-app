import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//App Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";


//Auth Components
import { AuthenticationComponent } from "./auth/authentication.component";


//Services app wide
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';
//Our routes import
import { routing } from "./app.routing";

//Http Module
import { HttpModule } from '@angular/http';
//Error Component
import { ErrorComponent } from "./errors/error.component";
//Message Module
import { MessageModule } from './messages/message.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    //Check routing import
    imports: [BrowserModule,
              routing,
              HttpModule,
              MessageModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
