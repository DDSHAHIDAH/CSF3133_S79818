// Error identification (line numbers refer to the original PDF code):
// Error 1 (grade.html, Line 9): Missing return in onsubmit ignores the
// function's return value. Fix: onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): showtable() has incorrect capitalization.
// Fix: showTable(), because JavaScript is case-sensitive.
// Error 3 (grade.html, Line 19): grades.js is the wrong script filename.
// Fix: grade.js, matching the actual file.
// Error 4 (grade.js, Line 5): name = "" assigns instead of comparing.
// Fix: name === "" to check whether the name is empty.
// Error 5 (grade.js, Line 9): isNan() is not a valid function.
// Fix: isNaN() (correct capitalization).
// Error 6 (grade.js, Line 14): A mark cannot be below 0 AND above 100.
// Fix: use || instead of && to reject either invalid range.
// Error 7 (grade.js, Line 28): getElementByID() has incorrect capitalization.
// Fix: getElementById().
// Error 8 (grade.js, Line 30): style.colour is not a CSS DOM property.
// Fix: style.color.
// Error 9 (grade.js, Line 31): return true permits form submission and reload.
// Fix: return false to keep the result visible (together with Error 1).
// Error 10 (grade.js, Line 38): Starting at index 1 skips grade A.
// Fix: start the loop at index 0.
// Error 11 (grade.js, Line 42): innerHtml has incorrect capitalization.
// Fix: innerHTML to render the table.

// Validate the form and calculate the student's grade.
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();
    const result = document.getElementById("result");
    const checkedTime = document.getElementById("checkedTime");

    // Clear any previous result before validating a new submission.
    result.innerHTML = "";
    checkedTime.innerHTML = "";

    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2: reject an empty mark before numeric conversion.
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Reject non-numeric and non-finite values.
    if (isNaN(mark) || !Number.isFinite(Number(mark))) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Number preserves decimals, unlike parseInt which truncates them.
    mark = Number(mark);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Escape user input before inserting it with innerHTML.
    const safeName = document.createElement("span");
    safeName.textContent = name;
    result.innerHTML = safeName.innerHTML + " got grade " + grade;

    // Part 2: set the result colour according to the grade.
    if (grade === "A" || grade === "B") {
        result.style.color = "green";
    } else if (grade === "C") {
        result.style.color = "orange";
    } else {
        result.style.color = "red";
    }

    // Part 2: display the date and time of checking.
    checkedTime.innerHTML = "Checked on: " + new Date().toLocaleString();
    return false;
}

// Generate all four grade rows using arrays and a for loop.
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = '<table><thead><tr><th scope="col">Grade</th>' +
        '<th scope="col">Mark range</th></tr></thead><tbody>';
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</tbody></table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}

// Part 2: generate a random whole number from 0 to 100 inclusive.
function randomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}
