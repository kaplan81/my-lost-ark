import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { WikipediaRoutingModule } from './wikipedia-routing.module';
import { SharedModule } from './../shared/shared.module';
import { WikipediaService } from './wikipedia.service';
import { WikipediaComponent } from './wikipedia.component';

@NgModule({
    declarations: [WikipediaComponent],
    imports: [JsonpModule, WikipediaRoutingModule, SharedModule],
    exports: [WikipediaComponent],
    providers: [WikipediaService]
})
export class WikipediaModule { }
