import type { MailInbox } from "~/types/inbox";

// TODO: update api work to handke multilens in input

export async function startWarmup(mails: any[]) {
  for (const mail of mails) {
    try {
      const response = await useApi("/mailboxes/startWarmup", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      return { success: true, response: response };
    } catch (error) {
      console.error(error);
      return { success: false, error: error };
    }
  }
}
export async function stopWarmup(mails: any[]) {
  for (const mail of mails) {
    try {
      const response = await useApi("/mailboxes/stopWarmup", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      return { success: true, response: response };
    } catch (error) {
      console.error(error);
      return { success: false, error: error };
    }
  }
}
export async function removeMails(mails: any[]) {
  for (const mail in mails) {
    try {
      const response = await useApi("/mailboxes/remove", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      return { success: true, response: response };
    } catch (error) {
      console.error(error);
      return { success: false, error: error };
    }
  }
}
