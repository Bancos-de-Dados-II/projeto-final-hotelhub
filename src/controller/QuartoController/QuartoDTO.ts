import { z } from "zod";

const QuartoSchema = z.object({
    numero: z.number().min(1, "Invalid number room"),
    preco: z.number().min(1, "Invalid price"),
    tipo: z.string().min(1, "Type is required"),
    hotelCNPJ: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,"Invalid CNPJ"),
})

type QuartoDTO = z.infer<typeof QuartoSchema>;

export { QuartoDTO, QuartoSchema };
