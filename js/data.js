const countries = [
    {
        name: "Canada",
        continent: "North America",
        cities: ["Calgary", "Montreal", "Toronto"],
        photos: ["canada1.jpg", "canada2.jpg", "canada3.jpg"]
    },
    {
        name: "United States",
        continent: "North America",
        cities: ["Boston", "Chicago", "New York", "Seattle", "Washington"],
        photos: ["us1.jpg", "us2.jpg"]
    },
    {
        name: "Italy",
        continent: "Europe",
        cities: ["Florence", "Milan", "Naples", "Rome"],
        photos: ["italy1.jpg", "italy2.jpg", "italy3.jpg", "italy4.jpg", "italy5.jpg", "italy6.jpg"]
    },
    {
        name: "Spain",
        continent: "Europe",
        cities: ["Almeria", "Barcelona", "Madrid"],
        photos: ["spain1.jpg", "spain2.jpg"]
    }
];

let parentNode = document.getElementsByClassName("justify")[0];

function createItems() {
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        newItem(country.name, country.continent, country.cities, country.photos);
    }
}

function newItem(name, continent, cities, photos) {
    let item = document.createElement("div");
    item.className = "item";
    //title
    let h2 = document.createElement("h2");
    h2.innerHTML = name;
    let p = document.createElement("p");
    p.innerHTML = continent;
    //cities
    let innerBox = document.createElement("div");
    innerBox.className = "inner-box";
    let h3 = document.createElement("h3");
    h3.innerHTML = "Cities";
    let ul = document.createElement("ul");
    for (let i = 0; i < cities.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = cities[i];
        ul.appendChild(li);
    }
    innerBox.appendChild(h3);
    innerBox.appendChild(ul);
    //images
    let innerBox_2 = document.createElement("div");
    innerBox_2.className = "inner-box";
    let h3_2 = document.createElement("h3");
    h3_2.innerHTML = "Popular Photos";
    let imgs = document.createElement("div");
    for (let i = 0; i < photos.length; i++) {
        let img = document.createElement("img");
        img.className = "photo";
        img.src = "images/" + photos[i];
        imgs.appendChild(img);
    }
    innerBox_2.appendChild(h3_2);
    innerBox_2.appendChild(imgs);
    //button
    let button = document.createElement("button");
    button.innerHTML = "Visit";
    //add all
    item.appendChild(h2);
    item.appendChild(p);
    item.appendChild(innerBox);
    item.appendChild(innerBox_2);
    item.appendChild(button);
    parentNode.appendChild(item)
}

createItems();