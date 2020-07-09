// Control budget data 
let budgetController = (function() {
    let x = 23;

    let add = function(a) {
        return x + a;
    }

    return publicTest: function(b) {
        return add(b);
    }
})();



// Control UI
let uiController = (function() {
    // Some code
})();


// Connects data and UI modules
let controller = (function(budgetCtrl, uiCtrl) {

    let z = budgetCtrl.publicTest(5);
    return {
        anotherPublic: function() {
            console.log(z);
        }
    }

})(budgetController, uiController);

