import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const getAllUserOrder = async (req, res) => {
    try {
        const order = await orderModel
            .find({})
            .populate({ path: "buyer", model: userModel })
            .populate({ path: "products.seller", model: userModel });

        res.status(200).send({
            success: true,
            orders: order,
        });
    } catch (error) {
        console.error("Error in getting all user Orders:", error);
        res.status(500).send("Error in getting all user orders");
    }
};

export default getAllUserOrder;

