import type { MailInbox } from "~/types/inbox";

// TODO: update api work to handke multilens in input

export async function startWarmup(mails: any[]) {
  for (const mail of mails) {
    try {
      await useApi("/mailboxes/startWarmup", {
        method: "POST",
        body: JSON.stringify(mail),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export async function stopWarmup(mails: any[]) {
  for (const mail of mails) {
    try {
      await useApi("/mailboxes/stopWarmup", {
        method: "POST",
        body: JSON.stringify(mail),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export async function removeMails(mails: any[]) {
  for (const mail in mails) {
    try {
      await useApi("/mailboxes/remove", {
        method: "POST",
        body: JSON.stringify(mail),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
