export type Mail = {
  name: string;
  address: string;
  request: string;
};

export interface State {
  mails: Array<Mail>;
}

/**
 *  Kept it as a const not as a class due to absence of any complexity or additional methods.
 */
export const appState: State = { mails: [] };
