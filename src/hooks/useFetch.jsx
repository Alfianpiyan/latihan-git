import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData]       = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(false);

    useEffect(() => {
        if (!url) return;

        setLoading(true);
        setError(null); // reset error before fetching
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data); // HANYA 6 PRODUK
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err)
                setLoading(false);
            });
    }, [url])

    return {
        data, loading, error
    }

}

export default useFetch