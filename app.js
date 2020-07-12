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

    let calculateTotal = function(type) {
        let sum = 0;
        data.allItems[type].forEach(function (cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1
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

        deleteItem: function(type, id) {
            let ids, index;

            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {

            // Sum of all income & expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Percentage of income we have spent on expenses
            if ( data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            let html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with actual data recieved from object
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID){
            el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function(){
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            // Set focus back to first element in the array.
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            console.log(obj);
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };



    let updateBudget = function(){

        // 1. Calculate budget.
        budgetCtrl.calculateBudget();

        // 2. Return  budget.
        let budget = budgetCtrl.getBudget();

        // 3. Display budget to UI.
        UICtrl.displayBudget(budget);
    };

    let ctrlAddItem = function(){

        let input, newItem;

        // 1. Get field input data.
        input = UICtrl.getInput();
        
        if (input.description !== "" && input.value !== NaN && input.value > 0) {
            // 2. Add item to budget control.
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add new item to UI.
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear input fields
            UICtrl.clearFields();

            // 5. Calculate & update budget.
            updateBudget();
        }
    };

    let ctrlDeleteItem = function(e){
        let itemID, splitID, type, ID;
        
        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete item from the data structure.
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete item from the UI.
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget.
            updateBudget();
        }
    };

    return {
        init: function(){
            setupEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });

            console.log('App has started');
        }
    }
})(budgetController, UIController);


controller.init();

