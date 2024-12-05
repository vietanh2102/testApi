export const rules = {
  email: [
    {
      required: true,
      message: "Enter your Email",
    },
    {
      min: 6,
      message: "Username must be at least 8 characters",
    },
  ],
  name: [
    {
      required: true,
      message: "Enter your username",
    },
  ],
  phone: [
    {
      required: true,
      message: "Enter your phone",
    },
  ],
  address: [
    {
      required: true,
      message: "Enter your address",
    },
  ],
  password: [
    {
      required: true,
      message: "Enter your Password",
    },
    {
      min: 6,
      message: "Password must be at least 8 characters",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Enter your Password",
    },
  ],
};
