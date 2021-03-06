"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportBmp = exports.exportPng24 = exports.exportPng = exports.exportIcns = exports.exportIco = void 0;
const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const log = require("./log");
function run(exe, from, to, width, height, format, background, callback) {
    let params = ['from=' + from, 'to=' + to, 'format=' + format, 'keepaspect'];
    if (width > 0)
        params.push('width=' + width);
    if (height > 0)
        params.push('height=' + height);
    if (background !== undefined)
        params.push('background=' + background.toString(16));
    let child = cp.spawn(exe, params);
    child.stdout.on('data', (data) => {
        // log.info('kraffiti stdout: ' + data);
    });
    child.stderr.on('data', (data) => {
        log.error('kraffiti stderr: ' + data);
    });
    child.on('error', (err) => {
        log.error('kraffiti error: ' + err);
    });
    child.on('close', (code) => {
        if (code !== 0)
            log.error('kraffiti exited with code ' + code);
        callback();
    });
}
function findIcon(icon, from, options) {
    if (icon && fs.existsSync(path.join(from, icon)))
        return path.join(from, icon);
    if (fs.existsSync(path.join(from, 'icon.png')))
        return path.join(from, 'icon.png');
    else
        return path.join(options.kha, 'Kinc', 'Tools', 'kraffiti', 'icon.png');
}
function exportIco(icon, to, from, options) {
    run(options.kraffiti, findIcon(icon, from.toString(), options), to.toString(), 0, 0, 'ico', undefined, function () { });
}
exports.exportIco = exportIco;
function exportIcns(icon, to, from, options) {
    run(options.kraffiti, findIcon(icon, from.toString(), options), to.toString(), 0, 0, 'icns', undefined, function () { });
}
exports.exportIcns = exportIcns;
function exportPng(icon, to, width, height, background, from, options) {
    run(options.kraffiti, findIcon(icon, from.toString(), options), to.toString(), width, height, 'png', background, function () { });
}
exports.exportPng = exportPng;
function exportPng24(icon, to, width, height, background, from, options) {
    run(options.kraffiti, findIcon(icon, from.toString(), options), to.toString(), width, height, 'png24', background, function () { });
}
exports.exportPng24 = exportPng24;
function exportBmp(icon, to, width, height, background, from, options) {
    run(options.kraffiti, findIcon(icon, from.toString(), options), to.toString(), width, height, 'bmp', background, function () { });
}
exports.exportBmp = exportBmp;
//# sourceMappingURL=Icon.js.map