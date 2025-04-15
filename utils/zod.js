const { z } = require('zod');    

const userSchema = z.object({

    username: z.string().regex(/^[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/, {
        message: "Name must contain only alphabets and at most two spaces",
    }),

    email: z.string().email(),

    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { 
        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),

    role: z.enum(['Consumers', 'Farmers']),

});

module.exports = userSchema;