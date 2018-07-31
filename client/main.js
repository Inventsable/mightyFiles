var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var clientPath = sysPath + '/client/';
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

loadUniversalJSXLibraries();
loadJSX(`${appName}.jsx`);
loadJSX(`myTfiles.jsx`);

var soil = document.getElementById('soil');
var selection = null;
var nest = document.getElementById('nest');
var foldBtn = document.getElementById('fold');
var foldIcon = document.getElementById('foldIcon');
var isFold = false;

csInterface.evalScript(`readFullDirectory('${sysPath}')`, function(mirror){
  var root = parseAll(mirror);
  console.log(root);
  // console.log(root.client.index.html);
  // console.log(root.client['index.html']);
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


var sunshine = [].slice.call(document.getElementsByClassName('inactive'));
sunshine.forEach(function(v,i,a) {
  v.addEventListener('click', function(e){
    if (!hasFocus(v)) {
      setFocus(v, i, a, 'active', 'inactive');
    }
  })
  // console.log(v);
});

function hasFocus(elt){
  if (elt == selection)
    return true;
  else
    return false;
}

function setFocus(v, i, a, class1, class2){
  selection = v;
  switchClass(v, class2, class1);
  for (var n = 0; n < a.length; n++) {
    if (n == i) continue;
    switchClass(a[n], class1, class2);
  }
}

function switchClass(elt, class1, class2) {
    elt.classList.remove(class1);
    elt.classList.add(class2);
}

//
// function buildDirectory(soil, folder, files=[]){
//
//
// }

var hostBranch;
var branchBtn = document.getElementById('spawnBranch');
branchBtn.addEventListener('click', function(e){
  hostBranch = spawnBranch('host');
});


var leafBtn = document.getElementById('spawnLeaf');
leafBtn.addEventListener('click', function(e){
  var newFile = spawnLeaflet(hostBranch, 'newFile.jsx', 1);
});





function spawnBranch(label){
  try {
    var roots = appendChild(soil, 'div', 'treeRoots');
    var trunk = appendChild(roots, 'div', 'tree inactive treeTrunk');
    var branch = appendChild(trunk, 'div', 'treeBranch');
    var limb = appendChild(branch, 'div', 'treeLimb');
    var dropBtn = appendChild(limb, 'div', 'tree treeLeaf');
    var dropIcon = appendChild(dropBtn, 'span', 'fa fa-angle-down fa-lg');
    var leaf = appendChild(limb, 'div', 'tree treeLeaf');
    var icon = appendChild(leaf, 'span', 'fa fa-folder fa-lg');
    var twig = appendChild(limb, 'div', 'tree treeTwig');
    var label = appendChild(twig, 'span', 'treeText', label);
    spawn = true;
  } catch(e){
    console.log(e);
    spawn = false;
  }
  // console.log(trunk);
  return roots;
}

function spawnLeaflet(roots, label, nestingLevel) {
  try {
    // var roots = appendChild(fromBranch, 'div', 'treeRoots');
    var trunk = appendChild(roots, 'div', 'tree inactive treeTrunk');
    var branch = appendChild(trunk, 'div', 'treeBranch');
    var limb = appendChild(branch, 'div', 'treeLimb');
    for (var i = 1; i <= nestingLevel; i++) {
      var indent = appendChild(limb, 'div', 'treeTab');
    }
    var leaf = appendChild(limb, 'div', 'tree treeLeaf');
    var icon = appendChild(leaf, 'span', 'fa fa-file fa-lg');
    var twig = appendChild(limb, 'div', 'tree treeTwig');
    var label = appendChild(twig, 'span', 'treeText', label);
    spawn = true;
  } catch(e){
    console.log(e);
    spawn = false;
  }
  console.log(trunk);
  return trunk;
}

// appendChild(foldBtn, 'div', 'fa fa-folder fa-lg');

function appendChild(parent, child, ...args){
  var newChild = document.createElement(child);
  newChild.setAttribute('class', args[0]);
  if ((args.length > 1) && (child == 'span')) {
    console.log('span created');
    newChild.textContent = args[1];
  // } else if (args.length > 1) {
  }
  return parent.appendChild(newChild);
}

foldBtn.addEventListener('click', function(e){
  var folds = ['fa-angle-down', 'fa-angle-right'];
  var show = ['none', 'flex'];
  isFold = !isFold;
  if (isFold) {
    console.log('Minimized');
    switchClass(foldIcon, folds[0], folds[1]);
    nest.style.display = 'none';
  } else {
    console.log('Unminimized');
    switchClass(foldIcon, folds[1], folds[0]);
    nest.style.display = 'flex';
  }
  // nest.style.display = show[isFold];
});




scanningPanelDimensions(false);

function scanningPanelDimensions(state) {
  var res, here, timerWH;
  // var parm = ["x1", "y1", "x2", "y2", "w", "h", "index"];
  if (state) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    console.log('Scanning panel dimensions is on');
		timerWH = setInterval(function(){
      // console.log(state);
      console.log(width);
      console.log(height);


      // if (a == mighty.AB.data) return;
      // if (a !== mighty.AB.data) {
      //
      // }
      // mighty.AB.data = a;
  }, 500);
    // console.log("Scanning artboard on");
	} else {
		clearInterval(timerWH);
		console.log("Scanning panel dimensions off");
	}
}


// OLD


// var treeMaster = [];
//
//
// var treeView = {
//   build : function(root) {
//     treeMaster = [];
//     csInterface.evalScript(`recurseChildren('${root}')`, function(e){
//       var name = extFolder();
//       var regEx = new RegExp(`(\\w|\\-|\\.|\/|\~)*\/` + name + '[^\\.]', 'g');
//       var results = strReplace(e.replace(regEx, '.\/'), ',false');
//       if (!results.length) {
//        console.log('Failed to detect directories');
//      } else {
//        var allDirectories = results.split(',');
//        console.log(`Directories localized to ${name}:`);
//        console.log(allDirectories);
//        treeMaster.push(allDirectories)
//        allDirectories.forEach(function(v,i,a){
//          var allFiles = myT.readDir(v);
//          var childList = [];
//          if (!allFiles.length) {
//            console.log("Empty directory");
//          } else {
//            console.log('Parent folder is ' + v);
//            console.log('Children are:');
//            childList.push(allFiles)
//            // for (var i = 0; i < allFiles.length; i++){
//            //
//            // }
//            console.log(childList);
//          }
//        })
//        // var allFiles = myT.readAllFiles(allDirectories);
//        // console.log(allFiles);
//        console.log('Master tree:');
//        console.log(treeMaster);
//      }
//     });
//   },
//   reset : function(e) {
//     for (let [key, value] of Object.entries(treeView)) {
//       if ((key === 'build')|(key === 'send')|(key === 'reset')) continue;
//       delete tree[key];
//     }
//   },
// }
// treeView.build(sysPath);


// var tree = {
//   build : function(arg) {
//     console.log(arg);
//   },
//   reset : function(e) {
//     for (let [key, value] of Object.entries(tree)) {
//       if ((key === 'build')|(key === 'send')|(key === 'reset')) continue;
//       delete tree[key];
//     }
//   },
//   request : function(path) {
//     csInterface.evalScript(`recurseChildren('${path}')`, function(e){
//       // console.log(e);
//       var name = extFolder();
//       var treeView = false;
//       var regEx = new RegExp(`(\\w|\\-|\\.|\/|\~)*\/` + name + '[^\\.]', 'g');
//       var results = e.replace(regEx, '.\/');
//       if (!results.length) {
//         console.log('failure');
//       } else {
//         var fileArray = [];
//         treeView = results.split(',');
//         for (var e = 0; e < treeView.length; e++) {
//           if ((/\/(\w|\-|\d)*$/g.test(treeView[e])) && !(/LICENSE/.test(treeView[e]))) {
//             var treeFolders = treeView[e];
//             var match = treeFolders.match(/\/(\w|\.|\-|\_)*/g);
//             var depth = match.length;
//             // console.log("depth is: " + depth);
//             if (!match.length) {
//               console.log("Failed");
//             } else {
//               var thisPath = strReplace(match.toString(), ',');
//               assignFolder(depth, thisPath)
//             }
//           } else if ((/\/(\w|\d|\-)*\.(\w)*$/g.test(treeView[e])) || (/LICENSE/.test(treeView[e]))) {
//             var treeFiles = treeView[e];
//             var match = treeFiles.match(/\/(\w|\.|\-|\_)*/g);
//             var depth = match.length;
//             // console.log(match);
//             // console.log(depth);
//             // console.log("depth is: " + depth);
//             // var thisFile = [match, depth];
//             fileArray.push(match)
//             // if (!match.length) {
//             //   console.log("Failed");
//             // } else {
//             //   var thisPath = strReplace(match.toString(), ',');
//             //   console.log(thisPath);
//             //   getParent(depth, thisPath);
//             // }
//             // getParent(thisPath);
//
//             // console.log('this is a file:');
//           }
//           // console.log(treeView[e]);
//         }
//         // console.log(tree);
//         // console.log(fileArray);
//         // assignFiles(fileArray);
//       }
//       // tree.build(treeView);
//     });
//     console.log(tree);
//   }
// };
//
//
// function assignFiles(array){
//   if (array.constructor == Array) {
//     array.shift('.')
//     // console.log('This is an array');
//     for (var i = 0; i < array.length; i++) {
//       // console.log(array[i]);
//       var match = array[i];
//       var depth = array[i].length;
//       // match.shift('');
//       var fullPath = '.' + strReplace(match.toString(), ',');
//       console.log(fullPath);
//       // fullPath = trimL(fullPath, 1);
//       // console.log(tree);
//       var result = getParentAlt(fullPath);
//       // console.log(result);
//     }
//   }
// }
//
//
// function assignFolder(depth, str){
//   var match = str.split('/');
//   var thisChild = match[depth];
//   var prefix = new RegExp('(((\\/)(\\w){1,})|(\.)){' + depth + '}\\/*' + thisChild );
//   var thisPath = str.match(prefix);
//   thisPath = '.' + thisPath[0];
//   console.log('Directory found: ' + thisPath);
//   var whereTo = setParent(thisPath);
//   console.log(whereTo);
// }
//
//
// function getParentAlt(path){
//   var parent = tree;
//   path.split('/').forEach(function(v,i,a){
//     // console.log(i);
//     // console.log(a.length - 1);
//     if (i < 1) {
//       console.log('Starting to crawl');
//       parent = tree;
//     } else if (i == (a.length - 1)) {
//       var last = (a.length - 1);
//       var lastFolder = a[last];
//       if (lastFolder == '.') {
//         console.log('This is connected to master');
//         parent = tree;
//       } else {
//         console.log('This is a nested file');
//         parent = parent[lastFolder];
//       }
//       console.log(v + ' is a file at ' + lastFolder);
//       // parent[i] = v;
//       console.log(lastFolder);
//       console.log(a);
//       console.log('set value to ' + v);
//       console.log(tree);
//     } else {
//       // console.log('Current index is: ' + i);
//       console.log(i);
//       console.log(parent);
//       parent = parent[v]
//       console.log(`Injecting ${v} to above`);
//       console.log('parent is ' + parent);
//     }
//   });
//   console.log(parent);
//   console.log(tree);
//   return parent;
// }
//
//
// function setParent(thisPath){
//   var parent;
//   thisPath.split('/').forEach(function(v,i,a){
//     if (i < 1) {
//       parent = tree;
//     } else {
//       parent[v] = {};
//       parent = parent[v]
//       // console.log(tree);
//     }
//   });
//   parent = [];
//   return parent;
// }




//








// tree.request(sysPath);
// console.log(tree);



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
