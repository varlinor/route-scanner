# Change Log


## v0.2.2
Add Koa2 support.

* add option `framework` to specify which framework do you chose.

## v0.2.1
Fix the bug that registered route has double `//` as first two string.

## v0.2.0
Scan function has changed, add support for multi-level directories,
changed configuration field, details below:

* deleted options `specialMap`, `exceptMap`;
* add options `replacePaths`: just for custom define rules to change url
  mapping.
* add option `extraMaps`: used to add other route files path, multiple
  directories are possible;
* add option `debug`: used to print scan logs.

PS: after support for multi-level directories, it can be simulated as
dynamic routing for multiple micro-services.


## v0.1.0
Initial version, just support path scan, url replace, special file
mapping.