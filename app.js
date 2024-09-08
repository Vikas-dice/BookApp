// Event Listener
let form = document.getElementById("book-form")

function getLocalValueFromForm(param) {
    return document.getElementById(param).value
}
function clearItem(params) {
    document.getElementById(params).value = ''
}

function addBookToUI(book) {
    let tbody = document.getElementById('book-list')
    let tr = document.createElement('tr')//<tr></tr>
    tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='btn btn-danger float-right delete'>X</a></td>
        `
    tbody.appendChild(tr)

}

function addBookToDB(book) {
    let allBooks;

    if (localStorage.getItem("books") === null) {
        allBooks = []
    } else {
        allBooks = JSON.parse(localStorage.getItem("books")) // [{},{}]
    }

    allBooks.push(book)//[{},{},{}]

    localStorage.setItem("books", JSON.stringify(allBooks)) // replace
}




form.addEventListener("submit", (e) => {

    e.preventDefault()
    let title = getLocalValueFromForm("title")
    let author = getLocalValueFromForm("author")
    let isbn = getLocalValueFromForm("isbn")
    if (title.length === 0 || author.length === 0 || isbn.length === 0) {
        alert("Please Fill all the Fields")

    } else {
        let book = {
            title,
            author,
            isbn
        }
        addBookToUI(book)//UI
        addBookToDB(book)//DB
        let arr = ['title', 'author', 'isbn']
        arr.forEach(element => {
            clearItem(element)
        });

        //Local Storage


    }
})

document.addEventListener("DOMContentLoaded", function () {
    let allBooks = JSON.parse(localStorage.getItem("books"))
    allBooks.forEach(item => addBookToUI(item))
    let deleteBtn = document.getElementsByClassName("delete")
    Array.from(deleteBtn).forEach(btn => btn.addEventListener("click", function (e) {
        let selectdItem = e.target.parentElement.parentElement.firstElementChild.textContent
        console.log(selectdItem)
        let allBooks = JSON.parse(localStorage.getItem("books")) //[{title:"",author:"",isbn:""}]
        let newarr = allBooks.filter(item => item.title !== selectdItem)
        localStorage.setItem('books', JSON.stringify(newarr))
        window.location.reload()
    }))
})