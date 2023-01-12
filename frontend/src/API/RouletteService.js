import axios from "axios";

export default class RouletteService {
    static async get_results(data, setResults) {
        const response = await axios.get('http://127.0.0.1:8000/get-results')
        console.log(response)
        if (response.data) {
            for (let num of response.data) {
                data.map((res, indx) => {
                    if (res.option === num.number) {
                        setResults((results) => [data[indx], ...results.slice(0, 4)])
                    }
                })
            }
        }
        return response.data
    }
}