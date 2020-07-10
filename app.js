// Model
let budgetController = (function() {

})();




// View
let UIController = (function() {

    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    };

})();


// Controller
let controller = (function(budgetCtrl, UICtrl) {

    let setupEventListeners = function(){
        // Input field event listener.
        let DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {

                ctrlAddItem();

            }
        });
    }

    let ctrlAddItem = function(){

        // 1. Get field input data.
        let input = UICtrl.getInput();
        console.log(input);


        // 2. Add item to budget control.


        // 3. Add new item to UI.


        // 4. Calculate budget.


        // 5. Display budget to UI.


    };

    return {
        init: function(){
            setupEventListeners();
        }
    }


})(budgetController, UIController);


controller.init();

