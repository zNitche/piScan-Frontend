export default function clsx(...args: Array<string | undefined>): string {
    return args.filter(x => x).join(" ");
}