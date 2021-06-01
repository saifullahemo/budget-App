class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value; // value of the budget input created

    if(value === '' || value < 0){ // if value is empty or value is less than 0
      this.budgetFeedback.classList.add('showItem'); //showing the error message
      this.budgetFeedback.innerHTML = `<p> value cannot tbe empty or negative</p>`;

      const self = this; //"this" funtion pointing to the class function
      

      setTimeout(function(){
        self.budgetFeedback.classList.remove("showItem"); //instead of this function used self to get the global variable
      }, 4000)
    }else{
      this.budgetAmount.textContent = value; //passing the value to budgetAmount
      this.budgetInput.value = '';
      this.showBalance();
    }
  }
    //show balance
    showBalance(){
      const expense = this.totalExpense(); //
      const total = parseInt(this.budgetAmount.textContent) - expense; //parseInt convert "budgetAmount text" to "int" to pass the value to balance and mainus expense

      this.balanceAmount.textContent = total; // balance is equal to total

      if(total < 0){ // if total is less than 0 
        this.balance.classList.remove("showGreen", "showBlack"); //remove green and black
        this.balance.classList.add("showRed"); //show red 
      }
      else if(total > 0){ //if total > 0
        this.balance.classList.remove("showRed", "showBlack"); //remove red and black
        this.balance.classList.add("showGreen"); //show green
      }
      else if(total == 0){ 
        this.balance.classList.remove("showRed", "showGreen");
        this.balance.classList.add("showBlack");
      }

      // console.log(`Hey i m getting a hold of "this" keyword`); 
    }
    //submit expense form
    submitExpenseForm(){
      const expenseValue = this.expenseInput.value;
      const amountValue = this.amountInput.value;

      if(expenseValue == "" || amountValue == "" || amountValue < 0){ //if expense value is equal to 0 or amount value is equal to 0 or amount value is less than 0
        this.expenseFeedback.classList.add("showItem"); //show the message 
        this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative`;

        const self = this;
        setTimeout(function(){
          self.expenseFeedback.classList.remove("showItem");
        }, 4000)
      }else{
        let amount = parseInt(amountValue);
        this.expenseInput.value = "";
        this.amountInput.value = "";

        let expence = { //creating a object for the expense list
          id:this.itemID,
          title:expenseValue,
          amount:amount
        }

        this.itemID++;
        this.itemList.push(expence); //pushing the object to list
        this.addExpense(expence); //to show the html dom 
        //show balance
        this.showBalance();
      }
    }

    //add expense

    addExpense(expense){
      const div = document.createElement('div');
      div.classList.add('expense');
      div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div> `;

        this.expenseList.appendChild(div);

    }
    //total expense
    totalExpense(){
      let total = 0;

      if(this.itemList.length > 0){
        total = this.itemList.reduce(function(acc, curr){ //using reduce function for callback function on expense
          console.log(`Total is ${acc} and the current value is ${curr.amount}`);
          acc += curr.amount; //acc is for itemID title curr is for amount value 
          return acc;
        }, 0);
      }
      this.expenseAmount.textContent = total;
      return total;
    }

    //edit expense
    editExpense(element){ //passing the element to parentElement 
      let id = parseInt(element.dataset.id) // creating id for dataset of id
      // console.log(element.dataset.id); 
      let parent = element.parentElement.parentElement.parentElement; //
      
      console.log(element.parentElement.parentElement.parentElement);
      //remove from dom
      this.expenseList.removeChild(parent)
      //remove from the list
      let expense = this.itemList.filter(function(item){ // the new array finding the item id that has function
        return item.id == id; // if item.id is equal to id where we edited which is going to return
      })
      //show value 
      this.expenseInput.value = expense[0].title; //value of the expense input is equal to the expense object 1st item title
      this.amountInput.value = expense[0].amount; //value of the amount input is equal to the expense object 1st item amount
      //remove from list
      let tempList = this.itemList.filter(function(item){
        return item.id !== id; //return if item id is not equal to the id and store in templist
      })
      this.itemList = tempList;
      this.showBalance(); 
    }
    //delete expense
    deleteExpense(element){ //passing the element to parentElement
      let id = parseInt(element.dataset.id) // creating id for dataset of id
      // console.log(element.dataset.id); 
      let parent = element.parentElement.parentElement.parentElement; //
      //remove from the dom
      this.expenseList.removeChild(parent)
      //remove from the list
      let expense = this.itemList.filter(function(item){ // the new array finding the item id that has function
        return item.id == id; // if item.id is equal to id where we edited which is going to return
      })
      //show value 
      this.expenseInput.value = expense[0].title; //value of the expense input is equal to the expense object 1st item title
      this.amountInput.value = expense[0].amount; //value of the amount input is equal to the expense object 1st item amount
      //remove from list
      let tempList = this.itemList.filter(function(item){
        return item.id !== id; //return if item id is not equal to the id and store in templist
      })
      this.itemList = tempList;
      this.showBalance();

    }
}

function eventListeners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');


  //new instance of UI class

  const ui = new UI();

  //budget form submit
  budgetForm.addEventListener("submit", function(event){
    event.preventDefault();

    ui.submitBudgetForm();
    
  });
  
  //expense form submit
  expenseForm.addEventListener("submit", function(event){
    event.preventDefault();
    ui.submitExpenseForm();

  })
  
  //expense click
  expenseList.addEventListener("click", function(event){
    console.log(event.target);
    if(event.target.parentElement.classList.contains('edit-icon')){ //getting the dom class edit-icon, parentElement is the link of class
      ui.editExpense(event.target.parentElement) // creating a editExpense method for the parentElement

    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement)

    }

  })
}

document.addEventListener("DOMContentLoaded", function(){
  eventListeners(); //calling eventListeners function
})
 