interface IContextRegisterUserCommand {
  name: string;
  title: string;
  email: string;
  password: string;
  description: string;
  link: string;
}

interface IForgotPasswordCommand {
  name: string;
  email: string;
  codePassword: string;
}

export { IContextRegisterUserCommand, IForgotPasswordCommand };
