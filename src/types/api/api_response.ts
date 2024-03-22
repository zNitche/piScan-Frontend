interface ApiResponse<ResponseDataType> {
    code: number;
    data: ResponseDataType | undefined;
}

export default ApiResponse;
