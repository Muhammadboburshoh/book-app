const GRAPHQL_URL = 'http://localhost:5020/'

const getBooksQuery = `
  {
    books {
      name
      price
      author {
        name
      }
    }
  }

`

async function fetchFunction(query) {

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query
    })
  })

  const {data} = await response.json()
  return data
}

;(async () => {

  const { books } = await fetchFunction(getBooksQuery)

  let bookList = document.querySelector('.books__list')

  let bookTemplate = document.querySelector('#book__template').content


  let elBooksFragment = document.createDocumentFragment();


  for(let book of books) {

    let booksEl = bookTemplate.cloneNode(true)

    let bookName = booksEl.querySelector('.book__name')
    let bookPrice = booksEl.querySelector('.book__price')
    let bookAuthor = booksEl.querySelector('.book__author')

    bookName.textContent = "Name: " + book.name
    bookPrice.textContent= "Price: " + book.price
    bookAuthor.textContent = "Author: " + book.author.name

    elBooksFragment.appendChild(booksEl)

  }
  bookList.appendChild(elBooksFragment)


})()
