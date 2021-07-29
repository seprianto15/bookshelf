document.addEventListener("DOMContentLoaded", function () {
 
    const bookSubmit = document.getElementById("inputBook");
 
    bookSubmit.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const search = document.getElementById("searchBook");

    search.addEventListener("submit", function(event) {
        event.preventDefault();
        searchBookTitle();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
    
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });

 document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
 });