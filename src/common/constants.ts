export const PASSWORD_REGEXP =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\^@$!%*?()\-&#=_+~><\.]{10,}/;
export const EMAIL_REGEXP =
  /^[\w\.\+\-ʼ`&#=_~.+^$!%*?{}]{1,64}@([\w-]){1,63}\.[\w-]{2,63}$/;

export const PASSWORD_GENERATOR_SETTINGS = {
  length: 15,
  numbers: true,
  symbols: true,
  exclude: '}{[]|:;"/.,`',
  strict: true,
};
