document.addEventListener("DOMContentLoaded", function() {
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            displayContent(results.data);
        }
    });
});

function displayContent(data) {
    data.forEach(item => {
        let sectionId = item.section + "-content";
        let element = document.getElementById(sectionId);
        if (element) {
            if (sectionId === "skills-content" || sectionId === "portfolio-content" || sectionId === "products-content") {
                let items = item.content.split(', ');
                items.forEach(subItem => {
                    let li = document.createElement("li");
                    li.textContent = subItem;
                    element.appendChild(li);
                });
            } else {
                element.textContent = item.content;
            }
        }
    });
}
