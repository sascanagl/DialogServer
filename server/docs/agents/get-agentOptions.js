module.exports = {
    get:{
        tags: ["Agents"],
        description: "Get character options for agents",
        operationId: "getAgentOptions",
        parameters: [],
        responses:{
            200:{
                description: "JSON Map of Arrays of Objects with id and text",
                type: "object",
                schema: { $ref: "#/components/schemas/mapOptions" }
            }
        }
    }
}