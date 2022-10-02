// ----- Interactable List
const ILS_LOGIN = {
  FIELD_EMAIL: () => $("#field-email"),
  FIELD_PASSWORD: () => $("#field-password"),
  INPUT_FIELD_EMAIL: () => $("#field-email-input"),
  INPUT_FIELD_PASSWORD: () => $("#field-password-input"),
  ICON_TOGGLE_PASSWORD: () => $("#field-password-icon"),
  BUTTON_TOGGLE_PASSWORD: () => $("#field-password-toggle"),
  BUTTON_SUBMIT: () => $("#login-submit"),
};

// ----- Guard
function checkIsLoggedin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) window.location.href = "index.html";
}
checkIsLoggedin();

// ----- Mounted
$(document).on("DOMContentLoaded", () => {
  registerListener();

  function registerListener() {
    const {
      BUTTON_SUBMIT,
      BUTTON_TOGGLE_PASSWORD,
      FIELD_EMAIL,
      FIELD_PASSWORD,
    } = ILS_LOGIN;

    FIELD_EMAIL().on("input", () => {
      FIELD_EMAIL().removeClass("error");
    });
    FIELD_PASSWORD().on("input", () => {
      FIELD_PASSWORD().removeClass("error");
    });

    BUTTON_TOGGLE_PASSWORD().on("click", () => {
      const { ICON_TOGGLE_PASSWORD, INPUT_FIELD_PASSWORD } = ILS_LOGIN;
      const TOGGLE_ICON = {
        true: "visibility",
        false: "visibility_off",
      };
      const TOGGLE_TYPE = {
        true: "text",
        false: "password",
      };

      const isPassword = String(
        INPUT_FIELD_PASSWORD().attr("type") === "password"
      );

      ICON_TOGGLE_PASSWORD().text(TOGGLE_ICON[isPassword]);
      INPUT_FIELD_PASSWORD().attr("type", TOGGLE_TYPE[isPassword]);
    });
    BUTTON_SUBMIT().on("click", () => {
      if (!validateForm()) return;
      submitForm();
    });

    BUTTON_TOGGLE_PASSWORD().on("click", () => {});
  }

  function validateForm() {
    let isPassed = true;
    const {
      FIELD_EMAIL,
      FIELD_PASSWORD,
      INPUT_FIELD_EMAIL,
      INPUT_FIELD_PASSWORD,
    } = ILS_LOGIN;

    const FORM_FIELD = {
      username: FIELD_EMAIL,
      password: FIELD_PASSWORD,
    };
    const FORM_VALUE = {
      username: INPUT_FIELD_EMAIL().val(),
      password: INPUT_FIELD_PASSWORD().val(),
    };
    const VALIDATION_RULE = {
      username: [validateNotEmpty],
      password: [validateNotEmpty],
    };
    const INVALID_MESSAGE = {
      username: ["Email cannot be empty"],
      password: ["Password cannot be empty"],
    };

    Object.keys(FORM_VALUE).forEach((key) => {
      VALIDATION_RULE[key].forEach((rule, indexRule) => {
        if (!rule(FORM_VALUE[key])) {
          isPassed = false;
          const errorMessage = INVALID_MESSAGE[key][indexRule];
          appendErrorMessage(FORM_FIELD[key], errorMessage);
        }
      });
    });

    return isPassed;
  }

  function submitForm() {
    toggleSubmitButton();
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    }).then(() => {
      toggleSubmitButton();
      window.location.href = "dashboard.html";
    });
  }

  function appendErrorMessage(element, message) {
    element().addClass("error");
    element().find("p.error").text(message);
  }

  function toggleSubmitButton() {
    const { BUTTON_SUBMIT } = ILS_LOGIN;
    const isDisabled = BUTTON_SUBMIT().prop("disabled");

    if (!isDisabled) {
      BUTTON_SUBMIT().prop("disabled", true);
      BUTTON_SUBMIT().text("Sedang dikirim...");
      return;
    }

    BUTTON_SUBMIT().prop("disabled", false);
    BUTTON_SUBMIT().text("Login");
  }
});
