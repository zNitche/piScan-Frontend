interface ApiResponse<T> {
	code: number;
	data: T | undefined;
}

export default ApiResponse;
