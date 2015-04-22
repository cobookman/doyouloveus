"use strict";

module.exports = function(d) {
    var year = d.getFullYear();
    var date = ('' + d.getDate()).length === 2 ? d.getDate() : '0' + d.getDate();
    var month = ('' + d.getMonth()).length === 2 ? d.getMonth() : '0' + d.getMonth();
    return month + '/' + date + '/' + year;
};
