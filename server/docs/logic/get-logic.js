module.exports = {
    get:{
        tags: ["Logic"],
        description: "Get the logic table for the specified instance",
        operationId: "getLogic",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ '200':{ $ref: "#/components/responses/gameLogicResponse" } }
    }
}