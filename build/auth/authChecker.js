"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = ({ context: { user } }, roles) => {
    if (user) {
        if (roles.length > 0)
            return roles.includes(user.role);
        return true;
    }
    return false;
};
