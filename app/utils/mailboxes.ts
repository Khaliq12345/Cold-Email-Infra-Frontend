import type { MailInbox } from "~/types/inbox";
// TODO: update api work to handke multilens in input
export default async function startWarmup(mails) {
  for (const mail in mails) {
    try {
      const response = await useApi("/mailboxes/startWarmup", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
export default async function stopWarmup(mails) {
  for (const mail in mails) {
    try {
      const response = await useApi("/mailboxes/stopWarmup", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
export default async function removeMails(mails) {
  for (const mail in mails) {
    try {
      const response = await useApi("/mailboxes/remove", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
