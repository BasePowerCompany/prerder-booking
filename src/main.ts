import { PreorderApp } from "./PreorderApp";

PreorderApp.initialize({
  targetElAddressInput: document.getElementById("hero-address-entry") as HTMLDivElement,
  googlePublicApiKey: "AIzaSyB0o_nPI-xjHYKg7KB0bl87Yhnf2ng9Nsg",

  // Google Sheets configuration for zip code validation
  googleSheetConfig: {
    zipsCsvUrl: "https://bpc-web-static-files.s3.us-east-2.amazonaws.com/deregulated-zips-01-29-2025.csv",
  },

  // So that buttons open the form
  querySelectorClickToOpenForm: '[data-preorder="open"]',

  // HubSpot forms (keeping only what's necessary)
  hsFormSuccess: {
    target: "#hubspot-preorder-form",
    region: "eu1",
    portalId: "144428308",
    formId: "a9633337-f802-4195-b3f7-95db5f75516b",
  },
  hsFormNewsletter: {
    target: "#hubspot-email-form",
    region: "eu1",
    portalId: "144428308",
    formId: "a9633337-f802-4195-b3f7-95db5f75516b",
  },
});