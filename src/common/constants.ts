export const PASSWORD_REGEXP =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\^@$!%*?()\-&#=_+~><\.]/;
export const EMAIL_REGEXP =
  /^[\w\.\+\-ʼ`&#=_~.+^$!%*?{}]{1,64}@([\w-]){1,63}\.[\w-]{2,63}$/;

export const PASSWORD_GENERATOR_SETTINGS = {
  length: 15,
  numbers: true,
  symbols: true,
  exclude: '}{[]|:;"/.,`',
  strict: true,
};

export const DEFAULT_AUCTION_PARAMS = { isDeleted: false };
export const DEFAULT_AUCTION_RELATIONS = ['owner', 'owner.profile'];
export const DEFAULT_AUCTION_SELECTION = {
  owner: {
    id: true,
    profile: {
      username: true,
    },
  },
};
