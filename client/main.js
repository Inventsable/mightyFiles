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

window.onload = init;

function init(){
  csInterface.evalScript(`readFullDirectory('${sysPath}')`, function(mirror){
    var root = parseAll(mirror);
    var nestNum = 0;
    console.log(root);
    generateTreeMenuFromRootObject(root, soil, 0, root);
    // console.log(root.client.index.html);
    // console.log(root.client['index.html']);
  });
}


// var offFocus = document.getElementById('mirror');
// offFocus.addEventListener('click', function(e){
//   console.log('click off focus!');
// })


function generateTreeMenuFromRootObject(mirror, parent, master){
  var nestingLevelBranch, nestingLevelLeaf;
  // console.log(`${mirror} has parent ${parent.classList} total ${master}`);
  for (let [key, value] of Object.entries(mirror)) {
    var newArray = [];
    if (typeof value == 'object') {
      var thisParent;
      if (key !== '.git') {
        if (parent.id == 'soil') {
          thisParent = soil;
          nestingLevelBranch = 0;
          // console.log('Level 1');
        } else {
          // thisParent = mirror;
          // console.log(parent);
          thisParent = findNestFromRoots(parent);
          nestingLevelBranch = traceAncestry(thisParent, 0, newArray) + 1;
        }
        // console.log(`Directory ${key} nested at ${nestingLevelBranch}`);
        generateTreeMenuFromRootObject(value, spawnBranch(key, thisParent, nestingLevelBranch), master);
      }
    } else {
      if (parent.id == 'soil') {
        nestingLevelLeaf = 0;
      } else {
        nestingLevelLeaf = traceAncestry(parent, 0, newArray) + 1;
      }
      // console.log('Leaf nested at: ' + nestingLevelLeaf);
      spawnLeaflet(parent, value, nestingLevelLeaf);
    }
  }
  // console.log(mirror);
  // nestingLevel--;
}



function traceAncestry(elt, count, matches) {
  var parent;
  if (elt.parentNode) {
    parent = elt.parentNode;
    if ((parent.id !== 'soil') && (elt.id !== 'soil')) {
      var classes = parent.classList;
      if (classes == 'nest') {
        count++;
        matches.push('match');
      }
      traceAncestry(parent, count, matches)
    } else {
      // console.log(matches)
      // console.log(parent);
    }
  }
  return matches.length;
}





function findNestFromRoots(roots) {
  var match = false;
  var childList = roots.children;
  for (var i = 0; i < childList.length; i++) {
    var classes = childList[i].classList.toString();
    if (inString(classes, 'nest')) {
      match = childList[i];
    }
  }
  return match;
}


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



function resetAllFocusBut(selection){
  if (selection !== 'none')
    switchClass(selection, 'inactive', 'active');
  var foci = [].slice.call(document.getElementsByClassName('focus'));
  foci.forEach(function(v,i,a) {
    if (v !== selection) {
      switchClass(v, 'active', 'inactive');
    }
  });
}

function switchClass(elt, class1, class2) {
  if (elt.classList.contains(class1)) {
    elt.classList.remove(class1);
    elt.classList.add(class2);
  }
}




function spawnBranch(label, parent, nestingLevel){
  try {
    var roots = appendChild(parent, 'div', 'treeRoots');
    var trunk = appendChild(roots, 'div', 'tree inactive focus treeTrunk');
    var nest = appendChild(roots, 'div', 'nest');
    var branch = appendChild(trunk, 'div', 'treeBranch');
    var limb = appendChild(branch, 'div', 'treeLimb');
    var tabChars = [];
    for (var i = 0; i < nestingLevel; i++) {
      tabChars.push(appendChild(limb, 'div', 'treeTab'));
    }
    var dropBtn = appendChild(limb, 'div', 'tree treeLeaf foldBtn');
    var dropIcon = appendChild(dropBtn, 'span', 'fa fa-angle-right fa-lg');
    var leaf = appendChild(limb, 'div', 'tree treeLeaf');
    var icon = appendChild(leaf, 'span', 'fa fa-folder fa-lg');
    var twig = appendChild(limb, 'div', 'tree treeTwig');
    var label = appendChild(twig, 'span', 'treeText', label);
    nest.style.display = 'none';
    var isFold = true;

    trunk.addEventListener('click', function(e){
      resetAllFocusBut(trunk);
      var folds = ['fa-angle-down', 'fa-angle-right'];
      var show = ['none', 'flex'];
      isFold = !isFold;
      if (isFold) {
        switchClass(dropIcon, folds[0], folds[1]);
        nest.style.display = 'none';
      } else {
        switchClass(dropIcon, folds[1], folds[0]);
        nest.style.display = 'flex';
      }
    })
    spawn = true;
  } catch(e){
    console.log(e);
    spawn = false;
  } finally {
    return roots;
  }
}

function spawnLeaflet(roots, label, nestingLevel) {
  try {
    var children = roots.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i] == roots) {
        continue
      } else {
        var nest = children[i];
      }
    }
    var trunk = appendChild(nest, 'div', 'tree inactive focus treeTrunk');
    var branch = appendChild(trunk, 'div', 'treeBranch');
    var limb = appendChild(branch, 'div', 'treeLimb');
    var tabChars = [];
    for (var i = 0; i <= nestingLevel; i++) {
      tabChars.push(appendChild(limb, 'div', 'treeTab'));
    }
    var leaf = appendChild(limb, 'div', 'tree treeLeaf');
    var icon = appendChild(leaf, 'span', 'fa fa-file fa-lg');
    var twig = appendChild(limb, 'div', 'tree treeTwig');
    var label = appendChild(twig, 'span', 'treeText', label);
    spawn = true;

    trunk.addEventListener('click', function(e){
      resetAllFocusBut(trunk);
      dispatchEvent('com.playwrite.console', label);
      getHeritage(trunk, label.textContent);
    });

  } catch(e){
    // console.log(e);
    spawn = false;
  } finally {
    if (typeof trunk !== 'undefined')
    return trunk;
    else
    return false;
  }
  // console.log(trunk);
}

function getHeritage(child, names){
  if (child.parentNode) {
    var parent = child.parentNode;
    if ((parent.id !== 'soil') && (child.id !== 'soil')) {
      var classes = parent.classList.toString();
      if (inString(classes, 'treeRoots')) {
        names = descendAndGetName(parent) + names;
      }
      getHeritage(parent, names);
    }
  }
  console.log(child);
  console.log(names);
}


function descendAndGetName(trunk) {
  // console.log(trunk);
  var children = trunk.children;
  for (var i = 0; i < children.length; i++) {
    var classes = children[i].classList.toString();
    if (inString(classes, 'treeTwig')) {
      var target = children[i].children;
      console.log('Found target: ' + target[0].textContent);
      return target[0].textContent;
    }
    if (children[i].children) {
      descendAndGetName(children[i]);
    }
  }
}


// appendChild(foldBtn, 'div', 'fa fa-folder fa-lg');

function appendChild(parent, child, ...args){
  var newChild = document.createElement(child);
  newChild.setAttribute('class', args[0]);
  if ((args.length > 1) && (child == 'span')) {
    // console.log('span created');
    newChild.textContent = args[1];
  // } else if (args.length > 1) {
  }

  return parent.appendChild(newChild);
}


//
// function scanThisLevel(prop, currObj, master) {
//   var match;
//   try {
//     for (let [key, value] of Object.entries(master)) {
//       if (key == currObj[prop]) {
//         console.log(currObj[prop] + " is a match!");
//         match = true;
//       }
//     }
//     if (!match) {
//       var depth = nestingLevel++;
//       scanNextLevel(prop, currObj, master)
//     }
//   } catch(e){}
// }
//
//
// function scanNextLevel(prop, currObj, master) {
//   var match;
//   try {
//     for (let [key, value] of Object.entries(master)) {
//       if (typeof value == 'object') {
//         scanThisLevel(prop, currObj, value)
//       }
//     }
//     // if (!match) {
//     //   var depth = nestingLevel++;
//     //   scanNextLevel(prop, currObj, master, depth)
//     // }
//   } catch(e){}
// }



// foldBtn.addEventListener('click', function(e){
//   var folds = ['fa-angle-down', 'fa-angle-right'];
//   var show = ['none', 'flex'];
//   isFold = !isFold;
//   if (isFold) {
//     console.log('Minimized');
//     switchClass(foldIcon, folds[0], folds[1]);
//     nest.style.display = 'none';
//   } else {
//     console.log('Unminimized');
//     switchClass(foldIcon, folds[1], folds[0]);
//     nest.style.display = 'flex';
//   }
//   // nest.style.display = show[isFold];
// });



// var foldBtns = [].slice.call(document.getElementsByClassName('foldBtn'));
// foldBtns.forEach(function(v,i,a) {
//   v.addEventListener('click', function(e){
//     if (!hasFocus(v)) {
//       setFocus(v, i, a, 'active', 'inactive');
//     }
//   })
//   // console.log(v);
// });



// scanningPanelDimensions(false);
//
// function scanningPanelDimensions(state) {
//   var res, here, timerWH;
//   // var parm = ["x1", "y1", "x2", "y2", "w", "h", "index"];
//   if (state) {
//     var width = window.innerWidth;
//     var height = window.innerHeight;
//     console.log('Scanning panel dimensions is on');
// 		timerWH = setInterval(function(){
//       // console.log(state);
//       console.log(width);
//       console.log(height);
//
//
//       // if (a == mighty.AB.data) return;
//       // if (a !== mighty.AB.data) {
//       //
//       // }
//       // mighty.AB.data = a;
//   }, 500);
//     // console.log("Scanning artboard on");
// 	} else {
// 		clearInterval(timerWH);
// 		console.log("Scanning panel dimensions off");
// 	}
// }
