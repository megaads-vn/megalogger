/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    
    $("#boxscroll").niceScroll({cursorborder:"",cursorcolor:"#00F",boxzoom:true}); // First scrollable DIV
    
    
    $('.key').click(function (event) {
        $("#search-suggestion").show();
        event.stopPropagation();
    });
    $('body').click(function () {
        $("#search-suggestion").hide();
    });
});
$('.jscroll').niceScroll({
        cursorcolor: "#333",
        cursoropacitymin: 0.3,
        background: "#bbb",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30
    });

    