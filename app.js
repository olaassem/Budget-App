// Control budget data 
let budgetController = (function() {

    // some code

})();




// Control UI
let UIController = (function() {

    // Some code

})();


// Global app controller
let controller = (function(budgetCtrl, UICtrl) {

    let ctrlAddItem = function(){

        // 1. Get field input data.



        // 2. Add item to budget control.


        // 3. Add new item to UI.


        // 4. Calculate budget.


        // 5. Display budget to UI.


    }


    // Input field event listener.
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (event.keyCode === 13 || event.which === 13) {

            ctrlAddItem();

        }
    });



})(budgetController, UIController);

