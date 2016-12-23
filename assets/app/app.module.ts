import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

//App Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";
//Messages Components
import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessagesComponent } from "./messages/messages.component";

//Auth Components
import { AuthenticationComponent } from "./auth/authentication.component";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";

//Services app wide
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';
//Our routes import
import { routing } from "./app.routing";

//Http Module
import { HttpModule } from '@angular/http';
//Error Component
import { ErrorComponent } from "./errors/error.component";

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        ErrorComponent
    ],
    //Check routing import
    imports: [BrowserModule,
              FormsModule,
              routing,
              ReactiveFormsModule,
              HttpModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
