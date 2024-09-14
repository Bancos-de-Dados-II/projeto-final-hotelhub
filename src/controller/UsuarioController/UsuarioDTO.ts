import { z } from "zod";

const UsuarioSchema = z.object({
    cpf: z.string().regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/, "Invalid CPF"),
    email: z.string().email("Invalid email"),
    nome: z.string().min(1, "Name is required"),
    telefone: z.string().min(8, "Invalid phone number")
})

type UsuarioDTO = z.infer<typeof UsuarioSchema>;

export { UsuarioDTO, UsuarioSchema };

