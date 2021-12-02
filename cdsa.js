
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
            //Fullscreen Table ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_table", "Fullscreen Table", fullscreen_table));
            //Default ----
            cdsa_mnu.appendChild(createBox("cdsa_menu_default", "Default", default_style));

            //Add the menu to the DOM
            document.getElementById("cdsa_button").insertAdjacentElement('afterend', cdsa_mnu);

            //Guide object --------
            let cdsa_guide_obj = document.createElement("div");
            let cdsa_guide_bord1 = document.createElement("div");
            let cdsa_guide_bord2 = document.createElement("div");
            cdsa_guide_obj.id = "cdsa_guide";
            addClass(cdsa_guide_bord1,"cdsa_guide_border");
            addClass(cdsa_guide_bord2,"cdsa_guide_border");

            //class to avoid invisibility if fullscreen table on
            addClass(cdsa_btn,"cdsa");
            addClass(cdsa_guide_obj,"cdsa");
            addClass(cdsa_guide_bord1,"cdsa");
            addClass(cdsa_guide_bord2,"cdsa");
            class_on_all_children(cdsa_mnu,"cdsa", true);

            document.getElementById("cdsa_menu").insertAdjacentElement("afterend", cdsa_guide_obj);
            document.getElementById("cdsa_menu").insertAdjacentElement("afterend", cdsa_guide_bord1);
            document.getElementById("cdsa_menu").insertAdjacentElement("afterend", cdsa_guide_bord2);
            contrast_background(); //add specific classes to colored background

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
    toggleClass(document.getElementsByClassName("cdsa_guide_border")[0],"high_contrast");
    toggleClass(document.getElementsByClassName("cdsa_guide_border")[1],"high_contrast");
    toggleClass(document.body,"high_contrast");
}

//Change color of background correctly when high contrast active
function contrast_background(){
    let listOfTr = document.getElementsByTagName("tr");
    let listOfTd = document.getElementsByTagName("td");
    let listOfTh = document.getElementsByTagName("th");
    //let listOfDiv = document.getElementsByTagName("div");
    let ListGroup = [...listOfTr, ...listOfTd, ...listOfTh];

    for(let i = 0; i < ListGroup.length; i++){
        if(window.getComputedStyle(ListGroup[i]).backgroundColor !== "rgb(255, 255, 255)" //If not black, white or transparent, get a specific class
        && window.getComputedStyle(ListGroup[i]).backgroundColor !== "rgb(0, 0, 0)"
        && window.getComputedStyle(ListGroup[i]).backgroundColor !== "rgba(0, 0, 0, 0)"){
            addClass(ListGroup[i],"colored_bg");
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
        if(link[i].hasChildNodes()){
            let child = link[i].children;
            console.log(child);
            for(let j = 0; j < child.length; j++){
                console.log(child[j].tagName);
                if(child[j].tagName === "IMG"){
                    addClass(link[i],"has_image"); //Border around the image instead of under
                }
            }
        }
    }
}

//Make visible a bar which follow the mouse to stay focus on a line when reading
function reading_guide() {
    toggleClass(document.getElementById("cdsa_guide"), "cdsa_guide_active");
    toggleClass(document.getElementsByClassName("cdsa_guide_border")[0], "cdsa_guide_active");
    toggleClass(document.getElementsByClassName("cdsa_guide_border")[1], "cdsa_guide_active");
    toggleClass(document.getElementById("cdsa_menu_guide"), "cdsa_option_active");
}



//Allow to display a tab in fullscreen
function fullscreen_table(){ //PEUT ETRE RENDRE POSSIBLE QUE SI TABLE DANS DOM
    if(hasClass(document.getElementById("cdsa_menu_table"),"cdsa_option_active")){
        removeClass(document.getElementById("cdsa_menu_table"),"cdsa_option_active");
        removeClass(document.body,"warningTable");
        document.removeEventListener("mouseover",targetTable);
        document.removeEventListener("click",showTable);
        if(hasClass(document.body, "justTable")){
            removeClass(document.body,"justTable");
            let topElement = document.body.children;
            for(let i = 0; i < topElement.length; i++) {
                if (hasClass(topElement[i], "safe")) {
                    class_on_all_children(topElement[i], "safe", false);
                }
            }
        }
    }else{
        addClass(document.getElementById("cdsa_menu_table"),"cdsa_option_active");
        addClass(document.body,"warningTable");
        removeClass(document.getElementById("cdsa_menu"), "cdsa_menu_open"); //If we want to close the menu when option active
        removeClass(document.getElementById("cdsa_button"), "cdsa_menu_open"); //----
        document.addEventListener("mouseover",targetTable);
        document.addEventListener("click",showTable);
    }
}

//Add a specific class when hover to the closest table in the DOM
function targetTable(e){
    let mem = e.target;
    let verif = false;
    let target = document.getElementsByClassName("selectionFullscreen");
    while(verif === false) {
        if (mem === document.body) { //If we reach body we stop
            if (target.length > 0) {
                removeClass(target[0], "selectionFullscreen"); //We are not on a table anymore so we remove the class from the last one
            }
            verif = true;
        } else if (mem.tagName === "TABLE") {//for the first parent table we stop
            verif = true;
            if (target.length > 0) { e
                removeClass(target[0], "selectionFullscreen"); //We remove the class from the last table, by doing that, only one table will get the class even if it's the same
            }
            addClass(mem, "selectionFullscreen");//This class give big border to see which one is selected
            return 0;
        } else { //continue until a table or the body
            mem = mem.parentNode;
        }
    }
}

//Add a class to an element with a specific class on click
function showTable(){
    let safe = document.getElementsByClassName("selectionFullscreen"); //This is an array but there is only one element possible
    if (safe.length > 0) {
        addClass(document.body,"justTable");
        class_on_all_children(safe[0], "safe", true);
        class_on_all_parents(safe[0], "safe", true);
        removeClass(safe[0], "selectionFullscreen");

        document.removeEventListener("mouseover",targetTable);
        document.removeEventListener("click",showTable);

    }else{
       // alert("No table selected"); //Pop an alert if no table selected when clicked
    }
}

//Put or remove a class on an element and all its children
function class_on_all_children(el, className, bool){
    if(el.hasChildNodes()){
        let child = el.children;
        for(let i = 0; i < child.length; i++){
            class_on_all_children(child[i],className,bool);
        }
        if(bool === true){
            addClass(el, className);
        }else{
            removeClass(el, className);
        }

        return 0;
    }else{
        if(bool === true){
            addClass(el, className);
        }else{
            removeClass(el, className);
        }
        return 0;
    }
}

//put or remove a class on all parent of an element until <body>
function class_on_all_parents(el, className, bool){
    el = el.parentNode;
    if(el === document.body){
        return 0;
    }else{
        if(bool === true){
            addClass(el, className);
        }else{
            removeClass(el, className);
        }
        class_on_all_parents(el, className, bool);
        return 0;
    }
}

//function used to make the guide following the mouse
document.addEventListener("pointermove", (e) => {
    if(cdsa_menu_is_built===true) {
        let guide = document.getElementById("cdsa_guide");
        let bordUp = document.getElementsByClassName("cdsa_guide_border")[0];
        let bordDown = document.getElementsByClassName("cdsa_guide_border")[1];
        let a = window.innerHeight - e.clientY; //Index of the mouse from the bottom
        guide.style.top = e.clientY - 40 + "px"; //Value based on guide's height of 80px
        bordUp.style.bottom = a + 40 + "px";
        bordDown.style.top = e.clientY + 60 + "px";
    }else{
        return 0;
    }
})

//function to fixe the menu button above tail
document.addEventListener("scroll", () => {
    let marge= 30;
    let bottom_index = window.scrollY + window.innerHeight; //pixel index of the page at the bottom of the viewport
    let tail_position = document.getElementsByClassName("cdstail")[0].offsetTop; //pixel index of the tail from the top of the page
    if (bottom_index > tail_position && !hasClass(document.body,"justTable")) { //The button stay at the bottom if just table option is on
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