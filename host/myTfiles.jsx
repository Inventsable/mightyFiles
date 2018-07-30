function recurseChildren(path) {
  var subFolders = getChildren(path, 'Folders');
  var subFiles = getChildren(path, 'Files');
  var children = [];
  if (subFolders) {
    for (var i = 0; i < subFolders.length; i++) {
      children.push(subFolders[i])
      children.push(recurseChildren(subFolders[i]));
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



// detectSubFolders(['Hello', ' there'], ['nice', 'to', 'see', 'you'])

// alert(setPath)

// function hasArray(arg){
//   var err = false;
//   for (var i = 0; i < arguments.length; i++){
//     if (args.constructor == Array)
//       err = args[i];
//   }
//   return err;
// }

// function readThisDirectory(){
//
// }


// function getChildFiles(path){
//   var thisFolder = Folder(path);
//   var children = thisFolder.getFiles();
//   var subFiles = [];
//   if (!children.length) {
//     return false;
//   } else {
//     for (var i = 0; i < children.length; i++) {
//       if ((/\/(\w|\d|\-)*\.(\w)*$/g.test(children[i])) || (/LICENSE/.test(children[i]))) {
//         subFiles.push(children[i]);
//       }
//     }
//     return subFiles;
//   }
// }
//
// function getChildFolders(path){
//   var thisFolder = Folder(path);
//   var children = thisFolder.getFiles();
//   var subFolders = [];
//   if (!children.length) {
//     return false;
//   } else {
//     for (var i = 0; i < children.length; i++) {
//       if ((/\/(\w|\-|\d)*$/g.test(children[i])) && !(/LICENSE/.test(children[i]))) {
//         subFolders.push(children[i]);
//       }
//     }
//     return subFolders;
//   }
// }

// function recurseFolder(path, depth){
//   var subFolders = getChildFolders(path);
//   var subFiles = getChildFiles(path);
//   if (subFolders) {
//     for (var i = 0; i < subFolders.length; i++) {
//
//     }
//   }
// }


// readDirectory(setPath);
//
// function readDirectory(path){
//   var subFolders = getChildFolders(path);
//   var subFiles = getChildFiles(path);
//   result = [];
//   if (subFolders) {
//     for (var i = 0; i < subFolders.length; i++) {
//       result.push(subFolders[i]);
//     }
//   }
//   if (subFiles) {
//     for (var i = 0; i < subFiles.length; i++) {
//       result.push(subFiles[i]);
//     }
//   }
//   if (!result.length) {
//     return false;
//   } else {
//     console.log(result);
//     return result;
//   }
// }




// function detectSubFolders(){
//   alert(arguments[0])
//   var thisFolder;
//   var subFolders = [];
//   if (arguments.length < 2) {
//     if (arguments[0].constructor == Array) {
//       for (var i = 0; i < arguments[0].length; i++){
//         thisFolder = Folder(arguments[0][i]);
//         subFolders = thisFolder.getFiles(/\/(\w)*$/g);
//         // if (/\/(\w)*$/g.test())
//         console.log(arguments[0][i]);
//       }
//       console.log('This is an array');
//     } else {
//       thisFolder = Folder(arguments[0]);
//       subFolders = thisFolder.getFiles(/\/(\w)*$/g);
//       // if (!subFolders.length) {
//       //   return false;
//       // } else {
//       //   for (var f = 0; f < subfolders.length; f++) {
//       //     console.log(subfolders[f]);
//       //   }
//       // }
//       // console.log(arguments[0]);
//       // console.log('This is a string');
//     }
//   } else {
//     console.log('Unsupported');
//   }
// }

// function detectFiles(arguments){
//
// }
