let select1 = document.getElementById("main-menu-select");//the first select
let select2 = document.getElementById("tablechoose-select");//the second select
let colnumber = document.getElementById("colnumber");//input for colnumber
let btn = document.getElementById("commit");//commit button
let newtable = document.getElementById("newTable");//div for inputs to create table
let attr = document.getElementById("attribute");//div for inputs for attributes
let showtable = document.getElementById("table");//div for table
let tables = [];//storage tables
let attrs = [];//storage inputs for attributes

select1.onchange = function () {
    newtable.style.display = "none";
    attr.style.display = "none";
    switch (select1.value) {
        //select
        case "": {
            btn.style.display = "none";
            break;
        }
        //create table
        case "1": {
            newtable.style.display = "inline";
            break;
        }
        //add row
        case "2": {
            if (select2.value != "select") {
                btn.style.display = "inline";
            }
            attr.style.display = "inline";
            addRow();
            break;
        }
        //delete row
        case "3": {
            attr.style.display = "inline";
            if (select2.value != "select") {
                changeAttribute(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
                btn.style.display = "inline";
            }
            break;
        }
        //delete table
        case "4": {
            if (select2.value != "select") {
                btn.style.display = "inline";
            }
            break;
        }
    }

};

colnumber.onchange = function () {
    let number = parseInt(colnumber.value);
    if (number > 0 && number < 11) {
        btn.style.display = "inline";
        attr.style.display = "inline";
        changeAttribute(number);
    }
};

function changeAttribute(number, name = []) {
    //delete
    while (attr.hasChildNodes()) {
        attr.removeChild(attr.firstChild);
    }
    //create
    for (let i = 0; i < number; i++) {
        attrs[i] = document.createElement("input");
        attrs[i].type = "text";
        if (name[i]) {
            attrs[i].placeholder = name[i].innerHTML;
        }
        else attrs[i].placeholder = "Attribute";
        attrs[i].style.width = 146 + "px";
        attrs[i].style.fontSize = "20px";
        attr.appendChild(attrs[i]);
    }
}

btn.onclick = function () {
    switch (select1.value) {
        case "1": {
            let tablename = document.getElementById("tablename").value;
            addopt(tablename);
            tables[tablename] = document.createElement("table");
            let thead = document.createElement("thead");
            for (let i = 0; i < parseInt(colnumber.value); i++) {
                let th = document.createElement("th");
                th.innerHTML = attrs[i].value;
                thead.appendChild(th);
            }
            tables[tablename].appendChild(thead);
            createTable(tables[tablename]);
            changeAttribute(0);
            break;
        }
        case "2": {
            let tr = document.createElement("tr");
            for (let i = 0; i < tables[select2.value].getElementsByTagName("th").length; i++) {
                let td = document.createElement("td");
                td.innerHTML = attrs[i].value;
                tr.appendChild(td);
            }
            tables[select2.value].appendChild(tr);
            changeAttribute(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
            break;
        }
        case "3": {
            if (select2.value == "select")
                return false;
            let trs = tables[select2.value].getElementsByTagName("tr");
            if (trs.length === 0) {
                break;
            }
            for (let i = 0; i < trs.length; i++) {
                let judge = true;
                let tds = trs[i].getElementsByTagName("td");
                for (let j = 0; j < tds.length; j++) {
                    if (tds[j].innerHTML !== attrs[j].value) {
                        judge = false;
                    }
                }
                if (judge) {
                    tables[select2.value].removeChild(trs[i]);
                    changeAttribute(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
                }
            }
            changeAttribute(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
            break;
        }
        case "4": {
            delopt();
            break;
        }
    }
    return false;
};

function addRow() {
    let numbers = 0;
    if (select2.value != "select")
        numbers = tables[select2.value].getElementsByTagName("th").length;
    else {
        return;
    }
    changeAttribute(numbers,tables[select2.value].getElementsByTagName("th"));
}

function createTable(table) {
    if (showtable.firstChild)
        showtable.removeChild(showtable.firstChild);
    if (select2.value == "select")
        return;
    showtable.appendChild(table);
}

select2.onchange = function () {
    createTable(tables[select2.value]);
    if (select2.value == "select")
        return;
    if (select1.value == "2" || "3")
        changeAttribute(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
};

function addopt(optionValue) {
    let option = document.createElement("option");
    select2.appendChild(option);
    option.innerHTML = optionValue;
    option.value = optionValue;
    option.selected = true;
}

function delopt() {
    let options = select2.getElementsByTagName("option");
    if (select2.value == "select") {
        alert("WARNING: You cannot undo this action!");
        return;
    }
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        if (option.selected) {
            select2.removeChild(option);
            tables[option.value] = "";
            if (select2.getElementsByTagName("option")[1]) {
                select2.getElementsByTagName("option")[1].selected = true;
                createTable(tables[select2.getElementsByTagName("option")[1].value]);
            } else
                createTable(tables["select"]);
            return;
        }
    }
}