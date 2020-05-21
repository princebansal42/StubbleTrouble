import axios from "axios";

const bidForAuction = async (auction_id, bidPrice) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        bidPrice,
    });
    try {
        const res = await axios.put(`/api/auctions/${id}/bid`, body, config);
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
    }
};

export default bidForAuction;
