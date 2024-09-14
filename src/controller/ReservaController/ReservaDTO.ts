import { z } from "zod";

const ReservaSchema = z.object({
    numero: z.number().min(1, "User is required"),
    checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida para check-in"),
    checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida para checkout"),
    usuarioCPF: z.string().regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/, "Invalid CPF"),
    
    quartoNumero: z.number().min(1, "Invalid number of the room"),
    hotelCNPJ: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,"Invalid CNPJ")
});

type ReservaDTO = z.infer<typeof ReservaSchema>;

export { ReservaDTO, ReservaSchema };