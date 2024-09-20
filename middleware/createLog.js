import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

const createLog = (req, res, next) => {
    const { method, url } = req;
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0{day}` : day;
    hours = hours < 10 ? `0{hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const message = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} --- ${method} --- ${url}\n`;
    console.log(message);
    fs.appendFile(path.join(PATH, '..', 'logs', 'logs.txt'), message, (err) => {
        if (err) {
            console.error(err);
        }
    });
    next();
};

export default createLog;
