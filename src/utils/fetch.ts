export function addSearchParamsToUrl(
    url: string | URL,
    searchParams?: Record<string, string | number | null | undefined>,
) {
    const urlObj = typeof url === "string" ? new URL(url) : url;

    if (searchParams) {
        for (const key in searchParams) {
            const value = searchParams[key];

            if (key && value !== undefined && value != null && value !== "") {
                urlObj.searchParams.append(key, value.toString());
            }
        }
    }

    return urlObj;
}

export async function getData<ResponseDataType>(
    url: string | URL,
    searchParams?: Record<string, string | number | null | undefined>,
) {
    const urlObj = addSearchParamsToUrl(url, searchParams);

    const res = await fetch(urlObj.toString(), {
        method: "GET",
        headers: {},
    });

    const resData = (await res.json()) as ResponseDataType | undefined;
    return resData;
}
