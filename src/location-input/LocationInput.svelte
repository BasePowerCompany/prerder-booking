<script lang="ts">
  import GooglePlaceAutocomplete from "./googlePlace/GooglePlaceAutocomplete.svelte";
  import { ParsedPlaceResult, parsePlaceResult } from "./googlePlace/utils";
  import { onMount } from "svelte";
  import { getZipStore } from "./zipData/zipStore";
  import type { SheetDataConfig, StoredZipDataItem } from "./zipData/types";
  import type { OnAddressSubmitSuccess } from "../types";

  export let googlePublicApiKey: string;
  export let googleSheetConfig: SheetDataConfig;
  export let addressCtaText: string = "Get started";
  export let onAddressSelect: (data: ParsedPlaceResult) => void | undefined;
  export let onAddressSubmitSuccess: OnAddressSubmitSuccess = () => {};

  const { store: zipStore, load: loadZips } = getZipStore(googleSheetConfig);

  onMount(async () => {
    loadZips();
    const inputContainer = document.querySelector('.input-address-container');
    const focusOverlay = document.querySelector('.focus_overlay');
    const searchInput = document.querySelector('input.location-search-input');
    const submitButton = document.querySelector('button.submitAddressButton');

    inputContainer?.addEventListener('click', () => {
      focusOverlay?.classList.add('show');
      inputContainer.classList.add('focused');
      if (searchInput instanceof HTMLInputElement) {
        searchInput.placeholder = "Enter your address";
      }
      submitButton?.classList.add('hide');
    });

    inputContainer?.addEventListener('keydown', () => {
      if (searchInput instanceof HTMLInputElement) {
        searchInput.placeholder = "";
      }
    });

    focusOverlay?.addEventListener('click', () => {
      focusOverlay.classList.remove('show');
      submitButton?.classList.remove('hide');
      inputContainer?.classList.remove('focused');
    });
  });

  $: inputErrorMessage = "";
  let selectedAddress: ParsedPlaceResult | undefined;
  $: selectedAddress = undefined;

  const handleSubmit = () => {
    if (!selectedAddress?.postalCode || !selectedAddress?.houseNumber || !selectedAddress?.street) {
      inputErrorMessage = "Please enter a full address.";
      return;
    }

    const foundZipItem: StoredZipDataItem | null =
      $zipStore.find((zipItem) => zipItem.zip === selectedAddress.postalCode) || null;

    onAddressSubmitSuccess?.(
      selectedAddress,
      foundZipItem ? 'lead-preorder-form' : 'lead-newsletter-form',
      foundZipItem
    );
  };
</script>

<div class="input-address-wrap">
  <div class="input-address-container">
    <img
      src="https://cdn.jsdelivr.net/gh/BasePowerCompany/preorder-booking@1.0.1/public/Base_files/map-pin.svg"
      alt="Map pin icon"
    />
    <GooglePlaceAutocomplete
      class="location-search-input"
      apiKey={googlePublicApiKey}
      placeholder="See if your home qualifies"
      onSelect={(value) => {
        const parsed = parsePlaceResult(value);
        onAddressSelect?.(parsed);
        inputErrorMessage = "";
        selectedAddress = parsed;
        handleSubmit();
      }}
      options={{
        componentRestrictions: { country: "us" },
      }}
    />
  </div>
  <button class="submitAddressButton button secondary w-button">
    {addressCtaText}
  </button>
  {#if inputErrorMessage}
    <p class="preorder-address-error-message">
      {inputErrorMessage}
    </p>
  {/if}
</div>
<div class="focus_overlay"></div>

<style lang="scss">
  .input-address-wrap {
    position: relative;
  }

  .input-address-container {
    display: flex;
    padding: 8px;
    align-items: flex-start;
    gap: 8px;
    height: 66px;
    background: #fff;
    border-radius: 12px;
    position: relative;
    z-index: 551;
    
    &.focused {
      outline: 2px solid #d2d4d4;
    }
    
    img {
      margin: 13px 0 9px 10px;
      position: absolute;
      left: 8px;
    }

    @media screen and (max-width: 768px) {
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
      height: 48px;
      padding-top: 0px;
    }
  }

  .location-search-input {
    position: absolute;
    height: 44px;
    width: 100%;
    border: none;
    background: none;
    border-radius: 12px;
    padding: 3px 16px 0 48px;
    font-size: 18px;
    line-height: 24px;
    
    &::placeholder {
      color: #777e7f;
    }
  }

  .submitAddressButton {
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #0c9953;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    right: 9px;
    margin-top: -56px;
    z-index: 551;
    
    &:hover {
      background: #065c3f;
    }

    &.hide {
      display: none;
    }

    @media screen and (max-width: 768px) {
      position: relative;
      width: 100%;
      margin-top: 10px;
      margin-left: 10px;
    }
  }

  .focus_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(40, 51, 52, 0.5);
    z-index: 50;
    display: none;
    
    &.show {
      display: block;
    }
  }

  .preorder-address-error-message {
    color: #c95151;
    font-size: 14px;
    margin-top: 6px;
  }
</style>
