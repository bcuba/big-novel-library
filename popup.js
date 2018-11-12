let Confirm = document.getElementById('confirm');
let p = document.getElementById('para');
let val = document.getElementById('f');

  chrome.storage.sync.get('color', function(data) {
    //changeColor.style.backgroundColor = data.color;
    //changeColor.setAttribute('value', data.color);
  });
  Confirm.onclick = function() {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.executeScript(
    //       tabs[0].id,
    //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
    // });
    findLibrary('1');
    if (val.innerText == "false") {
      chrome.bookmarks.create({'parentId': '1', 'title': 'Library'}, function(newFolder) {
        console.log("added folder: " + newFolder.title);
      });
    }
    findLibrary('1');
  };
  chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
    var title = tab.title;
    document.getElementById("test").value = title;
  });

  function findBookmarksBar(id) {
      chrome.bookmarks.getChildren(id, function(children) {
          for (var i = 0; i < children.length; i++) {
            var bookmark = children[i];
            p.innerText = bookmark.title + "-" + bookmark.id;
            if (bookmark.title == "Bookmarks bar") {
              p.innerText = bookmark.id;
              return String(bookmark.id);
            }
          }
      });
  }
  function findLibrary(id) {
      chrome.bookmarks.getChildren(id, function(children) {
          for (var i = 0; i < children.length; i++) {
            var bookmark = children[i];
            if (bookmark.title == "Library") {
              val.innerText = "true";
            }
          }
      });
  }
