function autoComplete(inputElement, array) {
    console.log(array);
    let currentFocus;
    inputElement.addEventListener("input", function(e) {
        let allResultsContainer, singleResultContainer, val = this.value;
        closeAllLists();
        if (!val) {return false;}
        currentFocus = -1;
        allResultsContainer = document.createElement("DIV");
        allResultsContainer.setAttribute("id", this.id + "autocomplete-list")
        allResultsContainer.setAttribute("class", "autocomplete-items")
        this.parentNode.appendChild(allResultsContainer);
        for (let i = 0; i < array.length; i++) {
            if (array[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                singleResultContainer = document.createElement("DIV");
                singleResultContainer.innerHTML = `<strong>${array[i].substr(0, val.length)}</strong>`;
                singleResultContainer.innerHTML += array[i].substr(val.length);
                singleResultContainer.innerHTML += `<input type='hidden' value='${array[i]}'>`
                singleResultContainer.addEventListener("click", function(e) {
                    inputElement.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                allResultsContainer.appendChild(singleResultContainer);
            }
        }
    });
    function closeAllLists(element) {
        let allResults = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < allResults.length; i++) {
            if (element != allResults[i] && element != inputElement) {
                allResults[i].parentNode.removeChild(allResults[i]);
            }
        }
    }
}