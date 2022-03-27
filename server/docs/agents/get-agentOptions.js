module.exports = {
    get:{
        tags: ["Agents"],
        description: "Get character options for agents",
        operationId: "getAgentOptions",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ '200':{ $ref: "#/components/responses/agentOptionsResponse" } }
    }
}