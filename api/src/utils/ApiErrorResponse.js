class ApiErrorResponse{
    constructor(
        statusCode,
        data,
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.success = false
    }
}

export { ApiErrorResponse };