declare function typingSimulator(input: string[], timeout: number, typingSpeed: number, mistakeProbability: number, cb: (val: string) => void): Promise<void>;
export { typingSimulator };
