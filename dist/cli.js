"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const node_path_1 = __importDefault(require("node:path"));
const app_1 = require("./app");
const mock_api_1 = require("./mock-api");
const cli = new commander_1.Command();
cli
    .version('1.0.0')
    .description('Simple mock API for running frontend e2e tests')
    .option('-p, --port <number>', 'Port to run the mock API on')
    .option('-s, --schema <path>', 'Path to JSON schema file');
cli.parse(process.argv);
const args = cli.opts();
const options = {
    port: args.port ? parseInt(args.port) : 4001,
    schema: node_path_1.default.resolve(args.schema || './src/schemas/default.json'),
};
const mock = new mock_api_1.MockAPI(options, app_1.app);
mock.start();
