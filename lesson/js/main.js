function filterGridItems() {

    let search_filter = document.getElementById("search-filter");
    let filter = search_filter.value.toUpperCase();
    let lesson_grid = document.querySelector(".lesson-grid");
    let lesson_list_item = document.querySelectorAll(".lesson-grid > li");

    console.log(filter);

    for (let i = 0; i < lesson_list_item.length; i++) {
        let lesson_item = lesson_list_item[i].getElementsByTagName("a")[0];


        if (lesson_item.getAttribute("data-title").toUpperCase().indexOf(filter) > -1) {
            lesson_list_item[i].classList.remove('hide');
        } else {
            lesson_list_item[i].classList.add('hide');
        }
    }
}