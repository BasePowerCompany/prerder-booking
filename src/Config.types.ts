import type { ParsedPlaceResult } from "./location-input/googlePlace/utils";
import type { StoredZipDataItem } from "./location-input/zipData/types";

export type HubspotFormConfig = {
  target: string;
  region: string;
  portalId: string;
  formId: string;
  onFormSubmit?: () => void;
};

export type PreorderAppConfig = {
  targetElAddressInput: HTMLDivElement;
  googlePublicApiKey: string;
  googleSheetConfig: {
    zipsCsvUrl: string;
  };
  querySelectorClickToOpenForm: string;
  hsFormSuccess: HubspotFormConfig;
  hsFormNewsletter: HubspotFormConfig;
  onAddressSelect?: (data: ParsedPlaceResult) => void;
  onAddressSubmitSuccess?: (
    addressData: ParsedPlaceResult,
    formType: 'lead-preorder-form' | 'lead-newsletter-form',
    zipConfig: StoredZipDataItem | null
  ) => void;
};

export type SubmitFormDescription = { label: string; value: string }[];
