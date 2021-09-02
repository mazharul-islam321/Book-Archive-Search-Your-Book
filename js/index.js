// spinner function
const toggleSpinner = (displaystyle) => {
    document.getElementById("spinner").style.display = displaystyle;
};

// search button funtion
const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    // error handling for number and no input
    if (isNaN(searchText) === false) {
        searchField.value = "";
        searchField.setAttribute("placeHolder", "please enter a book name");
        alert("please enter a book name");
    } else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data));

        // display Spinner and placeholder
        toggleSpinner("inline-block");
        searchField.value = "";
        searchField.setAttribute("placeHolder", "search your book");
    }
};

// display search result function
const displaySearchResult = (data) => {
    // show total book found
    document.getElementById(
        "total-book"
    ).innerText = `About ${data.numFound} results found for this keyword `;

    //display result
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    const books = data.docs;

    // for invalid search, showing search result
    if (books.length === 0) {
        document.getElementById("total-book").innerText = `No Result Found `;
    }
    books?.forEach((book) => {
        // remove card where any data will be undefined
        const displayBook = () => {
            div.style.display = "none";
        };

        // creating card for data
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card shadow h-100">
            <img src="https://covers.openlibrary.org/b/id/${
                book.cover_i ? book.cover_i : displayBook()
            }-M.jpg" class="card-img-top p-3 h-75 img-fluid" alt="book image">
            <div class="card-body">
                <h4 class="card-title my-2">Book Name:- ${book.title}</h4>
                <h6 class="card-text">Authors Name:- ${
                    book.author_name ? book.author_name[0] : displayBook()
                }</h6>
                <p class="card-text">Publisher:- ${
                    book.publisher ? book.publisher[0] : displayBook()
                }</p>
                <p class="card-text">First Published Year:- ${
                    book.first_publish_year
                        ? book.first_publish_year
                        : displayBook()
                }</p>
            </div>
        </div>
        `;
        // appdend data for showing data
        searchResult.appendChild(div);
    });

    //  Spinner invisble
    toggleSpinner("none");
};
