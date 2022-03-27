module.exports = {
    get:{
        tags: ["Logic"],
        description: "Get the instance worldInfo and zoneInfo",
        operationId: "getLocations",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ '200':{ $ref: "#/components/responses/gameLocationsResponse" } }
    }
}