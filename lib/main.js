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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
const utils = __importStar(require("./utils"));
const tool = __importStar(require("./toolsHelper"));
const pypi = __importStar(require("./pypirc"));
const pip = __importStar(require("./pip"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        core.info('Generate configurations for PyPI');
        const inputs = context.getInputs();
        // 检查参数是否合法
        if (!utils.checkInputs(inputs)) {
            core.setFailed('parameter is not correct.');
            return;
        }
        if (inputs.pypiOperationType === 'upload') {
            core.info('Generate pypirc configurations for uploading PyPI packages.');
            // 安装依赖工具twine
            yield tool.installPythonTool('twine');
            // 安装依赖工具build
            yield tool.installPythonTool('build');
            // 生成.pypirc配置内容
            pypi.generatePypirc(inputs);
        }
        if (inputs.pypiOperationType === 'install') {
            core.info('Generate pip configurations for downloading PyPI packages.');
            // 生成pip配置内容
            pip.generatePipConfig(inputs);
        }
        core.info(utils.getPypiTips(inputs));
    });
}
exports.run = run;
run().catch(core.setFailed);
//# sourceMappingURL=main.js.map