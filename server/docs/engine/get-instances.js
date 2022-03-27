module.exports = {
    get:{
        tags: ["Engine"],
        description: "JSON listing of the active instances running on the server",
        operationId: "getInstances",
        parameters: [],
        responses:{ 200:{ $ref: "#/components/responses/gameInstancesResponse" } }
    }
}