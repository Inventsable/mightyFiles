var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

loadUniversalJSXLibraries();
// console.log(`Loading for ${appName}`);
// console.log(appName);
loadJSX(`${appName}.jsx`);
csInterface.evalScript(`setDirectory('${sysPath}')`);
loadJSX(`myTfiles.jsx`);

var tree = {
  build : function(arg) {
    console.log(arg);
  },
  reset : function(e) {
    for (let [key, value] of Object.entries(tree)) {
      if ((key === 'build')|(key === 'send')|(key === 'reset')) continue;
      delete tree[key];
    }
  },
  request : function(path) {
    csInterface.evalScript(`recurseChildren('${path}')`, function(e){
      // console.log(e);
      var name = extFolder();
      var treeView = false;
      var regEx = new RegExp(`(\\w|\\-|\\.|\/|\~)*\/` + name + '[^\\.]', 'g');
      var results = e.replace(regEx, '.\/');
      if (!results.length) {
        console.log('failure');
      } else {
        var fileArray = [];
        treeView = results.split(',');
        for (var e = 0; e < treeView.length; e++) {
          if ((/\/(\w|\-|\d)*$/g.test(treeView[e])) && !(/LICENSE/.test(treeView[e]))) {
            var treeFolders = treeView[e];
            var match = treeFolders.match(/\/(\w|\.|\-|\_)*/g);
            var depth = match.length;
            // console.log("depth is: " + depth);
            if (!match.length) {
              console.log("Failed");
            } else {
              var thisPath = strReplace(match.toString(), ',');
              assignFolder(depth, thisPath)
            }
          } else if ((/\/(\w|\d|\-)*\.(\w)*$/g.test(treeView[e])) || (/LICENSE/.test(treeView[e]))) {
            var treeFiles = treeView[e];
            var match = treeFiles.match(/\/(\w|\.|\-|\_)*/g);
            var depth = match.length;
            // console.log(match);
            // console.log(depth);
            // console.log("depth is: " + depth);
            // var thisFile = [match, depth];
            fileArray.push(match)
            // if (!match.length) {
            //   console.log("Failed");
            // } else {
            //   var thisPath = strReplace(match.toString(), ',');
            //   console.log(thisPath);
            //   getParent(depth, thisPath);
            // }
            // getParent(thisPath);

            // console.log('this is a file:');
          }
          // console.log(treeView[e]);
        }
        // console.log(tree);
        console.log(fileArray);
        assignFiles(fileArray);
      }
      // tree.build(treeView);
    });
  }
};


function assignFiles(array){
  if (array.constructor == Array) {
    array.shift('.')
    // console.log('This is an array');
    for (var i = 0; i < array.length; i++) {
      // console.log(array[i]);
      var match = array[i];
      var depth = array[i].length;
      // match.shift('');
      var fullPath = '.' + strReplace(match.toString(), ',');
      console.log(fullPath);
      // fullPath = trimL(fullPath, 1);
      // console.log(tree);
      var result = getParentAlt(fullPath);
      // console.log(result);
    }
  }
}


function assignFolder(depth, str){
  var match = str.split('/');
  var thisChild = match[depth];
  var prefix = new RegExp('(((\\/)(\\w){1,})|(\.)){' + depth + '}\\/*' + thisChild );
  var thisPath = str.match(prefix);
  thisPath = '.' + thisPath[0];
  console.log('Directory found: ' + thisPath);
  var whereTo = setParent(thisPath);
}


function getParentAlt(path){
  var parent = tree;
  path.split('/').forEach(function(v,i,a){
    if (i < 1) {
      // console.log(tree);
      parent = tree;
    } else if (i == (a.length - 1)) {
      // parent[v] = {};
      var last = (a.length - 2);
      var lastFolder = a[last];
      if (lastFolder == '.') {
        parent = tree;
      } else {
        parent = parent[lastFolder];
      }
      console.log(v + ' is a file at ' + lastFolder);
      // console.log(parent);
    } else {
      // parent = parent[v]
      // console.log('parent is ' + parent);
    }
  });
  console.log(parent);
  return parent;
}


function setParent(thisPath){
  var parent;
  thisPath.split('/').forEach(function(v,i,a){
    if (i < 1) {
      parent = tree;
    } else {
      parent[v] = {};
      parent = parent[v]
      // console.log(tree);
    }
  });
  return parent;
}


tree.request(sysPath);
console.log(tree);



// function getParent(depth, str){
//   var parent = tree;
//   var thisFile;
//   // console.log(parent);
//   console.log(depth + " depth with " + str);
//
//   str.split('/').forEach(function(v,i,a){
//     var thisLevel;
//     thisFile = a[(a.length - 1)]
//     console.log(thisFile);
//     if (depth < 2) {
//       // parent = tree;
//       thisLevel = tree;
//     } else if (depth <= 2) {
//       thisLevel = a[(i - 1)];
//     } else if (depth > 2) {
//       thisLevel = a[(i - 1)];
//       // parent = parent[thisLevel]
//     }
//     console.log('this level is: ' + v + ' ' + thisLevel);
//   });
//   console.log(parent);
//   return parent;
// }


// if (i < 1) {
//   parent = tree;
// } else if (i == (a.length - 1)) {
//   var last = i - 1;
//   var thisParent = a[last];
//   if (a.length < 3) {
//     // parent = tree;
//   } else {
//     parent = parent[thisParent];
//   }
//   console.log('Last folder is ' + thisParent);
//   console.log(parent);
//   // parent = parent[]
// } else if (i > 2) {
//   var thisParent = a[(i - 1)];
//   console.log(thisParent);
//   // parent = parent[v]
// }

// function inDepth(depth, target) {
//     var fakestack = 'hello';
//     console.log(stack);
//     tree[stack] = 'Built';
//     parent = tree[stack];
//     console.log(parent);
//     // for (let [key, value] of Object.entries(parent)) {
//     //   console.log(key + value);
//     // }
//   }
//   console.log(tree);
//   // return parent;
//
// }

              // console.log(prefix);
              // console.log(regParent);
              // var parent = lastChild.match(regParent);
              // console.log(parent);



              // console.log(match);
              // // inDepth(depth, match);
              //
              // if (match.length > 2) {
              //   // console.log(match[depth]);
              //   // var prefix = new RegExp('(\/|\w)*' + match[depth]);
              //   // console.log(prefix);
              //   console.log('3 depth');
              // } else if (match.length > 1) {
              //   console.log(match[(depth - 1)]);
              //   var prefix = new RegExp('(\/|\\w)*' + match[(depth - 1)]);
              //   console.log(prefix);
              // } else if (match.length > 0) {
              //   var rootDirectory = match[0];
              //   tree[rootDirectory] = {}
              //   console.log('Building: ' + rootDirectory);
              // };


              // console.log(whereTo);
              // var regParent = new RegExp('(((\\/)(\\w){1,})|(\.)){' + depth + '}\\/*\(?=' + thisChild + '\)');
              // var thisParent = thisPath.match(regParent);
              // thisParent = thisParent[1];
              // // console.log(thisParent);
              // var offset = (depth - 1);

// alert("Hello?")
// console.log(appUI);
