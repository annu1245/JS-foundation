# Problem Statement

1. Your program has currencies of Rs. 1, 2, 5, 10, 20, 50, 100, 500, 2000.
2. Your user enters a bill amount say Rs. 243.
3. Your user then enters cash given say Rs. 2000.
4. Now, help the user by telling how can he/she return the change to the customer with a minimum number of notes?


----------------------------------------------------------
# TakeAways

* Prototype

HTMLInputElement.prototype.val = function () { 
    return parseInt(this.value);
};

prototype is use to add a new function inside HTMLInputElement, which can convert the string to number
you can also write Element instead of HTMLInputElement.


