document.addEventListener("DOMContentLoaded", function() {
    gapi.load("client", initialize);
});

function initialize() {
    gapi.client.init({
        apiKey: '551964834401-ho2pceck8pkiqub015s8v7ap2as4pib5.apps.googleusercontent.com'  // Ganti dengan API Key Anda
    }).then(function() {
        return gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/1EevPSckJw22gIwcENrg9stlrLzC-XNi4Br_lsOpk2I8/values/Sheet1!A1:C'
        });
    }).then(function(response) {
        displayContent(response.result.values);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}

function displayContent(data) {
    data.forEach(row => {
        let sectionId = row[0] + "-content";
        let element = document.getElementById(sectionId);
        if (element) {
            if (sectionId === "skills-content" || sectionId === "portfolio-content" || sectionId === "products-content") {
                let items = row[2].split(', ');
                items.forEach(subItem => {
                    let li = document.createElement("li");
                    li.textContent = subItem;
                    element.appendChild(li);
                });
            } else {
                element.textContent = row[2];
            }
        }
    });
}
