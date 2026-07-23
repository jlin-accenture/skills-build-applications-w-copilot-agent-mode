"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiBaseUrl_1 = require("./config/apiBaseUrl");
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const runtime = process.env.CODESPACE_NAME ? 'codespaces' : 'localhost';
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: apiBaseUrl_1.apiBaseUrl });
});
app.get('/api/config', (_req, res) => {
    res.json({
        runtime,
        port,
        apiBaseUrl: apiBaseUrl_1.apiBaseUrl,
        codespaceName: process.env.CODESPACE_NAME || null,
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
