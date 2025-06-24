
function Calculator() {
    //products input and orders input
    this.productsInput = document.getElementById("products");
    this.ordersInput = document.getElementById("orders");

    //dropdown
    this.packageInput = document.getElementById("package");
    this.selectInput = document.querySelector(".select__input");
    this.selectDropdown = document.querySelector(".select__dropdown");
    this.dropdownOptions = Array.from(this.selectDropdown.children);

    //chekboxes
    this.accountingCheckbox = document.getElementById("accounting");
    this.terminalCheckbox = document.getElementById("terminal")
    console.log(this.terminalCheckbox)

    //form
    this.form = document.querySelector("form");


    this.totalPrice = document.querySelector(".total__price");
    this.summaryTotal = document.querySelector(".summary__total")


    this.prices = {
        products: 0.5,
        orders: 1,
        packages: {
            basic: 0,
            professional: 10,
            premium: 20
        },
        accountting: 10,
        terminal: 15
    }

this.init()

}

Calculator.prototype.init = function(){
    this.form.addEventListener("input", () => {
    this.updateAll()
    this.validate()
        //console.log(this.result);
    })
    this.selectValue()
}

Calculator.prototype.updateAll = function() {
    this.getValue()
    this.totalSum()
    this.updateSum()

    this.updateItem(
        "products",
         `${this.productsQty} * $${this.prices.products}`,
         this.productsValue
    )

    this.updateItem(
        "orders",
        `${this.ordersQty} * $${this.prices.orders}`,
        this.ordersValue
    )

    if (this.selectedOption) {
        this.pgkPrice = this.prices.packages[this.selectedOption.toLocaleLowerCase()];
        this.updateItem("package", this.selectedOption, this.pgkPrice)
    }

    this.updateCheckbox("accounting", this.accountingChecked ? this.prices.accountting : 0);
    this.updateCheckbox("terminal", this.terminalChecked ? this.prices.terminal : 0);
     
}
//input value
Calculator.prototype.getValue = function(){

    this.productsQty = this.productsInput.value;
    this.productsValue = (this.productsQty * this.prices.products)
  //console.log(`product qty: ${this.productsQty} product value: ${this.productsValue}`);

    this.ordersQty = this.ordersInput.value;
    this.ordersValue = (this.ordersQty * this.prices.orders)
   //console.log(`orders qty: ${this.ordersQty} orders value: ${this.ordersValue}`);

    this.accountingChecked = this.accountingCheckbox.checked;
   // console.log(`accounting ${this.accountingChecked}`)
    this.terminalChecked = this.terminalCheckbox.checked;
   //console.log(`terminal ${this.terminalChecked}`)
}
//validation
Calculator.prototype.validate = function() {
    if (this.productsQty < 0 || this.ordersQty < 0) {
        alert("Must be greater then 0");
        this.form.reset();
        return;
    }
}

//select dropdown value
Calculator.prototype.selectValue = function() {
    this.form.addEventListener("click", (event) => {
        if(event.target === this.selectInput){
            this.packageInput.classList.add("open");
        } if (event.target !== this.selectInput) {
            this.packageInput.classList.remove("open");
        }
    })
    this.dropdownOptions.forEach((option) => {
            option.addEventListener("click", () => {
                this.selectInput.textContent = option.textContent
                this.selectedOption = option.textContent;
                //console.log(this.selectedOption);
                this.updateAll();
            })
        })
}

//whole sum
Calculator.prototype.totalSum = function() {
   this.result = this.productsValue + this.ordersValue;
   if(this.accountingChecked === true) {
    this.result += this.prices.accountting;
   } if (this.terminalChecked === true) {
    this.result += this.prices.terminal;
   } if (this.selectedOption === "Professional") {
    this.result += this.prices.packages.professional;
   } if (this.selectedOption === "Premium") {
    this.result += this.prices.packages.premium;
   }
}
//updates whole sum 
Calculator.prototype.updateSum = function() {
    this.summaryTotal.classList.add("open")
    this.totalPrice.textContent = `$${this.result}`;    
}
//updates items but not checkboxes
Calculator.prototype.updateItem = function(type, calc, price) {
    this.li = document.querySelector(`.list__item[data-id="${type}"]`);
    this.li.querySelector(".item__calc").textContent = calc;
    this.li.querySelector(".item__price").textContent = price;


    if(price > 0 ) {
        this.li.classList.add("open")
    } else this.li.classList.remove("open")
}
//updates checkboxes
Calculator.prototype.updateCheckbox = function(type,  price) {
    this.li = document.querySelector(`.list__item[data-id="${type}"]`);
    this.li.querySelector(".item__price").textContent = price;


   if(price > 0 ) {
        this.li.classList.add("open")
    } else this.li.classList.remove("open")
}

document.addEventListener("DOMContentLoaded", function(){
    new Calculator();
})