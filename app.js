
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

    this.totalPrice =document.getElementById("total-price");


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

this.Update()

}
//ceka na jakykoli input ve form
Calculator.prototype.Update = function(){
    this.form.addEventListener("input", () => {
        this.validate()
        this.getValue()
        this.totalSum()
         console.log(this.result);
    })

    this.form.addEventListener("click", (event) => {
        if(event.target === this.selectInput){
            this.packageInput.classList.toggle("open");
        }
    })
    this.dropdownOptions.forEach((option) => {
            option.addEventListener("click", () => {
                this.selectInput.textContent = option.textContent
                this.selectedOption = option.dataset.value;
                console.log(this.selectedOption);
            
            })
        })
}
//ziska value v inputu
Calculator.prototype.getValue = function(){

    this.productsQty = this.productsInput.value;
    this.productsValue = (this.productsQty * this.prices.products)
    console.log(`product qty: ${this.productsQty} product value: ${this.productsValue}`);

    this.ordersQty = this.ordersInput.value;
    this.ordersValue = (this.ordersQty * this.prices.orders)
    console.log(`orders qty: ${this.ordersQty} orders value: ${this.ordersValue}`);

    this.accountingChecked = this.accountingCheckbox.checked;
    console.log(`accounting ${this.accountingChecked}`)
    this.terminalChecked = this.terminalCheckbox.checked;
    console.log(`terminal ${this.terminalChecked}`)
}
//validuje input cisel, v pripade zaporneho cisla maze input
Calculator.prototype.validate = function() {
    if (this.productsQty < 0 || this.ordersQty < 0) {
        alert("Must be greater then 0");
        this.form.reset();
        return;
    }
}

Calculator.prototype.totalSum = function() {
   this.result = this.productsValue + this.ordersValue;
   if(this.accountingChecked === true) {
    this.result += this.prices.accountting;
   } if (this.terminalChecked === true) {
    this.result += this.prices.terminal;
   } if (this.selectedOption === "professional") {
    this.result += this.prices.packages.professional;
   } if (this.selectedOption === "premium") {
    this.result += this.prices.packages.premium;
   }
}

document.addEventListener("DOMContentLoaded", function(){
    new Calculator();
})