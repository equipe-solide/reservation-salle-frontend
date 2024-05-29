import { Confirm } from "notiflix";

const NotiflixConfirm = (
  title = "Suppression",
  message = "Voulez-vous vraiment effectuer l'operation ?",
) => {
  return new Promise((resolve) => {
    Confirm.show(
      title,
      message,
      "Oui",
      "Non",
      () => {
        resolve();
      },
      () => {},
      {
        width: "320px",
        // borderRadius: "10px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
        failureTitleColor: "red",
        failureOkButtonBackground: "red",
        failureCssAnimationStyle: "zoom",
        cssAnimationDuration: 1500,
      }
    );
  });
};

export default NotiflixConfirm;
