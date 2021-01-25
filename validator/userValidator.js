// 后端预校验
const userSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
            maxLength: 255,
            minLength: 3
        },
        password: {
            type: "string",
            pattern: '^[A-Za-z0-9]{6,20}$',
            maxLength: 20,
            minLength: 6
        },
        gender: {
            type: "string",
            pattern: '[1,2,3]',
            maxLength: 1,
            minLength: 1
        }
    },
    required: ["username", "password"]
}
module.exports = userSchema;