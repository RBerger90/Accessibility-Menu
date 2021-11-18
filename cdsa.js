
//to now if the menu is built or not
let cdsa_menu_is_built = false;
//used to create element at the top of the DOM
let first_body_tag = document.getElementsByTagName("body")[0];



//Different box of the accessibility menu --------------------

//Big boxes have a title and two buttons
function createBigBox(id, title, evPlus, evMinus) {
    let bigBox = document.createElement("div");
    addClass(bigBox, "cdsa_menu_big_box");
    bigBox.id = id;

    let bigBox_title = document.createElement("h3");
    bigBox_title.innerText = title;

    bigBox.appendChild(bigBox_title);
    //each big box has 2 options : plus and minus
    bigBox.appendChild(createSmallBox("+", evPlus));
    bigBox.appendChild(createSmallBox("-", evMinus));
    return bigBox;
}

//Small boxes have a text (description) and an event on click
function createSmallBox(text, event) {
    let smallBox = document.createElement("div");
    addClass(smallBox, "cdsa_menu_small_box");
    smallBox.setAttribute("role","button");

    let smallBox_txt = document.createElement("p");
    smallBox_txt.innerText = text;

    smallBox.addEventListener("click", event);

    smallBox.appendChild(smallBox_txt);
    return smallBox;
}

//"normal" box are similar to small box but they are independent
function createBox(id, text, event) {
    let box = document.createElement("div");
    addClass(box, "cdsa_menu_box");
    box.id = id;
    box.setAttribute("role","button");

    let box_txt = document.createElement("p");
    box_txt.innerText = text;

    box.addEventListener("click", event);

    box.appendChild(box_txt);
    return box;
}


//Button creation when the page is loaded

document.addEventListener("DOMContentLoaded", () => {
    addClass(document.body, "font_1");
    addClass(document.body, "space_1");
    addClass(document.body, "line_1");

    let cdsa_btn = document.createElement("button");
    cdsa_btn.id = "cdsa_button";
    cdsa_btn.setAttribute("aria-label", "accessibility menu");

    //Add the button as thee first element of the body on the DOM
    first_body_tag.insertAdjacentElement('afterbegin', cdsa_btn);

    //We create the menu only if the button is pressed
    document.getElementById("cdsa_button").addEventListener("click", () =>{
        if(cdsa_menu_is_built === false) { //generate the menu
            cdsa_menu_is_built = true;
            let cdsa_mnu = document.createElement("section");
            cdsa_mnu.id = "cdsa_menu";
            toggleClass(cdsa_mnu, "cdsa_menu_open");
            toggleClass(cdsa_btn, "cdsa_menu_open");

            //Menu title ------------------------------------------------------
            let cdsa_mnu_title = document.createElement("h2");
            cdsa_mnu_title.innerText = "Accessibility Menu";
            cdsa_mnu.appendChild(cdsa_mnu_title);

            //Button for the font size ------------------------------------------------------
            cdsa_mnu.appendChild(createBigBox("cdsa_menu_box_font", "Font size", augment_font_size, reduce_font_size));
            //Button for the span size ------------------------------------------------------
            cdsa_mnu.appendChild(createBigBox("cdsa_menu_box_space", "Letter space", augment_space_size, reduce_space_size));
            //Button for the line size ------------------------------------------------------
            cdsa_mnu.appendChild(createBigBox("cdsa_menu_box_line", "Lines height", augment_line_height, reduce_line_height));

            //Buttons to toggle settings ------------------------------------------------------
            //Contrast ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_contrast", "High contrast", high_contrast));
            //Bold ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_bold", "Bold", bold_font));
            //Link ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_link", "Highlight link", highlight_link));
            //Guide ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_guide", "Reading guide", reading_guide));
            //Default ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_default", "Default", default_style));

            //Add the menu to the DOM
            document.getElementById("cdsa_button").insertAdjacentElement('afterend', cdsa_mnu);

            //Guide object --------
            let cdsa_guide_obj = document.createElement("div");
            cdsa_guide_obj.id = "cdsa_guide";
            document.getElementById("cdsa_menu").insertAdjacentElement("afterend", cdsa_guide_obj);
            contrast_background(); //add specific classes to different background

        }else{
            //If the menu is created, we only make it visible or not for each click
            toggleClass(document.getElementById("cdsa_menu"), "cdsa_menu_open");
            toggleClass(cdsa_btn, "cdsa_menu_open");
        }
    })
})


//Close menu by clicking somewhere else
document.addEventListener("click", (e) => {
    if (cdsa_menu_is_built === true) {
        let cdsa_mnu = document.getElementById("cdsa_menu");
        let cdsa_btn = document.getElementById("cdsa_button");
        let clicked = e.target;

        do {
            if (clicked === cdsa_mnu || clicked === cdsa_btn) {
                return;
            }
            clicked = clicked.parentNode;
        } while (clicked);

        removeClass(cdsa_mnu, "cdsa_menu_open");
        removeClass(cdsa_btn, "cdsa_menu_open");
    }
});



function reduce_font_size() {
    reduce("font_");
}

function augment_font_size() {
    augment("font_");
}

function reduce_space_size() {
    reduce("space_");
}

function augment_space_size() {
    augment("space_");
}

function reduce_line_height() {
    reduce("line_");
}

function augment_line_height() {
    augment("line_");
}


//Functions to change classes
function reduce(name){
    if(hasClass(document.body,name+"1")){
        return 0;
    }else{
        for(let i = 5; i > 1 ; i--) {
            if (hasClass(document.body, name+i)) {
                removeClass(document.body, name+i);
                i --;
                addClass(document.body, name+i);
                return 0;
            }
        }
    }
}

function augment(name){
    if(hasClass(document.body,name+"5")){
        return 0;
    }else{
        for(let i = 1; i < 5; i++) {
            if (hasClass(document.body, name+i)) {
                removeClass(document.body, name+i);
                i ++;
                addClass(document.body, name+i);
                return 0;
            }
        }
    }
}

//Put on the high contrast mode by adding some classes
function high_contrast() {
    toggleClass(document.getElementById("cdsa_menu_contrast"), "cdsa_option_active");
    let listOfA = document.getElementsByTagName("a");
    let listOfTr = document.getElementsByTagName("tr");
    let listOfTd = document.getElementsByTagName("td");
    let list = [...listOfTr, ...listOfTd, ...listOfA];
    for(let i = 0; i < list.length; i++){
        toggleClass(list[i], "high_contrast");
    }
    toggleClass(document.getElementById("cdsa_guide"),"high_contrast");
    toggleClass(document.getElementById("cdsa_menu"),"high_contrast");
    toggleClass(document.getElementById("cdsa_button"),"high_contrast");
    toggleClass(document.body,"high_contrast");
}

//Change color of background correctly when high contrast active
function contrast_background(){
    let listOfTr = document.getElementsByTagName("tr");
    let listOfTd = document.getElementsByTagName("td");
    let listOfTab = [...listOfTr, ...listOfTd];
    for(let i = 0; i < 300; i++){

        switch(listOfTab[i].bgColor){
            case "#64D264" : //green title
            case "#317D8D" :
                addClass(listOfTab[i],"bg_green_title");
                break;
            case "#CDFFCD" : //green content
            case "#CCFFCC" :
                addClass(listOfTab[i],"bg_green");
                break;
            case "#3264A0" : //blue title
                addClass(listOfTab[i],"bg_blue_title");
                break;
            case "#FFFFCC" : //yellow content
            case "#FFFF99" :
                addClass(listOfTab[i],"bg_yellow");
                break;
            case "#CCCCFF" : //purple content
            case "#DDF" :
                addClass(listOfTab[i],"bg_purple");
                break;
            case "#FFFFFF" : //white content
                addClass(listOfTab[i],"bg_white");
                break;
            default :
                break;
        }
    }

}

//transform all the text into bold ones
function bold_font() {
    toggleClass(document.getElementById("cdsa_menu_bold"), "cdsa_option_active");
    toggleClass(document.body, "bold_text");
    toggleClass(document.getElementsByClassName("lead")[0], "lead_bold"); //Change this if there is more than one .lead element
}

//Create a visible box around the link for a better readability
function highlight_link() {
    toggleClass(document.getElementById("cdsa_menu_link"), "cdsa_option_active");
    let link = document.getElementsByTagName("a");
    for(let i = 0; i < link.length; i++){
        toggleClass(link[i], "highlight_link");
    }
}

//Make visible a bar which follow the mouse to stay focus on a line when reading
function reading_guide() {
    toggleClass(document.getElementById("cdsa_guide"), "cdsa_guide_active");
    toggleClass(document.getElementById("cdsa_menu_guide"), "cdsa_option_active");
}

//function used to make the guide following the mouse
document.addEventListener("pointermove", (e) => {
    if(cdsa_menu_is_built===true) {
        let guide = document.getElementById("cdsa_guide");
        if (hasClass(guide, "cdsa_guide_active")) {
            let a = 0;
            a = guide.style.borderTopWidth;
            guide.style.top = e.clientY - 3030 + "px"; //because border fixed at 3000px
            console.log(a);
        }
    }else{
        return 0;
    }
})

//function to fixe the menu button above tail
document.addEventListener("scroll", () => {
    let marge= 30;
    let bottom_index = window.scrollY + window.innerHeight; //pixel index of the page at the bottom of the viewport
    let tail_position = document.getElementsByClassName("cdstail")[0].offsetTop; //pixel index of the tail from the top of the page
    if (bottom_index > tail_position) {
        marge = 30 + bottom_index - tail_position;
    } else {
        marge = 30;
    }
    document.getElementById("cdsa_button").style.bottom = marge + "px";
    document.getElementById("cdsa_button").style.bottom = "transition: none";
})

//refresh the page to erase all styles
function default_style() {
    location.reload();
}


//Useful functions from plainjs.com to manipulate class
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

function toggleClass(el, className) {
    if(hasClass(el, className)){
        removeClass(el, className);
    }else{
        addClass(el, className);
    }
}