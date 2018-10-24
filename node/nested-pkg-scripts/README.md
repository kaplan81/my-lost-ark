# Nested Packages Scripts Module
> This little file will allow you to execute scripts on nested packages from a root/centralized package.json

## Case
You have a root package on a root folder and some other packages that are nested on subfolders.
But you need to rum many scripts from many of the nested packages and no time for go to every directory every single time.

## Usage
Let us say you want to run `npm install` on three subpackages.
First package is on a subfolder called package1, second package is on a subfolder called package2 and third package on a subfolder called package3.
Write something like this on your package.json:
```json
  "scripts": {
    "install-all": "npm run package1-install && npm run package2-install && npm run package3-install",
    "package1-install": "node nested-pkg-scripts.js package1 v0001 install",
    "package2-install": "node nested-pkg-scripts.js package2 v0001 start",
    "package3-install": "node nested-pkg-scripts.js package3 v0001 build"
  },
```
The only thing you need to do in order to achieve this is to run `npm run install-all`. That's it!
