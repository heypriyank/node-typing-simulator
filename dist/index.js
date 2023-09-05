"use strict";
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
exports.typingSimulator = void 0;
function wait(time) {
    const currTime = new Date().getTime();
    let newTime = new Date().getTime();
    while (newTime < currTime + time) {
        newTime = new Date().getTime();
    }
}
function simulateTypingWithMistakes(sentence, typingSpeed, mistakeProbability, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let currentIndex = 0;
            let currentText = "";
            const typeInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (currentIndex === sentence.length) {
                    clearInterval(typeInterval);
                    yield new Promise((resolve) => setTimeout(resolve, typingSpeed));
                    // Simulate erasing
                    const eraseInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                        if (currentText.length === 0) {
                            clearInterval(eraseInterval);
                            resolve();
                            return;
                        }
                        currentText = currentText.slice(0, -1);
                        cb(currentText);
                    }), typingSpeed / 2); // Erase at double the typing speed
                    return;
                }
                const currentChar = sentence[currentIndex];
                const isMistake = Math.random() < mistakeProbability;
                if (isMistake) {
                    // Simulate a mistake
                    const mistakenChar = getRandomChar();
                    currentText += mistakenChar;
                    cb(currentText);
                    wait(typingSpeed / 1.5);
                    currentText = currentText.slice(0, -1);
                    cb(currentText);
                    wait(typingSpeed / 1.5);
                    currentText += currentChar;
                    cb(currentText);
                }
                else {
                    currentText += currentChar;
                    cb(currentText);
                }
                currentIndex++;
            }), typingSpeed);
        });
    });
}
function getRandomChar() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}
function typingSimulator(input, timeout, typingSpeed = 50, mistakeProbability = 0.5, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            for (const sentence of input) {
                yield simulateTypingWithMistakes(sentence, typingSpeed, mistakeProbability, cb);
                yield new Promise((resolve) => setTimeout(resolve, timeout));
            }
        }
    });
}
exports.typingSimulator = typingSimulator;
//# sourceMappingURL=index.js.map