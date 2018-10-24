import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WikipediaService } from './wikipedia.service';

@Component({
    templateUrl: './wikipedia.component.html'
})
export class WikipediaComponent implements OnDestroy {
    items: any;
    titles: string[];
    urls: string[];

    private searchTermStream = new Subject<string>();

    constructor (private wikipediaService: WikipediaService) {
        this.titles = [];
        this.urls = [];
        this.items = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.wikipediaService.search(term));
    }

    ngOnDestroy() {
        this.searchTermStream.unsubscribe();
    }

    search(term: string) {
        this.searchTermStream.next(term);
        this.items.subscribe( (response: any) => {
            this.titles = response[1];
            this.urls = response[3];
        });
    }
}
