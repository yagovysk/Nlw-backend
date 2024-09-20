import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../functions/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/summary", async (request, reply) => {
		try {
			// Obtém o resumo da semana
			const { summary } = await getWeekSummary();

			// Verifica se os dados estão corretos antes de retornar
			if (!summary || typeof summary !== "object") {
				return reply.status(500).send({
					message: "Erro ao recuperar o resumo da semana.",
				});
			}

			// Garante que todos os campos essenciais estão presentes
			if (
				typeof summary.completed !== "number" ||
				typeof summary.total !== "number" ||
				typeof summary.goalsPerDay !== "object"
			) {
				return reply.status(500).send({
					message: "Dados inválidos no resumo da semana.",
				});
			}

			// Retorna o resumo com sucesso
			return { summary };
		} catch (error) {
			// Tratamento de erro genérico
			console.error("Erro na rota /summary:", error);
			return reply.status(500).send({
				message: "Ocorreu um erro ao processar o resumo da semana.",
				error: error instanceof Error ? error.message : "Erro desconhecido",
			});
		}
	});
};
