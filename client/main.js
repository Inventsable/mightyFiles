var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var clientPath = sysPath + '/client/';
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

var checkbox = document.getElementById('syncPlayWrite')

loadUniversalJSXLibraries();
loadJSX(`${appName}.jsx`);
loadJSX(`myTfiles.jsx`);

var soil = document.getElementById('soil');
var selection = null;
var nest = document.getElementById('nest');
var foldBtn = document.getElementById('fold');
var foldIcon = document.getElementById('foldIcon');
var isFold = false;

var familyTree = {};


window.onload = init;

function init(){
  csInterface.evalScript(`readFullDirectory('${sysPath}')`, function(mirror){
    var root = parseAll(mirror);
    console.log(root);
    generateTreeMenuFromRootObject(root, soil, 0, root);
    console.log(appUI);
    correctDirectoryPositions(soil);
  });
}



/*---
*
*    CHECKBOX
*
---*/

var checkboxLogic = {};
var checkbox = [].slice.call(document.getElementsByClassName('adobe-checkboxGroup'));
checkbox.forEach(function(v,i,a) {
  console.log(i);
  var child = v.children;
  for (var e = 0; e < child.length; e++) {
    if (hasClass(child[e], 'adobe-icon-checkBoxOn')) {
      checkboxLogic[i] = {
        state : true,
        elt : v,
      }
      console.log(child[e]);
    } else if (hasClass(child[e], 'adobe-icon-checkBoxOff')) {
      checkboxLogic[i] = {
        state : false,
        elt : v,
      }
      console.log(child[e]);
    }
  }

  v.addEventListener('click', function(e){
    toggleState('set', v);
  });
});
// console.log(checkboxLogic);


function toggleState(type, parent){
  var child = parent.children;
  // for (var e = 0; e < child.length; e++) {
    if (isCheckbox(child[0])) {
      for (let [key, value] of Object.entries(checkboxLogic)) {
        if (value.elt == child[0].parentNode) {
          // console.log(child[0]);
          var negative = !value.state;
          switch(type) {
            case 'find':
              // console.log(`This state is ${value.state}`);
            break;
            case 'set':
              value.state = negative;
              // console.log(`New state is ${value.state}`);
              toggleCheckbox(value.state, child[0]);
            break;

            default:
            console.log('no params');
            break;
          }
          return value.state;
        }
      }
    } else {
      console.log("Is not a checkbox");
    }
  // }
}



function isCheckbox(elt) {
  var match = false;
  if (hasClass(elt, 'adobe-icon-checkBoxOn')) {
    match = true;
  } else if (hasClass(elt, 'adobe-icon-checkBoxOff')) {
    match = true;
  }
  return match;
}

function toggleCheckbox(state, checkbox) {
  if (state) {
    switchClass(checkbox, 'adobe-icon-checkBoxOff', 'adobe-icon-checkBoxOn');
  } else {
    switchClass(checkbox, 'adobe-icon-checkBoxOn', 'adobe-icon-checkBoxOff');
  }
}


function correctDirectoryPositions(land){
  var nests = [].slice.call(document.getElementsByClassName('nest'));
  nests.forEach(function(v,i,a) {
    var subFolders = [];
    var placeholder = false;
    var childList = v.children;
    for (var i = 0; i < childList.length; i++) {
      if (hasClass(childList[i], 'treeRoots')) {
        subFolders.push(childList[i]);
      } else if (hasClass(childList[i], 'placeholder')) {
        placeholder = (childList[i]);
      }
    }
    if (subFolders.length) {
      for (var u = 0; u < subFolders.length; u++) {
        v.insertBefore(subFolders[u], placeholder);
      }
    }
  });
}



function generateTreeMenuFromRootObject(mirror, parent, master){
  var thisParent;
  var nestingLevelBranch, nestingLevelLeaf;
  for (let [key, value] of Object.entries(mirror)) {
    var newArray = [];
    if (typeof value == 'object') {
      if (key !== '.git') {
        if (parent.id == 'soil') {
          thisParent = soil;
          nestingLevelBranch = 0;
        } else {
          thisParent = findNestFromRoots(parent);
          nestingLevelBranch = traceAncestry(thisParent, 0, newArray) + 1;
        }
        var branch = spawnBranch(key, thisParent, nestingLevelBranch);
        generateTreeMenuFromRootObject(value, branch, master);
      }
    } else {
      if (parent.id == 'soil') {
        // nestingLevelLeaf = 0;
        // thisParent = parent;
        spawnLeaflet(soil, value, 0);
      } else {
        nestingLevelLeaf = traceAncestry(parent, 0, newArray) + 1;
        spawnLeaflet(parent, value, nestingLevelLeaf);
      }
    }
  }
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


function hasClass(elt, ...targets) {
  var match = false;
  var classes = elt.classList.toString();
  for (var i = 0; i < targets.length; i++) {
    if (inString(classes, targets[i])) {
      match = true;
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
    roots.id = label;
    var trunk = appendChild(roots, 'div', 'tree inactive focus treeTrunk');
    var nest = appendChild(roots, 'div', 'nest');
    var firstChild = appendChild(nest, 'div', 'placeholder');
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

function playWrite(file, title) {
  dispatchEvent('com.playwrite.console', title);
  console.log(file);
  var contents = myT.readFile(file);
  dispatchEvent('com.playwrite.rewrite', contents);
}


var fullName = '';

function spawnLeaflet(roots, label, nestingLevel) {
  try {
    var nest;
    if (roots.id !== 'soil') {
      var children = roots.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i] == roots) {
          continue
        } else {
          nest = children[i];
        }
      }
    } else {
      nest = roots;
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
      fullName = '';
      var lineage = getHeritage(trunk, label.textContent);
      // console.log("Family path is: " + lineage);
      // console.log(familyTree.data);
      var result = familyTree.data;
      // dispatchEvent('com.playwrite.console', result);
      if (myT.readFile(result)) {
        playWrite(result, 'Opening file...')
      } else {
        console.log('Could not read ' + result);
      }
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
        names = parent.id + "/" + names;
      }
      getHeritage(parent, names);
    } else {
      // console.log(names);
      fullName = "./" + names;
      if (typeof fullName !== 'undefined') {
        logFamilyPath(fullName);
        // console.log(fullName);
        return fullName;
      }
    }
  }
}

function logFamilyPath(name) {
  familyTree['data'] = name;
}


// function descendAndGetName(trunk) {
//   // console.log(trunk);
//   var children = trunk.children;
//   for (var i = 0; i < children.length; i++) {
//     var classes = children[i].classList.toString();
//     if (inString(classes, 'treeTwig')) {
//       var target = children[i].children;
//       console.log('Found target: ' + target[0].textContent);
//       return target[0].textContent;
//     }
//     if (children[i].children) {
//       descendAndGetName(children[i]);
//     }
//   }
// }


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
