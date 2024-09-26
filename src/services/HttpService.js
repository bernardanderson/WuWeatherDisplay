class HttpService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getData(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error);
            throw error;
        }
    }
}

export default HttpService;
