"use strict";

module.exports = function() {
    if (!window.user.displayName) {
        window.localStorage.setItem(
            'onAuthCallback', window.location.pathname
        );
        window.location = '/twitter/login';
        
        throw new Error("Not logged in...logging in");
    }
};
