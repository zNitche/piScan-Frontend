export default function clsx(
    ...args: Array<string | undefined | false>
): string {
    return args.filter((x) => x).join(" ");
}
