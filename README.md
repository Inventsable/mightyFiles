## mightyFiles

Testing mechanics for a treeview menu, reading all files and folders of a directory:

```javascript

readChildren(rootFolder);

function readChildren(path) {
  var subFolders = getChildren(path, 'Folders');
  var subFiles = getChildren(path, 'Files');
  var children = [];
  if (subFolders) {
    for (var i = 0; i < subFolders.length; i++) {
      children.push(subFolders[i])
      children.push(readChildren(subFolders[i]));
    }
  }
  if (subFiles) {
    for (var i = 0; i < subFiles.length; i++) {
      children.push(subFiles[i]);
    }
  }
  if (!children.length) {
    return false;
  } else {
    return children;
  }
}


function getChildren(path, type){
  var thisFolder = Folder(path);
  var children = thisFolder.getFiles();
  var subs = [];
  if (!children.length) {
    return false;
  } else {
    for (var i = 0; i < children.length; i++) {
      switch (type) {
        case 'Folders':
          if ((/\/(\w|\-|\d)*$/g.test(children[i])) && !(/LICENSE/.test(children[i])))
            subs.push(children[i]);
          break;
        case 'Files':
          if ((/\/(\w|\d|\-)*\.(\w)*$/g.test(children[i])) || (/LICENSE/.test(children[i])))
            subs.push(children[i]);
          break;
        default:
          subs.push(children[i]);
          break;
      }
    }
    return subs;
  }
}
```
