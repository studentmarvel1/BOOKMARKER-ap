
// Listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);
// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;
  if(!validateForm(siteName, siteUrl)){
      
    return false;
  }
  
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
 

//   localStorage.setItem('test', 'Hello world');
//   console.log(localStorage.getItem('test'));
//   localStorage.removeItem('test');
//   console.log(localStorage.getItem('test'));

   if(localStorage.getItem('bookmarks') === null){
    
     //init array
       var bookmarks = [];
       bookmarks.push(bookmark);
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // Clear form




  // prevent from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
    
    // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
}

// Re-set back to localStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

// Clear form
document.getElementById('myform').reset();

//re-fetch bookmarks
 fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    
     bookmarksResults.innerHTML += '<div class="well">'+
                                 '<h3>'+name+
                                ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                // ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3>'+
                                 '</div>';
}
}
//validate function

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill the form');
      return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('please use a valid URL');


    return false;
    }
    return true;
}