import type { PreorderAppConfig } from "./Config.types";
import { initializeHubspotForms } from "./initializeForms";
import LocationInput from "./location-input/LocationInput.svelte";
import type { ParsedPlaceResult } from "./location-input/googlePlace/utils";

export const PreorderApp = {
  initialize: (props: PreorderAppConfig) => {
    const {
      targetElAddressInput,
      googlePublicApiKey,
      googleSheetConfig,
      hsFormSuccess,
      hsFormNewsletter,
      querySelectorClickToOpenForm,
      onAddressSelect,
      onAddressSubmitSuccess,
    } = props;

    // Initialize HubSpot forms
    initializeHubspotForms({
      hsFormSuccess,
      hsFormNewsletter,
    });

    // Ensure "Check Availability" buttons work
    document.querySelectorAll(querySelectorClickToOpenForm).forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        targetElAddressInput.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          const input = targetElAddressInput.querySelector("input");
          if (input) input.focus();
        }, 1000);
      });
    });

    // Initialize address input component
    const locationInput = new LocationInput({
      target: targetElAddressInput,
      props: {
        googlePublicApiKey,
        googleSheetConfig,
        onAddressSelect,
        onAddressSubmitSuccess,
      },
    });

    return locationInput;
  },
};