import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../functions/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/summary", async (request, reply) => {
		console.log("GET /summary called"); // Log para verificar se a rota está sendo chamada
		try {
			const { summary } = await getWeekSummary();
			return { summary };
		} catch (error) {
			console.error("Error fetching summary:", error); // Log de erro caso ocorra um problema
			reply.status(500).send({ error: "Internal Server Error" });
		}
	});
};
