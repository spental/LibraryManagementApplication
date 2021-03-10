$(document).ready(() => {
    $("#memberID").on("click",function(){
        console.log("hello");
    const memID=$("#id").val();
    $.get("/api/memID", {
        memID: memID
      }).then((data) => {
            window.location.replace("/api/membermemID");
        })
        .catch(err => {
          console.log(err);
        });
    
    });
    $("#fNameButton").on("click",function(){
        const fName=$("#fName").val();
        $.get("/api/fName", {
            fName: fName
          }).then((data) => {
                window.location.replace("/api/fNameInfo");
            })
            .catch(err => {
              console.log(err);
            });
        
        });
        $("#lNameButton").on("click",function(){
            const lName=$("#lName").val();
            $.get("/api/lName", {
                lName: lName
              }).then((data) => {
                    window.location.replace("/api/lNameInfo");
                })
                .catch(err => {
                  console.log(err);
                });
            
            });
    

    $('#MybtnModal').click(function(){
		$('#Mymodal').modal('show')
	});
  //add new book to the database
  $("#addMember").on("submit",function(event){
    event.preventDefault();
    $.post("/api/newMember", {
      memID:$("#newmemID").val(),
      firstName:$("#newFName").val(),
      lastName:$("#newLName").val(),
      email:$("#newEmail").val(),
      phoneno:$("#newPhoneNo").val()
      }).then((data) => {
            window.location.replace("/api/member");            
          $("#empExist").css("visibility","hidden");
        })
        .catch(err => {
            
          $("#empExist").css("visibility","visible");
          console.log(err);
          $("#newbookIsbn").val(' '),
          $("#newbookName").val(' '),
          $("#newbookAuthorName").val(' '),
          $("#newbookDescription").val(' '),
          $("#newbookImage").val(' ')
        });
    
    });
  //update member in the database
  $("#updateMember").on("submit",function(event){
    event.preventDefault();
    $.post("/api/updateMember", {
      memID:$("#updatememID").val(),
      firstName:$("#updateFName").val(),
      lastName:$("#updateLName").val(),
      email:$("#updateEmail").val(),
      phoneno:$("#updatePhoneNo").val()
      }).then((data) => {
            window.location.replace("/api/member");            
          $("#empExist").css("visibility","hidden");
        })
        .catch(err => {
            
          $("#empExist").css("visibility","visible");
          console.log(err);
          $("#newbookIsbn").val(' '),
          $("#newbookName").val(' '),
          $("#newbookAuthorName").val(' '),
          $("#newbookDescription").val(' '),
          $("#newbookImage").val(' ')
        });
    
    });    
 //update the member in the database
$("#getMember").on("click",function(event){
  event.preventDefault();
 if(event.target.id=="updateMember") 
 {
  console.log(($(event.target)).closest("tr"));
  const currentRow=$(event.target).closest("tr"); 
  const memID=currentRow.find("td:eq(1)").text(); // get current row 1st TD value
  $("#updatememID").val(memID);
const firstName=currentRow.find("td:eq(2)").text(); // get current row 2nd TD
   $("#updateFName").val(firstName);
 const lastName=currentRow.find("td:eq(3)").text(); // get current row 4th TD
   $("#updateLName").val(lastName);
 const email=currentRow.find("td:eq(4)").text(); // get current row 5th TD
   $("#updateEmail").val(email);  
 const phoneno=currentRow.find("td:eq(5)").text(); // get current row 5th TD
 $("#updatePhoneNo").val(phoneno);
}
    }); 
//add the member in the database    
    $("#getMember").on("click",function(event){
event.preventDefault();
if(event.target.id=="deleteMember")
{
console.log($(this).attr("data-Memberid"));
$.post("/api/deleteMember", {
  memID:$(event.target).attr('data-Memberid')
  }).then((data) => {
        window.location.replace("/api/member");
    })
    .catch(err => {
      console.log(err);
     
    });
  }
    })
}); 