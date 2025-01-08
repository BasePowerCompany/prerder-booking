import { PreorderApp } from "./PreorderApp";

PreorderApp.initialize({
  targetElAddressInput: document.getElementById(
    "hero-address-entry",
  ) as HTMLDivElement,
  googlePublicApiKey: "AIzaSyB0o_nPI-xjHYKg7KB0bl87Yhnf2ng9Nsg",
  targetPanel: "#popup-form",
  targetAddressPanel: "#address-popup",
  targetAvailableState: "#preorder-base",
  targetNotAvailableState: "#not-available",
  targetStateContainer: "#popup-form .form-box_holder",
  targetAvailableText: `#preorder-availability`,
  targetDisplayAddress: `#service-address`,

  querySelectorClickToOpenForm: '[data-preorder="open"]',

  // stripe
  googleSheetConfig: {
    zipsCsvUrl:
      "https://bpc-web-static-files.s3.us-east-2.amazonaws.com/deregulated-zips.csv",
  },

  // hubspot
  hsFormSuccess: {
    target: "#hubspot-preorder-form",
    // region: "na1",
    // portalId: "43873875",
    // formId: "a41c83a1-a371-4080-be84-5699814bc294",
    //https://app-eu1.hubspot.com/forms/144428308/editor/a9633337-f802-4195-b3f7-95db5f75516b/edit/form/field/0-1%2Faddress
    region: "eu1",
    portalId: "144428308",
    formId: "a9633337-f802-4195-b3f7-95db5f75516b",
    onFormSubmitted: (form, args) => {
      if (
        args.submissionValues.zipConfig.servingNow === "yes" &&
        args.submissionValues.existing_solar === "No"
      ) {
        window.location.href = "/confirmation-booking";
      } else {
        window.location.href = "/confirmation";
      }
    },
  },
  hsFormNewsletter: {
    target: "#hubspot-email-form",
    // region: "na1",
    // portalId: "43873875",
    // formId: "bdfdc2d3-1e91-44e7-a477-02a68a93d0f9",
    region: "eu1",
    portalId: "144428308",
    formId: "a9633337-f802-4195-b3f7-95db5f75516b",
    onFormSubmitted: () => {
      window.location.href = "/newsletter-confirmation";
    },
  },

  // hsFormSuccess: {
  //   target: "#hubspot-preorder-form",
  //   region: "eu1",
  //   portalId: "26542071",
  //   formId: "3cda8361-19a7-4336-b522-edc27e1d66fc",
  //   onFormSubmit: () => {
  //     windowgtag("event", "preorder-newsletter-submitted");
  //   },
  // },
  // hsFormNewsletter: {
  //   target: "#hubspot-email-form",
  //   region: "eu1",
  //   portalId: "26542071",
  //   formId: "e9e30637-a84c-45ea-a7d1-b2a34ee40059",
  //   onFormSubmit: () => {
  //     gtag("event", "preorder-newsletter-submitted");
  //   },
  // },
});
