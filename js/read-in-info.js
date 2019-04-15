"use strict";

let found;


$.get('../txt/', function (data) {
    $(data).find("a:contains(.txt)").each(function () {
        console.log($(this).attr("href"));
    });
});
