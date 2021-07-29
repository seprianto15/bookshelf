const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(data, author, timestamp, isCompleted) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = data;
    textTitle.setAttribute("id", "H3");
    
    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;
    textAuthor.setAttribute("id", "P1");

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;
    textTimestamp.setAttribute("id", "P2");

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle, textAuthor, textTimestamp);

    const action = document.createElement("div");
    action.classList.add("action");
    
    if(isCompleted) {
        action.append(
            undoGreenButton(),
            redButton(),
        );
        console.log("IsCompleted : " +isCompleted);
    } else {
        action.append(
            greenButton(),
            redButton(),
        );
        console.log("IsCompleted : " +isCompleted);
    }
    textContainer.append(action);

    return textContainer;
}

function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const id = +new Date();
    const textTitleBook = document.getElementById("inputTitle").value;
    const textAuthor = document.getElementById("inputAuthor").value;
    const timestamp = document.getElementById("inputDate").value;
    const checkbox = document.getElementById("inputBookIsComplete").checked;

    console.log(`ID : ${id}`);
    console.log(`Judul : ${textTitleBook}`);
    console.log(`Penulis : ${textAuthor}`);
    console.log(`Tahun : ${timestamp}`);

    if(checkbox == false) {
        const bookUnComplete = makeBook(textTitleBook, "Penulis : " +textAuthor, "Tahun : " +timestamp, false);
        const bookObject = composeBookObject(textTitleBook, "Penulis : " +textAuthor, "Tahun : " +timestamp, false);
        
        bookUnComplete[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        
        uncompletedBookList.append(bookUnComplete);
        updateDataToStorage();
    }

    if(checkbox == true) {
        const bookComplete = makeBook(textTitleBook, "Penulis : " +textAuthor, "Tahun : " +timestamp, true);
        const bookNewObject = composeBookObject(textTitleBook, "Penulis : " +textAuthor, "Tahun : " +timestamp, true);
        
        bookComplete[BOOK_ITEMID] = bookNewObject.id;
        books.push(bookNewObject);
        
        completedBookList.append(bookComplete);
        updateDataToStorage();
    }
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector("#H3").innerText;
    const taskAuthor = taskElement.querySelector("#P1").innerText;
    const taskTimestamp = taskElement.querySelector("#P2").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskTimestamp, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeBook(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    
    taskElement.remove();

    updateDataToStorage();  
}

function addBookToUncompleted(taskElement){
    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector("#H3").innerText;
    const taskAuthor = taskElement.querySelector("#P1").innerText;
    const taskTimestamp = taskElement.querySelector("#P2").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskTimestamp, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUnCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function greenButton() {
    const green = document.createElement("button");
    green.classList.add("green");
    green.textContent = "Selesai Dibaca";
    green.addEventListener("click", function(event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
    return green;
}

function redButton() {
    const red = document.createElement("button");
    red.classList.add("red");
    red.textContent = "Hapus Buku";
    red.addEventListener("click", function(event) {
        
        if(confirm("Klik OK Hapus Buku")) {
            removeBook(event.target.parentElement.parentElement); 
        }   
   
    });
    return red;
}

function undoGreenButton() {
    const undoGreen = document.createElement("button");
    undoGreen.classList.add("green");
    undoGreen.textContent = "Belum Selesai Dibaca";
    undoGreen.addEventListener("click", function(event) {
        addBookToUncompleted(event.target.parentElement.parentElement);
    });
    return undoGreen;
}

function searchBookTitle() {
    const filterInput = document.getElementById("searchBookTitle");
    filterInput.addEventListener("keyup", filterTitle);

    function filterTitle(event) {
        const searchTitle = event.target.value.toLowerCase();
        const itemBook = document.querySelectorAll(".book_item");

        itemBook.forEach((item) => {
            const inputTitle = item.firstChild.textContent.toLowerCase();
            if(inputTitle.indexOf(searchTitle) != -1) {
                item.setAttribute("style", "display : block;");
            } else {
                item.setAttribute("style", "display : none;");
                
            }
        });
    }
}

