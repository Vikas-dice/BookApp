// Event Listener
let form = document.getElementById("book-form")

function getLocalValueFromForm(param) {
    return document.getElementById(param).value
}
function clearItem(params) {
    document.getElementById(params).value = ''
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
        let tbody = document.getElementById('book-list')
        let tr = document.createElement('tr')//<tr></tr>
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='btn btn-danger float-right delete'>X</a></td>
        `
        tbody.appendChild(tr)
        let arr = ['title', 'author', 'isbn']
        arr.forEach(element => {
            clearItem(element)
        });
    }
})