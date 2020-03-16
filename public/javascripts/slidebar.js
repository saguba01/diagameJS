var statusWidthResize = ($( window ).width() <= 900 )
var firstReload = true
$(document).ready(()=>{
    screenResize()
    firstReload = false
    $("button").click(function(){
        
    });
})
$( window ).resize(function() {
    screenResize()
});

/*
*Description: Check screen size
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript
*/
function screenResize(){
    const width = $( window ).width()
    let ele = $("<a></a>")
    const navbar = $(".navbar-fixed .nav-wrapper") 
    ele.css({
        "position" : "absolute",
        "margin-left" : "10px",
        "display" : "none"
    })
    .addClass("canClick")
    .addClass("menuHamburger")
    .html(
        $("<div></div>")
        .addClass("bg-orange")
        .addClass("btn-top")
        .html(
            $("<i></i>").css({
                "width" : "100%" ,
                "height" : "100%;"
            })
            .addClass("btn-menu-hamburger")
        )
    )
    if(width <= 900){
        if(!statusWidthResize || firstReload){
            $(".slidebar").hide("slide", { direction: "left" }, 500);
            navbar.prepend( ele);
            ele.show("slide", { direction: "left" }, 500);
            statusWidthResize = true
        }
    }else{
        if(statusWidthResize || firstReload){
            $(".slidebar").show("slide", { direction: "left" }, 500);
            // ele.remove();
            try{
                $(".menuHamburger").hide("slide", { direction: "left" }, 500 , ()=>{
                    $(".menuHamburger").remove()
                });
                // 
            }catch(e){
                console.log(" Not have element!! ")
            }
            statusWidthResize = false
        }
    }
}


/*
*Description: hide slidebar
*@version 1.0
*@author Supachai Boonying
*@since 10 March 2020
*@required javascript
*/
function submenuToggle(ele){
    const item = $(ele.parentNode)
    const submenu = item.find( ".slidebar-item-sub" )
    submenu.slideToggle();
}