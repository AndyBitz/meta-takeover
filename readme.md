# Meta Takeover

This little program will copy the `birthtime`, `mtime` and `ctime` to another directory or file. If you specify two directories the program will recursivley change all files and directories with the same names and relative paths.


## Usage

**Install:**

```bash
npm i -g meta-takeover
```

**Use:**

```bash
takeover /source/directory /destination/directory
```

**Note:**

> Directories and files that will be ignored:
> * `node_modules`
> * `.git`

> Arguments must be either two folders or two files


## Example

Take these two folders for example:

```
Directory: /users/jack/documents

birth                 access                modification          change
1990-12-31 12:00:00   2015-04-31 19:15:00   1990-12-31 12:00:00   2015-04-31 19:15:00
```

```
Directory: /users/joey/documents

birth                 access                modification          change
2018-01-01 16:00:00   2018-01-01 16:30:00   2018-01-01 16:30:00   2018-01-01 16:30:00
```

Imagine you copied jacks documents folder to joeys folder, but you did it in a way that did not copy the timestamps. Now, as you know joey, you know that he cares a lot about those things, so you need to fix it.

By running `takeover /users/jack/documents /users/joey/documents` birth, access and modification from jacks documents will get copied over to joeys documents without changing any file contents.

Note that every file that exists in both directories will be used. So if joey deletes something or creates a new file before you ran `takeover`, it'll just be ignored.

Also note that this is recursive. Every folder that exists in both folders and all files within that one and so on will be used as well.


## Why

Had a dying hard-drive that went slow. I wrote a script that used node streams to copy every file to another disk since they were somehow faster than `robocopy`. While doing so every file got created as a new file. This tool was created to copy all of the timestamps to that new disk.


## Contribute

If there is a chance that you need this tool or want to add more features. Feel free to do so by opening issues and pull-requests.


## Testing

`npm run reset` will give each file and folder in `test/old-struct` and `test/new-struct` fixed timestamps.
`npm test` will copy all timestamps from `old-struct` to `new-struct`.
Files that are supposed to be ignored (`node_modules`, `.git`, and singular files) should not change.
