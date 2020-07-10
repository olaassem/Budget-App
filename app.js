// Model
let budgetController = (function() {
    
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };


    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            // Create new ID (ID = last ID + 1)
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type.
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure.
            data.allItems[type].push(newItem);

            // Return new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    }
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

        let input, newItem;

        // 1. Get field input data.
        input = UICtrl.getInput();

        // 2. Add item to budget control.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add new item to UI.


        // 4. Calculate budget.


        // 5. Display budget to UI.


    };

    return {
        init: function(){
            setupEventListeners();
            console.log('App has started');
        }
    }


})(budgetController, UIController);


controller.init();

