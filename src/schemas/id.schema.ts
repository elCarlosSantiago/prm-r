import { z } from "zod"

export const idSchema = z.object({
  id: z.string(),
})

export type IDSchema = z.infer<typeof idSchema>
