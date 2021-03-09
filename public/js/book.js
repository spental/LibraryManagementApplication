$(document).ready(() => {
  //search the book with isbn
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
    //search the book with book name
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
        //search the book with author
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
 //add new book to the database
 $("#addBook").on("submit",function(event){
  event.preventDefault();
  $.post("/api/newBook", {
    isbn:$("#newbookIsbn").val(),
    title:$("#newbookName").val(),
    author:$("#newbookAuthorName").val(),
    description:$("#newbookDescription").val(),
    imageurl:$("#newbookImage").val()
    }).then((data) => {
          window.location.replace("/api/books");
          $("#isbnExist").css("visibility","hidden");
      })
      .catch(err => {
        console.log(err);
        $("#isbnExist").css("visibility","visible");
        $("#newbookIsbn").val(' '),
        $("#newbookName").val(' '),
        $("#newbookAuthorName").val(' '),
        $("#newbookDescription").val(' '),
        $("#newbookImage").val(' ')
      });
  
  });
  //delete the book form the database
  $("#getBook").on("click",function(event){
event.preventDefault();
if(event.target.id=="deleteBook")
console.log($(this).attr("data-Bookid"));
$.post("/api/deleteBook", {
isbn:$(event.target).attr('data-Bookid')
}).then((data) => {
      window.location.replace("/api/books");
  })
  .catch(err => {
    console.log(err);
   
  });


  })
//update the book record based on the isbn
$("#getBook").on("click",function(event){
event.preventDefault();
if(event.target.id=="updateBook")
{
const currentRow=$(event.target).closest("tr");        
const isbn=currentRow.find("td:eq(1)").text(); // get current row 1st TD value
$("#updateBookIsbn").val(isbn);
const bookName=currentRow.find("td:eq(2)").text(); // get current row 2nd TD
$("#updateBookName").val(bookName);
const description=currentRow.find("td:eq(3)").text(); // get current row 4th TD
$("#updatedBookDescription").val(description);
const authorName=currentRow.find("td:eq(4)").text(); // get current row 5th TD
$("#updateBookAuthorName").val(authorName);
value=currentRow.find("td:eq(5)")[0].innerHTML;
const bookCover=$(value).attr("src"); // get current row 6th TD
$("#updateBookImage").val(bookCover);
}  
  });
//update the book in the database
$("#updateBook").on("submit",function(event){
event.preventDefault();
$.post("/api/updateBook", {
  isbn:$("#updateBookIsbn").val(),
  title:$("#updateBookName").val(),
  author:$("#updateBookAuthorName").val(),
  description:$("#updatedBookDescription").val(),
  imageurl:$("#updateBookImage").val()
  }).then((data) => {
        window.location.replace("/api/books");
    })
    .catch(err => {
      console.log(err);
    });

}); 
  
    $('#MybtnModal').click(function(){
		$('#Mymodal').modal('show')
	});  
}); 