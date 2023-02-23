<script lang="ts">
  import { theme } from "./stores/app";
  import IconButton from "./IconButton.svelte";

  function toggle() {
    theme.update((value) => {
      if (value === "dark") {
        return "light";
      } else if (value === "light") {
        return "system";
      } else {
        return "dark";
      }
    });
    focus();
  }
</script>

<IconButton
  clickHandler={toggle}
  style="color: var(--foreground); padding: 3px; -webkit-app-region: no-drag;"
  title={$theme === "dark"
    ? "Turn on light theme"
    : $theme === "light"
    ? "Turn on system theme"
    : "Turn on dark theme"}
>
  {#if $theme === "dark"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 35 35"
      ><path
        fill="currentColor"
        d="M18.44 34.68a18.22 18.22 0 0 1-2.94-.24 18.18 18.18 0 0 1-15-20.86A18.06 18.06 0 0 1 9.59.63a2.42 2.42 0 0 1 2.61.16 2.39 2.39 0 0 1 1 2.41l-1.3-.1 1.23.22A15.66 15.66 0 0 0 23.34 21a15.82 15.82 0 0 0 8.47.53A2.44 2.44 0 0 1 34.47 25a18.18 18.18 0 0 1-16.03 9.68ZM10.67 2.89a15.67 15.67 0 0 0-5 22.77A15.66 15.66 0 0 0 32.18 24a18.49 18.49 0 0 1-9.65-.64A18.18 18.18 0 0 1 10.67 2.89Z"
      /></svg
    >
  {:else if $theme === "light"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 36 36"
      ><g data-name="Lager 93"
        ><g data-name="Sun 3, Brightness 3" transform="translate(2 2)"
          ><path
            fill="currentColor"
            d="M32 14h-4.967c-2 1.769-.779 4 .967 4h4.967c1.999-1.769.779-4-.967-4Z"
            data-name="Path 68"
          /><g fill="none" stroke-miterlimit="10" data-name="Path 69"
            ><path
              d="M17.172 10.111a6 6 0 1 0 4.715 4.715 6.01 6.01 0 0 0-4.715-4.715Z"
            /><path
              fill="currentColor"
              d="M15.999 14c-.599 0-1.161.265-1.544.726-.274.331-.568.896-.415 1.706.139.731.796 1.388 1.528 1.527.145.027.29.041.43.041.598 0 1.16-.265 1.542-.726.275-.331.57-.896.417-1.703-.139-.734-.796-1.391-1.529-1.53a2.319 2.319 0 0 0-.43-.041m0-4c.384 0 .777.036 1.174.111 2.349.445 4.27 2.366 4.715 4.715A6.006 6.006 0 0 1 15.997 22c-.383 0-.776-.036-1.173-.111-2.348-.445-4.27-2.366-4.714-4.714A6.005 6.005 0 0 1 15.999 10Z"
            /></g
          ><rect
            width="8"
            height="4"
            fill="currentColor"
            data-name="Rectangle 26"
            rx="1.993"
            transform="translate(26 14)"
          /><rect
            width="8"
            height="4"
            fill="currentColor"
            data-name="Rectangle 27"
            rx="1.993"
            transform="rotate(90 -4 22)"
          /><rect
            width="8"
            height="4"
            fill="currentColor"
            data-name="Rectangle 28"
            rx="1.993"
            transform="rotate(90 10 8)"
          /><rect
            width="8"
            height="4"
            fill="currentColor"
            data-name="Rectangle 29"
            rx="1.993"
            transform="translate(-2 14)"
          /><g data-name="Group 22"
            ><rect
              width="6.925"
              height="3.766"
              fill="currentColor"
              data-name="Rectangle 30"
              rx="1.883"
              transform="rotate(-45 18.994 -24.97)"
            /></g
          ><g data-name="Group 23"
            ><rect
              width="3.766"
              height="6.925"
              fill="currentColor"
              data-name="Rectangle 31"
              rx="1.883"
              transform="rotate(-45 42.86 -15.08)"
            /></g
          ><g data-name="Group 24"
            ><rect
              width="3.766"
              height="6.925"
              fill="currentColor"
              data-name="Rectangle 32"
              rx="1.883"
              transform="rotate(-45 5.297 .469)"
            /></g
          ><g data-name="Group 25"
            ><rect
              width="6.925"
              height="3.766"
              fill="currentColor"
              data-name="Rectangle 33"
              rx="1.883"
              transform="rotate(-45 34.55 12.586)"
            /></g
          ></g
        ></g
      ></svg
    >
  {:else if $theme === "system"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 1920 1920"
      ><path
        fill="currentColor"
        fill-rule="evenodd"
        d="m1739.34 1293.414-105.827 180.818-240.225-80.188-24.509 22.25c-69.91 63.586-150.211 109.666-238.644 136.771l-32.076 9.94-49.468 244.065H835.584l-49.468-244.179-32.076-9.939c-88.432-27.105-168.734-73.185-238.644-136.771l-24.508-22.25-240.226 80.189-105.826-180.82 189.74-164.442-7.453-32.978c-10.39-45.742-15.586-91.483-15.586-135.869 0-44.386 5.195-90.127 15.586-135.868l7.454-32.979-189.741-164.442 105.826-180.819 240.226 80.075 24.508-22.25c69.91-63.585 150.212-109.665 238.644-136.884l32.076-9.826 49.468-244.066h213.007l49.468 244.18 32.076 9.825c88.433 27.219 168.734 73.186 238.644 136.885l24.509 22.25 240.225-80.189 105.826 180.819-189.74 164.442 7.453 32.98c10.39 45.74 15.586 91.481 15.586 135.867 0 44.386-5.195 90.127-15.586 135.869l-7.454 32.978 189.741 164.556Zm-53.76-333.403c0-41.788-3.84-84.48-11.634-127.284l210.184-182.062-199.454-340.856-265.186 88.433c-66.974-55.567-143.322-99.388-223.85-128.414L1140.977.01H743.198l-54.663 269.704c-81.431 29.139-156.424 72.282-223.963 128.414L199.5 309.809.045 650.665l210.07 182.062c-7.68 42.804-11.52 85.496-11.52 127.284 0 41.789 3.84 84.48 11.52 127.172L.046 1269.357 199.5 1610.214l265.186-88.546c66.974 55.68 143.323 99.388 223.85 128.527l54.663 269.816h397.779l54.663-269.703c81.318-29.252 156.424-72.283 223.85-128.527l265.186 88.546 199.454-340.857-210.184-182.174c7.793-42.805 11.633-85.496 11.633-127.285ZM942.075 564.706C724.1 564.706 546.782 742.024 546.782 960c0 217.976 177.318 395.294 395.294 395.294 217.977 0 395.294-177.318 395.294-395.294 0-217.976-177.317-395.294-395.294-395.294m0 677.647c-155.633 0-282.353-126.72-282.353-282.353s126.72-282.353 282.353-282.353S1224.43 804.367 1224.43 960s-126.72 282.353-282.353 282.353"
      /></svg
    >
  {/if}</IconButton
>
