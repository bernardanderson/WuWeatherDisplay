class HttpService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getData(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(await this.describeHttpError(response));
            }

            // Some WU endpoints answer with an empty body (e.g. 204). Parse safely so the
            // caller receives a meaningful message instead of a raw JSON parse failure.
            const text = await response.text();
            try {
                return JSON.parse(text);
            } catch {
                throw new Error(`Server responded with HTTP ${response.status} and an empty or unparseable body`);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            throw error;
        }
    }

    // Weather Underground carries a human readable message inside its error payloads,
    // e.g. {"errors":[{"error":{"code":"CDN-0001","message":"Invalid apiKey."}}]}
    async describeHttpError(response) {
        try {
            const body = await response.text();
            let detail;
            try {
                const parsed = JSON.parse(body);
                detail = parsed.errors[0].error.message;
            } catch {
                // Some WU error bodies are plain text (e.g. "apikey is not authorized for this product"); use it as-is.
                if (body && body.trim() && !body.trim().startsWith("<"))
                    detail = body.trim();
            }

            if (typeof detail === "string" && detail) {
                return `Weather request failed with HTTP ${response.status} — ${detail.replace(/\.$/, "")}`;
            }
        } catch { /* body could not be read */ }

        return `HTTP ${response.status} error`;
    }
}

export default HttpService;
