"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAPI = void 0;
const chalk_1 = __importDefault(require("chalk"));
class MockAPI {
    options;
    app;
    constructor(options, app) {
        this.options = options;
        this.app = app;
        this.loadSchema();
    }
    async loadSchema() {
        const schema = await Promise.resolve(`${this.options.schema}`).then(s => __importStar(require(s)));
        console.log(schema);
    }
    start() {
        this.app
            .listen({
            host: '0.0.0.0',
            port: this.options.port,
        })
            .then(() => {
            console.log('');
            console.log(chalk_1.default.green('Starting mock API server...'));
            console.log(chalk_1.default.blue(`Port: ${this.options.port}`));
            console.log(chalk_1.default.blue(`Schema Path: ${this.options.schema}`));
            console.log('🤘 Mock API is running!');
        });
    }
}
exports.MockAPI = MockAPI;
