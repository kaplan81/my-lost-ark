# Angular 2 AOT + Webpack 2 starter
> An Angular 2 with Webpack 2 starter featuring Ahead-Of-Time (AOT) compilation with Typescript, Lazy Loading, Tree Shaking and Bootstrap 4 plus Animate CSS styling.

<br>

## Prerequisites
Have Node JS version >= 5.0 and NPM >= 3 installed. It is recommended to use Node LTS version 6.9.1 though.

## Up and running
Clone the repo or download the zip and in your project folder run these commands:
```bash
npm install
npm start
```
Then you can launch your web browser (Chrome recommended) and type:

`http://localhost:9090/`

This kind of start is going to run your application in memory (not in hard drive) with the Webpack Dev Server. It is a Just-In-Time (JIT) compilation and it is perfect for developing because it watches your changes and recompiles.

Please notice that this installation is setting an example on Angular 2 good practices and focuses its efforts (for now) on deploying and compiling which means every test file tasks reference has intentionally been removed from it to educational purposes. However all the tools you need to run tests have been included in `package.json` in case you wish to extend/improve this file structure but beware you might be bounded to install tools like Karma and Protractor globally. And same goes for Sass implementation.

**CAREFUL**: DO NOT update `package.json` versions neither on Angular (including its libraries such as http or forms) nor on its Router (so everything that is included in a `@angular` folder) since our Webpack loader for Angular 2 with Lazy Loading breaks AOT compilation on versions higher than 2.1.0 (Angular) and 3.1.0 (Router).

## Development environment: JIT compilation
```bash
npm run build
npm run serve
```
First command builds your application in JIT mode. Typescript Compiler (tsc) generates a Javascript output that includes the Angular Template Compiler. You can find JIT output in the `./dist` folder.

Second command serves your application on default port (8080) and opens a tab in your default web browser.

Or you could just run both like this:
```bash
npm run start:jit
```

## Production environment: AOT compilation
```bash
npm run build:aot
```
This command builds your application in AOT mode. Angular Compiler (ngc) generates a Typescript output (factories) that goes to the `./aot` folder and from those it also creates a precompiled Javascript output that goes to the `dist-aot/unbundled-aot` folder. But you will not be using those files. Instead of that this command also runs a custom Typescript compilation with tsc from those ngfactory.ts files. That way problems with Lazy Loading are avoided. 

Because you will not be using `dist-aot/unbundled-aot` content you remove the folder recursively:
```bash
npm run clean:unbundled
```
And finally serve the application on port 7070 and open a tab in your default web browser:
```bash
npm run serve:aot
```
But you can also run all three commands like this:
```bash
npm run start:aot
```
You can find final AOT output in the `./dist-aot` folder.
## Related documentation
[Slides from my conference](http://slides.com/agesteira/ng2-aot-wp2#/)

[angular.io: Webpack: an introduction](https://angular.io/docs/ts/latest/guide/webpack.html)

[angular.io: Ahead-Of-Time Compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)

[angular.io: HTTP client (the Wikipedia example)](https://angular.io/docs/ts/latest/guide/server-communication.html#!#cors)

## License
Google MIT License

Good coding!

