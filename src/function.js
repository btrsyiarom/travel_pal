//form element > ID "weatherForm" is used.
const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=9fd7a449d055dba26a982a3220f32aa2`)
    //parse response as JSON
        .then(res => res.json())
        .then(data => {
            console.log(data)

           
            let div = document.createElement("div");
            div.setAttribute("id", "conditions");

            
            let temp = document.createElement("div");
            let celsiusTemp = Math.round(data.main.temp - 273.15);
            let tempNode = document.createTextNode("\t Today temperature: " + celsiusTemp + " °C ");
            // creating a new div with temperature info and append it to div
            temp.appendChild(tempNode);
            div.appendChild(temp);

            
            let desc = document.createElement("div");
            let descNode = document.createTextNode(data.weather[0].description + " \t " );
            desc.appendChild(descNode);
            //style the desc (description weather)
            desc.style.display= "inline-block";
            desc.style.verticalAlign= "middle";
            div.appendChild(desc);

            let icon = document.createElement("img");
            icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            icon.setAttribute("alt", data.weather[0].description);
            //style the icon make it side by side with descripiton
            icon.style.display= "inline-block";
            icon.style.verticalAlign= "middle";
            div.appendChild(icon);

            let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }); //to change the sunrise to local india time based on city
            let rise = document.createElement("div");
            let riseLabelNode = document.createTextNode("🌄 | \t   Sunrise: ");
            rise.appendChild(riseLabelNode);
            let riseTimeNode = document.createTextNode(sunrise);
            rise.appendChild(riseTimeNode);
            div.appendChild(rise);

            let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });//to change the sunset to local india time based on city
            let sunsetLabelNode = document.createTextNode("🌇| \t   Sunset: ");
            let sunsetTimeNode = document.createTextNode(sunset);
            let set = document.createElement("div");
            set.appendChild(sunsetLabelNode);
            set.appendChild(sunsetTimeNode);
            div.appendChild(set);
            
            document.querySelector("main").appendChild(div);
        })
        .catch(err => console.log(err))
}

document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})