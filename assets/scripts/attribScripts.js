import attributions from "../data/attributions.js";

var cards = document.getElementById("cards");

window.onload = ()=>{
    var heading = document.getElementById("Attrib-heading");
    var text = document.getElementById("Attrib-text");
    if(window.innerWidth < 768){
        heading.classList.add("text-3xl");
        text.classList.add("text-sm");
    }
    else{
        heading.classList.add("text-5xl");
        text.classList.add("text-lg");
    }
}


const closeAllOthers = (name)=>{
    var all = cards.children;
     for (var i =0 ;i < all.length; i++){
        var card = all[i];
        if(card.getAttribute("id") !== name && card.getAttribute("open") === "true"){
            card.click();
        }
    };
}

const handleDropDown = (attribution)=>{   
    closeAllOthers(attribution.name);
    var ele = document.getElementById(`${attribution.name}`);
    if(ele.getAttribute("open") === "true"){
        document.getElementById(`${attribution.name}-body`).innerHTML = "";
        ele.setAttribute("open","false");
    }
    else{
        var body = document.getElementById(`${attribution.name}-body`);
        attribution.data.forEach(item => {
            var listItem = document.createElement("div");
            var dot = document.createElement("i");
            dot.classList.add("self-center","fa-solid","fa-circle","text-white");
            var span = document.createElement("span");
            span.innerText = item.name + " - ";
            var href = document.createElement("a");
            href.setAttribute("href",item.href);
            href.setAttribute("target","_blank");
            href.classList.add("text-sm","text-white","hover:text-blue-400","ease-out","self-center","hover:ease-in","duration-75");
            href.innerText = item.hrefText;

            if(window.innerWidth < 768){
                listItem.classList.add("flex", "text-white","gap-1","align-middle","w-100", "h-100", "text-sm");
                span.classList.add("text-sm","self-center");
                dot.style.fontSize="0.3rem";

            }
            else{
                listItem.classList.add("flex", "text-white","gap-2","align-middle","w-100", "h-100", "text-md");
                span.classList.add("text-md","self-center");
                dot.style.fontSize="0.4rem";
            }

            listItem.appendChild(dot);
            listItem.appendChild(span);
            listItem.appendChild(href);
            body.appendChild(listItem);
        });
        ele.setAttribute("open","true");
    }
}

attributions.forEach(attribution => {
    
    var card = document.createElement("div");
    card.setAttribute("id",attribution.name);
    card.setAttribute("open","false");
    var cardHeader = document.createElement("h2");
    if (window.innerWidth < 768){
        card.classList.add("card","hover:cursor-pointer", "hover:shadow-[0_0_6px_-1px_rgba(255,255,255,0.75)]", "bg-[#3f3f3f]","flex","flex-col","gap-4" ,"rounded-lg", "m-1", "p-2");
        cardHeader.classList.add("text-md", "font-bold", "text-white", "underline", "decoration-1", "underline-offset-2");
    }
    else{
        card.classList.add("card","hover:cursor-pointer", "hover:shadow-[0_0_6px_-1px_rgba(255,255,255,0.75)]", "bg-[#3f3f3f]","flex","flex-col","gap-4" ,"rounded-lg", "m-1", "p-3");
        cardHeader.classList.add("text-xl", "font-bold", "text-white", "underline", "decoration-1", "underline-offset-2");
    }
    cardHeader.innerText = attribution.name;
    card.addEventListener("click", (e)=>{
        e.preventDefault();
        handleDropDown(attribution);
    });
    var cardBody = document.createElement("div");
    cardBody.setAttribute("id",`${attribution.name}-body`);
    cardBody.classList.add("flex", "flex-col", "gap-2");
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cards.appendChild(card);
});

// copyright 2024 by Aguru Darshan