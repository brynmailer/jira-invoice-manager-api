"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = ({ context: { req } }) => {
    return !!req.session.userId;
};
