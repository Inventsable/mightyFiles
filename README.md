## mightyFiles

Testing mechanics for a treeview menu, reading all files and folders of a directory:

![testing tree menu](https://thumbs.gfycat.com/CalmTidyDesertpupfish-size_restricted.gif)

Returning the contents of root directory as an object:

![console result](https://i.imgur.com/FyaAra4.png)

```javascript
// .JSX
function readFullDirectory(path){
  var mirror = {}
  var f = Folder(path);
  var allFiles = f.getFiles();
  var thisFile;
  for (var i = 0; i < allFiles.length; i++) {
    var name = this;
    thisFile = allFiles[i];
    if (thisFile instanceof Folder) {
      mirror[thisFile.name] = readFullDirectory(thisFile);
    } else {
      mirror[thisFile.name] = thisFile;
    }
  }
  return JSON.stringify(mirror);
}
```

```javascript
// .JS
csInterface.evalScript(`readFullDirectory('${sysPath}')`, function(mirror){
  var root = parseAll(mirror);
  console.log(root);
});

function parseAll(str){
  var result = JSON.parse(str);
  for (let [key, value] of Object.entries(result)) {
    if (typeof value !== 'object') {
      result[key] = parseAll(value);
    } else {
      result[key] = key;
    }
  }
  return result;
}
```
