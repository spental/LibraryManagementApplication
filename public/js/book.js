$(document).ready(() => {
    $("#bookIsbn").on("click",function(){
    const isbn=$("#isbn").val();
    $.get("/api/isbn", {
        isbn: isbn
      }).then((data) => {
            window.location.replace("/api/booksisbn");
        })
        .catch(err => {
          console.log(err);
        });
    
    });
    $("#bookName").on("click",function(){
        const book=$("#book").val();
        $.get("/api/bookName", {
            name: book
          }).then((data) => {
                window.location.replace("/api/booksInfo");
            })
            .catch(err => {
              console.log(err);
            });
        
        });
  $("#bookAuthor").on("click",function(){
    const book=$("#author").val();
    $.get("/api/bookAuthor", {
        name: book
      }).then((data) => {
            window.location.replace("/api/authorInfo");
        })
        .catch(err => {
          console.log(err);
        });
    
    });

    $('#MybtnModal').click(function(){
		$('#Mymodal').modal('show')
	});  
}); 