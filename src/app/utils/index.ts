export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
    return (Object.keys(target) as K[]).reduce(
        (res: any, key) => {
            if (!omitKeys.includes(key)) {
                res[key] = target[key];
            }
            return res;
        },
        {} as Omit<T, K>
    );
}

String.prototype.truncate = function(this: string, n: number) {
    return this.length > n ? this.substring(0, n - 1) + "..." : this;
};
