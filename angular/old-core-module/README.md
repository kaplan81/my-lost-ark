# My Core Module
> Configuratons and services that I would always put in an Angular Core Module.

<br>

One of the modules we should always import in our Angular AppModuule is the CoreModule.
This module contains app-wide singleton providers and only-used-once components/directives.
It should only be imported in AppModule and that is why the constructor checks if there are parent modules importing it:
```typescript
constructor(@Optional() @SkipSelf() parentModule: CoreModule)
```
And throws an error when that happens:
```typescript
if (parentModule) {
    throw new Error('CoreModule is already loaded. Import it in the AppModule ONLY');
}
```

## CoreConfig
One of the utilities that this module can provide and resembles de former Angular JS constants is the CoreConfig.
This is an optional class that we can pass to the constructor of the CoreService. We don't declare that class with the @Injectable decorator since it is going to be part of the providers array within an static method called `.forRoot()` that belongs to the CoreModule:
```typescript
public static forRoot(config: CoreConfig): ModuleWithProviders {
    return {
        ngModule: CoreModule,
        providers: [{ provide: CoreConfig, useValue: config }]
    };
}
```
As a `config` we can pass any value to the AppModule. For instance:
```typescript
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CoreModule.forRoot({
            someApiUrl: '/api/service/parameter'
        }),
        // Other Modules
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
That way if the endpoint for my API changes I just have to change it in AppModule.
To retrieve that string ('/api/service/parameter') and use it in a component, we just need to import the CoreService and use it:
```typescript
import { CoreService } from './../core/core.service';

@Component({
    /*...*/
})
export class MyComponent {
    constructor(private coreService: CoreService) {
        this.apiUrl = coreService.someApiUrl;
    }
}
```
This is exactly what I do with navigationRoutes. These are specified in navigation-routes.model.ts and can be passed to the AppModule in the same way as explained before:
```typescript
CoreModule.forRoot({
    someApiUrl: '/api/service/parameter'
    navigationRoutes: {
        firstPath: {
            root: 'first-root-path',
            subPaths: {
                subPath1: 'page1',
                subPath2: 'page3',
                subPath3: 'page3'
            }
        },
        secondPath: {
            /*...*/
        },
        thirdPath: {
            /*...*/
        }
    }   
})
```
I find this pretty useful for injecting navigation routes in the components but I encourage you to find other cases to use the .forRoot() CoreConfig in order to suit the needs of your project.

## WindowRef
Since in Angular is agnostic from the platform it gets deployed to we shouldn't directly use any browser window objects.
This is the reason why we wrap it in an @Injectable that we can later call this way:
```typescript
constructor(private windowRef: WindowRef) {
    this.windowLocation = windowRef.nativeWindow.location;
}
```

## EmitterService
In Angular Component Interaction we can pass data in two ways:
1. From parent component to child component through the @Input() binding.
2. From child component to parent component through the @Output() binding.

The latter emits an event by using the Angular EventEmitter class. But there is a problem: what if we want to pass data not only to direct relatives but also to any kind of siblings? Then is when we get in trouble.

Well, this simple service achieves just that:
```typescript
@Injectable()
export class EmitterService {
    private emitters: { [id: string]: EventEmitter<any> } = {};

    get(id: string): EventEmitter<any> {
        if (!this.emitters[id]) 
            this.emitters[id] = new EventEmitter();
        return this.emitters[id];
    }
}
```
The get() medthod looks for a certain event that has been emitted by EventEmitter and if it doesn't exist it just creates it so it always returns the `emitter`.
This utility has multiple use cases resolves succeeds where the standard Angular logic fails.

Happy coding!