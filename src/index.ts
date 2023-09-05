function wait(time: number) {
    const currTime = new Date().getTime();
    let newTime = new Date().getTime();
    while (newTime < currTime + time) {
        newTime = new Date().getTime();
    }
}

async function simulateTypingWithMistakes(
    sentence: string,
    typingSpeed: number,
    mistakeProbability: number,
    cb: (val: string) => void
): Promise<void> {
    return new Promise<void>((resolve) => {
        let currentIndex = 0;
        let currentText = "";

        const typeInterval = setInterval(async () => {
            if (currentIndex === sentence.length) {
                wait(typingSpeed * 4);
                clearInterval(typeInterval);
                await new Promise<void>((resolve) =>
                    setTimeout(resolve, typingSpeed)
                );

                // Simulate erasing
                const eraseInterval = setInterval(async () => {
                    if (currentText.length === 0) {
                        clearInterval(eraseInterval);
                        resolve();
                        return;
                    }

                    currentText = currentText.slice(0, -1);
                    cb(currentText);
                }, typingSpeed / 2); // Erase at double the typing speed
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
            } else {
                currentText += currentChar;
                cb(currentText);
            }
            currentIndex++;
        }, typingSpeed);
    });
}

function getRandomChar(): string {
    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

async function typingSimulator(
    input: string[],
    timeout: number,
    typingSpeed: number = 50,
    mistakeProbability: number = 0.5,
    cb: (val:string) => void
): Promise<void> {
    while(true) {
        for (const sentence of input) {
            await simulateTypingWithMistakes(
                sentence,
                typingSpeed,
                mistakeProbability,
                cb
            );
            await new Promise<void>((resolve) => setTimeout(resolve, timeout));
        }
    }
}

export { typingSimulator }