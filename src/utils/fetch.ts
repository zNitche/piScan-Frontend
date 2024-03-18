export function addSearchParamsToUrl(
	url: string | URL,
	searchParams?: Record<string, string | number | null | undefined>
) {
	const urlObj = typeof url === "string" ? new URL(url) : url;
			
	if (searchParams) {
		for (const key in searchParams) {
			const value = searchParams[key];

			if (key && value) {
				urlObj.searchParams.append(key, value.toString());
			}
		}
	}

	return urlObj;
}
