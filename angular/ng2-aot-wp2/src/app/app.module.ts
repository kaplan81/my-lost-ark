import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
// If lazy loaded shoudn't be declared on app.module.ts
// import { DashboardModule } from './+dashboard/dashboard.module';
// import { WikipediaModule } from './+wikipedia/wikipedia.module';
import { NotFoundModule } from './not-found/not-found.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HomeModule,
        // DashboardModule,
        // WikipediaModule,
        NotFoundModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
