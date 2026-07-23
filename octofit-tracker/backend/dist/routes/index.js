"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activities_1 = __importDefault(require("./activities"));
const leaderboard_1 = __importDefault(require("./leaderboard"));
const teams_1 = __importDefault(require("./teams"));
const users_1 = __importDefault(require("./users"));
const workouts_1 = __importDefault(require("./workouts"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/users', users_1.default);
apiRouter.use('/teams', teams_1.default);
apiRouter.use('/activities', activities_1.default);
apiRouter.use('/leaderboard', leaderboard_1.default);
apiRouter.use('/workouts', workouts_1.default);
exports.default = apiRouter;
