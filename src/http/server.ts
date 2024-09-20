import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createGoalCompletionRoute } from "./routes/create-goal-completion";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import { getWeekPendingGoalsRoute } from "./routes/get-week-pending-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: (origin, cb) => {
		const allowedOrigins = [
			"https://inorbityago.netlify.app",
			"http://localhost:3000", // Permitir localhost durante o desenvolvimento
		];

		if (!origin || allowedOrigins.includes(origin)) {
			cb(null, true); // Permite a requisição
		} else {
			cb(new Error("Not allowed"), false); // Bloqueia outras origens
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getWeekSummaryRoute);
app.register(getWeekPendingGoalsRoute);

const port = Number(process.env.PORT) || 3333; // Converte para número ou usa 3333 como fallback

app.listen({ port }).then(() => {
	console.log(`HTTP server running on port ${port}`);
});
