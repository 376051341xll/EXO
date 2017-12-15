

function GetComments() {
    var commentlist = document.getElementById(commentlist);
    commentlist = '';
    var mycomment = document.getElementById(mycomment);
    if (mycomment !== null) {
        commentlist += mycomment;
    }
    for (var i = 0; i < comments.length; i++) {
        commentlist += "<ul><div><div class='preview'><a href=''><img src='../Homepage/images/00.jpg' height='25' width='25' class='img-responsive'alt=''></a></div><p>" + comments[i] + "</p><h2></h2></div><div class='clearfix'></div></li></ul>";

    }
    // commentlist.innerHTML = htmlstring;
    return commentlist;
}