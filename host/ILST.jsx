var doc = app.documents[0];
var directory, setPath, setName, extFolder;
var extLocalFolder, extLocal;
var regFolder = /\/(\w)*$/g;
var regFile = /\/(\w|\d|\-)*\.(\w)*$/g;

var thisDoc = app.documents[0];
var activeAB = thisDoc.artboards.getActiveArtboardIndex();

function getName(){
  return app.documents[0].name;
}

function setDirectory(path){
  setPath = path;
  extFolder = Folder(path);
  extLocalFolder = setPath.match(/\/(\w)*$/, 'g')
  extLocal = extLocalFolder[0]
  extLocal = extLocal.substring(1, extLocal.length);
  // console.log(extLocal);
}

function localize(path) {
  var regEx = new RegExp(extLocal + '\/(\w|\-|\.)*$', 'g');
  if (regEx.test(path)) {
    var result = path.match(regEx);
    var localResult = result[0];
    var localPath = localResult.replace(extLocal, '.');
    return localPath;
  } else {
    return false;
  }
}

// function setParentExt(name) {
//
// }
//
// function getParentExt() {
//
// }



function recurseFolder(path, depth, array) {
  var parentFolder = Folder(path);
  var subFolder, subFile;
  var theseElements = parentFolder.getFiles();
  if (!theseElements.length) {
    // console.log('Empty directory.');
    return;
  } else {
    for (var i = 0; i < theseElements.length; i++) {
      var thisElement = localize(theseElements[i]);
      console.log(thisElement);
      if (/\/(\w)*$/g.test(theseElements[i])) {
        if (/LICENSE/.test(theseElements[i])) {
          console.log('This is a license: ');
          // array.push();
        } else {
          console.log('This is a folder: ');
          subFolder = theseElements[i];
          // array.push(recurseFolder(theseElements[i], depth++, array));
          // recurseFolder(theseElements[i], depth++, array)
        }
      } else if (/\/(\w|\d|\-)*\.(\w)*$/g.test(theseElements[i])) {
        console.log('This is a file: ');
        subFile = theseElements[i];
        // array.push(localize(subFile));
      } else {
        console.log('Unrecognized');
      }
      console.log(theseElements[i]);
    }
  }
  console.log(array);
  return array;
}



var regResult = regex.exec('ext/parent/child');
// alert(regResult[0])
// console.log(regResult[0]);

// regex = new RegExp('\/(\w)*$', 'g');
// console.log(regex.test('/hello'));

function readDirectoryTotal(path){
  var extFolder = Folder(path);
  var setFile = setFolder.getFiles("*.svg");
  if ( !setFile.length ) {
    // alert("No files");
    return;
  } else {
    for (var i = 0; i < setFile.length; i++) {
      // setFile[i].remove();
    }
  }
}

function deleteFolder(path) {
  var thisFolder = Folder(path);
  try {
    thisFolder.remove();
    return true;
  } catch(e){return false;}
}

function verifyFile(name){
  var newFile = File(setPath + "/" + name + ".svg");
  try {newFile.open('r');
    } catch(e){alert(e)};
  var contents = newFile.read();
  return contents;
}

function clearSet(){
  var setFolder = Folder(setPath);
  var setFile = setFolder.getFiles("*.svg");
  if ( !setFile.length ) {
    // alert("No files");
    return;
  } else {
    for (var i = 0; i < setFile.length; i++) {
      setFile[i].remove();
    }
  }
}
