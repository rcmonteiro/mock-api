"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app
    .listen({
    host: '0.0.0.0',
    port: 4001,
})
    .then(() => {
    console.log('');
    console.log('🤘 Mock API is running!');
});
