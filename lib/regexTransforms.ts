export function rmExtension(input: string): string {
    return input.replace(/\.[^.]+$/, "");
}