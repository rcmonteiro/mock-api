"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const GET = async (app) => {
    app.get('*', {}, async (request, reply) => {
        reply.send({ message: 'Hello World!' });
    });
};
exports.GET = GET;
