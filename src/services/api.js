import axios from "axios";

const api = async () => {
    const apiBaseUrl = "https://api.thecatapi.com/v1"; // URL base da API
    const apiKey =
        "live_bzLCTawJsBZp00ZjtcbokGRMJCumeLL4003NN60xlDANL0B9wkuCUEMPG6fD4S31";

    try {
        const response = await axios.get(`${apiBaseUrl}/breeds`, {
            headers: {
                "x-api-key": apiKey,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as raças de gatos:", error);
        return [];
    }
};

export default api;
