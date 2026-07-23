"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.port = exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
exports.port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const runtime = process.env.CODESPACE_NAME ? 'codespaces' : 'localhost';
exports.app.use(express_1.default.json());
exports.app.use('/api', routes_1.default);
exports.app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: exports.apiBaseUrl });
});
exports.app.get('/api/config', (_req, res) => {
    res.json({
        runtime,
        port: exports.port,
        apiBaseUrl: exports.apiBaseUrl,
        codespaceName: process.env.CODESPACE_NAME || null,
    });
});
function startServer() {
    return exports.app.listen(exports.port, () => {
        console.log(`OctoFit backend listening on port ${exports.port}`);
    });
}
