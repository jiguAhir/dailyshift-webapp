
let sales = [
    {
        room: 102,
        cname: "Julio Guerra",
        rent: 25.87,
        tpayment: "Cash"
    }
]

window.onload = function() {
    document.getElementById("save-data").addEventListener("click", rentRoom);
    document.getElementById("delete-data").addEventListener("click", clearData);
    document.getElementById("generate-report").addEventListener("click", generateReport);
    sales.shift();
}

function rentRoom() {
    let roomNumber = document.getElementById('room-number').value;
    let customerName = document.getElementById('customer-name').value;
    let totalRent = document.getElementById('total-rent').value;
    let typePayment = document.getElementById('type-payment').value;

    if (roomNumber != ""  && customerName != "" && totalRent != "" && typePayment != 0) {
        saveSaleHistory(roomNumber, customerName, totalRent, typePayment);
        DisplayHistory();
        saveData();
    } else {
        let dialog = getDialog('error', 'Please fill out all the required fields.');
        document.getElementById("result").innerHTML = dialog;    
    }
    
}

function clearData() {
    deleteData();
}

function generateReport() {
    sessionStorage.setItem('objectTopass', JSON.stringify(sales));
    window.location.href = 'report.html';
}

function saveSaleHistory(room, customer, rent, tpayment) {
    let typePay = "";
    
    if (tpayment == 1) {
        typePay = "Cash";
    } else if (tpayment == 2) {
        typePay = "Credit card"
    }

    sales.push({"room": room, "cname": customer, "rent": rent, "tpayment": typePay});
    console.log(sales);
}

function DisplayHistory() {
    let table = "<table border='1' style='width: 100%'>";
    table += "<tr><th></th><th>Room #</th><th>Customer Name</th><th>Total Rent</th><th>Type of Payment</th><th></th></tr>";
    let j = 0;
    for(let index=0; index<sales.length; index++){
        j = index + 1;
        let rnt = parseFloat(sales[index].rent);
        rnt = rnt.toFixed(2);
        table += "<tr>";
        table += "<td>" + j + ".</td>";
        table += "<td>" + sales[index].room + "</td>";
        table += "<td>" + sales[index].cname + "</td>";
        table += "<td>$" + rnt + "</td>";
        table += "<td>" + sales[index].tpayment + "</td>";
        table += "<td><button onclick='removeItem(" + index + ")' class='btn btn-secondary'>Remove</button></td>";
        table += "</tr>"
    }

    table += "</table>";
    document.getElementById("history").innerHTML = table;
}

function getDialog(dialogType, text){
    let dialog;
    switch(dialogType){
      case "delete":
        dialog = "<div class='alert alert-warning' role='alert'>"
        break;
      case "save":
        dialog = "<div class='alert alert-success' role='alert'>"
        break;
      case "remove":
        dialog = "<div class='alert alert-warning' role='alert'>"
        break;
      case "error":
        dialog = "<div class='alert alert-danger' role='alert'>"
        break;
    }
    dialog += text;
    dialog += "</div>"
    return dialog;
  }
  
  function saveData() {
    const text = "Sale successfully saved!";

    let dialog = getDialog('save', text);
    console.log(dialog);
    document.getElementById("result").innerHTML = dialog;
  }

  function removeItem(index) {
    console.log(index);
    sales.splice(index, 1);

    const text = "Item successfully removed!";
    DisplayHistory();
    let dialog = getDialog('remove', text);
    console.log(dialog);
    document.getElementById("result").innerHTML = dialog;
  }

  function deleteData() {
    for(let i=0; i < sales.length; i++) {
        sales.shift();
    }

    document.getElementById("history").innerHTML = "";

    const text = "Data successfully deleted."

    let dialog = getDialog('delete', text);
    console.log(dialog);
    document.getElementById("result").innerHTML = dialog;
  }
  