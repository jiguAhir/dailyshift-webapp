    let sessionString = sessionStorage.getItem('objectTopass');
    let data = JSON.parse(sessionString);

    console.log(data);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById('tdate').innerHTML = "Date: " + today;
    
    let info = "<table style='width: 100%'>";
    info += "<tr><th></th><th>ROOM #</th><th>NAME</th><th>RENT</th><th>TAX</th><th>TOTAL</th></tr>";
    let j = 0;
    let trent = 0;
    let ttax = 0;
    let ttotal_rent = 0;

    for(let i=0; i<data.length; i++){
        j = i + 1;
        let room = data[i].room;
        let customer = data[i].cname;
        let total_rent = parseFloat(data[i].rent);
        total_rent = total_rent.toFixed(2);
        let tax = (total_rent * 13.42)/100;
        tax = tax.toFixed(2);
        let rent = total_rent - tax;
        rent = rent.toFixed(2);
        let type_payment = data[i].tpayment;

        trent += parseFloat(rent);
        ttax += parseFloat(tax);
        ttotal_rent += parseFloat(total_rent);

        info += "<tr>";
        info += "<td>" + j + ".</td>";
        info += "<td>" + room + "</td>";
        info += "<td>" + customer + "</td>";
        info += "<td>" + rent + "</td>";
        info += "<td>" + tax + "</td>";
        if (type_payment == "Cash")
            info += "<td>" + total_rent + "</td>";
        else if (type_payment == "Credit card")
            info += "<td>" + total_rent + "     vi</td>";    
        info += "</tr>"
    }

    info += "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    info += "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    info += "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    info += "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    info += "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    info += "<tr><th></th><th></th><th>TOTAL</th><th>" + trent.toFixed(2) + "</th><th>" + ttax.toFixed(2) + "</th><th>" + ttotal_rent.toFixed(2) + "</th></tr>";
    info += "</table>";
    document.getElementById("data_table").innerHTML = info;
 